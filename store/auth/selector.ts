import { ApplicationState } from "../../store";

export const getPlaidAccounts = (state: ApplicationState) => {
    return state.bank_plaid.savedAccounts.sort((a, b) => {
        return (
            b.balances.current -
            Math.floor(b.balances.current) -
            (a.balances.current - Math.floor(a.balances.current))
        );
    });
};
