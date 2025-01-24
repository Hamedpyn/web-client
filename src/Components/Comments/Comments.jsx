import PersianDate from '../PersianDate/PersianDate'
import { TiInfoOutline } from 'react-icons/ti'
import { GrUndo } from 'react-icons/gr'
import Toastify, { Notify } from '../Toastify/Toastify'
import { BsExclamationTriangle } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import BoxesTitle from '../BoxesTitle/BoxesTitle'
import { memo, useContext, useRef, useState } from 'react'
import SabzLearnContext from "../../Contexts/SabzlearnContext"
import { HiChatBubbleLeftRight } from 'react-icons/hi2'

export default memo(function Comments({ setIsNewComment, isNewComment, closeComment, comments, sendComment }) {
    let { isLoggedIn, userInfos } = useContext(SabzLearnContext)
    const contentRef = useRef(null)
    const [newCommentBody, setNewCommentBody] = useState('')
    return (
        <BoxesTitle onComment={() => {
            if (!isLoggedIn) {
                Notify('noComment')
            }
            setIsNewComment(true)
        }} comment={true} bg={"bg-[#EF4444]"} title={"نظرات"} icon={<HiChatBubbleLeftRight className="hidden md:inline-block text-[#EF4444] w-10 h-10" />}>
            {isLoggedIn ? (
                <div
                    ref={contentRef}
                    style={{
                        maxHeight: isNewComment ? `400px` : "0px",
                        transition: "max-height 0.3s ease",
                    }}
                    className="overflow-hidden"
                >
                    <div className="flex gap-x-3.5 mb-4 sm:mb-5">
                        <div className="flex-center p-1.5 border border-b-neutral-300 dark:border-white/10 rounded-full">
                            <div className="flex items-center justify-center w-11 sm:w-12 h-11 sm:h-12 bg-[#333C4C] rounded-full">
                                <FaUser className="w-5 sm:w-6 h-5 sm:h-6 text-white dark:text-slate-500" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="dana-medium text-gray-900 dark:text-white">{userInfos.name}</span>
                            <span className="dana-regular text-sm opacity-70 text-gray-900 dark:text-white">ثبت نظر جدید</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-1.5 md:gap-x-1 bg-[#EF4444] text-white px-4 py-3 rounded-lg mb-3">

                        <BsExclamationTriangle className="size-6 shrink-0" />
                        <p className="text-sm dana-medium">لطفا پرسش مربوط به هر درس یا ویدئو دوره را در صفحه همان ویدئو مطرح کنید.</p>
                    </div>
                    <textarea value={newCommentBody} onChange={(e) => setNewCommentBody(e.target.value)} rows="6" className="border-0 w-full block p-5 md:p-4 bg-[#f1f2f3] dark:bg-[#333C4C]  text-slate-500 dark:text-white placeholder:text-slate-500/70 dana-medium text-sm rounded-xl" placeholder="نظر خود را بنویسید ...">

                    </textarea>
                    <div className="flex gap-x-4 justify-end mt-5 sm:mt-6">
                        <button onClick={() => closeComment()} className="py-3 rounded-full flex-grow sm:grow-0 sm:w-36 button-lg button-primary button-outline dana-medium border border-[#22C55E] transition-colors hover:bg-[#22C55E] hover:text-white text-[#22C55E]">لغو</button>
                        <button onClick={() => sendComment(newCommentBody)} className="py-3 hover:bg-[#16A34A] transition-colors rounded-full bg-[#22C55E] flex-grow sm:grow-0 sm:w-36 button-lg button-primary dana-medium">ارسال</button>
                    </div>
                </div>) : (
                <Toastify />
            )}

            <div
                style={{
                    maxHeight: isNewComment && isLoggedIn ? `0px` : "400px",
                    transition: "max-height 0.3s",
                }}
                className={`overflow-hidden`} >
                <p className="text-[#22C55E] bg-[#22C55E]/10 p-4 md:p-5 rounded-lg text-sm dana-demi mb-6">دانشجوی عزیز؛ سوالات مرتبط به پشتیبانی دوره در قسمت نظرات تایید نخواهد شد، لطفا در بخش مشاهده آنلاین هر ویدیو سوالات خود را مطرح کنید.</p>
            </div>
            {/* new comment */}
            {comments.length != 0 ? comments.reverse().map(c => (
                <div key={c._id} className="dark:bg-[#333C4C] bg-[#F3F4F6] p-5 rounded-xl">
                    <div className="border-b border-b-neutral-200 dark:border-b-white/10
flex justify-between items-center pb-3 ">
                        <div className="flex gap-3">
                            <img className="border rounded-full  border-white/10 p-1 w-14" src={c.creator.profile || "/images/ba986f5ecace8be41dfdf99d3000078f.png"} alt="profile" />
                            <div className="flex flex-col justify-center gap-2">
                                <div className="flex items-center gap-1 dark:text-white text-gray-900">
                                    <h4 className="dana-regular h-6">{c.creator.name}</h4>
                                    <span className="dana-demi">| {c.creator.role == "USER" ? "کاربر" : "ادمین"}</span>
                                </div>
                                <span className="dana-regular text-sm opacity-70 dark:text-white text-gray-900"><PersianDate isoDate={c.createdAt} /></span>
                            </div>
                        </div>
                        <button className="border group border-[#0EA5E9] transition-colors hover:bg-[#0EA5E9] rounded-full p-2">
                            <GrUndo className="text-xl group-hover:text-white transition-colors text-[#0EA5E9] " />
                        </button>
                    </div>
                    <div className={c.answerContent ? "py-4" : "pt-4"}>
                        <p className="dana-regular dark:text-white text-gray-900">{c.body}</p>
                    </div>
                    {/* reply */}
                    {c.answerContent && (
                        <>
                        <div className="dark:bg-[#242A38] mb-2 bg-[#E5E7EB] p-5 rounded-xl">
                            <div className="border-b border-b-neutral-300 dark:border-b-white/10 flex items-center pb-3 ">
                                <div className="flex gap-3">
                                    <div className="relative">
                                        <div className="absolute">
                                            <img className="w-5" src="/images/check-symbol-4794.svg" alt="" />
                                        </div>
                                        <img className="border rounded-full border-[#0EA5E9] p-1 w-14" src={c.answerContent.creator.profile || "/images/ba986f5ecace8be41dfdf99d3000078f.png"} alt="" />
                                    </div>
                                    <div className="flex flex-col justify-center gap-2">
                                        <div className="flex items-center gap-1 ">
                                            <h4 className="dana-regular h-6 dark:text-white text-gray-900">{c.answerContent.creator.name}</h4>
                                            <span className="dana-demi dark:text-white text-gray-900">| {c.answerContent.creator.role == "ADMIN" && "ادمین"}</span>
                                        </div>
                                        <span className="dana-regular dark:text-white text-gray-900 text-sm opacity-70">
                                            <PersianDate isoDate={c.answerContent.createdAt} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="py-4">
                                <p className="dana-regular dark:text-white text-gray-900">{c.answerContent.body}</p>
                            </div>
                        </div>
                        
                        </>
                    )}
                </div>
            )) : (
                <div className=" border-red-900 border-y-4 bg-red-500 text-white p-4 md:p-5 rounded-lg text-lg dana-demi flex flex-col items-center gap-2 sm:flex-row justify-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <TiInfoOutline className="text-3xl" />
                        <span className="mt-1 text-base">کامنت ای مرتبط با این دوره وجود ندارد.</span>
                    </div>
                </div>


            )}

        </BoxesTitle>
    )
})