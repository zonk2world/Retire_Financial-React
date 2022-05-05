import { useEffect, useState } from "react";

function useHorzCarousel(contentWidth: number, spacing: number) {
    const [pos, setPos] = useState<{
        lPos: number;
        rPos: number;
        dPos: number;
    }>({
        lPos: 0,
        rPos: 0,
        dPos: 0,
    });

    useEffect(() => {
        function handleResize() {
            const windowWidth = window.innerWidth;
            let carouselWrapWidth: number;

            if (windowWidth > 1440 + spacing) {
                carouselWrapWidth = 1440;
            } else if (windowWidth > 1280) {
                carouselWrapWidth = windowWidth - spacing - 20;
            } else if (windowWidth > 1024 + spacing) {
                carouselWrapWidth = 1024;
            } else if (windowWidth > 768) {
                carouselWrapWidth = windowWidth - spacing - 20;
            } else {
                carouselWrapWidth = windowWidth - spacing;
            }

            const lPos = (windowWidth - carouselWrapWidth) / 2;
            const dPos = (carouselWrapWidth - contentWidth) / 2;
            const rPos = carouselWrapWidth - contentWidth;

            setPos({ lPos, dPos, rPos });
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return pos;
}

export default useHorzCarousel;
