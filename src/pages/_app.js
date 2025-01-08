import '@/styles/globals.css'
import { SWRConfig } from 'swr'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@/components/ErrorFallback'
import { fetchData } from '@/utils/api'
import { Global } from '@emotion/react'
import globalStyles from '@/styles/globalStyles'
export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error('ErrorBoundary caught an error', error, info)
      }}
    >
      <SWRConfig
        value={{
          // refreshInterval: 3000,
          fetcher: fetchData
        }}
      >
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </SWRConfig>
    </ErrorBoundary>
  )
}
