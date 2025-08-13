# コーディングエージェント用システムプロンプト

## 技術スタック

### フロントエンド

- **フレームワーク**: React 18+ (TypeScript)
- **ビルドツール**: Vite
- **状態管理**: Zustand (軽量でシンプル)
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

## プロジェクト構成

```
web/
└── src/
    ├── components/          # 再利用可能なUIコンポーネント
    │   ├── ui/              # 基本UIコンポーネント (Button, Card, etc.)
    │   ├── layout/          # レイアウトコンポーネント
    │   └── features/        # 機能固有のコンポーネント
    ├── pages/               # ページコンポーネント
    │   ├── member/          # 部下ユースケースページ
    │   └── manager/         # マネージャーユースケースページ
    ├── hooks/               # カスタムフック
    ├── store/               # Zustand ストア
    ├── types/               # TypeScript 型定義
    ├── utils/               # ユーティリティ関数
    ├── data/                # モックデータ
    ├── assets/              # 静的アセット
    └── styles/              # グローバルスタイル
```

## 開発環境セットアップ

### 必要要件

- Node.js 18+
- bun 1.0+ (推奨) or pnpm 8+

### 使用可能コマンド

```bash
# プロジェクトセットアップ
make setup

# コードフォーマット
make format

# リント実行
make lint

# 開発サーバー起動
make up

# プロダクションビルド
make build

# クリーンアップ
make clean

# ヘルプ表示
make help
```

## コーディング規約

### TypeScript

- **厳格な型チェック**: `tsconfig.json` で `strict: true`
- **命名規則**:
  - コンポーネント: PascalCase (`TaskCard.tsx`)
  - ファイル: kebab-case (`task-management.ts`)
  - 変数・関数: camelCase (`handleSubmit`)
  - 定数: UPPER_SNAKE_CASE (`API_ENDPOINTS`)

### React コンポーネント

- **関数コンポーネント**: アロー関数で統一
- **Props の型定義**: インターフェースで明示的に定義
- **デフォルトエクスポート**: コンポーネントファイルのみ使用
- **フック**: カスタムフックは `use` プレフィックス

```typescript
// 良い例
interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  className?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, className }) => {
  // 実装
};

export default TaskCard;
```

### ディレクトリ構造規約

- **index.ts**: 各ディレクトリにバレルエクスポート用の index.ts を配置
- **共通コンポーネント**: `components/ui/` に配置
- **ページ固有**: `components/features/` に機能別で配置

### 実装優先順位

1. **基本レイアウト**: Layout コンポーネント、TopPage ✅
2. **状態管理**: Zustand ストア、型定義 ✅
3. **UI コンポーネント**: Styled Components による精密デザイン制御 ✅
4. **ルーティング**: React Router の実装 🔄
5. **フォーム**: React Hook Form + Zod 🔄
6. **モックデータ**: 各種サンプルデータ ✅

### コード品質管理（Biome）

- **統合ツール**: フォーマッター・リンター・インポートソートが一体化
- **高速処理**: Rust ベースで npm scripts が高速実行
- **設定ファイル**: `biome.json` で一元管理
- **実行コマンド**:
  - `bun run format`: コードフォーマット
  - `bun run lint`: リント実行
  - `bun run check`: フォーマット＋リント＋インポート整理を一括実行

## UI/UX 実装ガイドライン

### デザインシステム

