import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Building,
  Calendar,
  Clock,
  Heart,
  Star,
  Tag,
  ThumbsUp,
} from 'lucide-react';
import type React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components';

const Container = styled(motion.div)`
  min-height: 100vh;
  padding: 2rem;
  background: ${(props) => props.theme.colors.background.primary};
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  margin-bottom: 2rem;
`;

const BackButton = styled(Button)`
  margin-bottom: 1rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const Meta = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${(props) => props.theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border.light};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.875rem;
`;

const CompanyName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  font-size: 1rem;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 0.125rem;
`;

const RatingValue = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-left: 0.25rem;
`;

const Content = styled(motion.div)`
  margin-bottom: 3rem;
`;

const ReviewSection = styled.div`
  background: ${(props) => props.theme.colors.surface};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.border.light};
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SectionContent = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.6;
  font-size: 1rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TagItem = styled.span`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const RecommendSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${(props) => props.theme.colors.surface};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 2px solid ${(props) => props.theme.colors.success};
`;

const RecommendIcon = styled(ThumbsUp)`
  color: ${(props) => props.theme.colors.success};
  flex-shrink: 0;
`;

const RecommendText = styled.div`
  color: ${(props) => props.theme.colors.success};
  font-weight: 600;
  font-size: 1.1rem;
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const NotFoundTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const NotFoundDescription = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 2rem;
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// モックデータ - Issue要件に基づいて実装
const mockReviews = {
  1: {
    id: 1,
    title: 'React Hooks の効果的な使い方',
    companyName: '株式会社テックイノベート',
    period: '2024年1月～2024年3月',
    rating: 4.5,
    goodPoints: `React Hooks の導入により、関数コンポーネントでも状態管理やライフサイクルメソッドが使用できるようになり、開発効率が大幅に向上しました。

特に以下の点が素晴らしかったです：

• useState による直感的な状態管理
• useEffect による副作用の適切な処理
• カスタムフックによるロジックの再利用
• コードの可読性とメンテナンス性の向上`,
    concernPoints: `一方で、以下の点で改善の余地があると感じました：

• useEffect の依存配列の設定が複雑で、初学者には理解が困難
• パフォーマンス最適化のためのuseMemo/useCallbackの適切な使用タイミングが難しい
• 既存のクラスコンポーネントからの移行コストが高い`,
    tags: ['React', 'JavaScript', 'フロントエンド', 'Hooks'],
    isRecommended: true,
    createdAt: '2024-01-15',
  },
  2: {
    id: 2,
    title: 'TypeScript 型安全性のベストプラクティス',
    companyName: '株式会社デジタルソリューション',
    period: '2023年10月～2024年2月',
    rating: 5.0,
    goodPoints: `TypeScript の型システムを活用することで、開発時のバグを大幅に減らすことができました。

特に評価できる点：

• 厳密な型チェックによるランタイムエラーの予防
• IDEの補完機能が充実しており、開発スピードが向上
• ジェネリクスを使った再利用可能なコードの実装
• リファクタリング時の安全性が格段に向上`,
    concernPoints: `改善が必要だと感じた点：

• 初期学習コストが高く、チーム全体での習得に時間がかかる
• 型定義が複雑になりがちで、コードが冗長になることがある
• 外部ライブラリの型定義が不十分な場合の対応が困難
• ビルド時間の増加が気になる場面がある`,
    tags: ['TypeScript', '型安全性', 'JavaScript', 'フロントエンド', 'バックエンド'],
    isRecommended: true,
    createdAt: '2024-01-14',
  },
  3: {
    id: 3,
    title: 'Vue.js 3 Composition API 体験レビュー',
    companyName: '合同会社ウェブクリエイト',
    period: '2023年12月～2024年1月',
    rating: 3.8,
    goodPoints: `Vue.js 3のComposition APIを実際のプロジェクトで使用してみた感想です。

良かった点：

• ロジックの再利用がしやすくなった
• TypeScriptとの親和性が向上
• より柔軟なコンポーネント設計が可能
• 大規模なアプリケーションでの管理がしやすい`,
    concernPoints: `気になった点：

• 学習コストがそれなりに高い
• Options APIとの使い分けが難しい
• 既存プロジェクトでの移行が大変
• ドキュメントがまだ充実していない部分がある`,
    tags: ['Vue.js', 'Composition API', 'フロントエンド'],
    isRecommended: false,
    createdAt: '2024-01-10',
  },
};

const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const reviewId = id ? Number.parseInt(id, 10) : null;
  const review = reviewId
    ? mockReviews[reviewId as keyof typeof mockReviews]
    : null;

  const renderStars = (rating: number) => {
    const stars = [] as React.ReactNode[];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={18} fill="currentColor" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          size={18}
          fill="currentColor"
          style={{ opacity: 0.5 }}
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 1; i <= remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={18} style={{ opacity: 0.3 }} />
      );
    }

    return stars;
  };

  if (!review) {
    return (
      <Container
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        <NotFound>
          <NotFoundTitle>レビューが見つかりません</NotFoundTitle>
          <NotFoundDescription>
            指定されたレビューは存在しないか、削除された可能性があります。
          </NotFoundDescription>
          <Button variant="primary" onClick={() => navigate('/reviews')}>
            レビュー一覧に戻る
          </Button>
        </NotFound>
      </Container>
    );
  }

  return (
    <Container
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <Header>
        <BackButton
          variant="ghost"
          onClick={() => navigate('/reviews')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} />
          戻る
        </BackButton>

        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {review.title}
        </Title>

        <Meta
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <CompanyName>
            <Building size={16} />
            {review.companyName}
          </CompanyName>
          <MetaItem>
            <Clock size={16} />
            期間: {review.period}
          </MetaItem>
          <MetaItem>
            <Calendar size={16} />
            作成日時: {review.createdAt}
          </MetaItem>
          <RatingSection>
            <Star size={16} fill="currentColor" />
            <span>評価:</span>
            <RatingStars>{renderStars(review.rating)}</RatingStars>
            <RatingValue>{review.rating}</RatingValue>
          </RatingSection>
        </Meta>
      </Header>

      <Content
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <ReviewSection>
          <SectionTitle>
            <Heart size={20} />
            良かった点
          </SectionTitle>
          <SectionContent>
            {review.goodPoints.split('\n').map((paragraph, index) => (
              <p key={index} style={{ marginBottom: '1rem' }}>
                {paragraph}
              </p>
            ))}
          </SectionContent>
        </ReviewSection>

        <ReviewSection>
          <SectionTitle style={{ color: '#f59e0b' }}>
            <Star size={20} />
            気になった点
          </SectionTitle>
          <SectionContent>
            {review.concernPoints.split('\n').map((paragraph, index) => (
              <p key={index} style={{ marginBottom: '1rem' }}>
                {paragraph}
              </p>
            ))}
          </SectionContent>
        </ReviewSection>

        <ReviewSection>
          <SectionTitle>
            <Tag size={20} />
            タグ
          </SectionTitle>
          <TagsContainer>
            {review.tags.map((tag) => (
              <TagItem key={tag}>{tag}</TagItem>
            ))}
          </TagsContainer>
        </ReviewSection>

        {review.isRecommended && (
          <RecommendSection>
            <RecommendIcon size={24} />
            <RecommendText>この技術・サービスをおすすめします！</RecommendText>
          </RecommendSection>
        )}
      </Content>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{ textAlign: 'center', marginTop: '2rem' }}
      >
        <Button
          variant="primary"
          onClick={() => navigate('/reviews')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} />
          レビュー一覧に戻る
        </Button>
      </motion.div>
    </Container>
  );
};

export default ReviewDetailPage;