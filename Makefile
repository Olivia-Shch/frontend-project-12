.PHONY: install build start start-backend start-frontend

install:
	npm ci
	cd frontend && npm ci

build:
	cd frontend && npm run build

start: build start-backend

start-frontend:
	cd frontend && npm run dev

start-backend:
	npx start-server --port 5001 --static ./frontend/dist
