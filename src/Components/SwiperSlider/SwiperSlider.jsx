// Import Swiper styles
import 'swiper/css';

// import required modules
import { Autoplay, } from 'swiper/modules';
import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper } from 'swiper/react';



// Custom Swiper Component 
export default function SwiperSlider({ children }) {
    const swiperRef = useRef(null); // Create a ref to hold the swiper instance

    // Handle the swiper initialization
    const handleSwiperInit = (swiper) => {
        swiperRef.current = swiper; // Store the swiper instance

    };

    return (
        <>
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                onInit={handleSwiperInit}
                className='w-full slide mt-7 sm:mt-10'
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                }}
                loop={true}
                slidesPerView={1} // Default to 1 slide
            >
                {children}

            </Swiper>
            <div className="flex justify-center items-center gap-2 mt-7 sm:mt-0 sm:absolute top-[170px] left-5 2xl:left-0">
                <button
                    className='z-50 text-[#22C55E] rounded-full border border-[#22C55E] p-4 text-lg'
                    onClick={() => swiperRef.current && swiperRef.current.slidePrev()} // Use the ref to call slideNext
                    aria-label="Next Slide"
                >
                    <FaChevronRight className='w-5 h-5' />
                </button>
                <button
                    className='z-50 text-[#22C55E] rounded-full border border-[#22C55E] p-4 text-lg'
                    onClick={() => swiperRef.current && swiperRef.current.slideNext()} // Use the ref to call slidePrev
                    aria-label="Previous Slide"
                >
                    <FaChevronLeft className='w-5 h-5' />
                </button>
            </div>
        </>
    )
}
