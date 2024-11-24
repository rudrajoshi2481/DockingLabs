package server

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/dockinglabs/git-server/internal/config"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

type mockStorage struct {
	uploadErr   error
	downloadErr error
	data        []byte
}

func (m *mockStorage) Upload(_ context.Context, _ string, data []byte) error {
	if m.uploadErr != nil {
		return m.uploadErr
	}
	m.data = data
	return nil
}

func (m *mockStorage) Download(_ context.Context, _ string) ([]byte, error) {
	if m.downloadErr != nil {
		return nil, m.downloadErr
	}
	return m.data, nil
}

func (m *mockStorage) Delete(_ context.Context, _ string) error {
	return nil
}

func (m *mockStorage) EnsureBucket(_ context.Context) error {
	return nil
}

func TestServer(t *testing.T) {
	gin.SetMode(gin.TestMode)

	cfg := &config.Config{
		Server: config.ServerConfig{Port: 8080},
		Git:    config.GitConfig{RepoDir: "/tmp/test-repos"},
	}

	mock := &mockStorage{}
	server := NewServer(cfg, mock)
	router := server.SetupRoutes()

	t.Run("health check", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/health", nil)
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
		var response map[string]string
		err := json.Unmarshal(w.Body.Bytes(), &response)
		assert.NoError(t, err)
		assert.Equal(t, "ok", response["status"])
	})

	t.Run("push repository", func(t *testing.T) {
		testData := []byte("test repository data")
		w := httptest.NewRecorder()
		req, _ := http.NewRequest("POST", "/api/v1/repos/test-repo", bytes.NewReader(testData))
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
		assert.Equal(t, testData, mock.data)
	})

	t.Run("pull repository", func(t *testing.T) {
		testData := []byte("test repository data")
		mock.data = testData

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/api/v1/repos/test-repo", nil)
		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
		assert.Equal(t, testData, w.Body.Bytes())
	})
}
