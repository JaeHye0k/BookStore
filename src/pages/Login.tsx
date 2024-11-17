import Title from "../components/common/Title";
import { SignupProps, SignupStyle } from "./Signup";
import { SubmitHandler, useForm } from "react-hook-form";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import { login } from "../api/auth.api";
import { useAuthStore } from "../store/authStore";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupProps>();
    const navigate = useNavigate();
    const showAlert = useAlert();
    const storeLogin = useAuthStore((state) => state.storeLogin);
    const onSubmit: SubmitHandler<SignupProps> = (data) => {
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
    return (
        <>
            <Title size="large">로그인</Title>
            <SignupStyle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <InputText
                            placeholder="이메일"
                            inputType="email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
                    </fieldset>
                    <fieldset>
                        <InputText
                            placeholder="비밀번호"
                            inputType="password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && <p className="error-text">비밀번호를 입력해주세요.</p>}
                    </fieldset>
                    <fieldset>
                        <Button type="submit" size="medium" scheme="primary">
                            로그인
                        </Button>
                    </fieldset>
                    <div className="info">
                        <Link to="/reset">비밀번호 초기화</Link>
                    </div>
                </form>
            </SignupStyle>
        </>
    );
};

export default Login;
