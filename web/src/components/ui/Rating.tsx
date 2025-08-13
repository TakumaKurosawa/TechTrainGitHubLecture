import styled from 'styled-components'
import { Star } from 'lucide-react'

interface RatingProps {
  value: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  className?: string
}

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const StarsContainer = styled.div<{ $size: string }>`
  display: flex;
  align-items: center;
  gap: 2px;
  
  ${(props) => {
    switch (props.$size) {
      case 'sm':
        return `
          svg {
            width: 16px;
            height: 16px;
          }
        `
      case 'lg':
        return `
          svg {
            width: 24px;
            height: 24px;
          }
        `
      default:
        return `
          svg {
            width: 20px;
            height: 20px;
          }
        `
    }
  }}
`

const RatingValue = styled.span<{ $size: string }>`
  font-weight: 600;
  color: #374151;
  margin-left: 8px;
  
  ${(props) => {
    switch (props.$size) {
      case 'sm':
        return `font-size: 14px;`
      case 'lg':
        return `font-size: 18px;`
      default:
        return `font-size: 16px;`
    }
  }}
`

const Rating: React.FC<RatingProps> = ({ 
  value, 
  maxRating = 5, 
  size = 'md', 
  showValue = false,
  className 
}) => {
  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1
    const isFilled = starValue <= value
    const isHalfFilled = starValue - 0.5 === value
    
    return (
      <Star
        key={index}
        fill={isFilled ? '#fbbf24' : isHalfFilled ? '#fbbf24' : 'none'}
        stroke={isFilled || isHalfFilled ? '#fbbf24' : '#d1d5db'}
        strokeWidth={2}
      />
    )
  })

  return (
    <RatingContainer className={className}>
      <StarsContainer $size={size}>
        {stars}
      </StarsContainer>
      {showValue && (
        <RatingValue $size={size}>
          {value}/{maxRating}
        </RatingValue>
      )}
    </RatingContainer>
  )
}

export default Rating