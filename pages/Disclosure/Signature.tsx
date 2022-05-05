import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { SharedFillButton } from "../../components/Buttons/SharedFillButton";
import { SharedOutlineButton } from "../../components/Buttons/SharedOutlineButton";
import { Toast } from "../../components/common/notification";
import { ApplicationState } from "resources/js/store";
import Close from "@2fd/ant-design-icons/lib/Close";
import Canvas from "./Canvas";

interface ComponentProps {
    visible: boolean;
    closeModal: () => void;
    handleSubmit: (image: string) => void;
}

const Signature: React.FC<ComponentProps> = (props) => {
    let user = useSelector((state: ApplicationState) => state.auth.user);
    const [name, setName] = useState<string>("");
    const [parentWidth, setParentWidt] = useState<number>(0);
    const [selectedSignature, setSelectedSignature] = useState<number>(0);
    const [signed,setSigned] = useState<boolean>(false);

    const parentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    useEffect(() => {
        if(parentRef.current){
            setParentWidt(parentRef.current.offsetWidth)
        }
    }, []);

    const handleSubmit = (dataUrl) => {
        if (name === "") {
            Toast("", "You need to input your name.", "danger");
        } else{
            props.handleSubmit(dataUrl);           
        }
    };

    const sign=()=>{
        if(selectedSignature == 0){
            Toast("", "Please select a style", "danger");
        } else {
            setSigned(true);
        }
    }

    return (
        <Transition appear show={props.visible} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={props.closeModal}
            >
                <div className="min-h-screen px-6 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-[#000714] opacity-80" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-[717px] px-6 py-10 overflow-hidden text-left align-middle transition-all transform bg-[#EEF1F8] shadow-xl rounded-[20px] relative">
                            <Close
                                className="absolute top-3 right-3 text-2xl text-[#434A59] leading-6"
                                onClick={props.closeModal}
                            />
                            <Dialog.Title
                                as="h3"
                                className="text-2xl leading-7 text-[#000714] font-bold"
                            >
                                E-sign
                            </Dialog.Title>
                            <div className="mt-8">
                                <div className="text-sm leading-4 pl-3 text-[#434A59] mb-[5px] after:content">
                                    Full Name
                                    <span className="text-[#BC012E]">*</span>
                                </div>
                                <input
                                    type="text"
                                    className="w-full outline-none border border-[#DDE3F0] rounded-xl px-5 py-4 text-base"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="text-lg leading-[22px] font-bold mt-6">
                                Select style
                            </div>
                            <div className="mt-3">
                                <div className="text-sm leading-4 pl-3 text-[#434A59] mb-[5px]">
                                    Preview
                                </div>
                                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 bg-white border border-[#DDE3F0] rounded-xl px-[60px] py-3 sm:p-[10px]">
                                    <div ref={parentRef}>
                                        <Canvas 
                                            className ={selectedSignature == 1?"border-2 border-[#f00] rounded-lg cursor-pointer":"cursor-pointer"}
                                            font="'Great Vibes', cursive" width={parentWidth} height={96} fontSize={30} name = {name !== ""? name: "Signature"}
                                            convetToImage={(dataUrl)=>handleSubmit(dataUrl)}   
                                            setSelectedSignature={()=>{setSelectedSignature(1)}} 
                                            convert = {signed && selectedSignature == 1? true:false}
                                        />
                                    </div>
                                    <div>
                                        <Canvas className ={selectedSignature == 2?"border-2 border-[#f00] rounded-lg cursor-pointer":" cursor-pointer"}
                                            font="'Homemade Apple', cursive" width={parentWidth} height={96} fontSize={20} name = {name !== ""? name: "Signature"}
                                            convetToImage={(dataUrl)=>handleSubmit(dataUrl)}
                                            setSelectedSignature={()=>{setSelectedSignature(2)}} 
                                            convert = {signed && selectedSignature == 2? true:false}
                                        />
                                    </div>
                                    <div>
                                        <Canvas className ={selectedSignature == 3?"border-2 border-[#f00] rounded-lg cursor-pointer":" cursor-pointer"}
                                            font="'WindSong', cursive" width={parentWidth} height={96} fontSize={20}  name = {name !== ""? name: "Signature"}
                                            convetToImage={(dataUrl)=>handleSubmit(dataUrl)}  
                                            setSelectedSignature={()=>{setSelectedSignature(3)}} 
                                            convert = {signed && selectedSignature == 3? true:false}
                                        />
                                    </div>                                    
                                </div>
                            </div>
                            <div className="flex justify-between gap-4 mt-8">
                                <SharedOutlineButton className="w-full flex justify-center text-lg font-bold py-4 gap-2" pill={true} onClick={props.closeModal} >
                                    Cancel
                                </SharedOutlineButton>
                                <SharedFillButton className="w-full flex justify-center text-lg font-bold py-4 gap-2" pill={true} onClick={()=>sign()} >
                                    Sign
                                </SharedFillButton>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Signature;
