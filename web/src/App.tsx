import React from 'react';
import styled from 'styled-components';
import { SearchForm } from './components/features/SearchForm';
import { InternshipList } from './components/features/InternshipList';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

const Header = styled.header`
  background-color: #ffffff;
  padding: 24px 0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 8px 0 0 0;
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
`;

const SearchSection = styled.section`
  margin-bottom: 32px;
`;

const App: React.FC = () => {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <Title>インターンシップ検索</Title>
          <Subtitle>あなたにぴったりのインターンシップを見つけよう</Subtitle>
        </HeaderContent>
      </Header>
      
      <Main>
        <SearchSection>
          <SearchForm />
        </SearchSection>
        
        <InternshipList />
      </Main>
    </Container>
  );
};

export default App;