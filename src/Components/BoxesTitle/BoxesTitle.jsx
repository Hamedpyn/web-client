/* eslint-disable react/prop-types */
import { memo } from "react";
import { LiaComment } from "react-icons/lia";

export default memo(function BoxesTitle({ onComment, comment, hide, icon, bg, title, children }) {
    return (
        <div className={`bg-white dark:bg-[#242a38] mt-7 p-5 rounded-2xl ${hide && "hidden lg:block"}`}>
            <div className={`relative flex items-center ${icon ?'mb-5 sm:mb-6' : "border-b dark:border-b-white/10 border-b-neutral-200 pb-5"} ${comment ? "justify-between" : "gap-x-2"}`}>
                {comment ? (
                    <>
                        {icon && <div className="flex items-center gap-x-2">
                            <span className={`absolute -right-6 sm:-right-[26px] block w-1.5 h-[34px] md:h-10 ${bg} rounded-r-sm`}></span>
                            {icon}
                            <div className="dana-demi text-xl md:text-2xl text-gray-900 dark:text-white">{title}</div>
                        </div>}
                        <button onClick={() => onComment()} className="dana-medium flex items-center gap-1 hover:bg-[#16A34A] transition-colors bg-[#22C55E] px-4 py-3 rounded-full">
                            <span className="text-sm h-4">ایجاد نظر جدید</span>
                            <LiaComment className="text-xl" />
                        </button>
                    </>

                ) : (
                    <>
                        <span className={`absolute -right-6 sm:-right-[26px] block w-1.5 h-[34px] md:h-10 ${bg} rounded-r-sm`}></span>
                        {icon}
                        <div className="dana-demi text-xl md:text-2xl text-gray-900 dark:text-white">{title}</div>
                    </>
                )
                }
            </div>
            <div className={`${icon ?"mt-7 flex flex-col gap-4 px-2" : "mt-5 px-0.5 text-gray-900 dark:text-white"}`}>
                {children}
            </div>
        </div >
    )
})
