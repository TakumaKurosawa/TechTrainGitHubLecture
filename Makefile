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

##### WEB PROJECT COMMANDS #####

.PHONY: setup
setup: ## Setup project dependencies ## make setup
	cd web && npm install

.PHONY: format
format: ## Format code with Biome ## make format
	cd web && npm run format

.PHONY: lint
lint: ## Lint code with Biome ## make lint  
	cd web && npm run lint

.PHONY: check
check: ## Run format, lint, and import organization ## make check
	cd web && npm run check

.PHONY: up
up: ## Start development server ## make up
	cd web && npm run dev

.PHONY: build
build: ## Build for production ## make build
	cd web && npm run build

.PHONY: clean
clean: ## Clean node_modules and build artifacts ## make clean
	cd web && rm -rf node_modules dist

.PHONY: preview
preview: ## Preview production build ## make preview
	cd web && npm run preview
