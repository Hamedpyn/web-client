import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function UserPanelTitle({to,label,buttonText}) {


    return (
        <div className="dark:bg-[#242A38] mt-5 py-[14px] px-4 md:p-6 border-r-8 md:border-r-[10px] border-sky-500 rounded lg:mt-10 bg-white flex justify-between items-center">
            <span className="dana-demi text-sky-500 md:text-lg">{label}</span>
            {to && (

            <Link to={to} className="text-sky-500 dana-medium text-xs md:text-sm flex items-center gap-2">
                {buttonText || "مشاهده همه"}
                <IoChevronBackSharp className="-mt-0.5 md:mt-0" />
            </Link>
            )}
        </div>
    )
}
