import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// ✅ Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL, // 🔹 백엔드 주소 (배포 시 변경)
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ CORS 요청에서 쿠키를 포함하려면 추가
});

// ✅ 요청 인터셉터: 모든 요청에 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 🔹 로컬스토리지에서 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 🔹 요청 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ 응답 인터셉터: 응답 처리 및 토큰 갱신 로직 추가 가능
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error("인증 오류: 로그인 필요");
      localStorage.removeItem("token"); // 🔹 인증 실패 시 토큰 제거
      window.location.href = "/login"; // 🔹 로그인 페이지로 리디렉션
    }
    return Promise.reject(error);
  }
);

// ✅ 회원가입 API 요청 함수
export const signup = async (userData: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const response = await api.post("/signup", userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "회원가입 실패");
  }
};

// ✅ 로그인 API 요청 함수
export const login = async (userData: { email: string; password: string }) => {
  try {
    const response = await api.post("/login", userData);
    localStorage.setItem("token", response.data.access_token); // 🔹 로그인 성공 시 토큰 저장
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "로그인 실패");
  }
};

// ✅ 현재 로그인한 사용자 정보 가져오기
export const getUserProfile = async () => {
  try {
    const response = await api.get("/user/profile");
    return response.data;
  } catch (error: any) {
    throw new Error("사용자 정보를 불러올 수 없습니다.");
  }
};

// ✅ 로그아웃 API 요청
export const logout = async () => {
  try {
    await api.post("/logout");
    localStorage.removeItem("token"); // 🔹 로그아웃 시 토큰 삭제
    window.location.href = "/login"; // 🔹 로그인 페이지로 리디렉션
  } catch (error: any) {
    throw new Error("로그아웃 실패");
  }
};

export default api;
