# Bioinformatics Git Server

A specialized Git server designed for managing bioinformatics data and research repositories. Built with Go, this server provides advanced features for handling genomic data, sequence files, and bioinformatics workflows.

## Features

- **Git Repository Management**: Full Git repository functionality with specialized bioinformatics support
- **Object Storage**: Efficient storage of large genomic files using MinIO
- **Bioinformatics Metadata**: Rich metadata support for common bioinformatics file formats
- **Advanced Search**: Search repositories by organism, sequence type, and custom tags
- **File Type Support**: Automatic detection and handling of common bioinformatics file formats
- **RESTful API**: Comprehensive API for programmatic access
- **Docker Support**: Easy deployment using Docker and docker-compose

## Supported File Formats

- FASTA (.fa, .fasta)
- FASTQ (.fq, .fastq)
- BAM (.bam)
- SAM (.sam)
- VCF (.vcf)
- BED (.bed)
- GFF (.gff, .gff3)
- GTF (.gtf)

## Prerequisites

- Docker and docker-compose
- Go 1.21 or later (for development)
- Git

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/dockinglabs/git-server.git
   cd git-server
   ```

2. Start the server using docker-compose:
   ```bash
   docker-compose up -d
   ```

3. The server will be available at:
   - Git Server: http://localhost:8080
   - MinIO Console: http://localhost:9001
   - MinIO API: http://localhost:9000

## Development Setup

1. Install dependencies:
   ```bash
   go mod download
   ```

2. Run the server locally:
   ```bash
   go run cmd/server/main.go
   ```

## Configuration

The server can be configured using environment variables:

```env
MINIO_ENDPOINT=minio:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_USE_SSL=false
SERVER_PORT=8080
```

## API Documentation

See [API.md](docs/API.md) for detailed API documentation.

## Directory Structure

```
.
├── cmd/
│   └── server/          # Main application entry point
├── internal/
│   ├── config/          # Configuration management
│   ├── server/          # Server implementation
│   │   └── handlers/    # Request handlers
│   └── storage/         # Storage implementation
├── docs/                # Documentation
├── Dockerfile          # Docker build file
├── docker-compose.yml  # Docker compose configuration
├── go.mod             # Go module file
└── README.md          # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Future Enhancements

- Authentication and authorization
- Advanced file validation
- Pipeline integration
- Workflow management
- Data visualization
- Collaborative features

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Go-Git](https://github.com/go-git/go-git) for Git implementation
- [MinIO](https://min.io/) for object storage
- [Gin](https://gin-gonic.com/) for web framework
