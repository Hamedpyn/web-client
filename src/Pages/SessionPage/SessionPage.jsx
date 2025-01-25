import { useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { useContext, useEffect, useState } from "react";
import CircleSpinner from "../../Components/CircleSpinner/CircleSpinner";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import BoxesTitle from "../../Components/BoxesTitle/BoxesTitle";
import SabzLearnContext from "../../Contexts/SabzlearnContext";
import AccordionItem from "../../Components/Accordion/AccordionItem";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function SessionPage() {
    const [allSessions, setSession] = useState([])
    const [spinner, setSpinner] = useState(false)
    let { courses } = useContext(SabzLearnContext)
    const { id, session } = useParams()
    const data = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        fetch(`https://web-api-silk-three.vercel.app/v1/courses/${id}/${session}`, {
            headers: {
                Authorization: `Bearer ${data === null ? null : data.token}`
            }
        }).then(res => res.json()).then(result => {
            setSession(result)
            if (result) {
                setSpinner(false)
            }
            console.log(allSessions?.session?.course);
        })
        console.log(courses);
    }, [id, session])
    let findCourse = courses.find(i => i._id == allSessions?.session?.course)

    return (
        <>
            {spinner && !allSessions ? <div className="flex items-center justify-center h-screen">
                <CircleSpinner />
            </div> : (
                <>
                    <Header />
                    <div className="slide mx-auto mt-8 sm:mt-10">
                        <BreadCrumb title={findCourse?.categoryID?.title || ""} catName={"course-cat/" + findCourse?.categoryID?.name || ""} name={findCourse?.name} path={'courses'} />
                        <div className="w-full mt-8 sm:mt-10">
                            <video
                                className="rounded-2xl w-full"
                                controls
                                src={`https://web-api-silk-three.vercel.app/courses/covers/${allSessions?.session?.video}`}
                            />
                        </div>
                        <div className="lg:flex gap-5">
                            <div className="lg:w-2/3">
                                <div className=" lg:sticky top-5 right-0 ">
                                    <BoxesTitle bg={"bg-[#0EA5E9]"} title={findCourse?.name}>
                                        <div>
                                            <span className="bg-[#213548] text-white dana-regular px-3 py-[2px] text-center rounded">{allSessions?.session?._id.slice(14, -5)}</span>
                                            <span className="dana-medium text-gray-900 dark:text-white mr-2 sm:text-lg">{allSessions?.session?.title}</span>
                                        </div>
                                    </BoxesTitle>
                                </div>
                            </div>
                            <div className="lg:w-1/3 mt-6 rounded-2xl p-5 lg:mt-7 bg-white dark:bg-[#242A38]">
                                <div className="border-b dark:border-b-white/10 border-b-neutral-200 pb-5 flex items-center gap-2">
                                    <IoDocumentTextOutline className="text-3xl" />
                                    <span className="dana-demi text-lg">سرفصل های دوره</span>
                                </div>
                                <div className={`mt-3 rounded-2xl bg-[#333C4C] max-h-[420px] px-5 ${allSessions?.sessions?.length > 1 ? "overflow-y-scroll" : ""}`}>
                                    {allSessions?.sessions?.map((item, i) => (
                                        <AccordionItem course={id} register={true} length={allSessions?.sessions?.length} key={item._id} item={item} index={i} />
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>

            )}
        </>
    )
}
