import Header from '@/components/layout/Header'

function Wrap({ children }) {
  return (
    <div id="wrap">
      <>{children}</>
      <footer>기본 푸터</footer>
    </div>
  )
}

export default Wrap
