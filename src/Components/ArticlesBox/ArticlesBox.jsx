/* eslint-disable react/prop-types */
import { CiCalendar, CiUser } from "react-icons/ci";
import { TbCircleArrowLeftFilled } from "react-icons/tb";
import PersianDate from "../PersianDate/PersianDate"
import { Link } from "react-router-dom";
import { memo } from "react";

export default memo(function ArticlesBox(props) {
  return (

    <div className="flex flex-col bg-white dark:bg-[#242A38] border-none overflow-hidden rounded-2xl">
      <div className=" relative h-[182px] overflow-hidden">
        <img className="block w-full h-full object-cover" src={`https://edu-web-client.vercel.app/courses/covers/${props.cover}`} alt="image" />
      </div>
      <div className="flex-grow px-5 py-3">
        <h3 className="dana-demi dark:text-white text-gray-900 line-clamp-2 mb-3">
          <Link to={`/blog/${props.shortName}`} >{props.title}</Link>
        </h3>
        <p className="text-sm line-clamp-4 dana-regular text-gray-900/70 dark:text-white/70">{props.description}</p>
      </div>
      <div className="px-5 pb-5">
        <div className="flex justify-between items-center text-gray-800 dark:text-white/70 text-sm pb-4 border-b border-b-neutral-200/70 dark:border-b-white/10">
          <span className="dana-regular opacity-70 flex items-center gap-1">
            <CiUser className="text-xl" />
            <span className="text-sm overflow-hidden whitespace-nowrap text-ellipsis w-20">
              {props.creator.name}
            </span>
          </span>



          <div className="opacity-70  flex-row-reverse dana-regular flex items-center gap-0.5">
            <span className="h-3 text-sm dark:text-white text-gray-900">
              <PersianDate isoDate={props.createdAt} />
            </span>
            <CiCalendar className="text-xl" />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Link to={`/blog/${props.shortName}`} className="flex transition-colors dark:text-white text-gray-900 hover:text-[rgb(14,165,233)] items-center justify-center">

            <span className="dana-regular flex items-center gap-1">
              <span className="h-4 text-base">مطالعه مقاله</span>
              <TbCircleArrowLeftFilled className="text-xl mb-[-5px]" />
            </span>

          </Link>
        </div>
      </div>
    </div>
  );

})
