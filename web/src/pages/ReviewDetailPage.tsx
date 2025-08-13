import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Star, Calendar, User } from 'lucide-react';

const Container = styled(motion.div)`
  min-height: 100vh;
  padding: 2rem;
  background-color: #f9fafb;
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

const ReviewCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Content = styled.div`
  color: #374151;
  line-height: 1.8;
  font-size: 1.1rem;
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
`;

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

// モックデータ
const mockReviews = {
  1: {
    id: 1,
    title: "素晴らしいレストラン体験",
    rating: 5,
    author: "田中太郎",
    date: "2024-01-15",
    content: `料理の味、サービス、雰囲気すべてが最高でした。特にメインディッシュが絶品で、また行きたいと思います。

スタッフの方々もとても親切で、細かい配慮が感じられました。特に、アレルギーについての質問に丁寧に答えてくださり、安心して食事を楽しむことができました。

店内の雰囲気も素晴らしく、デートや特別な日の食事にぴったりです。少し価格は高めですが、それに見合った価値は十分にあると思います。

次回は違うコースも試してみたいと思います。予約が取りにくいお店ですが、また必ず訪れたいと思います。`
  },
  2: {
    id: 2,
    title: "コスパ最高のランチ",
    rating: 4,
    author: "佐藤花子",
    date: "2024-01-14",
    content: `この価格でこのクオリティは驚きです。ボリュームもあり、味も良く、満足度が高いランチでした。

平日限定のランチセットを注文しましたが、メイン、サラダ、スープ、ドリンクがついて1000円以下という価格設定に驚きました。

味も本格的で、特にスープが印象的でした。手作り感があり、心のこもった料理という感じがします。

平日の昼間ということもあり、お客さんは多くありませんでしたが、逆に落ち着いて食事ができて良かったです。`
  },
  3: {
    id: 3,
    title: "雰囲気の良いカフェ",
    rating: 4,
    author: "山田次郎",
    date: "2024-01-13",
    content: `静かで落ち着いた雰囲気のカフェ。コーヒーも美味しく、読書や作業には最適な環境です。

Wi-Fiも完備されており、電源も各席にあるので、ノートパソコンでの作業にも適しています。

コーヒーの種類も豊富で、バリスタの方が丁寧に淹れてくれます。ラテアートも美しく、目でも楽しめます。

ただし、週末は少し混雑するので、平日の利用がおすすめです。軽食メニューも充実しており、長時間の滞在にも対応してくれます。`
  }
};

const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reviewId = id ? parseInt(id, 10) : null;
  const review = reviewId ? mockReviews[reviewId as keyof typeof mockReviews] : null;

  if (!review) {
    return (
      <Container
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        <BackButton to="/reviews">← レビュー一覧に戻る</BackButton>
        <NotFound>
          <h2>レビューが見つかりません</h2>
          <p>指定されたレビューは存在しないか、削除された可能性があります。</p>
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
      transition={{ duration: 0.3 }}
    >
      <BackButton to="/reviews">← レビュー一覧に戻る</BackButton>
      
      <ReviewCard>
        <Title>{review.title}</Title>
        
        <MetaInfo>
          <MetaItem>
            <Rating>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < review.rating ? "#fbbf24" : "none"}
                  color={i < review.rating ? "#fbbf24" : "#d1d5db"}
                />
              ))}
            </Rating>
          </MetaItem>
          
          <MetaItem>
            <User size={16} />
            {review.author}
          </MetaItem>
          
          <MetaItem>
            <Calendar size={16} />
            {review.date}
          </MetaItem>
        </MetaInfo>
        
        <Content>
          {review.content.split('\n\n').map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '1rem' }}>
              {paragraph}
            </p>
          ))}
        </Content>
      </ReviewCard>
    </Container>
  );
};

export default ReviewDetailPage;