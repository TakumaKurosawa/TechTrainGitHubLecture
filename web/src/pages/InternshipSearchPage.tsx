import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SearchForm, InternshipList } from '../components/features';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: 24px;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 40px;
`;

const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const PageSubtitle = styled.p`
  font-size: 18px;
  color: #6b7280;
  margin: 0;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const MainContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InternshipSearchPage: React.FC = () => {
  return (
    <PageContainer>
      <ContentWrapper>
        <PageHeader
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PageTitle>インターンシップ検索</PageTitle>
          <PageSubtitle>
            あなたにぴったりのインターンシップを見つけよう
          </PageSubtitle>
        </PageHeader>

        <MainContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SearchForm />
          <InternshipList />
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default InternshipSearchPage;