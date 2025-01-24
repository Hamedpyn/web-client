import { useContext } from 'react'
import UserPanelTitle from '../../../Components/UserPanelTitle/UserPanelTitle'
import SabzLearnContext from "../../../Contexts/SabzlearnContext"
import NotExistedArray from '../../../Components/NotExistedArray/NotExistedArray'
import CourseBox from '../../../Components/CourseBox/CourseBox'

export default function Courses() {
    let { userInfos } = useContext(SabzLearnContext)
    return (
        <div className='px-4 lg:px-8'>
            <UserPanelTitle label={`دوره های من (${userInfos.courses.length})`} />
            <div className="pb-2 md:pb-4 md:pr-5 p-3 md:p-5">
                <div className=""></div>
                {!userInfos.courses.length ? (
                    <NotExistedArray course={true} msg={'شما دوره ای خریداری نکردید.'} />
                ) : (

                    <div className="p-3 md:p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {userInfos.courses.filter(course => course !== null).map(item => (
                            <CourseBox key={item._id}  {...item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
