import React from "react"
// import moment from "moment";
import moment from "moment-timezone";
import { TextGradient, TextNormal } from "../Typographies";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { Toast } from "../common/notification";

interface ComponentProps{
    tsp: number,
    tz: string,
    duration:string,
    slug: string,
    hs_version:string,
    data:any,
    onClose: ()=> void,
    onBack: ()=> void
}

const ConfirmModal: React.FC<ComponentProps> = ({tsp,tz,duration,slug,hs_version,onClose, onBack}) => {

    const [form] = Form.useForm();

    const handleSubmit = (): void => {
        form.validateFields().then((data: any) => {
            let submitData = { ...data };
            console.log("submit data=>", submitData);
            console.log("version", hs_version);
            axios.post("https://api.hubspot.com/meetings-public/v1/book", {                
                    firstName:data.first_name,
                    lastName:data.last_name,
                    email:data.email,
                    formFields:[],
                    offline:false,
                    locale:"en-us",
                    timezone: tz,
                    duration:duration,
                    startTime:tsp
                
                }, {
                    params:{
                        hs_static_app: "MeetingsPublic",
                        hs_static_app_version: hs_version,
                        slug: slug
                    },
                    // headers: {"Access-Control-Allow-Origin": "*"} 
                 })
            .then(res => {
                console.log("response=>",res);
                Toast("Booking confirmed ", `You're booked with ${res.data.organizer.name}`, "success");
                onClose();                
            })
            .catch(err => {
                if(err.response){
                    Toast("", err.response.data.message, "danger");
                } else if (err.request) {
                    Toast("", "", "danger");
                }
            });
        });
    };

    return(
        <div className="container-meeting-confirm fixed top-0 left-0 w-full min-h-screen flex items-center justify-center bg-black/[.3] transition duration-500 p-[24px] z-[100]">
            <div className="w-full max-w-[528px] p-[20px] md:p-[40px] bg-white rounded-[20px] relative">
                <div
                    className="absolute w-[24px] h-[24px] right-[16px] top-[16px] cursor-pointer"
                    onClick={() => {
                        onClose();
                    }}
                >
                    <img
                        src="assets/images/ico-close.svg"
                        className="w-full"
                        alt="ico-close"
                    />
                </div>

                <TextGradient className="text-[23px] font-bold mb-[32px]">
                    Your information
                </TextGradient>

                <TextNormal className="font-bold mb-[16px]">
                    {moment(tsp).tz(tz).format("dddd, MMMM Do YYYY, h:mm A")}
                </TextNormal>                
                
                <Form className="font-[]" form={form} layout={"vertical"} requiredMark={false}>
                    <div className="md:grid  md:grid-cols-2 gap-3">
                        <Form.Item
                            name={"first_name"}
                            label={"First ame"}
                            rules={[
                                {
                                    required: true,
                                    message: "First name is required",
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={"last_name"}
                            label={"Last name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Last name is required",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name={"email"}
                        label={"Your email address"}
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Please enter a valid email address",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <div className="flex justify-between">
                        <Form.Item>
                            <Button
                                type={"primary"}
                                className={"w-100 btn-signin hover:bg-[#173A78]"}
                                onClick={() => {
                                    onBack();
                                }}
                            >
                                Back
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type={"primary"}
                                className={"w-100 btn-signin hover:bg-[#173A78]"}
                                onClick={() => {
                                    handleSubmit();
                                }}
                            >
                                Confirm
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default ConfirmModal;