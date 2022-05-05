import { BeneficiaryType } from "resources/js/pages/RolllOver/Beneficiary";
import { Answer, UserAnswer} from "../questions/types";
export enum SettingActionTypes {
    GET_DATA_COLLECTION_FIELDS = "data_collection_fields",
    ADD_DATA_COLLECTION_FIELD = "add_data_collection-field",
    UPDATE_DATA_COLLECTION_FIELD = "upate_data_collection-field",
    DELETE_DATA_COLLECTION_FIELD = "delete_data_collection-field",
    GET_USERS = "get_users",
    GET_USER_DETAIL = "get_user_detail",
    GET_ONBOARDING_USER_DETAIL = "get_onboarding_user_detail",
    GET_ROLLOVER_USER_DETAIL = "get_rollover_user_detail",
    ENABLETODOLIST = "enble_todolist",
    CHABGE_REP = "change_rep",
}

export interface SettingState {
    dataCollectionFields: DataCollectionField[];
    registeredUsers: User[];
    onboardingUsers: Onboarding[];
    rolloverUsers: Rollover[];
    selectedRegisterUser: User | null;
    selectedOnboardingUser: Onboarding | null;
    selectedRolloverUser: Rollover | null;
    users: User[];
    selectedUser: UserDetail | null;
    reps:Rep[]|null;
}

export interface Rep{
    id:number;
    name: string;
}
export interface UserDetail {
    id: number;
    email: string;
    name: string;
    role: "admin" | "user";
    authenticate_type: string | null;
    email_verified_at: string;
    profile_complete_step: number;
    pm_last_four: string | null;
    pm_type: string | null;
    stripe_id: string | null;
    trial_ends_at: string | null;
    phone_number: string | null;
    created_at: string;
    updated_at: string;
    state:string;
    rep_id:number;
    answers: UserAnswer[];
    document: Document[]
    todos: Todo[];
}

export interface Todo {
    id: number;
    name: string;
    type: string;
    link: string;
    completed: string;
}

export interface Document {
    id: number;
    user_id: number;
    file_name: string;
    file_path: string;
}
export interface User {
    id: number;
    email: string;
    name: string;
    role: "admin" | "user";
    authenticate_type: string | null;
    email_verified_at: string;
    profile_complete_step: number;
    pm_last_four: string | null;
    pm_type: string | null;
    stripe_id: string | null;
    trial_ends_at: string | null;
    created_at: string;
    updated_at: string;
    onboarding?: Onboarding;
    rollover?: Rollover;
}

export interface Rollover {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    streetAddress: string;
    streetAddress2: string;
    city: string;
    state: string;
    zipCode: string;
    DOB: string;
    employementStatus: string;
    employer: string;
    occupation: string;
    netWorth: string;
    liquidNetWorth: string;
    estimatedAnnualIncome: string;
    numberOfAccounts: string;
    totalInvestmentAssets: string;
    investmentAssetsNotes: string;
    accountTypes: string;
    accountTypeByInput: string;
    federalTaxBracket: string;
    created_at: string;
    document: string;
    beneficiaries: BeneficiaryType[];
}

export interface Onboarding {
    id?: number;
    user_id: number;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    DOB: string;
    employer: string;
    employmentIncome: string;
    firstname2: string;
    lastname2: string;
    phoneNumber2: string;
    DOB2: string;
    employer2: string;
    employmentIncome2: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    email: string;
    cashReserves: string;
    importantNotes: string;
    receiveCashBonus: string;
    receiveRSU: string;
    receiveStockOption: string;
    annualCashBonusAmount: string;
    annualRSUAmount: string;
    annualStockOptionAmount: string;
    created_at: string;
    paystubUpload: string;
    paystubUpload2: string;
    investmentAccountUpload: string;
    investmentAccountUpload2: string;
    investmentAccountUpload3: string;
    investmentAccountUpload4: string;
    investmentAccountUpload5: string;
    investmentAccountUpload6: string;
    otherAssetUpload: string;
    otherAssetUpload2: string;
    otherAssetUpload3: string;
    otherAssetUpload4: string;
    otherAssetUpload5: string;
    otherAssetUpload6: string;
    otherLiabilitiesUpload: string;
    otherLiabilitiesUpload2: string;
    otherLiabilitiesUpload3: string;
    otherEmployerBenefitUpload: string;
    otherEmployerBenefitUpload2: string;
    otherEmployerBenefitUpload3: string;
    socialSecurityUpload: string;
}

export interface DataCollectionField {
    id: number;
    title: string;
    key: string;
    require: boolean;
    multiple: boolean;
    created_at: string;
    updated_at: string;
    datas: CollectionData[];
}

export interface CollectionData {
    id: number;
    user_id: number;
    key: string;
    path: string;
    filename: string;
    created_at: string;
    updated_at: string;
}
