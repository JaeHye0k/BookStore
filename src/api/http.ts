import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";

const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
            Authorization: getToken() || "",
        },
        // `withCredentials`은 자격 증명을 사용하여 사이트 간 액세스 제어 요청을 해야 하는지 여부를 나타냅니다.
        withCredentials: true,
        ...config,
    });
    axiosInstance.interceptors.response.use(
        (response) => {
            // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
            // 응답 데이터가 있는 작업 수행
            return response;
        },
        (error) => {
            // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
            // 응답 오류가 있는 작업 수행
            // 토큰 만료
            if (error.response.status === 401) {
                removeToken();
                window.location.href = "/login";
                return;
            }
            return Promise.reject(error);
        },
    );
    return axiosInstance;
};

export const httpClient = createClient();
