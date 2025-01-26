import { useEffect, useState } from 'react'
import DataTable from '../../../Components/CMS/DataTable/DataTable'
import Pagination from '../../../Components/Pagination/Pagination'
import ModalAlert from '../../../Components/CMS/Modal/Modal'
import Toastify, { Notify } from '../../../Components/Toastify/Toastify'
import { BsCoin } from "react-icons/bs";
import { TbFileDescription } from "react-icons/tb";
import Input from '../../../Components/Input/Input'
import { maxValidators, minValidators } from '../../../Rules/Rules'
import { MdOutlineShortText, MdTitle } from 'react-icons/md'
import { useForm } from "../../../Hooks/useFrom"
import { BiSupport } from "react-icons/bi";
import { FaChevronDown } from 'react-icons/fa'
export default function Courses() {
  const [Courses, setCourses] = useState([])
  const [FilteredCourses, setFilteredCourses] = useState([])
  const [Categories, setCategories] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [coursesId, setCourseId] = useState(null)
  const localStorageData = JSON.parse(localStorage.getItem('user'))
  const [selected, setSelected] = useState("");
  const [selectBox, setSelectBox] = useState(null);
  const [isAllValid, setIsAllValid] = useState(false);
  const [cover, setCover] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [formState, onInputHandler] = useForm({
    name: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    shortName: {
      value: '',
      isValid: false
    },
    price: {
      value: '',
      isValid: false
    },
    support: {
      value: '',
      isValid: false
    },
  }, false)

  const coursesTitle = [
    { title: 'شناسه', id: 1 },
    { title: 'عنوان', id: 2 },
    { title: 'مبلغ', id: 3 },
    { title: 'وضعیت', id: 4 },
    { title: 'مدرس', id: 6 },
    { title: 'دسته بندی', id: 7 },
  ]

  const getAllCourses = () => {
    fetch('https://web-api-silk-three.vercel.app/v1/courses',{
      credentials: 'include',
    })
      .then(res => res.json())
      .then(result => setCourses(result))
  };

  useEffect(() => {
    fetch('https://web-api-silk-three.vercel.app/v1/category',{
      credentials: 'include',
    })
      .then(res => res.json())
      .then(result => {
        setCategories(result)
        setSelectBox(result[0]._id)
      })
    getAllCourses()
  }, [])

  const removeCoursesConfirmation = (categoryID) => {
    setCourseId(categoryID)
    setOpenModal(true)
  };
  const removeCourses = () => {
    fetch(`https://web-api-silk-three.vercel.app/v1/courses/${coursesId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          Notify("success")
          getAllCourses()
          return res.json()
        } else {
          Notify("catError")
        }
      })

  };


  const setNewCourse = (e) => {
    e.preventDefault()
    const { shortName, name, description, price, support } = formState.inputs;
    let formData = new FormData()
    formData.append('name', name.value)
    formData.append('description', description.value)
    formData.append('shortName', shortName.value)
    formData.append('categoryID', selectBox)
    formData.append('price', price.value)
    formData.append('support', support.value)
    formData.append('status', selected)
    formData.append('cover', cover)

    fetch(`https://web-api-silk-three.vercel.app/v1/courses`, {
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
          getAllCourses()
          return res.json()
        } else {
          Notify("catError")
        }
      })

  };

  const handleSelection = (id) => {
    setSelected(id);
  };

  useEffect(() => {
    if (formState.formIsValid && selected.length && cover) {
      setIsAllValid(true)
    } else {
      setIsAllValid(false)
    }
  }, [formState.formIsValid, selected, cover])

  return (
    <>

      <div>
        <div className="mb-7 bg-white dark:bg-[#242A38] px-6 py-4 md:mx-4 rounded-xl">
          <h2 className="dana-demi md:pr-3 text-lg sm:text-xl lg:text-2xl text-black dark:text-white">ثبت <span className="text-[#22c55e] dana-extra">دوره</span></h2>
          <div className="flex justify-center">
            <form className="flex flex-col mt-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 w-full md:gap-x-4 lg:grid-cols-3">
                <Input id='name' onInputHandler={onInputHandler} style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="نام دوره" validations={[
                  minValidators(6),
                  maxValidators(80)
                ]} >
                  <MdTitle className="text-2xl text-slate-400" />
                </Input>

                <Input id='description' onInputHandler={onInputHandler} style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="توضیحات دوره" validations={[
                  minValidators(10),
                  maxValidators(200)
                ]} >
                  <TbFileDescription className="text-2xl text-slate-400" />
                </Input>
                <Input id='shortName' onInputHandler={onInputHandler} style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="نام کوتاه" validations={[
                  minValidators(2),
                  maxValidators(10)
                ]} >
                  <MdOutlineShortText className="text-2xl text-slate-400" />
                </Input>

                <Input onInputHandler={onInputHandler} id='price' style={{ all: 'unset' }} type="number" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="قیمت دوره" validations={[
                  minValidators(0),
                  maxValidators(12)
                ]}>

                  <BsCoin className="text-2xl text-slate-400" />
                </Input>
                <Input onInputHandler={onInputHandler} id='support' style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="پشتیبانی دوره" validations={[
                  minValidators(5),
                  maxValidators(25)
                ]}>

                  <BiSupport className="text-2xl text-slate-400" />
                </Input>
                <div>
                  <div className="custom-dropdown dana-regular bg-[#f3f4f6] dark:bg-[rgb(51,60,76)]">
                    <div
                      className="dropdown-selected flex justify-between items-center !text-gray-900 dark:!text-white"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {selectedCourse || "انتخاب دسته بندی"}
                      <FaChevronDown className={`transition-all ${dropdownOpen && "rotate-180"}`} />
                    </div>
                    {dropdownOpen && (
                      <ul className="dropdown-options">
                        {Categories.map((course) => (
                          <li
                            key={course._id}
                            className="dropdown-option bg-[#f3f4f6] dark:bg-[rgb(51,60,76)] dark:hover:bg-[#333c4c8c] !text-gray-900 dark:!text-white"
                            onClick={() => {
                              setSelectBox(course._id);
                              setSelectedCourse(course.title);
                              setDropdownOpen(false);
                            }}
                          >
                            {course.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
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
                    <input onChange={(e) => setCover(e.target.files[0])} id="dropzone-file" type="file" className='' />
                  </label>
                </div>

                <div className="flex w-full justify-between flex-col p-5 h-full items-center gap-10 lg:w-1/2">
                  <div className="text-gray-900 dark:text-white dana-regular flex flex-col items-center mb-2 md:flex-row justify-between w-full gap-2">
                    <div
                      className={selected === "presell" ? "selected" : ""}
                      onClick={() => handleSelection("presell")}
                    >
                      <input type="radio" name="status" id="presell" />
                      <label htmlFor="presell" className="mr-1">پیش فروش</label>
                    </div>
                    <div
                      className={selected === "start" ? "selected" : ""}
                      onClick={() => handleSelection("start")}
                    >
                      <input type="radio" name="status" id="start" />
                      <label htmlFor="start" className="mr-1">شروع شده</label>
                    </div>
                  </div>

                  <button onClick={setNewCourse} disabled={!isAllValid} type="submit" className="dana-demi disabled:opacity-60 bg-[#22c55e] h-[52px] rounded-full w-full">ثبت</button>
                </div>
              </div>
            </form>
          </div>

        </div>
        <DataTable onRemove={removeCoursesConfirmation} Courses={true} tableTitles={coursesTitle} Datas={FilteredCourses} name={'دوره ها'} />
        <Pagination items={Courses} itemsCount={8} setShownCourse={setFilteredCourses} />
        <ModalAlert onRemove={removeCourses} openModal={openModal} setOpenModal={setOpenModal} msg={"آیا از حذف دوره اطمینان دارید؟"} />

      </div>
      <Toastify />
    </>
  )
}
