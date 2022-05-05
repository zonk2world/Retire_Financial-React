import React, { useEffect, useState } from "react";
import { isDesktop } from "react-device-detect";
import useButtonMouseMove from "../../hooks/useButtonMouseMove";
import { cx } from "../../util/helpers";

interface IconButtonProps {
    isSelected: boolean;
    buttonText: string;
    icon?: string;
    initialSelected?: boolean;
    clickHandler: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
    isSelected,
    initialSelected,
    buttonText,
    icon,
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
                "flex-1 min-w-[calc(50%-8px)] md:min-w-0 px-[16px] py-[8px] md:px-[10px] md:py-[30px] rounded-[12px] md:rounded-[20px] cursor-pointer flex flex-col items-center shadow-[0px_4px_32px_rgba(24,54,98,0.04)]",
                isDesktop && isMouseMove ? "hover:bg-[#FFE9CE]" : "",
                selected ? "bg-[#FFE9CE] border border-[#FAA942]" : "bg-white"
            )}
            onClick={() => {
                setSelected(true);
                clickHandler();
            }}
        >
            <img src={`assets/images/${icon}`} className="" />
            <div className="text-[16px] md:text-[20px] text-[#000714] text-center md:mt-[30px]">
                {buttonText}
            </div>
        </div>
    );
};

export default IconButton;
