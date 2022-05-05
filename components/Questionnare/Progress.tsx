import React from "react";
import { stepCount } from "../../constants/variables";

interface ComponentProps {
    step: number,
}

const Progress: React.FC<ComponentProps> = ({ step }) => {

    return (
        <div className="w-full px-[12px] md:px-[40px] py-[12px] bg-[#DDE3F0] rounded-full flex items-center">
            <div className="w-full h-[12px] mr-[12px] md:mr-[64px] rounded-full bg-white relative">
                <div
                    className="h-[12px] absolute left-0 top-0 rounded-full"
                    style={{
                        background: 'linear-gradient(90deg, #4D7EF2 -24.69%, #5FD4F4 123.22%)',
                        width: `${Math.min((step / stepCount) * 100, 100)}%`,
                    }}
                ></div>
            </div>
            <div className="w-auto bg-white py-[8px] md:py-[10px] rounded-full min-w-[60px] md:min-w-[90px] text-center">
                <div className="text-[16px] md:text-[23px] text-transparent bg-clip-text bg-gradient-to-br from-[#4D7EF2] to-[#5FD4F4] font-bold leading-none">{Math.min(Math.round((step / stepCount) * 100), 100)}%</div>
            </div>
        </div>
    );
};

export default Progress;
