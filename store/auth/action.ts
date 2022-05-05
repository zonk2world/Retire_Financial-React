import { AuthActionTypes } from "./types";
import { ThunkAction } from "redux-thunk";
import { ActionCreator, Action, Dispatch } from "redux";
import { ApplicationState } from "../index";
import { Toast } from "../../components/common/notification";
import axios from "../../util/api";

export type AppThunk = ActionCreator<
    ThunkAction<void, ApplicationState, null, Action<string>>
>;

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export const login: AppThunk = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/login", { email, password })
            .then(({ data }) => {
                axios.defaults.headers.common.Authorization =
                    "Bearer " + data.access_token;
                localStorage.setItem("token", data.access_token);
                return dispatch({
                    type: AuthActionTypes.EMAIL_LOGIN,
                    payload: data,
                });
            })
            .catch((e) => {
                console.log(e.response);
                return dispatch({
                    type: AuthActionTypes.REQUEST_ERROR,
                    payload: e.response,
                });
            });
    };
};

export const getUser: AppThunk = (email: string) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/get-user")
            .then(({ data }) => {
                axios.defaults.headers.common.Authorization =
                    "Bearer " + data.access_token;
                localStorage.setItem("token", data.access_token);
                return dispatch({
                    type: AuthActionTypes.GET_USER,
                    payload: data,
                });
            })
            .catch((e) => {
                return dispatch({
                    type: AuthActionTypes.REQUEST_ERROR,
                    payload: e.response,
                });
            });
    };
};

export const hasAccount = async (email: string) => {
    try {
        return await axios.post("auth/has-account", email);
    } catch (e) {
        return false;
    }
};

export const register: AppThunk = (userInfo: RegisterData) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/register", userInfo)
            .then(({ data }) => {
                localStorage.setItem("token", data.access_token);
                axios.defaults.headers.common.Authorization =
                    "Bearer " + data.access_token;
                return dispatch({
                    type: AuthActionTypes.REGISTER,
                    payload: data,
                });
            })
            .catch((e) => {
                return dispatch({
                    type: AuthActionTypes.REQUEST_ERROR,
                    payload: e.response,
                });
            });
    };
};

export const googleLogin: AppThunk = (token: string, payload: any = {}) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/google-login", { token, ...payload })
            .then(({ data }) => {
                localStorage.setItem("token", data.access_token);
                axios.defaults.headers.common.Authorization =
                    "Bearer " + data.access_token;
                return dispatch({
                    type: AuthActionTypes.GOOGLE_LOGIN,
                    payload: data,
                });
            })
            .catch((e) => {
                return dispatch({
                    type: AuthActionTypes.REQUEST_ERROR,
                    payload: e.response,
                });
            });
    };
};

export const facebookLogin: AppThunk = (token: string, payload: any = {}) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/facebook-login", { token, ...payload })
            .then(({ data }) => {
                localStorage.setItem("token", data.access_token);
                axios.defaults.headers.common.Authorization =
                    "Bearer " + data.access_token;
                return dispatch({
                    type: AuthActionTypes.FACEBOOK_LOGIN,
                    payload: data,
                });
            })
            .catch((e) => {
                return dispatch({
                    type: AuthActionTypes.REQUEST_ERROR,
                    payload: e.response,
                });
            });
    };
};
export const signOut: AppThunk = () => {
    return async (dispatch: Dispatch) => {
        localStorage.clear();
        delete axios.defaults.headers.common.Authorization;
        location.href = "/signin";
        return dispatch({
            type: AuthActionTypes.LOGOUT,
        });
    };
};
export const updateDisclosure: AppThunk = (param) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/update-disclosure", param)
            .then(({ data }) => {
                if (data.docpath) {
                    document.getElementById('docdown')?.setAttribute('href', data.docpath);
                    document.getElementById('docdown')?.setAttribute('target', "_blank");
                    document.getElementById('docdown')?.click();
                    localStorage.setItem("token", data.userdata.original.access_token);
                    axios.defaults.headers.common.Authorization =
                        "Bearer " + data.userdata.original.access_token;
                    Toast("", "Disclosure completed successfully!", "success");
                    return dispatch({
                        type: AuthActionTypes.UPDATE_DISCLOSURE,
                        payload: data.userdata.original,
                    });

                } else {
                    localStorage.setItem("token", data.access_token);
                    axios.defaults.headers.common.Authorization =
                        "Bearer " + data.access_token;
                    console.log("Received Token", data.access_token)
                    Toast("", "Disclosure updated successfully!", "success");
                    return dispatch({
                        type: AuthActionTypes.UPDATE_DISCLOSURE,
                        payload: data,
                    });
                }
            })
             .catch((e) => {
                Toast("",e.response.data.message , "danger");                
            });
    };
};
export const selectPlan: AppThunk = (plan_id) => {
    return async (dispatch: Dispatch) => {
        // axios.defaults.headers.common.Authorization = axios.defaults.headers.common.Authorization || "Bearer " + localStorage.getItem("token");

        return await axios
            .post("auth/choose-plan", { plan_id })
            .then(({ data }) => {
                localStorage.setItem("token", data.access_token);
                axios.defaults.headers.common.Authorization =
                    "Bearer " + data.access_token;
                return dispatch({
                    type: AuthActionTypes.SELECT_PLAN,
                    payload: data,
                });
            });
    };
};

