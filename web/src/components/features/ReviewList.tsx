import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Star, ThumbsUp, Calendar, Building, User } from "lucide-react";
import { useReviewStore } from "../../store/reviewStore";
import { Review } from "../../types";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 32px;
  text-align: center;
`;

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`;

const ReviewCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const CompanyName = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InternshipName = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 8px;
`;

const Duration = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #9ca3af;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RatingScore = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #3b82f6;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 2px;
`;

const ReviewContent = styled.div`
  margin: 16px 0;
`;

const ContentSection = styled.div`
  margin-bottom: 16px;
`;

const SectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const SectionContent = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #6b7280;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`;

const Tag = styled.span`
  padding: 4px 12px;
  background: #f3f4f6;
  color: #374151;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
`;

const RecommendedBadge = styled.div<{ $recommended: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  background: ${(props) => (props.$recommended ? "#dcfce7" : "#fee2e2")};
  color: ${(props) => (props.$recommended ? "#16a34a" : "#dc2626")};
  width: fit-content;
`;

const NoReviews = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #9ca3af;
`;

const NoReviewsIcon = styled(User)`
  margin: 0 auto 16px;
  opacity: 0.5;
`;

const NoReviewsText = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
`;

const NoReviewsSubtext = styled.p`
  font-size: 14px;
`;

interface ReviewItemProps {
  review: Review;
  index: number;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review, index }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        color="#fbbf24"
        fill={i < rating ? "#fbbf24" : "none"}
      />
    ));
  };

  return (
    <ReviewCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <ReviewHeader>
        <CompanyInfo>
          <CompanyName>
            <Building size={20} />
            {review.companyName}
          </CompanyName>
          <InternshipName>{review.internshipName}</InternshipName>
          <Duration>
            <Calendar size={14} />
            {review.duration}
          </Duration>
        </CompanyInfo>
        <RatingContainer>
          <RatingScore>{review.rating}</RatingScore>
          <StarContainer>
            {renderStars(review.rating)}
          </StarContainer>
        </RatingContainer>
      </ReviewHeader>
      
      <ReviewContent>
        <ContentSection>
          <SectionTitle>良かった点</SectionTitle>
          <SectionContent>{review.goodPoints}</SectionContent>
        </ContentSection>
        
        <ContentSection>
          <SectionTitle>気になった点</SectionTitle>
          <SectionContent>{review.concerns}</SectionContent>
        </ContentSection>
      </ReviewContent>
      
      {review.tags.length > 0 && (
        <TagContainer>
          {review.tags.map((tag, tagIndex) => (
            <Tag key={tagIndex}>{tag}</Tag>
          ))}
        </TagContainer>
      )}
      
      <RecommendedBadge $recommended={review.recommended}>
        <ThumbsUp size={16} />
        {review.recommended ? "おすすめ" : "微妙"}
      </RecommendedBadge>
    </ReviewCard>
  );
};

const ReviewList: React.FC = () => {
  const reviews = useReviewStore((state) => state.reviews);
  
  if (reviews.length === 0) {
    return (
      <Container>
        <Title>インターンレビュー一覧</Title>
        <NoReviews>
          <NoReviewsIcon size={64} />
          <NoReviewsText>まだレビューがありません</NoReviewsText>
          <NoReviewsSubtext>
            最初のレビューを投稿してみましょう！
          </NoReviewsSubtext>
        </NoReviews>
      </Container>
    );
  }
  
  return (
    <Container>
      <Title>インターンレビュー一覧 ({reviews.length}件)</Title>
      <ReviewGrid>
        {reviews.map((review, index) => (
          <ReviewItem key={review.id} review={review} index={index} />
        ))}
      </ReviewGrid>
    </Container>
  );
};

export default ReviewList;