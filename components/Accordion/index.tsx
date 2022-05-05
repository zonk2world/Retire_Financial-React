import React from "react";
import { Disclosure } from "@headlessui/react";

import { TextSubitle, TextNormal } from "../../components/Typographies";

interface IAccordionContent {
    category: string;
    faqs: { title: string; summaries: string[] }[];
}

interface IAccordionProps {
    contents: IAccordionContent[];
}

const Accordion = ({ contents }: IAccordionProps) => {
    return (
        <div className="border-t border-[#DDE3F0]">
            {contents.map((c) => (
                <div className="border-b border-[#DDE3F0]" key={c.category}>
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex justify-between items-center w-full px-6 pt-4 pb-3 md:px-0 md:py-5 text-left focus:outline-none">
                                    <TextSubitle className="w-full">
                                        { c.category }
                                    </TextSubitle>
                                    <div className="w-8 md:w-12 ml-1">
                                        {open ? (
                                            <img
                                                src="assets/images/ico-minus-circle-blue.svg"
                                                alt="ico-minus-circle-blue"
                                                className="w-full"
                                            />
                                        ) : (
                                            <img
                                                src="assets/images/ico-plus-circle-orange.svg"
                                                alt="ico-plus-circle-orange"
                                                className="w-full"
                                            />
                                        )}
                                    </div>
                                </Disclosure.Button>
                                <Disclosure.Panel className="relative md:px-0 bg-[#F7F9FC] border-t border-[#DDE3F0]">
                                    {c.faqs.map((f) => (
                                        <div
                                            className="border-b border-[#DDE3F0] md:pl-24"
                                            key={f.title}
                                        >
                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <Disclosure.Button className="flex justify-between items-center w-full px-6 pt-4 pb-3 md:px-0 md:py-5 text-left focus:outline-none">
                                                            <div className="flex items-center justify-between w-full">
                                                                <div className="flex items-start gap-6 md:gap-[60px]">
                                                                    <img
                                                                        src="assets/images/ico-double-dot-blue.svg"
                                                                        className="mt-3"
                                                                        alt="ico-double-dot-blue"
                                                                    />
                                                                    <TextNormal className="w-full text-base md:text-xl font-bold">
                                                                        { f.title }
                                                                    </TextNormal>
                                                                </div>
                                                                <div className="w-3 mx-2 md:mx-4">
                                                                    {open ? (
                                                                        <img
                                                                            src="assets/images/ico-caret-up.svg"
                                                                            alt="ico-caret-up"
                                                                            className="w-full"
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src="assets/images/ico-caret-down.svg"
                                                                            alt="ico-caret-down"
                                                                            className="w-full"
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="relative px-6 md:px-0 bg-[#F7F9FC]">
                                                            <div className="pl-10 md:pl-20 pb-3">
                                                                {f.summaries.map((summary,i) => (
                                                                    <TextNormal
                                                                        grayed
                                                                        className="text-base md:text-xl leading-6 md:leading-8 mb-0 w-full md:max-w-[770px]"
                                                                        key={`${f.title}_summary_${i}`}
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: summary,
                                                                        }}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </div>
                                    ))}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
