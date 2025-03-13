import Link from 'next/link';
import { router } from 'next/client';
import { StyledHeader } from './Header.styles';

function Header() {
  const backButtonClick = () => {
    router.back();
  };

  return (
    <StyledHeader>
      <button type="button" onClick={backButtonClick}>
        뒤로가기
      </button>
      <nav>
        <Link href="/">홈</Link>
        <Link href="/users">사용자</Link>
        <Link href="/board">게시판</Link>
      </nav>
    </StyledHeader>
  );
}

export default Header;
