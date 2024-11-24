package config

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLoadConfig(t *testing.T) {
	// Test default values
	t.Run("default values", func(t *testing.T) {
		os.Clearenv()
		cfg, err := Load()
		assert.NoError(t, err)
		assert.Equal(t, 8080, cfg.Server.Port)
		assert.Equal(t, "localhost:9000", cfg.MinIO.Endpoint)
		assert.Equal(t, "minioadmin", cfg.MinIO.AccessKey)
		assert.Equal(t, "minioadmin", cfg.MinIO.SecretKey)
		assert.Equal(t, "git-server", cfg.MinIO.Bucket)
		assert.Equal(t, "/tmp/git-repos", cfg.Git.RepoDir)
	})

	// Test custom values
	t.Run("custom values", func(t *testing.T) {
		os.Clearenv()
		os.Setenv("SERVER_PORT", "9090")
		os.Setenv("MINIO_ENDPOINT", "minio:9000")
		os.Setenv("MINIO_ACCESS_KEY", "custom_access")
		os.Setenv("MINIO_SECRET_KEY", "custom_secret")
		os.Setenv("MINIO_BUCKET", "custom-bucket")
		os.Setenv("GIT_REPO_DIR", "/custom/path")

		cfg, err := Load()
		assert.NoError(t, err)
		assert.Equal(t, 9090, cfg.Server.Port)
		assert.Equal(t, "minio:9000", cfg.MinIO.Endpoint)
		assert.Equal(t, "custom_access", cfg.MinIO.AccessKey)
		assert.Equal(t, "custom_secret", cfg.MinIO.SecretKey)
		assert.Equal(t, "custom-bucket", cfg.MinIO.Bucket)
		assert.Equal(t, "/custom/path", cfg.Git.RepoDir)
	})

	// Test invalid port
	t.Run("invalid port", func(t *testing.T) {
		os.Clearenv()
		os.Setenv("SERVER_PORT", "invalid")
		cfg, err := Load()
		assert.NoError(t, err)
		assert.Equal(t, 8080, cfg.Server.Port) // Should use default port
	})
}
