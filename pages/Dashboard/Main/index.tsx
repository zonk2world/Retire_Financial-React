import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars";
import Header from "../Header";
import TimeLine from "../../../components/Questionnare/TimeLine";
import { SharedFillButton } from "../../../components/Buttons/SharedFillButton";
import { getQuestionnare } from "../../../store/questions/action";
import { getUser, gotoProfileStep, updateTodolist } from "../../../store/auth/action";
import { Todo } from "../../../store/auth/types";
import { ApplicationState } from "../../../store";
import useRetirementPacing from "../../../hooks/useRetirementPacing";
import useTaxPlanning from "../../../hooks/useTaxPlanning";
import useRiskOfFailure from "../../../hooks/useRiskOfFailure";
import useGoal from "../../../hooks/useGoal";
import { useQuestionnaire } from "../../../util/func";
import { questionOrder } from "../../../constants/variables";
import { Link } from "react-router-dom";

const Main = (props) => {
    const dispatch = useDispatch();

    const user = useSelector((state: ApplicationState) => state.auth.user);
    const answers = useSelector(
        (state: ApplicationState) => state.questions.answers
    );

    const [retirementYear, setRetirementYear] = useState<number>(0);
    const [retirementTimeline, setRetirementTimeline] = useState<number>(0);
    const [goalHover, setGoalHover] =  useState<boolean>(true); 
    const [scheduleHover, setScheduleHover] =  useState<boolean>(true); 
    const retirementAge = answers?.wantToRetireAge || 0;

    const {
        checkRetRF1,
        checkRetRF3,
        checkRetRF4,
        checkRetRF5,
        checkTaxRF1,
        checkCfpRF3,
    } = useQuestionnaire({ answers });
    let goal;
    let pacing;

    let taxPlanning;
    let risk;``

    useEffect(() => {
        dispatch(getQuestionnare());
        dispatch(getUser());
    }, []);

    useEffect(() => {
        if (answers) {
            generateValues();
        }
    }, [answers]);

    if (user?.profile_complete_step) {
        goal = useGoal({ answers });

        pacing = useRetirementPacing({
            answers,
            numberOfPeriods: retirementTimeline,
        });
        taxPlanning = useTaxPlanning({
            answers,
            retirementYear,
            retirementAge,
        });
        risk = useRiskOfFailure({
            answers,
            numberOfPeriods: retirementTimeline,
            retRF1: checkRetRF1(),
            retRF3: checkRetRF3(),
            retRF4: checkRetRF4(),
            retRF5: checkRetRF5(),
            taxRF1: checkTaxRF1(),
            cfpRF3: checkCfpRF3(),
        });
    }

    const generateValues = () => {
        let currentAge = getCurrentAge(answers?.birthYear);
        if (currentAge) {
            let currentYear = moment().year();
            setRetirementYear(currentYear - currentAge + retirementAge);
            setRetirementTimeline(retirementAge - currentAge);
        } else console.log("Error occured while calculating current age.");
    };

    const getCurrentAge = (birthYear) => {
        if (birthYear) {
            let currentDate = moment();
            let birthDate = moment(birthYear, "MM/DD/YYYY");
            if (
                currentDate.month() > birthDate.month() ||
                (currentDate.month() == birthDate.month() &&
                    currentDate.date() > birthDate.date())
            ) {
                return currentDate.year() - birthDate.year();
            } else {
                return currentDate.year() - birthDate.year() - 1;
            }
        } else {
            return 0;
        }
    };

    const handleClick = (todo: Todo) => {        
        if(todo.id==1){
            props.history.push(todo.link)
        }else{
            if( todo.completed === "E" ||
                (todo.id === 2 && user?.todos[0].completed=="Y") ||
                (todo.id === 3 && user?.todos[1].completed=="Y") ||
                todo.id === 4 ||
                (todo.id === 5 && user?.todos[2].completed=="Y") ||
                (todo.id === 6 && user?.todos[1].completed=="Y") )
            {
                todo.type === "link" 
                    ? props.history.push(todo.link)
                    : todo.type === "window" ? window.open(todo.link) : null;
                if (todo.link !== "/dashboard" && todo.type === "window")
                    dispatch(updateTodolist(todo.id));
            }            
        }
        
           


    };

    const handleCompletePlanningReview = () => {
        // dispatch(gotoProfileStep());
        props.history.push('/start-planning');
    };

    // if(answers)
    return (
        <div className="w-full relative pt-[60px] md:pt-[142px] pb-10 px-0 md:px-[60px] ">
            <Header />
            <div className="px-6 md:px-0 mt-3 md:mt-0">
                <div className="grid lg:grid-flow-col grid-cols-1 lg:grid-cols-3 gap-[20px]">
                    <div className="lg:col-span-2 bg-gradient-to-r from-[#3F68E4] to-[#5EC4F7] rounded-[20px] px-5 py-4 md:px-10 md:py-8 grid grid-cols-4 lg:grid-cols-3 gap-8">
                        <div className="col-span-2">
                            <div className="flex items-center gap-4">
                                <span className="text-[70px] leading-[74px] text-white font-bold">
                                    {retirementTimeline}
                                </span>
                                <span className="text-xl leading-8 text-white">
                                    years to retirement
                                </span>
                            </div>
                            <div className="grid lg:grid-cols-2 gap-3 mt-8">
                                <div className="w-full border border-white rounded-xl p-[16px] flex flex-col items-start md:items-center">
                                    <span className="text-[20px] md:text-[28px] text-white font-bold mb-[4px] leading-none md:leading-[32px]">
                                        {retirementAge}
                                    </span>
                                    <span className="text-[14px] text-white leading-none">
                                        Retirement age
                                    </span>
                                </div>
                                <div className="w-full border border-white rounded-xl p-[16px] flex flex-col items-start md:items-center">
                                    <span className="text-[20px] md:text-[28px] text-white font-bold mb-[4px] leading-none md:leading-[32px]">
                                        {retirementYear}
                                    </span>
                                    <span className="text-[14px] text-white leading-none">
                                        Retirement year
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 lg:col-span-1 relative flex justify-center items-end lg:items-center">
                            <div className="w-3 h-3 bg-[#FAA942] rounded-full absolute top-2 left-2"></div>
                            {false ? (
                                <div className="relative rounded-full dashboard-circle">
                                    <svg
                                        version="1.1"
                                        viewBox="0 0 500 500"
                                        preserveAspectRatio="xMinYMin meet"
                                    >
                                        <circle
                                            cx={250}
                                            cy={250}
                                            r={230}
                                        ></circle>
                                        <circle
                                            cx={250}
                                            cy={250}
                                            r={230}
                                            strokeDashoffset={
                                                (1444 -
                                                    (1444 * goal.progress) /
                                                        100) *
                                                -1
                                            }
                                        ></circle>
                                        <text x={"50%"} y={"50%"}>
                                            ${goal.savingPrice}
                                        </text>
                                        <text x={"50%"} y={"65%"}>
                                            Goal: ${goal.goalPrice}
                                        </text>
                                    </svg>
                                </div>
                            ) : (
                                <div className="relative" onMouseOver={()=>setGoalHover(false)} onMouseOut={()=>setGoalHover(true)}>
                                    <div className={`w-[150px] h-[150px] sm:w-[210px] sm:h-[210px] flex justify-center items-center border-[3px] border-[#ffffff4d] rounded-full relative`}>
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="text-white text-4xl font-bold">
                                                $
                                            </div>
                                            <div className="text-[#ffffffcc] text-lg font-bold">
                                                Goal: $
                                            </div>
                                        </div>
                                        <img
                                            src="assets/images/lock-white.svg"
                                            alt="lock"
                                            className="absolute top-[-5px] right-[-5px]"
                                        />
                                    </div>
                                    <div className={`${goalHover? "hidden": "flex"} cursor-pointer absolute top-0 left-0 w-full h-full flex-col gap-4 justify-center items-center bg-[#0950B6] bg-opacity-20 backdrop-blur-xl rounded-[12px] z-10 p-4`}
                                       onClick={() => handleCompletePlanningReview()}>
                                        <img
                                            src="assets/images/lock-white.svg"
                                            alt="lock"
                                        />
                                        <div className="text-white text-sm md:text-base text-center">
                                            <span className="underline">Complete planning review </span>
                                            <span className="sm:block">to unlock</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="w-3 h-3 bg-[#FAA942] rounded-full absolute bottom-2 right-2"></div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 bg-white grid md:grid-cols-3 gap-[20px] rounded-[20px] p-5 md:p-6">
                        <div className="w-full">
                            <div className="text-[16px] text-[#A2ACBE] font-bold mb-[8px] md:mb-[20px]">
                                Retirement Pacing
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-1 gap-[10px]">
                                <div className="col-span-2 md:col-span-full">
                                    {pacing === "Likely on track" && (
                                        <TimeLine value={3} />
                                    )}
                                    {pacing === "At risk" && (
                                        <TimeLine value={2} />
                                    )}
                                    {pacing === "Likely off track" && (
                                        <TimeLine value={1} />
                                    )}
                                </div>
                                <div className="col-span-1 md:col-span-full text-[14px] md:text-[16px] text-[#434A59]">
                                    {pacing}
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="text-[16px] text-[#A2ACBE] font-bold mb-[8px] md:mb-[20px]">
                                Tax Planning
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-1 gap-[10px]">
                                <div className="col-span-2 md:col-span-full">
                                    {taxPlanning === "Heavy tax burden" && (
                                        <TimeLine value={1} />
                                    )}
                                    {taxPlanning === "Average tax burden" && (
                                        <TimeLine value={2} />
                                    )}
                                    {taxPlanning === "Low tax burden" && (
                                        <TimeLine value={3} />
                                    )}
                                </div>
                                <div className="col-span-1 md:col-span-full text-[14px] md:text-[16px] text-[#434A59]">
                                    {taxPlanning}
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="text-[16px] text-[#A2ACBE] font-bold mb-[8px] md:mb-[20px]">
                                Risk of Failure
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-1 gap-[10px]">
                                <div className="col-span-2 md:col-span-full">
                                    {risk === "Low" && <TimeLine value={3} />}
                                    {risk === "Moderate" && (
                                        <TimeLine value={2} />
                                    )}
                                    {risk === "High" && <TimeLine value={1} />}
                                </div>
                                <div className="col-span-1 md:col-span-full text-[14px] md:text-[16px] text-[#434A59]">
                                    {risk}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:row-span-2 p-5 md:p-6 rounded-[20px] bg-white">
                        <div className="text-[16px] text-[#A2ACBE] font-bold mb-1">
                            To do list
                        </div>
                        <Scrollbars style={{ height: 400 }}>
                            {user?.todos.map((todo, key) => (
                                <div
                                    key={todo.id}
                                    className={`flex items-center gap-[10px] py-[12px] md:py-[16px] border-b border-[#DDE3F0] cursor-pointer`}
                                    onClick={() => handleClick(todo)}
                                >
                                    {todo.completed ==="Y" ? (
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 form-checkbox bg-[#00BB7A] text-[#00BB7A] rounded-full"
                                            checked
                                        />
                                    ) : (
                                        <div
                                            className={`w-4 h-4 border ${
                                                todo.completed === "E" ||
                                                todo.id === 1 || 
                                                (todo.id === 2 && user.todos[0].completed=="Y") ||
                                                (todo.id === 3 && user.todos[1].completed=="Y") ||
                                                todo.id === 4 ||
                                                (todo.id === 5 && user.todos[2].completed=="Y") ||
                                                (todo.id === 6 && user.todos[1].completed=="Y")    
                                                    ? "border-[#00BB7A]"
                                                    : "border-gray-400"
                                            } rounded-full flex items-center justify-center`}
                                        ></div>
                                    )}
                                    <span
                                        className={`text-[16px] md:text-[18px] ${
                                            todo.completed === "E" ||
                                            todo.id === 1 || 
                                            (todo.id === 2 && user.todos[0].completed=="Y") ||
                                            (todo.id === 3 && user.todos[1].completed=="Y") ||
                                            todo.id === 4 ||
                                            (todo.id === 5 && user.todos[2].completed=="Y") ||
                                            (todo.id === 6 && user.todos[1].completed=="Y")
                                                ? "text-[#434A59]"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {todo.name}
                                    </span>
                                </div>
                            ))}
                        </Scrollbars>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5 mt-5">
                    <div className="relative w-full">
                        <div className="grid grid-cols-4 md:grid-cols-3 gap-4 md:gap-6 md:items-center h-full bg-white rounded-[20px] p-5 md:p-6">
                            <div className="col-span-3 md:col-span-2">
                                <div className="text-[16px] md:text-[20px] text-[#000714] font-bold mb-[12px]">
                                    Your Financial Planner
                                </div>
                                <div className="text-[14px] md:text-[16px] text-[#000714]">
                                    {user?.rep?.name}
                                </div>
                                <div className="text-[14px] md:text-[16px] text-[#434A59]">
                                    {user?.rep?.title}
                                </div>

                                <div className="w-full md:w-auto md:inline-block mt-[20px]">
                                    <SharedFillButton
                                        className="flex items-center text-base lg:text-lg font-bold px-[24px] py-[12px]"
                                        pill={true}
                                        onClick={() =>
                                            !user?.profile
                                                ? props.history.push(
                                                      "/start-planning"
                                                  )
                                                : window.open(
                                                     user.rep.url
                                                  )
                                        }
                                    >
                                        <span>Schedule a meeting</span>
                                        <img
                                            src="assets/images/arrow-right.svg"
                                            alt="Right Arrow"
                                            className="ml-[12px]"
                                        />
                                    </SharedFillButton>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <img
                                    src={user?.rep?.avatar}
                                    className="w-full rounded-full border border-[#DDE3F0] max-w-[200px] ml-auto"
                                    alt="Planner"
                                />
                            </div>
                        </div>
                        {!user?.profile && (
                            <div className="w-full h-full absolute top-0" onMouseOver={()=>setScheduleHover(false)} onMouseOut={()=>setScheduleHover(true)}>
                               <div className={`${scheduleHover? "block": "hidden"} w-full h-full bg-[#ffffffcc] rounded-[20px] backdrop-blur-xl flex justify-center items-center `}>
                                    <img className="w-[88px] h-[88px]"
                                        src="assets/images/lock-dark.svg"
                                        alt="lock"
                                    />
                                </div>
                                <div className={`${scheduleHover? "hidden": "block"} cursor-pointer w-full h-full flex flex-col gap-2 justify-center items-center bg-[#ffffffcc] bg-opacity-20 backdrop-blur-2xl rounded-[12px] relative`}
                                    onClick={() => props.history.push("/start-planning")}>
                                    <img className="w-[88px] h-[88px]"
                                        src="assets/images/lock-dark.svg"
                                        alt="lock"
                                    />
                                    <div className="text-[#000714] text-base text-center px-3 max-w-[370px]">
                                        You must <span className="underline text-[#4D7EF2]">complete your profile</span> before scheduling a meeting with your advisor
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative w-full">
                        <div className="grid grid-cols-4 md:grid-cols-3 gap-4 md:gap-6 md:items-center h-full bg-white rounded-[20px] p-5 md:p-6">
                            <div className="col-span-3 md:col-span-2">
                                <div className="text-[16px] md:text-[20px] text-[#000714] font-bold mb-[12px]">
                                    Questions? Speak with Wealth Concierge
                                </div>
                                <div className="text-[14px] md:text-[16px] text-[#000714]">
                                    Wealth Concierge supports you along your
                                    journey toward financial freedom
                                </div>
                                <div className="w-full md:w-auto md:inline-block mt-[20px]">
                                    <SharedFillButton
                                        className="flex items-center text-base lg:text-lg font-bold px-[24px] py-[12px]"
                                        pill={true}
                                        onClick={() => {
                                            props.history.push('/support');
                                        }}
                                    >
                                        <span>Speak with Wealth Concierge</span>
                                        <img
                                            src="assets/images/arrow-right.svg"
                                            alt="Right Arrow"
                                            className="ml-[12px]"
                                        />
                                    </SharedFillButton>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <img
                                    src="assets/images/bullet.png"
                                    alt="bullet"
                                    className="w-full max-w-[200px] ml-auto"
                                />
                            </div>
                        </div>
                        {/* {!user?.profile && (
                            <div className="w-full h-full bg-[#ffffffcc] rounded-[20px] backdrop-blur-xl absolute top-0 flex justify-center items-center">
                                <img className="w-[88px] h-[88px]"
                                    src="assets/images/lock-dark.svg"
                                    alt="lock"
                                />
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
