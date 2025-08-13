.DEFAULT_GOAL := help

##### WEB PROJECT #####

.PHONY: setup format lint up build clean

setup: ## webプロジェクトセットアップ（依存関係のインストール） ## make setup
	@echo "🔧 Installing web dependencies with bun..."
	cd web && bun install

format: ## webコードフォーマット ## make format
	@echo "🎨 Formatting web code with Biome..."
	cd web && bun run format

lint: ## webリント実行 ## make lint
	@echo "🔍 Running web lint with Biome..."
	cd web && bun run lint

up: ## web開発サーバー起動 ## make up
	@echo "🚀 Starting web development server..."
	cd web && bun run dev

build: ## webプロダクションビルド ## make build
	@echo "🏗️ Building web for production..."
	cd web && bun run build

clean: ## webクリーンアップ（node_modules、distディレクトリを削除） ## make clean
	@echo "🧹 Cleaning up web..."
	cd web && rm -rf node_modules dist

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
