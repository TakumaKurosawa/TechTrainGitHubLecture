import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Star, Plus } from 'lucide-react';

const Container = styled(motion.div)`
  min-height: 100vh;
  padding: 2rem;
  background-color: #f9fafb;
`;

const Header = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  flex: 1;
`;

const AddButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
  }
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ReviewCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const ReviewTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #6b7280;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ReviewText = styled.p`
  color: #374151;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #6b7280;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4b5563;
  }
`;

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// モックデータ
const mockReviews = [
  {
    id: 1,
    title: "素晴らしいレストラン体験",
    rating: 5,
    author: "田中太郎",
    date: "2024-01-15",
    content: "料理の味、サービス、雰囲気すべてが最高でした。特にメインディッシュが絶品で、また行きたいと思います。"
  },
  {
    id: 2,
    title: "コスパ最高のランチ",
    rating: 4,
    author: "佐藤花子",
    date: "2024-01-14",
    content: "この価格でこのクオリティは驚きです。ボリュームもあり、味も良く、満足度が高いランチでした。"
  },
  {
    id: 3,
    title: "雰囲気の良いカフェ",
    rating: 4,
    author: "山田次郎",
    date: "2024-01-13",
    content: "静かで落ち着いた雰囲気のカフェ。コーヒーも美味しく、読書や作業には最適な環境です。"
  }
];

const ReviewsListPage: React.FC = () => {
  return (
    <Container
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <BackButton to="/">← トップに戻る</BackButton>
      
      <Header>
        <Title>レビュー一覧</Title>
        <AddButton to="/reviews/new">
          <Plus size={18} />
          新規投稿
        </AddButton>
      </Header>

      <ReviewGrid>
        {mockReviews.map((review) => (
          <ReviewCard
            key={review.id}
            variants={cardVariants}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Link to={`/reviews/${review.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ReviewTitle>{review.title}</ReviewTitle>
              <ReviewMeta>
                <Rating>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < review.rating ? "#fbbf24" : "none"}
                      color={i < review.rating ? "#fbbf24" : "#d1d5db"}
                    />
                  ))}
                </Rating>
                <span>{review.author}</span>
                <span>{review.date}</span>
              </ReviewMeta>
              <ReviewText>{review.content}</ReviewText>
            </Link>
          </ReviewCard>
        ))}
      </ReviewGrid>
    </Container>
  );
};

export default ReviewsListPage;