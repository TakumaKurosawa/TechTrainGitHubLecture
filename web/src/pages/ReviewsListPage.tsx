import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Plus, Star } from 'lucide-react';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Card } from '../components';
import { useReviewsStore, selectPublishedReviews } from '../store';

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

const ReviewsListPage: React.FC = () => {
  const navigate = useNavigate();
  const reviews = useReviewsStore(selectPublishedReviews);

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
        {reviews.map((review, index) => (
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
