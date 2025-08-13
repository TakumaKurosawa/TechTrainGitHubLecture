import type React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { pageVariants, pageTransition } from '@/utils/animations';

const Container = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-neutral-900);
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--color-neutral-600);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: var(--color-primary);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: var(--color-primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-neutral-900);
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: var(--color-neutral-600);
  font-size: 0.9rem;
  line-height: 1.5;
`;

const TopPage: React.FC = () => {
  return (
    <Container
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <Title>Review App へようこそ</Title>
      <Subtitle>
        あなたの体験をシェアし、他のユーザーのレビューを見つけて、
        より良い選択をするためのプラットフォームです。
      </Subtitle>
      
      <CTAButton to="/reviews">
        レビューを見る
      </CTAButton>

      <FeatureGrid>
        <FeatureCard>
          <FeatureIcon>📝</FeatureIcon>
          <FeatureTitle>レビューを投稿</FeatureTitle>
          <FeatureDescription>
            あなたの体験を他のユーザーと共有しましょう
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>🔍</FeatureIcon>
          <FeatureTitle>レビューを探索</FeatureTitle>
          <FeatureDescription>
            豊富なレビューから最適な選択肢を見つけましょう
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>⭐</FeatureIcon>
          <FeatureTitle>評価システム</FeatureTitle>
          <FeatureDescription>
            信頼できる評価システムで品質を確認できます
          </FeatureDescription>
        </FeatureCard>
      </FeatureGrid>
    </Container>
  );
};

export default TopPage;