import React, { useCallback, useContext, useEffect, useRef, useMemo } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import SabzLearnContext from "../../Contexts/SabzlearnContext";

const Arrangement = React.memo(function Arrangement({ sortItems, setSortItems, blog, isAllCourses, setIsAllCourses }) {
  const bodyShadow = useRef(null);
  const bodyRef = useRef(null);
  const { setIsBoxHref } = useContext(SabzLearnContext);

  // Memoize items to avoid recalculating unless `blog` changes
  const items = useMemo(() => [
    { value: blog ? "همه دوره ها" : "عادی" },
    { value: blog ? "ارزان ترین" : "جدید ترین" },
    { value: blog ? "گران ترین" : "قدیمی ترین" },
    { value: blog ? "پرمخاطب ها" : "پر نظر ها" },
    { value: blog && "رایگان" },
  ], [blog]);

  // Memoize toggleMenu to prevent re-creation
  const toggleMenu = useCallback(
    (e) => {
      if (isAllCourses) {
        setIsAllCourses((prev) => !prev);
      }
      e.stopPropagation();
    },
    [isAllCourses, setIsAllCourses]
  );

  useEffect(() => {
    bodyRef.current = document.body;
    const menuButton = bodyRef.current.querySelector(".menu-button");

    if (isAllCourses) {
      bodyShadow.current.classList.add("wrapper");
      bodyRef.current.classList.add("overflow-hidden");
      const allElements = bodyRef.current.querySelectorAll("*");
      allElements.forEach((el) => {
        el.style.cursor = "default";
      });
      menuButton.disabled = true;
      setIsBoxHref(false);

      bodyRef.current.addEventListener("click", toggleMenu);
    } else {
      bodyShadow.current.classList.remove("wrapper");
      bodyRef.current.classList.remove("overflow-hidden");
      const allElements = bodyRef.current.querySelectorAll("*");
      allElements.forEach((el) => {
        el.style.cursor = "";
      });
      menuButton.disabled = false;
      setIsBoxHref(true);
    }

    return () => {
      bodyRef.current.removeEventListener("click", toggleMenu);
    };
  }, [isAllCourses, setIsBoxHref, toggleMenu]);

  // Memoize the onClick handler for list items
  const handleListItemClick = useCallback((itemValue) => {
    setSortItems(itemValue);
    setIsAllCourses(false);
  }, [setSortItems, setIsAllCourses]);

  return (
    <>
      <div
        className={`w-full rounded-t-2xl overflow-hidden transition-all ease-out duration-300 md:hidden fixed bottom-0 bg-white dark:bg-[#242A38] z-50 ${
          isAllCourses ? "translate-y-0 visible opacity-100" : "translate-y-full invisible opacity-0"
        } ${blog ? "h-[385px]" : "h-[325px]"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-neutral-300 dark:bg-slate-700">
          <div className="flex px-5 h-16 items-center justify-between">
            <h3 className="dana-demi text-lg text-gray-900 dark:text-white">مرتب سازی بر اساس</h3>
            <IoIosCloseCircleOutline
              className="text-2xl !cursor-pointer text-gray-900 dark:text-white"
              onClick={() => setIsAllCourses((prev) => !prev)}
            />
          </div>
        </div>
        <div className="px-5">
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => handleListItemClick(item.value)}
                className={`!cursor-pointer transition-colors hover:text-[#22c55e] dana-regular border-b border-b-neutral-200/70 dark:border-b-white/10 py-5 ${
                  sortItems === item.value ? "text-[#22c55e]" : "text-gray-900 dark:text-white"
                } ${item.value === "رایگان" || (item.value === "پر نظر ها" && "border-none")}`}
              >
                {item.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div ref={bodyShadow} className="md:hidden"></div>
    </>
  );
});

export default Arrangement;
