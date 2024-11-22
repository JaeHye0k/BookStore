// http.ts
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
        withCredentials: true,
        ...config,
    });
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            // 토큰 만료
            if (error.response.status === 401) {
                removeToken();
                window.location.href = "/login";
                return;
            }
            return Promise.reject(error);
        },
    );
    axiosInstance.interceptors.request.use(
        (config) => {
            config.headers.Authorization = getToken() || "";
            return config;
        },
        (error) => {
            console.log(error);
            Promise.reject(error);
        },
    );
    return axiosInstance;
};

export const httpClient = createClient();

type RequestMethod = "get" | "post" | "put" | "delete";

export const requestHandler = async <T>(method: RequestMethod, url: string, payload?: T) => {
    let response;

    switch (method) {
        case "get":
            if (payload) response = await httpClient.get(url, payload);
            else response = await httpClient.get(url);
            break;
        case "post":
            response = await httpClient.post(url, payload);
            break;
        case "put":
            response = await httpClient.put(url, payload);
            break;
        case "delete":
            response = await httpClient.delete(url);
            break;
    }

    return response.data;
};
