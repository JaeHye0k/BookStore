import Title from "../components/common/Title";
import { SubmitHandler, useForm } from "react-hook-form";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { SignupProps, SignupStyle } from "./Signup";
import { useAuth } from "@src/hooks/useAuth";

const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupProps>();
    const { resetRequested, userResetPassword, userResetRequest } = useAuth();

    const ResetRequest: SubmitHandler<SignupProps> = (data) => {
        // if (resetRequested) userResetPassword(data);
        // else userResetRequest(data);

        resetRequested ? userResetPassword(data) : userResetRequest(data);
    };

    return (
        <>
            <Title size="large">비밀번호 초기화</Title>
            <SignupStyle>
                <form onSubmit={handleSubmit(ResetRequest)}>
                    <fieldset>
                        <InputText
                            placeholder="이메일"
                            inputType="email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
                    </fieldset>
                    {resetRequested && (
                        <fieldset>
                            <InputText
                                placeholder="비밀번호"
                                inputType="password"
                                {...register("password", { required: true })}
                            />
                            {errors.password && (
                                <p className="error-text">비밀번호를 입력해주세요.</p>
                            )}
                        </fieldset>
                    )}
                    <fieldset>
                        <Button type="submit" size="medium" scheme="primary">
                            {resetRequested ? "비밀번호 초기화" : "초기화 요청"}
                        </Button>
                    </fieldset>
                </form>
            </SignupStyle>
        </>
    );
};

export default ResetPassword;
