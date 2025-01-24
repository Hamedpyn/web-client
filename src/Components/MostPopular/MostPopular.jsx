import { useContext } from 'react';
import CourseBox from '../CourseBox/CourseBox';
import SectionsTitle from '../SectionsTitle/SectionsTitle';
import SabzLearnContext from '../../Contexts/SabzlearnContext';

export default function MostPopular() {
    const { courses } = useContext(SabzLearnContext);
    const popularCourses = courses.filter(course => course.registers >= 1)
    return (
        <div className="slide px-2">
            <SectionsTitle
                title={"محبوب ترین دوره ها"}
                text={'پرمخاطب ترین دوره های رایگان سبزلرن'}
                alert={"bg-[#0EA5E9]"}
                buttonText={"دوره ها"}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {popularCourses.map(course => (
                    <CourseBox key={course._id} {...course} />
                ))}



            </div>
        </div>
    );
}
