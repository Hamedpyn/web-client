import CourseBox from "../CourseBox/CourseBox";
import SectionsTitle from "../SectionsTitle/SectionsTitle";
import { useContext } from "react";
import SabzLearnContext from "../../Contexts/SabzlearnContext";

export default function LatestCourses() {
  const { courses } = useContext(SabzLearnContext);

  return (
    <div className="slide px-2">
      <SectionsTitle
        title={"آخرین دوره های سبزلرن"}
        path={'/courses/'}
        text={'سکوی پرتاب شما به سمت موفقیت'}
        buttonText={"دوره ها"}
        alert={"bg-[#FBBF24]"}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {courses.slice(0,8).map(item => (
          <CourseBox key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
}
