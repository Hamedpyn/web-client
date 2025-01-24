/* eslint-disable react/prop-types */
import { Modal, Table } from "flowbite-react";
import { useMemo, useState } from "react";
import EditModal from "../../EditModal/EditModal";

export default function DataTable({ newUsers, disCounts, tickets, getAllComments, bodyValue, setBodyValue, bodySucceed, setBodySucceed, touched, setTouched, comment, tableTitles, session, cats, onEdit, Courses, Datas, name, onRemove, onBan, articles, onAccept, onReject }) {
    const [openAnswerModal, setOpenAnswerModal] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [msg, setMsg] = useState('')
    const [commentID, setCommentID] = useState("")
    const formatTime = (time) => {
        time = time.padStart(4, '0');
        if (!time.includes(":")) {
            return time.slice(0, -2) + ':' + time.slice(-2);
        } return time
    };
    return (
        <>
            <div className="overflow-x-auto bg-white dark:bg-[#242A38] px-6 py-4 md:mx-4 rounded-xl">
                <div className="py-4">
                    <h2 className="dana-demi md:pr-3 text-lg sm:text-xl lg:text-2xl text-black dark:text-white">لیست <span className="text-[#22c55e] dana-extra">{name}</span></h2>
                </div>
                <div className="lg:px-10">
                    <Table striped className="text-right" style={{ direction: 'ltr' }}>
                        <Table.Head className="group head text-xs uppercase text-gray-700 dark:text-gray-400">
                            {!Courses && !cats && !articles && !session && !newUsers && !disCounts && !tickets && (
                                <Table.HeadCell className="!rounded-none dana-regular ">بن</Table.HeadCell>
                            )}
                            {!newUsers && !tickets && (
                                <Table.HeadCell className="!rounded-none dana-regular ">حذف</Table.HeadCell>
                            )}

                            {cats && (
                                <Table.HeadCell className="!rounded-none dana-regular ">ویرایش</Table.HeadCell>

                            )}
                            {tableTitles.reverse().map(item => (
                                <Table.HeadCell key={item.id} className="!rounded-none dana-regular ">{item.title}</Table.HeadCell>

                            ))}

                        </Table.Head>
                        <Table.Body className="divide-y">
                            {useMemo(
                                () => !Courses && !cats && !articles && !session && !comment && !disCounts && !newUsers && !tickets && Datas.map((item, i) => (
                                    <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="!rounded-none dana-medium underline text-[#ef4444]" onClick={() => onBan(item._id)}>
                                            <button className="underline" onClick={() => onBan(item._id)}>Ban</button>
                                        </Table.Cell>
                                        <Table.Cell className="!rounded-none dana-medium  text-red-600/80 dark:text-red-400" >
                                            <button className="underline" onClick={() => onRemove(item._id)}>Remove</button>
                                        </Table.Cell>
                                        <Table.Cell className="!rounded-none dana-medium  text-red-600/80 dark:text-sky-400" >
                                            <button className="underline" onClick={() => onAccept(item._id)}>تغییر نقش</button>
                                        </Table.Cell>

                                        <Table.Cell className="!rounded-none dana-medium">{item.role}</Table.Cell>
                                        <Table.Cell className="!rounded-none dana-medium">{item.email}</Table.Cell>
                                        <Table.Cell className="!rounded-none dana-medium">{item.name}</Table.Cell>
                                        <Table.Cell className="!rounded-none dana-medium">{item._id.slice(0, 6)}</Table.Cell>
                                    </Table.Row>
                                ))
                                , [Datas, onBan, onRemove])}

                            {useMemo(() => Courses && Datas.map((item, i) => (
                                <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="!rounded-none dana-medium  text-red-600/80 dark:text-red-400" >
                                        <button className="underline" onClick={() => onRemove(item._id)}>Remove</button>
                                    </Table.Cell>


                                    <Table.Cell className="!rounded-none dana-medium">{item.categoryID.title}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.creator}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.isComplete === 0 ? "پیش فروش" : "درحال برگزاری"}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.price ? item.price.toLocaleString() : "رایگان"}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.name}</Table.Cell>
                                    <Table.Cell className="w-[150px]">
                                        <img className="max-w-[100px] w-[100px] rounded h-[50px]" src={`https://educational-web-site.vercel.app/courses/covers/${item.cover}`} alt="image" />
                                    </Table.Cell>

                                </Table.Row>
                            )), [Courses, Datas, onRemove])}
                            {
                                useMemo(() =>
                                    articles && Datas.map((item, i) => (
                                        <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="!rounded-none dana-medium text-red-600/80 dark:text-red-400">
                                                <button className="underline" onClick={() => onRemove(item._id)}>Remove</button>
                                            </Table.Cell>

                                            <Table.Cell className="!rounded-none dana-medium">{item.creator.name}</Table.Cell>
                                            <Table.Cell className="!rounded-none dana-medium">{item.title}</Table.Cell>
                                            <Table.Cell className="w-[150px]">
                                                <img
                                                    className="max-w-[100px] object-contain w-[100px] rounded h-[50px]"
                                                    src={`https://educational-web-site.vercel.app/courses/covers/${item.cover}`}
                                                    alt="image"
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                    )),
                                    [Datas, articles, onRemove]) // Dependencies for memoization
                            }
                            {useMemo(() => session && Datas.filter(item => item.course !== null).map((item, i) => (
                                <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="!rounded-none dana-medium  text-red-600/80 dark:text-red-400" >
                                        <button className="underline" onClick={() => onRemove(item._id)}>Remove</button>
                                    </Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.course.name}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{formatTime(item.time)}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.title}</Table.Cell>

                                    <Table.Cell className="w-[150px]">
                                        {item._id.slice(14, -5)}
                                    </Table.Cell>
                                </Table.Row>
                            )), [Datas, onRemove, session])}

                            {useMemo(() => comment && Datas.map((item, i) => (
                                <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="!rounded-none dana-medium underline text-[#ef4444]" onClick={() => onBan(item.creator._id)}>
                                        <button className="underline" onClick={() => onBan(item._id)}>Ban</button>
                                    </Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium  text-red-600/80 dark:text-red-400" >
                                        <button className="underline" onClick={() => onRemove(item._id)}>Remove</button>
                                    </Table.Cell>
                                    {!item.answer ? <Table.Cell onClick={() => onAccept(item._id)} className="!rounded-none dana-medium underline cursor-pointer text-[#22c55e]">تایید</Table.Cell> : <Table.Cell onClick={() => onReject(item._id)} className="!rounded-none dana-medium underline cursor-pointer text-[#ef4444]">عدم تایید</Table.Cell>}

                                    <Table.Cell onClick={() => {
                                        setOpenAnswerModal(true)
                                        setCommentID(item._id)
                                    }} className="!rounded-none dana-medium underline cursor-pointer">پاسخ</Table.Cell>
                                    <Table.Cell onClick={() => {
                                        setOpenModal(true)
                                        setMsg(item.body)
                                    }} className="!rounded-none cursor-pointer dana-medium underline">مشاهده</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.course}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.creator.name}</Table.Cell>

                                    <Table.Cell className={`w-[150px] ${item.answer ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                                        {item._id.slice(14, -5)}
                                    </Table.Cell>

                                </Table.Row>
                            )), [Datas, comment, onAccept, onBan, onReject, onRemove])}
                            {useMemo(() => tickets && Datas.map((item, i) => (
                                <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                    <Table.Cell onClick={() => {
                                        setOpenAnswerModal(true)
                                        setCommentID(item._id)
                                    }} className="!rounded-none dana-medium underline cursor-pointer">پاسخ</Table.Cell>
                                    <Table.Cell onClick={() => {
                                        setOpenModal(true)
                                        setMsg(item.body)
                                    }} className="!rounded-none cursor-pointer dana-medium underline">مشاهده</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.title}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.departmentID}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.user}</Table.Cell>

                                    <Table.Cell className={`w-[150px] ${item.answer ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                                        {item._id.slice(14, -5)}
                                    </Table.Cell>

                                </Table.Row>
                            )), [Datas, tickets])}
                            {useMemo(() => disCounts && Datas.map((item, i) => (
                                <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="!rounded-none dana-medium  text-red-600/80 dark:text-red-400" >
                                        <button className="underline" onClick={() => onRemove(item._id)}>Remove</button>
                                    </Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.creator}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.max}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.percent}%</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.code}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{i + 1}</Table.Cell>
                                </Table.Row>
                            )), [Datas, disCounts, onRemove])}
                            {useMemo(() => newUsers && Datas.map((item, i) => (
                                <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                    <Table.Cell className="!rounded-none dana-medium">{item.phone}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.email}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.username}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.name}</Table.Cell>

                                    <Table.Cell className="!rounded-none dana-medium">{i + 1}</Table.Cell>
                                </Table.Row>
                            )), [Datas, newUsers])}
                            {useMemo(() => cats && Datas.map((item, i) => (
                                <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="!rounded-none dana-medium  text-red-600/80 dark:text-red-400" >
                                        <button className="underline" onClick={() => onRemove(item._id)}>Remove</button>
                                    </Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium underline text-sky-500 dark:text-sky-400">
                                        <button className="underline" onClick={() => onEdit(item._id)}>Edit</button>
                                    </Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.name}</Table.Cell>
                                    <Table.Cell className="!rounded-none dana-medium">{item.title}</Table.Cell>

                                    <Table.Cell className="!rounded-none dana-medium">{i + 1}</Table.Cell>
                                </Table.Row>
                            )), [Datas, cats, onEdit, onRemove])}
                        </Table.Body>
                    </Table>
                </div>
            </div>

            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className="dana-demi items-center flex-row-reverse">مشاهده متن</Modal.Header>
                <Modal.Body>
                    <h3 className="text-lg font-medium text-center text-gray-900 dark:text-white dana-demi">{msg}</h3>
                </Modal.Body>
            </Modal>
            <EditModal tickets={true} getAllComments={getAllComments} id={commentID} bodySucceed={bodySucceed} setBodySucceed={setBodySucceed} bodyValue={bodyValue} setBodyValue={setBodyValue} touched={touched} setTouched={setTouched} answer={true} openModal={openAnswerModal} setOpenModal={setOpenAnswerModal} msg={'لطفا پاسخ پیام را بنویسید.'} />

        </>
    );
}
