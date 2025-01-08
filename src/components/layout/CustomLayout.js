import Header from '@/components/layout/Header'

function CustomLayout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <footer>커스텀 푸터</footer>
    </div>
  )
}

export default CustomLayout
