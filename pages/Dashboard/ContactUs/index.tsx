import React from "react";
import Header from "../Header";

const ContactUs: React.FC = () => {
    return (
        <div className="w-full relative pt-[60px] md:pt-[142px] pb-10 px-0 md:px-[60px] ">
            <Header title="Contact RetireUS" />
            <div className="px-6 md:px-0 mt-3 md:mt-0">
                <div className="mr-5">
                    <p>Toll Free 1-800-857-PLAN</p>
                    <p>Direct (215)-996-PLAN</p>
                    <p>Email support@retire.us</p>
                </div>
                <div>
                    <p>MON: 9:00am-5:00pm</p>
                    <p>TUE: 9:00am-5:00pm</p>
                    <p>WED: 9:00am-5:00pm</p>
                    <p>THU: 9:00am-5:00pm</p>
                    <p>FRI: 9:00am-5:00pm</p>
                    <p>SAT: Closed</p>
                    <p>SUN: Closed</p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
