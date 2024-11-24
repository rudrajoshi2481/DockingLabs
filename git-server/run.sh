#!/bin/bash
export REPO_DIR=/tmp/git-repos
export LOG_LEVEL=debug
mkdir -p $REPO_DIR
go run cmd/server/main.go
