import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tooltip } from "antd";
import Header from "../Header";
import Footer from "../Footer";

import SubscribePlanBlockMobile from "../../components/Blocks/SubscribePlanBlockMobile";
import Accordion from "../../components/Accordion";

import {
    TextSubitle,
    TextTitleLg,
    TextTitle,
    TextNormal,
    TextGradient,
} from "../../components/Typographies";

import {
    OutlineButtonLink,
    FillButtonLink,
} from "../../components/Buttons/WhiteButtons";

import { selectPlan } from "../../store/auth/action";
import { getPlans, storePlanToLocal } from "../../store/plan/action";
import { ApplicationState } from "../../store";
import { Plan } from "../../store/plan/types";
import CarouselBanner from "./carousel";
import { subscriptions1, subscriptions2, faqs, planFeatures, planSummaries } from "./contents";
import { Helmet } from "react-helmet";

const Pricing: React.FC = (props: any) => {
    const dispatch = useDispatch();
    const plans = useSelector((state: ApplicationState) => state.plans.plans);
    const user = useSelector((state: ApplicationState) => state.auth.user);
    const token = useSelector((state: ApplicationState) => state.auth.token);
    const [loading, setLoading] = useState<boolean>(false);

    const choosePlan = (plan: Plan) => {
        setLoading(true);
        if (token && user) {
            dispatch(selectPlan(plan?.id));
        } else {
            dispatch(storePlanToLocal(plan));
            props.history.push("/signup");
        }
        setLoading(false);
    };

    useEffect(() => {
        dispatch(getPlans());
    }, []);

    return (
        <div className="w-full">
            <Helmet
                title={
                    "Invest in Your Financial Future for as Little as $10/week"
                }
                htmlAttributes={{ lang: "en" }}
                meta={[
                    {
                        name: `description`,
                        content:
                            "RetireUS makes expert financial advisors accessible to everyone. Choose a retirement plan that fits your goals with our subscription-based model.",
                    },
                    {
                        name: `keywords`,
                        content:
                            "Retirement plan, financial advisor, Financial Planning Tool, Retirement Planning, Financial Consulting, Certified Financial Planner, CFP",
                    },
                ]}
            />
            <Header
                opacity={true}
                {...props}
                bgOnScroll="bg-white"
                blueOnScroll={true}
            />
            <div className="relative w-full bg-about-us-texture bg-cover bg-center bg-no-repeat">
                <div className="w-full lg:max-w-[1024px] xl:max-w-[1440px] px-6 mx-auto relative">
                    <div className="w-full pt-[100px] md:pt-[200px] pb-[60px] md:pb-[120px] mx-auto text-center">
                        <h1 className="font-bold text-[46px] leading-[48px] md:text-[70px] text-white md:leading-[74px] pb-[24px]">
                            Invest in your future
                        </h1>
                        <div className="text-base leading-6 md:text-xl text-white md:leading-8">
                            Learn how to live life on your own terms for as little as $10/week
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full z-[2] bg-white">
                <div className="md:w-full lg:max-w-[1024px] xl:max-w-[1440px] px-6 mx-auto flex flex-col-reverse lg:flex-row justify-between relative py-[60px] md:py-[120px]">
                    <div className="self-center lg:self-end">
                        <img
                            src="assets/images/yoga-people.png"
                            alt="Yoga People"
                            className="bottom-0 left-0 max-w-[100%] md:w-full border-b-[3px] border-[#5EC4F7]"
                        />
                    </div>
                    <div className="w-full md:w-[600px]">
                        <CarouselBanner />
                    </div>
                </div>
            </div>

            <div className="relative w-full z-[2] bg-[#F7F9FC] md:px-6">
                <div className="w-full lg:max-w-[1024px] xl:max-w-[1440px] mx-auto relative py-[60px] md:py-[120px]">
                    <TextTitleLg className="w-full mx-auto px-6 pb-8 md:pb-[80px]">
                        Choose a plan that fits your goals
                    </TextTitleLg>

                    <div className="overflow-x-auto hidden md:block">
                        <div className="w-full rounded-[20px] border border-[#DDE3F0]">
                            <table className="table-border table-features bg-[#EEF1F8] rounded-[20px] overflow-hidden">
                                <colgroup>
                                    <col width="25%" />
                                    <col width="25%" />
                                    <col width="25%" />
                                    <col width="25%" />
                                </colgroup>
                                <thead className="text-center">
                                    <tr>
                                        <th></th>
                                        {planSummaries.map((p, i) => (
                                            <th key={`name_${i}`}>
                                                <TextSubitle
                                                    dangerouslySetInnerHTML={{
                                                        __html: p.name,
                                                    }}
                                                ></TextSubitle>
                                            </th>
                                        ))}
                                    </tr>
                                    <tr className="bg-[#F7F9FC]">
                                        <th rowSpan={2}></th>
                                        {planSummaries.map((p, i) => (
                                            <th key={`title_${i}`}>
                                                <TextGradient className="text-[16px] md:text-[20px]">
                                                    {p.title}
                                                </TextGradient>
                                            </th>
                                        ))}
                                    </tr>
                                    <tr className="bg-[#F7F9FC]">
                                        {planSummaries.map((p, i) => (
                                            <th
                                                key={`description_${i}`}
                                                className="font-normal"
                                            >
                                                <TextNormal
                                                    dangerouslySetInnerHTML={{
                                                        __html: p.description,
                                                    }}
                                                />
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(planFeatures).map((pfk) => (
                                        <tr key={pfk} className="bg-[#F7F9FC]">
                                            <td className="align-top">
                                                <div className="flex items-center gap-2 whitespace-nowrap">
                                                    <TextNormal
                                                        className="text-[14px] md:text-[16px] font-bold"
                                                        dangerouslySetInnerHTML={{
                                                            __html: planFeatures[
                                                                pfk
                                                            ].title,
                                                        }}
                                                    />
                                                    {planFeatures[pfk]
                                                        .description && (
                                                        <Tooltip
                                                            placement="top"
                                                            title={
                                                                <span className="text-[14px] text-[#434A59] leading-4">
                                                                    {
                                                                        planFeatures[
                                                                            pfk
                                                                        ]
                                                                            .description
                                                                    }
                                                                </span>
                                                            }
                                                            color="#FFFFFF"
                                                            overlayClassName="feature-tooltip"
                                                        >
                                                            <img
                                                                src="assets/images/ico-info-gray.svg"
                                                                alt="ico-info-gray"
                                                                className="w-5 h-5 cursor-pointer"
                                                            />
                                                        </Tooltip>
                                                    )}
                                                </div>
                                            </td>
                                            {planSummaries.map((p, i) => (
                                                <td
                                                    key={`${pfk}_${i}`}
                                                    className="text-center align-top"
                                                >
                                                    {p.features[pfk] ===
                                                    true ? (
                                                        <img
                                                            src="assets/images/ico-success-circle.svg"
                                                            alt="ico-success-circle"
                                                            className="mx-auto"
                                                        />
                                                    ) : p.features[pfk] ===
                                                      false ? (
                                                        <img
                                                            src="assets/images/ico-danger-circle.svg"
                                                            alt="ico-danger-circle"
                                                            className="mx-auto"
                                                        />
                                                    ) : (
                                                        <TextNormal
                                                            dangerouslySetInnerHTML={{
                                                                __html: p
                                                                    .features[
                                                                    pfk
                                                                ],
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        {planSummaries.map((p, i) => (
                                            <td key={`choose_${i}`}>
                                                <OutlineButtonLink
                                                    href={p.href}
                                                    params={{
                                                        auth_type: true,
                                                        plan_id: p.id,
                                                    }}
                                                    btnText="Choose Plan"
                                                    icon={
                                                        <span>
                                                            &#183;&#183;
                                                        </span>
                                                    }
                                                    className="w-max justify-center mx-auto"
                                                    blue
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="w-full pt-10 md:hidden">
                        <SubscribePlanBlockMobile defaultOpen={true} />
                    </div>

                    <div className="w-full bg-white px-6 py-10 md:px-[80px] md:py-[60px] rounded-[20px] md:rounded-[40px] shadow-[0px_4px_32px_rgba(24,54,98,0.04)] mt-8 md:mt-[80px]">
                        <TextSubitle className="pb-[20px] md:pb-[40px]">
                            All RetireUS subscriptions include:
                        </TextSubitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                            <div className='flex flex-col items-start gap-4'>
                                {subscriptions1.map((s, i) => (
                                    <div key={i} className="flex-1 flex flex-row items-start gap-4">
                                        <div className="w-2 h-2 bg-[#FAA942] rounded-full mt-2"></div>
                                        <div
                                            className="text-base text-[#434A59] leading-6 flex-1"
                                            dangerouslySetInnerHTML={{ __html: s }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col items-start gap-4'>
                                {subscriptions2.map((s, i) => (
                                    <div key={i} className="flex-1 flex flex-row items-start gap-4">
                                        <div className="w-2 h-2 bg-[#FAA942] rounded-full mt-2"></div>
                                        <div
                                            className="text-base text-[#434A59] leading-6 flex-1"
                                            dangerouslySetInnerHTML={{ __html: s }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="relative w-full z-[2] bg-white md:px-6">
                <div className="w-full lg:max-w-[1024px] xl:max-w-[1440px] mx-auto relative py-[60px] md:py-[120px]">
                    <TextTitleLg className="sm:w-full mx-auto pb-10 md:pb-[80px]">
                        Still have questions?
                    </TextTitleLg>

                    <Accordion contents={faqs} />

                    <TextTitle className="w-full text-center pt-[40px] pb-[20px] md:pt-[80px] md:pb-[40px]">
                        Don't see your question listed?
                    </TextTitle>
                    <FillButtonLink
                        href="/intro"
                        className="w-max py-[15px] xl:py-[25px] px-6 xl:px-10 mx-auto"
                        blue
                    >
                        <div className="flex items-center gap-4">
                            Chat with us now<span>&#183;&#183;</span>
                        </div>
                    </FillButtonLink>
                </div>
            </div>

            <div className="relative w-full z-[2] bg-white px-6 pb-[60px] md:pb-[120px]">
                <div className="px-6 py-10 md:p-[80px] bg-small-texture bg-cover bg-no-repeat md:w-full lg:max-w-[1024px] xl:max-w-[1440px] mx-auto flex flex-wrap items-start justify-between relative rounded-[20px] md:rounded-[30px] lg:rounded-[40px]">
                    <div className="w-auto">
                        <h3 className="font-bold text-2xl md:text-4xl text-white mb-6">
                            Not sure which plan is right for you?
                        </h3>
                        <div className="text-base md:text-lg text-white">
                            Find out by taking our Retirement Checkpoint quiz.
                        </div>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <FillButtonLink
                            href="/intro"
                            className="w-full md:w-max ml-auto py-4 xl:py-6 px-6 xl:px-10"
                            blue
                        >
                            <div className="flex items-center gap-4">
                                Take The Quiz<span>&#183;&#183;</span>
                            </div>
                        </FillButtonLink>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Pricing;
