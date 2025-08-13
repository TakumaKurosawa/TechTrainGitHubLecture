import type React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Container = styled.div`
  min-height: 100vh;
  background-color: var(--color-neutral-50);
`;

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid var(--color-neutral-200);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: var(--color-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const Main = styled(motion.main)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container>
      <Header>
        <Title>Review App</Title>
      </Header>
      <Main>
        {children}
      </Main>
    </Container>
  );
};

export default Layout;