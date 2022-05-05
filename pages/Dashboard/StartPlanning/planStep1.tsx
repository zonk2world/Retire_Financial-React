import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import ArrowRight from "@2fd/ant-design-icons/lib/ArrowRight";
import ArrowLeft from "@2fd/ant-design-icons/lib/ArrowLeft";

import InputMask from "react-input-mask";

const formSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    DOB: Yup.date().required("DOB is required"),
    employer: Yup.string(),
    employmentIncome: Yup.number(),
    firstname2: Yup.string(),
    lastname2: Yup.string(),
    phoneNumber2: Yup.string(),
    DOB2: Yup.date(),
    employer2: Yup.string(),
    employmentIncome2: Yup.number(),
});

const initialValues = {
    firstname: "",
    lastname: "",
    phoneNumber: "",
    DOB: "",
    employer: "",
    employmentIncome: "",
    firstname2: "",
    lastname2: "",
    phoneNumber2: "",
    DOB2: "",
    employer2: "",
    employmentIncome2: "",
};

interface ComponentProps {
    handleNext?: (arg: any) => void;
    hidden?: boolean | undefined;
}

const PlanStep1: React.FC<ComponentProps> = ({ handleNext, hidden }) => {
    const [documents, setDocuments] = useState({});
    const formik = useFormik({
        validationSchema: formSchema,
        initialValues: initialValues,
        onSubmit: (value) => {
            let tempDocs = {};
            Object.keys(documents).map((key) => {
                Object.keys(documents[key]).map((fileKey, index) => {
                    tempDocs[`${key}[${index}]`] = documents[key][fileKey];
                });
            });
            if (handleNext) {
                handleNext({ ...value, ...tempDocs });
            }
        },
    });

    const changeFormFields = (key, e) => {
        if (e.target.files.length) {
            let tempDocuments = { ...documents };
            tempDocuments[key] = e.target.files;
            setDocuments(tempDocuments);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} className="w-full" hidden={hidden}>
            <div className="text-[23px] text-[#000714] font-bold pb-[12px]">
                Complete your profile
            </div>
            <div className="text-[18px] text-[#434A59] leading-[30px] pb-[32px]">
                To prepare for the meeting with your advisor, lets get to know
                you better.
            </div>

            <div className="text-[18px] text-[#000714] font-bold pb-[16px] border-b border-[#DDE3F0]">
                Personal information
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 py-[16px]">
                <div>
                    <label
                        htmlFor="firstname"
                        className="w-full text-[16px] text-[#434A59] pl-[10px]"
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        className="w-full mt-1 bg-white border border-[#DDE3F0] px-[24px] py-[12px] rounded-[12px] text-[20px]"
                        id="firstname"
                        placeholder="First name"
                        {...formik.getFieldProps("firstname")}
                    ></input>
                    {formik.errors.firstname ? <div className="ml-3 text-[#F11940]">{formik.errors.firstname}</div> : null}
                </div>
                <div>
                    <label
                        htmlFor="firstname2"
                        className="w-full text-[16px] text-[#434A59] pl-[10px]"
                    >
                        First Name - Client 2
                    </label>
                    <input
                        type="text"
                        className="w-full mt-1 bg-white border border-[#DDE3F0] px-[24px] py-[12px] rounded-[12px] text-[20px]"
                        id="firstname2"
                        placeholder="First Name - Client 2"
                        {...formik.getFieldProps("firstname2")}
                    ></input>
                </div>
            </div>
            <div className="w-full mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="lastname"
                        className="w-full text-[16px] text-[#434A59] pl-[10px]"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="w-full mt-1 bg-white border border-[#DDE3F0] px-[24px] py-[12px] rounded-[12px] text-[20px]"
                        id="lastname"
                        placeholder="Last Name"
                        {...formik.getFieldProps("lastname")}
                    ></input>
                    {formik.errors.lastname ? <div className="ml-3 text-[#F11940]">{formik.errors.lastname}</div> : null}
                </div>
                <div>
                    <label
                        htmlFor="lastname2"
                        className="w-full text-[16px] text-[#434A59] pl-[10px]"
                    >
                        Last Name - Client 2
                    </label>
                    <input
                        type="text"
                        className="w-full mt-1 bg-white border border-[#DDE3F0] px-[24px] py-[12px] rounded-[12px] text-[20px]"
                        id="lastname2"
                        placeholder="Last Name - Client 2"
                        {...formik.getFieldProps("lastname2")}
                    ></input>
                </div>
            </div>
            <div className="w-full mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="phoneNumber"
                        className="w-full text-[16px] text-[#434A59] pl-[10px]"
                    >
                        Phone Number
                    </label>
                    <div className="flex items-center bg-white rounded-[12px] border border-[#DDE3F0] p-[5px] mt-1">
                        <div className="w-[46px] h-[46px] flex items-center justify-center text-[20px] text-[#000714] bg-[#EEF1F8] rounded-[8px]">
                            +1
                        </div>
                        <InputMask
                            mask="***-***-****"
                            className="w-full mt-1"
                            {...formik.getFieldProps("phoneNumber")}
                            maskChar=""
                        >
                            {(inputProps: any) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    onClick={(e) => e.preventDefault()}
                                    className="w-full text-[20px] border-0 px-[24px] py-0 outline-none"
                                    style={{ boxShadow: "none" }}
                                    id="phoneNumber"
                                    placeholder="000-000-0000"
                                />
                            )}
                        </InputMask>
                    </div>
                    {formik.errors.phoneNumber ? <div className="ml-3 text-[#F11940]">{formik.errors.phoneNumber}</div> : null}
                </div>
                <div>
                    <label
                        htmlFor="phoneNumber2"
                        className="w-full text-[16px] text-[#434A59] pl-[10px]"
                    >
                        Phone Number - Client 2
                    </label>
                    <div className="flex items-center bg-white rounded-[12px] border border-[#DDE3F0] p-[5px] mt-1">
                        <div className="w-[46px] h-[46px] flex items-center justify-center text-[20px] text-[#000714] bg-[#EEF1F8] rounded-[8px]">
                            +1
                        </div>
                        <InputMask
                            mask="***-***-****"
                            className="w-full mt-1"
                            {...formik.getFieldProps("phoneNumber2")}
                            maskChar=""
                        >
                            {(inputProps: any) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    onClick={(e) => e.preventDefault()}
                                    className="w-full text-[20px] border-0 px-[24px] py-0 outline-none"
                                    style={{ boxShadow: "none" }}
                                    id="phoneNumber2"
                                    placeholder="000-000-0000"
                                />
                            )}
                        </InputMask>
                    </div>
                </div>
            </div>
            <div className="w-full mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="DOB"
                        className="w-full text-[16px] text-[#434A59] pl-[10px]"
                    >
                        Date Of Birth
                    </label>
                    <div className="flex items-center bg-white rounded-[12px] border border-[#DDE3F0] px-[24px] py-[12px] mt-1">
                        <InputMask
                            mask="99/99/9999"
                            className="w-full mt-1"
                            {...formik.getFieldProps("DOB")}
                            maskChar=""
                        >
                            {(inputProps: any) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    onClick={(e) => e.preventDefault()}
                                    className="w-full text-[20px] border-0 px-0 py-0 outline-none"
                                    id="DOB"
                                    placeholder="DD / MM / YYYY"
                                />
                            )}
                        </InputMask>
                        <img
                            src="assets/images/ico-calendar.svg"
                            alt="ico-calendar"
                        />
                    </div>
                    {formik.errors.DOB ? <div className="ml-3 text-[#F11940]">{formik.errors.DOB}</div> : null}
                </div>
                <div>
                    <label
                        htmlFor="DOB2"
                        className="w-full text-[16px] text-[#434A59] pl-[10px]"
                    >
                        Date Of Birth - Client 2
                    </label>
                    <div className="flex items-center bg-white rounded-[12px] border border-[#DDE3F0] px-[24px] py-[12px] mt-1">
                        <InputMask
                            mask="99/99/9999"
                            className="w-full mt-1"
                            {...formik.getFieldProps("DOB2")}
                            maskChar=""
                        >
                            {(inputProps: any) => (
                                <input
                                    {...inputProps}
                                    type="text"
                                    onClick={(e) => e.preventDefault()}
                                    className="w-full text-[20px] border-0 px-0 py-0 outline-none"
                                    id="DOB2"
                                    placeholder="DD / MM / YYYY"
                                />
                            )}
                        </InputMask>
                        <img
                            src="assets/images/ico-calendar.svg"
                            alt="ico-calendar"
                        />
                    </div>
                    {formik.errors.DOB2 ? <div className="ml-3 text-[#F11940]">{formik.errors.DOB2}</div> : null}
                </div>
            </div>
            <div className="w-full mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="employer"
                        className="w-full text-[16px] text-[#434A59] pl-[10px]"
                    >
                        Employer
                    </label>
                    <input
                        type="text"
                        className="w-full mt-1 bg-white border border-[#DDE3F0] px-[24px] py-[12px] rounded-[12px] text-[20px]"
                        id="employer"
                        placeholder="Employer"
                        {...formik.getFieldProps("employer")}
                    ></input>
                </div>
                <div>
                    <label
                        htmlFor="employer2"
                        className="w-full text-[16px] text-[#434A59] pl-[10px]"
                    >
                        Employer - Client 2
                    </label>
                    <input
                        type="text"
                        className="w-full mt-1 bg-white border border-[#DDE3F0] px-[24px] py-[12px] rounded-[12px] text-[20px]"
                        id="employer2"
                        placeholder="Employer - Client 2"
                        {...formik.getFieldProps("employer2")}
                    ></input>
                </div>
            </div>
            <div className="w-full mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="employmentIncome"
                        className="w-full text-[16px] text-[#434A59] pl-[10px]"
                    >
                        Employment Income
                    </label>
                    <input
                        type="number"
                        className="w-full mt-1 bg-white border border-[#DDE3F0] px-[24px] py-[12px] rounded-[12px] text-[20px]"
                        id="employmentIncome"
                        placeholder="Employment Income"
                        {...formik.getFieldProps("employmentIncome")}
                    ></input>
                </div>
                <div>
                    <label
                        htmlFor="employmentIncome2"
                        className="w-full text-[16px] text-[#434A59] pl-[10px]"
                    >
                        Employment Income - Client 2
                    </label>
                    <input
                        type="number"
                        className="w-full mt-1 bg-white border border-[#DDE3F0] px-[24px] py-[12px] rounded-[12px] text-[20px]"
                        id="employmentIncome2"
                        placeholder="Employment Income - Client 2"
                        {...formik.getFieldProps("employmentIncome2")}
                    ></input>
                </div>
            </div>
            <div className="w-full mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="paystubUpload"
                        className="w-full text-[16px] text-[#434A59] pl-[10px]"
                    >
                        Paystub Upload
                    </label>
                    <div className="pt-[16px]">
                        <input
                            type="file"
                            className="w-full"
                            id="paystubUpload"
                            onChange={(e) => {
                                changeFormFields("paystubUpload", e);
                            }}
                            hidden
                        ></input>
                        <label
                            htmlFor="paystubUpload"
                            className="text-white text-[18px] font-bold bg-[#001F55] whitespace-nowrap px-[24px] py-[12px] rounded-full mr-[20px]"
                        >
                            Choose File&nbsp;&nbsp;&#183;&#183;
                        </label>
                        <span className="text-[20px] text-[#434A59]">
                            {documents["paystubUpload"]
                                ? documents["paystubUpload"][0].name
                                : "No file chosen"}
                        </span>
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="paystubUpload2"
                        className="w-full text-[16px] text-[#434A59] pl-[10px]"
                    >
                        Paystub Upload - Client 2
                    </label>
                    <div className="pt-[16px]">
                        <input
                            type="file"
                            className="w-full"
                            id="paystubUpload2"
                            onChange={(e) => {
                                changeFormFields("paystubUpload2", e);
                            }}
                            hidden
                        ></input>
                        <label
                            htmlFor="paystubUpload2"
                            className="text-white text-[18px] font-bold bg-[#001F55] whitespace-nowrap px-[24px] py-[12px] rounded-full mr-[20px]"
                        >
                            Choose File&nbsp;&nbsp;&#183;&#183;
                        </label>
                        <span className="text-[20px] text-[#434A59]">
                            {documents["paystubUpload2"]
                                ? documents["paystubUpload2"][0].name
                                : "No file chosen"}
                        </span>
                    </div>
                </div>
            </div>
            <div
                className={`w-full py-[16px] flex justify-end border-t border-[#DDE3F0]`}
            >
                <button
                    className="text-white text-[18px] font-bold bg-[#001F55] whitespace-nowrap px-[24px] py-[12px] rounded-full
                                flex items-center justify-center h-[60px] min-w-[160px]"
                    type="submit"
                >
                    Next
                    <ArrowRight className="ml-3" />
                </button>
            </div>
        </form>
    );
};

export default PlanStep1;
