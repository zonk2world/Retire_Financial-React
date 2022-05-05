import React from "react";

export const chartData = [
    {
        title: "81% of households do not know how much they need to have saved to retire.",
        img: "chart-81.svg",
        link: "https://www.cnbc.com/2017/02/15/80-of-americans-dont-know-how-much-they-need-to-retire.html",
    },
    {
        title: "60% of retirement plan participants have fallen behind on savings.",
        img: "chart-60.svg",
        link: "https://www.tiaa.org/public/about-tiaa/news-press/press-releases/pressrelease794.html",
    },
    {
        title: "50% of retirees are projected to run out of savings",
        img: "chart-50.svg",
        link: "https://www.fool.com/retirement/2019/05/19/heres-how-many-us-households-will-run-out-of-money.aspx",
    },
];

export const freedoms = [
    {
        title: "Start for free with a Retirement Checkpoint",
        description:
            "Our 4-minute quiz will assess your current retirement progress.",
        iconTxt: "01",
    },
    {
        title: "Meet your Wealth Concierge team",
        description:
            "Our Wealth Concierge team supports you on your journey toward financial freedom by acting as a liaison between you, your plan, and your advisor.",
        iconTxt: "02",
    },
    {
        title: "Hop on a video call with your advisor",
        description:
            "Let’s chat and review your retirement pacing, progress, and investment action plan.",
        iconTxt: "03",
    },
];

export const progress = [
    {
        title: "Track your progress",
        description:
            "Your personal dashboard tracks retirement progress, lists planning priorities, and gives you direct access to the Wealth Concierge team.",
        img: "ico-chart.svg",
    },
    {
        title: "Offload your financial management",
        description:
            "As changes happen in your life, just forward the info to your Wealth Concierge and they will keep your plan up to date.",
        img: "ico-progress.svg",
    },
    {
        title: "On-demand financial guidance",
        description:
            "Any time that you require advice on investments or other financial topics you can hop on a call with your advisor.",
        img: "ico-investment.svg",
    },
];

export const answers = [
    "Retirement Pacing",
    "Tax Planning",
    "Risk of Failure",
    "Overall Planning",
];

