import { useEffect, useState } from "react";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import { useParams } from "react-router-dom";
import CircleSpinner from "../../Components/CircleSpinner/CircleSpinner";
import PersianDate from "../../Components/PersianDate/PersianDate"
import BoxesTitle from "../../Components/BoxesTitle/BoxesTitle"
import { CiCalendar, CiFolderOn, CiUser } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { VscChevronDown } from "react-icons/vsc";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import Toastify, { Notify } from "../../Components/Toastify/Toastify";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

export default function ArticlesPage() {
    const [spinner, setSpinner] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [articlesDetails, setArticlesDetails] = useState(null);
    const { blog } = useParams()



    useEffect(() => {
        fetch(`https://web-api-silk-three.vercel.app/v1/articles/${blog}`,{
            credentials: 'include'
        })
            .then(res => res.json())
            .then(articles => {
                if (articles) {
                    setArticlesDetails(articles);
                    setSpinner(false);
                    document.title = articles.title
                }
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                setSpinner(false);
            });

    }, [blog])

    return (
        <>
            {spinner && !articlesDetails && (
                <div className="flex items-center justify-center h-screen">
                    <CircleSpinner />
                </div>
            )}

            {articlesDetails && (
                <>
                    <Header />
                    <div className="mt-8 slide grid grid-cols-12 gap-x-6">
                        <div className="col-span-12">
                            <BreadCrumb name={articlesDetails.title} path={'blog'} />
                        </div>

                        <div className="col-span-12 mt-2 lg:col-span-8 xl:col-span-9">
                            <BoxesTitle bg={"bg-[#0EA5E9]"} title={articlesDetails.title} >
                                <div className="grid sm:flex grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 mb-6 text-slate-500 dana-medium text-sm sm:text-base">
                                    <div className="flex items-center gap-x-1.5">
                                        <CiUser className="text-2xl mb-1" />
                                        <span>{articlesDetails.creator?.name || 'Unknown Author'}</span>
                                    </div>
                                    <div className="flex items-center gap-x-1.5">
                                        <CiCalendar className="text-2xl mb-1" />
                                        <span><PersianDate isoDate={articlesDetails.createdAt} /> </span>
                                    </div>
                                    <div className="flex items-center gap-x-1.5">
                                        <CiFolderOn className="text-2xl mb-1" />
                                        <span>{articlesDetails.categoryID.title}</span>
                                    </div>
                                    <div className="flex items-center gap-x-1.5">
                                        <MdOutlineRemoveRedEye className="text-xl mb-1" />
                                        <span>{articlesDetails._id.slice(0, 2)}</span>
                                    </div>

                                </div>
                                <div className="rounded-2xl overflow-hidden mb-6">
                                    <img className="w-full" src={`https://web-api-silk-three.vercel.app/courses/covers/${articlesDetails.cover}`} alt="Articles Image" />
                                </div>
                                <div>
                                    <div className="dana-regular article" dangerouslySetInnerHTML={{ __html: articlesDetails.body }} />

                                </div>

                            </BoxesTitle>
                        </div>
                        <div className="col-span-12 mt-9 lg:col-span-4 xl:col-span-3">
                            <div className="bg-white dark:bg-[#242A38] rounded-xl p-5 lg:sticky top-5 left-0 overflow-hidden">
                                <div onClick={() => setIsOpen(prev => !prev)} className={`cursor-pointer flex items-center justify-between ${isOpen && " mb-5 pb-5 border-b border-b-neutral-200 dark:border-b-white/10"}`}>
                                    <div className="flex items-center gap-x-2 text-gray-900 dark:text-white dana-demi">
                                        <IoShareSocialOutline className="text-3xl" />
                                        اشتراک گذاری مطلب
                                    </div>
                                    <button type="button">
                                        <VscChevronDown className={`text-2xl text-gray-900 dark:text-white ${isOpen && "rotate-180"}`} />
                                    </button>
                                </div>
                                {isOpen && (
                                    <div className="flex items-center justify-between gap-x-3 p-4 mt-4 bg-sky-500/10 text-sky-500 border border-dashed border-sky-500 rounded-lg">
                                        <button onClick={() => {
                                            navigator.clipboard.writeText('sabzlearn.ir/?p=5397')
                                            Notify("copy")
                                        }}>
                                            <HiOutlineClipboardDocument className="text-3xl" />
                                        </button>
                                        <span className="dana-medium text-lg w-64 text-ltr text-left truncate">sabzlearn.ir/?p=5397</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Toastify />
            <Footer />
        </>
    )
}
