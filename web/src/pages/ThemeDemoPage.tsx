import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button, Card } from '../components/ui';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.background.primary} 0%, ${({ theme }) => theme.colors.background.secondary} 100%);
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[4]};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const Title = styled(motion.h1)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

const Section = styled(motion.section)`
  max-width: 1200px;
  margin: 0 auto ${({ theme }) => theme.spacing[16]} auto;
`;

const SectionTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Grid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};

  ${({ $columns }) =>
    $columns &&
    `
    grid-template-columns: repeat(${$columns}, 1fr);
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ColorSwatch = styled.div<{ $color: string }>`
  width: 100%;
  height: 80px;
  background-color: ${({ $color }) => $color};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  position: relative;
  overflow: hidden;

  &::after {
    content: '${({ $color }) => $color}';
    position: absolute;
    bottom: ${({ theme }) => theme.spacing[2]};
    left: ${({ theme }) => theme.spacing[3]};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    ${({ $color }) => {
      // Compute brightness to switch both text and background for contrast
      const hex = $color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      const isLight = brightness > 128;
      return `
        color: ${isLight ? '#fff' : '#111'};
        background: ${isLight ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.92)'};
        box-shadow: 0 0 0 1px ${isLight ? 'rgba(255, 255, 255, 0.55)' : 'rgba(0, 0, 0, 0.06)'};
      `;
    }}
    padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
    border-radius: ${({ theme }) => theme.borderRadius.base};
    backdrop-filter: blur(2px);
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SizeDemo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const TypographyDemo = styled.div`
  h1 { margin-bottom: ${({ theme }) => theme.spacing[4]}; }
  h2 { margin-bottom: ${({ theme }) => theme.spacing[4]}; }
  h3 { margin-bottom: ${({ theme }) => theme.spacing[3]}; }
  h4 { margin-bottom: ${({ theme }) => theme.spacing[3]}; }
  p { margin-bottom: ${({ theme }) => theme.spacing[4]}; }
`;

const StatsCard = styled(Card)`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ThemeDemoPage: React.FC = () => {
  const [counter, setCounter] = useState(0);

  const colorPalette = [
    { name: 'Primary', color: '#3B82F6' },
    { name: 'Secondary', color: '#6366F1' },
    { name: 'Success', color: '#10B981' },
    { name: 'Warning', color: '#F59E0B' },
    { name: 'Danger', color: '#EF4444' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container>
      <Header>
        <Title
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          🎨 Theme System Demo
        </Title>
        <Subtitle>
          Comprehensive demonstration of our design system including colors, typography, components, and animations.
        </Subtitle>
      </Header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Color Palette Section */}
        <Section variants={itemVariants}>
          <SectionTitle>Color Palette</SectionTitle>
          <Grid>
            {colorPalette.map((color, index) => (
              <Card key={color.name} padding="md" hover>
                <ColorSwatch $color={color.color} />
                <h4 style={{ margin: 0, textAlign: 'center' }}>{color.name}</h4>
              </Card>
            ))}
          </Grid>
        </Section>

        {/* Typography Section */}
        <Section variants={itemVariants}>
          <SectionTitle>Typography</SectionTitle>
          <Card padding="lg">
            <TypographyDemo>
              <h1>Heading 1 - Main Title</h1>
              <h2>Heading 2 - Section Title</h2>
              <h3>Heading 3 - Subsection</h3>
              <h4>Heading 4 - Minor Title</h4>
              <p>
                This is a paragraph demonstrating our typography system. The Inter font family provides excellent readability and a modern feel. Line heights and spacing are optimized for comfortable reading.
              </p>
              <p>
                <a href="#demo">This is a link</a> with proper styling and hover effects.
              </p>
            </TypographyDemo>
          </Card>
        </Section>

        {/* Button Components Section */}
        <Section variants={itemVariants}>
          <SectionTitle>Button Variants</SectionTitle>
          <ButtonGrid>
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="success">Success Button</Button>
            <Button variant="warning">Warning Button</Button>
            <Button variant="danger">Danger Button</Button>
            <Button variant="outline">Outline Button</Button>
          </ButtonGrid>

          <SectionTitle>Button Sizes</SectionTitle>
          <SizeDemo>
            <Button size="sm" variant="primary">Small</Button>
            <Button size="md" variant="primary">Medium</Button>
            <Button size="lg" variant="primary">Large</Button>
          </SizeDemo>
        </Section>

        {/* Card Components Section */}
        <Section variants={itemVariants}>
          <SectionTitle>Card Variants</SectionTitle>
          <Grid $columns={3}>
            <Card variant="default" padding="lg">
              <h4>Default Card</h4>
              <p>This is a default card with standard styling and shadow.</p>
            </Card>
            <Card variant="elevated" padding="lg" hover>
              <h4>Elevated Card</h4>
              <p>This card has enhanced shadow and hover effects.</p>
            </Card>
            <Card variant="outlined" padding="lg" clickable onClick={() => setCounter(c => c + 1)}>
              <h4>Outlined Card</h4>
              <p>This card is clickable with outlined styling.</p>
              <p>Clicked: {counter} times</p>
            </Card>
          </Grid>
        </Section>

        {/* Interactive Demo Section */}
        <Section variants={itemVariants}>
          <SectionTitle>Interactive Demo</SectionTitle>
          <Grid $columns={3}>
            <StatsCard variant="elevated" padding="lg" hover>
              <StatNumber>{counter}</StatNumber>
              <StatLabel>Click Counter</StatLabel>
            </StatsCard>
            <StatsCard variant="elevated" padding="lg" hover>
              <StatNumber>6</StatNumber>
              <StatLabel>Color Variants</StatLabel>
            </StatsCard>
            <StatsCard variant="elevated" padding="lg" hover>
              <StatNumber>3</StatNumber>
              <StatLabel>Component Sizes</StatLabel>
            </StatsCard>
          </Grid>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => setCounter(0)}
            >
              Reset Counter
            </Button>
          </div>
        </Section>
      </motion.div>
    </Container>
  );
};

export default ThemeDemoPage;
