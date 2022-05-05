import React, { useState } from "react";
import {Helmet} from "react-helmet"
import Header from "../Header";
import Footer from "../Footer";
import {
    SubscribeDesktopPlanTab,
    SubscribeMobilePlanTab,
} from "../../components/Tabs/SubscribePlanTab";
import {
    FillButtonLink,
    OutlineButtonLink,
} from "../../components/Buttons/WhiteButtons";
import {
    TextNormal,
    TextGradient,
    TextTitleLg,
} from "../../components/Typographies";
import CustomSlider from "../../components/Slider";

import {
    chartData,
    freedoms,
    progress,
    answers,
    plans,
    benefits,
    mobileBenefits,
    confidencies,
} from "./contents";
import Img from "../../components/Image";

const Home: React.FC = (props) => {
    // const [scrollTop, setScrollTop] = useState<number>(0);
    const [planTab, setPlanTab] = useState<number>(0);

    // useEffect(() => {
    //     const onScroll = (e) => {
    //         setScrollTop(e.target.documentElement.scrollTop);
    //     };
    //     window.addEventListener("scroll", onScroll);
    // }, []);

    return (
        <div className="w-full h-screen">
            <Helmet
                title={"Your Path to Financial Freedom - RetireUS"}
                htmlAttributes={{ lang: "en" }}
                meta={[
                    {
                        name: `description`,
                        content: "The financial planning process doesn't need to be complicated. Meet RetireUS, custom retirement and financial advice from trusted advisors.",
                    },
                    {
                        name: `keywords`,
                        content: "Financial Planning, Retirement Planning, Wealth Management Consultants, Financial Planning and Analysis, Certified Financial Planner, Financial Advisor",
                    },
                ]}
            />
            <Header
                opacity={true}
                {...props}
                bgOnScroll="bg-white"
                blueOnScroll={true}
            />
            <div className="relative w-full bg-hero-texture-mobile lg:bg-hero-texture bg-cover bg-bottom bg-no-repeat px-6">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg:max-w-[1024px] xl:max-w-[1440px] mx-auto pt-[100px] lg:pt-[106px]">
                    <div className="pt-0 lg:pt-[104px] pb-6 lg:pb-[60px] relative">
                        <h1 className="font-bold text-[46px] lg:text-[54px] xl:text-[70px] text-white leading-[48px] xl:leading-[74px] pb-5 lg:pb-4 xl:pb-6">
                            Financial freedom starts with US
                        </h1>
                        <div className="text-base lg:text-lg xl:text-xl text-white leading-6 xl:leading-8 pb-8 lg:pb-11">
                            Professional guidance for planning your financial
                            future.
                            <br />
                            Personal advisor meetings, ongoing investment
                            support, and technology to keep you on the right
                            path.
                        </div>
                        <FillButtonLink
                            href="/intro"
                            className="w-max py-[15px] xl:py-[25px] px-6 xl:px-10 mx-0 mb-[14px] lg:mb-[60px] xl:mb-[120px]"
                        >
                            <div className="flex items-center gap-4">
                                Get Started for Free<span>&#183;&#183;</span>
                            </div>
                        </FillButtonLink>
                        <div className="hidden lg:flex text-[16px] text-white leading-[24px] align-center justify-start">
                            <Img
                                src="assets/images/ico-info.svg"
                                alt="Icon Info"
                                className="mr-2"
                            />
                            Get started for free with a Retirement Checkpoint
                            quiz.
                        </div>
                        <Img
                            src="assets/images/ico-ellipse.svg"
                            alt="ico-ellipse"
                            className="absolute right-[50%] md:right-0 bottom-[20%] hidden md:block"
                        />
                    </div>
                    <div className="flex flex-col justify-end items-center mx-[-20px] sm:mx-0">
                        <Img
                            src="assets/images/hero-people.webp"
                            alt="Hero People"
                            className="w-full sm:w-[356px] md:w-[556px] lg:w-full max-w-[100%]"
                        />
                    </div>

                    <Img
                        src="assets/images/ico-ellipse.svg"
                        alt="ico-ellipse"
                        className="absolute right-[5%] top-[20%] hidden md:block"
                    />
                </div>
            </div>

            <div className="relative w-full z-[2] bg-[#F7F9FC] px-6">
                <div className="w-full lg:max-w-[1024px] xl:max-w-[1440px] py-[60px] lg:py-[120px] mx-auto">
                    <TextTitleLg className="sm:w-full max-w-[700px] mx-auto pb-0 sm:pb-10 md:pb-[30px]">
                        Are you on track for retirement?
                    </TextTitleLg>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-[75px] pt-[50px] font-Lato">
                        {chartData.map((item, key) => (
                            <div key={key} className="max-w-[350px] text-center mx-auto">
                                <div className="flex justify-center">
                                    <Img
                                        src={`assets/images/${item.img}`}
                                        alt="Chart 81"
                                        className="h-[114px]"
                                    />
                                </div>
                                <div className="text-[#5A6478] text-[16px] md:text-[18px] lg:text-[20px] leading-6 md:leading-8 pt-10">
                                    {item.title}
                                </div>
                                <div className="pt-[20px]">
                                    <a
                                        href={item.link}
                                        target={"_blank"}
                                        className="flex align-center justify-center text-[#001F55] text-[18px] leading-[30px]"
                                    >
                                        Read the source&nbsp;&nbsp;
                                        <Img
                                            src="assets/images/ico-external-link.svg"
                                            alt="Ico-external-link"
                                        />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative w-full z-[2] bg-white py-[60px] md:py-[120px] px-6">
                <div className="w-full lg:max-w-[1024px] xl:max-w-[1440px] mx-auto">
                    <TextTitleLg className="sm:w-full md:w-[700px] mx-auto pb-5 sm:pb-10 md:pb-[30px]">
                        It's easier than you think
                    </TextTitleLg>
                    <TextNormal
                        grayed
                        className="text-center text-base leading-6 md:text-xl md:leading-8 mb-[40px] md:mb-[80px]"
                    >
                        RetireUS makes it easy to understand how your savings
                        should to be working for YOU.
                    </TextNormal>

                    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[60px]">
                        {benefits.map((b) => (
                            <div
                                className="flex items-start font-Lato"
                                key={b.title}
                            >
                                <Img
                                    src="assets/images/ico-bullet-logo.svg"
                                    alt="Bullet logo"
                                    className="w-[30px] md:w-[60px]"
                                />
                                <div className="pl-5 md:pl-[32px]">
                                    <TextGradient className="font-bold text-xl leading-6 md:text-[23px] md:leading-7 pb-3 md:pb-4">
                                        {b.title}
                                    </TextGradient>
                                    <TextNormal
                                        grayed
                                        className="text-base leading-6 md:text-xl md:leading-8"
                                    >
                                        {b.content}
                                    </TextNormal>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid md:hidden grid-cols-1 md:grid-cols-2 gap-6 md:gap-[60px]">
                        {mobileBenefits.map((b) => (
                            <div
                                className="flex items-start font-Lato"
                                key={b.title}
                            >
                                <Img
                                    src="assets/images/ico-bullet-logo.svg"
                                    alt="Bullet logo"
                                    className="w-[30px] md:w-[60px]"
                                />
                                <div className="pl-5 md:pl-[32px]">
                                    <TextGradient className="font-bold text-xl leading-6 md:text-[23px] md:leading-7 pb-3 md:pb-4">
                                        {b.title}
                                    </TextGradient>
                                    <TextNormal
                                        grayed
                                        className="text-base leading-6 md:text-xl md:leading-8"
                                    >
                                        {b.content}
                                    </TextNormal>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative w-full z-[2] bg-future-texture bg-cover bg-no-repeat px-6">
                <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 relative lg:max-w-[1024px] xl:max-w-[1440px]">
                    <div className="w-full md:max-w-[600px] m-0 md:mx-auto lg:m-0 pt-[60px] pb-10 lg:py-[150px]">
                        <h2 className="font-bold text-[32px] md:text-[56px] text-white text-left md:text-center lg:text-left leading-9 md:leading-[60px] mb-6">
                            Financial clarity starts with a Retirement
                            Checkpoint
                        </h2>
                        <TextNormal
                            grayed
                            className="text-white text-base leading-6 md:text-xl md:leading-8 mb-11"
                        >
                            Our 4 minute multiple choice quiz evaluates your
                            investment psychology and savings behavior to assess
                            your current progress toward retirement.
                        </TextNormal>
                        <FillButtonLink
                            href="/intro"
                            className="w-max py-[15px] xl:py-[25px] px-6 xl:px-10"
                        >
                            <div className="flex items-center gap-4">
                                Take the quiz<span>&#183;&#183;</span>
                            </div>
                        </FillButtonLink>
                    </div>
                    <div className="flex justify-center place-items-end">
                        <Img
                            src="assets/images/mobile.svg"
                            alt="Person"
                            className="bottom-0 right-0 w-full max-w-[294px] sm:max-w-[430px]"
                        />
                    </div>

                    <Img
                        src="assets/images/ico-ellipse.svg"
                        alt="ico-ellipse"
                        className="absolute right-[50%] top-[30%] z-[-1] hidden md:block"
                    />
                    <Img
                        src="assets/images/ico-ellipse.svg"
                        alt="ico-ellipse"
                        className="absolute right-[5%] top-[60%] z-[-1] hidden md:block"
                    />
                </div>
            </div>

            <div className="relative w-full z-[2] bg-white px-6 pt-[60px] md:pt-[120px]">
                <TextTitleLg className="sm:w-full md:w-[700px] mx-auto pb-10 md:pb-[80px]">
                    How RetireUS Works
                </TextTitleLg>

                <div className="w-full lg:max-w-[1024px] xl:max-w-[1440px] pb-[80px] md:pb-[120px] mx-auto flex flex-col lg:flex-row justify-between z-10">
                    <h3 className="w-full flex text-[#000714] font-bold text-[24px] md:text-[44px] leading-[36px] sm:leading-[52px] lg:w-[40%] lg:max-w-[360px] font-Lato mb-8 ">
                        Getting Started
                    </h3>
                    <div className="w-full lg:w-[60%] flex flex-col gap-[20px] md:gap-6">
                        {freedoms.map((item, key) => (
                            <div
                                key={key}
                                className="flex items-start flex-col sm:flex-row gap-6 sm:gap-[53px] p-6 md:p-9 border rounded-[20px] md:rounded-[40px] border-[#DDE3F0] font-Lato relative"
                            >
                                <div className="text-[#A2ACBE] text-[50px] md:text-[80px] leading-[60px] font-Lato font-light">
                                    {item.iconTxt}
                                </div>
                                <div className="flex-1">
                                    <TextGradient className="font-bold text-xl leading-6 md:text-[23px] md:leading-7 pb-4">
                                        {item.title}
                                    </TextGradient>
                                    <TextNormal
                                        grayed
                                        className="text-base leading-6 md:text-xl md:leading-8"
                                    >
                                        {item.description}
                                    </TextNormal>
                                </div>
                                {key < 2 && (
                                    <Img
                                        src="assets/images/ico-arrow-circle-down.svg"
                                        alt="Ico Arrow Down"
                                        className="absolute bottom-[-40px] right-[40px] z-[100]"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <Img
                    src="assets/images/ico-union.svg"
                    alt="Planning"
                    className="w-full max-w-[300px] absolute left-0 top-[40%] z-[-1]"
                />
                <Img
                    src="assets/images/ico-ellipse.svg"
                    alt="ico-ellipse"
                    className="absolute left-[15%] top-[60%] z-[-1] hidden md:block"
                />
            </div>

            <div className="relative w-full z-[2] bg-white px-6">
                <div className="w-full lg:max-w-[1024px] xl:max-w-[1440px] pb-[60px] md:pb-[120px] mx-auto flex flex-col-reverse lg:flex-row justify-between">
                    <div className="w-full lg:w-[60%] flex flex-col gap-[20px] md:gap-6">
                        {progress.map((item, key) => (
                            <div
                                key={key}
                                className="flex items-start flex-col sm:flex-row gap-6 sm:gap-[53px] p-6 md:p-[36px] border rounded-[20px] md:rounded-[40px] border-[#DDE3F0] font-Lato"
                            >
                                <div className="w-[100px]">
                                    <Img
                                        src={`assets/images/${item.img}`}
                                        alt="ico-track"
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex-1">
                                    <TextGradient className="font-bold text-xl leading-6 md:text-[23px] md:leading-7 pb-[16px]">
                                        {item.title}
                                    </TextGradient>
                                    <TextNormal
                                        grayed
                                        className="text-base leading-6 md:text-xl md:leading-8"
                                    >
                                        {item.description}
                                    </TextNormal>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h3 className="w-full flex text-[#000714] font-bold text-[24px] md:text-[44px] leading-[36px] sm:leading-[52px] lg:text-right lg:w-[40%] lg:max-w-[360px] font-Lato mb-10 ">
                        Ongoing Support
                    </h3>
                </div>

                <Img
                    src="assets/images/ico-ellipse.svg"
                    alt="ico-ellipse"
                    className="absolute right-[15%] top-[60%] z-[-1] hidden md:block"
                />
            </div>

            <div className="relative w-full z-[2] bg-[#F7F9FC]  px-6">
                <div className="w-full lg:max-w-[1024px] xl:max-w-[1440px] mx-auto relative py-[60px] md:pt-[120px] md:pb-[62px]" id="sliderWrap">
                    <div className="flex items-center justify-center md:justify-between pb-[80px]">
                        <TextTitleLg>Plan with confidence</TextTitleLg>
                        <OutlineButtonLink
                            href="/about-us"
                            btnText="Learn more"
                            icon={<span>&#183;&#183;</span>}
                            className="hidden md:block"
                            blue
                        />
                    </div>
                    <CustomSlider items={confidencies} />

                    <div className="md:hidden pt-10">
                        <OutlineButtonLink
                            href="/about-us"
                            btnText="Learn more"
                            icon={<span>&#183;&#183;</span>}
                            className="w-full justify-center"
                            blue
                        />
                    </div>
                </div>
                <div className="text-xs text-center font-normal pb-[65px] leading-[14px]">
                        All statistics as of Dec. 31, 2021 via form ADV with the SEC.
                </div>
            </div>

            <div className="relative w-full z-[2] bg-[#F7F9FC] px-6">
                <div className="w-full lg:max-w-[1024px] xl:max-w-[1440px] pt-[60px] pb-[40px] lg:py-[120px] mx-auto">
                    <div className="flex align-center justify-between mb-0 lg:mb-[80px]">
                        <h2 className="text-[#000714] font-bold text-left text-[32px] leading-9 md:text-[56px] md:leading-[60px] font-Lato">
                            Choose your plan
                        </h2>
                    </div>

                    <div className="shadow-Tab hidden lg:block">
                        <ul className="flex rounded-tl-[40px] rounded-tr-[40px] divide-x-2 divide-white sm:flex dark:divide-gray-700">
                            <li className="w-full">
                                <a
                                    href="javascript:void(0)"
                                    className="inline-block relative w-full text-center text-[#5A6478] rounded-tl-[40px] active bg-[#DDE3F0] py-[24px] text-[20px]"
                                    style={
                                        planTab == 0
                                            ? {
                                                  color: "white",
                                                  background:
                                                      "linear-gradient(90deg, #4D7EF2 -24.69%, #5FD4F4 123.22%)",
                                              }
                                            : {}
                                    }
                                    aria-current="page"
                                    onClick={() => setPlanTab(0)}
                                >
                                    Resilient Retirement ®
                                </a>
                            </li>
                            <li className="w-full">
                                <a
                                    href="javascript:void(0)"
                                    className="inline-block relative w-full text-center text-[#5A6478] bg-[#DDE3F0] py-[24px] text-[20px]"
                                    style={
                                        planTab == 1
                                            ? {
                                                  color: "white",
                                                  background:
                                                      "linear-gradient(90deg, #4D7EF2 -24.69%, #5FD4F4 123.22%)",
                                              }
                                            : {}
                                    }
                                    onClick={() => setPlanTab(1)}
                                >
                                    Resilient Retirement ® + Tax Mastery
                                </a>
                            </li>
                            <li className="w-full">
                                <a
                                    href="javascript:void(0)"
                                    className="inline-block relative w-full text-center text-[#5A6478] rounded-tr-[40px] bg-[#DDE3F0] py-[24px] text-[20px]"
                                    style={
                                        planTab == 2
                                            ? {
                                                  color: "white",
                                                  background:
                                                      "linear-gradient(90deg, #4D7EF2 -24.69%, #5FD4F4 123.22%)",
                                              }
                                            : {}
                                    }
                                    onClick={() => setPlanTab(2)}
                                >
                                    Wealth Mastery
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div
                        id="planTabContent"
                        className="bg-white rounded-b-[40px] p-[40px] hidden lg:block"
                        style={{
                            boxShadow: "0px 4px 32px rgba(24, 54, 98, 0.04)",
                        }}
                    >
                        <SubscribeDesktopPlanTab
                            plan_id={plans[planTab].id}
                            name={plans[planTab].name}
                            title={plans[planTab].title}
                            description={plans[planTab].description}
                            offerTitle={plans[planTab].offerTitle}
                            serviceTitle={plans[planTab].serviceTitle}
                            items={plans[planTab].items}
                            href={plans[planTab].href}
                            services={plans[planTab].services}
                            ongoingServices={plans[planTab].ongoingServices}
                        />
                    </div>
                </div>
            </div>

            <div className="relative w-full z-[2] bg-[#F7F9FC] pb-[60px] lg:hidden">
                <SubscribeMobilePlanTab
                    plan_id={plans[0].id}
                    name="Resilient Retirement ®"
                    title={plans[0].title}
                    description={plans[0].description}
                    offerTitle={plans[0].offerTitle}
                    items={plans[0].items}
                    href={plans[0].href}
                />

                <div className="border-t border-[#DDE3F0] mx-6"></div>
                <SubscribeMobilePlanTab
                    plan_id={plans[1].id}
                    name="Resilient Retirement ® + Tax Mastery"
                    title={plans[1].title}
                    description={plans[1].description}
                    offerTitle={plans[1].offerTitle}
                    items={plans[1].items}
                    href={plans[1].href}
                />
                <div className="border-t border-[#DDE3F0] mx-6"></div>
                <SubscribeMobilePlanTab
                    plan_id={plans[2].id}
                    name="Wealth Mastery"
                    title={plans[2].title}
                    description={plans[2].description}
                    offerTitle={plans[2].offerTitle}
                    items={plans[2].items}
                    href={plans[2].href}
                />

                <div className="px-6 pt-10">
                    <OutlineButtonLink
                        href="/about-us"
                        btnText="Learn more"
                        icon={<span>&#183;&#183;</span>}
                        className="w-full justify-center"
                        blue
                    />
                </div>
            </div>

            <div className="relative w-full z-[2] bg-future-texture bg-cover bg-no-repeat px-6">
                <div className="w-full lg:max-w-[1024px] xl:max-w-[1440px] mx-auto flex flex-wrap justify-between relative">
                    <div className="w-full md:w-[600px] pt-[60px] md:pt-[134px]">
                        <h2 className="font-bold text-[32px] md:text-[56px] text-white leading-[36px] md:leading-[60px] pb-[40px]">
                            Not sure which plan is right for you?
                        </h2>
                        <div className="text-[16px] md:text-[20px] text-white leading-[24px] md:leading-[32px] pb-4 md:pb-[32px] flex align-center">
                            Our Retirement Checkpoint quiz will recommend a
                            subscription by assessing these key areas:
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 pb-[64px]">
                            {answers.map((answer, key) => (
                                <div
                                    key={key}
                                    className="px-[24px] py-3 md:py-4 rounded-[16px] flex justify-between items-center"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #4D7EF2 -24.69%, #5FD4F4 123.22%)",
                                    }}
                                >
                                    <div className="text-[16px] md:text-[20px] text-white leading-6 md:leading-8">
                                        {answer}
                                    </div>
                                    <Img
                                        src="assets/images/ico-check-circle.svg"
                                        alt="Check Mark"
                                    />
                                </div>
                            ))}
                        </div>
                        <FillButtonLink
                            href="/intro"
                            className="w-max py-[15px] xl:py-[25px] px-6 xl:px-10 mx-0 mb-[14px] md:mb-[134px]"
                        >
                            <div className="flex items-center gap-4">
                                Take The Quiz<span>&#183;&#183;</span>
                            </div>
                        </FillButtonLink>
                    </div>

                    <div className="self-end">
                        <Img
                            src="assets/images/glass-girl.webp"
                            alt="Glass Girl"
                            className="bottom-0 right-0 max-w-[100%]"
                        />
                    </div>
                </div>

                <Img
                    src="assets/images/ico-ellipse.svg"
                    alt="ico-ellipse"
                    className="absolute right-[50%] top-[60%] z-[-1] hidden md:block"
                />
            </div>

            <Footer />
        </div>
    );
};

export default React.memo(Home);
