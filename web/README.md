# Review App - React Router v6 実装

## 概要

このプロジェクトは React Router v6 を使用して以下のルーティング構成を実装しています：

- `/` - トップページ
- `/reviews` - レビュー一覧ページ
- `/reviews/:id` - レビュー詳細ページ
- `/reviews/new` - 新規レビュー投稿ページ

## 技術スタック

- **React** 18+ (TypeScript)
- **React Router** v6
- **Framer Motion** (ページ遷移アニメーション)
- **Styled Components** (スタイリング)
- **Vite** (ビルドツール)
- **Biome** (リント・フォーマット)
- **bun** (パッケージマネージャー)

## セットアップ

1. 依存関係のインストール:
```bash
cd web
bun install
```

2. 開発サーバーの起動:
```bash
bun run dev
```

3. リント・フォーマット:
```bash
bun run format  # フォーマットのみ
bun run lint    # リントのみ  
bun run check   # フォーマット+リント+インポート整理
```

4. プロダクションビルド:
```bash
bun run build
```

## 実装された機能

### ルーティング
- React Router v6 による SPA ルーティング
- 動的ルート (`/reviews/:id`) 対応
- 404 ページ対応（存在しないレビューID）

### アニメーション
- Framer Motion による滑らかなページ遷移
- リストアイテムのスタッガードアニメーション
- ホバーエフェクト

### UI コンポーネント
- レスポンシブデザイン
- Styled Components によるコンポーネントベーススタイリング
- 統一されたデザインシステム（カラーパレット、タイポグラフィ）

### ページ構成
- **TopPage**: アプリケーションの紹介とCTA
- **ReviewsListPage**: レビュー一覧表示（モックデータ）
- **ReviewDetailPage**: 個別レビューの詳細表示
- **NewReviewPage**: 新規レビュー投稿フォーム

## プロジェクト構造

```
src/
├── components/
│   ├── ui/              # 再利用可能なUIコンポーネント
│   └── layout/          # レイアウトコンポーネント
├── pages/               # ページコンポーネント
├── types/               # TypeScript 型定義
├── utils/               # ユーティリティ関数
├── styles/              # グローバルスタイル
├── App.tsx              # メインアプリケーション
└── main.tsx             # エントリーポイント
```

## 注意事項

- 現在はモックデータを使用しています
- 実際のAPI統合は未実装です
- レビュー投稿機能はフロントエンドのみの実装です