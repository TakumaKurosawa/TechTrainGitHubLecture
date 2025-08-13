import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Star, User, Calendar, Search, Filter } from "lucide-react";
import { Review } from "../types";
import { pageVariants, pageTransition, staggerContainer, staggerItem } from "../utils/animations";

const Container = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
`;

const SearchAndFilter = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SearchBox = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  width: 300px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  @media (max-width: 768px) {
    width: 250px;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #374151;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const ReviewGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ReviewCard = styled(motion(Link))`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

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
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StarIcon = styled(Star)<{ $filled: boolean }>`
  width: 16px;
  height: 16px;
  color: ${(props) => (props.$filled ? "#f59e0b" : "#d1d5db")};
  fill: ${(props) => (props.$filled ? "#f59e0b" : "none")};
`;

const ReviewContent = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReviewMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
`;

// Mock data for reviews
const mockReviews: Review[] = [
  {
    id: "1",
    title: "素晴らしいカフェでの体験",
    content: "このカフェのコーヒーは本当に素晴らしかった。雰囲気も良く、作業にも最適でした。スタッフの対応も丁寧で、また訪れたいと思います。",
    rating: 5,
    author: "田中太郎",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "映画館での映画鑑賞",
    content: "最新の映画を観てきました。音響システムが素晴らしく、臨場感がありました。ただし、座席がもう少し快適だと良いと思います。",
    rating: 4,
    author: "佐藤花子",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "3",
    title: "レストランでのランチ",
    content: "友人とランチで訪れました。料理の味は良かったのですが、サービスが少し遅く感じました。価格帯を考えると妥当だと思います。",
    rating: 3,
    author: "山田次郎",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
];

const ReviewsListPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReviews(mockReviews);
      setFilteredReviews(mockReviews);
    }, 100);
  }, []);

  useEffect(() => {
    const filtered = reviews.filter(
      (review) =>
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReviews(filtered);
  }, [searchTerm, reviews]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon key={index} $filled={index < rating} />
    ));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
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
        <Title>レビュー一覧</Title>
        <SearchAndFilter>
          <SearchBox>
            <SearchIcon size={20} />
            <SearchInput
              type="text"
              placeholder="レビューを検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>
          <FilterButton>
            <Filter size={18} />
            フィルター
          </FilterButton>
        </SearchAndFilter>
      </Header>

      {filteredReviews.length > 0 ? (
        <ReviewGrid
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              to={`/reviews/${review.id}`}
              variants={staggerItem}
              whileHover={{ y: -4 }}
            >
              <ReviewHeader>
                <RatingContainer>{renderStars(review.rating)}</RatingContainer>
              </ReviewHeader>
              <ReviewTitle>{review.title}</ReviewTitle>
              <ReviewContent>{review.content}</ReviewContent>
              <ReviewMeta>
                <Author>
                  <User size={16} />
                  {review.author}
                </Author>
                <Date>
                  <Calendar size={16} />
                  {formatDate(review.createdAt)}
                </Date>
              </ReviewMeta>
            </ReviewCard>
          ))}
        </ReviewGrid>
      ) : (
        <EmptyState>
          <EmptyStateTitle>レビューが見つかりません</EmptyStateTitle>
          <p>検索条件を変更するか、新しいレビューを投稿してください。</p>
        </EmptyState>
      )}
    </Container>
  );
};

export default ReviewsListPage;