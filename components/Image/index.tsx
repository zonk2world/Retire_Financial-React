import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
}

const Img: React.FC<ImgProps> = ({ src, className, ...props }) => {
    return (
        <LazyLoadImage
            src={`${process.env.MIX_ASSET_URL}/${src}`}
            className={className}
            {...props}
        />
    );
};

export default Img;
