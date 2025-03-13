import { css } from '@emotion/react';

const globalStyles = (theme) => css`
  :root {
    /* 색상 변수 */
    ${Object.entries(theme.colors)
      .map(([key, value]) => `--color-${key}: ${value};`)
      .join('\n    ')}

    /* 폰트 사이즈 변수 */
    ${Object.entries(theme.fontSizes)
      .map(([key, value]) => `--font-size-${key}: ${value};`)
      .join('\n    ')}
  }

  html,
  body {
    max-width: 100vw;
  }

  body {
    color: var(--color-text);
    background: var(--color-background);
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
    /* 다크 모드는 ThemeProvider를 통해 구현할 예정 */
  }

  h1 {
    color: var(--color-text);
  }

  ul {
    list-style: none;
    padding: 0;
  }
`;

export default globalStyles;
