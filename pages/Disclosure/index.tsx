import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ApplicationState } from "resources/js/store";
import { updateDisclosure, updateUser } from "../../store/auth/action";
import Header from "../Header";
import Signature from "./Signature";
import TermsAndConditions from "../../components/common/TermsAndConditions";
import { StateCheckbox } from "../../components/Checkbox/StateCheckbox";
import { downloadFile } from "../../util/helpers";

declare global {
    interface Window {
        MozBlob: any;
        WebKitBlob: any;
    }

    interface Navigator {
        msSaveBlob?: (blob: any, defaultName?: string) => boolean
    }
}

const SignatureWrapper: React.FC = (props: any) => {
    const user = useSelector((state: ApplicationState) => state.auth.user);
    const ref2 = React.useRef<HTMLDivElement>(null);
    const [signatureImage, setSignatureImage] = useState<
        string | null | undefined
    >(null);
    const [visible, setvisible] = useState<boolean>(false);
    const [readFlag, setReadFlag] = useState<boolean>(false);
    const [download, setDownload] = useState<boolean>(user?.disclosure_agreements?.download_status || false );
    const[reviewStatus, setReviewStatus] =  useState<boolean>(user?.disclosure_agreements?.review_status || false);
    const[agreeStatus, setAgreeStatus] =  useState<boolean>(user?.disclosure_agreements?.agree_status || false);
    const[saveAble, setSaveAble] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            if (!user.selected_plan?.plan_id) props.history.push("/pricing");
            // if(user.disclosure_agreements?.download_status && user.disclosure_agreements?.agree_status && user.disclosure_agreements?.signature_status){
            //     props.history.push('/');
            // }
            setSignatureImage(user.disclosure_agreements?.signature_image);
        }
    }, [user]);

    const downloadDoc = async () => {
        const save = document.createElement("a");
        await dispatch(updateDisclosure({ type: "download_status" }));
        setDownload(true);

        if (typeof save.download !== "undefined") {

            // if the download attribute is supported, save.download will return empty string, if not supported, it will return undefined
            // if you are using helper method, such as isNone in ember, you can also do isNone(save.download)
            fetch('/storage/pdf/disclosure.pdf', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/pdf',
                    },
                })
                .then((response) => response.blob())
                .then((blob) => {
                    // Create blob link to download
                    const disclosureBlob = new Blob([blob]);
                    downloadFile(disclosureBlob, "disclosure.pdf", "application/pdf");
                });

            // save.href = "storage/pdf/disclosure.pdf";
            // save.target = "_blank";
            // save.download = "disclosure";
            // save.dispatchEvent(new MouseEvent("click"));
        } else {
            window.location.href = "storage/pdf/disclosure.pdf"; // so that it opens new tab for IE11
        }
        // if (ref1.current) {
            //     await dispatch(updateDisclosure({ type: "download_status" }));
        //     ref1.current.click();
        // }
    };

    const reviewDoc = async () => {
        if (download && !reviewStatus) {
            setReviewStatus(true);
            await dispatch(updateDisclosure({ type: "review_status" }));
        }
    };

    const agreeTerms = async () => {
        if (
            download  && readFlag && !agreeStatus
        ) {
            setAgreeStatus(true);
            await dispatch(updateDisclosure({ type: "agree_status" }));
        }
    };    

    const uploadSignature = async () => {
        await dispatch(
            updateDisclosure({
                type: "signature_status",
                data: signatureImage,
            })
        );
    };

    const handleScroll = () => {
        if (ref2.current) {
            const { scrollTop, scrollHeight, clientHeight } = ref2.current;
            if (scrollTop + clientHeight >= scrollHeight-1) {
                setReadFlag(true);
            }               
        }
    };

    const handleChange = (e) => {
        dispatch(updateUser(user?.id, e));
    };

    const handleSubmit = (e) => {
        setSignatureImage(e);
        setvisible(false);
        setSaveAble(true);
    };

    return (
        <div className="w-full relative">
            <Header opacity={false} />
            <div className="w-full px-[24px] min-h-[100vh] relative font-Lato">
                <div className="w-full max-w-[476px] py-[90px] md:py-[125px] mx-auto">                   
                    
                    <div className="w-full text-[24px] md:text-[38px] text-center font-bold font-Lato mb-[24px] md:mb-[32px]">
                        Disclosures and E-signature
                    </div>
                    <div className="w-full mb-[24px]">
                        <button
                            className="w-full text-white text-[18px] flex justify-center py-[16px] px-[24px] bg-[#001F55] rounded-full"
                            onClick={() => {
                                downloadDoc();
                            }}
                        >
                            Download Disclosure
                            <img
                                src="assets/images/ico-download-white.svg"
                                alt="ico-download-white"
                                className="ml-[20px]"
                            />
                        </button>
                    </div>
                    <div
                        className={`w-full flex md:items-center mb-5 text-lg font-base ${
                            download
                                ? ""
                                : "text-gray-300"
                        }`}
                        onClick={() => {
                            reviewDoc();
                        }}
                    >
                        <input
                            type="checkbox"
                            className={`w-[32px] h-[32px] mr-[20px] form-checkbox bg-[#F7F9FC] text-[#0A2C75] border ${
                                download
                                    ? "border-[#181717]"
                                    : "border-[#DDE3F0]"
                            } rounded-[8px]`}
                            checked={reviewStatus}
                            disabled={
                                !download
                            }
                        />
                        <span
                            className={`cursor-pointer text-[16px] md:text-[20px] text-[#000714] font-Lato ${
                                download
                                    ? "opacity-100"
                                    : "opacity-30"
                            }`}
                        >
                            I have downloaded and reviewed the disclosures.
                        </span>
                    </div>
                    <div className="w-full mb-[24px]">
                        <TermsAndConditions
                            ref={ref2}
                            handleScroll={handleScroll}
                            user={user}
                        />
                    </div>
                    <div
                        className={`w-full flex items-center mb-5 text-lg font-lg ${
                            reviewStatus && readFlag
                                ? ""
                                : "text-gray-300"
                        }`}
                        onClick={() => {
                            agreeTerms();
                        }}
                    >
                        <input
                            type="checkbox"
                            className={`w-[32px] h-[32px] mr-[20px] form-checkbox bg-[#F7F9FC] text-[#0A2C75] border ${
                                reviewStatus && readFlag
                                    ? "border-[#181717]"
                                    : "border-[#DDE3F0]"
                            } rounded-[8px]`}
                            checked={agreeStatus && readFlag}
                            disabled={
                                !(
                                    reviewStatus && readFlag
                                )
                            }
                        />
                        <span
                            className={`cursor-pointer text-[16px] md:text-[20px] text-[#000714] font-Lato ${
                                reviewStatus && readFlag
                                    ? "opacity-100"
                                    : "opacity-30"
                            }`}
                        >
                            I agree to the terms and conditions
                        </span>
                    </div>
                    <div className="w-full text-base font-semibold p-[2px] mb-[24px]">
                        <span className="mb-5 text-[16px] md:text-[20px] text-[#000714] font-bold font-Lato">
                            State of residency
                        </span>
                        <StateCheckbox onChange={handleChange} />
                    </div>
                    <div className="w-full">
                        <span className="text-[14px] md:text-[16px] text-[#434A59] p-[12px]">
                            Signature
                        </span>
                        {signatureImage ? (
                            <img
                                src={signatureImage}
                                className="w-full mt-1"
                                onClick={() => setvisible(true)}
                            />
                        ) : (
                            <div
                                className={
                                    "w-full p-2 box-border bg-[#DDE3F0] rounded-[12px]"
                                }
                                onClick={() =>
                                    agreeStatus && setvisible(true)
                                }
                            >
                                <div
                                    className={`w-full max-w-[80px] px-[24px] py-[14px] rounded-[12px] text-center bg-white shadow-[0px_4px_32px_rgba(24,54,98,0.04)] ${
                                        agreeStatus ? "cursor-pointer" : "cursor-not-allowed"
                                    }`}
                                >
                                    <img
                                        src="assets/images/ico-download-blue.svg"
                                        alt="ico-download-blue"
                                    />
                                    <span
                                        className={
                                            "w-full text-center text-[16px] text-[#001F55]"
                                        }
                                    >
                                        Sign
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center justify-between gap-[12px] mt-[32px] md:mt-[40px]">
                            <Link
                                className="flex-1 text-[#001F55] text-[18px] text-center font-bold border border-[#001F55] px-[24px] py-[16px] rounded-full"
                                to="/forgot-password"
                            >
                                Cancel
                            </Link>
                            <button    
                                className="flex-1 flex justify-center items-center text-white text-[18px] font-bold bg-[#00BB7A] disabled:bg-[#7ea195] px-[24px] py-[16px] rounded-full border border-[#00BB7A] disabled:border-[#7ea195]"
                                onClick={() => uploadSignature()}
                                disabled={!saveAble}
                            >
                                Save&nbsp;&nbsp;
                                <img
                                    src="assets/images/ico-check-circle-white.svg"
                                    alt="ico-check-circle-white"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                {visible&&
                    <Signature
                        visible={visible}
                        closeModal={() => setvisible(false)}
                        handleSubmit={(e) => handleSubmit(e)}
                    ></Signature>                
                }                
            </div>
            <a
                href="storage/pdf/disclosure.pdf"
                id="docdown"
                className="hidden"
                download="disclosure.pdf"
            ></a>

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

export default SignatureWrapper;
