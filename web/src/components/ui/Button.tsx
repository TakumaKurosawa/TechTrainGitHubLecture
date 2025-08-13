import styled from 'styled-components'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const StyledButton = styled.button<{ $variant: string; $size: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  
  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* Size variants */
  ${(props) => {
    switch (props.$size) {
      case 'sm':
        return `
          padding: 8px 12px;
          font-size: 14px;
          line-height: 1.25;
        `
      case 'lg':
        return `
          padding: 12px 24px;
          font-size: 16px;
          line-height: 1.5;
        `
      default:
        return `
          padding: 10px 16px;
          font-size: 14px;
          line-height: 1.25;
        `
    }
  }}
  
  /* Color variants */
  ${(props) => {
    switch (props.$variant) {
      case 'primary':
        return `
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
          
          &:hover:not(:disabled) {
            background-color: #2563eb;
            border-color: #2563eb;
          }
        `
      case 'secondary':
        return `
          background-color: #6b7280;
          color: white;
          border-color: #6b7280;
          
          &:hover:not(:disabled) {
            background-color: #4b5563;
            border-color: #4b5563;
          }
        `
      case 'outline':
        return `
          background-color: transparent;
          color: #374151;
          border-color: #d1d5db;
          
          &:hover:not(:disabled) {
            background-color: #f9fafb;
            border-color: #9ca3af;
          }
        `
      default:
        return `
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
          
          &:hover:not(:disabled) {
            background-color: #2563eb;
            border-color: #2563eb;
          }
        `
    }
  }}
`

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className 
}) => {
  return (
    <StyledButton 
      $variant={variant} 
      $size={size} 
      onClick={onClick} 
      disabled={disabled}
      className={className}
    >
      {children}
    </StyledButton>
  )
}

export default Button