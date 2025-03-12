import React from 'react';
import Link from 'next/link';

function ErrorPage({ statusCode }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      123
      <h1>{statusCode ? `Error: ${statusCode}` : 'An error occurred'}</h1>
      <p>
        {statusCode
          ? `A ${statusCode} error occurred on the server`
          : 'An error occurred on the client'}
      </p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
