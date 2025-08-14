import type { User, TeamMember, Review, Task, MeetingRecord } from '../types';

// Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: '田中 太郎',
    email: 'tanaka@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'manager',
    department: '開発部',
    createdAt: '2023-12-01T00:00:00Z',
  },
  {
    id: 'user-2',
    name: '佐藤 花子',
    email: 'sato@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'member',
    department: '開発部',
    createdAt: '2023-12-02T00:00:00Z',
  },
  {
    id: 'user-3',
    name: '山田 次郎',
    email: 'yamada@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'member',
    department: 'デザイン部',
    createdAt: '2023-12-03T00:00:00Z',
  },
  {
    id: 'user-4',
    name: '鈴木 美咲',
    email: 'suzuki@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'member',
    department: 'QA部',
    createdAt: '2023-12-04T00:00:00Z',
  },
  {
    id: 'user-5',
    name: '高橋 健一',
    email: 'takahashi@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    role: 'member',
    department: '開発部',
    createdAt: '2023-12-05T00:00:00Z',
  },
];

// Team Members
export const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: '田中 太郎',
    role: 'シニアエンジニア',
    department: '開発部',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    workload: 85,
    status: 'busy',
  },
  {
    id: 'team-2',
    name: '佐藤 花子',
    role: 'フロントエンド開発者',
    department: '開発部',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    workload: 65,
    status: 'active',
  },
  {
    id: 'team-3',
    name: '山田 次郎',
    role: 'UI/UXデザイナー',
    department: 'デザイン部',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    workload: 45,
    status: 'active',
  },
  {
    id: 'team-4',
    name: '鈴木 美咲',
    role: 'QAエンジニア',
    department: 'QA部',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    workload: 70,
    status: 'active',
  },
  {
    id: 'team-5',
    name: '高橋 健一',
    role: 'バックエンド開発者',
    department: '開発部',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    workload: 30,
    status: 'away',
  },
];

// Reviews
export const mockReviews: Review[] = [
  {
    id: 'review-1',
    title: 'React Hooks の効果的な使い方',
    description: 'useEffect や useState を使った効率的な状態管理について詳しく解説します。パフォーマンス最適化のテクニックも含めて説明します。特に、カスタムフックの作成方法や依存関係の管理について実践的な例を交えて説明しています。',
    author: '田中 太郎',
    authorId: 'user-1',
    rating: 4.5,
    comments: 12,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
    tags: ['React', 'JavaScript', 'Hooks', 'パフォーマンス'],
    status: 'published',
    category: 'Frontend',
  },
  {
    id: 'review-2',
    title: 'TypeScript 型安全性のベストプラクティス',
    description: 'TypeScript を使用した堅牢なアプリケーション開発のためのガイドライン。ジェネリクスや高度な型の活用方法を説明します。実際のプロジェクトで遭遇する複雑な型定義の問題とその解決策を具体例とともに紹介します。',
    author: '佐藤 花子',
    authorId: 'user-2',
    rating: 5.0,
    comments: 8,
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z',
    tags: ['TypeScript', '型安全性', 'ベストプラクティス'],
    status: 'published',
    category: 'Development',
  },
  {
    id: 'review-3',
    title: 'CSS-in-JS による効率的なスタイリング',
    description: 'styled-components を使用したコンポーネントベースのスタイリング手法。テーマ管理とレスポンシブデザインの実装について詳しく解説します。動的なスタイリングやパフォーマンス最適化のテクニックも含まれています。',
    author: '山田 次郎',
    authorId: 'user-3',
    rating: 4.2,
    comments: 15,
    createdAt: '2024-01-13T11:15:00Z',
    updatedAt: '2024-01-13T11:15:00Z',
    tags: ['CSS', 'styled-components', 'デザイン', 'レスポンシブ'],
    status: 'published',
    category: 'Design',
  },
  {
    id: 'review-4',
    title: 'React Router v6 移行ガイド',
    description: 'React Router v6 への移行で変更された API と新機能について。実際のプロジェクトでの移行経験をもとに解説します。ネストしたルートの管理や新しいフック API の使用方法について実践的なアドバイスを提供します。',
    author: '鈴木 美咲',
    authorId: 'user-4',
    rating: 4.8,
    comments: 7,
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    tags: ['React Router', '移行', 'ルーティング'],
    status: 'published',
    category: 'Frontend',
  },
  {
    id: 'review-5',
    title: 'パフォーマンス最適化テクニック',
    description: 'React アプリケーションのパフォーマンス改善方法。メモ化、遅延ローディング、バンドル最適化について詳しく説明します。実測データを交えながら、具体的な改善効果と実装方法を紹介しています。',
    author: '高橋 健一',
    authorId: 'user-5',
    rating: 4.6,
    comments: 23,
    createdAt: '2024-01-11T13:20:00Z',
    updatedAt: '2024-01-11T13:20:00Z',
    tags: ['パフォーマンス', '最適化', 'React', 'バンドル'],
    status: 'published',
    category: 'Performance',
  },
  {
    id: 'review-6',
    title: 'State Management with Zustand',
    description: 'Zustand を使用した軽量で効率的な状態管理。Redux との比較と実際の使用例を含めて解説します。大規模アプリケーションでの状態設計パターンや、パフォーマンスを考慮した実装方法について詳しく説明しています。',
    author: '田中 太郎',
    authorId: 'user-1',
    rating: 4.3,
    comments: 9,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
    tags: ['Zustand', '状態管理', 'Redux', 'React'],
    status: 'published',
    category: 'Development',
  },
  {
    id: 'review-7',
    title: 'モダンCSS Grid Layout の活用',
    description: 'CSS Grid を使用した柔軟で保守性の高いレイアウト実装について。複雑なレスポンシブデザインの実現方法を実例とともに解説します。',
    author: '山田 次郎',
    authorId: 'user-3',
    rating: 4.4,
    comments: 11,
    createdAt: '2024-01-09T15:30:00Z',
    updatedAt: '2024-01-09T15:30:00Z',
    tags: ['CSS', 'Grid', 'レスポンシブ', 'レイアウト'],
    status: 'draft',
    category: 'Design',
  },
];

