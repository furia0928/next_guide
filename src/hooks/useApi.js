import { useState, useCallback } from 'react';
import { fetchData } from '@/lib/axiosInstance';
import { mutate } from 'swr';

/**
 * 기본 HTTP 요청을 처리하는 커스텀 훅
 * @param {string|null} url - API 엔드포인트
 * @param {string} method - HTTP 메서드 (GET, POST, PUT, DELETE, PATCH 등)
 * @returns {Object} HTTP 요청 관련 상태와 함수
 */
export const useHttp = (url, method) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (requestData = {}, options = {}) => {
      // URL 유효성 검사
      if (!url) {
        console.warn(`API Request skipped: URL is ${url}`);
        return null;
      }

      try {
        setIsLoading(true);
        setError(null);

        const requestOptions = { ...options };

        // 요청 메서드에 따라 데이터 처리
        if (method !== 'GET' && method !== 'DELETE') {
          requestOptions.data = requestData;
        }

        const result = await fetchData(url, method, requestOptions);

        setData(result);

        // 필요한 경우 SWR 캐시 갱신
        if (options.revalidate) {
          if (Array.isArray(options.revalidate)) {
            options.revalidate.forEach((path) => mutate(path));
          } else if (typeof options.revalidate === 'string') {
            mutate(options.revalidate);
          }
        }

        return result;
      } catch (err) {
        // 오류 로깅
        console.error(`API Error: ${method} ${url}`, err);
        setError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [url, method]
  );

  return {
    data,
    error,
    isLoading,
    execute,
    reset: () => {
      setData(null);
      setError(null);
      setIsLoading(false);
    },
  };
};

/**
 * POST 요청을 위한 훅 (URL을 인자로 받는 방식)
 * @param {string|null} url - API 엔드포인트
 * @returns {Object} POST 요청 관련 상태와 함수
 */
export const usePost = (url) => useHttp(url, 'POST');

/**
 * PUT 요청을 위한 훅 (URL을 인자로 받는 방식)
 * @param {string|null} url - API 엔드포인트
 * @returns {Object} PUT 요청 관련 상태와 함수
 */
export const usePut = (url) => useHttp(url, 'PUT');

/**
 * DELETE 요청을 위한 훅 (URL을 인자로 받는 방식)
 * @param {string|null} url - API 엔드포인트
 * @returns {Object} DELETE 요청 관련 상태와 함수
 */
export const useDelete = (url) => useHttp(url, 'DELETE');

/**
 * PATCH 요청을 위한 훅 (URL을 인자로 받는 방식)
 * @param {string|null} url - API 엔드포인트
 * @returns {Object} PATCH 요청 관련 상태와 함수
 */
export const usePatch = (url) => useHttp(url, 'PATCH');

/**
 * GET 요청을 위한 훅 (URL을 인자로 받는 방식) - 필요시 사용
 * @param {string|null} url - API 엔드포인트
 * @returns {Object} GET 요청 관련 상태와 함수
 */
export const useGet = (url) => useHttp(url, 'GET');

export default { usePost, usePut, useDelete, usePatch, useGet, useHttp };
