# Production
run-prod:
	ENVIRONMENT=production \
	NEXT_PUBLIC_DEVELOPMENT_DOCKER=http://server:4000/graphql \
	docker-compose up --build

# Development
run-dev:
	ENVIRONMENT=development \
	NEXT_PUBLIC_DEVELOPMENT_DOCKER=http://server:4000/graphql \
	docker-compose up --build

# Test
run-test:
	ENVIRONMENT=test \
	NEXT_PUBLIC_DEVELOPMENT_DOCKER=http://server:4000/graphql \
	docker-compose up --build
