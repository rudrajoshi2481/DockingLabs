package storage

import (
	"context"
	"testing"

	"github.com/dockinglabs/git-server/internal/config"
	"github.com/stretchr/testify/assert"
)

func TestNewMinioClient(t *testing.T) {
	cfg := &config.Config{
		MinIO: config.MinIOConfig{
			Endpoint:  "localhost:9000",
			AccessKey: "minioadmin",
			SecretKey: "minioadmin",
			Bucket:    "test-bucket",
		},
	}

	client, err := NewMinioClient(cfg)
	assert.NoError(t, err)
	assert.NotNil(t, client)
}

func TestMinioOperations(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping integration test")
	}

	cfg := &config.Config{
		MinIO: config.MinIOConfig{
			Endpoint:  "localhost:9000",
			AccessKey: "minioadmin",
			SecretKey: "minioadmin",
			Bucket:    "test-bucket",
		},
	}

	client, err := NewMinioClient(cfg)
	assert.NoError(t, err)

	ctx := context.Background()

	// Test bucket creation
	err = client.EnsureBucket(ctx)
	assert.NoError(t, err)

	// Test upload
	testData := []byte("test data")
	err = client.Upload(ctx, "test.txt", testData)
	assert.NoError(t, err)

	// Test download
	data, err := client.Download(ctx, "test.txt")
	assert.NoError(t, err)
	assert.Equal(t, testData, data)

	// Test delete
	err = client.Delete(ctx, "test.txt")
	assert.NoError(t, err)

	// Test download non-existent file
	_, err = client.Download(ctx, "test.txt")
	assert.Error(t, err)
}
