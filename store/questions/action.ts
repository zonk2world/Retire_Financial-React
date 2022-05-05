import { ThunkAction } from "redux-thunk";
import { ActionCreator, Action, Dispatch } from "redux";
import { ApplicationState } from "../index";
import { Answer, QuestionActionTypes } from "./types";
import { AuthActionTypes } from "../auth/types";
import axios from "../../util/api";

export type AppThunk = ActionCreator<
    ThunkAction<void, ApplicationState, null, Action<string>>
>;

export const getQuestionnare: AppThunk = () => {
    return async (dispatch: Dispatch) => {
        return await axios.post('auth/questionnare').then(({data}) => {
            localStorage.setItem('question', JSON.stringify(data.data));
            localStorage.setItem('question_step', data.step);
            return dispatch({
                type: QuestionActionTypes.GET_QUESTIONNARE,
                payload: data,
            })
        })
    }
}

export const updateQuestionnare: AppThunk = (data:Answer, step: number, isLoggedIn: boolean) => {
    return async (dispatch: Dispatch) => {
        localStorage.setItem('question', JSON.stringify(data || {}));
        localStorage.setItem('question_step', step.toString());
        if(isLoggedIn) {
            axios.post("auth/update-questionnare", {...data, step: step});
        }
        return dispatch({
            type: QuestionActionTypes.UPDATE_QUESTION,
            payload: { data: data, step: step },
        });
    };
};

export const changeStep: AppThunk = ( step: number, isLoggedIn: boolean) => {
    return async (dispatch: Dispatch) => {
        localStorage.setItem('question_step', step.toString());
        if(isLoggedIn) {
            axios.post("auth/update-questionnare-step", { step });
        }
        return dispatch({
            type: QuestionActionTypes.CHANGE_STEP,
            payload: step,
        });
    };
};

export const finishQuestionnare: AppThunk = () => {
    return async (dispatch: Dispatch) => {
        return await axios.post('auth/finish-questionnare').then(({data}) => {
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            axios.defaults.headers.common.Authorization = 'Bearer ' + data.access_token;
            return dispatch({
                type: AuthActionTypes.UPDATE_QUESTIONNARE,
                payload: data,
            })
        })
    }
}