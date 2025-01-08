import React from "react";

function ErrorPage({ statusCode }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{statusCode ? `Error: ${statusCode}` : "An error occurred"}</h1>
      <p>
        {statusCode
          ? `A ${statusCode} error occurred on the server`
          : "An error occurred on the client"}
      </p>
      <a href="/">Go back to Home</a>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
