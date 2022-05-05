import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Account from "@2fd/ant-design-icons/lib/Account";
import { ApplicationState } from "../../../store";
import { signOut } from "../../../store/auth/action";
import { gotoProfileStep } from "../../../store/auth/action";
import { get_file } from "../../../util/s3getfile";
import { cx } from "../../../util/helpers";
interface INavItem extends React.AllHTMLAttributes<HTMLElement> {
    to: string;
    icon: string;
    className?: string;
}

const NavItem = ({ to, icon, className, ...props }: INavItem) => {
    const location = useLocation();

    return (
        <Link
            to={to}
            className={cx(
                "w-full flex items-center justify-center lg:justify-start p-[10px] lg:px-5 lg:py-4 gap-3 rounded-xl",
                location.pathname === `/${to}` ? "bg-white bg-opacity-20" : "",
                className
            )}
        >
            <img
                src={`assets/images/${icon}.svg`}
                alt={icon}
                className="w-5 h-5"
            />
            {props.children}
        </Link>
    );
};

const SideBar: React.FC = (props: any) => {
    const location = useLocation();
    const msgCnt = 0;
    const missing = useSelector(
        (state: ApplicationState) => state.auth.missingDataNum
    ) as number;
    const user = useSelector((state: ApplicationState) => state.auth.user);
    const dispatch = useDispatch();

    const downloadOrPreview = async (url) => {
        let dataUrl = await get_file(url);
        document.getElementById("download_btn")?.setAttribute("href", dataUrl);
        document.getElementById("download_btn")?.click();
    };
    return (
        <div className="w-20 lg:w-[240px] min-h-screen fixed top-0 left-0 h-screen transition duration-200 hidden md:flex md:flex-col md:justify-between px-5 pt-11 pb-10 bg-sidebar-bg bg-no-repeat bg-bottom">
            <div className="w-full flex flex-col gap-10">
                <Link to={"/"} className="w-full px-5 mt-3">
                    <img
                        src="assets/images/logo-white.svg"
                        className="w-auto"
                        alt="Icon Info"
                    />
                </Link>
                <div className="w-full flex flex-col gap-2">
                    <NavItem to={`dashboard`} icon="dashboard-icon">
                        <span className="text-lg text-[#FFFFFF] hidden lg:block">
                            Dashboard
                        </span>
                    </NavItem>                    
                    <NavItem to={`documents`} icon="document-icon">
                        <div className="hidden lg:flex items-center gap-2">
                            <span className="text-lg text-[#FFFFFF]">
                                Documents
                            </span>
                            {missing > 0 && (
                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-sm font-medium">
                                    {missing}
                                </div>
                            )}
                        </div>
                    </NavItem>
                    <NavItem to={`support`} icon="wrench-icon">
                        <span className="text-lg text-[#FFFFFF] hidden lg:block">
                            Support
                        </span>
                    </NavItem>

                    {/* <Link to={`contact-us`} className={`w-full flex items-center justify-center lg:justify-start p-[10px] lg:px-5 lg:py-4 gap-3 rounded-xl ${location.pathname === '/contact-us' ? 'bg-white bg-opacity-20' : ''} `}>
                        <img src={'assets/images/dashboard-icon.svg'} alt="Dashboard Icon" className="w-5 h-5" />
                        <span className="text-lg text-[#FFFFFF] hidden lg:block">Contact Us</span>
                    </Link> */}
                    {/* <Link
                        to={`stripe`}
                        className="w-full py-2 mb-2 flex items-center text-lg text-white transition duration-100 p-2 cursor-pointer"
                    >
                        <ChartBar className="mr-3" />
                        Reports
                    </Link>
                    <Link
                        to={`message`}
                        className="w-full py-2 mb-2 flex items-center text-lg text-white transition duration-100 p-2 cursor-pointer"
                    >
                        <ChatProcessingOutline className="mr-3" />
                        Messages
                    </Link> */}
                    {/* <Link
                        to={`stripe`}
                        className="w-full py-2 mb-2 flex items-center text-lg text-white transition duration-100 p-2 cursor-pointer"
                    >
                        <CogOutline className="mr-3" />
                        Settings
                    </Link> */}

                    <NavItem to={`message`} icon="message-icon">
                        <div className="hidden lg:flex items-center gap-2">
                            <span className="text-lg text-[#FFFFFF]">
                                Messages
                            </span>
                            {msgCnt > 0 && (
                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-sm font-medium">
                                    {msgCnt}
                                </div>
                            )}
                        </div>
                    </NavItem>

                    {user && user?.profile_complete_step < 3 && (
                        <div
                            className="w-full py-2 mb-2 flex items-center text-lg text-white transition duration-100 p-2 cursor-pointer"
                            onClick={() => dispatch(gotoProfileStep())}
                        >
                            <Account className="mr-3" />
                            Complete Profile
                        </div>
                    )}
                </div>
            </div>
            <div
                className="w-full flex items-center justify-center lg:justify-start p-[10px] lg:px-5 lg:py-4 gap-3 cursor-pointer"
                onClick={() => {
                    dispatch(signOut());
                }}
            >
                <img
                    src={"assets/images/logout-icon.svg"}
                    alt="Logout Icon"
                    className="w-5 h-5"
                />
                <span className="text-lg text-[#FFFFFF] hidden lg:block">
                    Log out
                </span>
            </div>
        </div>
    );
};

export default SideBar;
