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

##### WEB PROJECT #####

.PHONY: web-setup web-format web-lint web-up web-build web-clean

web-setup: ## webプロジェクトセットアップ（依存関係のインストール） ## make web-setup
	@echo "🔧 Installing web dependencies with bun..."
	cd web && bun install

web-format: ## webコードフォーマット ## make web-format
	@echo "🎨 Formatting web code with Biome..."
	cd web && bun run format

web-lint: ## webリント実行 ## make web-lint
	@echo "🔍 Running web lint with Biome..."
	cd web && bun run lint

web-up: ## web開発サーバー起動 ## make web-up
	@echo "🚀 Starting web development server..."
	cd web && bun run dev

web-build: ## webプロダクションビルド ## make web-build
	@echo "🏗️ Building web for production..."
	cd web && bun run build

web-clean: ## webクリーンアップ（node_modules、distディレクトリを削除） ## make web-clean
	@echo "🧹 Cleaning up web..."
	cd web && rm -rf node_modules dist
