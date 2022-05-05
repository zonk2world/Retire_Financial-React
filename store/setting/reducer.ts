import { Reducer } from "redux";

import { SettingState, SettingActionTypes } from "./types";

const initialState: SettingState = {
    dataCollectionFields: [],
    users: [],
    registeredUsers: [],
    rolloverUsers: [],
    onboardingUsers: [],
    selectedRegisterUser: null,
    selectedOnboardingUser: null,
    selectedRolloverUser: null,
    selectedUser: null,
    reps: null
};

const reducer: Reducer<SettingState> = (state = initialState, action) => {
    switch (action.type) {
        case SettingActionTypes.GET_DATA_COLLECTION_FIELDS: {
            return { ...state, dataCollectionFields: action.payload };
        }
        case SettingActionTypes.UPDATE_DATA_COLLECTION_FIELD: {
            return {
                ...state,
                dataCollectionFields: state.dataCollectionFields.map((e) =>
                    e.id === action.payload.id ? action.payload : e
                ),
            };
        }
        case SettingActionTypes.ADD_DATA_COLLECTION_FIELD: {
            return {
                ...state,
                dataCollectionFields: [
                    ...state.dataCollectionFields,
                    action.payload,
                ],
            };
        }
        case SettingActionTypes.DELETE_DATA_COLLECTION_FIELD: {
            return {
                ...state,
                dataCollectionFields: state.dataCollectionFields.filter(
                    (e) => e.id !== action.payload
                ),
            };
        }
        case SettingActionTypes.GET_USERS: {
            return {
                ...state,
                registeredUsers: action.payload.registered,
                onboardingUsers: action.payload.onboarding,
                rolloverUsers: action.payload.rollover,
            };
        }
        case SettingActionTypes.GET_USER_DETAIL: {
            return { ...state, selectedUser: action.payload.result, reps:action.payload.reps };
        }
        case SettingActionTypes.CHABGE_REP: 
        case SettingActionTypes.ENABLETODOLIST: {
            return { ...state, selectedUser: action.payload };
        }

        case SettingActionTypes.GET_ONBOARDING_USER_DETAIL: {
            return { ...state, selectedOnboardingUser: action.payload };
        }
        case SettingActionTypes.GET_ROLLOVER_USER_DETAIL: {
            return { ...state, selectedRolloverUser: action.payload };
        }
        default: {
            return state;
        }
    }
};

export { reducer as settingReducer };