- **カラーパレット**:

  - Primary: Blue (#3B82F6)
  - Secondary: Indigo (#6366F1)
  - Success: Green (#10B981)
  - Warning: Amber (#F59E0B)
  - Danger: Red (#EF4444)
  - Neutral: Gray scale (#F9FAFB ~ #111827)

- **タイポグラフィ**:

  - フォント: Inter (Google Fonts)
  - サイズ: Tailwind のデフォルトスケール使用

- **スペーシング**: Tailwind の 4px ベーススケール
- **コーナー**: rounded-lg (8px) を基本とする

### レスポンシブ対応

- **ブレークポイント**:
  - sm: 640px (タブレット縦)
  - md: 768px (タブレット横)
  - lg: 1024px (デスクトップ)
  - xl: 1280px (大画面)

## Styled Components 実装指針

### 基本原則

#### 1. **命名規則**

```typescript
// ✅ 良い例: 意図が明確なコンポーネント名
const Container = styled.div``;
const Header = styled.div``;
const MemberCard = styled(motion.div)``;
const StatusBadge = styled.div<{ $trend: "up" | "down" | "stable" }>``;

// ❌ 避ける: 汎用的すぎる名前
const Wrapper = styled.div``;
const Box = styled.div``;
```

#### 2. **プロパティ命名（$プレフィックス）**

```typescript
// ✅ transient props使用（DOMに渡されない）
const WorkloadFill = styled.div<{ $workload: number }>`
  width: ${(props) => props.$workload}%;
  background-color: ${(props) =>
    props.$workload > 80
      ? "#ef4444"
      : props.$workload > 60
      ? "#f59e0b"
      : "#10b981"};
`;

// ❌ 通常のprops（DOMエラーの原因）
const BadExample = styled.div<{ workload: number }>``;
```

#### 3. **条件分岐の実装**

```typescript
// ✅ 三項演算子での条件分岐
const StatusBadge = styled.div<{ $trend: "up" | "down" | "stable" }>`
  background-color: ${(props) =>
    props.$trend === "up"
      ? "#10b981"
      : props.$trend === "down"
      ? "#ef4444"
      : "#9ca3af"};
`;

// ✅ 複雑な条件はヘルパー関数
const getStatusColor = (trend: string) => {
  switch (trend) {
    case "up":
      return "#10b981";
    case "down":
      return "#ef4444";
    default:
      return "#9ca3af";
  }
};

const StatusBadge = styled.div<{ $trend: string }>`
  background-color: ${(props) => getStatusColor(props.$trend)};
`;
```

#### 4. **アニメーション統合**

```typescript
// ✅ Framer Motion との組み合わせ
const MemberCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9fafb;
    transform: translateY(-2px);
  }
`;

// 使用例
<MemberCard whileHover={{ y: -2 }} />;
```

### パフォーマンス最適化

#### 1. **styled-components の基本設定**

```typescript
// vite.config.ts での設定例
export default defineConfig({
  plugins: [
    react(),
    // styled-components の最適化
  ],
  define: {
    // production build での最適化
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});
```

#### 2. **再レンダリング最適化**

```typescript
// ✅ useMemo でスタイルコンポーネントをメモ化
const StyledComponent = useMemo(
  () => styled.div`
    // スタイル定義
  `,
  []
);

// ✅ 静的スタイルは外部で定義
const StaticCard = styled.div`
  background: white;
  border-radius: 8px;
`;
```

### デバッグ・開発体験向上

#### **TypeScript 統合**

```typescript
// styled-components の型拡張
import styled from "styled-components";
import { motion } from "framer-motion";

// 基本的な型定義例
interface CardProps {
  $isActive: boolean;
  $variant: "primary" | "secondary";
}

const Card = styled.div<CardProps>`
  background-color: ${(props) =>
    props.$variant === "primary" ? "#3b82f6" : "#6b7280"};
  opacity: ${(props) => (props.$isActive ? 1 : 0.6)};
`;
```

### ベストプラクティス

#### 1. **コンポーネント設計**

- **単一責任**: 1 つのコンポーネントは 1 つの責任を持つ
- **再利用性**: プロパティで柔軟性を持たせる
- **可読性**: 意図が明確な命名とコメント

#### 2. **スタイル管理**

- **テーマ統合**: カラーパレット・タイポグラフィの一元管理
- **レスポンシブ**: メディアクエリの標準化
- **アニメーション**: transition の一貫性

#### 3. **チーム開発**

- **コードレビュー**: スタイルコンポーネントの命名・構造
- **ドキュメント**: 複雑なコンポーネントの使用例記載
- **テスト**: スナップショットテストでスタイル回帰防止

## アニメーション実装指針

### Framer Motion の使用方針

- **ページ遷移**: `AnimatePresence` でスムーズな画面切り替え
- **ローディング**: AI 処理中のアニメーション演出を重視
- **インタラクション**: ホバー・クリック時の微細なフィードバック
- **リスト表示**: `staggerChildren` でタスクカードの段階的表示

### パフォーマンス考慮

- **transform プロパティ**: `translateX/Y`, `scale`, `opacity` を優先
- **will-change**: アニメーション要素に適切に設定
- **アニメーション時間**: 基本は 200-300ms、複雑な処理は 500ms 以内

```typescript
// アニメーション例
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

## 状態管理設計

### Zustand ストア構成

```typescript
// グローバル状態の例
interface AppState {
  // ユーザー関連
  currentUser: User | null;
  userRole: "member" | "manager";

  // アプリケーション状態
  isLoading: boolean;
  currentStep: WorkflowStep;

  // データ
  meetingRecord: MeetingRecord | null;
  generatedTasks: Task[];
  teamMembers: TeamMember[];

  // アクション
  setCurrentUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  updateTasks: (tasks: Task[]) => void;
}
```

## パフォーマンス要件

### 目標指標

- **First Contentful Paint**: 1.5 秒以内
- **Largest Contentful Paint**: 2.5 秒以内
- **アニメーション**: 60fps 維持
- **バンドルサイズ**: 500KB 以内（gzip 圧縮後）

### 最適化手法

- **コード分割**: React.lazy() でページ単位の遅延読み込み
- **画像最適化**: WebP 形式、適切なサイジング
- **Bundle 分析**: `bun run build && bunx vite-bundle-analyzer dist` で定期確認
  - または `make build` コマンドでプロダクションビルド実行

## デプロイメント設定

### Vercel 設定

```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=86400"
        }
      ]
    }
  ]
}
```

## 品質保証

### 対象ブラウザ

- **Chrome**: 最新版のみサポート（モックアプリのため）

### チェックリスト

- [ ] 全画面でレスポンシブ対応
- [ ] ローディング状態の適切な表示
- [ ] エラーハンドリングの実装
- [ ] アニメーションのパフォーマンス確認（Chrome DevTools）
- [ ] アクセシビリティ基本対応（スクリーンリーダー対応）

## 開発フロー

### ブランチ戦略（トランクベース開発 + PR）

- `main`: 唯一のメインブランチ
- **短命な実装用ブランチ**: タスク単位で作成
- **Pull Request**: 全ての変更は PR 経由で main にマージ
- **高頻度マージ**: 小さな変更を頻繁にマージして開発スピードを最大化

#### ワークフロー

1. `main` から短命なブランチを作成（例: `feat/task-card-component`）
2. なるべく小さな変更でタスクを実装
3. PR 作成 → 自動チェック（Biome + ビルド確認）

### コミット規約

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル修正
refactor: リファクタリング
test: テスト追加・修正
chore: その他の変更
```

## トラブルシューティング

### よくある問題と解決方法

#### Biome 関連

```bash
# checkコマンドでエラーが発生した場合
bun run format  # フォーマットのみ実行
bun run lint    # リントのみ実行

# 一括処理したい場合
bunx biome check --apply .  # 直接実行
```

#### 開発サーバー関連

```bash
# ポート5173が使用中の場合
pkill -f "bun run dev"  # 既存プロセス停止
bun run dev             # 再起動
```

#### Styled Components 関連

```bash
# styled-components のインストール（型定義含む）
bun add styled-components
bun add -d @types/styled-components

# TypeScriptエラー「styled is not defined」
# → import文を確認
import styled from 'styled-components';

# DOMに不正なpropsが渡されるエラー
# → $プレフィックスを使用（transient props）
const Component = styled.div<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? 'blue' : 'gray'};
`;

# スタイルが適用されない場合
# → ビルドツールの設定確認
# vite.config.ts で styled-components の設定追加を検討
```

#### UI 品質向上のためのチェックリスト

```bash
# 1. Styled Components 導入前後の比較確認
# - ユーザビリティテスト実施
# - デザインレビュー（精密さ・一貫性）
# - パフォーマンス測定（Core Web Vitals）

# 2. チーム開発時の注意点
# - 命名規則の統一（Container, Header, Card等）
# - プロパティ命名（$プレフィックス必須）
# - コードレビューでのスタイル品質確認
```

この技術要件書に従って、高品質なモックアプリケーションの開発を進めてください。
