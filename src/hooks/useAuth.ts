import { login, resetPassword, resetRequest, signup } from "@src/api/auth.api";
import { useAuthStore } from "@src/store/authStore";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import { LoginProps } from "@src/pages/Login";
import { SignupProps } from "@src/pages/Signup";
import { useState } from "react";

export const useAuth = () => {
    // 상태
    const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const [resetRequested, setResetRequested] = useState(false);

    // 메서드
    const userLogin = (data: LoginProps) => {
        login(data)
            .then((res) => {
                showAlert("로그인이 완료되었습니다");
                storeLogin(res.token);
                navigate("/");
            })
            .catch((err) => {
                showAlert("로그인에 실패했습니다.");
            });
    };

    const userSignup = (data: SignupProps) => {
        signup(data)
            .then((res) => {
                showAlert(`회원가입이 완료되었습니다`);
                navigate("/login");
            })
            .catch((err) => console.error(err));
    };

    const userResetPassword = (data: SignupProps) => {
        resetPassword(data)
            .then(() => {
                showAlert("비밀번호 초기화 성공");
                navigate("/login");
            })
            .catch((err) => console.error(err));
    };

    const userResetRequest = (data: SignupProps) => {
        resetRequest(data)
            .then(() => {
                setResetRequested(true);
            })
            .catch((err) => console.error(err));
    };

    // 리턴
    return { userLogin, userSignup, userResetPassword, userResetRequest, resetRequested };
};
