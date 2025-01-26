import { useContext, useEffect, useState } from "react";
import SabzLearnContext from "../../Contexts/SabzlearnContext";
import { TiInfoOutline } from "react-icons/ti";
import { Outlet, useNavigate } from "react-router-dom";
import CircleSpinner from "../../Components/CircleSpinner/CircleSpinner";
import CmsSideBar from "../../Components/CMS/CmsSideBar/CmsSideBar";
import TopBar from "../../Components/CMS/TopBar/TopBar";

export default function CMS() {
    let { setOpenUserMenu } = useContext(SabzLearnContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isCmsSideBar, setIsCmsSideBar] = useState(false);
    const [userInfos, setUserInfos] = useState({});
    let navigate = useNavigate()
    document.title = "پنل مدیریت"


    useEffect(() => {
        setOpenUserMenu(false)

    }, [setOpenUserMenu])

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem('user'));
        if (localStorageData) {
            fetch('https://web-api-silk-three.vercel.app/v1/auth/me', {
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${localStorageData.token}`,
                }
            }).then(res => res.json())
                .then(result => {
                    if (result) {
                        setUserInfos(result)
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 500);
                    }
                })
        } else {
            setIsLoading(false)
        }
    }, []);


    if (isLoading || !userInfos) {
        // Render a loading spinner or animation
        return (
            <div className="flex items-center justify-center h-screen">
                <CircleSpinner />
            </div>
        )
    }

    return (
        <>
            {userInfos.role === 'ADMIN' ? (
                <>
                    <div className="min-h-screen w-full lg:pr-[270px] p-3">
                        <TopBar userInfos={userInfos} setIsCmsSideBar={setIsCmsSideBar} />
                        <Outlet />
                    </div>

                    <CmsSideBar isCmsSideBar={isCmsSideBar} setIsCmsSideBar={setIsCmsSideBar} />
                </>
            ) : (
                <div className="dark:bg-[#111827] h-screen mt-7 sm:mt-10">
                    <div className="slide px-2">
                        <div className="flex items-center gap-5 flex-wrap sm:justify-between justify-center p-5 rounded bg-[#ef4444]">

                            <div className="flex dana-regular flex-col sm:flex-row items-center gap-3">
                                <TiInfoOutline className="text-3xl" />
                                <span className="text-center">
                                    فاقد دسترسی!!! این بخش مختص ادمین است.
                                </span>
                            </div>
                            <button onClick={() => navigate(-1)} className="bg-[#22c55e] py-3 w-40 rounded dana-medium">
                                صفحه قبلی
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

