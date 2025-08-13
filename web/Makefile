.PHONY: help setup format lint up build clean

# デフォルトターゲット
help: ## ヘルプを表示
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

setup: ## プロジェクトセットアップ（依存関係のインストール）
	@echo "🔧 Installing dependencies with bun..."
	bun install

format: ## コードフォーマット
	@echo "🎨 Formatting code with Biome..."
	bun run format

lint: ## リント実行
	@echo "🔍 Running lint with Biome..."
	bun run lint

up: ## 開発サーバー起動
	@echo "🚀 Starting development server..."
	bun run dev

build: ## プロダクションビルド
	@echo "🏗️ Building for production..."
	bun run build

clean: ## クリーンアップ（node_modules、distディレクトリを削除）
	@echo "🧹 Cleaning up..."
	rm -rf node_modules dist