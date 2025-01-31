import { memo } from "react";
import { CiUser } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { LuUsers2 } from "react-icons/lu";
import { Link } from "react-router-dom";

export default memo(function CourseBox(props) {

  return (
    <>
      <div className="flex flex-col sm:h-[400px] bg-white dark:bg-[#242A38] border-none overflow-hidden rounded-2xl z-0">
        <div className="h-[182px] relative overflow-hidden">
          <Link to={`/course/${props.shortName}/`}>
            <img className='w-full h-44 object-cover rounded-2xl' src={`/images/${props.cover.slice(0,-3)}webp`} alt="course image" />
          </Link>
        </div>
        <div className="flex-grow px-5 pb-5 mt-2">
          <h3 className="dana-demi dark:text-white text-gray-900 line-clamp-2 mb-3">{props.name}</h3>
          <p className="text-sm line-clamp-2 dana-regular text-gray-900/70 dark:text-white/70">{props.description}</p>
        </div>
        <div className="px-5 pb-5">
          <div className="flex justify-between items-center text-gray-800 dark:text-white/70 text-sm pb-4 border-b border-b-neutral-200/70 dark:border-b-white/10">
            <span className="dana-regular opacity-70 flex items-center gap-1">
              <CiUser className="text-xl" />
              <span className="text-sm">
                {props.creator}
              </span>
            </span>
            <span className="text-[#F59E0B] dana-regular flex items-center gap-1">
              <span className="h-4 mb-[1px]">{props.courseAverageScore}</span>
              <FaStar className="" />
            </span>

          </div>

          <div className="flex justify-between mt-4">

            <span className="dana-regular opacity-70 flex items-center gap-1">
              <LuUsers2 className="text-xl dark:text-white text-gray-900" />
              <span className="h-4 text-sm dark:text-white text-gray-900 tracking-wider">{props.registers}</span>
            </span>

            {props.discount === 0 && (
              <span className="text-[#22C55E] dana-regular flex items-center gap-1">
                <span className="h-6 text-lg">{props.price == 0 ? "رایگان" : props.price.toLocaleString()}</span>
                {!props.price == 0 && <span>تومان</span>}
              </span>
            )}
            {props.discount !== 0 && props.price == 0 && (
              <span className="text-[#22C55E] dana-regular flex items-center gap-1">
                <span className="h-6 text-lg">{props.price == 0 ? "رایگان" : props.price.toLocaleString()}</span>
                {!props.price == 0 && <span>تومان</span>}
              </span>
            )}
            {props.discount !== 0 && props.price != 0 && (
              <div className="flex flex-row-reverse items-center gap-2">
                <div className="dana-regular flex flex-col">
                  <span className="line-through text-sm text-slate-500 dark:text-white/70">{props.price.toLocaleString()}</span>
                  <span className="text-lg text-[#22c55e]">
                    {(props.price - (props.price * props.discount) / 100).toLocaleString()}
                    <span className="mr-0.5">تومان</span></span>
                </div>
                <div className="dana-medium bg-[#22c55e] text-base w-[35px] text-gray-900 dark:text-white h-[32px] rounded flex justify-center items-center">
                  <span className="h-5">{props.discount}%</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );

})