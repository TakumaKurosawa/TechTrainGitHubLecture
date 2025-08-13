import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100%;
    min-height: 100vh;
    background-color: #f9fafb;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
  }

  /* Color variables for consistency */
  :root {
    --color-primary: #3B82F6;
    --color-secondary: #6366F1;
    --color-success: #10B981;
    --color-warning: #F59E0B;
    --color-danger: #EF4444;
    --color-neutral-50: #F9FAFB;
    --color-neutral-100: #F3F4F6;
    --color-neutral-200: #E5E7EB;
    --color-neutral-300: #D1D5DB;
    --color-neutral-400: #9CA3AF;
    --color-neutral-500: #6B7280;
    --color-neutral-600: #4B5563;
    --color-neutral-700: #374151;
    --color-neutral-800: #1F2937;
    --color-neutral-900: #111827;
  }
`;