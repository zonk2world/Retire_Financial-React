import React from "react";
import ArrowLeft from "@2fd/ant-design-icons/lib/ArrowLeft";
import ArrowRight from "@2fd/ant-design-icons/lib/ArrowRight";

interface FooterProps {
    firstStep: boolean;
    handlePrev: () => void;
    handleNext: () => void;
}

const Footer: React.FC<FooterProps> = ({ firstStep, handlePrev, handleNext }) => {
    return (
        <div className={`w-full flex ${firstStep ? 'justify-end' : 'justify-between'}`}>
            {!firstStep &&
                <button
                    className="flex items-center justify-center px-12 h-[65px] text-xl font-bold bg-[#F2F3F8]"
                    onClick={handlePrev}
                >
                    <ArrowLeft className="mr-3" />
                    Back
                </button>
            }
            <button
                className="flex items-center justify-center px-12 h-[65px] text-xl font-bold bg-[#0A2C75] text-white"
                onClick={handleNext}
            >
                Continue
                <ArrowRight className="ml-3" />
            </button>
        </div>
    );
};

export default Footer;
