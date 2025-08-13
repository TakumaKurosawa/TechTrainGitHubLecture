import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PlusCircle, Star, Users } from "lucide-react";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
  text-align: center;
`;

const Hero = styled(motion.div)`
  margin-bottom: 64px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: #6b7280;
  margin-bottom: 32px;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 64px;
`;

const FeatureCard = styled(motion.div)`
  padding: 32px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: #eff6ff;
  border-radius: 12px;
  color: #3b82f6;
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

const FeatureDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
`;

const Home: React.FC = () => {
  return (
    <Container>
      <Hero
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>インターンレビュープラットフォーム</Title>
        <Subtitle>
          実際のインターン経験を共有して、みんなでより良いキャリア選択を！
        </Subtitle>
        <CTAButton to="/reviews/new">
          <PlusCircle size={24} />
          レビューを投稿する
        </CTAButton>
      </Hero>
      
      <Features>
        <FeatureCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FeatureIcon>
            <Star size={32} />
          </FeatureIcon>
          <FeatureTitle>詳細な評価システム</FeatureTitle>
          <FeatureDescription>
            5段階評価と詳細なコメントで、インターンの実態を正確に把握できます。
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FeatureIcon>
            <Users size={32} />
          </FeatureIcon>
          <FeatureTitle>コミュニティ駆動</FeatureTitle>
          <FeatureDescription>
            実際にインターンを経験した人たちのリアルな声を集約し、信頼性の高い情報を提供します。
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FeatureIcon>
            <PlusCircle size={32} />
          </FeatureIcon>
          <FeatureTitle>簡単投稿</FeatureTitle>
          <FeatureDescription>
            直感的なフォームでレビューを投稿でき、フォームバリデーションで入力ミスも防げます。
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </Container>
  );
};

export default Home;