import React, { useEffect, useState } from "react";
import {stepCount} from "../../constants/variables";

interface ComponentProps{
    step: number,
}

const Stepper:React.FC<ComponentProps> = ({step}) => {

    let [steps, setSteps] = useState<string []>([]);
    useEffect(() => {
        let tmpStep = [] as string [];
        for (let index = 0; index < stepCount; index++) {
            tmpStep.push('');
        }
        setSteps(tmpStep)
    }, [])

    return (
        <div className="w-full flex gap-[5px] mb-5">
            {steps.map((e, index) => (
                <div
                    className={`flex-grow ${
                        index == step ? "bg-[#72C9EE]" : "bg-[#F2F6F8]"
                    } bg-[#72C9EE] h-[5px]`}
                    key={index}
                ></div>
            ))}
        </div>
    );
};

export default Stepper;
