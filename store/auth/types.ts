import { Plan } from "../plan/types";
import { DataCollectionField } from "../setting/types";
import { PaymentMethod } from "@stripe/stripe-js";
import { Replace } from "connected-react-router";
import NumberFormat from "react-number-format";

export interface User {
    id: number;
    name: string;
    email: string;
    id_verified: boolean | null;
    disclosure_agreements: Disclosure | null;
    selected_plan: UserPlan | null;
    current_plan: UserPlan | null;
    profile_complete_step: number;
    authenticate_type: number;
    role: string;
    paymentMethod: PaymentMethod;
    stripe_id: string | null;
    trial_ends_at: string | null;
    pm_last_four: string | null;
    pm_type: string | null;
    email_verified_at: string | null;
    created_at: string;
    isSignUpProcess: boolean | undefined;
    passTwoFactor: boolean | undefined;
    twoFactorSent: boolean | undefined;
    default_two_factor_method: string;
    updated_at: string;
    phone_number: string;
    phone_number_verified_at: string;
    profile: Profile | null;
    todos: Todo[];
    rep:Rep;
}

interface UserPlan {
    id: number;
    user_id: number;
    plan_id: string;
    plan: Plan;
    expire_date: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Disclosure {
    id: number;
    download_status: boolean | undefined;
    download_ip: string | undefined;
    download_time: string | undefined;
    review_status: boolean | undefined;
    review_ip: string | undefined;
    review_time: string | undefined;
    agree_status: boolean | undefined;
    agree_ip: string | undefined;
    agree_time: string | undefined;
    signature_status: boolean | undefined;
    signature_image: string | undefined;
    disclosure_pdf_link: string;
    created_at: string;
    updated_at: string;
}

export interface AuthState {
    readonly user: User | null;
    readonly token: string | null;
    answers: [];
    userCollectionData: DataCollectionField[];
    missingDataNum: number;
    documents: Document[];
    isFetching: boolean;
    coupon_data:any|null;
}

export interface Profile {
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

export interface Rep{
    id: number;
    name: string;
    title:string;
    avatar: string;
    url:string;
}
export enum AuthActionTypes {
    REQUEST_ERROR = "request_error",
    EMAIL_LOGIN = "email_login",
    GET_USER = "get_user",
    REGISTER = "register",
    GOOGLE_LOGIN = "google_login",
    FACEBOOK_LOGIN = "facebook_login",
    LOGOUT = "logout",
    UPDATE_DISCLOSURE = "update_disclosure",
    UPDATE_QUESTIONNARE = "update_questionnare",
    SELECT_PLAN = "select_plan",
    CHOOSE_PLAN_AGAIN = "choose_plan_again",
    BUY_PLAN = "buy_plan",
    UPDATE_COUPONDATA= "update_coupon_data",
    UPDATE_PLAID_ACCESS_TOKEN = "UPDATE_PLAID_ACCESS_TOKEN",
    UPDATE_YODLEE_ACCESS_TOKEN = "UPDATE_YODLEE_ACCESS_TOKEN",
    UPDATE_COLLECTION_DATA = "update_collection_data",
    GET_USER_COLLECTION = "get_user_collection",
    PUT_COLLECTION_FILE = "put_collection_file",
    DELETE_COLLECTION_FILE = "delete_collection_file",
    SEND_FORGOT_PASSWORD_EMAIL = "send_forgot_password_link",
    RESET_PASSWORD = "reset_password",
    GOTO_PROFILE_STEP = "goto_profile_step",
    SEND_EMAIL_TO_USERS = "send_email_to_users",
    VERIFY_PHONE_NUMBER = "verify_phone_number",
    CONFIRM_CODE = "confirm_code",
    REQUEST_DATA = "request_data",
    ID_VERIFIED = "id_verified",
    TWO_FACTOR_REQUEST = "two_factor_request",
    TWO_FACTOR_VERFIY = "two_factor_verify",
    TWO_FACTOR_RESEND = "two_factor_resend",
    UPDATE_TWO_FACTOR_ENTRY = "update_two_factor_entry",
    UPDATE_USER = "update_user",
    UPDATE_USER_PROFILE = "update_user_profile",
    UPDATE_TODOLIST = "update_todolist",
    GET_DOCUMENTS = "GET_DOCUMENTS",
    UPDATE_DOCUMENTS = "UPDATE_DOCUMENTS",
    ADD_DOCUMENT = "ADD_DOCUMENT",
}
