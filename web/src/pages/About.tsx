import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  max-width: 700px;
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

const DependencyList = styled.div`
  margin-bottom: 2rem;
`;

const DependencyItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const DependencyName = styled.span`
  font-weight: 600;
  color: #374151;
`;

const DependencyDesc = styled.span`
  color: #6b7280;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }
`;

const dependencies = [
  {
    name: 'React 18+',
    desc: 'Modern React with hooks and concurrent features',
  },
  {
    name: 'TypeScript',
    desc: 'Static type checking for better development experience',
  },
  {
    name: 'Styled Components',
    desc: 'CSS-in-JS library for component styling',
  },
  { name: 'Framer Motion', desc: 'Animation library for smooth interactions' },
  { name: 'React Router', desc: 'Declarative routing for React applications' },
  { name: 'Zustand', desc: 'Lightweight state management solution' },
  { name: 'React Hook Form', desc: 'Performant forms with easy validation' },
  { name: 'Zod', desc: 'TypeScript-first schema validation library' },
  { name: 'Lucide React', desc: 'Beautiful & consistent icon toolkit' },
];

const About: React.FC = () => {
  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>About This Demo</Title>
        <Subtitle>
          This application demonstrates the integration of all required
          dependencies for modern React development.
        </Subtitle>

        <DependencyList>
          {dependencies.map((dep, index) => (
            <DependencyItem
              key={dep.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CheckCircle size={20} color="#10b981" />
              <div>
                <DependencyName>{dep.name}</DependencyName>
                <br />
                <DependencyDesc>{dep.desc}</DependencyDesc>
              </div>
            </DependencyItem>
          ))}
        </DependencyList>

        <BackButton to="/">
          <ArrowLeft size={18} />
          Back to Home
        </BackButton>
      </Card>
    </Container>
  );
};

export default About;