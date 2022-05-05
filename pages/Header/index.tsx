import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ApplicationState } from "../../store/index";

import { gotoProfileStep, signOut } from "../../store/auth/action";
import DeskTop from "./DeskTop";
import Mobile from "./Mobile";
import Drawer from "../../components/common/Drawer";
import { cx } from "../../util/helpers";
import { useHistory } from "react-router-dom";

interface ComponentProps {
    opacity: boolean;
    bgOnScroll?: string;
    blueOnScroll?: boolean;
}

const Header: React.FC<ComponentProps> = ({ opacity, bgOnScroll, blueOnScroll}) => {
    const [scrollTop, setScrollTop] = useState<number>(0);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const user = useSelector((state: ApplicationState) => state.auth.user);
    const token = useSelector((state: ApplicationState) => state.auth.token);
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        const onScroll = (e) => {
            setScrollTop(e.target.documentElement.scrollTop);
        };
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const gotoDashboard=()=>{
        if (user?.role == "admin") {
            history.push("/dashboard")
        } else {
            dispatch(gotoProfileStep());
        }
    }

    return (
        <div className="w-full">
            <div
                className={cx(
                    "fixed w-full top-0 z-[100] transition duration-300",
                    scrollTop > 60 ? bgOnScroll || "bg-white" : ""
                )}
            >
                <DeskTop token={token} scroll={scrollTop} opacity={opacity} blueOnScroll={blueOnScroll} />
                <Mobile drawerOpen={() => setDrawerVisible(true)} scroll={scrollTop} opacity={opacity} blueOnScroll={blueOnScroll} />
            </div>

            <Drawer
                isOpen={drawerVisible}
                handleClose={() => setDrawerVisible(false)}
            >
                <div className="w-full lg:w-[984px] xl:w-[1280px] mx-auto px-4 font-Lato">
                    <Link to="/">
                        <div className="w-full border-b border-[#4c4c4c80] border-solid px-6 py-4 text-white font-bold text-xl hover:text-[#b0bbfb]">
                            Home
                        </div>
                    </Link>
                    <Link to="/about-us">
                        <div className="w-full border-b border-[#4c4c4c80] border-solid px-6 py-4 text-white font-bold text-xl hover:text-[#b0bbfb]">
                            About Us
                        </div>
                    </Link>
                    <Link to="/our-services">
                        <div className="w-full border-b border-[#4c4c4c80] border-solid px-6 py-4 text-white font-bold text-xl hover:text-[#b0bbfb]">
                            Our Services
                        </div>
                    </Link>
                    <Link to="/get-started">
                        <div className="w-full border-b border-[#4c4c4c80] border-solid px-6 py-4 text-white font-bold text-xl hover:text-[#b0bbfb]">
                            Get Started
                        </div>
                    </Link>
                    <Link to="/pricing">
                        <div className="w-full border-b border-[#4c4c4c80] border-solid px-6 py-4 text-white font-bold text-xl hover:text-[#b0bbfb]">
                            Pricing
                        </div>
                    </Link>
                    {token ? (
                        <>
                            <div className="cursor-pointer" onClick={() => gotoDashboard()}>
                                <div className="w-full border-b border-[#4c4c4c80] border-solid px-6 py-4 text-white font-bold text-xl hover:text-[#b0bbfb]">
                                    Dashboard
                                </div>
                            </div>
                            <div
                                className="w-full border-b border-[#4c4c4c80] border-solid px-6 py-4 text-white font-bold text-xl hover:text-[#b0bbfb] cursor-pointer"
                                onClick={() => dispatch(signOut())}
                            >
                                Logout
                            </div>
                        </>
                    ) : (
                        <Link to="/signin">
                            <div className="w-full border-b border-[#4c4c4c80] border-solid px-6 py-4 text-white font-bold text-xl hover:text-[#b0bbfb]">
                                Login
                            </div>
                        </Link>
                    )}
                </div>
            </Drawer>
        </div>
    );
};

export default Header;
