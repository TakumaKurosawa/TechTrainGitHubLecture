import styled from 'styled-components'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md'
  className?: string
}

const StyledBadge = styled.span<{ $variant: string; $size: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 9999px;
  border: 1px solid transparent;
  
  /* Size variants */
  ${(props) => {
    switch (props.$size) {
      case 'sm':
        return `
          padding: 2px 8px;
          font-size: 12px;
          line-height: 1.33;
        `
      default:
        return `
          padding: 4px 12px;
          font-size: 14px;
          line-height: 1.25;
        `
    }
  }}
  
  /* Color variants */
  ${(props) => {
    switch (props.$variant) {
      case 'success':
        return `
          background-color: #d1fae5;
          color: #065f46;
          border-color: #a7f3d0;
        `
      case 'warning':
        return `
          background-color: #fef3c7;
          color: #92400e;
          border-color: #fde68a;
        `
      case 'danger':
        return `
          background-color: #fee2e2;
          color: #991b1b;
          border-color: #fecaca;
        `
      default:
        return `
          background-color: #e5e7eb;
          color: #374151;
          border-color: #d1d5db;
        `
    }
  }}
`

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className 
}) => {
  return (
    <StyledBadge 
      $variant={variant} 
      $size={size}
      className={className}
    >
      {children}
    </StyledBadge>
  )
}

export default Badge