export const choosePlanAgain: AppThunk =()=>{
    return async (dispatch:Dispatch) => {
        return await axios.post("auth/choose-plan-again")
            .then(({data})=>{
                localStorage.setItem("token", data.access_token);                
                return dispatch({
                    type: AuthActionTypes.CHOOSE_PLAN_AGAIN,
                    payload: data,
                });
            })
    }
}

export const createSubscription: AppThunk = (
    paymentMethod: undefined | string = undefined, couponCode
) => {
    let cCode: string;
    if(couponCode==undefined)
        cCode = "";
    else
        cCode = couponCode;
    return async (dispatch: Dispatch) => {        
        return await axios
            .post("auth/create-subscription", { paymentMethod, cCode })
            .then(({ data }) => {
                localStorage.setItem("token", data.access_token);
                axios.defaults.headers.common.Authorization =
                    "Bearer " + data.access_token;
                Toast("", "Payment Successful", "success");

                axios.post("auth/send-email-to-admin")
                .then(()=>{
                    console.log("Email has been sent successfully");
                })
                .catch((err)=>{
                    console.log("Email sending faild.");
                })

                return dispatch({
                    type: AuthActionTypes.BUY_PLAN,
                    payload: data,
                });
            })
            .catch((err) => {
                Toast("", "Payment failed", "danger");
                
            });
    };
};
export const updateBankingAccessToken: AppThunk = (plaid_tokens, yodlee_tokens) => {
    return async (dispatch: Dispatch) => {
        // axios.defaults.headers.common.Authorization = axios.defaults.headers.common.Authorization || "Bearer " + localStorage.getItem("token");
        return await axios
            .post("auth/update-banking-access-token", { plaid_tokens, yodlee_tokens })
            .then(({ data }) => {

                localStorage.setItem("token", data.access_token);
                // axios.defaults.headers.common.Authorization =
                //     "Bearer " + data.access_token;
                return dispatch({
                    type: AuthActionTypes.UPDATE_PLAID_ACCESS_TOKEN,
                    payload: data,
                });
            });
    };
};

export const saveDataCollectionInfo: AppThunk = (formdata) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/save-data-collection", formdata)
            .then(({ data }) => {
                localStorage.setItem("token", data.access_token);
                axios.defaults.headers.common.Authorization =
                    "Bearer " + data.access_token;
                return dispatch({
                    type: AuthActionTypes.UPDATE_COLLECTION_DATA,
                    payload: data,
                });
            });
    };
};

export const getUserDataCollection: AppThunk = () => {
    return async (dispatch: Dispatch) => {
        return await axios.post("auth/get-user-collection").then(({ data }) => {
            return dispatch({
                type: AuthActionTypes.GET_USER_COLLECTION,
                payload: data.data,
            });
        });
    };
};

export const putDataCollecionFile: AppThunk = (formdata) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/put-data-collection", formdata)
            .then(({ data }) => {
                Toast("", "Document successfully uploaded", "success");
                return dispatch({
                    type: AuthActionTypes.PUT_COLLECTION_FILE,
                    payload: data.data,
                });
            })
            .catch((err) => {
                Toast("", "Document upload failed", "danger");
            });
    };
};

export const deleteDataCollectionFile: AppThunk = (id) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/delete-data-collection", { id })
            .then(({ data }) => {
                Toast("", "Document successfully deleted", "success");
                return dispatch({
                    type: AuthActionTypes.DELETE_COLLECTION_FILE,
                    payload: data.data,
                });
            });
    };
};

export const sendResetPasswordEmail: AppThunk = (email) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/forgot-password", { email })
            .then(({ data }) => {
                if (data.success) {
                    Toast("", data.result, "success");
                } else {
                    Toast("", data.result, "danger");
                }
                return dispatch({
                    type: AuthActionTypes.SEND_FORGOT_PASSWORD_EMAIL,
                    payload: data.data,
                });
            });
    };
};

