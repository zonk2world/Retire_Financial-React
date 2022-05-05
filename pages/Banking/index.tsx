import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateToken as generatePlaidToken } from "../../store/banking/plaid/action";
import { generateToken as generateYodleeToken } from "../../store/banking/yodlee/action";
import { ApplicationState } from "resources/js/store";
import Header from "../Header";
import PlaidButton from "./PlaidButton";
import YodleeButton from "./YodleeButton";
import { updateBankingAccessToken } from "../../store/auth/action";

const Banking: React.FC = () => {
  const dispatch = useDispatch();

  const PlaidBackend = useSelector((state:ApplicationState) => state.bank_plaid.backend);
  const PlaidLinkToken = useSelector((state:ApplicationState) => state.bank_plaid.linkToken);
  const PlaidTokens = useSelector((state:ApplicationState) => state.bank_plaid.tokens);
  const PlaidAccounts = useSelector((state:ApplicationState) => state.bank_plaid.accounts);

  const YodleeBackend = useSelector((state:ApplicationState) => state.bank_yodlee.backend);
  const YodleeLinkToken = useSelector((state:ApplicationState) => state.bank_yodlee.linkToken);
  const YodleeTokens = useSelector((state:ApplicationState) => state.bank_yodlee.tokens);
  const YodleeAccounts = useSelector((state:ApplicationState) => state.bank_yodlee.accounts);

  const [visible, setVisible] = React.useState(false);

  const showModal = (flag:boolean = true) => {
    setVisible(flag);
  };

  useEffect(() => {
    const init = async () => {
      dispatch(generatePlaidToken());
      dispatch(generateYodleeToken());
    };
    init();
  }, []);

  return (
    <div className="w-full pt-32">
      <Header opacity={false} />
      <div id="bank_container" className="w-full px-0 md:px-[10%] pt-11 pb-[130px] mt-[50px] bg-[#F3F5F9]">
        <div
          className="w-[630px] px-[60px]  bg-white py-[50px] mx-auto"
          style={{ boxShadow: "0px 0px 20px 0px #80808024" }}
        >
          <div className="text-2xl font-medium w-full text-left mb-[30px] font-Karla">
            Add Accounts
          </div>
          <div className="my-5 text-lg font-medium w-full">
            Please add all relevant accounts so we can understand your financial picture.
          </div>
          {PlaidAccounts.length > 0 &&
            <div className="w-full mt-2 mb-10">
              <p className="text-lg">Plaid Accounts</p>
              {PlaidAccounts.map((account, index) => {
                return <div className="w-full my-2" key={index}>
                  {`${account.name} Account: ${account.mask}`}
                </div>
              })}
            </div>
          }
          {YodleeAccounts.length > 0 &&
            <div className="w-full mt-2 mb-10">
              <p className="text-lg">Yodlee Accounts</p>
              {YodleeAccounts.map((account, index) => {
                return <div className="w-full my-2" key={index}>
                  {`${account.accountName} Account: ${account.balance.amount}${account.balance.currency}`}
                </div>
              })}
            </div>
          }
          {!PlaidLinkToken && !YodleeLinkToken ? (
            <button key="disabled-link-button"
              className="h-11 w-full flex justify-center items-center font-semibold text-lg text-white bg-[#0A2C75] px-6 mb-5"
              disabled={PlaidBackend}
            >
              {PlaidBackend && YodleeBackend ? "Loading..." : "Launch Link"}
            </button>
          ) : (<>
                {PlaidLinkToken ? <PlaidButton /> : <></>}
                {YodleeLinkToken ? <YodleeButton showModal={showModal} /> : <></>}
              </>
          )}
          {PlaidBackend && YodleeBackend &&
            <div className="w-full p-4 bg-[#d9edf6] border border-[#bae9ff] text-[#1388b7] text-lg rounded-lg mb-5">
              When you click this button, you will see a popup where you can add one of your financial accounts. We user a third party payment integration system called Plaid.
            </div>
          }
          <div className="w-full flex justify-end">
            {PlaidAccounts.length > 0  || YodleeAccounts.length > 0 ?
              <button
                className="h-11 flex justify-center items-center font-semibold text-lg text-white bg-[#0A2C75] hover:bg-[#133FA4] px-6 mb-5"
                onClick={() => {
                  dispatch(updateBankingAccessToken(PlaidTokens, YodleeTokens));
                }}
              >
                Continue
              </button>
              :
              <button
                className="h-11 flex justify-center items-center font-semibold text-lg text-white bg-[#0A2C75] hover:bg-[#133FA4] px-6 mb-5"
                onClick={() => {
                  dispatch(updateBankingAccessToken(PlaidTokens, YodleeTokens));
                }}
              >
                Skip
              </button>
            }
          </div>
        </div>
      </div>
      <div id="YodleeModel"></div>
    </div>
  );
};

export default Banking;
