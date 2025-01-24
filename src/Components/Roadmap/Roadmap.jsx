import { useContext } from "react";
import { Link } from "react-router-dom";
import SectionsTitle from "../SectionsTitle/SectionsTitle";
import SabzLearnContext from "../../Contexts/SabzlearnContext";
import { FaLaptopCode } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { AiOutlinePython } from "react-icons/ai";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

export default function Roadmap() {
    const { courses } = useContext(SabzLearnContext);
    const categories = [
        { name: "فرانت اند", key: "frontend", icon: FaLaptopCode, gradient: "from-[#FFB535] to-[#F2295B]" },
        { name: "بک اند", key: "backend", icon: MdOutlineSecurity, gradient: "from-[#30C5E4] to-[#28E55D]" },
        { name: "پایتون", key: "python", icon: AiOutlinePython, gradient: "from-[#30C5E4] to-[#28E55D]" },
        { name: "مهارت های نرم", key: "skillUp", icon: IoExtensionPuzzleOutline, gradient: "from-[#2E9EFF] to-[#9C33F7]" },
    ];

    return (
        <div id="roadmap" className="slide px-2">
            <SectionsTitle title={"نقشه راه ها"} text={'نقشه های راه برای شروع اصولی یادگیری'} alert={"bg-[#EF4444]"} />
            <div className="grid px-4 lg:px-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map(category => {
                    const filteredCourses = courses.filter(course => course.categoryID.name === category.key);
                    const Icon = category.icon;
                    return (
                        <Link to={`/course-cat/${category.key}`} key={category.key} className={`py-5 bg-gradient-to-r ${category.gradient} overflow-hidden rounded-2xl flex flex-col items-center w-auto max-w-[294px] gap-1`}>
                            <Icon className="mb-3 text-3xl sm:text-5xl" />
                            <span className="dana-demi">{category.name}</span>
                            <span className="dana-medium">{filteredCourses.length} دوره</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
