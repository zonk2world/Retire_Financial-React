import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";


const PageNotFound: React.FC = () => {

    return (
        <div className="w-full h-screen">
            <div className="relative w-full">
                <Header opacity={true} />

                <div className="w-full lg:w-[1024px] xl:w-[1280px] px-6 mx-auto relative">
                    <div className="w-full md:w-[620px] pt-[84px] md:pt-[200px] pb-[120px] z-[100]">
                        <div className="text-[140px] md:text-[240px] leading-[120px] md:leading-[240px] text-transparent bg-clip-text bg-gradient-to-br from-[#4D7EF2] to-[#5FD4F4] pb-8 md:pb-10">
                            404
                        </div>
                        <div className="text-[46px] md:text-[56px] text-[#000714] leading-[48px] md:leading-[60px] font-bold pb-5 md:pb-6">
                            Page not found
                        </div>
                        <div className="text-[16px] md:text-[20px] text-[#434A59]  leading-[24px] md:leading-[32px] pb-8 md:pb-10">
                            Oops, we can't find the page you are looking for.<br />But we can help you find your way on our web site:
                        </div>

                        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 md:gap-4 pb-[20px]">
                            <Link to="/" className="px-[24px] py-3 md:py-4 rounded-[16px] flex justify-between bg-white" style={{ boxShadow: '0px 4px 32px rgba(24, 54, 98, 0.04)' }}>
                                <div className="text-[16px] md:text-[20px] text-[#001F55] leading-6 md:leading-[32px] font-bold">Home page</div>
                                <img src="assets/images/arrow-fill-orange.svg" className="md:w-8 md:h-8" alt="Check Mark Yellow" />
                            </Link>
                            <Link to="/about-us" className="px-[24px] py-3 md:py-4 rounded-[16px] flex justify-between bg-white" style={{ boxShadow: '0px 4px 32px rgba(24, 54, 98, 0.04)' }}>
                                <div className="text-[16px] md:text-[20px] text-[#001F55] leading-6 md:leading-[32px] font-bold">About us</div>
                                <img src="assets/images/arrow-fill-orange.svg" className="md:w-8 md:h-8" alt="Check Mark Yellow" />
                            </Link>
                            <Link to="/our-services" className="px-[24px] py-3 md:py-4 rounded-[16px] flex justify-between bg-white" style={{ boxShadow: '0px 4px 32px rgba(24, 54, 98, 0.04)' }}>
                                <div className="text-[16px] md:text-[20px] text-[#001F55] leading-6 md:leading-[32px] font-bold">Our services</div>
                                <img src="assets/images/arrow-fill-orange.svg" className="md:w-8 md:h-8" alt="Check Mark Yellow" />
                            </Link>
                            <Link to="/help" className="px-[24px] py-3 md:py-4 rounded-[16px] flex justify-between bg-white" style={{ boxShadow: '0px 4px 32px rgba(24, 54, 98, 0.04)' }}>
                                <div className="text-[16px] md:text-[20px] text-[#001F55] leading-6 md:leading-[32px] font-bold">Help</div>
                                <img src="assets/images/arrow-fill-orange.svg" className="md:w-8 md:h-8" alt="Check Mark Yellow" />
                            </Link>
                        </div>
                    </div>

                    <img src="assets/images/retire-texture.png" alt="texture" className="fixed bottom-0 right-0 max-w-[400px] md:max-w-[100%] z-[-1]" />
                    <img src="assets/images/404-girl.png" alt="Hero People" className="fixed bottom-0 right-0 max-w-[256px] md:max-w-[100%] z-[-1]" />
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
