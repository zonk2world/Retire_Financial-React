import React, { useEffect, useState } from "react";
import { carouselItems } from "./contents";
import CircularAnimProgress from "../../components/Slider/CircularAnimProgress";
import { cx } from "../../util/helpers";

const CarouselBanner: React.FC = () => {
    const [activeCarousel, setActiveCarousel] = useState<number>(0);

    useEffect(() => {
        const carouselInterval = setInterval(() => {
            handleCarouselNext();
        }, 9000);

        return () => clearInterval(carouselInterval);
    }, []);

    const handleCarouselNext = () => {
        setActiveCarousel((activeCarousel) =>
            activeCarousel < carouselItems.length - 1 ? activeCarousel + 1 : 0
        );
    };

    return (
        <div className="w-full relative">
            <div className="overflow-hidden relative">
                {carouselItems.map((c, i) => (
                    <div
                        key={c.title}
                        className={cx(
                            "w-full transition-opacity duration-700 ease-in-out",
                            activeCarousel === i
                                ? "block anim-pop-out"
                                : "hidden"
                        )}
                    >
                        <h2 className="font-bold text-[32px] leading-9 md:text-[56px] text-[#000714] md:leading-[60px] pb-5 md:pb-6">
                            {c.title}
                        </h2>
                        <div className="text-base md:text-xl text-[#434A59] md:leading-8 pb-10 md:pb-[60px]">
                            {c.description}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1 pb-10 md:pb-0">
                {carouselItems.map((_, i) => (
                    <div
                        key={`carousel_indicator_${i}`}
                        className="flex items-center justify-center w-8 h-8 relative"
                    >
                        <img
                            src={`assets/images/ico-carousel-dot${
                                activeCarousel === i ? "-active" : ""
                            }.svg`}
                        />

                        {activeCarousel === i && (
                            <CircularAnimProgress
                                id="circleAnimMobile"
                                className="w-full absolute"
                                btnEnable={activeCarousel === i}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarouselBanner;
