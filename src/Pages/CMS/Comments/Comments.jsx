import { useCallback, useEffect, useState } from "react";
import DataTable from "../../../Components/CMS/DataTable/DataTable";
import Pagination from "../../../Components/Pagination/Pagination";
import ModalAlert from "../../../Components/CMS/Modal/Modal";
import Toastify, { Notify } from '../../../Components/Toastify/Toastify'

export default function Comments() {
    const commentsTitle = [
        { title: 'شناسه', id: 1 },
        { title: 'کاربر', id: 2 },
        { title: 'دوره', id: 3 },
        { title: 'مشاهده', id: 4 },
        { title: 'پاسخ', id: 6 },
        { title: 'وضعیت', id: 5 },
    ]
    const [bodyValue, setBodyValue] = useState("");
    const [touched, setTouched] = useState(false);
    const [bodySucceed, setBodySucceed] = useState(false);
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const [openModal, setOpenModal] = useState(false)
    const [openBanModal, setOpenBanModal] = useState(false)
    const [openAcceptModal, setOpenAcceptModal] = useState(false)
    const [openRejectModal, setOpenRejectModal] = useState(false)
    const [commentID, setCommentID] = useState("")
    const [userID, setUserID] = useState("")
    const [Comments, setComments] = useState([])
    const [FilteredComments, setFilteredComments] = useState([])

    const getAllComments = useCallback(() => {
        fetch('https://web-api-silk-three.vercel.app/v1/comments',{
            credentials: 'include',
        })
            .then(res => res.json())
            .then(setComments)
    }, [])

    useEffect(() => {
        getAllComments()
    }, [getAllComments])

    const removeConfirmation = (ID) => {
        setOpenModal(true)
        setCommentID(ID)
    };
    const removeComment = () => {
        fetch(`https://web-api-silk-three.vercel.app/v1/comments/${commentID}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            },
        })
            .then(res => {
                if (res.ok) {
                    Notify("success")
                    getAllComments()
                    return res.json()
                } else {
                    Notify("catError")
                }
            })
    };
    const banConfirmation = (ID) => {
        setOpenBanModal(true)
        setUserID(ID)
    };
    const BanUser = () => {
        fetch(`https://web-api-silk-three.vercel.app/v1/users/ban/${userID}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            },
        })
            .then(res => {
                if (res.ok) {
                    Notify("success")
                    return res.json()
                } else {
                    Notify("catError")
                }
            })
    };
    const acceptCommentConfirmation = (ID) => {
        setOpenAcceptModal(true)
        setCommentID(ID)
    };
    const rejectCommentConfirmation = (ID) => {
        setOpenRejectModal(true)
        setCommentID(ID)
    };
    const acceptComment = () => {
        fetch(`https://web-api-silk-three.vercel.app/v1/comments/accept/${commentID}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            },
        })
            .then(res => {
                if (res.ok) {
                    Notify("success")
                    getAllComments()
                    return res.json()
                } else {
                    Notify("catError")
                }
            })
    };
    const rejectComment = () => {
        fetch(`https://web-api-silk-three.vercel.app/v1/comments/reject/${commentID}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            },
        })
            .then(res => {
                if (res.ok) {
                    Notify("success")
                    getAllComments()
                    return res.json()
                } else {
                    Notify("catError")
                }
            })
    };
    return (
        <>
            <div>

                <DataTable onReject={rejectCommentConfirmation} onAccept={acceptCommentConfirmation} getAllComments={getAllComments} bodySucceed={bodySucceed} setBodySucceed={setBodySucceed} bodyValue={bodyValue} setBodyValue={setBodyValue} touched={touched} setTouched={setTouched} onRemove={removeConfirmation} onBan={banConfirmation} comment={true} tableTitles={commentsTitle} Datas={FilteredComments} name={'کامنت ها'} />

                <Pagination items={Comments} itemsCount={8} setShownCourse={setFilteredComments} />

                <ModalAlert onRemove={removeComment} openModal={openModal} setOpenModal={setOpenModal} msg={"آیا از حذف کامنت اطمینان دارید؟"} />

                <ModalAlert onRemove={BanUser} openModal={openBanModal} setOpenModal={setOpenBanModal} msg={"آیا از بن کاربر اطمینان دارید؟"} />
                <ModalAlert onRemove={acceptComment} openModal={openAcceptModal} setOpenModal={setOpenAcceptModal} msg={"آیا از تایید کامنت اطمینان دارید؟"} />
                <ModalAlert onRemove={rejectComment} openModal={openRejectModal} setOpenModal={setOpenRejectModal} msg={"آیا از عدم تایید کامنت اطمینان دارید؟"} />

            </div>
            <Toastify />
        </>
    )
}
