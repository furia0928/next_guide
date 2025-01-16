import { SWRConfig } from 'swr';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/ErrorFallback';
import { fetchData } from '@/lib/axiosInstance';
import { Global } from '@emotion/react';
import globalStyles from '@/styles/globalStyles';
import Head from 'next/head';
import Wrap from '@/components/layout/Wrap';

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error('ErrorBoundary caught an error', error, info);
      }}
    >
      <SWRConfig
        value={{
          fetcher: (url) => fetchData(url),
          onError: (error) => {
            console.error('SWR Error:', error);
          },
          shouldRetryOnError: false, // 에러 발생 시 자동 재시도 비활성화
          revalidateOnFocus: true, // 포커스 시 데이터 재검증
          revalidateOnReconnect: true, // 네트워크 재연결 시 데이터 재검증
          dedupingInterval: 30000, // 같은 요청 중복 호출 방지 (10초)
        }}
      >
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Global styles={globalStyles} />
        <Wrap>
          <Component {...pageProps} />
        </Wrap>
      </SWRConfig>
    </ErrorBoundary>
  );
}
