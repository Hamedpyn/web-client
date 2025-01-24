import SectionsTitle from '../SectionsTitle/SectionsTitle';
import CourseBox from '../CourseBox/CourseBox';
import SwiperSlider from '../SwiperSlider/SwiperSlider';
import { SwiperSlide } from 'swiper/react';
import { useContext } from 'react';
import SabzLearnContext from '../../Contexts/SabzlearnContext';

export default function NewCourses() {
    const { courses } = useContext(SabzLearnContext);

    return (
        <div className="slide relative px-2">
            <SectionsTitle
                buttonText={false}
                title={"جدیدترین دوره ها"}
                text={'یادگیری و رشد توسعه فردی'}
                alert={"bg-[#22C55E]"}
            />
            <SwiperSlider>
                {courses.map(course => (
                    <SwiperSlide key={course._id}>
                        <CourseBox {...course} />
                    </SwiperSlide>
                ))}
            </SwiperSlider>
        </div>
    );
}
