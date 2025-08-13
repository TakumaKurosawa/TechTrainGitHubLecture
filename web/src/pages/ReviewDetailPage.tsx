import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowLeft, Star, User, Calendar, Edit, Trash2, Heart } from "lucide-react";
import { Review } from "../types";
import { pageVariants, pageTransition } from "../utils/animations";

const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
`;

const ReviewContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const ReviewHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ReviewTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const ReviewMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  color: #6b7280;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StarIcon = styled(Star)<{ $filled: boolean }>`
  width: 20px;
  height: 20px;
  color: ${(props) => (props.$filled ? "#f59e0b" : "#d1d5db")};
  fill: ${(props) => (props.$filled ? "#f59e0b" : "none")};
`;

const RatingText = styled.span`
  font-weight: 600;
  color: #374151;
`;

const ReviewContent = styled.div`
  margin-bottom: 2rem;
`;

const ContentText = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
  color: #374151;
  white-space: pre-wrap;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled.button<{ $variant?: "primary" | "danger" }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;

  ${(props) => {
    if (props.$variant === "danger") {
      return `
        background-color: #fee2e2;
        border: 1px solid #fecaca;
        color: #dc2626;

        &:hover {
          background-color: #fecaca;
          border-color: #f87171;
        }
      `;
    }
    return `
      background-color: #eff6ff;
      border: 1px solid #dbeafe;
      color: #2563eb;

      &:hover {
        background-color: #dbeafe;
        border-color: #93c5fd;
      }
    `;
  }}
`;

const LikeButton = styled.button<{ $liked: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  background-color: ${(props) => (props.$liked ? "#fef2f2" : "#f9fafb")};
  border: 1px solid ${(props) => (props.$liked ? "#fecaca" : "#e5e7eb")};
  color: ${(props) => (props.$liked ? "#dc2626" : "#6b7280")};

  &:hover {
    background-color: ${(props) => (props.$liked ? "#fecaca" : "#f3f4f6")};
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const NotFoundTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const NotFoundText = styled.p`
  color: #6b7280;
  margin-bottom: 2rem;
`;

// Mock data
const mockReviews: Review[] = [
  {
    id: "1",
    title: "素晴らしいカフェでの体験",
    content: `このカフェのコーヒーは本当に素晴らしかった。雰囲気も良く、作業にも最適でした。

スタッフの対応も丁寧で、質問にも親切に答えてくれました。特にエスプレッソの味は格別で、豆の香りがとても良く感じられました。

店内のインテリアも洗練されており、長時間滞在しても快適でした。WiFiも安定していて、リモートワークにも最適な環境だと思います。

また訪れたいと思える素敵なお店でした。`,
    rating: 5,
    author: "田中太郎",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "映画館での映画鑑賞",
    content: `最新の映画を観てきました。音響システムが素晴らしく、臨場感がありました。

座席も比較的快適で、スクリーンの見やすさも良好でした。ただし、ポップコーンの価格がやや高めに感じました。

映画の内容自体は期待以上で、音響効果と大画面での体験は家庭では味わえないものでした。

次回も利用したいと思います。`,
    rating: 4,
    author: "佐藤花子",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "3",
    title: "レストランでのランチ",
    content: `友人とランチで訪れました。料理の味は良かったのですが、サービスが少し遅く感じました。

メニューの種類は豊富で、価格帯も手頃でした。特にパスタは美味しく、ボリュームも適量でした。

店内の雰囲気は落ち着いており、会話を楽しむには良い環境だと思います。

価格帯を考えると妥当な品質だと思います。`,
    rating: 3,
    author: "山田次郎",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
];

const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundReview = mockReviews.find((r) => r.id === id);
      setReview(foundReview || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon key={index} $filled={index < rating} />
    ));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <Container
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <LoadingState>レビューを読み込んでいます...</LoadingState>
      </Container>
    );
  }

  if (!review) {
    return (
      <Container
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <BackButton to="/reviews">
          <ArrowLeft size={20} />
          レビュー一覧に戻る
        </BackButton>
        <NotFound>
          <NotFoundTitle>レビューが見つかりません</NotFoundTitle>
          <NotFoundText>
            指定されたレビューは存在しないか、削除された可能性があります。
          </NotFoundText>
          <Link to="/reviews">レビュー一覧に戻る</Link>
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
      transition={pageTransition}
    >
      <BackButton to="/reviews">
        <ArrowLeft size={20} />
        レビュー一覧に戻る
      </BackButton>

      <ReviewContainer>
        <ReviewHeader>
          <ReviewTitle>{review.title}</ReviewTitle>
          <ReviewMeta>
            <MetaItem>
              <User size={18} />
              {review.author}
            </MetaItem>
            <MetaItem>
              <Calendar size={18} />
              {formatDate(review.createdAt)}
            </MetaItem>
            <RatingContainer>
              {renderStars(review.rating)}
              <RatingText>{review.rating}/5</RatingText>
            </RatingContainer>
          </ReviewMeta>
        </ReviewHeader>

        <ReviewContent>
          <ContentText>{review.content}</ContentText>
        </ReviewContent>

        <ActionBar>
          <LikeButton
            $liked={liked}
            onClick={() => setLiked(!liked)}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
            {liked ? "いいね済み" : "いいね"}
          </LikeButton>
          <ActionButtons>
            <ActionButton>
              <Edit size={16} />
              編集
            </ActionButton>
            <ActionButton $variant="danger">
              <Trash2 size={16} />
              削除
            </ActionButton>
          </ActionButtons>
        </ActionBar>
      </ReviewContainer>
    </Container>
  );
};

export default ReviewDetailPage;