export const resetPassword: AppThunk = (formdata) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/reset-password", formdata)
            .then(({ data }) => {
                if (data.success) {
                    Toast("", data.result, "success");
                } else {
                    Toast("", data.result, "danger");
                }
                return dispatch({
                    type: AuthActionTypes.RESET_PASSWORD,
                    date: data,
                });
            });
    };
};

export const gotoProfileStep: AppThunk = () => {
    return (dispatch: Dispatch) => {
        return dispatch({
            type: AuthActionTypes.GOTO_PROFILE_STEP,
        });
    };
};

export const sendEmailToUsers: AppThunk = () => {
    return async (dispatch: Dispatch) => {
        return await axios.get("auth/send-email-to-users").then(({ data }) => {
            if (data.success) {
                Toast("", data.result, "success");
            } else {
                Toast("", data.result, "danger");
            }
        });
    };
};

export const verifyIdentify: AppThunk = () => {
    return async (dispatch: Dispatch) => {
        return await axios.post("auth/verification_result").then(({ data }) => {
            axios.defaults.headers.common.Authorization =
                "Bearer " + data.access_token;
            localStorage.setItem("token", data.access_token);
            return dispatch({
                type: AuthActionTypes.ID_VERIFIED,
                payload: data,
            });
        });
    };
};

export const verifyPhoneNumber: AppThunk = (phoneNumber) => {
    return async (dispatch: Dispatch, getState: () => ApplicationState) => {
        dispatch({ type: AuthActionTypes.REQUEST_DATA });

        const authData = getState().auth;
        if (!authData?.user?.email) {
            return dispatch({
                type: AuthActionTypes.REQUEST_ERROR,
                payload: "Authentication failed",
            });
        }

        return await axios
            .post("auth/verify-phone", {
                phone_number: phoneNumber,
                email: authData?.user?.email,
            })
            .then(({ data }) => {
                if (data.success) {
                    Toast("", data.result || "Success", "success");

                    return dispatch({
                        type: AuthActionTypes.VERIFY_PHONE_NUMBER,
                        payload: data,
                    });
                } else {
                    throw new Error(data.error || "Something went to wrong!");
                }
            })
            .catch((e) => {
                return dispatch({
                    type: AuthActionTypes.REQUEST_ERROR,
                    payload: e.response,
                });
            });
    };
};

export const confirmCode: AppThunk = (code) => {
    return async (dispatch: Dispatch, getState: () => ApplicationState) => {
        dispatch({ type: AuthActionTypes.REQUEST_DATA });

        const authData = getState().auth;
        if (!authData?.user?.email) {
            return dispatch({
                type: AuthActionTypes.REQUEST_ERROR,
                payload: "Authentication failed",
            });
        }

        return await axios
            .post("auth/confirm-code", { code, email: authData?.user?.email })
            .then(({ data }) => {
                if (data.success) {
                    Toast("", data.result || "Success", "success");

                    return dispatch({
                        type: AuthActionTypes.CONFIRM_CODE,
                        payload: data,
                    });
                } else {
                    throw new Error(data.error || "Something went to wrong!");
                }
            })
            .catch((e) => {
                return dispatch({
                    type: AuthActionTypes.REQUEST_ERROR,
                    payload: e.response,
                });
            });
    };
};

export const twoFactorRequestSend: AppThunk = (data, isSMS = true) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/two-factor-request", data)
            .then(({ data }) => {
                if (data.success) {
                    Toast("", data.result || "Success", "success");

                    return dispatch({
                        type: AuthActionTypes.TWO_FACTOR_REQUEST,
                        payload: data,
                        two_factor_method: isSMS ? 'sms' : 'email'
                    });
                } else {
                    throw new Error(data.error || "Something went to wrong!");
                }
            })
            .catch((e) => {
                return dispatch({
                    type: AuthActionTypes.REQUEST_ERROR,
                    payload: e.response,
                });
            });
    };
};

export const twoFactorRequestVerify: AppThunk = (code) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/two-factor-verify", { code })
            .then(({ data }) => {
                if (data.success) {
                    Toast("", data.result || "Success", "success");
                    return dispatch({
                        type: AuthActionTypes.TWO_FACTOR_VERFIY,
                        payload: "",
                    });
                } else {
                    throw new Error(data.error || "Something went to wrong!");
                }
            })
            .catch((e) => {
                return dispatch({
                    type: AuthActionTypes.REQUEST_ERROR,
                    payload: e.response,
                });
            });
    };
};

