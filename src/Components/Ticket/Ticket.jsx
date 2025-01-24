import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import PersianDate from "../PersianDate/PersianDate";
import { GoInfo } from "react-icons/go";
import { Link } from "react-router-dom";

export default function Ticket(tickets) {
    return (
        <Link to={`/my-account/Tickets/${tickets._id}`} className="dark:bg-[#242A38] bg-white rounded p-4 lg:p-6 flex justify-between gap-5 items-end flex-wrap">
            <div className="flex md:flex-row md:justify-between flex-col gap-y-3 flex-1">
                <h3 className="dana-demi text-wrap ">{tickets.title}</h3>
                <span className="text-slate-500 dana-regular dark:text-gray-400">{tickets.departmentID}</span>
            </div>
            <div className="flex gap-4">
                <span className="text-slate-500 dana-regular dark:text-gray-400">
                    <PersianDate isoDate={tickets.createdAt} /></span>
                {tickets.answer ? <IoIosCheckmarkCircleOutline className="text-[#22c55e] text-2xl" /> : <GoInfo className="text-amber-500 text-2xl" />}

            </div>
        </Link>
    )
}
