/* eslint-disable react/prop-types */
import { useRef, useState, useMemo, useCallback, memo } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import AccordionItem from "./AccordionItem";


function Accordion({ register,sessions,course }) {
  const [showInfo, setShowInfo] = useState(false);
  const contentRef = useRef(null);

  // Memoize session items to avoid recalculating unless `sessions` changes
  const sessionItems = useMemo(() => {
    return sessions.map((item, index) => (
      <AccordionItem course={course} register={register} length={sessions.length} key={item._id} item={item} index={index} />
    ));
  }, [sessions]);

  // Memoize the toggle function to avoid unnecessary re-creations
  const toggleShowInfo = useCallback(() => {
    setShowInfo((prev) => !prev);
  }, []);

  return (
    <div className="dark:bg-[#333C4C] bg-[#f1f2f3] rounded-xl overflow-hidden">
      <div
        onClick={toggleShowInfo}
        className={`flex justify-between items-center cursor-pointer transition-colors duration-300 p-4 ${
          showInfo && "bg-[#22C55E]"
        }`}
      >
        <span className="dana-demi dark:text-white text-gray-900">جلسات دوره</span>
        <IoChevronDownSharp
          className={`text-xl transition-transform dark:text-white text-gray-900 duration-300 ${showInfo && "rotate-180"}`}
        />
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: showInfo ? `${contentRef.current.scrollHeight}px` : "0px",
          transition: "max-height 0.3s ease",
        }}
        className="overflow-hidden dark:text-white text-gray-900"
      >
        {sessionItems}
      </div>
    </div>
  );
}

export default memo(Accordion);
