import { useEffect, useState } from "react";
import UserPanelTitle from "../../../Components/UserPanelTitle/UserPanelTitle";
import PersianDate from "../../../Components/PersianDate/PersianDate"
import NotExistedArray from "../../../Components/NotExistedArray/NotExistedArray"
import Pagination from "../../../Components/Pagination/Pagination";
import { Link } from "react-router-dom";

export default function TransActions() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    let localStorageData = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        fetch('https://web-api-silk-three.vercel.app/v1/orders', {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then(result => {
                setOrders(result)
            })
    }, [])

    return (
        <div className="px-4 lg:px-8">
            <UserPanelTitle label={`سفارشات من (${orders.length})`} />

            <div className="pb-2 md:pb-4 md:pr-5 overflow-x-auto p-3 md:p-5">
                {!orders.length ? (
                    <NotExistedArray msg={'شما سفارش تکمیل شده ای ندارید.'} />

                ) : (
                    <>

                        <div className="min-w-[840px] md:min-w-[900px] grid grid-cols-12 text-sm md:text-base font-danaMedium items-center text-center h-12 dark:bg-[#242A38] bg-white px-3 mb-4 rounded dana-demi text-gray-900 dark:text-white">
                            <div className="col-span-1 text-nowrap">شماره پیگیری</div>
                            <div className="col-span-5">شرح سفارش</div>
                            <div className="col-span-2">تاریخ سفارش</div>
                            <div className="col-span-2">مبلغ سفارش</div>
                            <div className="col-span-2">وضعیت سفارش</div>
                        </div>
                        <div className="min-w-[840px] md:min-w-[900px] space-y-4">

                            {filteredOrders.filter(order => order.course !== null).map(order => (
                                <div key={order._id} className="grid grid-cols-12 items-center text-sm md:text-base text-center h-16 dark:bg-[#242A38] bg-white rounded divide-x divide-x-reverse divide-neutral-200 dark:divide-dark text-gray-900 dark:text-white child:px-3 dana-regular">

                                    <div className="col-span-1">{order._id.slice(4, 9)}</div>

                                    <Link to={`/course/${order.course.shortName}`} className="col-span-5">خرید {order.course.name}</Link>

                                    <div className="col-span-2"><PersianDate isoDate={order.createdAt} /> </div>

                                    {order.course.price == 0 ? (
                                        <div className="col-span-2">رایگان</div>
                                    ) : (

                                        <div className="col-span-2">{order.course.price.toLocaleString()}&nbsp;<span>تومان</span></div>
                                    )}

                                    <div className="col-span-2">


                                        <div className="inline-flex items-center justify-center bg-green-50 dark:bg-[#22c55e]/10 text-[#22c55e]  dana-medium text-xs md:text-sm py-1 px-2.5 md:px-5 rounded select-none">
                                            پرداخت شده        </div>

                                    </div>

                                </div>
                            ))}
                            <Pagination items={orders.filter(item => item.course !== null)} itemsCount={5} setShownCourse={setFilteredOrders} />

                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
