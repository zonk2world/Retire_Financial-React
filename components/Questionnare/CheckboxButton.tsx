import React, { useEffect, useState } from "react";
import { isDesktop } from "react-device-detect";
import useButtonMouseMove from "../../hooks/useButtonMouseMove";
import { cx } from "../../util/helpers";

interface CheckboxButtonProps {
    isSelected: boolean;
    buttonText: string;
    initialSelected?: boolean;
    clickHandler: () => void;
}

const CheckboxButton: React.FC<CheckboxButtonProps> = ({
    isSelected,
    initialSelected,
    buttonText,
    clickHandler,
}) => {
    const [selected, setSelected] = useState(isSelected);
    const isMouseMove = useButtonMouseMove();

    useEffect(() => {
        setSelected(isSelected);
    }, [isSelected]);

    useEffect(() => {
        if (initialSelected) setSelected(initialSelected);
    }, []);

    return (
        <div
            className={cx(
                "w-full p-[12px] md:px-[40px] md:py-[16px] rounded-[12px] md:rounded-[20px] mb-[12px] cursor-pointer flex items-center shadow-[0px_4px_32px_rgba(24,54,98,0.04)]",
                isDesktop && isMouseMove ? "hover:bg-[#FFE9CE]" : "",
                selected ? "bg-[#FFE9CE] border border-[#FAA942]" : "bg-white"
            )}
            onClick={() => {
                setSelected(true);
                clickHandler();
            }}
        >
            <div className="text-[16px] md:text-[20px] text-[#000714] pr-4">
                {buttonText}
            </div>
            <div className="ml-auto w-[24px] md:w-[32px]">
                {selected ? (
                    <img
                        src="assets/images/ico-checkbox-selected.svg"
                        className="w-full"
                    />
                ) : (
                    <img
                        src="assets/images/ico-checkbox.svg"
                        className="w-full"
                    />
                )}
            </div>
        </div>
    );
};

export default CheckboxButton;
