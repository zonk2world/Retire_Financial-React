import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "resources/js/store";
import Header from "../Header";
import {
    TextSubitle,
    TextNormal,
    TextGradient,
} from "../../../components/Typographies";
import AppointmentCalendar from "../../../components/AppointmentCalendar";
import axios from "axios";

const quickLinks = [
    {
        title: "Planning Support",
        link: "https://share.hsforms.com/1W-I1LpIqRhSs6bbJM11AWg4fetj",
    },
    {
        title: "Account Support",
        link: "https://share.hsforms.com/1cNt1pyifR3q6MR-bT3qygA4fetj",
    },
    {
        title: "Schedule an Investment Review",
        link: "https://meetings.hubspot.com/jv2/retireus2",
    },
    {
        title: "Rollover an Old Employer Plan",
        link: "https://share.hsforms.com/1mg-E0YQpQ-urcr01SE4OvA4fetj",
    },
    {
        title: "Ask The CFP®",
        link: "https://share.hsforms.com/11SEWNnFGSVyQdrw3aJxTyw4fetj",
    },
];

const teamMembers = [
    {
        name: "Bryan Cooney",
        role: "Investment Planning Specialist",
        thumb: "assets/images/team/Bryan_Cooney.jpeg",
        bio: ["Function", "Function", "Function"],
    },
    {
        name: "Jonathan Vettori",
        role: "Personal Wealth Concierge",
        thumb: "assets/images/team/Jonathan_Vettori.jpg",
        bio: ["Function", "Function", "Function"],
    },
];

const Support: React.FC = (props: any) => {
    const user = useSelector((state: ApplicationState) => state.auth.user);

    const slugs = ['jv2/retireus2'];
    const hs_version = "1.24945";
    const [calendarData, setCalendarData] = useState<any>(null);

    const [contactMember, setContactMember] = useState(teamMembers[0]);

    // const selectContactMember=(inx:number)=>{
    //     setContactMember(teamMembers[inx]);
    //     if(inx === 0) setCalendarData(meetingData1);
    //     else setCalendarData(meetingData2);
    // }

    useEffect(()=>{
        axios.get(`https://app.hubspot.com/api-passthrough/meetings-public/v1/book`, 
                    {
                        params:{slug: slugs[0], now: Date.now(),includeInactiveLink: true, location: 'meetings.hubspot.com', 
                                hubspotUtk: null, hs_static_app:'MeetingsPublic', hs_static_app_version: hs_version, clienttimeout: 12000}
                    })
        .then((res)=>{
            setCalendarData(res.data);
        })
    },[]);

    return (
        <div className="w-full relative pt-[60px] md:pt-[142px] pb-10 px-0 md:px-[60px] ">
            <Header title="Support" />
            <div className="px-6 md:px-0 mt-3 md:mt-0">
                <div className="flex flex-col lg:flex-row gap-[24px]">
                    <div className="flex-1">
                        <TextSubitle className="mb-[4px] md:mb-[12px]">
                            Welcome to Wealth Concierge
                        </TextSubitle>
                        <TextNormal grayed className="mb-[20px] md:mb-[32px]">
                            Wealth Concierge is a dedicated team of
                            professionals designed to maximize your virtual
                            planning experience and seamlessly help your
                            financial plan operate.
                        </TextNormal>

                        <div className="bg-white px-[20px] py-[20px] md:px-[40px] md:py-[32px] rounded-[20px]">
                            <TextSubitle className="mb-[4px] md:mb-[12px]">
                                Quick links
                            </TextSubitle>
                            <div className="py-[10px]">
                                {quickLinks.map((ql) => (
                                    <div
                                        className="flex items-center py-[6px] md:py-[10px]"
                                        key={ql.title}
                                    >
                                        <img src="assets/images/ico-document-blue.svg" />
                                        <a
                                            href={ql.link}
                                            className="text-[16px] md:text-[20px] text-transparent bg-clip-text bg-gradient-to-br from-[#4D7EF2] to-[#5FD4F4] ml-[16px] border-b-gradient"
                                            target="_blank"
                                        >
                                            {ql.title}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center bg-white px-[20px] py-[20px] md:px-[40px] md:py-[32px] rounded-[20px]">
                        <div className="w-[100px] max-h-[100px] rounded-full overflow-hidden">
                            {calendarData && 
                                <img
                                    src={calendarData.customParams.displayInfo.avatar}
                                    className="w-full"
                                    alt="Meeting person" 
                                />
                            }
                        </div>
                        <TextNormal className="text-[16px] md:text-[20px] py-[22px]">
                            {calendarData?.customParams.displayInfo.headline}
                        </TextNormal>
                        <AppointmentCalendar
                            data = {calendarData}
                            slug = {slugs[0]}
                            hs_version={hs_version}
                        />
                    </div>
                </div>
                <div className="mt-[20px] md:mt-[46px]">
                    <TextSubitle className="mb-[16px] md:mb-[30px]">
                        Your Wealth Concierge Team
                    </TextSubitle>
                    <div className="flex flex-col lg:flex-row gap-[24px]">
                        {teamMembers.map((tm, idx) => (
                            <div
                                className="w-full md:flex-1 flex items-center bg-white px-[20px] py-[20px] md:px-[24px] md:py-[24px] rounded-[20px] gap-[20px] cursor-pointer"
                                key={`${tm.name}_${idx}`}
                                // onClick={() => selectContactMember(idx)}
                            >
                                <div className="max-w-[100px]">
                                    <img
                                        src={tm.thumb}
                                        className="w-full rounded-full bg-[#F7F9FC] border border-[#EEF1F8]"
                                        alt={tm.name}
                                    />
                                </div>
                                <div className="">
                                    <TextNormal className="font-bold">
                                        {tm.name}
                                    </TextNormal>
                                    <TextNormal grayed className="mb-[8px]">
                                        {tm.role}
                                    </TextNormal>
                                </div>
                            </div>
                        ))}
                        <div className="w-full md:flex-1 flex flex-col bg-white px-[20px] py-[20px] md:px-[24px] md:py-[24px] rounded-[20px] gap-[20px]">
                            <TextNormal className="font-bold">
                                Contact Us
                            </TextNormal>
                            <div className="mt-auto">
                                <div className="flex flex-wrap item-center pb-3">
                                    <img
                                        src="assets/images/ico-email.svg"
                                        alt="ico-email"
                                        className="mr-2"
                                    />
                                    <div className="text-base md:text-lg mr-4">
                                        Email:
                                    </div>
                                    <a href="mailto:support@retire.us">
                                        <TextGradient className="text-base md:text-lg">
                                            support@retire.us
                                        </TextGradient>
                                    </a>
                                </div>
                                <div className="flex flex-wrap item-center pb-3">
                                    <img
                                        src="assets/images/ico-phone.svg"
                                        alt="ico-phone"
                                        className="mr-2"
                                    />
                                    <div className="text-base md:text-lg mr-2">
                                        Phone:
                                    </div>
                                    <TextGradient className="text-base md:text-lg">
                                        1-800-857-PLAN
                                    </TextGradient>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
