FROM golang:1.21-alpine

WORKDIR /app

# Install git and build dependencies
RUN apk add --no-cache git build-base

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN go build -o main ./cmd/server

# Expose port
EXPOSE 8080

# Run the binary
CMD ["./main"]
