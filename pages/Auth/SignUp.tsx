import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gotoProfileStep, register } from "../../store/auth/action";
import { ApplicationState } from "resources/js/store";
import Header from "../Header";
import { Helmet } from "react-helmet";

interface locationStateProps {
    plan_id: number;
    auth_type: boolean;
}

const SignUp: React.FC = (props: any) => {
    const location = useLocation();
    const authTypeState: locationStateProps =
        location.state as locationStateProps;
    const [form] = Form.useForm();
    const token = useSelector((state: ApplicationState) => state.auth.token);
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()_+\-=\[\]{};':"\\|,.<>\/])[A-Za-z\d@$!%*#?&^()_+\-=\[\]{};':"\\|,.<>\/]{8,}$/g;

    useEffect(() => {
        if (token)
            dispatch(gotoProfileStep())
    }, [token]);

    const dispatch = useDispatch();
    // const selectedPlan = useSelector((state: ApplicationState) => state.plans.selectedPlan);
    const answers = useSelector(
        (state: ApplicationState) => state.questions.answers
    );
    const step = useSelector((state: ApplicationState) => state.questions.step);

    const handleSubmit = (): void => {
        form.validateFields().then((data: any) => {
            let submitData = { ...data };
            if (authTypeState?.auth_type) {
                submitData = {
                    ...submitData,
                    authenticate_type: 2,
                    plan_id: authTypeState.plan_id,
                };
            } else {
                submitData = {
                    ...submitData,
                    authenticate_type: 1,
                    answers: answers,
                    step: step,
                    is_done: answers.step37Answer_1 || answers.step37Answer_2,
                };
            }
            dispatch(register(submitData));
        });
    };

    const handleKeyUp = (e) => {
        if (e.keyCode === 13)
            handleSubmit();
    };

    if (token) {
        return <Redirect to="/"></Redirect>;
    }

    return (
        <>
            <Helmet
                    title={"Sign Up for RetireUS - Retirement and Financial Planning"}
                    htmlAttributes={{ lang: "en" }}
                    meta={[
                        {
                            name: `description`,
                            content: "Sign Up for a RetireUS account. Retirement and financial planning. Trusted and Certified Financial Planners at your fingertips.",
                        }
                ]}
            />
            <Header opacity={false} />
            <div className="w-full min-h-[100vh] container-auth relative flex flex-col">
                <div className="w-full max-w-[448px] mx-auto px-6 pt-[90px] pb-6 md:pt-[125px]">
                    <h1 className="text-center text-2xl md:text-4xl text-[#000714] font-bold pb-6">
                        Create your account
                    </h1>

                    <Form form={form} onKeyUp={handleKeyUp} layout={"vertical"} requiredMark={false}>
                        <Form.Item
                            name={"name"}
                            label={"Name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Name is required.",
                                },
                            ]}
                        >
                            <Input placeholder={"Enter your full name..."} />
                        </Form.Item>
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
                            <Input placeholder={"Enter your email..."} />
                        </Form.Item>
                        <Form.Item
                            name={"password"}
                            label={"Password"}
                            rules={[
                                {
                                    required: true,
                                    message: "Password is required.",
                                },
                                {
                                    pattern,
                                    message:
                                        "Your password must be at least eight characters long and contain numbers, letters, and at least one special character.",
                                },
                            ]}
                        >
                            <Input
                                placeholder={"Enter password"}
                                type={"password"}
                            />
                        </Form.Item>
                        <Form.Item
                            name={"confirm_password"}
                            label={"Confirm Password"}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "The two passwords that you entered do not match!",
                                },
                                ({ getFieldValue }: any) => ({
                                    validator(_: any, value: any) {
                                        if (
                                            !value ||
                                            getFieldValue("password") === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                "The two passwords that you entered do not match!"
                                            )
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input
                                placeholder={"Confirm password"}
                                type={"password"}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type={"primary"}
                                className={"w-100 btn-signin hover:bg-[#173A78]"}
                                onClick={() => {
                                    handleSubmit();
                                }}
                            >
                                Continue&nbsp;&nbsp;
                                <img
                                    src="assets/images/dots-white-btn.svg"
                                    alt="dots"
                                    className="w-6 h-6"
                                />
                            </Button>
                        </Form.Item>
                        <div className={"footer"}>
                            <span>Already have account?</span>
                            <Link className="text-[#001F55] font-bold rounded-full px-6 py-4 hover:bg-[#e3e7ef]" to="/signin">
                                Login&nbsp;&nbsp;&#183;&#183;
                            </Link>
                        </div>
                    </Form>
                </div>

                <img
                    src="assets/images/signup-texture.png"
                    alt="texture"
                    className="absolute left-0 bottom-0 hidden md:block z-[-1]"
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
export default SignUp;
