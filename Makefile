.DEFAULT_GOAL := help

##### HELP #####

.PHONY: help
help: ## Display this help screen ## make or make help
	@echo ""
	@echo "Usage: make SUB_COMMAND argument_name=argument_value"
	@echo ""
	@echo "Command list:"
	@echo ""
	@printf "\033[36m%-30s\033[0m %-50s %s\n" "[Sub command]" "[Description]" "[Example]"
	@grep -E '^[/a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | perl -pe 's%^([/a-zA-Z_-]+):.*?(##)%$$1 $$2%' | awk -F " *?## *?" '{printf "\033[36m%-30s\033[0m %-50s %s\n", $$1, $$2, $$3}'

##### PROJECT COMMANDS #####

.PHONY: setup
setup: ## Setup project dependencies ## make setup
	cd web && bun install

.PHONY: format
format: ## Format code with Biome ## make format
	cd web && bun run format

.PHONY: lint
lint: ## Run linting with Biome ## make lint
	cd web && bun run lint

.PHONY: up
up: ## Start development server ## make up
	cd web && bun run dev

.PHONY: build
build: ## Build production bundle ## make build
	cd web && bun run build

.PHONY: clean
clean: ## Clean build files and dependencies ## make clean
	cd web && rm -rf dist node_modules
