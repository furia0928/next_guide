import { Html, Head, Main, NextScript } from 'next/document';
import { extractCritical } from '@emotion/server';

export default function Document({ styles }) {
  return (
    <Html lang="en">
      <Head>{styles}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => props,
    });

  const initialProps = await ctx.defaultGetInitialProps(ctx, renderPage);
  const styles = extractCritical(initialProps.html);

  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style
          data-emotion-css={styles.ids.join(' ')}
          dangerouslySetInnerHTML={{ __html: styles.css }}
        />
      </>
    ),
  };
};
