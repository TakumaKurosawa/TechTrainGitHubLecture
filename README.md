# TechTrainGitHubLecture

2025 年 8 月 14 日 TechTrain GitHub メンター講義用

## プロジェクト概要

React + TypeScript + Vite を使用したモックアプリケーションです。

## 技術スタック

### フロントエンド

- **フレームワーク**: React 18+ (TypeScript)
- **ビルドツール**: Vite
- **状態管理**: Zustand
- **ルーティング**: React Router v6
- **UI フレームワーク**: Styled Components
- **アニメーション**: Framer Motion
- **アイコン**: Lucide React
- **フォーム管理**: React Hook Form + Zod

### 開発・デプロイ環境

- **パッケージマネージャー**: bun (推奨) or pnpm
- **フォーマッター・リンター**: Biome
- **タスクランナー**: Make (Makefile)
- **ホスティング**: Vercel
- **バージョン管理**: Git

## 前提条件

開発環境には以下が必要です：

- **Node.js**: 18.0.0 以上
- **bun**: 1.0.0 以上 (推奨) または **pnpm**: 8.0.0 以上

### bun のインストール

```bash
npm install -g bun
```

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/TakumaKurosawa/TechTrainGitHubLecture.git
cd TechTrainGitHubLecture
```

### 2. プロジェクト初期設定

```bash
# 依存関係のインストールと初期セットアップ
make setup
```

### 3. 開発サーバーの起動

```bash
# 開発サーバー起動 (http://localhost:5173)
make up
```

## 開発コマンド

プロジェクトでは Make を使用してタスクを管理しています。以下のコマンドが利用可能です：

```bash
# ヘルプ表示（利用可能なコマンド一覧）
make help

# プロジェクトセットアップ（初回のみ）
make setup

# 開発サーバー起動
make up

# プロダクションビルド
make build

# コードフォーマット
make format

# リント実行
make lint

# クリーンアップ（node_modules、dist等を削除）
make clean
```

## プロジェクト構成

```
TechTrainGitHubLecture/
├── web/                         # メインアプリケーション
│   ├── src/
│   │   ├── components/          # 再利用可能なUIコンポーネント
│   │   │   ├── ui/              # 基本UIコンポーネント (Button, Card, etc.)
│   │   │   ├── layout/          # レイアウトコンポーネント
│   │   │   └── features/        # 機能固有のコンポーネント
│   │   ├── pages/               # ページコンポーネント
│   │   │   ├── member/          # 部下ユースケースページ
│   │   │   └── manager/         # マネージャーユースケースページ
│   │   ├── hooks/               # カスタムフック
│   │   ├── store/               # Zustand ストア
│   │   ├── types/               # TypeScript 型定義
│   │   ├── utils/               # ユーティリティ関数
│   │   ├── data/                # モックデータ
│   │   ├── assets/              # 静的アセット
│   │   └── styles/              # グローバルスタイル
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── biome.json
├── docs/                        # プロジェクトドキュメント
├── Makefile                     # タスクランナー定義
├── vercel.json                  # Vercel デプロイ設定
├── CLAUDE.md                    # 開発ガイドライン
└── README.md                    # このファイル
```

## 開発ワークフロー

### 1. ブランチ戦略

このプロジェクトは **トランクベース開発 + PR** を採用しています：

- `main`: メインブランチ（本番環境）
- `feat/feature-name`: 機能開発用の短命ブランチ
- `fix/bug-description`: バグ修正用ブランチ

### 2. 開発フロー

```bash
# 1. mainから最新を取得
git checkout main
git pull origin main

# 2. 作業ブランチを作成
git checkout -b feat/your-feature-name

# 3. 開発・テスト
make up          # 開発サーバー起動
make format      # コード整形
make lint        # 静的解析

# 4. 変更をコミット
git add .
git commit -m "feat: add new feature description"

# 5. プッシュしてPR作成
git push origin feat/your-feature-name
```

### 3. コミットメッセージ規約

```
feat:     新機能追加
fix:      バグ修正
docs:     ドキュメント更新
style:    コードスタイル修正（動作に影響しない変更）
refactor: リファクタリング
test:     テスト追加・修正
chore:    その他の変更（ビルドプロセス、補助ツールなど）

例: feat: add user authentication system
```

## デプロイ

### Vercel へのデプロイ

1. **Vercel CLI のインストール**:

```bash
npm install -g vercel
```

2. **初回デプロイ**:

```bash
# プロダクションビルドの確認
make build

# Vercel にデプロイ
vercel

# または GitHub 連携での自動デプロイ
# 1. Vercel ダッシュボードでリポジトリを連携
# 2. main ブランチへの push で自動デプロイ
```

3. **設定**:
   - Build Command: `make build`
   - Install Command: `bun install`
   - Output Directory: `web/dist`

### デプロイ設定詳細

`vercel.json` で以下を設定済み：

- **SPA ルーティング対応**: すべてのルートを `/index.html` にリライト
- **キャッシュ制御**: 静的ファイルに 1 日のキャッシュを設定

## コード品質管理

### Biome による統合管理

このプロジェクトでは [Biome](https://biomejs.dev/) を使用して以下を一括管理：

- **フォーマッター**: 一貫したコードスタイル
- **リンター**: 潜在的な問題を早期発見
- **インポート整理**: 最適化されたインポート順序

```bash
# 全てを一括実行
make format && make lint

# 個別実行
bun run format    # フォーマットのみ
bun run lint      # リントのみ
bun run check     # フォーマット + リント + インポート整理
```

## トラブルシューティング

### よくある問題と解決方法

#### 開発サーバーの問題

```bash
# ポート 5173 が使用中の場合
pkill -f "bun run dev"
make up
```

#### 依存関係の問題

```bash
# node_modules を再インストール
make clean
make setup
```

#### ビルドエラー

```bash
# TypeScript/Biome エラーの確認
make lint
make build
```

hoge

### パフォーマンス最適化

- **バンドルサイズ目標**: 500KB 以内 (gzip)
- **パフォーマンス指標**:
  - First Contentful Paint: 1.5 秒以内
  - Largest Contentful Paint: 2.5 秒以内
