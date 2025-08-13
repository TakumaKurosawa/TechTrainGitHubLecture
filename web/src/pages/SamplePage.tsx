import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button, Card } from '@/components/ui';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[6]};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.neutral[600]};
  max-width: 600px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

const SectionTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const ColorSwatch = styled.div<{ $color: string }>`
  height: 80px;
  background-color: ${({ $color }) => $color};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutral[200]};
  position: relative;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.duration.normal} ${({ theme }) => theme.transitions.easing.ease};

  &:hover {
    transform: scale(1.05);
  }
`;

const ColorLabel = styled.span`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing[2]};
  left: ${({ theme }) => theme.spacing[2]};
  right: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const SamplePage: React.FC = () => {
  const colors = [
    { name: 'Primary', value: '#3B82F6' },
    { name: 'Secondary', value: '#6366F1' },
    { name: 'Success', value: '#10B981' },
    { name: 'Warning', value: '#F59E0B' },
    { name: 'Danger', value: '#EF4444' },
  ];

  return (
    <Container>
      <Header>
        <Title>🎨 Theme System Demo</Title>
        <Subtitle>
          テーマシステム、グローバルスタイル、基本UIコンポーネントのデモンストレーション
        </Subtitle>
      </Header>

      <Section>
        <SectionTitle>カラーパレット</SectionTitle>
        <ColorGrid>
          {colors.map((color) => (
            <ColorSwatch key={color.name} $color={color.value}>
              <ColorLabel>{color.name}</ColorLabel>
            </ColorSwatch>
          ))}
        </ColorGrid>
      </Section>

      <Section>
        <SectionTitle>ボタンコンポーネント</SectionTitle>
        <ButtonGrid>
          <Button variant="primary" size="sm">Primary Small</Button>
          <Button variant="secondary" size="md">Secondary Medium</Button>
          <Button variant="success" size="lg">Success Large</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="outline">Outline</Button>
        </ButtonGrid>
      </Section>

      <Section>
        <SectionTitle>カードコンポーネント</SectionTitle>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <CardGrid>
            <motion.div variants={cardVariants}>
              <Card variant="default" hover>
                <h3>デフォルトカード</h3>
                <p>
                  このカードは基本的なスタイルを使用しています。
                  ホバー効果が適用されています。
                </p>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card variant="elevated" padding="lg">
                <h3>エレベーテッドカード</h3>
                <p>
                  より強いシャドウを持つカードです。
                  パディングも大きく設定されています。
                </p>
                <div style={{ marginTop: '16px' }}>
                  <Button variant="primary" size="sm">アクション</Button>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card variant="outlined" onClick={() => alert('カードがクリックされました!')}>
                <h3>アウトラインカード</h3>
                <p>
                  クリック可能なカードです。
                  境界線が強調されたデザインです。
                </p>
              </Card>
            </motion.div>
          </CardGrid>
        </motion.div>
      </Section>

      <Section>
        <SectionTitle>タイポグラフィ</SectionTitle>
        <Card padding="lg">
          <h1>見出し1 (H1)</h1>
          <h2>見出し2 (H2)</h2>
          <h3>見出し3 (H3)</h3>
          <h4>見出し4 (H4)</h4>
          <p>
            本文テキストのサンプルです。このテキストは読みやすさを重視したスタイリングが適用されています。
            行間や文字色、フォントファミリーなどが最適化されています。
          </p>
          <p>
            <a href="#" onClick={(e) => e.preventDefault()}>リンクテキスト</a>も適切にスタイリングされています。
          </p>
        </Card>
      </Section>
    </Container>
  );
};