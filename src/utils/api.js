import Cookies from "js-cookie";

// 공통 Fetch 유틸리티 함수
export async function fetchWrapper(endpoint, options = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL; // 환경 변수에서 베이스 URL 가져오기
  const url = `${baseUrl}${endpoint}`; // 엔드포인트와 베이스 URL 결합

  try {
    // 액세스 토큰 가져오기
    const accessToken = Cookies.get("access_token");

    // 기본 옵션 설정
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        ...options.headers,
      },
    });

    // 인증 에러(401) 처리
    if (response.status === 401) {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // 새 토큰으로 다시 요청
        return fetchWrapper(endpoint, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      } else {
        throw new Error("Authentication failed. Please log in again.");
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch 에러:", error.message);
    throw error;
  }
}

// 리프레시 토큰으로 새 액세스 토큰 요청
async function refreshAccessToken() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL; // 환경 변수에서 베이스 URL 가져오기
    const refreshToken = Cookies.get("refresh_token");
    if (!refreshToken) {
      throw new Error("리프레시 토큰이 없습니다. 다시 로그인해주세요.");
    }

    const response = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("리프레시 토큰 요청 실패");
    }

    const data = await response.json();
    const newAccessToken = data.accessToken;

    // 새 액세스 토큰 저장 (쿠키)
    Cookies.set("access_token", newAccessToken, { expires: 1 }); // 1일 유효

    return newAccessToken;
  } catch (error) {
    console.error("액세스 토큰 갱신 실패:", error.message);
    return null;
  }
}
