import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  hover?: boolean;
  onClick?: () => void;
  className?: string;
}

const StyledCard = styled(motion.div)<{
  $variant: CardProps['variant'];
  $padding: CardProps['padding'];
  $hover: CardProps['hover'];
  $clickable: boolean;
}>`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.transitions.duration.normal} ${({ theme }) => theme.transitions.easing.ease};
  
  ${({ $clickable }) => $clickable && `
    cursor: pointer;
  `}

  /* Variant styles */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'elevated':
        return `
          box-shadow: ${theme.shadows.lg};
          border: 1px solid ${theme.colors.neutral[100]};
        `;
      case 'outlined':
        return `
          border: 1px solid ${theme.colors.neutral[200]};
          box-shadow: ${theme.shadows.sm};
        `;
      default: // default
        return `
          border: 1px solid ${theme.colors.neutral[100]};
          box-shadow: ${theme.shadows.base};
        `;
    }
  }}

  /* Padding variants */
  ${({ $padding, theme }) => {
    switch ($padding) {
      case 'sm':
        return `padding: ${theme.spacing[3]};`;
      case 'lg':
        return `padding: ${theme.spacing[6]};`;
      case 'none':
        return 'padding: 0;';
      default: // md
        return `padding: ${theme.spacing[4]};`;
    }
  }}

  /* Hover effects */
  ${({ $hover, $clickable, theme }) => 
    ($hover || $clickable) && `
      &:hover {
        box-shadow: ${theme.shadows.xl};
        transform: translateY(-2px);
      }
      
      &:active {
        transform: translateY(-1px);
        box-shadow: ${theme.shadows.lg};
      }
    `
  }
`;

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  onClick,
  className,
}) => {
  const isClickable = !!onClick;

  return (
    <StyledCard
      $variant={variant}
      $padding={padding}
      $hover={hover}
      $clickable={isClickable}
      onClick={onClick}
      className={className}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={
        hover || isClickable
          ? { y: -2, transition: { type: 'spring', stiffness: 400, damping: 17 } }
          : {}
      }
      whileTap={
        isClickable
          ? { y: -1, transition: { type: 'spring', stiffness: 400, damping: 17 } }
          : {}
      }
    >
      {children}
    </StyledCard>
  );
};