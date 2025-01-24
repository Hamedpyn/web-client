import { useEffect, useState } from "react";
import UserPanelTitle from "../../../Components/UserPanelTitle/UserPanelTitle";
import { FaChevronDown } from "react-icons/fa";
import { BsUpload } from "react-icons/bs";
import Toastify, { Notify } from "../../../Components/Toastify/Toastify";
export default function AddTicket() {
    const [title, setTitle] = useState('')
    const [titleBlur, setTitleBlur] = useState(false)
    const [departments, setDepartments] = useState('')
    const [bodyValue, setBodyValue] = useState('')
    const [bodyValueBlur, setBodyValueBlur] = useState(false)
    const [file, setFile] = useState('')
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [clickCounter, setClickCounter] = useState(1);

    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedDepartmentBlur, setSelectedDepartmentBlur] = useState(false);
    const [departmentID, setDepartmentID] = useState("");

    useEffect(() => {
        fetch(`https://educational-web-site.vercel.app/v1/tickets/departments`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            },
        })
            .then(res => res.json())
            .then(result => setDepartments(result))
    }, [])

    const setNewTicket = (e) => {
        e.preventDefault();
        const newTicket = {
            departmentID, title,
            departmentSubID: "63b688c5516a30a651e98156",
            priority: 1, body: bodyValue, course: undefined
        }

        fetch(`https://educational-web-site.vercel.app/v1/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorageData.token}`
            },
            body: JSON.stringify(newTicket)
        }).then(res => {
            if (res.ok) {
                Notify("success")

                setTitle("")
                setTitleBlur(false)
                setDepartmentID("")
                setBodyValue("")
                setBodyValueBlur(false)
                setSelectedDepartment("")
                setSelectedDepartmentBlur(false)
                return res.json()
            } else {
                Notify("catError")
            }
        }).catch(() => {
            Notify("catError")
        })
    };

    useEffect(() => {
        if (title.length >= 1 && departmentID && bodyValue.length >= 1) {
            setIsFormValid(true)
        } else {
            setIsFormValid(false)
        }
    }, [bodyValue.length, departmentID, title.length])


    return (
        <>

            <div className="px-4 lg:px-8">
                <div>
                    <UserPanelTitle label={'ارسال تیکت جدید'} to={'/my-account/Tickets'} buttonText={"بازگشت به تیکت ها"} />
                </div>
                <form className="lg:p-6 mt-5 lg:mt-0 flex flex-col gap-5">
                    <div className="w-full flex flex-col md:flex-row gap-5">
                        <div className={`!bg-[#fff] dark:!bg-[#242A38] w-full !h-[52px] flex !px-3 md:w-2/3 rounded ${title.length >= 1 && "border !border-[#22c55e]"} ${titleBlur && "border border-[#ef4444]"} `}>
                            <input onBlur={() => setTitleBlur(true)} value={title} onChange={(e) => setTitle(e.target.value)} style={{ all: 'unset' }} type="text" className={`md:!text-base dana-regular !text-gray-900 placeholder:!text-slate-500 dark:placeholder:!text-gray-400 dark:!text-white !text-start !text-sm !w-full`} placeholder="موضوع تیکت:" />
                        </div>
                        <div className="custom-dropdown w-full md:!w-1/3 !rounded dana-regular bg-[#fff] dark:bg-[#242A38]">
                            <div
                                className={`dropdown-selected flex justify-between items-center !text-gray-900 dark:!text-white ${selectedDepartment.length >= 1 && "border !border-[#22c55e]"} ${selectedDepartmentBlur && "border border-[#ef4444]"}`}
                                onClick={() => {
                                    setDropdownOpen(!dropdownOpen)
                                    if (clickCounter == 1) {
                                        // if it was the first click => set the state to 2
                                        // then at the 2nd click : clickCounter == 1 incorrect because now it is 2  so it goes to else
                                        setClickCounter(2)
                                    } else {
                                        // setSelectedDepartmentBlur true and clickCounter to 1 to make sure it happens again
                                        setSelectedDepartmentBlur(true)
                                        setClickCounter(1)
                                    }
                                }}
                            >
                                {selectedDepartment || "انتخاب دپارتمان"}
                                <FaChevronDown className={`transition-all ${dropdownOpen && "rotate-180"}`} />
                            </div>
                            {dropdownOpen && (
                                <ul className="dropdown-options">
                                    {departments.map(departments => (
                                        <li
                                            key={departments._id}
                                            onClick={() => {
                                                setSelectedDepartment(departments.title)
                                                setDepartmentID(departments._id)
                                                setDropdownOpen(false)
                                            }}
                                            className="dropdown-option bg-[#fff] dark:bg-[#242A38]/95 dark:hover:opacity-95 !text-gray-900 dark:!text-white"

                                        >
                                            {departments.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className={`!bg-[#fff] dark:!bg-[#242A38] !w-full !h-72 flex !p-3 md:w-1/3 rounded ${bodyValue.length >= 1 && "border !border-[#22c55e]"} ${bodyValueBlur && "border border-[#ef4444]"}`}>
                        <textarea
                            onBlur={() => setBodyValueBlur(true)}
                            value={bodyValue}
                            onChange={(e) => setBodyValue(e.target.value)}
                            placeholder="متن تیکت:"
                            className={`md:!text-base dana-regular focus:ring-0 border-0 !text-gray-900 placeholder:!text-slate-500 dark:placeholder:!text-gray-400 dark:!text-white !text-start !text-sm !w-full bg-inherit  resize-none h-full`}
                        ></textarea>
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row md:justify-between">
                        <div>
                            <label htmlFor="fileUploader" className="dana-medium text-[#22c55e] flex p-3 cursor-pointer items-center md:w-64 justify-between w-full border rounded border-[#22c55e]">
                                <span>آپلود پیوست</span>
                                <BsUpload className="text-lg" />
                            </label>
                            <input onChange={e => setFile(e.target.files[0])} className="hidden" id="fileUploader" type="file" />
                        </div>
                        <button disabled={!isFormValid} onClick={setNewTicket} className="bg-[#22c55e] rounded dana-medium py-3 md:w-64 disabled:opacity-60">ارسال تیکت</button>
                    </div>
                </form>
            </div>
            <Toastify />
        </>

    )
}
