import { SignupProps } from "../pages/Signup";
import { requestHandler } from "./http";

export const signup = async (userData: SignupProps) => {
    return requestHandler("post", "/users/join", userData);
};

export const resetRequest = async (userData: SignupProps) => {
    return requestHandler("post", "/users/reset", userData);
};

export const resetPassword = async (userData: SignupProps) => {
    return requestHandler("put", "/users/reset", userData);
};

interface LoginResponse {
    token: string;
}

export const login = async (userData: SignupProps) => {
    return requestHandler("post", "/users/login", userData);
};
