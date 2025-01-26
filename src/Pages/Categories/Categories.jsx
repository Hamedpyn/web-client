import { useContext, useEffect, useState } from "react";
import CourseBox from "../../Components/CourseBox/CourseBox";
import ProductsSection from "../../Components/ProductsSection/ProductsSection";
import { useParams } from "react-router-dom";
import SabzLearnContext from "../../Contexts/SabzlearnContext";
import InfoAlert from "../../Components/InfoAlert/InfoAlert";
import CircleSpinner from "../../Components/CircleSpinner/CircleSpinner";
import Pagination from "../../Components/Pagination/Pagination";
import { TiInfoOutline } from "react-icons/ti";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

export default function Categories() {
  const { setIsSideBar, courses } = useContext(SabzLearnContext);
  const params = useParams();
  const [shownCourses, setShownCourses] = useState([]);
  const [searchValue, setSearchValue] = useState('')

  const [isLoading, setIsLoading] = useState(true);
  const [isCategories, setIsCategories] = useState(false);

  const [orderedCourses, setOrderedCourses] = useState([]);
  const [sortItems, setSortItems] = useState("همه دوره ها");
  // Ensure the courses are filtered by category first
  let filteredCourses = courses.filter(course => course.categoryID.name === params.cat);

  document.title = filteredCourses.length ? filteredCourses[0].categoryID.title : "سبزلرن"

  useEffect(() => {
    setSearchValue("")
    // Handle sorting logic
    switch (sortItems) {
      case "ارزان ترین":
        filteredCourses = filteredCourses.filter(item => item.price <= 250_000 && item.price !== 0);
        break;
      case "گران ترین":
        filteredCourses = filteredCourses.filter(item => item.price >= 250_000);
        break;
      case "پرمخاطب ها":
        filteredCourses = filteredCourses.filter(item => item.registers >= 1);
        break;
      case "رایگان":
        filteredCourses = filteredCourses.filter(item => item.price == 0);
        break;
      default:
        // "همه دوره ها", no sorting applied
        break;
    }
    // Update ordered courses
    setOrderedCourses(filteredCourses);

  }, [sortItems, courses, params.cat]);

  useEffect(() => {
    // Ensure findCourses is set properly
    if (courses.length > 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(true);
    }
  }, [courses, params.cat]);


  useEffect(() => {
    setIsSideBar(false);
    setSortItems("همه دوره ها")
  }, [params.cat, setIsSideBar]);

  useEffect(() => {
    const filteredSearch = filteredCourses.filter(i => i.name.toLowerCase().includes(searchValue.toLowerCase()))
    setOrderedCourses(filteredSearch)

  }, [searchValue])


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
      {filteredCourses.length > 0 ? (
        <ProductsSection
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          isAllCourses={isCategories}
          setIsAllCourses={setIsCategories}
          isButtons={true}
          sortItems={sortItems}
          setSortItems={setSortItems}
          text={orderedCourses.length}
          title={`دوره های ${filteredCourses[0].categoryID.title}`}
        >
          {orderedCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {shownCourses.map((item) => (
                <CourseBox key={item._id} {...item} />
              ))}
            </div>
          ) : (
            <div className=" border-red-900 border-y-4 bg-red-500 text-white p-4 md:p-5 rounded-lg text-lg dana-demi flex flex-col items-center gap-2 sm:flex-row justify-center sm:justify-between !w-full">
              <div className="flex items-center gap-2">
                <TiInfoOutline className="text-3xl" />
                <span className="mt-1 text-base">دوره ای ای مرتبط با این دوره وجود ندارد.</span>
              </div>
            </div>
          )}
          <Pagination items={orderedCourses} itemsCount={6} setShownCourse={setShownCourses} />
        </ProductsSection>
      ) : (
        <InfoAlert />
      )}
      <Footer />
    </>
  );
}
