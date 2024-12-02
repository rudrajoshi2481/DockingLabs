# Git Server with MinIO Storage

This is a Git server implementation in Go that uses MinIO for storage. It provides a simple HTTP API for creating and managing Git repositories.

## Features

- Create bare Git repositories
- List existing repositories
- MinIO integration for storage
- Docker and Docker Compose support

## Prerequisites

- Docker and Docker Compose
- Git
- Go 1.21 or later (for local development)

## Configuration

The server uses the following environment variables:

- `MINIO_ENDPOINT`: MinIO server endpoint (default: "minio:9000")
- `MINIO_ACCESS_KEY`: MinIO access key
- `MINIO_SECRET_KEY`: MinIO secret key
- `MINIO_USE_SSL`: Whether to use SSL for MinIO connection (default: false)

## API Endpoints

### Create Repository

```http
POST /repositories
Content-Type: application/json

{
    "name": "repository-name"
}
```

Response:
```json
{
    "message": "Repository repository-name created successfully",
    "path": "/app/data/repository-name"
}
```

### List Repositories

```http
GET /repositories
```

Response:
```json
{
    "repositories": ["repo1", "repo2", "repo3"]
}
```

## Running with Docker Compose

1. Start the services:
   ```bash
   docker-compose up --build
   ```

2. The services will be available at:
   - Git Server: http://localhost:8080
   - MinIO Console: http://localhost:9001
   - MinIO API: http://localhost:9000

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   go mod download
   ```
3. Run the server:
   ```bash
   go run main.go
   ```

## Using the Git Server

1. Create a new repository:
   ```bash
   curl -X POST http://localhost:8080/repositories \
        -H "Content-Type: application/json" \
        -d '{"name": "test-repo"}'
   ```

2. Clone the repository:
   ```bash
   git clone http://localhost:8080/test-repo
   ```

3. List repositories:
   ```bash
   curl http://localhost:8080/repositories
   ```

## Storage Architecture

The server uses a hybrid storage approach:
- Git repositories are stored in the local filesystem (mounted as a Docker volume)
- Additional data and backups are stored in MinIO object storage
- Each repository gets its own bucket in MinIO

## Security Considerations

- This is a basic implementation and should be enhanced with proper authentication and authorization before use in production
- SSL/TLS should be configured for production use
- Access to MinIO should be properly secured
- Git operations should be validated and sanitized

## Contributing

Feel free to open issues and pull requests for any improvements or bug fixes.

## License

MIT License
