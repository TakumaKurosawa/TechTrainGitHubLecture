import { motion } from 'framer-motion';
import type React from 'react';
import styled from 'styled-components';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const StyledButton = styled(motion.button)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $disabled: boolean;
}>`
  /* Base Styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.fast} ${({ theme }) => theme.animations.easing.easeInOut};
  text-decoration: none;
  user-select: none;
  position: relative;
  overflow: hidden;

  /* Focus styles */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  /* Disabled styles */
  ${({ $disabled }) =>
    $disabled &&
    `
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  `}

  /* Size variants */
  ${({ $size, theme }) => {
    switch ($size) {
      case 'sm':
        return `
          padding: ${theme.spacing[2]} ${theme.spacing[3]};
          font-size: ${theme.typography.fontSize.sm};
          min-height: 32px;
        `;
      case 'lg':
        return `
          padding: ${theme.spacing[4]} ${theme.spacing[6]};
          font-size: ${theme.typography.fontSize.lg};
          min-height: 48px;
        `;
      default: // md
        return `
          padding: ${theme.spacing[3]} ${theme.spacing[5]};
          font-size: ${theme.typography.fontSize.base};
          min-height: 40px;
        `;
    }
  }}

  /* Color variants */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.text.inverse};
          border-color: ${theme.colors.primary};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondary};
            border-color: ${theme.colors.secondary};
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.text.inverse};
          border-color: ${theme.colors.secondary};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary};
            border-color: ${theme.colors.primary};
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'success':
        return `
          background-color: ${theme.colors.success};
          color: ${theme.colors.text.inverse};
          border-color: ${theme.colors.success};

          &:hover:not(:disabled) {
            background-color: #059669;
            border-color: #059669;
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'warning':
        return `
          background-color: ${theme.colors.warning};
          color: ${theme.colors.text.inverse};
          border-color: ${theme.colors.warning};

          &:hover:not(:disabled) {
            background-color: #D97706;
            border-color: #D97706;
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.danger};
          color: ${theme.colors.text.inverse};
          border-color: ${theme.colors.danger};

          &:hover:not(:disabled) {
            background-color: #DC2626;
            border-color: #DC2626;
            transform: translateY(-1px);
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
            color: ${theme.colors.text.inverse};
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.text.inverse};
          border-color: ${theme.colors.primary};
        `;
    }
  }}
`;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  type = 'button',
  className,
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $disabled={disabled}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={className}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}
    >
      {children}
    </StyledButton>
  );
};

export default Button;