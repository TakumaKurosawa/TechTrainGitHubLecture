import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Users, Settings } from 'lucide-react';
import { useAppStore } from '../store';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Card = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  text-align: center;
  max-width: 600px;
  width: 100%;
`;

const Title = styled.h1`
  color: #1f2937;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
  margin-bottom: 2rem;
`;

const Counter = styled.div`
  background: #f3f4f6;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const CounterTitle = styled.h3`
  color: #374151;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const CounterValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  background: #3b82f6;
  color: white;
  
  &:hover {
    background: #2563eb;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #f9fafb;
  color: #374151;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: #e5e7eb;
    transform: translateY(-2px);
  }
`;

const Home: React.FC = () => {
  const { count, user, increment, decrement } = useAppStore();

  return (
    <Container>
      <Card
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Welcome to React Demo</Title>
        <Subtitle>Hello {user}! This app demonstrates all required dependencies.</Subtitle>
        
        <Counter>
          <CounterTitle>Zustand Counter</CounterTitle>
          <CounterValue>{count}</CounterValue>
          <ButtonGroup>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={increment}
            >
              Increment
            </Button>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={decrement}
            >
              Decrement
            </Button>
          </ButtonGroup>
        </Counter>

        <NavLinks>
          <NavLink to="/">
            <HomeIcon size={18} />
            Home
          </NavLink>
          <NavLink to="/about">
            <Users size={18} />
            About
          </NavLink>
          <NavLink to="/form">
            <Settings size={18} />
            Form Demo
          </NavLink>
        </NavLinks>
      </Card>
    </Container>
  );
};

export default Home;