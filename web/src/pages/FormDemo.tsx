import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SampleForm } from '../components/ui';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 600px;
  width: 100%;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const FormDemo: React.FC = () => {
  return (
    <Container>
      <Content>
        <BackButton to="/">
          <ArrowLeft size={18} />
          Back to Home
        </BackButton>
        <SampleForm />
      </Content>
    </Container>
  );
};

export default FormDemo;