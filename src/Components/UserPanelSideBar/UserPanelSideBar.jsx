import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SabzLearnContext from "../../Contexts/SabzlearnContext";
import { IoMdClose } from "react-icons/io";
import { IoChevronBackSharp, IoMoonOutline, IoSunnyOutline, IoWalletOutline } from "react-icons/io5";
import PersianDate from "../PersianDate/PersianDate";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import ModalAlert from "../CMS/Modal/Modal";
import Toastify, { Notify } from "../Toastify/Toastify";
import { PiGraduationCap, PiSquaresFour } from "react-icons/pi";
import { VscCommentDiscussion } from "react-icons/vsc";
import { RiQuestionLine } from "react-icons/ri"; import { FiEdit } from "react-icons/fi";

export default function UserPanelSideBar({ isCmsSideBar, setIsCmsSideBar, userInfos }) {
    let bodyShadow = useRef(null)
    let navigate = useNavigate();
    let userMenu = useRef(null)
    const { pathname } = useLocation();
    let { darkMode, setDarkMode, logout } = useContext(SabzLearnContext)
    const [openModal, setOpenModal] = useState(false);
    let dayTime = new Date();
    const links = [
        { id: 1, to: '', icon: <PiSquaresFour />, label: 'پنل کاربری' },
        { id: 2, to: 'Courses', icon: <PiGraduationCap />, label: 'دوره های من' },
        { id: 3, to: 'TransActions', icon: <IoWalletOutline />, label: 'کیف پول و تراکنش ها' },
        { id: 4, to: 'Tickets', icon: <VscCommentDiscussion />, label: 'تیکت ها' },
        { id: 5, to: 'Add-Tickets', icon: <RiQuestionLine />, label: 'ارسال تیکت' },
        { id: 6, to: 'Edit-Account', icon: <FiEdit />, label: 'ویرایش حساب' },
    ];
    useEffect(() => {
        setIsCmsSideBar(false)
    }, [pathname, setIsCmsSideBar]);
    const logOutConfirmation = () => {
        Notify('logout')
        setTimeout(() => {
            navigate('/')
            logout()
        }, 2500);
    };
    const toggleMenu = useCallback(
        (e) => {
            setIsCmsSideBar(prev => !prev)
            e.stopPropagation()
        }, [setIsCmsSideBar]);

    useEffect(() => {
        let body = document.body;

        if (isCmsSideBar && window.innerWidth < 1024) {
            bodyShadow.current.classList.add("wrapper");
            body.classList.add("overflow-hidden");
            body.addEventListener("click", toggleMenu);
            // Apply `pointer-events: none` to all elements except `userMenu`
            body.querySelectorAll("*").forEach((el) => {
                if (el !== userMenu.current && !userMenu.current.contains(el)) {
                    el.style.pointerEvents = "none";
                }
            });

            // Ensure `userMenu` and its children are interactive
            userMenu.current.style.pointerEvents = "auto";
        } else {
            bodyShadow.current.classList.remove("wrapper");
            body.classList.remove("overflow-hidden");
            // Reset `pointer-events` for all elements
            body.querySelectorAll("*").forEach((el) => {
                el.style.pointerEvents = "";
            });
        }

        return () => {
            body.removeEventListener("click", toggleMenu);
        };
    }, [isCmsSideBar, toggleMenu]);

    return (
        <>

            <div ref={userMenu} className={`z-50 top-0 dark:bg-[#242A38] bg-white fixed right-0 transition-all ease-out duration-300 h-full overflow-auto w-[16.75rem] p-5 lg:visible lg:opacity-100 lg:translate-x-0 ${window.innerWidth <= 1024 && isCmsSideBar
                ? "translate-x-0 visible opacity-100"
                : "translate-x-full invisible opacity-0"
                }`} onClick={e => e.stopPropagation()}>
                <div className="border-b border-b-neutral-200 dark:border-b-white/10 pb-6 lg:hidden flex flex-row-reverse justify-between">
                    <div className="flex lg:hidden flex-row-reverse gap-3">
                        <button onClick={toggleMenu} className="text-gray-900 dark:text-white bg-[#F3F4F6] dark:bg-[#2F3542] h-[48px] rounded-full w-[48px] flex items-center justify-center">
                            <IoMdClose className=" text-2xl" />
                        </button>
                        {/* Light and Dark */}
                        <button
                            onClick={() => {
                                setDarkMode(!darkMode)
                            }}
                            className="flex text-gray-900 dark:text-white bg-[#F3F4F6] dark:bg-[#2F3542] h-[48px] rounded-full w-[48px] items-center justify-center">
                            {darkMode ? <IoSunnyOutline className=" text-2xl dark:text-white text-gray-900" /> : <IoMoonOutline className=" text-2xl dark:text-white text-gray-900" />}
                        </button>
                    </div>
                    <img src="/images/logo.webp" className="h-12" alt="logo" />
                </div>
                <div className="flex flex-col lg:h-full justify-between">
                    <div className="flex flex-col lg:gap-5 pb-36 lg:pb-0">
                        <div className="bg-sky-500 relative items-center rounded flex flex-col dana-regular justify-start p-3 lg:mb-8 lg:pt-5 lg:h-[140px]">
                            <div className="flex flex-col items-center">
                                <h2 className="text-lg dana-medium">{userInfos.username}</h2>
                                <PersianDate isoDate={dayTime} />
                            </div>
                            <div className="hidden lg:block -mb-11 mx-auto mt-3.5 size-22 p-1 bg-gradient-to-b from-white/40 to-white/0 to-100% shadow-md rounded-full">
                                <img className="rounded-full w-[80px]" src={userInfos.profile || "/images/ba986f5ecace8be41dfdf99d3000078f.png"} alt="" />
                            </div>
                        </div>
                        <ul className="flex flex-col">
                            {links.map((item, index) => (
                                <NavLink
                                    end
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `dana-medium py-5 flex items-center gap-2 text-base text-gray-900 dark:text-white w-full hover:text-sky-500  px-2.5 rounded dark:hover:text-sky-500 border-b border-b-neutral-200 dark:border-b-white/10 transition-colors ${6 === index + 1 && "border-none"} ${isActive ? "!text-sky-500 dark:!text-sky-500" : ""
                                        }`
                                    }
                                >
                                    <span className="text-3xl">{item.icon}</span>
                                    <div className="flex justify-between w-full items-center">
                                    {item.label}
                                    <IoChevronBackSharp className="text-lg" />
                                    </div>
                                </NavLink>
                            ))}
                        </ul>
                    </div>
                    <button onClick={() => setOpenModal(true)} className="dark:bg-[#333C4C] bg-[#F3F4F6] rounded text-gray-900 dark:text-gray-400 dana-regular flex justify-between p-3">
                        <span>خروج از حساب کاربری</span>
                        <HiMiniArrowRightStartOnRectangle className="text-2xl" />
                    </button>
                </div>

            </div>
            <Toastify />
            <div ref={bodyShadow} className="lg:hidden"></div>
            <ModalAlert onRemove={logOutConfirmation} openModal={openModal} setOpenModal={setOpenModal} msg={"آیا از خروج از اکانت خود مطمئن هستید؟"} />

        </>

    )
}
