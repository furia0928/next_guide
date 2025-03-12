import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          null,
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        Cookies.set('accessToken', newAccessToken, {
          secure: true,
          sameSite: 'Strict',
        });

        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        Cookies.remove('accessToken');
        return Promise.reject(refreshError); // 여기서 클라이언트 리디렉션 제거
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

/**
 * API 호출 유틸리티
 * @param {string} url - API 엔드포인트
 * @param method
 * @param {object} options - Axios 요청 옵션 (data, params 등)
 * @returns {Promise<object>} - API 응답 데이터
 */
export const fetchData = async (url, method = 'GET', options = {}) => {
  try {
    const response = await axiosInstance({ method, url, ...options });
    return response.data;
  } catch (error) {
    console.error('fetchData error:', error);
    throw error; // 에러는 호출하는 쪽에서 처리
  }
};

/**
 * SSR 데이터 패칭 유틸리티
 * @param {function} endpointResolver - API 엔드포인트 생성 함수
 * @returns {function} - Next.js getServerSideProps 함수
 */
export const withSSRProps = (endpointResolver) => async (context) => {
  const endpoints =
    typeof endpointResolver === 'function'
      ? endpointResolver(context)
      : endpointResolver;
  try {
    const results = await Promise.all(
      endpoints.map(
        (endpoint) =>
          axiosInstance
            .get(endpoint)
            .then((res) => res.data)
            .catch(() => null) // 에러 처리
      )
    );

    const initialData = endpoints.reduce((acc, endpoint, idx) => {
      acc[endpoint] = results[idx] ?? {};
      return acc;
    }, {});
    return {
      props: {
        initialData,
        query: context?.query || {},
        params: context?.params || {},
      },
    };
  } catch (error) {
    return {
      props: {
        initialData: null,
        query: context?.query || {},
        params: context?.params || {},
      },
    };
  }
};
