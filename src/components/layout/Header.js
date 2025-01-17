import Link from 'next/link';
import { router } from 'next/client';
import { css } from '@emotion/react';

const headerStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: #0070f3;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;

  nav {
    display: flex;
    gap: 16px;
  }

  a {
    text-decoration: none;
    color: white;
    font-size: 1rem;
    transition: color 0.2s;

    &:hover {
      color: #d1e0f3;
    }
  }
`;
function Header() {
  const backButtonClick = () => {
    router.back();
  };
  return (
    <header css={headerStyles}>
      <button type="button" onClick={backButtonClick}>
        뒤로가기
      </button>
      <nav>
        <Link href="/">홈</Link>
        <Link href="/users">사용자</Link>
        <Link href="/board">게시판</Link>
      </nav>
    </header>
  );
}

export default Header;
