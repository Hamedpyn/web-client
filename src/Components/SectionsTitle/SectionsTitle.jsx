import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

export default function SectionsTitle({ title, text, path, buttonText, alert, textSpan }) {
    return (
        <div className={`breadCrumb mb-7 sm:mb-10 mt-24 px-2 sm:mt-40  ${textSpan && "flex items-center justify-center sm:justify-between flex-wrap flex-col sm:flex-row gap-x-4 gap-y-1"} ${buttonText ?
            "flex items-center justify-center sm:justify-between flex-wrap flex-col sm:flex-row gap-x-4 gap-y-7"

            : "flex justify-center [&>*:first-child]:items-center sm:[&>*:first-child]:items-start sm:[&>*:first-child]:w-full "}`}>

            <div className="flex items-center sm:items-start flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span className={`mb-1 rounded-sm hidden sm:inline-block w-4 h-4 ${alert}`}></span>
                    <h3 className="dana-bold dark:text-white text-gray-900 text-2xl sm:text-[1.75rem]">{title}</h3>
                </div>
                <span className="dana-medium text-center sm:text-start sm:text-lg text-slate-500">{text}</span>
            </div>
            {buttonText && <Link to={path} className={`${textSpan ? "dana-medium sm:text-xl text-slate-500 cursor-default" : "text-[#22C55E] transition-all sm:hover:text-white rounded-full sm:px-4 sm:py-4 sm:hover:bg-[#22C55E] dana-medium flex items-center gap-2"}`}>
                
                {!textSpan ? `مشاهده همه ${buttonText}` : `${textSpan}`}
               {!textSpan && <IoMdArrowBack className="text-2xl" />}
            </Link>}
        </div>
    )
}
