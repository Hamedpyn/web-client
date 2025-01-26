import { MdTitle } from "react-icons/md";
import Input from "../../../Components/Input/Input";
import { useForm } from "../../../Hooks/useFrom";
import { maxValidators, minValidators } from "../../../Rules/Rules";
import { LuClock3 } from "react-icons/lu";
import { useEffect, useState } from "react";
import Toastify, { Notify } from '../../../Components/Toastify/Toastify'
import DataTable from "../../../Components/CMS/DataTable/DataTable";
import Pagination from "../../../Components/Pagination/Pagination";
import ModalAlert from "../../../Components/CMS/Modal/Modal";
import { FaChevronDown } from "react-icons/fa";

export default function Sessions() {
  const [courses, setCourses] = useState([])
  const [sessions, setSessions] = useState([])
  const [filteredSessions, setFilteredSessions] = useState([])
  const [chosenCourse, setChosenCourse] = useState(0)
  const [sessionId, setSessionId] = useState(0)
  const [free, setFree] = useState(0)
  const [cover, setCover] = useState("")
  const [valid, setValid] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const localStorageData = JSON.parse(localStorage.getItem("user"))
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  const [formState, onInputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    time: {
      value: '',
      isValid: false
    },

  }, false)

  const changeFileInput = (e) => {
    const target = e.target;
    if (target.files && target.files[0]) {
      const maxAllowedSize = 50 * 1024 * 1024; // 50MB in bytes
      if (target.files[0].size > maxAllowedSize) {
        Notify('file'); // Display error message
        target.value = ""
      } else {
        setCover(target.files[0]); // Set the file if it's valid
      }
    }
  };

  const sessionTitle = [
    { title: 'شناسه', id: 1 },
    { title: 'عنوان', id: 2 },
    { title: 'مدت زمان', id: 3 },
    { title: 'دوره', id: 4 },
  ]

  const getAllSessions = () => {
    fetch("https://web-api-silk-three.vercel.app/v1/courses/sessions",{
      credentials: 'include',
    })
      .then(res => res.json())
      .then(setSessions)
  };

  useEffect(() => {
    fetch("https://web-api-silk-three.vercel.app/v1/courses",{
      credentials: 'include',
    })
      .then(res => res.json())
      .then(result => {
        setCourses(result)
        setChosenCourse(result[0]._id)
      })
    getAllSessions()
  }, [])


  useEffect(() => {
    if (cover && free && chosenCourse && formState.inputs.title.value && formState.inputs.time.value) {
      setValid(true)
    }
  }, [cover, free, chosenCourse, formState.inputs.title.value, formState.inputs.time.value])

  const setNewSessions = (e) => {
    e.preventDefault();
    const { title, time } = formState.inputs;
    let formData = new FormData()
    formData.append('title', title.value)
    formData.append('time', time.value)
    formData.append('video', cover)
    formData.append('free', free)

    fetch(`https://web-api-silk-three.vercel.app/v1/courses/${chosenCourse}/sessions`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      },
      body: formData
    })
      .then(res => {
        if (res.ok) {
          Notify("success")
          getAllSessions()
          res.json()
        } else {
          Notify("catError")
        }
      })
  };

  const removeSessionsConfirmation = (ID) => {
    setSessionId(ID)
    setOpenModal(true)
  };
  const removeCourses = () => {
    fetch(`https://web-api-silk-three.vercel.app/v1/courses/sessions/${sessionId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      },
    })
      .then(res => {

        if (res.ok) {
          Notify("success")
          getAllSessions()
          return res.json()
        } else {
          Notify("catError")
        }
      })
  };
  return (
    <>
      <div className="">
        <div className="mb-7 bg-white dark:bg-[#242A38] px-6 py-4 md:mx-4 rounded-xl">
          <h2 className="dana-demi md:pr-3 text-lg sm:text-xl lg:text-2xl text-black dark:text-white">ثبت <span className="text-[#22c55e] dana-extra">جلسه</span></h2>
          <div className="flex justify-center">
            <form className="flex flex-col mt-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 w-full md:gap-x-4 lg:grid-cols-3">

                <Input onInputHandler={onInputHandler} id='title' style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="عنوان جلسه" validations={[
                  minValidators(5),
                  maxValidators(25)
                ]}>

                  <MdTitle className="text-2xl text-slate-400" />
                </Input>
                <Input onInputHandler={onInputHandler} id='time' style={{ all: 'unset' }} type="number" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="مدت زمان جلسه" validations={[
                  minValidators(1),
                  maxValidators(4)
                ]}>

                  <LuClock3 className="text-2xl text-slate-400" />
                </Input>
                <div className="custom-dropdown dana-regular bg-[#f3f4f6] dark:bg-[rgb(51,60,76)]">
                  <div
                    className="dropdown-selected flex justify-between items-center !text-gray-900 dark:!text-white"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className=" text-ellipsis overflow-hidden whitespace-nowrap ">
                      {selectedCourse || "انتخاب دوره"}
                    </span>
                    <FaChevronDown className={`transition-all ${dropdownOpen && "rotate-180"}`} />
                  </div>
                  {dropdownOpen && (
                    <ul className="dropdown-options">
                      {courses.map((course) => (
                        <li
                          key={course._id}
                          className="dropdown-option bg-[#f3f4f6] dark:bg-[rgb(51,60,76)] dark:hover:bg-[#333c4c8c] !text-gray-900 dark:!text-white"
                          onClick={() => {
                            setChosenCourse(course._id);
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

              </div>
              <div className="flex flex-col lg:flex-row items-center w-full">

                <div className="flex items-center w-full justify-center lg:w-1/2">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-[#111827] dark:bg-[#333C4C] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-[#333C4C]">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 dana-medium text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">برای اپلود عکس,کلیک کنید</span> یا فایل را اینجا رها کنید.</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input onChange={changeFileInput} id="dropzone-file" type="file" className='' />
                  </label>
                </div>

                <div className="flex w-full justify-end flex-col p-5 h-full items-center gap-10 lg:w-1/2">
                  <div className="text-gray-900 dark:text-white dana-regular flex flex-col items-center mb-2 md:flex-row justify-between w-full gap-2">
                    <div
                      className={free === "1" ? "selected" : ""}
                      onClick={() => setFree("1")}
                    >
                      <input type="radio" name="status" id="free" />
                      <label htmlFor="free" className="mr-1">رایگان</label>
                    </div>
                    <div
                      className={free === "0" ? "selected" : ""}
                      onClick={() => setFree("0")}
                    >
                      <input type="radio" name="status" id="notFree" />
                      <label htmlFor="notFree" className="mr-1">غیر رایگان</label>
                    </div>
                  </div>
                  <button onClick={setNewSessions} disabled={!valid} type="submit" className="dana-demi disabled:opacity-60 bg-[#22c55e] h-[52px] rounded-full w-full">ثبت</button>
                </div>
              </div>
            </form>
          </div>

        </div>
        <DataTable onRemove={removeSessionsConfirmation} session={true} tableTitles={sessionTitle} Datas={filteredSessions} name={'جلسات'} />
        <Pagination items={sessions} itemsCount={8} setShownCourse={setFilteredSessions} />
        <ModalAlert onRemove={removeCourses} openModal={openModal} setOpenModal={setOpenModal} msg={"آیا از حذف جلسه اطمینان دارید؟"} />
      </div>
      <Toastify />
    </>
  )
}
