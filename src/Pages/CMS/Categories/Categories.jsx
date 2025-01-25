import { useCallback, useEffect, useState } from "react";
import DataTable from "../../../Components/CMS/DataTable/DataTable";
import { useForm } from "../../../Hooks/useFrom";
import { maxValidators, minValidators } from "../../../Rules/Rules";
import { MdOutlineShortText, MdOutlineTitle } from "react-icons/md";
import Input from "../../../Components/Input/Input";
import Toastify, { Notify } from '../../../Components/Toastify/Toastify'
import ModalAlert from "../../../Components/CMS/Modal/Modal";
import EditModal from "../../../Components/EditModal/EditModal";

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState(null)
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const localStorageData = JSON.parse(localStorage.getItem('user'))
  const [title, setTitle] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [formState, onInputHandler] = useForm({
    shortname: {
      value: '',
      isValid: false
    },
    title: {
      value: '',
      isValid: false
    },

  }, false)
  const catsTitle = [
    { title: 'شناسه', id: 1 },
    { title: 'عنوان', id: 2 },
    { title: 'اسم کوتاه', id: 3 },
  ]

  const getAllCats = useCallback(
    (() => {
      fetch('https://web-api-silk-three.vercel.app/v1/category')
        .then(res => res.json())
        .then(result => setCategories(result))
    }), [])

  useEffect(() => {
    getAllCats()
  }, [getAllCats])

  const createNewCategory = (e) => {
    e.preventDefault()
    let { shortname, title } = formState.inputs
    let newCategory = {
      name: shortname.value,
      title: title.value
    }
    fetch('https://web-api-silk-three.vercel.app/v1/category', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorageData.token}`
      },
      body: JSON.stringify(newCategory)
    })
      .then(res => {
        if (res.ok) {
          Notify('success')
          getAllCats()
          return res.json()
        } else {
          Notify('catError')
        }
      })
  };
  const removeCategory = () => {
    fetch(`https://web-api-silk-three.vercel.app/v1/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorageData.token}`
      },
    })
      .then(res => {
        if (res.ok) {
          Notify('success')
          getAllCats()
          return res.json()
        } else {
          Notify('catError')
        }
      })
  };

  const removeCategoryConfirmation = (categoryID) => {
    setCategoryId(categoryID)
    setOpenModal(true)
  };

  const editCategoryConfirmation = (categoryID) => {
    setCategoryId(categoryID);
    setOpenEditModal(true)
  };

  const editCategory = () => {
    console.log(categoryId);

    fetch(`https://web-api-silk-three.vercel.app/v1/category/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorageData.token}`
      },
      body: JSON.stringify({
        name: inputValue,
        title
      })
    })
      .then(res => {
        if (res.ok) {
          Notify('success')
          getAllCats()
          return res.json()
        } else {
          Notify('catError')
        }
      })
  };

  return (
    <div>
      <div className="mb-7 bg-white dark:bg-[#242A38] px-6 py-4 md:mx-4 rounded-xl">
        <h2 className="dana-demi md:pr-3 text-lg sm:text-xl lg:text-2xl text-black dark:text-white">ثبت <span className="text-[#22c55e] dana-extra">دسته بندی</span></h2>
        <div className="flex justify-center">
          <form className="grid grid-cols-1 md:grid-cols-2 w-full md:gap-x-4 lg:grid-cols-3 mt-4">
            <Input id='title' onInputHandler={onInputHandler} style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="لطفا عنوان را وارد کنید" validations={[
              minValidators(3),
              maxValidators(25)
            ]} >
              <MdOutlineTitle className="text-2xl text-slate-400" />
            </Input>

            <Input id='shortname' onInputHandler={onInputHandler} style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="لطفا اسم کوتاه را وارد کنید" validations={[
              minValidators(2),
              maxValidators(14)
            ]} >
              <MdOutlineShortText className="text-2xl text-slate-400" />
            </Input>
            <button onClick={createNewCategory} disabled={!formState.formIsValid} type="submit" className="dana-demi disabled:opacity-60 bg-[#22c55e] h-[52px] rounded-full w-full">ثبت</button>

          </form>
        </div>

      </div>
      <Toastify />

      <DataTable onEdit={editCategoryConfirmation} onRemove={removeCategoryConfirmation} cats={true} tableTitles={catsTitle} Datas={categories} name={'دسته بندی ها'} />

      <ModalAlert onRemove={removeCategory} openModal={openModal} setOpenModal={setOpenModal} msg={"آیا از حذف این دسته بندی اطمینان دارید؟"} />
      <EditModal name={inputValue} setName={setInputValue} onEdit={editCategory} inputValue={title} setInputValue={setTitle} openModal={openEditModal} setOpenModal={setOpenEditModal} msg={"عنوان جدید دسته بندی را وارد کنید"} />
    </div>
  )
}
