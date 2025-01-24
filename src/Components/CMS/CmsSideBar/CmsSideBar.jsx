/* eslint-disable react/prop-types */
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import SabzLearnContext from "../../../Contexts/SabzlearnContext";
import { IoMdClose } from "react-icons/io";
import { IoHomeOutline, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import { PiArticleNyTimes } from "react-icons/pi";
import { LuUsers } from "react-icons/lu";
import { RiDiscountPercentLine } from "react-icons/ri";
import { TbCategoryPlus } from "react-icons/tb";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import Toastify, { Notify } from '../../Toastify/Toastify'
import ModalAlert from "../Modal/Modal";
import { MdOutlineCampaign, MdOutlineVideoLibrary } from "react-icons/md";
import { VscCommentDiscussion } from "react-icons/vsc";
import { LiaComment } from "react-icons/lia";

export default function CmsSideBar({ isCmsSideBar, setIsCmsSideBar }) {
  let bodyShadow = useRef(null)
  let userMenu = useRef(null)
  let { darkMode, setDarkMode, logout } = useContext(SabzLearnContext)
  const { pathname } = useLocation();
  const [openModal, setOpenModal] = useState(false);

  let navigate = useNavigate()
  const logOutAdmin = () => {
    setOpenModal(true)
  };

  const logOutConfirmation = () => {
    Notify('logout')
    setTimeout(() => {
      navigate('/')
      logout()
    }, 2500);
  };


  const links = [
    { to: '', icon: <IoHomeOutline />, label: 'صفحه اصلی' },
    { to: 'Courses', icon: <AiOutlineProduct />, label: 'دوره ها' },
    { to: 'Sessions', icon: <MdOutlineVideoLibrary />, label: 'جلسات' },
    { to: 'Articles', icon: <PiArticleNyTimes />, label: 'مقالات' },
    { to: 'Users', icon: <LuUsers />, label: 'کاربران' },
    { to: 'DisCounts', icon: <RiDiscountPercentLine />, label: 'کد های تخفیف' },
    { to: 'Categories', icon: <TbCategoryPlus />, label: 'دسته بندی ها' },
    { to: 'Comments', icon: <LiaComment />, label: 'کامنت ها' },
    { to: 'Tickets', icon: <VscCommentDiscussion />, label: 'تیکت ها' },
    { to: 'Campaign', icon: <MdOutlineCampaign />, label: 'تخفیف همگانی' },
  ];

  useEffect(() => {
    setIsCmsSideBar(false)
  }, [pathname, setIsCmsSideBar]);

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
      <div ref={userMenu} className={`z-50 top-0 dark:bg-[#242A38] bg-white fixed right-0 transition-all ease-out duration-300 h-full overflow-auto w-64 p-5 lg:visible lg:opacity-100 lg:translate-x-0 ${window.innerWidth <= 1024 && isCmsSideBar
        ? "translate-x-0 visible opacity-100"
        : "translate-x-full invisible opacity-0"
        }`} onClick={e => e.stopPropagation()}>

        <div className="border-b border-b-neutral-200 dark:border-b-white/10 pb-6 lg:justify-center flex flex-row-reverse justify-between">
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
        <div className="mt-10">
          <ul className="flex flex-col">
            {links.map(({ to, icon, label }) => (
              <NavLink
                end
                key={to}
                to={to}
                className={({ isActive }) =>
                  `dana-regular flex items-center gap-1 text-lg text-gray-900 dark:text-white w-full hover:bg-[#22c55e] hover:text-white px-2.5 h-12 rounded dark:hover:bg-[#22c55e] transition-colors ${isActive ? "bg-[#22c55e] text-white" : ""
                  }`
                }
              >
                <span className="text-xl mb-1">{icon}</span>
                {label}
              </NavLink>
            ))}
            <span onClick={logOutAdmin} className="cursor-pointer dana-regular flex items-center gap-1 text-lg text-gray-900 dark:text-white w-full hover:bg-[#ef444] hover:text-white px-2.5 h-12 rounded dark:hover:bg-[#ef4444] hover:bg-[#ef4444] transition-colors">
              <span className="text-xl mb-1">
                <HiMiniArrowRightStartOnRectangle />
              </span>
              خروج
            </span>
          </ul>
        </div>
      </div>
      <Toastify />
      <div ref={bodyShadow} className="lg:hidden"></div>
      <ModalAlert onRemove={logOutConfirmation} openModal={openModal} setOpenModal={setOpenModal} msg={"آیا از خروج از اکانت خود مطمئن هستید؟"} />

    </>
  )
}
