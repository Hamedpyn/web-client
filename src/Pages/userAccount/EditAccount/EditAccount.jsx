import { useContext, useEffect, useState } from "react";
import UserPanelTitle from "../../../Components/UserPanelTitle/UserPanelTitle";
import SabzLearnContext from "../../../Contexts/SabzlearnContext"
import testEmail from "../../../Rules/Regex";
import Toastify, { Notify } from "../../../Components/Toastify/Toastify";
import { GoLock } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { MdPhoneIphone } from "react-icons/md";
import { BsUpload } from "react-icons/bs";

export default function EditAccount() {
    let { userInfos } = useContext(SabzLearnContext)
    const [file, setFile] = useState('')
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAllValid, setIsAllValid] = useState(false)
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        setName(userInfos.name)
        setUserName(userInfos.username)
        setPhoneNumber(userInfos.phone)
        setEmail(userInfos.email)
    }, [])

    useEffect(() => {
        if (name.length >= 1 && userName.length >= 1 && testEmail(email) && phoneNumber.length >= 1 && phoneNumber.length <= 11 && password.length >= 8) {
            setIsAllValid(true)
        } else {
            setIsAllValid(false)
        }
    }, [email, name.length, password.length, phoneNumber.length, userName.length])


    const changeUserDetails = (e) => {
        e.preventDefault();

        let newDetails = {
            name, username: userName, email, phone: phoneNumber, password
        }
        fetch(`https://web-api-silk-three.vercel.app/v1/users`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorageData.token}`
            },
            body: JSON.stringify(newDetails)
        }).then(res => {
            if (res.ok) {
                Notify("success")
                return res.json()
            } else {
                Notify("catError")
            }
        }).catch(() => {
            Notify("catError")
        })
    };

    return (
        <>
            <div className="px-4 lg:px-8">
                <div><UserPanelTitle label={'جزئیات حساب کاربری'} /></div>
                <form className="lg:p-6 lg:pl-0 mt-5 lg:mt-0 flex flex-col gap-7">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <span className="text-sm dana-medium">نام و نام خانوادگی</span>
                            <div className={`bg-[#fff] dark:bg-[#242A38] mt-2 rounded py-1.5 flex justify-between items-center pr-2 pl-4 ${name.length >= 1 ? "border !border-[#22c55e]" : "border border-[#ef4444]"}`}>
                                <input required value={name} onChange={(e) => setName(e.target.value)} type="text" className="border-none bg-transparent focus:ring-0 dana-regular dark:text-white text-gray-900 w-full" />
                                <FaRegCircleUser className="text-xl text-slate-500 dark:text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <span className="text-sm dana-medium">نام کاربری</span>
                            <div className={`bg-[#fff] dark:bg-[#242A38] mt-2 rounded py-1.5 flex justify-between items-center pr-2 pl-4 ${userName.length >= 1 ? "border !border-[#22c55e]" : "border border-[#ef4444]"}`}>
                                <input required value={userName} onChange={(e) => setUserName(e.target.value)} type="text" className="border-none bg-transparent focus:ring-0 dana-regular dark:text-white text-gray-900 w-full" />
                                <FaRegCircleUser className="text-xl text-slate-500 dark:text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <span className="text-sm dana-medium">ایمیل</span>
                            <div className={`bg-[#fff] dark:bg-[#242A38] mt-2 rounded py-1.5 flex justify-between items-center pr-2 pl-4 ${testEmail(email) ? "border !border-[#22c55e]" : "border border-[#ef4444]"}`}>
                                <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="border-none bg-transparent focus:ring-0 dana-regular dark:text-white text-gray-900 w-full" />
                                <IoMailOutline className="text-xl text-slate-500 dark:text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <span className="text-sm dana-medium">شماره تلفن</span>
                            <div className={`bg-[#fff] dark:bg-[#242A38] mt-2 rounded py-1.5 flex justify-between items-center pr-2 pl-4 ${phoneNumber.length >= 1 && phoneNumber.length <= 11 ? "border !border-[#22c55e]" : "border border-[#ef4444]"}`}>
                                <input required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="number" className="border-none bg-transparent focus:ring-0 dana-regular dark:text-white text-gray-900 w-full" />
                                <MdPhoneIphone className="text-xl text-slate-500 dark:text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <span className="text-sm dana-medium">رمز جدید</span>
                            <div className={`bg-[#fff] dark:bg-[#242A38] mt-2 rounded py-1.5 flex justify-between items-center pr-2 pl-4 ${password.length >= 8 ? "border !border-[#22c55e]" : "border border-[#ef4444]"}`}>
                                <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="border-none bg-transparent focus:ring-0 dana-regular dark:text-white text-gray-900 w-full" />
                                <GoLock className="text-xl text-slate-500 dark:text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row md:justify-between">
                        <div>
                            <label htmlFor="fileUploader" className="dana-medium text-[#22c55e] flex p-3 cursor-pointer items-center md:w-64 justify-between w-full border rounded border-[#22c55e]">
                                <span>آپلود عکس فایل</span>
                                <BsUpload className="text-lg" />
                            </label>
                            <input onChange={e => setFile(e.target.files[0])} className="hidden" id="fileUploader" type="file" />
                        </div>
                        <button disabled={!isAllValid} onClick={changeUserDetails} className="bg-[#22c55e] rounded dana-medium py-3 md:w-64 disabled:opacity-60">ویرایش حساب کاربری</button>
                    </div>
                </form>
            </div>
            <Toastify />
        </>
    )
}
