import { Reducer } from "redux";

import { QuestionState, QuestionActionTypes } from "./types";

const step = localStorage.getItem("question_step") ? parseInt(localStorage.getItem("question_step") as string) : 0;
const answers = localStorage.getItem("question") ? JSON.parse(localStorage.getItem("question") as string) : {};

const initialState: QuestionState = {
    answers: answers,
    step: step,
};

const reducer: Reducer<QuestionState> = (state = initialState, action) => {
    switch (action.type) {
        case QuestionActionTypes.GET_QUESTIONNARE: {
            return { ...state, answers: action.payload.data, step: action.payload.step };
        }
        case QuestionActionTypes.UPDATE_QUESTION: {
            return { ...state, answers: action.payload.data, step: action.payload.step };
        }
        case QuestionActionTypes.CHANGE_STEP: {
            return { ...state, step: action.payload };
        }
        default: {
            return state;
        }
    }
};

export { reducer as questionReducer };
