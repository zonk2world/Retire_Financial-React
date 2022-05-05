import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Header from "../Header";
import { Upload } from "antd";
import { get_file } from "../../..//util/s3getfile";
import {
    addDocument,
    getDocuments,
    deleteDocument,
    updateDocument,
} from "../../../store/auth/action";
import { ApplicationState } from "../../../store";
import Pencil from "@2fd/ant-design-icons/lib/Pencil";
import CloseCircle from "@2fd/ant-design-icons/lib/CloseCircle";
import { filename, fileExtension } from "../../../util/helpers";

const { Dragger } = Upload;

const Documents: React.FC = () => {
    const [editable, setEditable] = useState<boolean | number>(false);

    const documents = useSelector(
        (state: ApplicationState) => state.auth.documents
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDocuments());
    }, []);

    const uploadFile = (e) => {
        let formdata = new FormData();
        formdata.append("file", e.file);
        dispatch(addDocument(formdata));
    };

    const downloadOrPreview = async (url: string, filename: string) => {
        let dataUrl = await get_file(url);
        let aTag = document.createElement("a");
        aTag.setAttribute("href", dataUrl);
        aTag.setAttribute("download", filename);
        aTag.setAttribute("target", "_blank");
        document.getElementById("app")?.appendChild(aTag);
        aTag.click();
        aTag.remove();
    };

    const openDialog = () => {
        if (document.querySelectorAll('[type="file"]').length > 0) {
            let element: any = document.querySelectorAll('[type="file"]')[0];
            element.click();
        }
    };

    const handleEditClick = (key) => {
        var element = document.getElementById(`filename-${key}`);
        setTimeout(function () {
            element?.focus();
            if (element) setCursorToEnd(element);
        }, 0);
        setEditable(key);
    };

    const handleDelete = (doc_id: number) => {
        dispatch(deleteDocument(doc_id));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (e.keyCode === 13) {
            handleUpdateDocument();
            e.preventDefault();
        }
    };

    const handleUpdateDocument = () => {
        let index = typeof editable == "number" ? editable : 0;
        let currentDocument = documents[index];
        let updatedFileName = document.getElementById(
            `filename-${editable}`
        )?.innerText;
        if (updatedFileName != "") {
            setEditable(false);

            dispatch(
                updateDocument({
                    ...currentDocument,
                    file_name: `${updatedFileName}.${fileExtension(
                        currentDocument.file_name
                    )}`,
                })
            );
        }
    };
    function setCursorToEnd(ele: HTMLElement) {
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(ele, 1);
        range.collapse(true);
        if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
        ele.focus();
    }

    return (
        <div className="w-full relative pt-[60px] md:pt-[142px] pb-10 px-0 md:px-[60px] min-h-screen">
            <Header title="Documents" />
            <div className="px-6 md:px-0 mt-3 md:mt-0">
                <Dragger
                    name="file"
                    multiple={true}
                    openFileDialogOnClick={false}
                    showUploadList={false}
                    style={{
                        border: "1px dashed #A2ACBE",
                        borderRadius: isMobile ? 12 : 20,
                        padding: isMobile ? 24 : 32,
                        background: "#F7F9FC",
                    }}
                    customRequest={uploadFile}
                >
                    <div
                        className="w-full flex gap-5 items-center md:justify-center"
                        id="file_upload_container"
                    >
                        <img
                            src="assets/images/upload.svg"
                            alt="Upload"
                            className="w-8 h-8"
                        />
                        <div className="text-black flex text-base md:text-xl gap-[6px] leading-8 font-normal">
                            <span className="hidden md:block">
                                Drag and drop files here, or
                            </span>
                            <div
                                className=" text-transparent bg-clip-text bg-gradient-to-br from-[#4D7EF2] to-[#5FD4F4]"
                                onClick={() => openDialog()}
                            >
                                <span className="bg-underline-text bg-no-repeat bg-underline-text-size bg-bottom">
                                    {isMobile
                                        ? "Upload your file"
                                        : "Browse files"}
                                </span>
                            </div>
                        </div>
                    </div>
                </Dragger>
                <div className="text-base md:text-xl leading-8 text-[#000714] mt-5 md:mt-8">
                    Recent documents
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-3 md:mt-6">
                    {documents.map((document, key) => (
                        <>
                            <ContextMenuTrigger id={`contextmenu-${key}`}>
                                <div
                                    className="px-6 py-4 md:py-5 rounded-xl md:rounded-2xl bg-white relative"
                                    key={key}
                                >
                                    <CloseCircle
                                        className="absolute flex justify-start items-center top-0 right-0 text-2xl leading-6 text-gray-500"
                                        onClick={() =>
                                            handleDelete(document.id)
                                        }
                                    />
                                    <div
                                        className="flex items-center gap-4 cursor-pointer"
                                        onClick={() => {
                                            if (editable !== key)
                                                downloadOrPreview(
                                                    document.file_path,
                                                    document.file_name
                                                );
                                        }}
                                    >
                                        <img
                                            src="assets/images/document.svg"
                                            alt="document"
                                        />
                                        <span
                                            contentEditable={editable === key}
                                            id={`filename-${key}`}
                                            className={`${
                                                editable === key
                                                    ? "overflow-x-auto w-full whitespace-nowrap no-scrollbar"
                                                    : "truncate"
                                            } text-base md:text-lg outline-none text-[#000714]`}
                                            onKeyDown={(e) => handleKeyDown(e)}
                                            onBlur={() => {
                                                if (editable === key)
                                                    handleUpdateDocument();
                                            }}
                                        >
                                            {editable === key
                                                ? filename(document.file_name)
                                                : document.file_name}
                                        </span>
                                    </div>
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenu
                                id={`contextmenu-${key}`}
                                className="bg-white py-1"
                            >
                                <MenuItem
                                    className="flex items-center gap-2 text-base text-[#000714] py-3 px-2 hover:bg-[#f5f5f5] cursor-pointer"
                                    onClick={() => handleEditClick(key)}
                                >
                                    <Pencil />
                                    Edit
                                </MenuItem>
                            </ContextMenu>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Documents;
