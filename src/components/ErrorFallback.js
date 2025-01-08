export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
