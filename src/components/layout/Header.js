import Link from 'next/link'
import { router } from 'next/client'

function Header() {
  const backButtonClick = () => {
    router.back()
  }
  return (
    <header>
      <button type="button" onClick={backButtonClick}>
        뒤로가기
      </button>
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
