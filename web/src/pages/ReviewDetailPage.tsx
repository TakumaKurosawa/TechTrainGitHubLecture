import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Layout } from '../components/layout'
import { ReviewDetail } from '../components/features'
import { getReviewById } from '../data'

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
`

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #374151;
`

const ErrorText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`

const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const review = id ? getReviewById(id) : null

  const handleBack = () => {
    navigate('/')
  }

  if (!review) {
    return (
      <Layout>
        <ErrorMessage>
          <ErrorTitle>レビューが見つかりません</ErrorTitle>
          <ErrorText>
            指定されたIDのレビューは存在しません。<br />
            URLを確認するか、一覧ページから選択してください。
          </ErrorText>
        </ErrorMessage>
      </Layout>
    )
  }

  return (
    <Layout>
      <ReviewDetail review={review} onBack={handleBack} />
    </Layout>
  )
}

export default ReviewDetailPage