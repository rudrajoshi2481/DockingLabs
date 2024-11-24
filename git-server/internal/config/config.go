package config

import (
	"os"
	"strconv"
)

// Config holds all configuration settings
type Config struct {
	Server ServerConfig
	MinIO  MinIOConfig
	Git    GitConfig
}

// ServerConfig holds server-specific configuration
type ServerConfig struct {
	Port int
}

// MinIOConfig holds MinIO-specific configuration
type MinIOConfig struct {
	Endpoint  string
	AccessKey string
	SecretKey string
	Bucket    string
}

// GitConfig holds Git-specific configuration
type GitConfig struct {
	RepoDir string
}

// Load reads configuration from environment variables
func Load() (*Config, error) {
	cfg := &Config{
		Server: ServerConfig{
			Port: getEnvInt("SERVER_PORT", 8080),
		},
		MinIO: MinIOConfig{
			Endpoint:  getEnvStr("MINIO_ENDPOINT", "localhost:9000"),
			AccessKey: getEnvStr("MINIO_ACCESS_KEY", "minioadmin"),
			SecretKey: getEnvStr("MINIO_SECRET_KEY", "minioadmin"),
			Bucket:    getEnvStr("MINIO_BUCKET", "git-server"),
		},
		Git: GitConfig{
			RepoDir: getEnvStr("GIT_REPO_DIR", "/tmp/git-repos"),
		},
	}

	return cfg, nil
}

// getEnvStr gets an environment variable with a default value
func getEnvStr(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

// getEnvInt gets an environment variable as integer with a default value
func getEnvInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}
