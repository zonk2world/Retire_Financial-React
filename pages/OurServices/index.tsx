import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { SectionContainer } from "../../components/common/Wrappers";
import {
    TextSubitle,
    TextTitleLg,
    TextNormal,
    TextGradient,
} from "../../components/Typographies";

import {
    FillButtonLink,
    FillButton,
} from "../../components/Buttons/WhiteButtons";
import CircularAnimProgress from "../../components/Slider/CircularAnimProgress";
import { goals, toolkits, carouselItems } from "./contents";
import { cx } from "../../util/helpers";
import { Helmet } from "react-helmet";

const OurServices: React.FC = (props) => {
    const [activeCarousel, setActiveCarousel] = useState<number>(0);

    useEffect(() => {
        const carouselInterval = setInterval(() => {
            handleCarouselNext();
        }, 9000);

        return () => clearInterval(carouselInterval);
    }, []);

    const handleCarouselNext = () => {
        setActiveCarousel((activeCarousel) =>
            activeCarousel < carouselItems.length - 1 ? activeCarousel + 1 : 0
        );
    };

    return (
        <div className="w-full h-screen">
            <div className="relative w-full bg-hero-texture-mobile md:bg-hero-texture bg-cover bg-bottom bg-no-repeat">
                <Header
                    opacity={true}
                    {...props}
                    bgOnScroll="bg-white"
                    blueOnScroll={true}
                />
                <Helmet
                    title={"Plan your Retirement from Anywhere in the World - Retire US"}
                    htmlAttributes={{ lang: "en" }}
                    meta={[
                        {
                            name: `description`,
                            content: "Find a plan that works for you, built by a Certified Financial Planner. Meet with a trusted advisor virtually, from wherever you are in the world.",
                        },
                        {
                            name: `keywords`,
                            content: "Financial Planning, Retirement Planning, Wealth Management, Financial Consultant, Virtual Financial Planning",
                        },
                ]}
            />
                <div className="w-full relative grid grid-cols-1 lg:grid-cols-2 max-w-[1440px] mx-auto text-white px-6">
                    <div className="pt-[100px] flex items-center">
                        <div className="max-w-[620px]">
                            <h1 className="w-full text-[46px] md:text-[56px] lg:text-[70px] leading-[48px] md:leading-[60px] lg:leading-[74px] text-white font-bold mb-5 md:mb-6">
                                Financial planning, simplified
                            </h1>
                            <div className="w-full text-lg lg:text-xl leading-[26px] lg:leading-8">
                                RetireUS is a full-service virtual financial
                                planning platform that provides simplified and
                                strategic advice from anywhere in the world.
                            </div>
                        </div>
                    </div>
                    <div className="flex pt-[47px] md:pt-[126px] justify-center items-end">
                        <img
                            src="assets/images/glass-girl-5.png"
                            alt="glass-girl-5"
                            className="max-w-[418px] w-full"
                        />
                    </div>

                    <img
                        src="assets/images/ico-ellipse.svg"
                        alt="ico-ellipse"
                        className="absolute left-[55%] top-[70%] hidden md:block"
                    />
                </div>
            </div>

            <SectionContainer
                bg="bg-[#EEF1F8]"
                className="grid lg:grid-cols-2 pb-0 md:pb-0"
            >
                <div className="pb-[60px] md:pb-0">
                    <TextTitleLg className="mb-5 md:mb-8" align="left">
                        No consultation needed
                    </TextTitleLg>
                    <TextNormal
                        className="text-sm md:text-lg lg:text-xl leading-6 md:leading-8 mb-5 md:mb-6"
                        grayed
                    >
                        We use technology to skip the need for uncomfortable
                        consultations and lengthy discovery meetings.
                    </TextNormal>
                    <TextNormal
                        className="text-sm md:text-lg lg:text-xl leading-6 md:leading-8 mb-5 md:mb-11"
                        grayed
                    >
                        Our Retirement Checkpoint allows you to start the
                        planning process today and receive immediate feedback on
                        your progress towards retirement and any areas that need
                        to be evaluated.
                    </TextNormal>

                    <FillButtonLink
                        href="/intro"
                        className="w-max py-[15px] xl:py-[25px] px-6 xl:px-10"
                        blue
                    >
                        <div className="flex items-center gap-4">
                            Get started<span>&#183;&#183;</span>
                        </div>
                    </FillButtonLink>
                </div>
                <div className="flex items-end justify-center">
                    <img
                        src="assets/images/mobile.svg"
                        alt="Mobile"
                        className="w-full max-w-[400px]"
                    />
                </div>
            </SectionContainer>

            <SectionContainer
                className="relative flex flex-col-reverse lg:flex-row justify-between"
                outElement={
                    <>
                        <img
                            src="assets/images/ico-union-2.svg"
                            alt="ico-union-2"
                            className="max-w-[100%] absolute right-0 top-[330px] z-[-1] hidden md:block"
                        />
                        <img
                            src="assets/images/ico-ellipse.svg"
                            alt="ico-ellipse"
                            className="absolute right-[25%] top-[60%] hidden md:block"
                        />
                    </>
                }
            >
                <div className="lg:w-[60%]">
                    {goals.map((g, i) => (
                        <div
                            key={`goals_${i}`}
                            className="rounded-[20px] md:rounded-[40px] border border-[#DDE3F0] p-6 md:px-10 md:py-9 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mb-6"
                        >
                            <img src={`assets/images/${g.icon}.svg`} alt={g.icon} />
                            <TextNormal className="text-base md:text-xl">{g.description}</TextNormal>
                        </div>
                    ))}
                </div>
                <div className="lg:w-[30%]">
                    <TextTitleLg className="text-center lg:text-right pb-6">
                        Subscriptions built for your goals
                    </TextTitleLg>
                </div>
            </SectionContainer>

            <div className="relative w-full bg-[#F7F9FC]">
                <div className="w-full lg:max-w-[1024px] xl:max-w-[1440px] mx-auto relative py-[60px] md:py-[120px] flex flex-wrap z-10 px-6">
                    <div className="lg:w-1/2">
                        <TextTitleLg align="left" className="mb-6">
                            Clearly defined services for every subscription
                        </TextTitleLg>
                        <TextNormal className="text-base md:text-xl leading-6 md:leading-8 mb-10">
                            All subscription levels follow a straightforward
                            four step approach to create the financial plan that
                            is right for you.
                        </TextNormal>

                        <div className="lg:w-1/2 relative lg:hidden flex items-center justify-between pb-10 gap-6">
                            {carouselItems.map((c, i) => (
                                <div
                                    key={`services_md_${i}`}
                                    className="flex items-center"
                                >
                                    <div
                                        className={cx(
                                            "flex items-center justify-center rounded-full w-[64px] h-[64px] bg-white transition duration-300 relative",
                                            activeCarousel === c.step ? "scale-125" : ""
                                        )}
                                        style={{
                                            boxShadow: "0px 8px 32px rgba(6, 29, 65, 0.08)",
                                        }}
                                    >
                                        <img
                                            src={`assets/images/${c.icon}${
                                                activeCarousel === c.step
                                                    ? "-active"
                                                    : ""
                                            }.svg`}
                                            className="w-5"
                                        />
                                        {
                                            activeCarousel === c.step &&
                                            <CircularAnimProgress id="circleAnimMobile" className="w-full absolute" btnEnable={activeCarousel === c.step} />
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="md:p-10">
                            <TextGradient className="text-2xl md:text-[28px] font-bold mb-3 md:mb-6 transition duration-300">
                                Step {carouselItems[activeCarousel].step + 1}:{" "}
                                {carouselItems[activeCarousel].title}
                            </TextGradient>
                            <TextNormal className="text-lg md:text-xl font-bold mb-3 md:mb-6 transition duration-300">
                                {carouselItems[activeCarousel].description}
                            </TextNormal>

                            <div className="flex items-start gap-3 md:gap-8 pb-3 md:pb-10">
                                <img
                                    src="assets/images/ico-double-dot-blue.svg"
                                    className="mt-3"
                                    alt="ico-double-dot-blue"
                                />
                                <div className="pb-5">
                                    <TextNormal
                                        grayed
                                        className="text-base md:text-lg leading-6 md:leading-8"
                                    >
                                        { carouselItems[activeCarousel].instruction }
                                    </TextNormal>
                                </div>
                            </div>

                            <FillButton
                                onClick={() => handleCarouselNext()}
                                className="w-max py-[15px] xl:py-[25px] px-10"
                                blue
                            >
                                <div className="flex items-center gap-4">
                                    Next{" "}
                                    <img
                                        src="assets/images/arrow-right.svg"
                                        alt="ico-arrow-next"
                                    />
                                </div>
                            </FillButton>
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative hidden lg:block">
                        {carouselItems.map((c, i) => (
                            <div
                                key={`services_${i}`}
                                className="flex items-center absolute"
                                style={{
                                    top: 180 * i,
                                    right: i === 1 || i === 2 ? 150 : 0,
                                }}
                            >
                                <div
                                    className={cx(
                                        "flex items-center justify-center rounded-full w-[140px] h-[140px] bg-white mr-5 transition duration-300 relative",
                                        activeCarousel === c.step
                                            ? "scale-110"
                                            : ""
                                    )}
                                    style={{
                                        boxShadow:
                                            "0px 8px 32px rgba(6, 29, 65, 0.08)",
                                    }}
                                >
                                    <img
                                        src={`assets/images/${c.icon}${
                                            activeCarousel === c.step
                                                ? "-active"
                                                : ""
                                        }.svg`}
                                        className="w-9"
                                    />
                                    {
                                        activeCarousel === c.step &&
                                        <CircularAnimProgress id="circleAnimDesktop" className="w-full absolute" btnEnable={activeCarousel === c.step} />
                                    }
                                </div>
                                {activeCarousel === c.step ? (
                                    <TextGradient className="text-lg font-bold w-[160px]">
                                        {c.title}
                                    </TextGradient>
                                ) : (
                                    <div className="text-base md:text-lg leading-6 md:leading-8 text-[#001F55] w-[160px]">
                                        {c.title}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <img
                    src="assets/images/ico-union.svg"
                    alt="Planning"
                    className="max-w-[100%] absolute left-0 top-[330px] z-0"
                />
            </div>

            <SectionContainer>
                <div className="w-full max-w-[700px] mx-auto pb-10 md:pb-[70px]">
                    <TextTitleLg className="mb-6">
                        Let us take your planning to the next level
                    </TextTitleLg>
                    <TextNormal
                        className="text-center text-base md:text-xl leading-6 md:leading-8 mb-10"
                        grayed
                    >
                        Each subscription gives you access to proprietary tools
                        that give you a deeper understanding of what you need
                        from your money.
                    </TextNormal>
                       <h3 className="text-transparent bg-clip-text bg-gradient-to-br from-[#4D7EF2] to-[#5FD4F4] font-Lato text-center text-xl md:text-[28px] font-bold leading-6 md:leading-8"> 
                       RetireUS Advanced Planning Toolkit: 
                       </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-8 md:gap-[70px]">
                    {toolkits.map((t, i) => (
                        <div
                            key={`toolkits_${i}`}
                            className="flex flex-col items-center"
                        >
                            <img
                                src={`assets/images/${t.icon}.svg`}
                                className="mb-6 md:mb-8"
                            />
                            <TextSubitle
                                className="text-center mb-2 md:mb-4"
                                dangerouslySetInnerHTML={{ __html: t.title }}
                            />
                            <TextNormal
                                className="text-center text-base md:text-lg leading-6 md:leading-8"
                                grayed
                                dangerouslySetInnerHTML={{
                                    __html: t.description,
                                }}
                            />
                            {t.href && (
                                <Link
                                    to={t.href.link}
                                    className="text-base md:text-lg mt-4 text-[#001F55] flex items-center justify-center font-bold"
                                >
                                    {t.href.text}&nbsp;&nbsp;
                                    <img
                                        src="assets/images/ico-external-link.svg"
                                        alt="ico-external-link"
                                    />
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-[80px]">
                    <FillButtonLink
                        href="/pricing"
                        className="w-max py-[15px] xl:py-[25px] px-6 xl:px-10 mx-auto"
                        blue
                    >
                        <div className="flex items-center gap-4">
                            View plans<span>&#183;&#183;</span>
                        </div>
                    </FillButtonLink>
                </div>
            </SectionContainer>

            <Footer />
        </div>
    );
};

export default OurServices;
