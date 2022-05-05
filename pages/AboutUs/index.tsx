import React from "react";
import Header from "../Header";
import Footer from "../Footer";

import {
    TextSubitle,
    TextTitleLg,
    TextNormal,
    TextGradient,
} from "../../components/Typographies";
import {
    FillButtonLink,
} from "../../components/Buttons/WhiteButtons";
import CustomSlider from "../../components/Slider";
import { SectionContainer } from "../../components/common/Wrappers";
import { differences, items } from "./contents";
import { Helmet } from "react-helmet";

const AboutUs: React.FC = (props) => {
    return (
        <div className="w-full h-screen">
            <Helmet
                title={"Trusted Financial Advisors at your Fingertips - RetireUS"}
                htmlAttributes={{ lang: "en" }}
                meta={[
                    {
                        name: `description`,
                        content: "Our mission is to help you establish a clear path to financial freedom through time-saving technology and easier access to expert advice.",
                    },
                    {
                        name: `keywords`,
                        content: "Financial Advisors, Financial Planning and Analysis, Financial Consulting Firm, Certified Financial Planner",
                    },
                ]}
            />
            <Header
                opacity={true}
                {...props}
                bgOnScroll="bg-white"
                blueOnScroll={true}
            />
            <div className="relative w-full bg-about-us-texture bg-cover bg-center bg-no-repeat px-6">
                <div className="w-full lg:max-w-[1024px] xl:max-w-[1440px] mx-auto relative">
                    <div className="w-full max-w-[820px] pt-[100px] md:pt-[200px] pb-[60px] md:pb-[120px] mx-auto text-center">
                        <h1 className="font-bold text-[46px] leading-[48px] md:text-[70px] text-white md:leading-[74px] pb-[24px]">
                            We are here to help
                        </h1>
                        <div className="text-base leading-6 md:text-[20px] text-white md:leading-[30px]">
                            It is our mission to help you establish a clear path
                            toward financial freedom through time-saving
                            technology and easier access to expert advice.
                        </div>
                    </div>
                </div>
            </div>

            <SectionContainer
                grayed
                className="flex flex-col lg:flex-row justify-between"
            >
                <div className="flex-1">
                    <TextTitleLg className="mb-5 md:mb-6" align="left">
                        Feeling frustrated, overwhelmed, or detached from your
                        current retirement plan?
                    </TextTitleLg>
                    <TextGradient className="text-base md:text-[23px] font-bold">
                        You're not alone.
                    </TextGradient>
                </div>
                <div className="flex-1 flex justify-end pt-[64px] lg:pt-0">
                    <div className="lg:max-w-[500px]">
                        <img
                            src="assets/images/people-mockup.svg"
                            alt="people-mockup"
                            className="w-full mb-8"
                        />
                        <TextNormal
                            className="text-base leading-6 md:text-[18px] md:leading-8 mb-3 md:pl-4"
                            grayed
                        >
                            70% of Americans say they're either behind on
                            retirement savings or don't know where they stand.
                        </TextNormal>
                        <a
                            href="#"
                            className="text-base leading-6 md:text-[18px] md:leading-8 text-[#001F55] flex items-center md:pl-4"
                        >
                            Read the source
                            <img
                                src="assets/images/ico-external-link.svg"
                                alt="Ico-external-link"
                                className="ml-2"
                            />
                        </a>
                    </div>
                </div>
            </SectionContainer>

            <SectionContainer className="flex flex-col-reverse lg:flex-row justify-between">
                <div className="lg:self-end relative">
                    <img
                        src="assets/images/bank-texture.png"
                        alt="bank-texture"
                        className="bottom-0 left-0 lg:max-w-[100%] w-full"
                    />
                    <img
                        src="assets/images/bank.svg"
                        alt="bank"
                        className="absolute left-[50%] translate-x-[-50%] bottom-[3px] w-3/4"
                    />
                </div>
                <div className="w-full lg:w-[600px]">
                    <TextTitleLg className="md:text-left mb-6">
                        It's not you, it's them
                    </TextTitleLg>
                    <TextNormal
                        className="text-base leading-6 md:text-[20px] md:leading-8 mb-6"
                        grayed
                    >
                        The financial planning industry is dominated by big institutions who want to sell you their investments.
                    </TextNormal>
                    <TextNormal
                        className="text-base leading-6 md:text-[20px] md:leading-8 mb-6"
                        grayed
                    >
                        The result: most investors lack clarity on what they need from their savings and are unsure if the investments they have are appropriate.
                    </TextNormal>
                </div>
            </SectionContainer>

            <SectionContainer className="md:hidden py-10">
                <div className="flex-1 flex justify-end">
                    <div className="relative lg:max-w-[510px]">
                        <TextNormal
                            className="text-base leading-6 md:text-xl md:leading-8 mb-5 md:mb-6"
                            grayed
                        >
                            Our goal is to give power back to the investor. Once you have clarity on what's needed from your savings, it's much easier to see which investment institutions are right for you.
                        </TextNormal>
                        <div className="flex items-center gap-5">
                            <img
                                src="assets/images/retire-cofounder-2.jpg"
                                className="w-[60px] h-[60px] rounded-full bg-[#F7F9FC] border border-[#EEF1F8]"
                                alt="Retire Co-founder"
                            />
                            <div>
                                <TextGradient className="text-base md:text-[20px] font-bold">
                                    Michael A Scarpati, CRPC®
                                </TextGradient>
                                <TextNormal className="text-[14px] md:text-[18px]">
                                    Co-founder & CEO of RetireUS
                                </TextNormal>
                            </div>
                        </div>
                        <img
                            src="assets/images/ico-quote.svg"
                            alt="ico-quote"
                            className="absolute top-[-40px] left-0 z-[-1]"
                        />
                    </div>
                </div>
            </SectionContainer>

            <SectionContainer
                grayed
                className="flex flex-col lg:flex-row justify-between md:pb-[32px]"
            >
                <div className="flex-1">
                    <TextTitleLg className="mb-5 md:mb-6" align="left">
                        We are different. Our advisors work for YOU, not an
                        investment institution
                    </TextTitleLg>
                    <TextGradient className="text-base md:text-[23px] font-bold">
                        Here's how.
                    </TextGradient>
                </div>
                <div className="flex-1 hidden md:flex justify-end pt-[64px] lg:pt-0">
                    <div className="relative lg:max-w-[510px]">
                        <TextNormal
                            className="text-base leading-6 md:text-xl md:leading-8 mb-5 md:mb-6"
                            grayed
                        >
                            Our goal is to give power back to the investor. Once you have clarity on what's needed from your savings, it's much easier to see which investment institutions are right for you.
                        </TextNormal>
                        <div className="flex items-center gap-5">
                            <img
                                src="assets/images/retire-cofounder-2.svg"
                                className="w-[100px] h-[100px] rounded-full bg-[#F7F9FC] border border-[#EEF1F8]"
                                alt="Meeting person"
                            />
                            <div>
                                <TextGradient className="text-base md:text-[20px] font-bold">
                                    Michael A Scarpati, CRPC®
                                </TextGradient>
                                <TextNormal className="text-[14px] md:text-[18px]">
                                    Co-founder & CEO of RetireUS
                                </TextNormal>
                            </div>
                        </div>
                        <img
                            src="assets/images/ico-quote.svg"
                            alt="ico-quote"
                            className="absolute top-[-40px] left-[-15px] z-[-1]"
                        />
                    </div>
                </div>
            </SectionContainer>

            <SectionContainer
                grayed
                className="flex flex-col-reverse md:flex-row justify-between pt-0 md:pt-[32px]"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-[70px]">
                    {differences.map((d, i) => (
                        <div key={`differences_${i}`}>
                            <img
                                src={`assets/images/${d.icon}.svg`}
                                alt={d.icon}
                                className="w-[100px] mb-8"
                            />
                            <TextSubitle className="mb-4">
                                {d.title}
                            </TextSubitle>
                            <TextNormal className="text-[14px] md:text-[18px]">
                                {d.description}
                            </TextNormal>
                        </div>
                    ))}
                </div>
            </SectionContainer>

            <div className="relative w-full z-[2] bg-future-texture-mobile md:bg-future-texture bg-bottom bg-cover bg-no-repeat px-6">
                <div className="w-full lg:max-w-[1024px] xl:max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 relative">
                    <div className="w-full pt-[60px] pb-20 md:py-[120px] lg:py-[144px]">
                        <div className="lg:max-w-[520px]">
                            <h3 className="font-bold text-[46px] md:text-[52px] lg:text-[56px] leading-[48px] md:leading-[54px] lg:leading-[60px] text-white pb-5 md:pb-4 lg:pb-6">
                                You deserve the best
                            </h3>
                            <div className="text-base text-white md:text-[20px] leading-6 lg:leading-8 mb-11">
                                RetireUS Co-founder and Chief Financial Planner,
                                Michael Blahusch CFP®, ChFC®, CRPC®, MBA, leads
                                a centralized team of Certified Financial
                                Planners&#8482; so that you can receive expert
                                advice for a fraction of the normal cost.
                            </div>
                            <FillButtonLink
                                href="/intro"
                                className="w-max py-[15px] xl:py-[25px] px-6 xl:px-10 mx-0 mb-[14px]"
                            >
                                <div className="flex items-center gap-4">
                                    Learn More<span>&#183;&#183;</span>
                                </div>
                            </FillButtonLink>
                        </div>
                    </div>

                    <div className="flex items-end justify-center px-6 md:px-0">
                        <img
                            src="assets/images/retire-cofounder.png"
                            alt="Person"
                            className=""
                        />
                    </div>
                </div>
            </div>

            <SectionContainer>
                <TextTitleLg className="mb-[80px]">
                    Let us show you how it's done
                </TextTitleLg>
                <CustomSlider items={items} />

                <TextNormal className="text-xs mt-6 md:mt-10 text-center">
                    All statistics as of Dec. 31, 2021 via form ADV with the SEC.
                </TextNormal>

                <div className="pt-6 md:pt-10">
                    <div className="bg-small-texture bg-cover bg-no-repeat flex flex-wrap items-start justify-between rounded-[20px] md:rounded-[30px] lg:rounded-[40px] gap-10 px-6 py-10 md:p-20">
                        <div>
                            <h3 className="font-bold text-[24px] md:text-[36px] text-white leading-7 md:leading-10 mb-6">
                                It only takes 4 minutes
                            </h3>
                            <div className="text-white text-base md:text-[18px] leading-6 md:leading-8">
                                Our Retirement Checkpoint quiz will assess your retirement progress through a brief multiple choice questionnaire.
                            </div>
                        </div>
                        <FillButtonLink
                            href="/intro"
                            className="w-full md:w-max py-[15px] xl:py-[25px] px-6 xl:px-10 mx-0"
                            blue
                        >
                            <div className="flex items-center gap-4">
                                Take the quiz<span>&#183;&#183;</span>
                            </div>
                        </FillButtonLink>
                    </div>
                </div>
            </SectionContainer>

            <Footer />
        </div>
    );
};

export default AboutUs;
