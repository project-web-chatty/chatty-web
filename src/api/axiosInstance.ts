import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // 백엔드 API의 기본 URL
  headers: {
    "Content-Type": "application/json",
    // 필요한 경우 추가 헤더 설정
  },
  timeout: 5000, // 요청 시간 초과 시간 (밀리초)
});

export default axiosInstance;
