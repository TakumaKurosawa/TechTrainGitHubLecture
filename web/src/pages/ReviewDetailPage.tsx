import type React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Star, MessageCircle, Calendar, User, Heart } from 'lucide-react';
import { Button, Card } from '../components';

const Container = styled(motion.div)`
  min-height: 100vh;
  padding: 2rem;
  background: ${(props) => props.theme.colors.background};
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
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 0.875rem;
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
`;

const Content = styled(motion.div)`
  margin-bottom: 3rem;
`;

const Description = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 2rem;
`;

const DetailSection = styled.div`
  background: ${(props) => props.theme.colors.surface};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const SectionContent = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.6;
`;

const ActionsSection = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
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

// モックデータ - 実際のアプリでは API から取得
const mockReviews = {
  1: {
    id: 1,
    title: 'React Hooks の効果的な使い方',
    description: `React Hooks は関数コンポーネントでも状態管理やライフサイクルメソッドを使用できる革新的な機能です。

この記事では、以下のポイントについて詳しく解説します：

1. **useState の基本的な使い方**
   - 状態の初期化と更新
   - 複数の状態の管理
   - 関数型更新の活用

2. **useEffect による副作用の管理**
   - コンポーネントのマウント・アンマウント
   - 依存配列の正しい設定
   - クリーンアップ関数の実装

3. **カスタムフックの作成**
   - ロジックの再利用
   - 関心の分離
   - テストしやすい設計

4. **パフォーマンス最適化**
   - useMemo と useCallback の活用
   - 不要な再レンダリングの防止
   - 適切な依存配列の設定`,
    author: '田中太郎',
    rating: 4.5,
    comments: 12,
    likes: 45,
    createdAt: '2024-01-15',
    keyTakeaways: [
      'useState は状態管理の基本で、関数型更新を活用することで安全な状態更新が可能',
      'useEffect の依存配列は正確に設定し、無限ループを避ける',
      'カスタムフックでロジックを分離することで、コンポーネントがよりシンプルになる',
      'useMemo と useCallback を適切に使用してパフォーマンスを最適化する',
    ],
  },
  2: {
    id: 2,
    title: 'TypeScript 型安全性のベストプラクティス',
    description: `TypeScript を使用したアプリケーション開発において、型安全性を最大限に活用するためのベストプラクティスをまとめました。

この記事では以下について説明します：

1. **基本的な型定義**
   - プリミティブ型の活用
   - オブジェクト型の定義
   - 配列とタプルの使い分け

2. **高度な型機能**
   - ジェネリクスの活用
   - ユーティリティ型の使用
   - 条件付き型の実装

3. **実践的な型設計**
   - インターフェースと型エイリアスの使い分け
   - 型ガードの実装
   - 型の絞り込み技術`,
    author: '佐藤花子',
    rating: 5.0,
    comments: 8,
    likes: 67,
    createdAt: '2024-01-14',
    keyTakeaways: [
      'strict モードを有効にして、型安全性を最大限に活用する',
      'ジェネリクスを使用することで、再利用可能で型安全なコードが書ける',
      '型ガードを適切に実装して、実行時の型安全性を保証する',
      'ユーティリティ型を活用して、既存の型から新しい型を効率的に作成する',
    ],
  },
};

const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const reviewId = id ? parseInt(id, 10) : null;
  const review = reviewId ? mockReviews[reviewId as keyof typeof mockReviews] : null;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={18} fill="currentColor" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={18} fill="currentColor" style={{ opacity: 0.5 }} />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={18} style={{ opacity: 0.3 }} />);
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
          <Button
            $variant="primary"
            onClick={() => navigate('/reviews')}
          >
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
          $variant="ghost"
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
          <MetaItem>
            <User size={16} />
            {review.author}
          </MetaItem>
          <MetaItem>
            <Calendar size={16} />
            {review.createdAt}
          </MetaItem>
          <RatingSection>
            <RatingStars>{renderStars(review.rating)}</RatingStars>
            <RatingValue>{review.rating}</RatingValue>
          </RatingSection>
          <MetaItem>
            <MessageCircle size={16} />
            {review.comments} コメント
          </MetaItem>
          <MetaItem>
            <Heart size={16} />
            {review.likes} いいね
          </MetaItem>
        </Meta>
      </Header>

      <Content
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Description>
          {review.description.split('\n').map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '1rem' }}>
              {paragraph}
            </p>
          ))}
        </Description>

        {review.keyTakeaways && (
          <DetailSection>
            <SectionTitle>主なポイント</SectionTitle>
            <SectionContent>
              <ul style={{ paddingLeft: '1.5rem' }}>
                {review.keyTakeaways.map((takeaway, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    {takeaway}
                  </li>
                ))}
              </ul>
            </SectionContent>
          </DetailSection>
        )}
      </Content>

      <ActionsSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <Button
          $variant="primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart size={20} style={{ marginRight: '0.5rem' }} />
          いいね
        </Button>
        <Button
          $variant="secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={20} style={{ marginRight: '0.5rem' }} />
          コメント
        </Button>
        <Button
          $variant="ghost"
          onClick={() => navigate('/reviews')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          一覧に戻る
        </Button>
      </ActionsSection>
    </Container>
  );
};

export default ReviewDetailPage;