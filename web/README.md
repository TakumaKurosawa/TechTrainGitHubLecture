# TechTrain Lecture - Web Application

React + TypeScript + Zustand による状態管理システムの実装

## 実装内容

### 🏪 Zustand ストア実装

- **App Store** (`src/store/app-store.ts`)
  - ユーザー状態管理 (currentUser, userRole)
  - アプリケーション状態 (isLoading, currentStep)
  - 通知システム
  - UI状態 (サイドバー、テーマ)

- **Search Store** (`src/store/search-store.ts`) 
  - 検索クエリ管理
  - フィルター状態
  - ページネーション
  - ソート機能
  - 検索履歴

- **Reviews Store** (`src/store/reviews-store.ts`)
  - レビュー一覧管理
  - タスク管理
  - ミーティング記録
  - チームメンバー情報
  - 一括操作機能

### 📊 TypeScript 型定義

`src/types/index.ts` にすべての型定義を集約：
- User, Review, Task, MeetingRecord
- SearchFilters, TeamMember
- WorkflowStep, AppNotification

### 🧪 モックデータ

`src/data/mock-data.ts` に日本語のサンプルデータを用意：
- 5名のユーザー情報
- 5件のレビューデータ
- 3件のタスクデータ
- チームメンバー情報

### ✨ 特徴

- **厳密な TypeScript 実装**: strict モード対応
- **パフォーマンス最適化**: セレクター分離による再レンダリング抑制
- **永続化対応**: LocalStorage との連携（Reviews Store）
- **開発者体験**: Zustand DevTools 統合
- **アクセシブル**: 日本語対応とユーザビリティ考慮

## セットアップ

```bash
# 依存関係インストール
cd web
bun install

# 開発サーバー起動
bun run dev

# ビルド
bun run build

# リント・フォーマット
bun run format
bun run lint
bun run check
```

## 使用例

```typescript
import { useAppStore, useReviewsStore } from './store';

const Component = () => {
  const { currentUser, setCurrentUser } = useAppStore();
  const { reviews, fetchReviews } = useReviewsStore();
  
  // ストアの状態を活用
};
```

## 技術スタック

- **React 18** - UI フレームワーク
- **TypeScript** - 型安全性
- **Zustand** - 状態管理
- **Vite** - ビルドツール
- **Biome** - リンター・フォーマッター