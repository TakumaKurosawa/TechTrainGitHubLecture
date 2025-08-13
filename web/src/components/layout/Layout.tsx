import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 24px 0;
  background: #f9fafb;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Navigation />
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

export default Layout;