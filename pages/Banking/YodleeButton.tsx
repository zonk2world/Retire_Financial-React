import React from "react";
import { useYodlee } from "../../components/yodlee/src/index";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "resources/js/store";
import { yodleeSuccess } from "../../store/banking/yodlee/action";
import { Toast } from "../../components/common/notification";

interface ComponentProps {
    showModal: (flag: boolean) => void;
}

const YodleeButton: React.FC<ComponentProps> = ({ showModal }) => {
    const dispatch = useDispatch();
    const linkToken = useSelector(
        (state: ApplicationState) => state.bank_yodlee.linkToken
    );
    const tokens = useSelector(
        (state: ApplicationState) => state.bank_yodlee.tokens
    );
    const URL = "https://fl4.sandbox.yodlee.com/authenticate/restserver/fastlink";
    
    const [visible, setVisible] = React.useState(false);

    const { ready, init, active } = useYodlee({
        containerId: "YodleeModel",
        fastLinkOptions: {
            fastLinkURL: URL,
            token: {
                tokenType: "AccessToken",
                tokenValue: linkToken,
            },
        },
        onSuccess: (data) => {
            console.log("Yodlee Sucess", data);
            dispatch(yodleeSuccess(data, linkToken));
        },
        onError: (error) => {
            console.log("Yodlee Error", error);
        },
        onExit: (data) => {
            console.log("onExit:");
            console.log(data);
        },
        onEvent: function (data) {
            // console.log("onEvent:");
            // console.log(data);
        },
    });
    return (
        <>
            <button
                className="h-11 w-full flex justify-center items-center font-semibold text-lg text-white bg-[#ff8f00] hover:bg-[#ff9f10] px-6 mb-5"
                onClick={() => {
                    console.log("Yodlee Link Token", linkToken);
                    showModal(true);
                    setVisible(true);
                    init();
                }}
                disabled={!ready}
            >
                Add Yodlee Account
            </button>
            {
            visible && !active &&<p className="absolute w-full h-full align-middle content-center">
                Please wait until loading...
            </p>
            }
        </>
    );
};

export default YodleeButton;
/*
{
    "providerId": 16441,
    "providerName": "Dag Site",
    "requestId": "QCOMsmyEiXTDHVV9e+fg4vBE99c=",
    "status": "SUCCESS",
    "additionalStatus": "AVAILABLE_DATA_RETRIEVED",
    "providerAccountId": 11301703,
    "fnToCall": "accountStatus"
}

{
    "providerId": 16441,
    "providerName": "Dag Site",
    "requestId": "X1Z72GLJBtFz2nT0Sc854n99Y0Y=",
    "status": "SUCCESS",
    "additionalStatus": "ACCT_SUMMARY_RECEIVED",
    "providerAccountId": 11301475,
    "fnToCall": "accountStatus"
}
*/
