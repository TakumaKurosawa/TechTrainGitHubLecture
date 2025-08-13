import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Building, Clock, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Review } from '../../types'
import { Button, Rating, Badge } from '../ui'

interface ReviewDetailProps {
  review: Review
  onBack: () => void
}

const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`

const BackButton = styled(Button)`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ReviewCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`

const Header = styled.div`
  padding: 2rem 2rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`

const TitleSection = styled.div`
  margin-bottom: 1.5rem;
`

const JobTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
`

const CompanyName = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1rem;
`

const MetaInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 0.875rem;
`

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`

const RecommendationBadge = styled(Badge)<{ $isRecommended: boolean }>`
  ${(props) => props.$isRecommended ? `
    background-color: #d1fae5;
    color: #065f46;
    border-color: #a7f3d0;
  ` : `
    background-color: #fee2e2;
    color: #991b1b;
    border-color: #fecaca;
  `}
`

const Content = styled.div`
  padding: 2rem;
`

const Section = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
`

const SectionContent = styled.div`
  color: #374151;
  line-height: 1.6;
  white-space: pre-wrap;
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const ReviewDetail: React.FC<ReviewDetailProps> = ({ review, onBack }) => {
  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <BackButton 
        variant="outline" 
        onClick={onBack}
      >
        <ArrowLeft size={16} />
        戻る
      </BackButton>

      <ReviewCard
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Header>
          <TitleSection>
            <JobTitle>{review.title}</JobTitle>
            <CompanyName>
              <Building size={20} />
              {review.companyName}
            </CompanyName>
          </TitleSection>

          <MetaInfo>
            <MetaItem>
              <Clock size={16} />
              {review.duration}
            </MetaItem>
            <MetaItem>
              <Calendar size={16} />
              作成日: {formatDate(review.createdAt)}
            </MetaItem>
          </MetaInfo>

          <RatingSection>
            <Rating value={review.rating} showValue size="lg" />
            <RecommendationBadge 
              $isRecommended={review.isRecommended}
              size="md"
            >
              {review.isRecommended ? '推奨' : '非推奨'}
            </RecommendationBadge>
          </RatingSection>
        </Header>

        <Content>
          <Section>
            <SectionTitle>
              <ThumbsUp size={20} />
              良かった点
            </SectionTitle>
            <SectionContent>
              {review.goodPoints}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              <ThumbsDown size={20} />
              気になった点
            </SectionTitle>
            <SectionContent>
              {review.concernPoints}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>
              タグ
            </SectionTitle>
            <TagsContainer>
              {review.tags.map((tag, index) => (
                <Badge key={index} variant="default">
                  {tag}
                </Badge>
              ))}
            </TagsContainer>
          </Section>
        </Content>
      </ReviewCard>
    </Container>
  )
}

export default ReviewDetail