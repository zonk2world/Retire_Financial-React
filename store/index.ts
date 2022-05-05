import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { AuthState } from "./auth/types";
import { PlanState } from "./plan/types";
import { History } from "history";
import { authReducer } from "./auth/reducer";
import { planReducer } from "./plan/reducer";
import { questionReducer } from "./questions/reducer";
import { QuestionState } from "./questions/types";
import { plaidReducer } from "./banking/plaid/reducer";
import { PlaidState } from "./banking/plaid/types";
import { yodleeReducer } from "./banking/yodlee/reducer";
import { YodleeState } from "./banking/yodlee/types";
import { settingReducer } from "./setting/reducer";
import { SettingState } from "./setting/types";

export interface ApplicationState {
    auth: AuthState;
    plans: PlanState;
    questions: QuestionState;
    bank_plaid: PlaidState,
    bank_yodlee: YodleeState,
    settings: SettingState;
    router: RouterState | any;
}

export const createRootReducer = (history: History) =>
    combineReducers({
        auth: authReducer,
        plans: planReducer,
        questions: questionReducer,
        bank_plaid: plaidReducer,
        bank_yodlee: yodleeReducer,
        settings: settingReducer,
        router: connectRouter(history),
    });
