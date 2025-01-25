import { Modal } from "flowbite-react";
import { MdOutlineShortText, MdOutlineTitle } from "react-icons/md";
import { useEffect, useState } from "react";
import Toastify, { Notify } from "../Toastify/Toastify"

export default function EditModal({ getAllComments, id, touched, bodyValue, setBodyValue, bodySucceed, setBodySucceed, setTouched, answer, name, setName, inputValue, tickets, setInputValue, openModal, setOpenModal, msg, onEdit }) {
    const [titleTouched, setTitleTouched] = useState(null)
    const [nameTouched, setNameTouched] = useState(null)
    const [isValid, setIsValid] = useState(false)
    const [totalValid, setTotalValid] = useState(false)
    const [nameValid, setNameValid] = useState(false)


    function onCloseModal(e) {
        setOpenModal(false)
        setInputValue("")
        setIsValid(false)
        setTitleTouched(false)
        e.stopPropagation()
        setName("")
    }
    useEffect(() => {
        setTotalValid(true)
    }, [isValid, nameValid])

    const sendAnswer = (e) => {
        e.preventDefault()
        setOpenModal(false)
        setBodySucceed(false)
        setTouched(false)
        setBodyValue('')
        if (tickets) {
            fetch(`https://edu-web-client.vercel.app/v1/tickets/answer/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ body: bodyValue, ticketID: id })
            }).then(res => {
                if (res.ok) {
                    Notify("success")
                    getAllComments()
                    return res.json()
                } else {
                    Notify("catError")
                }
            })
        } else {

            fetch(`https://edu-web-client.vercel.app/v1/comments/answer/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ body: bodyValue })
            }).then(res => {
                if (res.ok) {
                    Notify("success")
                    getAllComments()
                    return res.json()
                } else {
                    Notify("catError")
                }
            })
        }

    }

    useEffect(() => {
        if (bodyValue) {
            if (5 <= bodyValue.length && bodyValue.length <= 150) {
                setBodySucceed(true)
            } else {
                setBodySucceed(false)
            }
        }
    }, [bodyValue])

    return (
        <>
            <Modal dismissible show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white dana-demi">{msg}</h3>

                        {!answer ? (
                            <>
                                <div className={`flex flex-col items-start`}>

                                    <div
                                        className={`flex bg-[#f3f4f6] dark:bg-[rgb(51,60,76)] h-[52px] rounded-xl items-center justify-between w-full flex-row-reverse px-3 ${titleTouched ? "mb-0" : "mb-4"} ${isValid && "border !border-[#22c55e] mb-4"} ${titleTouched && 'border border-[#ef4444]'}`}
                                    >
                                        <MdOutlineTitle className="text-2xl text-slate-400" />

                                        <input
                                            value={inputValue}
                                            onChange={(e) => {
                                                setInputValue(e.target.value)
                                                if (e.target.value.length >= 3 && e.target.value.length <= 25) {
                                                    setIsValid(true)
                                                } else {
                                                    setIsValid(false)
                                                }
                                            }}
                                            style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="لطفا عنوان را وارد کنید"

                                            onBlur={() => {
                                                setTitleTouched(true)
                                            }}
                                        />
                                    </div>
                                    {!isValid && titleTouched && (
                                        <span className="dana-regular text-sm text-[#ef4444] p-2">عنوان باید بین 3 تا 25 کاراکتر باشد.</span>
                                    )}
                                    <div
                                        className={`flex bg-[#f3f4f6] dark:bg-[rgb(51,60,76)] h-[52px] rounded-xl items-center justify-between w-full flex-row-reverse px-3 ${nameValid && "border !border-[#22c55e]"} ${nameTouched && 'border border-[#ef4444]'}`}
                                    >
                                        <MdOutlineShortText className="text-2xl text-slate-400" />

                                        <input
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value)
                                                if (e.target.value.length >= 2 && e.target.value.length <= 14) {
                                                    setNameValid(true)
                                                } else {
                                                    setNameValid(false)
                                                }
                                            }}
                                            style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="لطفا اسم کوتاه را وارد کنید"

                                            onBlur={() => {
                                                setNameTouched(true)
                                            }}
                                        />
                                    </div>
                                    {!nameValid && nameTouched && (
                                        <span className="dana-regular text-sm text-[#ef4444] p-2">اسم کوتاه باید بین 2 تا 14 کاراکتر باشد.</span>
                                    )}
                                </div>
                                <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                                    <button disabled={!totalValid} onClick={(e) => {
                                        e.preventDefault()
                                        onEdit()
                                        setOpenModal(false)
                                        setInputValue("")
                                        setName("")
                                        setNameValid(false)
                                        setNameTouched(false)
                                        setIsValid(false)
                                        setTitleTouched(false)
                                    }} type="submit" className="dana-demi disabled:opacity-60 text-white bg-[#22c55e] h-[52px] rounded-full w-full">ثبت اطلاعات</button>
                                </div>
                            </>
                        ) : (
                            <>

                                <textarea
                                    onBlur={() => setTouched(true)}
                                    onChange={(e) => setBodyValue(e.target.value)}
                                    value={bodyValue}
                                    rows="4"
                                    className={`dana-regular outline-none border-0 focus:outline-none focus:ring-0 resize-none text-base block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg dark:bg-[#333C4C] dark:placeholder-gray-400 dark:text-white ${bodySucceed && "!border dark:border-[#22c55e] border-[#22c55e]"
                                        } ${touched && !bodySucceed && "!border dark:border-[#ef4444] border-[#ef4444]"
                                        }`}
                                    placeholder="پاسخ پیام را بنویسید."
                                />

                                {touched && !bodySucceed && <span className="dana-regular text-sm !text-[#ef4444] p-2">پاسخ پیام باید بین 5 تا 150 کاراکتر باشد.</span>}
                                <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                                    <button disabled={!bodySucceed} onClick={sendAnswer} type="submit" className="dana-demi disabled:opacity-60 text-white bg-[#22c55e] h-[52px] rounded-full w-full">ثبت پاسخ</button>
                                </div>
                            </>
                        )}
                    </div>
                </Modal.Body>

            </Modal>
            <Toastify />
        </>
    );
}
