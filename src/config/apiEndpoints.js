/**
 * API 엔드포인트 설정 파일
 * 모든 API URL을 중앙 집중식으로 관리하기 위한 파일입니다.
 */

// API 기본 URL 설정 (환경변수 또는 기본값 사용)
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

/**
 * API 엔드포인트 정의
 * 애플리케이션에서 사용되는 모든 API 엔드포인트를 객체 형태로 정의합니다.
 */
export const API_ENDPOINTS = {
  POSTS: {
    // 포스트 관련 엔드포인트
    BASE: `${API_BASE_URL}/posts`,
    DETAIL: (id) => (id ? `${API_BASE_URL}/posts/${id}` : null),
    COMMENTS: (id) => `${API_BASE_URL}/posts/${id}/comments`,
  },
  USERS: {
    // 사용자 관련 엔드포인트
    BASE: `${API_BASE_URL}/users`,
    DETAIL: (id) => `${API_BASE_URL}/users/${id}`,
    POSTS: (userId) => `${API_BASE_URL}/users/${userId}/posts`,
  },
  COMMENTS: {
    // 댓글 관련 엔드포인트
    BASE: `${API_BASE_URL}/comments`,
    DETAIL: (id) => `${API_BASE_URL}/comments/${id}`,
  },
  // 필요에 따라 더 많은 엔드포인트 추가 가능
};

export default API_ENDPOINTS;
