import { ThunkAction } from "redux-thunk";
import { ActionCreator, Action, Dispatch } from "redux";
import { ApplicationState } from "../index";
import { SettingActionTypes } from "./types";
import { Toast } from "../../components/common/notification";
import axios from "../../util/api";

export type AppThunk = ActionCreator<
    ThunkAction<void, ApplicationState, null, Action<string>>
>;

export const addDataCollectionField: AppThunk = (formdata) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("data-collection", formdata)
            .then(({ data }) => {
                return dispatch({
                    type: SettingActionTypes.ADD_DATA_COLLECTION_FIELD,
                    payload: data.data,
                });
            });
    };
};
export const getDataCollectionFields: AppThunk = () => {
    return async (dispatch: Dispatch) => {
        return await axios.get("data-collection").then(({ data }) => {
            return dispatch({
                type: SettingActionTypes.GET_DATA_COLLECTION_FIELDS,
                payload: data.dataCollections,
            });
        });
    };
};
export const updateDataCollectionField: AppThunk = (formdata) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .put(`data-collection/${formdata.id}`, formdata)
            .then(({ data }) => {
                return dispatch({
                    type: SettingActionTypes.UPDATE_DATA_COLLECTION_FIELD,
                    payload: data.data,
                });
            });
    };
};
export const deleteDataCollectionField: AppThunk = (id) => {
    return async (dispatch: Dispatch) => {
        return await axios.delete(`data-collection/${id}`).then(({ data }) => {
            return dispatch({
                type: SettingActionTypes.DELETE_DATA_COLLECTION_FIELD,
                payload: id,
            });
        });
    };
};
export const getUsers: AppThunk = () => {
    return async (dispatch: Dispatch) => {
        return await axios.post("/get-users").then(({ data }) => {
            return dispatch({
                type: SettingActionTypes.GET_USERS,
                payload: data.result,
            });
        });
    };
};
export const getUserDetail: AppThunk = (id) => {
    return async (dispatch: Dispatch) => {
        return await axios.post(`/user-detail`, { id }).then(({ data }) => {
            return dispatch({
                type: SettingActionTypes.GET_USER_DETAIL,
                payload: data,
            });
        });
    };
};
export const getOnboardingUserDetail: AppThunk = (id) => {
    return async (dispatch: Dispatch) => {
        return await axios.post(`/user-detail/onboarding`, { id }).then(({ data }) => {
            return dispatch({
                type: SettingActionTypes.GET_ONBOARDING_USER_DETAIL,
                payload: data.result,
            });
        });
    };
};

export const getRolloverUserDetail: AppThunk = (id) => {
    return async (dispatch: Dispatch) => {
        return await axios.post(`/user-detail/rollover`, { id }).then(({ data }) => {
            return dispatch({
                type: SettingActionTypes.GET_ROLLOVER_USER_DETAIL,
                payload: data.result,
            });
        });
    };
};

export const enableTodoList:AppThunk = (id, enabledIds) => {
    return async (dispatch: Dispatch)=>{
        return await axios.post(`/user-detail/enble-todolist`,{id,enabledIds}).then(({data})=>{
            Toast("","Updated successfully." , "success");      
            return dispatch({
                type: SettingActionTypes.ENABLETODOLIST,
                payload: data.result,
            });
        })
        .catch((e) => {
            Toast("",e.response.data.message , "danger");           
        });
    };
};

export const changeRep:AppThunk = (id, repId) => {
    return async (dispatch: Dispatch)=>{
        return await axios.post(`/user-detail/chane-rep`,{id, repId}).then(({data})=>{
            Toast("","Updated successfully." , "success");      
            return dispatch({
                type: SettingActionTypes.CHABGE_REP,
                payload: data.result,
            });
        })
        .catch((e) => {
            Toast("",e.response.data.message , "danger");           
        });
    };
};