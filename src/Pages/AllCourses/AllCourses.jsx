import { useContext, useEffect, useState } from "react"
import CourseBox from "../../Components/CourseBox/CourseBox"
import ProductsSection from "../../Components/ProductsSection/ProductsSection"
import InfoAlert from "../../Components/InfoAlert/InfoAlert"
import SabzLearnContext from "../../Contexts/SabzlearnContext"
import Pagination from "../../Components/Pagination/Pagination"
import CircleSpinner from "../../Components/CircleSpinner/CircleSpinner"
import { TiInfoOutline } from "react-icons/ti"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"

export default function AllCourses() {
  let { courses } = useContext(SabzLearnContext)
  const [isAllCourses, setIsAllCourses] = useState(false)
  const [shownCourses, setShownCourses] = useState([])
  const [sortItems, setSortItems] = useState("همه دوره ها");
  const [orderedCourses, setOrderedCourses] = useState([]);
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true);

  document.title="همه دوره ها"

  useEffect(() => {
    const filteredSearch = courses.filter(i => i.name.toLowerCase().includes(searchValue.toLowerCase()))
    setOrderedCourses(filteredSearch)

  }, [searchValue])

  useEffect(() => {
    let filteredCourses=courses ;
    setSearchValue('')
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
        console.log(filteredCourses,orderedCourses,shownCourses);

  }, [sortItems, courses, orderedCourses, shownCourses]);

  useEffect(() => {
    // Ensure findCourses is set properly
    if (courses.length > 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(true);
    }
  }, [courses]);


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
      {courses.length ? (
        <ProductsSection
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          isButtons={true}
          sortItems={sortItems}
          setSortItems={setSortItems}
          text={orderedCourses.length}
          isAllCourses={isAllCourses} setIsAllCourses={setIsAllCourses}
          title="همه دوره ها">
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
  )
}
