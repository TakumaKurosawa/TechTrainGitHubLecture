import type React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { pageVariants, pageTransition } from '@/utils/animations';

const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  font-weight: 500;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: color 0.2s ease;

  &:hover {
    color: #2563eb;
  }
`;

const ReviewCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-neutral-200);
`;

const ReviewHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-neutral-200);
`;

const ReviewTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const ReviewMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

const StarDisplay = styled.span`
  color: var(--color-warning);
  font-size: 1.2rem;
`;

const RatingValue = styled.span`
  color: var(--color-neutral-700);
  font-size: 1.1rem;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-neutral-600);
`;

const AuthorAvatar = styled.div`
  width: 32px;
  height: 32px;
  background-color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

const DateInfo = styled.span`
  color: var(--color-neutral-500);
  font-size: 0.95rem;
`;

const ReviewContent = styled.div`
  line-height: 1.8;
  color: var(--color-neutral-700);
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-neutral-500);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--color-neutral-700);
  }

  p {
    margin-bottom: 2rem;
  }
`;

const NotFoundButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
  }
`;

// Mock data for demonstration
const mockReviews: Record<string, {
  id: string;
  title: string;
  content: string;
  rating: number;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}> = {
  '1': {
    id: '1',
    title: '素晴らしいサービス体験',
    content: `このサービスを利用して本当に良かったです。スタッフの対応が丁寧で、期待以上の結果を得ることができました。

最初は少し不安もありましたが、実際に利用してみると、その心配は杞憂でした。特に印象的だったのは、細かな要望にも快く対応してくれたことです。

料金についても明確で、追加料金などもなく安心して利用できました。また機会があれば、ぜひ再度利用したいと思います。

友人にもおすすめしたいサービスです。`,
    rating: 5,
    author: '田中太郎',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  '2': {
    id: '2',
    title: '良いが改善の余地あり',
    content: `全体的には満足していますが、いくつかの点で改善の余地があると思います。

特に待ち時間に関してですが、予約時間から実際の開始まで30分ほど待たされました。事前に連絡があれば良かったのですが、当日まで分からなかったのは少し残念でした。

サービス自体の品質は高く、スタッフの技術力も申し分ありません。ただ、時間管理の面で改善されれば、より良いサービスになると思います。

価格に見合った価値は十分にあると思いますので、時間に余裕を持って利用すれば問題ないでしょう。`,
    rating: 4,
    author: '佐藤花子',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
  '3': {
    id: '3',
    title: '期待していたほどではなかった',
    content: `評判を聞いて期待していましたが、実際に使ってみると期待していたほどではありませんでした。

サービス内容自体は悪くないのですが、事前の説明と実際の内容に若干のギャップを感じました。もう少し詳細な説明があれば良かったと思います。

スタッフの方は親切でしたが、経験不足を感じる場面もありました。ベテランのスタッフに対応してもらえれば、また違った結果だったかもしれません。

価格を考えると、もう少し内容の充実を期待したいところです。`,
    rating: 3,
    author: '山田次郎',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
};

const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const review = id ? mockReviews[id] : null;

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

  const getAuthorInitial = (name: string): string => {
    return name.charAt(0);
  };

  if (!review) {
    return (
      <Container
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <BackLink to="/reviews">
          ← レビュー一覧に戻る
        </BackLink>
        
        <NotFound>
          <h2>レビューが見つかりません</h2>
          <p>指定されたレビューは存在しないか、削除された可能性があります。</p>
          <NotFoundButton to="/reviews">
            レビュー一覧に戻る
          </NotFoundButton>
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
      <BackLink to="/reviews">
        ← レビュー一覧に戻る
      </BackLink>

      <ReviewCard>
        <ReviewHeader>
          <ReviewTitle>{review.title}</ReviewTitle>
          
          <ReviewMeta>
            <Rating>
              <StarDisplay>{renderStars(review.rating)}</StarDisplay>
              <RatingValue>({review.rating}/5)</RatingValue>
            </Rating>
            
            <Author>
              <AuthorAvatar>
                {getAuthorInitial(review.author)}
              </AuthorAvatar>
              <span>{review.author}</span>
            </Author>
            
            <DateInfo>
              {formatDate(review.createdAt)}
            </DateInfo>
          </ReviewMeta>
        </ReviewHeader>

        <ReviewContent>
          {review.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </ReviewContent>
      </ReviewCard>
    </Container>
  );
};

export default ReviewDetailPage;