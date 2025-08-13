import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const StyledButton = styled(motion.button)<{
  $variant: ButtonProps['variant'];
  $size: ButtonProps['size'];
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid transparent;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.duration.normal} ${({ theme }) => theme.transitions.easing.ease};
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Size variants */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return `
          padding: ${theme.spacing[2]} ${theme.spacing[3]};
          font-size: ${theme.typography.fontSize.sm};
          gap: ${theme.spacing[1.5]};
        `;
      case 'lg':
        return `
          padding: ${theme.spacing[3]} ${theme.spacing[6]};
          font-size: ${theme.typography.fontSize.lg};
          gap: ${theme.spacing[2]};
        `;
      default: // md
        return `
          padding: ${theme.spacing[2.5]} ${theme.spacing[4]};
          font-size: ${theme.typography.fontSize.base};
          gap: ${theme.spacing[2]};
        `;
    }
  }}

  /* Color variants */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: white;
          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondary};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: white;
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'success':
        return `
          background-color: ${theme.colors.success};
          color: white;
          &:hover:not(:disabled) {
            background-color: #059669;
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'warning':
        return `
          background-color: ${theme.colors.warning};
          color: white;
          &:hover:not(:disabled) {
            background-color: #d97706;
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.danger};
          color: white;
          &:hover:not(:disabled) {
            background-color: #dc2626;
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary};
            color: white;
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      default: // primary
        return `
          background-color: ${theme.colors.primary};
          color: white;
          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondary};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
    }
  }}
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className,
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={className}
      whileHover={!disabled ? { y: -1 } : {}}
      whileTap={!disabled ? { y: 0 } : {}}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
    >
      {children}
    </StyledButton>
  );
};