import { useCallback, useEffect, useState } from "react"
import DataTable from "../../../Components/CMS/DataTable/DataTable"
import Pagination from "../../../Components/Pagination/Pagination"
import ModalAlert from "../../../Components/CMS/Modal/Modal"
import Toastify, { Notify } from "../../../Components/Toastify/Toastify"
import Input from "../../../Components/Input/Input"
import { maxValidators, minValidators } from "../../../Rules/Rules"
import { MdOutlineShortText, MdTitle } from "react-icons/md"
import { TbFileDescription } from "react-icons/tb"
import { useForm } from "../../../Hooks/useFrom"
import { FaChevronDown } from "react-icons/fa"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [bodyValue, setBodyValue] = useState("");
  const [articleId, setArticleId] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [bodySucceed, setBodySucceed] = useState(false);
  const [allIsValid, setAllIsValid] = useState(false);
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [FilteredArticles, setFilteredArticles] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [selectBox, setSelectBox] = useState(null);
  const [cover, setCover] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [formState, onInputHandler] = useForm({
    title: {
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
  }, false)

  const articleTitle = [
    { title: 'شناسه', id: 1 },
    { title: 'عنوان', id: 2 },
    { title: 'نویسنده', id: 3 },
  ]
  const getAllArticles = useCallback(() => {
    fetch('https://web-api-silk-three.vercel.app/v1/articles',{
      credentials: 'include',
    })
      .then(res => res.json())
      .then(result => setArticles(result))
  }, [])

  useEffect(() => {
    fetch('https://web-api-silk-three.vercel.app/v1/category',{
      credentials: 'include',
    })
      .then(res => res.json())
      .then(result => {
        setCategories(result)
        setSelectBox(result[0]._id)
      })
    getAllArticles()
  }, [getAllArticles])

  const removeArticleConfirmation = (ARTICLE_ID) => {
    setArticleId(ARTICLE_ID);
    setOpenModal(true)
  };

  const removeArticle = () => {
    fetch(`https://web-api-silk-three.vercel.app/v1/articles/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          Notify("success")
          getAllArticles()
          res.json()
        } else {
          Notify("catError")
        }
      })
  };


  useEffect(() => {
    if (formState.inputs.title.isValid && formState.inputs.description.isValid && formState.inputs.shortname.isValid && cover && bodySucceed) {
      setAllIsValid(true)
    } else {

      setAllIsValid(false)
    }
  }, [cover, bodySucceed, formState.inputs])

  useEffect(() => {
    if (1 <= bodyValue.length) {
      setBodySucceed(true)
    } else {
      setBodySucceed(false)
    }
  }, [bodyValue.length])

  const setNewArticle = (e) => {
    e.preventDefault()
    const { shortname, title, description } = formState.inputs;
    let formData = new FormData()
    formData.append('title', title.value)
    formData.append('description', description.value)
    formData.append('shortName', shortname.value)
    formData.append('body', bodyValue)
    formData.append('categoryID', selectBox)
    formData.append('cover', cover)

    fetch(`https://web-api-silk-three.vercel.app/v1/articles`, {
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
          getAllArticles()
          return res.json()
        } else {
          Notify("catError")
        }
      })

  };

  return (
    <>
      <div className="mb-7 bg-white dark:bg-[#242A38] px-6 py-4 md:mx-4 rounded-xl">
        <h2 className="dana-demi md:pr-3 text-lg sm:text-xl lg:text-2xl text-black dark:text-white">ثبت <span className="text-[#22c55e] dana-extra">مقاله</span></h2>
        <div className="flex justify-center">
          <form className="flex flex-col mt-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full md:gap-x-4 lg:grid-cols-3">
              <Input id='title' onInputHandler={onInputHandler} style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="نام مقاله" validations={[
                minValidators(6),
                maxValidators(80)
              ]} >
                <MdTitle className="text-2xl text-slate-400" />
              </Input>

              <Input id='description' onInputHandler={onInputHandler} style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="توضیحات مقاله" validations={[
                minValidators(10),
                maxValidators(200)
              ]} >
                <TbFileDescription className="text-2xl text-slate-400" />
              </Input>

              <Input id='shortname' onInputHandler={onInputHandler} style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="نام کوتاه" validations={[
                minValidators(2),
                maxValidators(20)
              ]} >
                <MdOutlineShortText className="text-2xl text-slate-400" />
              </Input>

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
                    {Categories.map((category) => (
                      <li
                        key={category._id}
                        className="dropdown-option bg-[#f3f4f6] dark:bg-[rgb(51,60,76)] dark:hover:bg-[#333c4c8c] !text-gray-900 dark:!text-white"
                        onClick={() => {
                          setSelectBox(category._id);
                          setSelectedCourse(category.title);
                          setDropdownOpen(false);
                        }}
                      >
                        {category.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>
            <div className="flex flex-col lg:flex-row-reverse lg:items-start items-center w-full">

              <div className="flex items-center mt-4 lg:mt-0 w-full justify-center lg:w-1/2">
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

              <div className="flex w-full justify-between flex-col lg:p-5 pt-5 !pr-0 h-full items-center gap-10 lg:w-1/2">
                <div className="w-full bg-[#F3F4F6] text-gray-900 dark:text-white dark:bg-[#333c4c]">

                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      licenseKey: 'GPL',
                    }}
                    data="<p>Type your content here...</p>"
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setBodyValue(data);
                    }}
                  />


                </div>
                <div className="flex w-full gap-2">

                  <button onClick={setNewArticle} disabled={!allIsValid} type="submit" className="dana-demi disabled:opacity-60 bg-[#22c55e] h-[52px] rounded-full w-full">ثبت</button>


                </div>
              </div>
            </div>
          </form>
        </div>

      </div>
      <div>
        <DataTable onRemove={removeArticleConfirmation} articles={true} tableTitles={articleTitle} Datas={FilteredArticles} name={"مقالات"} />
        <Pagination items={articles} itemsCount={8} setShownCourse={setFilteredArticles} />
        <ModalAlert onRemove={removeArticle} openModal={openModal} setOpenModal={setOpenModal} msg={"آیا از حذف مقاله اطمینان دارید؟"} />
      </div>
      <Toastify />
    </>
  )
}
