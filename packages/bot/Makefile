dev:
	go run ./src/main.go

fmt:
	@if [ -n "$$(go fmt ./src)" ]; then \
        echo "Code is not properly formatted"; \
        exit 1; \
    fi

lint:
	golangci-lint run

clear:
	rm -rf ./bin

## https://github.com/golang-standards/project-layout/issues/113#issuecomment-1336514449

build: clear fmt
	GOARCH=amd64 go build -o ./bin/LibraryBot ./src/main.go

build-arm: clear fmt
	GOARCH=arm64 go build -o ./bin/LibraryBot ./src/main.go
