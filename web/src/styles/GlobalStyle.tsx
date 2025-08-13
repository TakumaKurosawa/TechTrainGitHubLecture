import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  /* CSS Reset & Base Styles */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    height: 100%;
  }

  body {
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    color: ${({ theme }) => theme.colors.neutral[900]};
    background-color: ${({ theme }) => theme.colors.neutral[50]};
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  #root {
    isolation: isolate;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Typography */
  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.neutral[900]};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.neutral[800]};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.neutral[800]};
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.neutral[700]};
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[700]};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  }

  /* Link styles */
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.duration.fast} ${({ theme }) => theme.transitions.easing.ease};

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }

  /* Button reset */
  button {
    cursor: pointer;
    border: none;
    background: none;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  /* Focus styles */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Scrollbar styles (Webkit) */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.neutral[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral[300]};
    border-radius: ${({ theme }) => theme.borderRadius.base};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.neutral[400]};
  }

  /* Responsive utilities */
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    h1 {
      font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    }
    
    h2 {
      font-size: ${({ theme }) => theme.typography.fontSize.xl};
    }
    
    h3 {
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
    }
  }
`;