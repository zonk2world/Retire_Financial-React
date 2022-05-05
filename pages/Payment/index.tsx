import React, { useEffect, useRef, useState } from "react";
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { isMobile } from "react-device-detect";

import Header from "../Header";
import { choosePlanAgain, createSubscription, sendCouponCode } from "../../store/auth/action";

import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "resources/js/store";
import ArrowLeft from "@2fd/ant-design-icons/lib/ArrowLeft";


var couponChanged = false;

const Princing: React.FC = (props: any) => {
    const stripe = useStripe();
    const couponRef = useRef<HTMLInputElement>(null);
    const elements = useElements();
    const dispatch = useDispatch();
    
    const [paymentRequest, setPaymentRequest] = useState<any>();     

    const selectedPlan = useSelector(
        (state: ApplicationState) => state.auth.user?.selected_plan
    );
    const current_plan = useSelector(
        (state: ApplicationState) => state.auth.user?.current_plan
    );
    const paymentMethod = useSelector(
        (state: ApplicationState) => state.auth.user?.paymentMethod
    );
    const couponData = useSelector(
        (state:ApplicationState)=>state.auth.coupon_data
    )
    const handleSubmit = async () => {
        // if(couponChanged){
        //     dispatch(sendCouponCode(couponRef.current?.value));
        //     couponChanged = false;
        // }
        if (elements && stripe) {
            const card = elements.getElement(CardElement);
            if (card) {
                const tokenResult = await stripe.createToken(card);
                const result = await stripe.createPaymentMethod({
                    type: "card",
                    card: { token: tokenResult.token?.id as string },
                });
                dispatch(createSubscription(result.paymentMethod?.id, couponData?.id));
            }
        }
    };


    const choosePlan=() => {
        dispatch(choosePlanAgain());
    }

    const enterCouponCode=(e)=>{
        if (e.keyCode === 13) {
            dispatch(sendCouponCode(e.target.value));
            couponChanged = false;
        }
    }

    const calculateAmoutDue=()=>{
        if(selectedPlan?.plan){
            if(couponData){
                return selectedPlan.plan.amount * (100-couponData.percent_off)/100
            }else{
                return selectedPlan.plan.amount
            }
        }
        return 0;
    }

    const handleClickOutside=(e)=>{
        if(!couponChanged)
            return;
        if (!couponRef?.current?.contains(e.target)) {            
            dispatch(sendCouponCode(couponRef.current?.value));
          }
        couponChanged = false;
    }   

    const handleCouponChange=(e)=>{
        if(e.target.value == "")
            couponChanged = false;
        else
            couponChanged = true;
    }

    useEffect(() => {
        let habspotEl: HTMLElement | null;

        document.addEventListener("mousedown",handleClickOutside);

        setTimeout(() => {
            habspotEl = document.getElementById(
                "hubspot-messages-iframe-container"
            );
            if (isMobile && habspotEl)
                habspotEl.style.cssText = "display: none !important;";
        }, 1500);

        return () => {
            if (isMobile && habspotEl)
                habspotEl.style.cssText =
                    "display: block !important;width: 100px; height: 96px;";
        };
    }, []);

    useEffect(() => {
        if (!selectedPlan) {
            if (current_plan) {
                props.history.push("/");
            } else {
                props.history.push("/pricing");
            }
        }
    }, [selectedPlan]);

    useEffect(() => {
        
        if (stripe) {
          const pr = stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
              label: 'RetireUs',
              amount: calculateAmoutDue(),
            },
            requestPayerName: true,
            requestPayerEmail: true,
          });
          console.log("pay amount->", calculateAmoutDue());
          // Check the availability of the Payment Request API.
          pr.canMakePayment().then(result => {
            console.log("canMakePayment result-- >", result);
            if (result) {
              setPaymentRequest(pr);
            }
          });

          pr.on('paymentmethod', async (e) => {
            dispatch(createSubscription(e.paymentMethod.id, couponData?.id));
          });
        }
      }, [stripe, couponData]);

    return (
        <div className="w-full min-h-[100vh] relative">
            <Header opacity={false} />

            <div className="w-full max-w-[448px] mx-auto py-[90px] md:py-[125px] px-[24px]">
                <div className="text-center text-[24px] md:text-[36px] text-[#000714] font-Lato font-bold pb-[32px]">
                    Payment info
                </div>
                <div className="w-full text-base font-medium p-[2px] mb-[40px]">
                    <label htmlFor="couponCode" className="w-full text-[16px] text-[#434A59] pl-[10px]">
                        Coupon Code <span>*</span>
                    </label>
                    <input id="couponCode" ref={couponRef} type="text" placeholder="Coupon Code"
                        className="w-full mt-1 bg-white outline-none border border-[#DDE3F0] focus:border-[#FAA942] px-[24px] py-[12px] rounded-[12px]"
                        onKeyUp={enterCouponCode}
                        onChange={handleCouponChange}
                    />
                </div>

                <div className="w-full px-[24px] py-[12px] bg-[#FFE9CE] border border-[#FAA942] rounded-[12px] text-[#000714] text-[20px] flex items-center justify-between mb-[32px]">
                    <span>Amount due today:</span>
                    <span className="font-bold">${calculateAmoutDue()}</span>
                </div>

                <>
                    <div className="w-full text-base font-medium p-[2px] mb-[40px]">
                        <span className="w-full text-[16px] text-[#434A59] pl-[10px]">
                            Card Info<span>*</span>
                        </span>
                        <div className="w-full mt-1 bg-white border border-[#DDE3F0] px-[24px] py-[12px] rounded-[12px]">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: "20px",
                                            color: "#000714",
                                            "::placeholder": {
                                                color: "#A2ACBE",
                                            },
                                        },
                                        invalid: {
                                            color: "#9e2146",
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </>

                {paymentRequest && <PaymentRequestButtonElement className="w-full" options={{paymentRequest}} /> }
                <div className="flex justify-between">
                    <button
                        className="flex items-center justify-center w-full max-w-[160px] text-[18px] font-bold text-[#001F55] py-[12px] rounded-full border border-[#001F55]"
                        onClick={() => {
                            choosePlan();
                        }}
                        type="button"
                    >
                        <ArrowLeft className="mr-3" />
                        Choose Plan
                    </button>
                    <button                       
                        className="w-full max-w-[160px] h-auto text-white text-[18px] font-bold bg-[#001F55]  py-[12px] rounded-full"
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Join Plan&nbsp;&nbsp;&#183;&#183;
                    </button>
                </div>

                <div className="w-full py-[12px] px-[24px] bg-[#F7F9FC] border border-[#DDE3F0] text-[#434A59] text-[16px] leading-[24px] rounded-[12px] mt-[40px]">
                    We do not store your card in our own database. We use
                    stripe.js so your card info is sent securately to Stripe and
                    token is returned.
                </div>
            </div>

            <img
                src="assets/images/signup-texture.png"
                alt="texture"
                className="absolute left-0 bottom-0 hidden md:block"
            />
            <img
                src="assets/images/ico-ellipse.svg"
                alt="ico-ellipse"
                className="absolute left-[5%] bottom-[50%] hidden md:block"
            />
            <img
                src="assets/images/ico-ellipse.svg"
                alt="ico-ellipse"
                className="absolute right-[5%] top-[20%] hidden md:block"
            />
        </div>
    );
};

export default Princing;
