import React from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/auth/action";
import { ApplicationState } from "resources/js/store";
import { SectionContainer } from "../../components/common/Wrappers";
import { Helmet } from "react-helmet";


const Getstarted: React.FC = (props) => {
    const [form] = Form.useForm();
    const token = useSelector((state: ApplicationState) => state.auth.token);
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()_+\-=\[\]{};':"\\|,.<>\/])[A-Za-z\d@$!%*#?&^()_+\-=\[\]{};':"\\|,.<>\/]{8,}$/g;

    const dispatch = useDispatch();

    const handleSubmit = (): void => {
        form.validateFields().then((data: any) => {
            const submitData = {
                ...data,
                authenticate_type: 2,
                plan_id: 1,
            };

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
        <div className="w-full h-screen">
            <Header opacity={true} {...props} bgOnScroll="bg-white" blueOnScroll={true} />
            <Helmet
                    title={"Start with our Free & Secure Retirement Checkpoint Tool"}
                    htmlAttributes={{ lang: "en" }}
                    meta={[
                        {
                            name: `description`,
                            content: "Start your journey to financial freedom with our free Retirement Checkpoint Quiz. Get matched with a qualified financial advisor.",
                        },
                        {
                            name: `keywords`,
                            content: "Financial Planning Tool, Retirement Planning, Financial Consulting, Certified Financial Planner, CFP",
                        },  
                ]}
            />
            <div className="relative w-full bg-about-us-texture bg-cover bg-center bg-no-repeat">
                <div className="w-full lg:max-w-[1024px] xl:max-w-[1440px] px-6 mx-auto relative">
                    <div className="w-full md:max-w-[820px] pt-[100px] md:pt-[200px] pb-[60px] md:pb-[120px] mx-auto text-center">
                        <h1 className="font-bold text-[46px] leading-[48px] md:text-[70px] text-white md:leading-[74px] pb-[24px]">
                            This is your first step to financial freedom
                        </h1>
                    </div>
                </div>
            </div>

            <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 bg-white">
                <div className="w-full relative px-6 md:px-20 pt-[60px] md:pt-[120px] pb-9 bg-none md:bg-getstarted bg-no-repeat bg-bottom-left">
                    <h2 className="text-[32px] leading-9 md:text-[56px] md:leading-[60px] font-bold text-[#000714] z-1">
                        Start today with your free Retirement Checkpoint
                    </h2>
                    <div className="text-base md:text-xl md:leading-8 text-[#434A59] mt-5 md:mt-6 md:pr-[120px] z-1">
                        We’re going to ask you a series of multiple choice questions to help us understand your current retirement progress.
                    </div>
                    <div className="text-base md:text-xl md:leading-8 text-[#434A59] mt-5 md:mt-6 md:pr-[120px] z-1">
                        In less than four minutes, we’ll provide you with a detailed and personalized progress report as well as identify any red flags that could stand in your way of financial freedom.
                    </div>
                    <div className="absolute w-[14px] h-[14px] bg-[#FAA942] rounded-full bottom-[71px] right-[81px] hidden md:block"></div>
                </div>
                <div className="container-auth px-6 md:px-[120px] py-[60px] md:py-[120px] bg-[#F7F9FC]">
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
                                Sign Up&nbsp;&nbsp;
                                <img
                                    src="assets/images/dots-white-btn.svg"
                                    alt="dots"
                                    className="w-6 h-6"
                                />
                            </Button>
                        </Form.Item>
                        <div className={"footer"}>
                            <span>Already have account?</span>
                            <Link className="rounded-full px-6 py-4 hover:bg-[#e3e7ef]" to="/signin">
                                Login&nbsp;&nbsp;&#183;&#183;
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>

            <Footer />

        </div>
    );
};

export default Getstarted;
