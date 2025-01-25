import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SabzLearnContext from "../../Contexts/SabzlearnContext";
import CircleSpinner from "../../Components/CircleSpinner/CircleSpinner";
import SectionsTitle from "../../Components/SectionsTitle/SectionsTitle";
import CourseBox from "../../Components/CourseBox/CourseBox";
import ArticlesBox from "../../Components/ArticlesBox/ArticlesBox";
import InfoAlert from "../../Components/InfoAlert/InfoAlert";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

export default function Search() {
    let { setIsSideBar, setIsValue } = useContext(SabzLearnContext)
    let { search } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [searchedCourses, setSearchedCourses] = useState([]);
    const [searchedArticles, setSearchedArticles] = useState([]);

    useEffect(() => {
        fetch(`https://edu-web-client.vercel.app/v1/search/${search}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Search detecting failed');
                }
                return response.json()
            })
            .then(result => {
                if (result) {
                    setSearchedCourses(result.allResultCourses)
                    setSearchedArticles(result.allResultArticles)
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500);
                } else {
                    setIsLoading(false)
                }
            })
            .catch(err => console.error(err))
    }, [search])

    useEffect(() => {
        setIsSideBar(false);
        setIsValue(false)
    }, [search, setIsSideBar, setIsValue]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <CircleSpinner />
            </div>
        );
    }

    return (
        <>
            <Header />

            <div className="slide px-2 flex flex-col">

                {searchedCourses.length ? (
                    <>
                        <SectionsTitle
                            title={"دوره های سرچ شده"}
                            path={'/courses/'}
                            text={'سکوی پرتاب شما به سمت موفقیت'}
                            buttonText={"دوره ها"}
                            alert={"bg-[#FBBF24]"}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {searchedCourses.map(item => (
                                <CourseBox key={item._id} {...item} />
                            ))}
                        </div>
                    </>
                ) : (
                    <InfoAlert searchBlog={`دوره ای مرتبط با ${search} پیدا نشد.`} />
                )}
                {searchedArticles.length ? <><SectionsTitle
                    path={'/blog'}
                    title={"مقالات سرچ شده"}
                    text={'مقالات بروز برنامه نویسی'}
                    alert={"bg-[#FBBF24]"}
                    buttonText={'مقالات'}
                />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {searchedArticles.map(item => (
                            <ArticlesBox key={item._id} {...item} />
                        ))}
                    </div></> : (
                    <InfoAlert searchBlog={`مقاله ای مرتبط با ${search} پیدا نشد.`} />
                )}
            </div>
            <Footer />

        </>

    )
}
