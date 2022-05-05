import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { gotoProfileStep, signOut } from "../../store/auth/action";
import { OutlineButtonLink, OutlineButton } from "../../components/Buttons/WhiteButtons";
import { cx } from "../../util/helpers";
import { ApplicationState } from "../../store/index";
import { useHistory } from "react-router-dom";
import Img from "../../components/Image";

interface HeaderProps {
    token: string | null;
    scroll: number;
    opacity: boolean;
    blueOnScroll?: boolean;
}

const DeskTop: React.FC<HeaderProps> = ({
    token,
    scroll,
    opacity,
    blueOnScroll,
}) => {
    const dispatch = useDispatch();
    const user = useSelector((state: ApplicationState) => state.auth.user);
    let history = useHistory();
    const isBlueVersion = !opacity || (scroll > 60 && blueOnScroll);

    const gotoDashboard=()=>{
        if (user?.role == "admin") {
            history.push("/dashboard")
        } else {
            dispatch(gotoProfileStep());
        }
    }

    return (
        <div
            className={`w-full max-w-[1496px] px-[24px] h-[86px] justify-between items-center m-auto box-border hidden md:hidden lg:flex py-4 font-Lato`}
        >
            <Link to={"/"}>
                {!isBlueVersion ? (
                    <Img src="assets/images/logo-white.svg" alt="Logo White" />
                ) : (
                    <Img src="assets/images/logo-blue.svg" alt="Logo Blue" />
                )}
            </Link>
            <div
                className={cx(
                    "h-10 flex items-center gap-10 text-white text-lg leading-[30px]",
                    !isBlueVersion ? "text-white" : "text-[#001F55]"
                )}
            >
                <Link
                    to="/"
                    className={`no-underline ${isBlueVersion ? "" : "hover:text-[#001F55]"
                        }`}
                >
                    Home
                </Link>
                <Link
                    to="/about-us"
                    className={`no-underline ${isBlueVersion ? "" : "hover:text-[#001F55]"
                        }`}
                >
                    About Us
                </Link>
                <Link
                    to="/our-services"
                    className={`no-underline ${isBlueVersion ? "" : "hover:text-[#001F55]"
                        }`}
                >
                    Our Services
                </Link>
                <Link
                    to="/get-started"
                    className={`no-underline ${isBlueVersion ? "" : "hover:text-[#001F55]"
                        }`}
                >
                    Get Started
                </Link>
                <Link
                    to="/pricing"
                    className={`no-underline ${isBlueVersion ? "" : "hover:text-[#001F55]"
                        }`}
                >
                    Pricing
                </Link>
                {token &&
                    <div  /*to="/dashboard"*/ onClick={() => gotoDashboard()} 
                        className={`no-underline cursor-pointer ${isBlueVersion ? "" : "hover:text-[#001F55]"
                            }`}
                    >
                        Dashboard
                    </div>
                    // <Link
                    //     to="/dashboard"
                    //     className={`no-underline ${isBlueVersion ? "" : "hover:text-[#001F55]"
                    //         }`}
                    // >
                    //     Dashboard
                    // </Link>
                }
            </div>
            <div className="h-10 flex items-center text-white 2xl:text-base text-sm">
                {token ? (
                    <OutlineButton
                        btnText="Logout"
                        onClick={() => dispatch(signOut())}
                        icon={<span>&#183;&#183;</span>}
                        blue={isBlueVersion}
                    />
                ) : (
                    <OutlineButtonLink
                        href="/signin"
                        btnText="Login"
                        icon={<span>&#183;&#183;</span>}
                        blue={isBlueVersion}
                    />
                )}
            </div>
        </div>
    );
};

export default DeskTop;
