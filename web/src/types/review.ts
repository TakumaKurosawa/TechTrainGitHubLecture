export interface Review {
  id: string
  title: string
  companyName: string
  duration: string
  rating: number
  goodPoints: string
  concernPoints: string
  tags: string[]
  isRecommended: boolean
  createdAt: string
  updatedAt: string
}

export interface ReviewDetailPageProps {
  review: Review
}

export type ReviewStatus = 'published' | 'draft' | 'archived'