export const twoFactorRequestResend: AppThunk = (data) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/two-factor-resend", data)
            .then(({ data }) => {
                if (data.success) {
                    Toast("", data.result || "Success", "success");
                    return dispatch({
                        type: AuthActionTypes.TWO_FACTOR_RESEND,
                        payload: data,
                    });
                } else {
                    throw new Error(data.error || "Something went to wrong!");
                }
            })
            .catch((e) => {
                return dispatch({
                    type: AuthActionTypes.REQUEST_ERROR,
                    payload: e.response,
                });
            });
    };
};

export const updateTwoFactorEntry: AppThunk = () => {
    return async (dispatch: Dispatch) => {
        return dispatch({
            type: AuthActionTypes.UPDATE_TWO_FACTOR_ENTRY,
        });
    };
};

export const updateUser: AppThunk = (userId, data) => {
    // axios.defaults.headers.common.Authorization = axios.defaults.headers.common.Authorization || "Bearer " + localStorage.getItem("token");
    return async (dispatch: Dispatch) => {
        return await axios
            .post(`user/${userId}`, data)
            .then(({ data }) => {
                return dispatch({
                    type: AuthActionTypes.UPDATE_USER,
                    payload: data,
                });
            })
            .catch((e) => {
                Toast("",e.response.data.message , "danger");
                // return dispatch({
                //     type: AuthActionTypes.REQUEST_ERROR,
                //     payload: e.response,
                // });
            });
    };
};

export const addProfile: AppThunk = (data) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("/user/profile", data)
            .then(({ data }) => {
                return dispatch({
                    type: AuthActionTypes.UPDATE_USER_PROFILE,
                    payload: data,
                });
            })
            .catch((e) => {
                Toast("",e.response.data.message , "danger");
                // return dispatch({
                //     type: AuthActionTypes.REQUEST_ERROR,
                //     payload: e.response,
                // });
            });
    };
};

export const updateTodolist: AppThunk = (todo_id) => {
    console.log("todo id->",todo_id);
    return async (dispatch: Dispatch) => {
        return await axios
            .post("/user/todolist", { todo_id })
            .then(({ data }) => {
                return dispatch({
                    type: AuthActionTypes.UPDATE_TODOLIST,
                    payload: data,
                });
            })
            .catch((e) => {
                return dispatch({
                    type: AuthActionTypes.REQUEST_ERROR,
                    payload: e.response,
                });
            });
    };
};

export const addDocument: AppThunk = (formdata) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/add-document", formdata)
            .then(({ data }) => {
                return dispatch({
                    type: AuthActionTypes.ADD_DOCUMENT,
                    payload: data.data,
                });
            })
            .catch((err) => {
                Toast("", "Document upload failed", "danger");
            });
    };
};

export const updateDocument: AppThunk = (formdata) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .post("auth/update-document", formdata)
            .then(({ data }) => {
                Toast("", "Document update success!", "success");
                return dispatch({
                    type: AuthActionTypes.UPDATE_DOCUMENTS,
                    payload: data.data,
                });
            })
            .catch((err) => {
                Toast("", "Document update failed", "danger");
            });
    };
};

export const getDocuments: AppThunk = () => {
    return async (dispatch: Dispatch) => {
        return await axios
            .get("auth/get-document")
            .then(({ data }) => {
                return dispatch({
                    type: AuthActionTypes.GET_DOCUMENTS,
                    payload: data.documents,
                });
            })
            .catch((err) => {
            });
    };
};

export const deleteDocument: AppThunk = (doc_id) => {
    return async (dispatch: Dispatch) => {
        return await axios
            .delete(`auth/documents/${doc_id}`)
            .then(({ data }) => {
                return dispatch({
                    type: AuthActionTypes.GET_DOCUMENTS,
                    payload: data.documents,
                });
            })
            .catch((err) => {
            });
    };
};

export const sendCouponCode: AppThunk = (couponCode)=>{
    return async (dispatch:Dispatch)=>{
        return await axios.get('auth/send-couponCode',{ params: { couponCode: couponCode } })
            .then(({data}) =>{                
                if(data.error){
                    Toast("", data.error.message, "danger");
                    return dispatch({
                        type: AuthActionTypes.UPDATE_COUPONDATA,
                        payload:null
                    })
                }else{
                    return dispatch({
                        type: AuthActionTypes.UPDATE_COUPONDATA,
                        payload:data
                    })
                }
            })
            .catch(err=>{
                console.log("coupon error=>", err);
                return dispatch({
                    type: AuthActionTypes.UPDATE_COUPONDATA,
                    payload:null
                })
            })
    }
}