export const plans = [
    {
        id: 2,
        name: "Resilient Retirement®",
        title: "$10/week (billed quarterly)",
        description:
            "Define your retirement vision, plan for market volatility, and give purpose to your investments.",
        href: "/signup",
        items: [
            "1:1 video conferences with a personal financial advisor for professional analysis and planning.",
            "Evaluation of current financial situation, investment risks, and areas of opportunity.",
            "CFP® designed strategy to understand your specific retirement needs and how to best leverage your savings.",
            "Open architecture investment review of variable growth, protected growth, & passive income strategies.",
            "A step-by-step plan on where to save and how to implement your investment strategy.",
            "Ongoing strategy review with investment planning specialist to track how your plan is operating.",
            "Dedicated Wealth Concierge team for meeting support, account service, and planning updates.",
            "RetireUS Dashboard for plan tracking and easy communication with your Wealth Concierge support team.",
        ],
        services: [
            {
                title: "1:1 planning sessions w/ Chartered Retirement Planning Counselor®",
                items: [],
            },
            {
                title: "Analysis Review Meeting",
                items: [
                    "Goal Review",
                    "Foundation Review",
                    "Planning Checkpoint",
                    "Goal Forecast",
                    "Portfolio DeepScan",
                    "CashFlow Review",
                ],
            },
            {
                title: "Planning Review Meeting",
                items: [
                    "Resilient Retirement Roadmap",
                    "Employer Benefit Optimization",
                    "Protected Growth Review",
                    "Retirement Income Map",
                    "Investment Strategy Recommendations",
                    "CashFlow Review",
                ],
            },
            { title: "Strategy Implementation & Support", items: [] },
        ],
        ongoingServices: [
            {
                title: "Personal Wealth Assistant",
                items: [
                    "Onboarding Support",
                    "Scheduling and Plan Coordination",
                    "Monthly Check-ins",
                    "Investment reports",
                    "Accountant Maintenance",
                ],
            },
            {
                title: "Investment Review",
                items: [
                    "Economic updates",
                    "Account performance review",
                    "Strategy Adjustments",
                ],
            },
            { title: "Planning Support", items: ["Advisor Q&A as needed"] },
        ],
    },
    {
        id: 3,
        name: "Resilient Retirement® + Tax Mastery",
        title: "$15/week (billed quarterly)",
        description:
            "Maximize your retirement efficiency and minimize the tax consequences of your retirement savings.",
        offerTitle:
            "All offerings included in Resilient Retirement® plan PLUS",
        href: "/signup",
        items: [
            "Additional evaluation & analysis around current savings strategy and long term tax implications.",
            "A personalized cash flow plan to create more tax advantaged savings.",
            "An RMD Roadmap® to minimize your retirement tax burden by strategically diversifying how your savings are taxed.",
            "Tax planning review meetings with your advisor.",
        ],
        serviceTitle: "All services included in Resilient Retirement® PLUS",
        services: [
            { title: "Retirement Tax Forecast", items: [] },
            { title: "Tax Liability Audit", items: [] },
            {
                title: "Planning Review Meeting",
                items: ["Cash Flow Hierarchy", "RMD Roadmap"],
            },
            {
                title: "On Call Planning Support",
                items: ["Advisor calls as needed"],
            },
        ],
    },
    {
        id: 4,
        name: "CFP Wealth Mastery",
        title: "$20/week (billed quarterly)",
        description:
            "Amplify your wealth and estate through 1:1 advanced planning sessions with a personal Certified Financial Planner",
        offerTitle:
            "All offerings included in Resilient Retirement® + Tax Mastery PLUS",
        href: "/signup",
        items: [
            "Meet directly with your CFP® for Resilient Retirement®  & Tax Mastery services.",
            <>HCE Playbook&trade; to strategize deferred compensation, company stock incentives, & executive bonuses.</>,
            "Estate planning for asset protection and creating a multi-generational wealth transfer strategy.",
            "Quarterly CFP® review meetings.",
        ],
        serviceTitle:
            "All offerings included in Resilient Retirement® + Tax Mastery PLUS",
        services: [{ title: "Estate Plan Audit", items: [] }],
    },
];

export const benefits = [
    {
        title: "No consultation needed",
        content:
            "Start planning today in as little as 4 minutes by completing a Retirement Checkpoint Quiz.",
    },
    {
        title: "Technology will keep you on track",
        content:
            "The RetireUS Dashboard tracks your planning progress and keeps you connected with your advisor.",
    },
    {
        title: "We will show you how it's done",
        content:
            "Your advisor will explain how much to save, where to save, and how to appropriately invest.",
    },
    {
        title: "We do the heavy lifting each month",
        content:
            "As your financial situation evolves, our Wealth Concierge team will keep your plan up to date.",
    },
];

export const mobileBenefits = [
    {
        title: "No consultation needed",
        content:
            "Start planning today in as little as 4 minutes by completing a Retirement Checkpoint Quiz.",
    },
    {
        title: "We will show you how it's done",
        content:
            "Your advisor will explain how much to save, where to save, and how to appropriately invest.",
    },
    {
        title: "Technology will keep you on track",
        content:
            "The RetireUS Dashboard tracks your planning progress and keeps you connected with your advisor.",
    },
    {
        title: "We do the heavy lifting each month",
        content:
            "As your financial situation evolves, our Wealth Concierge team will keep your plan up to date.",
    },
];

export const confidencies = [
    {
        title: '1000+ Plans',
        description: 'Created in 2021',
        order: 3,
    },
    {
        title: '$1Billion+',
        description: 'In assets under management',
        order: 1,
    },
    {
        header: 'More than',
        title: '10+ Years',
        description: 'Providing expert financial advice.',
        link: 'https://example.com/example',
        order: 2,
    },
    {
        title: '1000+ Plans',
        description: 'Created in 2021',
        order: 3,
    },
    {
        title: '$1Billion+',
        description: 'In assets under management',
        order: 1,
    },
];
