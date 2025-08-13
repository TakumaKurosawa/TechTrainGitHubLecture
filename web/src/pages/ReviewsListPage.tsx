import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Plus, Star } from 'lucide-react';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Card } from '../components';

const Container = styled(motion.div)`
  min-height: 100vh;
  padding: 2rem;
  background: ${(props) => props.theme.colors.background};
`;

const Header = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text.primary};
`;

const ReviewGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ReviewCard = styled(motion(Card))`
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ReviewTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.875rem;
`;

const ReviewDescription = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReviewStats = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.875rem;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 0.125rem;
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

// モックデータ
const mockReviews = [
  {
    id: 1,
    title: 'React Hooks の効果的な使い方',
    description:
      'useEffect や useState を使った効率的な状態管理について詳しく解説します。パフォーマンス最適化のテクニックも含めて説明します。',
    author: '田中太郎',
    rating: 4.5,
    comments: 12,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'TypeScript 型安全性のベストプラクティス',
    description:
      'TypeScript を使用した堅牢なアプリケーション開発のためのガイドライン。ジェネリクスや高度な型の活用方法を説明します。',
    author: '佐藤花子',
    rating: 5.0,
    comments: 8,
    createdAt: '2024-01-14',
  },
  {
    id: 3,
    title: 'CSS-in-JS による効率的なスタイリング',
    description:
      'styled-components を使用したコンポーネントベースのスタイリング手法。テーマ管理とレスポンシブデザインの実装。',
    author: '山田次郎',
    rating: 4.2,
    comments: 15,
    createdAt: '2024-01-13',
  },
  {
    id: 4,
    title: 'React Router v6 移行ガイド',
    description:
      'React Router v6 への移行で変更された API と新機能について。実際のプロジェクトでの移行経験をもとに解説。',
    author: '鈴木美咲',
    rating: 4.8,
    comments: 7,
    createdAt: '2024-01-12',
  },
  {
    id: 5,
    title: 'パフォーマンス最適化テクニック',
    description:
      'React アプリケーションのパフォーマンス改善方法。メモ化、遅延ローディング、バンドル最適化について詳しく説明。',
    author: '高橋健一',
    rating: 4.6,
    comments: 23,
    createdAt: '2024-01-11',
  },
  {
    id: 6,
    title: 'State Management with Zustand',
    description:
      'Zustand を使用した軽量で効率的な状態管理。Redux との比較と実際の使用例を含めて解説します。',
    author: '中村あゆみ',
    rating: 4.3,
    comments: 9,
    createdAt: '2024-01-10',
  },
];

const ReviewsListPage: React.FC = () => {
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    const stars = [] as React.ReactNode[];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={16} fill="currentColor" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          size={16}
          fill="currentColor"
          style={{ opacity: 0.5 }}
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 1; i <= remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={16} style={{ opacity: 0.3 }} />
      );
    }

    return stars;
  };

  return (
    <Container
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <Title>レビュー一覧</Title>
        <Button
          variant="primary"
          onClick={() => navigate('/reviews/new')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          新規投稿
        </Button>
      </Header>

      <ReviewGrid
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {mockReviews.map((review, index) => (
          <ReviewCard
            key={review.id}
            variants={cardVariants}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
            onClick={() => navigate(`/reviews/${review.id}`)}
            whileHover={{
              y: -4,
              transition: { duration: 0.2 },
            }}
          >
            <ReviewHeader>
              <div>
                <ReviewTitle>{review.title}</ReviewTitle>
                <ReviewMeta>
                  <Calendar size={14} />
                  {review.createdAt} • {review.author}
                </ReviewMeta>
              </div>
            </ReviewHeader>

            <ReviewDescription>{review.description}</ReviewDescription>

            <ReviewStats>
              <StatItem>
                <RatingStars>{renderStars(review.rating)}</RatingStars>
                <span>{review.rating}</span>
              </StatItem>
              <StatItem>
                <MessageCircle size={16} />
                <span>{review.comments}</span>
              </StatItem>
            </ReviewStats>
          </ReviewCard>
        ))}
      </ReviewGrid>
    </Container>
  );
};

export default ReviewsListPage;
