import type React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { pageVariants, pageTransition, staggerContainer, staggerChild } from '@/utils/animations';

const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: var(--color-neutral-600);
  font-size: 1.1rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const NewReviewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
  }
`;

const ReviewGrid = styled(motion.div)`
  display: grid;
  gap: 1.5rem;
`;

const ReviewCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-neutral-200);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ReviewTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-neutral-900);
  margin-bottom: 0.25rem;
`;

const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--color-neutral-500);
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
  color: var(--color-warning);
`;

const ReviewPreview = styled.p`
  color: var(--color-neutral-700);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ReadMoreLink = styled(Link)`
  color: var(--color-primary);
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-neutral-500);
`;

// Mock data for demonstration
const mockReviews = [
  {
    id: '1',
    title: '素晴らしいサービス体験',
    content: 'このサービスを利用して本当に良かったです。スタッフの対応が丁寧で、期待以上の結果を得ることができました...',
    rating: 5,
    author: '田中太郎',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2', 
    title: '良いが改善の余地あり',
    content: '全体的には満足していますが、いくつかの点で改善の余地があると思います。特に待ち時間に関して...',
    rating: 4,
    author: '佐藤花子',
    createdAt: new Date('2024-01-12'),
  },
  {
    id: '3',
    title: '期待していたほどではなかった',
    content: '評判を聞いて期待していましたが、実際に使ってみると期待していたほどではありませんでした...',
    rating: 3,
    author: '山田次郎',
    createdAt: new Date('2024-01-10'),
  },
];

const ReviewsListPage: React.FC = () => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStars = (rating: number): string => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <Container
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <Header>
        <div>
          <Title>レビュー一覧</Title>
          <Subtitle>ユーザーのレビューを閲覧できます</Subtitle>
        </div>
      </Header>

      <Actions>
        <NewReviewButton to="/reviews/new">
          ✍️ 新しいレビューを投稿
        </NewReviewButton>
      </Actions>

      {mockReviews.length > 0 ? (
        <ReviewGrid
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {mockReviews.map((review) => (
            <ReviewCard
              key={review.id}
              variants={staggerChild}
              whileHover={{ y: -2 }}
            >
              <ReviewHeader>
                <div>
                  <ReviewTitle>{review.title}</ReviewTitle>
                  <ReviewMeta>
                    <span>by {review.author}</span>
                    <span>•</span>
                    <span>{formatDate(review.createdAt)}</span>
                  </ReviewMeta>
                </div>
                <Rating>
                  <span>{renderStars(review.rating)}</span>
                  <span>({review.rating})</span>
                </Rating>
              </ReviewHeader>
              
              <ReviewPreview>
                {review.content.length > 100 
                  ? `${review.content.substring(0, 100)}...` 
                  : review.content
                }
              </ReviewPreview>
              
              <ReadMoreLink to={`/reviews/${review.id}`}>
                詳細を読む →
              </ReadMoreLink>
            </ReviewCard>
          ))}
        </ReviewGrid>
      ) : (
        <EmptyState>
          <h3>レビューがまだありません</h3>
          <p>最初のレビューを投稿してみませんか？</p>
        </EmptyState>
      )}
    </Container>
  );
};

export default ReviewsListPage;