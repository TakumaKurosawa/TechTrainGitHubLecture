import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-align: center;
  opacity: 0.9;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
  }
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const TopPage: React.FC = () => {
  return (
    <Container
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <Title>レビューアプリ</Title>
      <Subtitle>
        シンプルで使いやすいレビュー管理システム
      </Subtitle>
      <CTAButton to="/reviews">
        レビューを見る
      </CTAButton>
    </Container>
  );
};

export default TopPage;