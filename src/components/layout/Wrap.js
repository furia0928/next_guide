import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/layout/Container';

function Wrap({ children }) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}

export default Wrap;
