import { Review } from '../types'

export const mockReviews: Review[] = [
  {
    id: '1',
    title: 'フロントエンドエンジニア',
    companyName: 'テックカンパニー株式会社',
    duration: '2021年4月 - 2023年3月（2年間）',
    rating: 4,
    goodPoints: 'モダンな技術スタックを採用しており、React、TypeScript、GraphQLなどの最新技術に触れることができました。また、チームワークが良く、コードレビューが丁寧で学習環境として優れていました。リモートワークも推進されており、ワークライフバランスが取りやすい環境でした。',
    concernPoints: '急速な成長フェーズのため、業務量が多く残業が発生することがありました。また、ドキュメントの整備が追いついておらず、新しいメンバーのオンボーディングに時間がかかる場合がありました。',
    tags: ['React', 'TypeScript', 'リモートワーク', 'スタートアップ'],
    isRecommended: true,
    createdAt: '2023-04-15T10:30:00Z',
    updatedAt: '2023-04-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'バックエンドエンジニア',
    companyName: 'グローバルソフト株式会社',
    duration: '2020年10月 - 2022年9月（2年間）',
    rating: 3,
    goodPoints: '大規模なシステム開発に携わることができ、アーキテクチャ設計やパフォーマンス改善など貴重な経験を積むことができました。福利厚生が充実しており、研修制度も整っていました。',
    concernPoints: 'レガシーシステムのメンテナンスが中心で、新しい技術を導入する機会が限定的でした。また、組織が大きいため意思決定に時間がかかり、スピード感のある開発が難しい場面がありました。',
    tags: ['Java', 'Spring', 'AWS', '大企業', 'エンタープライズ'],
    isRecommended: false,
    createdAt: '2022-10-20T14:15:00Z',
    updatedAt: '2022-10-20T14:15:00Z'
  },
  {
    id: '3',
    title: 'フルスタックエンジニア',
    companyName: 'イノベーション・ラボ株式会社',
    duration: '2022年1月 - 現在（2年以上）',
    rating: 5,
    goodPoints: 'フロントエンドからバックエンド、インフラまで幅広く担当できるため、技術的な成長が非常に早いです。裁量権が大きく、新しいアイデアを積極的に試すことができる環境です。チームメンバーのスキルレベルが高く、日々刺激を受けています。',
    concernPoints: '担当範囲が広いため、それぞれの技術を深く極めることが難しい場合があります。また、会社の成長に伴い頻繁に要件が変わることがあり、計画的な開発が難しい時もありました。',
    tags: ['React', 'Node.js', 'GraphQL', 'Docker', 'フルスタック'],
    isRecommended: true,
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-10T09:00:00Z'
  }
]

export const getReviewById = (id: string): Review | undefined => {
  return mockReviews.find(review => review.id === id)
}