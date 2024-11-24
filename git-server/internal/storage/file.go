package storage

import (
	"context"
	"fmt"
	"os"
	"path/filepath"

	"github.com/dockinglabs/git-server/internal/config"
)

// FileStorage implements storage interface using local filesystem
type FileStorage struct {
	baseDir string
}

// NewFileStorage creates a new file-based storage
func NewFileStorage(cfg *config.Config) (*FileStorage, error) {
	baseDir := filepath.Join(cfg.Git.RepoDir, "repositories")
	if err := os.MkdirAll(baseDir, 0755); err != nil {
		return nil, fmt.Errorf("failed to create base directory: %w", err)
	}
	return &FileStorage{baseDir: baseDir}, nil
}

// Upload stores data in the filesystem
func (f *FileStorage) Upload(_ context.Context, path string, data []byte) error {
	fullPath := filepath.Join(f.baseDir, path)
	if err := os.MkdirAll(filepath.Dir(fullPath), 0755); err != nil {
		return fmt.Errorf("failed to create directory: %w", err)
	}
	return os.WriteFile(fullPath, data, 0644)
}

// Download retrieves data from the filesystem
func (f *FileStorage) Download(_ context.Context, path string) ([]byte, error) {
	fullPath := filepath.Join(f.baseDir, path)
	return os.ReadFile(fullPath)
}

// Delete removes a file from the filesystem
func (f *FileStorage) Delete(_ context.Context, path string) error {
	fullPath := filepath.Join(f.baseDir, path)
	return os.Remove(fullPath)
}

// EnsureBucket creates the base directory if it doesn't exist
func (f *FileStorage) EnsureBucket(_ context.Context) error {
	return os.MkdirAll(f.baseDir, 0755)
}
