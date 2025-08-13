import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PlusCircle, List, Home } from "lucide-react";

const Nav = styled.nav`
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e5e7eb;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  text-decoration: none;
  
  &:hover {
    color: #3b82f6;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  background: ${(props) => (props.$active ? "#3b82f6" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "#6b7280")};
  
  &:hover {
    background: ${(props) => (props.$active ? "#3b82f6" : "#f3f4f6")};
    color: ${(props) => (props.$active ? "white" : "#374151")};
  }
`;

const Navigation: React.FC = () => {
  const location = useLocation();
  
  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <Home size={24} />
          Internship Reviews
        </Logo>
        
        <NavLinks>
          <NavLink to="/reviews" $active={location.pathname === "/reviews"}>
            <List size={20} />
            一覧
          </NavLink>
          <NavLink to="/reviews/new" $active={location.pathname === "/reviews/new"}>
            <PlusCircle size={20} />
            投稿
          </NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;