import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "resources/js/store";
import ChevronDown from "@2fd/ant-design-icons/lib/ChevronDown";

interface IHeaderProps {
    title?: string | undefined;
}

const Header: React.FC<IHeaderProps> = (props) => {
    const user = useSelector((state: ApplicationState) => state.auth.user);

    return (
        <div className="w-full md:max-w-[calc(100%-200px)] lg:max-w-[calc(100%-360px)] font-Lato md:fixed z-10 top-0 bg-gradient-to-r from-[#3F68E4] to-[#5EC4F7]">
            <div className="flex justify-between items-center rounded-t-[20px] md:rounded-none py-2 md:py-11 bg-[#eef1f8] px-6 md:px-0">
                <span className="text-[18px] md:text-[36px] text-[#000714] font-bold">
                    {props?.title ? props?.title : `Hi, ${user?.name}`}
                </span>
                <div className="flex items-center gap-1 hidden">
                    <div className="bg-white flex justify-between items-center rounded-[40px] p-1">
                        {/* <div className="text-sm leading-4 text-[#A2ACBE] pl-2 md:pl-4">
                            RetireScore
                        </div> */}
                        {/* <div className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#4D7EF2] to-[#5FD4F4] px-2 md:px-4">
                            87%
                        </div> */}
                        <img
                            src="assets/images/people-1.png"
                            className="w-[36px] h-[36px] md:w-[40px] md:h-[40px]"
                            alt="people-1"
                        />
                    </div>
                    <ChevronDown className="text-xl text-[#001F55]" />
                </div>
            </div>
        </div>
    );
};
export default Header;
