install:
	npm ci && make -C frontend install
build:
	npm run build
start:
	npx @hexlet/chat-server -s ./frontend/dist
start-backend:
	npm run start
start-frontend:
	cd frontend && npm start
develop:
	make start-backend & make start-frontend
lint:
	make -C frontend lint
fix:
	make -C frontend fix