import Header from '@/components/layout/Header'

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      555
      <main>{children}</main>
      <footer>기본 푸터</footer>
    </div>
  )
}

export default DefaultLayout
