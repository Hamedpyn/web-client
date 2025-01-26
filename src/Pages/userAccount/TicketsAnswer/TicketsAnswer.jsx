import { useEffect, useState } from "react"
import { GoInfo } from "react-icons/go";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
export default function TicketsAnswer() {
    const [ticket, setTicket] = useState([])
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    let { id } = useParams();

    useEffect(() => {
        fetch(`https://web-api-silk-three.vercel.app/v1/tickets/answer/${id}`, {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then(tickets => setTicket(tickets))
    }, [id])


    return (
        <div className="px-4 lg:px-8">
            <div className="dark:bg-[#242A38] bg-white rounded p-3 md:p-6">
                <div className="flex justify-between items-center border-b border-b-neutral-200 dark:border-b-white/10 pb-3">
                    <h2 className="dana-medium text-lg md:text-xl">#تیکت</h2>
                    {ticket.answer ? <div className="text-[#22c55e] flex items-center dana-regular gap-2">
                        <IoIosCheckmarkCircleOutline className="text-xl md:text-2xl" />
                        <span className="text-sm md:text-base">بسته شد</span>
                    </div> : <div className="text-amber-500 flex items-center dana-regular gap-2">
                        <GoInfo className="text-xl md:text-2xl" />
                        <span className="text-sm md:text-base">منتظر پاسخ</span>
                    </div>}

                </div>
                <div className="mt-5 w-full">
                    <div className="bg-[#333C4C] w-full md:w-1/2 p-3 rounded">
                        <div className="dana-regular">
                            <p className="md:text-base text-sm border-b border-b-neutral-200 dark:border-b-white/10 pb-2">{ticket.ticket}</p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-white dark:text-gray-400 pt-2 sm:pt-4 dana-regular">
                            <span>1403/09/22</span>
                            <span>16:30</span>
                        </div>
                    </div>
                    {ticket.answer ? (
                        <div className="bg-[#333C4C] mt-5 w-full md:w-1/2 mr-auto p-3 rounded">
                            <div className="dana-regular">
                                <p className="md:text-base text-sm border-b border-b-neutral-200 dark:border-b-white/10 pb-2">{ticket.answer}</p>
                            </div>
                            <div className="flex items-center justify-between text-sm text-white dark:text-gray-400 pt-2 sm:pt-4 dana-regular">
                                <span>1403/09/22</span>
                                <span>16:30</span>
                            </div>
                        </div>
                    ) : (
                        <Alert color="warning" className="mt-5 mt-5 w-full md:w-1/2 mr-auto" icon={HiInformationCircle}>
                            <span className="dana-medium">هنوز پاسخی ثبت نشده است.</span>
                        </Alert>
                    )}

                </div>
            </div>
        </div>
    )
}