// Tasks
export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'ダッシュボードコンポーネントの実装',
    description: 'ユーザー向けダッシュボードの基本コンポーネントを実装する。レスポンシブ対応と Zustand による状態管理を含む。',
    assigneeId: 'user-2',
    assigneeName: '佐藤 花子',
    priority: 'high',
    status: 'in_progress',
    dueDate: '2024-01-20T00:00:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    tags: ['React', 'Dashboard', 'Zustand'],
    estimatedHours: 16,
    actualHours: 8,
  },
  {
    id: 'task-2',
    title: 'API エンドポイントの設計',
    description: 'レビューシステム用の REST API エンドポイントを設計・実装する。OpenAPI 仕様書も作成する。',
    assigneeId: 'user-5',
    assigneeName: '高橋 健一',
    priority: 'high',
    status: 'review',
    dueDate: '2024-01-18T00:00:00Z',
    createdAt: '2024-01-12T09:00:00Z',
    tags: ['API', 'Backend', 'OpenAPI'],
    estimatedHours: 12,
    actualHours: 14,
  },
  {
    id: 'task-3',
    title: 'UI コンポーネントのテスト作成',
    description: '共通 UI コンポーネントの Jest + React Testing Library を使用したテストケースを作成する。',
    assigneeId: 'user-4',
    assigneeName: '鈴木 美咲',
    priority: 'medium',
    status: 'todo',
    dueDate: '2024-01-25T00:00:00Z',
    createdAt: '2024-01-14T14:00:00Z',
    tags: ['Testing', 'Jest', 'React'],
    estimatedHours: 10,
  },
  {
    id: 'task-4',
    title: 'デザインシステムの更新',
    description: 'カラーパレットとタイポグラフィの統一。Figma デザインファイルとコードの同期を行う。',
    assigneeId: 'user-3',
    assigneeName: '山田 次郎',
    priority: 'medium',
    status: 'done',
    dueDate: '2024-01-17T00:00:00Z',
    createdAt: '2024-01-10T11:00:00Z',
    tags: ['Design', 'Figma', 'Style'],
    estimatedHours: 8,
    actualHours: 6,
  },
  {
    id: 'task-5',
    title: 'パフォーマンス監視の導入',
    description: 'Web Vitals とアプリケーション監視ツールの導入。アラート設定とダッシュボード作成を含む。',
    assigneeId: 'user-1',
    assigneeName: '田中 太郎',
    priority: 'low',
    status: 'todo',
    dueDate: '2024-01-30T00:00:00Z',
    createdAt: '2024-01-16T08:30:00Z',
    tags: ['パフォーマンス', '監視', 'Analytics'],
    estimatedHours: 20,
  },
];

// Meeting Records
export const mockMeetingRecords: MeetingRecord[] = [
  {
    id: 'meeting-1',
    title: '週次開発チーム定例会議',
    date: '2024-01-15T14:00:00Z',
    participants: ['田中 太郎', '佐藤 花子', '山田 次郎', '鈴木 美咲', '高橋 健一'],
    agenda: [
      '前週の進捗確認',
      'スプリント目標の確認',
      'ブロッカーの共有',
      '今週のタスク割り当て',
    ],
    summary: '前週のスプリント目標は80%達成。ダッシュボード機能の実装が予定より遅れているが、今週中に完了予定。API設計のレビューが必要で、高橋さんが担当。テスト実装は順調に進行中。',
    actionItems: [
      mockTasks[0], // ダッシュボードコンポーネントの実装
      mockTasks[1], // API エンドポイントの設計
    ],
    createdAt: '2024-01-15T15:30:00Z',
  },
  {
    id: 'meeting-2',
    title: 'UI/UX レビュー会議',
    date: '2024-01-12T10:00:00Z',
    participants: ['田中 太郎', '山田 次郎', '佐藤 花子'],
    agenda: [
      '新しいデザインシステムの検討',
      'ユーザビリティテストの結果報告',
      'レスポンシブデザインの改善点',
    ],
    summary: 'デザインシステムの統一が必要。特にカラーパレットとタイポグラフィの標準化を優先する。ユーザビリティテストで発見された課題を次スプリントで対応予定。',
    actionItems: [
      mockTasks[3], // デザインシステムの更新
    ],
    createdAt: '2024-01-12T11:15:00Z',
  },
];

// Helper functions to get mock data
export const getMockUser = (role: 'member' | 'manager' = 'member'): User => {
  return mockUsers.find(user => user.role === role) || mockUsers[1];
};

export const getMockReviewsByCategory = (category: string): Review[] => {
  return mockReviews.filter(review => review.category.toLowerCase() === category.toLowerCase());
};

export const getMockTasksByStatus = (status: Task['status']): Task[] => {
  return mockTasks.filter(task => task.status === status);
};

export const getMockTeamMembersByStatus = (status: TeamMember['status']): TeamMember[] => {
  return mockTeamMembers.filter(member => member.status === status);
};