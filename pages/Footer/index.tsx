import React from "react";
import { Link } from "react-router-dom";
import Img from "../../components/Image";

const Footer: React.FC = () => {

    return (
        <div className="w-full bg-[#EEF1F8]">
            <div className="md:w-full lg:max-w-[1024px] xl:max-w-[1440px] px-[20px] mx-auto">
                <div className="flex flex-wrap justify-between pt-[60px] pb-6 md:pb-10 border-b border-[#DDE3F0]">
                    <div className="flex flex-col flex-auto justify-center items-center lg:items-start border-b lg:border-0 border-[#DDE3F0]">
                        <Img src="assets/images/logo-blue.svg" alt="Footer Logo" className="mb-6" />
                        <div className="text-[#A2ACBE] text-base md:text-lg font-Lato pb-6 md:pb-10 lg:pb-0">
                            &copy; 2022 RetireUs. All rights reserved.
                        </div>
                    </div>
                    <div className="flex-auto pt-6 md:pt-10 lg:pt-0">
                        <div className="flex flex-wrap items-center justify-center lg:justify-end text-[#434A59] text-base md:text-lg gap-4 pb-6">
                            <Link to="/" className="no-underline">Home</Link>
                            <Link to="/about-us" className="no-underline">About Us</Link>
                            <Link to="/our-services" className="no-underline">Our Services</Link>
                            <Link to="/" className="no-underline">Get Started</Link>
                            <Link to="/pricing" className="no-underline">Pricing</Link>
                        </div>
                        <div className="flex items-center justify-center lg:justify-end text-[#434A59] text-base md:text-lg gap-4">
                            <Link to="/privacy-policy" className="no-underline">Privacy Policy</Link>
                            {/* <Link to="/terms-conditions" className="no-underline">Terms & Conditions</Link> */}
                        </div>
                    </div>
                </div>
                <div className="pt-6 lg:pt-[60px] pb-[40px] text-left">
                    <div className="text-[#A2ACBE] text-base md:text-lg">
                        McAdam LLC dba RetireUS is an SEC registered investment adviser that maintains a principal place of business in the State of Pennsylvania. The Firm may only transact business in those states in which it is notice filed or qualifies for a corresponding exemption from such requirements. For information about Mcadam LLC dba RetireUS registration status and business operations, please consult the Firm's Form ADV disclosure documents, the most recent versions of which are available on the SEC's Investment Adviser Public Disclosure website at <a href="https://www.adviserinfo.sec.gov" target="_blank" className="underline text-[#A2ACBE]">www.adviserinfo.sec.gov</a>.
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Footer;
