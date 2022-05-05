import { useEffect, useState } from "react";
import { Answer } from "../store/questions/types";

type GoalTypes = {
    savingPrice: string;
    goalPrice: string;
    progress: number;
}

const useGoal = ({ answers }: { answers: Answer | null; }) => {

    const costs = { step9Answer_1: [1000000, '1M'], step9Answer_2: [2000000, '2M'], step9Answer_3: [3000000, '3M'], step9Answer_4: [4000000, '4M'], step9Answer_5: [2000000, '2M'] };
    const costs1 = { step11Answer_1: [250000, '250K'], step11Answer_2: [500000, '500K'], step11Answer_3: [750000, '750K'], step11Answer_4: [1000000, '1M'], step11Answer_5: [2000000, '2M'] };

    const [result, setResult] = useState<GoalTypes>({ savingPrice: '', goalPrice: '', progress: 0 });

    useEffect(() => {
        if (answers && Object.keys(answers).length) {
            const costKey = Object.keys(costs).filter((key) => answers[key])[0];
            const cost1Key = Object.keys(costs1).filter((key) => answers[key])[0];
            const pgValue = costs1[cost1Key][0] / costs[costKey][0] * 100;

            setResult({ savingPrice: costs[costKey][1], goalPrice: costs1[cost1Key][1], progress: pgValue });
        }
    }, [answers]);

    return result;
};

export default useGoal;