import { useCallback, useEffect, useState } from "react"
import DataTable from "../../../Components/CMS/DataTable/DataTable"
import Pagination from "../../../Components/Pagination/Pagination"

export default function Tickets() {
    const [tickets, setTickets] = useState([])
    const [bodyValue, setBodyValue] = useState("");
    const [touched, setTouched] = useState(false);
    const [bodySucceed, setBodySucceed] = useState(false);
    const [filteredTickets, setFilteredTickets] = useState([])
    const ticketsTitle = [
        { title: 'شناسه', id: 1 },
        { title: 'کاربر', id: 2 },
        { title: 'دپارتمان', id: 3 },
        { title: 'موضوع', id: 5 },
        { title: 'مشاهده', id: 4 },
        { title: 'پاسخ', id: 6 },
    ]
    let localStorageData = JSON.parse(localStorage.getItem('user'))
    const getAllTickets = useCallback(() => {
        fetch('https://educational-web-site.vercel.app/v1/tickets', {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then(setTickets)
    }, [])

    useEffect(() => {
        getAllTickets()
    }, [getAllTickets])
    return (
        <>
            <div>
                <DataTable bodySucceed={bodySucceed} setBodySucceed={setBodySucceed} bodyValue={bodyValue} setBodyValue={setBodyValue} setTouched={setTouched} touched={touched} getAllComments={getAllTickets} tickets={true} tableTitles={ticketsTitle} Datas={filteredTickets} name={'تیکت ها'} />
                <Pagination items={tickets} itemsCount={8} setShownCourse={setFilteredTickets} />

            </div>
        </>
    )
}
