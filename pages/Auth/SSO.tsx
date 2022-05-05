import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gotoProfileStep } from "../../store/auth/action";
import { login, hasAccount, googleLogin, facebookLogin } from "../../store/auth/action";
import { ApplicationState } from "resources/js/store";
import Header from "../Header";
import { Divider } from "antd";
import { Helmet } from "react-helmet";

interface locationStateProps {
    plan_id: number;
    auth_type: boolean;
}

interface FormData {
    email: string;
    password: string;
}

const SingleSignOn: React.FC = (props: any) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const token = useSelector((state: ApplicationState) => state.auth.token);
    const answers = useSelector(
        (state: ApplicationState) => state.questions.answers
    );
    const step = useSelector((state: ApplicationState) => state.questions.step);

    const location = useLocation();
    const authTypeState: locationStateProps =
        location.state as locationStateProps;

    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()_+\-=\[\]{};':"\\|,.<>\/])[A-Za-z\d@$!%*#?&^()_+\-=\[\]{};':"\\|,.<>\/]{8,}$/g;

    const [addRule, setAddRule] = useState<boolean>(false);

    useEffect(() => {
        if (token)
            dispatch(gotoProfileStep())
    }, [token]);

    const handleSubmit = (): void => {
        form.validateFields().then((data: FormData) => {
            dispatch(login(data.email, data.password));
        });
    };

    const handleGoogleLogin = (
        response: GoogleLoginResponse | GoogleLoginResponseOffline | any
    ): void => {
        const payload = getLoginPayload();
        if (response.code) {
            dispatch(googleLogin(response.code, payload));
        } else {
            dispatch(googleLogin(response.tokenId, payload));
        }
    };

    const handleFacebookLogin = (result: any): void => {
        if (result?.accessToken) {
            const payload = getLoginPayload();
            dispatch(facebookLogin(result.accessToken, payload));
        }
    };

    const handleChange = async () => {
        const ret = await hasAccount(form.getFieldsValue(["email"]));
        setAddRule(ret['data'].result);
    };

    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    };

    const getLoginPayload = (): any => {
        let payload = {};
        if (authTypeState?.auth_type) {
            payload = {
                authenticate_type: 2,
                plan_id: authTypeState.plan_id,
            };
        } else {
            payload = {
                authenticate_type: 1,
                answers: answers,
                step: step,
                is_done: answers.step37Answer_1 || answers.step37Answer_2,
            };
        }

        return payload;
    }

    return (
        <>
            <Header opacity={false} />
            <Helmet
                    title={"Login to RetireUS - Retirement and Financial Planning"}
                    htmlAttributes={{ lang: "en" }}
                    meta={[
                        {
                            name: `description`,
                            content: "Login to your RetireUS account. Retirement and financial planning. Trusted and Certified Financial Planners at your fingertips.",
                        }
                ]}
            />
            <div className="w-full min-h-[100vh] container-auth relative flex flex-col">
                <div className="w-full max-w-[448px] mx-auto px-[24px] pt-[90px] pb-[24px] md:pt-[125px]">
                    <h1 className="text-center text-2xl md:text-4xl text-[#000714] font-bold pb-6">
                        Continue
                    </h1>

                    <Form form={form} onKeyUp={handleKeyUp} layout={"vertical"} requiredMark={false}>
                        <Form.Item aria-hidden="true">
                            <GoogleLogin
                                clientId={
                                    process.env.MIX_GOOGLE_CLIENT_ID as string
                                }
                                buttonText="LOGIN WITH GOOGLE"
                                onSuccess={(e) => handleGoogleLogin(e)}
                                cookiePolicy={"single_host_origin"}
                                className={"w-100 gg-btn"}
                                render={(renderProps) => (
                                    <button
                                        onClick={renderProps.onClick}
                                        className="w-full bg-white px-6 py-4 rounded-xl shadow-[0px_4px_32px_rgba(24,54,98,0.04)] flex items-center justify-between hover:bg-[#fbfcfd]"
                                        type="button"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src="assets/images/ico-google.svg"
                                                alt="ico-google"
                                                className="w-7"
                                            />
                                            <span className="text-base text-[#001F55] font-Lato pl-6">
                                                Continue with Google
                                            </span>
                                        </div>
                                        <img
                                            src="assets/images/arrow-right-circle-orange.svg"
                                            width="24"
                                            alt="ico-arrow-right"
                                        />
                                    </button>
                                )}
                            />
                        </Form.Item>
                        <Form.Item aria-hidden="true">
                            <FacebookLogin
                                appId={
                                    process.env.MIX_FACEBOOK_APP_ID as string
                                }
                                fields="name,email,picture"
                                callback={(e) => handleFacebookLogin(e)}
                                onFailure={(e) => {
                                    console.log(e);
                                }}
                                size={"small"}
                                buttonStyle={{
                                    width: "100%",
                                    textAlign: "left",
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "white",
                                    boxShadow:
                                        "0px 4px 32px rgba(24, 54, 98, 0.04)",
                                    border: 0,
                                    borderRadius: 12,
                                }}
                                textButton={"Continue with Facebook"}
                                icon={
                                    <img
                                        src="assets/images/ico-facebook.svg"
                                        alt="ico-facebook"
                                        className="w-7"
                                    />
                                }
                                cssClass="auth-facebook"
                            />
                        </Form.Item>
                        <Form.Item aria-hidden="true">
                            <Link
                                className="w-full bg-white px-6 py-4 rounded-xl shadow-[0px_4px_32px_rgba(24,54,98,0.04)] flex items-center justify-between hover:bg-[#fbfcfd]"
                                to="/signup"
                            >
                                <div className="flex items-center">
                                    <img
                                        src="assets/images/ico-sso-email.svg"
                                        alt="ico-sso-email"
                                        className="w-7"
                                    />
                                    <span className="text-base text-[#001F55] font-Lato pl-6">
                                        Continue with Email
                                    </span>
                                </div>
                                <img
                                    src="assets/images/arrow-right-circle-orange.svg"
                                    width="24"
                                    alt="ico-arrow-right"
                                />
                            </Link>
                        </Form.Item>

                        <Divider plain className="auth-divider">
                            or Log in
                        </Divider>

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
                            <Input placeholder={"Enter your email..."} onBlur={handleChange} />
                        </Form.Item>
                        <div className="relative">
                            <Link
                                className="absolute top-0 right-0 text-[14px] md:text-[16px] text-[#001F55]"
                                to="/forgot-password"
                            >
                                Forgot Password?
                            </Link>
                            <Form.Item
                                name={"password"}
                                label={"Password"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Valid Password is required.",
                                    },
                                    () => ({
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.reject();
                                            }

                                            if (!addRule && value.length > 5) {
                                                if (!pattern.test(value))
                                                    return Promise.reject("Your password must be at least eight characters long and contain numbers, letters, and at least one special character.");
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    placeholder={"Enter password"}
                                    type={"password"}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item>
                            <Button
                                type={"primary"}
                                className={"w-100 btn-signin hover:bg-[#173A78]"}
                                onClick={() => {
                                    handleSubmit();
                                }}
                            >
                                Log in&nbsp;&nbsp;
                                <img
                                    src="assets/images/dots-white-btn.svg"
                                    alt="dots"
                                    className="w-6 h-6"
                                />
                            </Button>
                        </Form.Item>
                        <div className={"footer"}>
                            <span>Don't have an account?</span>
                            <Link className="text-[#001F55] font-bold rounded-full px-6 py-4 hover:bg-[#e3e7ef]" to="/signup">
                                Sign Up&nbsp;&nbsp;&#183;&#183;
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

export default SingleSignOn;
