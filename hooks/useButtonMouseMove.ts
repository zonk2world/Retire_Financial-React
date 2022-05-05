import React, { useEffect, useState } from "react";

const useButtonMouseMove = () => {

    let [isMouseMove, setIsMouseMove] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('mousemove', mouseMove);
        return () => {
            window.removeEventListener('mousemove', mouseMove);
        }
    }, [])

    const mouseMove = () => {
        setIsMouseMove(true);
        window.removeEventListener('mousemove', mouseMove);
    }

    return isMouseMove;
};


export default useButtonMouseMove;