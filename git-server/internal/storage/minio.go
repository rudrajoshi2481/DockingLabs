package storage

import (
	"bytes"
	"context"
	"io"

	"github.com/dockinglabs/git-server/internal/config"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

// MinioClient handles operations with MinIO object storage
type MinioClient struct {
	client *minio.Client
	bucket string
}

// NewMinioClient creates a new MinIO client
func NewMinioClient(cfg *config.Config) (*MinioClient, error) {
	client, err := minio.New(cfg.MinIO.Endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(cfg.MinIO.AccessKey, cfg.MinIO.SecretKey, ""),
		Secure: false,
	})
	if err != nil {
		return nil, err
	}

	return &MinioClient{
		client: client,
		bucket: cfg.MinIO.Bucket,
	}, nil
}

// EnsureBucket creates the bucket if it doesn't exist
func (m *MinioClient) EnsureBucket(ctx context.Context) error {
	exists, err := m.client.BucketExists(ctx, m.bucket)
	if err != nil {
		return err
	}

	if !exists {
		err = m.client.MakeBucket(ctx, m.bucket, minio.MakeBucketOptions{})
		if err != nil {
			return err
		}
	}

	return nil
}

// Upload stores data in MinIO
func (m *MinioClient) Upload(ctx context.Context, path string, data []byte) error {
	reader := bytes.NewReader(data)
	_, err := m.client.PutObject(ctx, m.bucket, path, reader, int64(len(data)), minio.PutObjectOptions{})
	return err
}

// Download retrieves data from MinIO
func (m *MinioClient) Download(ctx context.Context, path string) ([]byte, error) {
	obj, err := m.client.GetObject(ctx, m.bucket, path, minio.GetObjectOptions{})
	if err != nil {
		return nil, err
	}
	defer obj.Close()

	data, err := io.ReadAll(obj)
	if err != nil {
		return nil, err
	}

	return data, nil
}

// Delete removes an object from MinIO
func (m *MinioClient) Delete(ctx context.Context, path string) error {
	return m.client.RemoveObject(ctx, m.bucket, path, minio.RemoveObjectOptions{})
}
