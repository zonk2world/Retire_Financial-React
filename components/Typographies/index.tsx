import React from "react";
import { cx } from "../../util/helpers";

interface ITypographyProps extends React.AllHTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    className?: string;
    grayed?: boolean;
    align?: "left" | "center" | "right";
}

export const TextTitleLg = ({
    children,
    className,
    align,
}: ITypographyProps) => (
    <h2
        className={cx(
            "text-[#000714] font-bold text-[32px] leading-9 md:text-[56px] md:leading-[60px] font-Lato",
            align === "left"
                ? "text-left"
                : align === "right"
                ? "text-right"
                : "text-center",
            className
        )}
    >
        {children}
    </h2>
);

export const TextTitle = ({ children, className }: ITypographyProps) => (
    <div
        className={cx(
            "text-[24px] md:text-[36px] text-[#000714] leading-[28px] md:leading-[40px] font-bold font-Lato",
            className
        )}
    >
        {children}
    </div>
);

export const TextSubitle = ({
    children,
    className,
    ...props
}: ITypographyProps) => (
    <div
        className={cx(
            "text-[16px] md:text-[23px] text-[#000714] leading-[24px] md:leading-[28px] font-bold font-Lato",
            className
        )}
        {...props}
    >
        {children}
    </div>
);

export const TextNormal = ({
    children,
    className,
    grayed,
    ...props
}: ITypographyProps) => (
    <div
        className={cx(
            "font-Lato",
            grayed ? "text-[#434A59]" : "text-[#000714]",
            className?.includes("text-")
                ? className
                : cx(
                      "text-[14px] md:text-[18px] leading-[16px] md:leading-[28px]",
                      className
                  )
        )}
        {...props}
    >
        {children}
    </div>
);

export const TextGradient = ({ children, className }: ITypographyProps) => (
    <div
        className={cx(
            "text-transparent bg-clip-text bg-gradient-to-br from-[#4D7EF2] to-[#5FD4F4] font-Lato",
            className
        )}
    >
        {children}
    </div>
);
