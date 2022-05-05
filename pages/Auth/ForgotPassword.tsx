import React from "react";
import { Form, Input, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendResetPasswordEmail } from "../../store/auth/action";
import { ApplicationState } from "../../store";
import Header from "../Header";
import { TextTitle, TextNormal } from "../../components/Typographies";

interface FormData {
    email: string;
    password: string;
}

const ForgotPassword: React.FC = (props: any) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const token = useSelector((state: ApplicationState) => state.auth.token);

    const handleSubmit = (): void => {
        form.validateFields().then((data: FormData) => {
            dispatch(sendResetPasswordEmail(data.email));
        });
    };

    if (token) {
        return <Redirect to="/"></Redirect>;
    }

    return (
        <>
            <Header opacity={false} />
            <div className="w-full min-h-[100vh] container-auth relative flex flex-col">
                <div className="w-full max-w-[448px] mx-auto px-[24px] pt-[90px] pb-[24px] md:pt-[125px]">
                    <TextTitle className="text-center pb-[16px] md:pb-[24px]">
                        Reset your password
                    </TextTitle>
                    <TextNormal
                        grayed
                        className="text-center text-[16px] md:text-[18px] leading-[24px] md:leading-[32px] pb-[24px] md:pb-[24px]"
                    >
                        Don't worry! Just fill in your email and we'll send you
                        a link to reset your password.
                    </TextNormal>

                    <Form form={form} layout={"vertical"} requiredMark={false}>
                        <Form.Item
                            name={"email"}
                            label={"Email"}
                            rules={[
                                {
                                    required: true,
                                    type: "email",
                                    message: "Valid Email is required.",
                                },
                            ]}
                        >
                            <Input placeholder={"Your email"} />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type={"primary"}
                                className={"w-100 btn-signin"}
                                onClick={() => {
                                    handleSubmit();
                                }}
                            >
                                Send password reset
                                email&nbsp;&nbsp;&#183;&#183;
                            </Button>
                        </Form.Item>
                        <div className="flex justify-center">
                            <Link className="forgot-pass" to="/signin">
                                <div className="text-[16px] md:text-[18px] text-[#001F55] font-bold">
                                    Login&nbsp;&nbsp;&#183;&#183;
                                </div>
                            </Link>
                        </div>
                    </Form>
                </div>

                <img
                    src="assets/images/signup-texture.png"
                    alt="texture"
                    className="absolute left-0 bottom-0 hidden md:block"
                />
                <img
                    src="assets/images/ico-ellipse.svg"
                    alt="ico-ellipse"
                    className="absolute left-[5%] bottom-[50%] hidden md:block"
                />
                <img
                    src="assets/images/ico-ellipse.svg"
                    alt="ico-ellipse"
                    className="absolute right-[5%] top-[20%] hidden md:block"
                />
            </div>
        </>
    );
};
export default ForgotPassword;
