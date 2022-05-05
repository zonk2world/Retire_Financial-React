import axios from "../../util/api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "resources/js/store";
import Header from "../Dashboard/Header";

const IDVerify: React.FC = () => {
    const user = useSelector((state: ApplicationState) => state.auth.user);
    const [url, setUrl]=useState<string>("");    
    useEffect(()=>{
        if (user) {
            if (user.id_verified) {
                console.log("Verified user");
            } else{
                axios.post("auth/id-verify", user.email)
                .then(res => {
                    console.log("id-verify",res);
                    console.log("id-verify",res.data.data.url);
                    setUrl(res.data.data.url);
                })
                .catch(err=>{
                    console.log("err=>",err.response);
                });
            }            
        }
    },[])
    return (
        <div className="w-full h-full relative pt-[60px] md:pt-[142px] pb-10 px-0 md:px-[60px] ">
            <Header title="Verify ID" />
            <div className="px-6 md:px-0 mt-3 md:mt-0 h-full">
                {user && user.todos[0].completed !="Y"?(
                    <div className="w-full h-full text-center text-[40px] text-red-600">
                        Please complete your profile and meet with your advisor.
                    </div>
                ):user?.todos[1].completed !="Y"?(
                    <div className="w-full h-full text-center text-[40px] text-red-600">
                        Meet with your advisor
                    </div>
                ):null}  
                {user && user.todos[1].completed =="Y" && user.todos[2].completed !="Y" && (
                    <iframe
                        src={url ? url : ""}
                        frameBorder="0"
                        className="verifyIFrame w-full"
                    ></iframe>
                )}                
            </div>
        </div>
    );
};

export default IDVerify;
