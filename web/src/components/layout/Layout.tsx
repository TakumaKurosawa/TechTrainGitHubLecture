import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Home, List, Plus } from "lucide-react";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled(motion.header)`
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 50;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
  text-decoration: none;

  &:hover {
    color: #2563eb;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => (props.$isActive ? "#3b82f6" : "#6b7280")};
  font-weight: ${(props) => (props.$isActive ? 600 : 400)};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #3b82f6;
  }
`;

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;
`;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <Container>
      <Header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Nav>
          <Logo to="/">レビューアプリ</Logo>
          <NavLinks>
            <NavLink to="/" $isActive={location.pathname === "/"}>
              <Home size={20} />
              ホーム
            </NavLink>
            <NavLink to="/reviews" $isActive={location.pathname === "/reviews"}>
              <List size={20} />
              一覧
            </NavLink>
            <NavLink
              to="/reviews/new"
              $isActive={location.pathname === "/reviews/new"}
            >
              <Plus size={20} />
              新規投稿
            </NavLink>
          </NavLinks>
        </Nav>
      </Header>
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;