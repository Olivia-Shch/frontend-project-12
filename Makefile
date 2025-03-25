build:
	make -C frontend build

start:
	make start-backend

start-frontend:
	cd frontend && npm run dev

start-backend:
	npx start-server

install:
	npm ci && make -C frontend install