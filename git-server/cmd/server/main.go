package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/dockinglabs/git-server/internal/config"
	"github.com/dockinglabs/git-server/internal/server"
	"github.com/dockinglabs/git-server/internal/storage"
	"github.com/sirupsen/logrus"
)

func init() {
	// Configure logging
	logrus.SetFormatter(&logrus.JSONFormatter{})
	logrus.SetOutput(os.Stdout)

	// Set log level from environment variable or default to info
	level := os.Getenv("LOG_LEVEL")
	if parsedLevel, err := logrus.ParseLevel(level); err == nil {
		logrus.SetLevel(parsedLevel)
	} else {
		logrus.SetLevel(logrus.InfoLevel)
	}

	// Set MinIO environment variables
	if os.Getenv("MINIO_ENDPOINT") == "" {
		os.Setenv("MINIO_ENDPOINT", "localhost:9000")
		os.Setenv("MINIO_ACCESS_KEY", "minioadmin")
		os.Setenv("MINIO_SECRET_KEY", "minioadmin")
		os.Setenv("MINIO_BUCKET", "git-server")
	}
}

func main() {
	logger := logrus.WithField("component", "main")
	logger.Info("Starting Git server")

	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		logger.WithError(err).Fatal("Failed to load configuration")
	}

	// Initialize storage
	storageClient, err := storage.NewMinioClient(cfg)
	if err != nil {
		logger.WithError(err).Fatal("Failed to initialize storage")
	}

	// Create and start server
	srv := server.NewServer(cfg, storageClient)

	// Handle graceful shutdown
	go func() {
		sigChan := make(chan os.Signal, 1)
		signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
		sig := <-sigChan
		logger.WithField("signal", sig.String()).Info("Received shutdown signal")
		os.Exit(0)
	}()

	// Start server
	if err := srv.Start(); err != nil {
		log.Fatal(err)
	}
}
