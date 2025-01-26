import { Outlet } from "react-router-dom";
import UserPanelSideBar from "../../Components/UserPanelSideBar/UserPanelSideBar";
import { useContext, useEffect, useState } from "react";
import TopBar from "../../Components/CMS/TopBar/TopBar";
import CircleSpinner from "../../Components/CircleSpinner/CircleSpinner";
import SabzLearnContext from "../../Contexts/SabzlearnContext";

export default function UserAccount() {
    let { setOpenUserMenu } = useContext(SabzLearnContext);

    const [isCmsSideBar, setIsCmsSideBar] = useState(false)
    const [userInfos, setUserInfos] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    document.title = "پنل کاربری";

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

    useEffect(() => {
        setOpenUserMenu(false)

    }, [setOpenUserMenu])

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
            <div className="min-h-screen w-full lg:pr-[16.75rem]">
                <TopBar isUser={true} userInfos={userInfos} setIsCmsSideBar={setIsCmsSideBar} />

                <Outlet />
            </div>
            <UserPanelSideBar userInfos={userInfos} setIsCmsSideBar={setIsCmsSideBar} isCmsSideBar={isCmsSideBar} />
        </>
    )
}
