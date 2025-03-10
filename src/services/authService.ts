import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({
  email,
  password,
}: LoginParams): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return !!response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    return false;
  }
};

export const socialLogin = async (provider: string, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/${provider}`, { token });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("소셜 로그인 실패:", error);
    return null;
  }
};
