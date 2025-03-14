import { css } from '@emotion/react';

const globalStyles = (theme) => css`
  html,
  body {
    max-width: 100vw;
  }

  html {
    overflow-y: scroll;
    font-size: 62.5%;
    line-height: 1.5;
  }

  /* lang 속성으로 폰트 지정 */
  :lang(en) {
    font-family: var(--font-poppins), sans-serif !important;
  }

  :lang(ko) {
    font-family: var(--font-pretendard), sans-serif !important;
  }

  body {
    font-size: 1.4rem;
    color: var(--color-text);
    background: var(--color-background);
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

  // @media (prefers-color-scheme: dark) {
  //   html {
  //     color-scheme: dark;
  //   }
  //   /* 다크 모드는 ThemeProvider를 통해 구현할 예정 */
  // }

  h1 {
    color: var(--color-text);
  }

  ul {
    list-style: none;
    padding: 0;
  }
`;

export default globalStyles;
