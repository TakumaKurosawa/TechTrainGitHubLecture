import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, TrendingUp } from "lucide-react";
import { pageVariants, pageTransition, staggerContainer, staggerItem } from "../utils/animations";

const Container = styled(motion.div)`
  text-align: center;
`;

const HeroSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16px;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #ffffff;
  color: #667eea;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const FeatureCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  border-radius: 12px;
  margin-bottom: 1rem;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #111827;
`;

const FeatureDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
`;

const StatsSection = styled(motion.section)`
  background: #f9fafb;
  border-radius: 12px;
  padding: 3rem 2rem;
  margin: 3rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled(motion.div)``;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #6b7280;
  font-weight: 500;
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
      <HeroSection>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          レビューアプリへようこそ
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          あなたの体験を共有し、他の人のレビューを参考にしよう
        </Subtitle>
        <CTAButton
          to="/reviews"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          レビューを見る
          <ArrowRight size={20} />
        </CTAButton>
      </HeroSection>

      <FeaturesGrid
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <FeatureCard variants={staggerItem}>
          <FeatureIcon>
            <Star size={24} />
          </FeatureIcon>
          <FeatureTitle>簡単レビュー</FeatureTitle>
          <FeatureDescription>
            シンプルで使いやすいインターフェースで、誰でも簡単にレビューを投稿できます。
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard variants={staggerItem}>
          <FeatureIcon>
            <Users size={24} />
          </FeatureIcon>
          <FeatureTitle>コミュニティ</FeatureTitle>
          <FeatureDescription>
            様々な人の意見や体験を共有し、より良い選択をするための情報を得られます。
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard variants={staggerItem}>
          <FeatureIcon>
            <TrendingUp size={24} />
          </FeatureIcon>
          <FeatureTitle>トレンド分析</FeatureTitle>
          <FeatureDescription>
            人気のアイテムやサービスの傾向を把握し、トレンドに敏感になれます。
          </FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>

      <StatsSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <StatsGrid>
          <StatItem
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <StatValue>1,234</StatValue>
            <StatLabel>レビュー数</StatLabel>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <StatValue>567</StatValue>
            <StatLabel>ユーザー数</StatLabel>
          </StatItem>
          <StatItem
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <StatValue>89</StatValue>
            <StatLabel>カテゴリ数</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsSection>
    </Container>
  );
};

export default TopPage;