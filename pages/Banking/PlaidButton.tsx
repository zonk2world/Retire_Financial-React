import React from "react";
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from "react-plaid-link";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "resources/js/store";
import { addAccount } from "../../store/banking/plaid/action";
import { Toast } from "../../components/common/notification";

const PlaidButton: React.FC = () => {

    const dispatch = useDispatch();
    const linkToken = useSelector((state: ApplicationState) => state.bank_plaid.linkToken);
    const tokens = useSelector((state:ApplicationState) => state.bank_plaid.tokens);

    const onSuccess = (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
        if(!tokens.find((e) => e === public_token)) {
            dispatch(addAccount({token: public_token, accounts: metadata.accounts}));
        } else {
            Toast('', 'That account is already in list.', 'danger');
        }
    };
    
    const config: Parameters<typeof usePlaidLink>[0] = {
        token: linkToken!,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <button
            className="h-11 w-full flex justify-center items-center font-semibold text-lg text-white bg-[#0A2C75] hover:bg-[#133FA4] px-6 mb-5"
            onClick={() => open()}
            disabled={!ready}
        >
            Add Plaid Account
        </button>
    );
};

export default PlaidButton;
