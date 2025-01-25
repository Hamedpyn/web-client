import { useContext, useEffect, useState } from "react"
import SabzLearnContext from "../../../Contexts/SabzlearnContext"
import { GiProfit } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { GiExpense } from "react-icons/gi";
import { FaSortAmountUp } from "react-icons/fa";
import { ImSortAmountDesc } from "react-icons/im";
import DataTable from "../../../Components/CMS/DataTable/DataTable";

export default function Index() {
  const [users, setUsers] = useState([])
  let { userInfos } = useContext(SabzLearnContext)
  const localStorageData = JSON.parse(localStorage.getItem('user'))
  const links = [
    { id: 1, icon: <GiProfit />, label: 'درآمد', money: 3_500_000, percent: 5.2, color: 1, amount: <FaSortAmountUp /> },
    { id: 2, icon: <FcSalesPerformance />, label: 'فروش', money: 2_000_000, percent: 12, color: 0, amount: <ImSortAmountDesc /> },
    { id: 3, icon: <GiExpense />, label: 'هزینه', money: 1_500_000, percent: 66, color: 1, amount: <FaSortAmountUp /> },
  ];
  const coursesTitle = [
    { title: 'شناسه', id: 1 },
    { title: 'نام', id: 1 },
    { title: 'نام کاربری', id: 4 },
    { title: 'ایمیل', id: 2 },
    { title: 'شماره تلفن', id: 3 },
  ]


  useEffect(() => {
    fetch('https://web-api-silk-three.vercel.app/v1/infos/p-admin', {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    })
      .then(res => res.json())
      .then(result => {
        setUsers(result.lastUsers)
      })
  }, [])

  return (
    <>
      <div>
        <div className="mb-7">
          <div>
            <h1 className="dana-demi md:pr-3 text-lg sm:text-xl lg:text-2xl text-black dark:text-white">خوش اومدید، <span className="text-[#22c55e] dana-extra">{userInfos.name}</span></h1>
          </div>
          <div className="mt-7 px-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {links.map(link => (
              <div key={link.id} className="dark:bg-[#242A38] bg-white w-full rounded-2xl">
                <div className="p-5">
                  <h3 className="dana-medium mb-1 text-xl text-gray-900 dark:text-white">{link.label}</h3>
                  <div className="flex justify-between items-center">
                    <span className="dana-demi text-lg text-gray-900 dark:text-white">
                      ${link.money.toLocaleString()}
                      <span className="text-base text-[#22c55e] mr-1">تومان</span>
                    </span>
                    <div className={`flex items-center text-base md:text-lg gap-1 ${!link.color ? 'text-[#ef4444]' : 'text-[#22c55e]'}`}>
                      <span>{link.amount}</span>
                      <span>{link.percent}%</span>
                    </div>
                    <span className="text-5xl mb-4 text-gray-900 dark:text-white">{link.icon}</span>
                  </div>
                  <p className="dana-medium opacity-70 text-gray-900 dark:text-white">{link.label} در یک ماه گذشته</p>
                </div>
              </div>
            ))}
          </div>
          <div className=""></div>
        </div>
        <DataTable newUsers={true} tableTitles={coursesTitle} Datas={users} name={'افراد اخیرا ثبت شده'} />

      </div>
    </>
  )
}
