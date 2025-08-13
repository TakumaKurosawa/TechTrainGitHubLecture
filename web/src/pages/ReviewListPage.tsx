import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Layout } from '../components/layout'
import { Rating, Badge } from '../components/ui'
import { mockReviews } from '../data'
import { Building, Clock } from 'lucide-react'

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
  text-align: center;
`

const ReviewList = styled.div`
  display: grid;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`

const ReviewCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`

const CardHeader = styled.div`
  margin-bottom: 1rem;
`

const JobTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`

const CompanyName = styled.p`
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 1rem;
`

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`

const Duration = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  font-size: 0.875rem;
`

const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const ReviewListPage: React.FC = () => {
  const navigate = useNavigate()

  const handleReviewClick = (reviewId: string) => {
    navigate(`/reviews/${reviewId}`)
  }

  return (
    <Layout>
      <PageTitle>レビュー一覧</PageTitle>
      <ReviewList
        as={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {mockReviews.map((review) => (
          <ReviewCard
            key={review.id}
            variants={item}
            onClick={() => handleReviewClick(review.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <CardHeader>
              <JobTitle>{review.title}</JobTitle>
              <CompanyName>
                <Building size={16} />
                {review.companyName}
              </CompanyName>
            </CardHeader>
            
            <CardMeta>
              <Duration>
                <Clock size={14} />
                {review.duration}
              </Duration>
              
              <CardActions>
                <Rating value={review.rating} size="sm" />
                <Badge 
                  variant={review.isRecommended ? 'success' : 'danger'}
                  size="sm"
                >
                  {review.isRecommended ? '推奨' : '非推奨'}
                </Badge>
              </CardActions>
            </CardMeta>
          </ReviewCard>
        ))}
      </ReviewList>
    </Layout>
  )
}

export default ReviewListPage