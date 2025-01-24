import { useContext, useEffect } from "react"
import sabzLeSabzLearnContextarnContext from "../../Contexts/SabzlearnContext"
import { useParams } from "react-router-dom"
import SectionsTitle from "../../Components/SectionsTitle/SectionsTitle"
import { IoSearchOutline } from "react-icons/io5"
import { LuArrowUpDown } from "react-icons/lu"
import Arrangement from "../../Components/Arrangement/Arrangement"

// eslint-disable-next-line react/prop-types
export default function ProductsSection({ searchValue, setSearchValue, sortItems, setSortItems, isAllCourses, setIsAllCourses, isButtons, text, title, children }) {
  const { setIsSideBar } = useContext(SabzLearnContext)
  let params = useParams()

  const items = [
    { value: isButtons ? "همه دوره ها" : "عادی" },
    { value: isButtons ? "ارزان ترین" : "جدید ترین" },
    { value: isButtons ? "گران ترین" : "قدیمی ترین" },
    { value: isButtons ? "پرمخاطب ها" : "پر نظر ها" },
    { value: isButtons && "رایگان" },
  ];
  useEffect(() => {
    setIsSideBar(false)
  }, [params.cat, setIsSideBar])

  return (
    <>
      <div className={`mt-10 slide sm:mt-12 [&>*:first-child]:mt-0`}>
        <SectionsTitle buttonText={true} textSpan={`${text} ${isButtons ? "عنوان آموزشی" : "مقاله"}`} alert={"bg-[#FBBF24]"} title={`${title ? title : ""} ${isButtons ? "" : "وبلاگ"}`} />
        <div className="lg:mt-14">
          <div className="grid grid-cols-12 gap-7">
            <div className="col-span-full lg:col-span-4 xl:col-span-3 lg:sticky top-6 space-y-6">
              <div className="flex flex-col gap-5 lg:sticky top-[20px] right-0">
                <button className="bg-white dark:bg-[#242A38] h-16 items-center flex justify-between w-full flex-row-reverse cursor-auto rounded-xl p-4 md:p-5">
                  <IoSearchOutline className="text-3xl xl:mt-1 text-gray-900 dark:text-white" />
                  <input style={{ all: "unset" }} type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="!mt-1 !text-[15px] dana-medium  !text-gray-900 dark:!text-white !placeholder-text-slate-500 !pl-2 !w-full !text-start" placeholder={`${isButtons ? "جستجو بین دوره ها" : "جستجو بین مقالات"}`} />
                </button>

                <div className="flex md:hidden gap-6">
                  <button onClick={(e) => {
                    setIsAllCourses(prev => !prev)
                    e.stopPropagation()
                  }} className={`flex gap-1 justify-center rounded-full h-[52px] items-center bg-white dark:bg-[#242a38] w-full`}>
                    <LuArrowUpDown className="text-2xl text-gray-900 dark:text-white" />
                    <span className="dana-medium text-gray-900 dark:text-white">{sortItems}</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-full lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
              <div className="hidden md:flex items-center gap-x-6 px-5 mb-8 h-16 bg-white dark:bg-[#242A38] rounded-xl">
                <div className="flex items-center shrink-0 gap-x-2">
                  <LuArrowUpDown className="text-xl text-gray-900 dark:text-white" />
                  <span className="dana-medium text-gray-900 dark:text-white">مرتب سازی بر اساس :</span>
                </div>
                <div className="flex gap-x-5 lg:gap-x-8 h-full items-center">
                  {items.map((item, index) => (
                    <a
                      key={index +1}
                      onClick={() => {
                        setSortItems(item.value);
                        setIsAllCourses(false)
                      }}
                      className={`transition-colors dana-medium text-sm cursor-pointer  border-y-2 hover:text-[#0ea5e9] py-5 ${sortItems === item.value ? "border-[#0EA5E9] text-[#0EA5E9]" : "text-gray-900 dark:text-white border-none"
                        }`}
                    >
                      {item.value}
                    </a>
                  ))}
                </div>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
      <Arrangement sortItems={sortItems} setSortItems={setSortItems} blog={isButtons ? true : false} isAllCourses={isAllCourses} setIsAllCourses={setIsAllCourses} />
    </>
  )
}
