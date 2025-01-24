import { useEffect, useState } from "react"
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2"

export default function Pagination({ items, itemsCount, setShownCourse }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    if (itemsCount === 0 || items.length === 0) return;

    // Update the paginated items to show
    const endIndex = itemsCount * currentPage
    const startIndex = endIndex - itemsCount
    const paginatedItems = items.slice(startIndex, endIndex)
    setShownCourse(paginatedItems)

    // Calculate total number of pages
    const pagesNumber = Math.ceil(items.length / itemsCount)
    setPageCount(pagesNumber)

    // Smooth scroll after DOM updates
    const scrollToTop = () => {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    }
    setTimeout(scrollToTop, 0)
  }, [currentPage, items, itemsCount, setShownCourse])

  return (
    <>
      {pageCount !== 1 && (
    <div className="flex items-center justify-center w-full mt-4 sm:mt-14 gap-2 px-2 flex-wrap">
      {currentPage > 1 && (
        <span
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="border cursor-pointer border-[#22c552] w-[65px] h-[65px] transition-all hover:bg-[#22c552] text-[#22c552] rounded-full flex items-center justify-center group"
        >
          <HiArrowLongRight className="text-xl text-current group-hover:text-white" />
        </span>
      )}
      {Array.from({ length: pageCount }, (_, index) => (
          <div
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`border justify-center items-center flex cursor-pointer hover:bg-[#22c55e] hover:text-white border-[#22c55e] text-[#22c55e] w-[65px] text-base h-[65px] transition-all rounded-full ${currentPage === index + 1 ? "bg-[#22c55e] text-white" : ""
              }`}
          >
            {index + 1}
          </div>
        ))
      }


      {currentPage < pageCount && (
        <span
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="border cursor-pointer border-[#22c552] w-[65px] h-[65px] transition-all hover:bg-[#22c552] text-[#22c552] rounded-full flex items-center justify-center group"
        >
          <HiArrowLongLeft className="text-xl text-current group-hover:text-white" />
        </span>
      )}
    </div>
      )}
    </>
  )
}
