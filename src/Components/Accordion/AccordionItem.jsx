/* eslint-disable react/prop-types */

import { memo } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { GoLock } from "react-icons/go";
import { Link } from "react-router-dom";

export default memo(function AccordionItem ({ register,item, index,length,course })  {
    const formatTime = (time) => {
        time = time.padStart(4, '0');
        if (!time.includes(":")) {
            return time.slice(0, -2) + ':' + time.slice(-2);
        } return time
      };
    return (
        <div className={`"opacity-100 group ${length !== index + 1 && "border-b border-b-gray-300 dark:border-b-white/10"}`}>
            {item.free === 0 && !register ? (
                <div className="flex py-5 px-4 flex-col transition-opacity duration-300 sm:flex-row sm:justify-between">
                    <p className="flex flex-row items-start gap-2 sm:items-center">
                        <span className="bg-white/10 transition-colors group-hover:text-white group-hover:bg-[#22C55E] dana-regular px-3 py-[2px] text-center rounded">
                            {index + 1}
                        </span>
                        <span className="dana-regular transition-colors pl-2 group-hover:text-[#22C55E] text-sm md:text-base">
                            {item.title}
                        </span>
                    </p>
                    <span className="flex transition-colors group-hover:text-[#22C55E] items-center gap-1 justify-end">
                        <em>{formatTime(item.time)}</em>
                        { <GoLock className="text-2xl" />}
                    </span>
                </div>
            ) : (
                <Link
                    to={`/course/${course}/${item._id}`}
                    className="flex py-5 px-4 flex-col transition-opacity duration-300 sm:flex-row sm:justify-between"
                >
                    <p className="flex flex-row gap-2 items-center">
                        <span className="bg-white/10 transition-colors group-hover:text-white group-hover:bg-[#22C55E] dana-regular px-3 py-[2px] text-center rounded">
                            {index + 1}
                        </span>
                        <span className="dana-regular transition-colors pl-2 group-hover:text-[#22C55E] text-sm md:text-base">
                            {item.title}
                        </span>
                    </p>
                    <span className="flex transition-colors group-hover:text-[#22C55E] items-center gap-1 justify-end">
                        <em>{formatTime(item.time)}</em>
                         <AiOutlinePlayCircle className="text-2xl" />
                    </span>
                </Link>
            )}
            
        </div>
    );
});