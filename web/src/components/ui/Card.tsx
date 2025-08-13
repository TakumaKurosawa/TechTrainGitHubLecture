import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

type CardVariant = 'default' | 'elevated' | 'outlined';
type CardPadding = 'sm' | 'md' | 'lg';

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  clickable?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const StyledCard = styled(motion.div)<{
  $variant: CardVariant;
  $padding: CardPadding;
  $hover: boolean;
  $clickable: boolean;
}>`
  /* Base Styles */
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
  position: relative;
  overflow: hidden;

  /* Clickable cursor */
  ${({ $clickable }) =>
    $clickable &&
    `
    cursor: pointer;
  `}

  /* Padding variants */
  ${({ $padding, theme }) => {
    switch ($padding) {
      case 'sm':
        return `padding: ${theme.spacing[3]};`;
      case 'lg':
        return `padding: ${theme.spacing[6]};`;
      default: // md
        return `padding: ${theme.spacing[4]};`;
    }
  }}

  /* Card variants */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'elevated':
        return `
          box-shadow: ${theme.shadows.lg};
          border: 1px solid ${theme.colors.border.light};
        `;
      case 'outlined':
        return `
          border: 2px solid ${theme.colors.border.medium};
          box-shadow: none;
        `;
      default: // default
        return `
          box-shadow: ${theme.shadows.base};
          border: 1px solid ${theme.colors.border.light};
        `;
    }
  }}

  /* Hover effects */
  ${({ $hover, $clickable, theme }) =>
    ($hover || $clickable) &&
    `
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.xl};
      border-color: ${theme.colors.primary};
    }
  `}

  /* Focus styles for clickable cards */
  ${({ $clickable, theme }) =>
    $clickable &&
    `
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
  `}
`;

const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hover = false,
  clickable = false,
  children,
  onClick,
  className,
}) => {
  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (clickable && onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <StyledCard
      $variant={variant}
      $padding={padding}
      $hover={hover}
      $clickable={clickable}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? 'button' : undefined}
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={
        hover || clickable
          ? { y: -2, scale: 1.02 }
          : {}
      }
      whileTap={
        clickable
          ? { scale: 0.98 }
          : {}
      }
      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}
    >
      {children}
    </StyledCard>
  );
};

export default Card;