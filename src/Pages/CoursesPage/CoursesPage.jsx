import { CiUser } from "react-icons/ci";
import { IoArrowBackCircle, IoBookOutline, IoCalendarOutline, IoDocumentText, IoTimeOutline, IoVideocamOutline } from "react-icons/io5";
import { PiGraduationCap } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { FiInfo } from "react-icons/fi";
import { SlBriefcase } from "react-icons/sl";
import { HiOutlineUsers } from "react-icons/hi";
import { FaGraduationCap, FaStar, FaUsers } from "react-icons/fa";
import BoxesTitle from "../../Components/BoxesTitle/BoxesTitle";
import { BsStars } from "react-icons/bs";
import Accordion from "../../Components/Accordion/Accordion";
import { useCallback, useEffect, useState } from "react";
import PersianDate from "../../Components/PersianDate/PersianDate"
import CircleSpinner from "../../Components/CircleSpinner/CircleSpinner";
import { TiInfoOutline } from "react-icons/ti";
import Comments from "../../Components/Comments/Comments";
import Toastify, { Notify } from "../../Components/Toastify/Toastify";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ModalAlert from "../../Components/CMS/Modal/Modal";
import { DisCountModal } from "../../Components/DisCountModa;/DisCountModal";


export default function CoursesPage() {
    const [imageSrc, setImageSrc] = useState('');



    const [oneCourse, setOneCourse] = useState(null);
    const [off, setOff] = useState('');
    const [sessions, setSessions] = useState([]);
    const [comments, setComments] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [noOff, setNoOff] = useState(false);
    const [openOffModal, setOpenOffModal] = useState(false);
    const [isNewComment, setIsNewComment] = useState(false)
    const [relatedCourses, setRelatedCourses] = useState([])

    let { id } = useParams()
    let localStorageData = JSON.parse(localStorage.getItem('user'))

    document.title = oneCourse?.name || 'سبزلرن'
    const getOneCourse = useCallback(() => {
        fetch(`https://web-api-silk-three.vercel.app/v1/courses/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${localStorageData === null ? null : localStorageData.token}`
            }
        }).then(res => res.json()).then(result => {
            setOneCourse(result)
            if (result) {
                setSpinner(false)
            }
            setImageSrc(`/images/${oneCourse.cover.slice(0, -3)}webp`)
            setSessions(result.sessions)
            setComments(result.comments)

        })
    }, [id])
    useEffect(() => {
        getOneCourse()

    }, [getOneCourse])
    useEffect(() => {
        fetch(`https://web-api-silk-three.vercel.app/v1/courses/related/${id}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(result => {
                setRelatedCourses(result);
            })
    }, [])

    const handleImageError = () => {
        setImageSrc('/images/NoImg.jpg');
    };

    const closeComment = () => {
        setIsNewComment(false)
    };
    const sendComment = async (newComment) => {

        await fetch(`https://web-api-silk-three.vercel.app/v1/comments`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorageData.token}`
            },
            body: JSON.stringify({
                body: newComment,
                score: 5,
                courseShortName: id
            }),
        })
        Notify('YesComment')
        setTimeout(() => {
            setIsNewComment(false)
        }, 2500);
    };

    const registerInCourse = () => {
        setOpenModal(true)
    };
    const registerInCourseConfirmation = () => {
        if (oneCourse.price == 0) {
            fetch(`https://web-api-silk-three.vercel.app/v1/courses/${oneCourse?._id}/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorageData.token}`
                },
                body: JSON.stringify({ price: oneCourse.price })
            }).then(res => {
                if (res.ok) {
                    Notify("success")
                    getOneCourse()
                    return res.json()
                } else {
                    Notify('catError')
                }
            })
        } else {
            setOpenOffModal(true)
        }
    };
    useEffect(() => {
        if (confirm) {
            fetch(`https://web-api-silk-three.vercel.app/v1/offs/${off}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorageData.token}`
                },
                body: JSON.stringify({ course: oneCourse?._id })
            }).then(res => {

                if (res.status == 404) {
                    Notify("Off404")
                } else if (res.status == 409) {
                    Notify('Off409')
                } else {
                    return res.json()
                }
            }).then(result => {
                fetch(`https://web-api-silk-three.vercel.app/v1/courses/${oneCourse?._id}/register`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorageData.token}`
                    },
                    body: JSON.stringify({ price: oneCourse.price - (oneCourse.price * result.percent / 100) })
                }).then(res => {
                    if (res.ok) {
                        Notify("Off200", ` شما توانستید این دوره را با ${result.percent} درصد تخفیف به قیمت نهایی ${oneCourse.price - (oneCourse.price * result.percent / 100)} تومان خریداری کنید. `)
                        getOneCourse()
                        return res.json()
                    } else {
                        Notify("catError")
                    }
                })
            })
        }
    }, [confirm])

    useEffect(() => {
        if (noOff) {
            fetch(`https://web-api-silk-three.vercel.app/v1/courses/${oneCourse?._id}/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorageData.token}`
                },
                body: JSON.stringify({ price: oneCourse.price })
            }).then(res => {
                if (res.ok) {
                    Notify("Off200", `شما توانستید این دوره را با قیمت نهایی ${(oneCourse.price - (oneCourse.price * oneCourse.discount) / 100)} خریداری کنید.`);
                    getOneCourse();
                    return res.json();
                } else {
                    Notify('catError')
                }
            })
        }
    }, [noOff])

    return (
        <>
            {spinner && !oneCourse && <div className="flex items-center justify-center h-screen">
                <CircleSpinner />
            </div>}

            {oneCourse && (
                <>
                    <Header />
                    <div className="slide mx-auto mt-8 sm:mt-10">
                        <BreadCrumb title={oneCourse.categoryID?.title || ""} catName={"course-cat/" + oneCourse.categoryID?.name || ""} name={oneCourse.name} path={'courses'} />

                        <div className="rounded-2xl flex flex-col lg:flex-row-reverse lg:justify-between gap-y-4 lg:p-0 p-4 mt-8 sm:mt-10 lg:gap-x-6 lg:!bg-transparent bg-[#f3f4f6] dark:bg-[#242A38] items-center xl:items-start">
                            <div className="lg:w-1/2">
                                <video className="rounded-2xl" controls
                                    poster={imageSrc}
                                    onError={handleImageError}
                                    alt={oneCourse?.cover ? `Cover image: ${oneCourse.cover}` : 'No image available'}
                                >
                                    <source />
                                </video>
                            </div>
                            <div className="flex lg:w-1/2 flex-col gap-4 xl:justify-between xl:h-[346.5px] ">
                                <div className="flex flex-col gap-4">
                                    <h1 className="dana-demi dark:text-white text-gray-900 text-[1.375rem]/8 sm:text-[1.625rem]/10 mb-4.5">{oneCourse.name}</h1>
                                    <p className="sm:text-lg dana-regular line-clamp-4 sm:line-clamp-3 text-gray-900 dark:text-white">{oneCourse.description}</p>
                                </div>
                                {!oneCourse.isUserRegisteredToThisCourse ? (
                                    <div className="flex justify-center sm:flex-row-reverse sm:items-end flex-col items-center gap-4 lg:justify-between lg:gap-0">
                                        {oneCourse.discount !== 0 && oneCourse.price == 0 && (
                                            <h3 className="dana-regular flex items-center text-gray-900 dark:text-white gap-1">
                                                <span className="text-2xl dark:text-white text-gray-900 dana-bold">{oneCourse.price == 0 ? "رایگان" : oneCourse.price.toLocaleString()}</span>
                                                {!oneCourse.price == 0 && <span>تومان</span>}
                                            </h3>
                                        )}
                                        {oneCourse.discount !== 0 && oneCourse.price != 0 && (
                                            <h3 className="dana-regular flex items-center text-gray-900 dark:text-white gap-3">
                                                <span className="text-slate-500 dark:text-white/70 text-xl line-through">{oneCourse.price.toLocaleString()}</span>
                                                <div className="flex items-center gap-1">

                                                    <span className="dark:text-white text-gray-900 text-2xl dana-bold">
                                                        {(oneCourse.price - (oneCourse.price * oneCourse.discount) / 100).toLocaleString()}
                                                    </span>
                                                    <span>تومان</span>
                                                </div>

                                            </h3>
                                        )}
                                        {oneCourse.discount === 0 && (
                                            <h3 className="dana-regular flex items-center text-gray-900 dark:text-white gap-1">
                                                <span className="text-2xl dark:text-white text-gray-900 dana-bold">{oneCourse.price == 0 ? "رایگان" : oneCourse.price.toLocaleString()}</span>
                                                {!oneCourse.price == 0 && <span>تومان</span>}
                                            </h3>
                                        )}
                                        <button onClick={() => registerInCourse()} className="bg-[#22C55E] rounded-full justify-center py-4 flex items-center gap-3  w-full sm:w-auto sm:px-4 dana-regular ">
                                            <PiGraduationCap className="text-2xl" />
                                            <span>ثبت نام در دوره</span>
                                        </button>
                                    </div>
                                ) : (
                                    //student
                                    <div className="flex justify-center sm:flex-row-reverse sm:items-center flex-col items-center gap-4 lg:justify-between lg:gap-0">
                                        <a href="#session" className="bg-[#22C55E] rounded-full justify-center py-4 flex items-center gap-3 px-4 lg:px-0 lg:w-56 dana-regular ">
                                            <IoBookOutline className="text-2xl dark:text-white text-gray-900" />
                                            <span>مشاهده دوره</span>
                                        </a>
                                        <h3 className="dana-regular flex items-center gap-1">
                                            <CiUser className="text-4xl" />
                                            <span className="text-lg h-6 dark:text-white text-gray-900 dana-bold">شما دانشجوی دوره هستید</span>
                                        </h3>
                                    </div>
                                )}


                            </div>
                        </div>
                        <div className="grid grid-cols-12 lg:mt-[70px] gap-8 mt-5">
                            <div className="col-span-12 lg:col-span-8">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">

                                    <div className="bg-white dark:bg-[#242A38] rounded-2xl flex flex-col items-center pt-4 pb-[0.875rem] md:flex-row md:gap-4 px-5">
                                        <FiInfo className="md:mb-0 w-10 mb-2 h-10 text-[#22C55E]" />
                                        <div className="flex flex-col items-center md:items-start sm:gap-1">
                                            <span className="dana-bold dark:text-white text-gray-900 text-sm sm:text-base mb-[2px]">وضعیت دوره</span>
                                            <span className="dana-regular dark:text-white text-gray-900 opacity-70 text-sm">{!oneCourse.isComplete ? "درحال بارگزاری" : "به اتمام رسیده"}</span>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-[#242A38] rounded-2xl flex flex-col items-center pt-4 pb-[0.875rem] md:flex-row md:gap-4 px-5">
                                        <IoTimeOutline className="md:mb-0 w-10 mb-2 h-10 text-[#22C55E]" />
                                        <div className="flex flex-col items-center md:items-start sm:gap-1 text-gray-900 dark:text-white">
                                            <span className="dana-bold text-sm sm:text-base mb-[2px]">زمان شروع دوره</span>
                                            <span className="dana-regular opacity-70 text-sm"><PersianDate isoDate={oneCourse.categoryID.createdAt} /></span>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-[#242A38] rounded-2xl flex flex-col items-center pt-4 pb-[0.875rem] md:flex-row md:gap-4 px-5 text-gray-900 dark:text-white">
                                        <IoCalendarOutline className="md:mb-0 w-10 mb-2 h-10 text-[#22C55E]" />
                                        <div className="flex flex-col items-center md:items-start sm:gap-1">
                                            <span className="dana-bold text-sm sm:text-base mb-[2px]">آخرین بروزرسانی</span>
                                            <span className="dana-regular opacity-70 text-sm"><PersianDate isoDate={oneCourse.updatedAt} /> </span>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-[#242A38] rounded-2xl flex flex-col items-center pt-4 pb-[0.875rem] md:flex-row md:gap-4 px-5 text-gray-900 dark:text-white">
                                        <HiOutlineUsers className="md:mb-0 w-10 mb-2 h-10 text-[#22C55E]" />
                                        <div className="flex flex-col items-center md:items-start sm:gap-1">
                                            <span className="dana-bold text-sm sm:text-base mb-[2px]">روش پشتیبانی</span>
                                            <span className="dana-regular opacity-70 text-sm">{oneCourse.support}</span>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-[#242A38] rounded-2xl flex flex-col items-center pt-4 pb-[0.875rem] md:flex-row md:gap-4 px-5 text-gray-900 dark:text-white">
                                        <SlBriefcase className="md:mb-0 w-10 mb-2 h-10 text-[#22C55E]" />
                                        <div className="flex flex-col items-center md:items-start sm:gap-1">
                                            <span className="dana-bold text-sm sm:text-base mb-[2px]">پیش نیاز</span>
                                            <span className="dana-regular opacity-70 text-sm">JS</span>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-[#242A38] rounded-2xl flex flex-col items-center pt-4 pb-[0.875rem] md:flex-row md:gap-4 px-5 text-gray-900 dark:text-white">
                                        <IoVideocamOutline className="md:mb-0 w-10 mb-2 h-10 text-[#22C55E]" />
                                        <div className="flex flex-col items-center md:items-start sm:gap-1">
                                            <span className="dana-bold text-sm sm:text-base mb-[2px]">نوع مشاهده</span>
                                            <span className="dana-regular opacity-70 text-sm">دانلودی/ آنلاین</span>
                                        </div>
                                    </div>
                                </div>
                                <BoxesTitle bg={"bg-amber-500"} title={"توضیحات"} icon={<IoDocumentText className="hidden md:inline-block text-amber-400 w-10 h-10" />}>
                                    <p className="dana-regular leading-7 opacity-70">{oneCourse.description}</p>
                                    <img className="rounded-2xl"
                                        src={imageSrc}
                                        onError={handleImageError}
                                        alt={oneCourse?.cover ? `Cover image: ${oneCourse.cover}` : 'No image available'}
                                    />

                                </BoxesTitle>
                                <div id="session">

                                    <BoxesTitle bg={"bg-[#0EA5E9]"} title={"سرفصل ها"} icon={<FaGraduationCap className="hidden md:inline-block text-[#0EA5E9] w-10 h-10" />}>


                                        {sessions.length ? <Accordion course={id} register={oneCourse.isUserRegisteredToThisCourse} sessions={sessions} /> : (
                                            <div className=" border-sky-900 border-y-4 bg-sky-400 text-white p-4 md:p-5 rounded-lg text-lg dana-demi flex flex-col items-center gap-2 sm:flex-row justify-center sm:justify-between">
                                                <div className="flex items-center gap-2">
                                                    <TiInfoOutline className="text-3xl" />
                                                    <span className="mt-1 text-base">جلسه ای مرتبط با این دوره وجود ندارد.</span>
                                                </div>
                                            </div>
                                        )}

                                    </BoxesTitle>
                                </div>

                                {relatedCourses.length !== 0 && (
                                    <BoxesTitle hide={true} bg={"bg-amber-500"} title={"دوره های مرتبط"} icon={<BsStars className="hidden md:inline-block text-amber-400 w-10 h-10" />}>

                                        <div className="flex flex-col gap-5">
                                            {relatedCourses.map(relatedCourses => (

                                                <div key={relatedCourses._id} className="flex items-center justify-between flex-wrap bg-[#f3f4f6] dark:bg-[#333C4C] rounded-lg py-2 pr-2 pl-4">
                                                    <div className="flex items-center gap-x-4 w-4/5">

                                                        <img className="w-24 rounded-md aspect-video" src={imageSrc}
                                                            onError={handleImageError}
                                                            alt={oneCourse?.cover ? `Cover image: ${oneCourse.cover}` : 'No image available'}
                                                        />

                                                        <Link to={`/course/${relatedCourses.shortName}`} className="dana-medium line-clamp-2 text-gray-900 dark:text-white">{relatedCourses.name}</Link>
                                                    </div>
                                                    <Link to={`/course/${relatedCourses.shortName}`} className="flex gap-x-1 items-center justify-between sm:justify-normal text-sky-500 dana-demi text-sm">
                                                        مشاهده
                                                        <IoArrowBackCircle className="size-6 md:size-5" />
                                                    </Link>
                                                </div>

                                            ))}
                                        </div>
                                    </BoxesTitle>
                                )}

                                <Comments isNewComment={isNewComment} comments={comments} sendComment={sendComment} closeComment={closeComment} setIsNewComment={setIsNewComment} />

                            </div>
                            <div className="col-span-12 lg:col-span-4 w-full">
                                <div className="flex flex-col gap-5 lg:sticky top-5 z-10">
                                    <div className="bg-white dark:bg-[#242A38] rounded-2xl p-4 sm:p-5">
                                        <div className="flex gap-x-4">
                                            <div className="flex flex-col sm:flex-row items-center text-center md:text-right gap-y-1 gap-x-3 flex-grow pt-3.5 pb-3 sm:px-3.5 sm:py-2.5 bg-[#f3f4f6] dark:bg-[#333C4C] dark:bg-dark rounded-xl text-gray-900 dark:text-white">
                                                <FaUsers className="w-10 h-10 text-[#22C55E]" />
                                                <div>
                                                    <span className="block font-bold text-sm md:text-base dana-regular">{oneCourse.courseStudentsCount}</span>
                                                    <span className="block text-sm opacity-70 dana-regular">دانشجو</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row items-center text-center md:text-right gap-y-1 gap-x-3 flex-grow pt-3.5 pb-3 sm:px-3 sm:py-2 dark:bg-[#333C4C] bg-[#f3f4f6] text-gray-900 dark:text-white rounded-xl">
                                                <FaStar className="w-10 h-10 text-amber-500" />
                                                <div>
                                                    <span className="block font-bold text-sm md:text-base dana-regular">5</span>
                                                    <span className="block text-sm opacity-70 dana-regular">رضایت</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 sm:mt-5">
                                            <div className="flex items-center justify-between text-sm sm:text-base mb-3 text-gray-900 dark:text-white">
                                                <span className="dana-demi">درصد تکمیل دوره</span>
                                                <span className="dana-demi ">0%</span>
                                            </div>
                                            <progress style={{ direction: "ltr" }} value="2" className="w-full h-3 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full
                                         [&::-webkit-progress-bar]:dark:bg-[#233A3C]
                                         [&::-webkit-progress-bar]:bg-[#f3f4f6]
                                          [&::-webkit-progress-value]:bg-[#22C55E] [&::-moz-progress-bar]:bg-[#22C55E]" max="100"></progress>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-[#242A38] rounded-2xl pt-4 px-4 pb-5 md:py-6 md:px-5 text-center flex flex-col items-center text-gray-900 dark:text-white">
                                        <img className="block mb-4 mx-auto object-cover rounded-full" width="90" height="90" src={oneCourse.creator.profile} alt="محمدامین سعیدی راد" />
                                        <span className="text-lg dana-demi">{oneCourse.creator.name} | مدرس دوره</span>
                                        <a className="border cursor-pointer py-3 px-5 rounded-full border-[#22C55E] hover:bg-[#22C55E] transition-all mx-auto mt-4 dana-medium text-[#22c55e] hover:text-white">مشاهده پروفایل من</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            )
            }
            <ModalAlert onRemove={registerInCourseConfirmation} openModal={openModal} setOpenModal={setOpenModal} msg={"آیا از ثبت نام در دوره اطمینان دارید؟"} />
            <DisCountModal setNoOff={setNoOff} value={off} setValue={setOff} setConfirm={setConfirm} openModal={openOffModal} setOpenModal={setOpenOffModal} />
            <Toastify />
        </>
    )
}
