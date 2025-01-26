import Toastify, { Notify } from '../../../Components/Toastify/Toastify'
import DataTable from '../../../Components/CMS/DataTable/DataTable'
import Pagination from '../../../Components/Pagination/Pagination'
import { useEffect, useState, useCallback } from 'react'
import ModalAlert from '../../../Components/CMS/Modal/Modal'
import { useForm } from "../../../Hooks/useFrom"
import Input from '../../../Components/Input/Input'
import { maxValidators, minValidators } from '../../../Rules/Rules'
import { VscPercentage } from "react-icons/vsc";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { FaBarcode } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

export default function DisCounts() {
  const [disCounts, setDisCounts] = useState([])
  const [Courses, setCourses] = useState([])
  const [courseID, setCourseID] = useState('')
  const [FilteredDisCounts, setFilteredDisCounts] = useState([])
  const localStorageData = JSON.parse(localStorage.getItem('user'))
  const [allIsValid, setAllIsValid] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [openModal, setOpenModal] = useState(false)
  const [disCountID, setDisCountID] = useState(null)
  const disCountsTitle = [
    { title: 'شناسه', id: 1 },
    { title: 'کد', id: 2 },
    { title: 'درصد تخفیف', id: 3 },
    { title: 'تعداد دفعات قابل استفاده', id: 4 },
    { title: 'سازنده', id: 5 },
  ]
  const [formState, onInputHandler] = useForm({
    code: {
      value: '',
      isValid: false
    },
    percent: {
      value: '',
      isValid: false
    },
    max: {
      value: '',
      isValid: false
    },
  }, false)

  const getAllDisCounts = useCallback(
    () => {
      fetch('https://web-api-silk-three.vercel.app/v1/offs', {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${localStorageData.token}`
        },
      })
        .then(res => res.json())
        .then(setDisCounts)
    }, []
  )


  useEffect(() => {
    fetch('https://web-api-silk-three.vercel.app/v1/courses',{
      credentials: 'include',
    })
      .then(res => res.json())
      .then(result => {
        setCourses(result)
        setCourseID(result[0]._id)
      })

    getAllDisCounts()
  }, [getAllDisCounts])

  useEffect(() => {
    if (formState.formIsValid && selectedCourse) {
      setAllIsValid(true)
    } else {
      setAllIsValid(false)
    }
  }, [selectedCourse, formState.formIsValid])

  const setNewDisCount = (e) => {
    e.preventDefault()
    const { code, percent, max } = formState.inputs;

    let newOffs = {
      code: code.value,
      percent: percent.value,
      max: max.value,
      course: courseID
    }


    fetch("https://web-api-silk-three.vercel.app/v1/offs", {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newOffs)
    })
      .then(res => {
        if (res.ok) {
          Notify("success")
          getAllDisCounts()
          return res.json()
        } else {
          Notify("catError")
        }
      })

  };
  const removeConfirmation = (ID) => {
    setDisCountID(ID)
    setOpenModal(true)
  };
  const removeDisCount = () => {
    fetch(`https://web-api-silk-three.vercel.app/v1/offs/${disCountID}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then(res => {
        if (res.ok) {
          Notify("success")
          getAllDisCounts()
          return res.json()
        } else {
          Notify("catError")
        }
      })
  };

  return (
    <>
      <div>
        <div className="mb-7 bg-white dark:bg-[#242A38] px-6 py-4 md:mx-4 rounded-xl">
          <h2 className="dana-demi md:pr-3 text-lg sm:text-xl lg:text-2xl text-black dark:text-white">ثبت <span className="text-[#22c55e] dana-extra">کد تخفیف</span></h2>
          <div className="flex justify-center">
            <form className="flex flex-col mt-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 w-full md:gap-x-4 lg:grid-cols-3">

                <Input id='code' onInputHandler={onInputHandler} style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="کد تخفیف" validations={[
                  minValidators(2),
                  maxValidators(15)
                ]} >
                  <FaBarcode className="text-2xl text-slate-400" />
                </Input>
                <Input id='percent' onInputHandler={onInputHandler} style={{ all: 'unset' }} type="number" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="درصد تخفیف" validations={[
                  minValidators(1),
                  maxValidators(3)
                ]} >
                  <VscPercentage className="text-2xl text-slate-400" />
                </Input>

                <Input onInputHandler={onInputHandler} id='max' style={{ all: 'unset' }} type="number" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="تعداد دفعات قابل استفاده" validations={[
                  minValidators(1),
                  maxValidators(5)
                ]}>

                  <BsArrowCounterclockwise className="text-2xl text-slate-400" />
                </Input>
                <div className="custom-dropdown dana-regular bg-[#f3f4f6] dark:bg-[rgb(51,60,76)]">
                  <div
                    className="dropdown-selected flex justify-between items-center !text-gray-900 dark:!text-white"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {selectedCourse || "انتخاب دوره"}
                    <FaChevronDown className={`transition-all ${dropdownOpen && "rotate-180"}`} />
                  </div>
                  {dropdownOpen && (
                    <ul className="dropdown-options">
                      {Courses.map((course) => (
                        <li
                          key={course._id}
                          className="dropdown-option bg-[#f3f4f6] dark:bg-[rgb(51,60,76)] dark:hover:bg-[#333c4c8c] !text-gray-900 dark:!text-white"
                          onClick={() => {
                            setCourseID(course._id);
                            setSelectedCourse(course.name);
                            setDropdownOpen(false);
                          }}
                        >
                          {course.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="w-full pt-5 md:pt-0">
                  <button onClick={setNewDisCount} disabled={!allIsValid} type="submit" className="dana-demi disabled:opacity-60 bg-[#22c55e] h-[52px] rounded-full w-full">ثبت</button>
                </div>

              </div>
            </form>
          </div>

        </div>
        <DataTable onRemove={removeConfirmation} disCounts={true} tableTitles={disCountsTitle} Datas={FilteredDisCounts} name={'کد های تخفیف'} />
        <Pagination items={disCounts} itemsCount={8} setShownCourse={setFilteredDisCounts} />
        <ModalAlert onRemove={removeDisCount} openModal={openModal} setOpenModal={setOpenModal} msg={"آیا از حذف کد تخفیف اطمینان دارید؟"} />
      </div>
      <Toastify />
    </>
  )
}
