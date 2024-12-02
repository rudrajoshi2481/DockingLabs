package server

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"git-server/internal/models"
	"git-server/internal/storage"

	"github.com/go-git/go-git/v5"
	"github.com/gorilla/mux"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

type Server struct {
	minioClient *minio.Client
	dataDir     string
	store       *storage.SQLiteStore
}

func NewServer() (*Server, error) {
	endpoint := os.Getenv("MINIO_ENDPOINT")
	if endpoint == "" {
		endpoint = "localhost:9000"
	}
	accessKey := os.Getenv("MINIO_ACCESS_KEY")
	if accessKey == "" {
		accessKey = "minioadmin"
	}
	secretKey := os.Getenv("MINIO_SECRET_KEY")
	if secretKey == "" {
		secretKey = "minioadmin"
	}
	useSSL := os.Getenv("MINIO_USE_SSL") == "true"

	minioClient, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: useSSL,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to create MinIO client: %v", err)
	}

	dataDir := "/tmp/git-server/data"
	if err := os.MkdirAll(dataDir, 0755); err != nil {
		return nil, fmt.Errorf("failed to create data directory: %v", err)
	}

	store, err := storage.NewSQLiteStore(dataDir)
	if err != nil {
		return nil, fmt.Errorf("failed to create storage: %v", err)
	}

	return &Server{
		minioClient: minioClient,
		dataDir:     dataDir,
		store:       store,
	}, nil
}

func (s *Server) Close() error {
	return s.store.Close()
}

func (s *Server) createRepository(w http.ResponseWriter, r *http.Request) {
	var req models.CreateRepoRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Begin transaction
	tx, err := s.store.DB().Begin()
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to begin transaction: %v", err), http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

	// Insert repository metadata
	result, err := tx.Exec(
		"INSERT INTO repositories (name, description, is_public) VALUES (?, ?, ?)",
		req.Name, req.Description, req.IsPublic,
	)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to insert repository metadata: %v", err), http.StatusInternalServerError)
		return
	}

	repoID, err := result.LastInsertId()
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to get repository ID: %v", err), http.StatusInternalServerError)
		return
	}

	// Create repository directory
	repoPath := filepath.Join(s.dataDir, req.Name)
	if err := os.MkdirAll(repoPath, 0755); err != nil {
		http.Error(w, fmt.Sprintf("failed to create directory: %v", err), http.StatusInternalServerError)
		return
	}

	// Initialize bare git repository
	_, err = git.PlainInit(repoPath, true)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to initialize git repository: %v", err), http.StatusInternalServerError)
		return
	}

	// Create a bucket with repository name in MinIO
	err = s.minioClient.MakeBucket(context.Background(), req.Name, minio.MakeBucketOptions{})
	if err != nil {
		exists, errBucketExists := s.minioClient.BucketExists(context.Background(), req.Name)
		if errBucketExists == nil && exists {
			log.Printf("Bucket %s already exists\n", req.Name)
		} else {
			http.Error(w, fmt.Sprintf("failed to create bucket: %v", err), http.StatusInternalServerError)
			return
		}
	}

	// Commit transaction
	if err := tx.Commit(); err != nil {
		http.Error(w, fmt.Sprintf("failed to commit transaction: %v", err), http.StatusInternalServerError)
		return
	}

	// Return repository details
	repo := models.Repository{
		ID:          int(repoID),
		Name:        req.Name,
		Description: req.Description,
		IsPublic:    req.IsPublic,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(repo)
}

func (s *Server) listRepositories(w http.ResponseWriter, r *http.Request) {
	rows, err := s.store.DB().Query(`
		SELECT id, name, description, is_public, created_at, updated_at 
		FROM repositories 
		ORDER BY created_at DESC
	`)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to query repositories: %v", err), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var repositories []models.Repository
	for rows.Next() {
		var repo models.Repository
		err := rows.Scan(
			&repo.ID,
			&repo.Name,
			&repo.Description,
			&repo.IsPublic,
			&repo.CreatedAt,
			&repo.UpdatedAt,
		)
		if err != nil {
			http.Error(w, fmt.Sprintf("failed to scan repository: %v", err), http.StatusInternalServerError)
			return
		}
		repositories = append(repositories, repo)
	}

	json.NewEncoder(w).Encode(map[string][]models.Repository{
		"repositories": repositories,
	})
}

func (s *Server) getRepository(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	name := vars["name"]

	var repo models.Repository
	err := s.store.DB().QueryRow(`
		SELECT id, name, description, is_public, created_at, updated_at 
		FROM repositories 
		WHERE name = ?
	`, name).Scan(
		&repo.ID,
		&repo.Name,
		&repo.Description,
		&repo.IsPublic,
		&repo.CreatedAt,
		&repo.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		http.Error(w, "Repository not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, fmt.Sprintf("failed to get repository: %v", err), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(repo)
}

func (s *Server) Routes() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/repositories", s.createRepository).Methods("POST")
	router.HandleFunc("/repositories", s.listRepositories).Methods("GET")
	router.HandleFunc("/repositories/{name}", s.getRepository).Methods("GET")
	return router
}
