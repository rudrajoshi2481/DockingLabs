package main

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

	"github.com/go-git/go-git/v5"
	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

type Server struct {
	minioClient *minio.Client
	dataDir     string
	db          *sql.DB
}

type Repository struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	IsPublic    bool      `json:"is_public"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type CreateRepoRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	IsPublic    bool   `json:"is_public"`
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

	// Create data directory if it doesn't exist
	dataDir := "/tmp/git-server/data"
	if err := os.MkdirAll(dataDir, 0755); err != nil {
		return nil, fmt.Errorf("failed to create data directory: %v", err)
	}

	// Initialize SQLite database
	dbPath := filepath.Join(dataDir, "git-server.db")
	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %v", err)
	}

	// Create repositories table
	if err := initDB(db); err != nil {
		return nil, fmt.Errorf("failed to initialize database: %v", err)
	}

	return &Server{
		minioClient: minioClient,
		dataDir:     dataDir,
		db:          db,
	}, nil
}

func initDB(db *sql.DB) error {
	createTable := `
	CREATE TABLE IF NOT EXISTS repositories (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL UNIQUE,
		description TEXT,
		is_public BOOLEAN DEFAULT false,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);`

	_, err := db.Exec(createTable)
	return err
}

func (s *Server) createRepository(w http.ResponseWriter, r *http.Request) {
	var req CreateRepoRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Begin transaction
	tx, err := s.db.Begin()
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
	repo := Repository{
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
	rows, err := s.db.Query(`
		SELECT id, name, description, is_public, created_at, updated_at 
		FROM repositories 
		ORDER BY created_at DESC
	`)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to query repositories: %v", err), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var repositories []Repository
	for rows.Next() {
		var repo Repository
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

	json.NewEncoder(w).Encode(map[string][]Repository{
		"repositories": repositories,
	})
}

func (s *Server) getRepository(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	name := vars["name"]

	var repo Repository
	err := s.db.QueryRow(`
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

func main() {
	server, err := NewServer()
	if err != nil {
		log.Fatalf("Failed to create server: %v", err)
	}
	defer server.db.Close()

	router := mux.NewRouter()
	router.HandleFunc("/repositories", server.createRepository).Methods("POST")
	router.HandleFunc("/repositories", server.listRepositories).Methods("GET")
	router.HandleFunc("/repositories/{name}", server.getRepository).Methods("GET")

	port := "8080"
	log.Printf("Starting server on port %s", port)
	if err := http.ListenAndServe(":"+port, router); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
