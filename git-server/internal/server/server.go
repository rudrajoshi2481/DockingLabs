package server

import (
	"context"
	"fmt"
	"io"
	"net/http"

	"github.com/dockinglabs/git-server/internal/config"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

// Storage interface defines operations for storing and retrieving git repositories
type Storage interface {
	Upload(ctx context.Context, path string, data []byte) error
	Download(ctx context.Context, path string) ([]byte, error)
	Delete(ctx context.Context, path string) error
	EnsureBucket(ctx context.Context) error
}

// Server represents the Git server
type Server struct {
	cfg     *config.Config
	storage Storage
	logger  *logrus.Entry
}

// NewServer creates a new server instance
func NewServer(cfg *config.Config, storage Storage) *Server {
	return &Server{
		cfg:     cfg,
		storage: storage,
		logger:  logrus.WithField("component", "server"),
	}
}

// SetupRoutes configures all the routes for the server
func (s *Server) SetupRoutes() *gin.Engine {
	router := gin.New()
	router.Use(gin.Recovery())

	// Add logging middleware
	router.Use(func(c *gin.Context) {
		s.logger.WithFields(logrus.Fields{
			"method": c.Request.Method,
			"path":   c.Request.URL.Path,
		}).Info("Request received")
		c.Next()
	})

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// API routes
	v1 := router.Group("/api/v1")
	{
		v1.POST("/repos/:name", s.pushRepository)
		v1.GET("/repos/:name", s.pullRepository)
		v1.DELETE("/repos/:name", s.deleteRepository)
	}

	return router
}

// Start starts the HTTP server
func (s *Server) Start() error {
	// Ensure bucket exists
	if err := s.storage.EnsureBucket(context.Background()); err != nil {
		return fmt.Errorf("failed to ensure bucket exists: %w", err)
	}

	addr := fmt.Sprintf(":%d", s.cfg.Server.Port)
	s.logger.WithField("addr", addr).Info("Starting server")
	return http.ListenAndServe(addr, s.SetupRoutes())
}

func (s *Server) pushRepository(c *gin.Context) {
	name := c.Param("name")
	data, err := io.ReadAll(c.Request.Body)
	if err != nil {
		s.logger.WithError(err).Error("Failed to read request body")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read request body"})
		return
	}

	err = s.storage.Upload(c.Request.Context(), name, data)
	if err != nil {
		s.logger.WithError(err).Error("Failed to upload repository")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload repository"})
		return
	}

	c.Status(http.StatusOK)
}

func (s *Server) pullRepository(c *gin.Context) {
	name := c.Param("name")
	data, err := s.storage.Download(c.Request.Context(), name)
	if err != nil {
		s.logger.WithError(err).Error("Failed to download repository")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to download repository"})
		return
	}

	c.Data(http.StatusOK, "application/octet-stream", data)
}

func (s *Server) deleteRepository(c *gin.Context) {
	name := c.Param("name")
	err := s.storage.Delete(c.Request.Context(), name)
	if err != nil {
		s.logger.WithError(err).Error("Failed to delete repository")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete repository"})
		return
	}

	c.Status(http.StatusOK)
}
