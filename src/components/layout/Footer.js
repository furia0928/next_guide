import Link from 'next/link'
import { router } from 'next/client'

function Footer() {
  return (
    <footer>
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
    </footer>
  )
}

export default Footer
