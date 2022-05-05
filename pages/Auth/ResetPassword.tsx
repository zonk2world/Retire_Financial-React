import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../store/auth/action";
import { ApplicationState } from "resources/js/store";
import Header from "../Header";
import { Toast } from "../../components/common/notification";

interface FormData{
    password: string,
    password_confirmation: string
}

const ResetPassword:React.FC = (props:any) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const token = useSelector((state: ApplicationState) => state.auth.token);

    const handleSubmit = ():void => {
        if(props.match.params.token) {
            form.validateFields().then((data:FormData)=> {
                dispatch(resetPassword({...data, token: props.match.params.token}));
            })
        } else {
            Toast('', 'Something went wrong please check the email again', 'danger');
        }
    }

    if(token) {
        return <Redirect to="/"></Redirect>
    }

    return (
        <>
            <Header opacity={false} />
            <div className="auth_container bg-[#F3F5F9]">
                <div className="form_container bg-white top-[50px] absolute lg:mt-[144px] md:mt-[132px] rounded-none shadow-none" style={{boxShadow: 'none'}}>
                    <div className="title">Reset your password</div>
                    <Form form={form} layout={'vertical'} requiredMark={false}>
                        <Form.Item name={"password"} label={'Password'} rules={[ { required: true, message: "Password is required." } ]}>
                            <Input placeholder={'Enter password'} type={'password'} />
                        </Form.Item>
                        <Form.Item name={"password_confirmation"} label={'Confirm Password'}
                            rules={[
                                { required: true, message: "The two passwords that you entered do not match!" },
                                ({ getFieldValue }:any) => ({
                                    validator(_:any, value:any) {
                                        if ( !value || getFieldValue("password") === value ) {
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
                            <Input placeholder={'Confirm password'} type={'password'} />
                        </Form.Item>
                        <Form.Item>
                            <Button type={'primary'} className={'w-100 btn-signin'} onClick={() => {handleSubmit()}}>Reset password</Button>
                        </Form.Item>
                        <div className="flex justify-end">
                            <Link className={'forgot-pass'} to='/signin'>Login</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};
export default ResetPassword;
