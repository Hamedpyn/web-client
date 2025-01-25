import { useEffect, useState } from 'react';
import SectionsTitle from '../SectionsTitle/SectionsTitle';
import CourseBox from '../CourseBox/CourseBox';
import SwiperSlider from '../SwiperSlider/SwiperSlider';
import { SwiperSlide } from 'swiper/react';
import CircleSpinner from "../CircleSpinner/CircleSpinner"
export default function PopularCourses() {
    const [preSell, setPreSell] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPreSellCourses = async () => {
            try {
                const response = await fetch('https://web-api-silk-three.vercel.app/v1/courses/presell');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setPreSell(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPreSellCourses();
    }, []);


    if (error) {
        return <div>Error: {error}</div>; // Display the error message to the user
    }

    return (
        <div className="slide relative px-2">
            <SectionsTitle
                buttonText={false}
                title={"دوره های درحال پیش فروش"}
                text={'دوره های محبوب و پروژه محور سبزلرن'}
                alert={"bg-[#22C55E]"}
            />
            <SwiperSlider>
                {!loading ? (
                    preSell.map(course => (
                        <SwiperSlide key={course._id}>
                            <CourseBox {...course} />
                        </SwiperSlide>
                    ))

                ) : (
                    <CircleSpinner />
                )}
            </SwiperSlider>
        </div>
    );
}
