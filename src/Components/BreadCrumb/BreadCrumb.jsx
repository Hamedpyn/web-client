import { memo } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default memo(function BreadCrumb(props) {
    return (
        <div className="breadcrumb bg-white dark:bg-[#242A38]">
            <Link to={'/'} className="breadcrumb__item text-gray-900 dark:text-white dark:after:bg-[#111827] dark:before:bg-[#111827] after:bg-[#f3f4f6] before:bg-[#f3f4f6]">
                <IoHomeOutline className="text-xl" />
            </Link>
            <div className="breadcrumb__item text-gray-900 dark:text-white dark:after:bg-[#111827] dark:before:bg-[#111827] after:bg-[#f3f4f6] before:bg-[#f3f4f6]">
                <Link to={`/${props.path}`} className="dana-regular breadcrumb__link">
            {props.catName ? "دوره ها" : "وبلاگ"}
                </Link>
            </div>
            {props.catName && <Link to={`/${props.catName}`} className="dana-regular breadcrumb__item text-gray-900 dark:text-white dark:after:bg-[#111827] dark:before:bg-[#111827] after:bg-[#f3f4f6] before:bg-[#f3f4f6]">
                <span>{props.title}</span>
            </Link>}

            <div className="dana-demi text-gray-900 dark:text-white text-ellipsis overflow-hidden whitespace-nowrap pr-8">
                <span>{props.name}</span>
            </div>
        </div>
    )
})
