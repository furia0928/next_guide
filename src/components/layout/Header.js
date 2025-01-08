import Link from 'next/link'

function Header() {
  return (
    <header>
      커스텀 헤더
      <ul>
        <li>
          <Link href="/">홈</Link>
        </li>
        <li>
          <Link href="/users">사용자</Link>
        </li>
        <li>
          <Link href="/board">게시판</Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
