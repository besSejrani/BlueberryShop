# Production
run-prod:
	ENVIRONMENT=production docker-compose up --build

# Development
run-dev:
	ENVIRONMENT=development docker-compose up --build

# Test
run-test:
	ENVIRONMENT=test docker-compose up --build
