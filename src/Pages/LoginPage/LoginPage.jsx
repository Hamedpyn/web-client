import { useContext, useState } from "react"
import Login from "../../Components/Login/Login";
import { Link } from "react-router-dom";
import SignUp from "../../Components/SignUp/SignUp";
import SabzLearnContext from "../../Contexts/SabzlearnContext";
import { useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

export default function LoginPage() {
    const [isSignInPage, setIsSignInPage] = useState(false)
    let { openUserMenu, setOpenUserMenu } = useContext(SabzLearnContext)
    useEffect(() => {
        setOpenUserMenu(false)
    }, [openUserMenu])
    
    return (
        <>
            <Header />
            <div className={`w-full flex flex-col gap-7 px-3 items-center justify-center ${isSignInPage ? 'mt-7' : 'mt-10 md:mt-12'}`}>
                <div className="hidden md:block absolute top-0 left-0 w-[300px] h-[300px] bg-sky-500 opacity-20 blur-[120px] rounded-full"></div>

                <Link to="/" title="سبز لرن" className="flex items-center gap-x-2">
                    <img src="/images/logo.webp" className="h-16" alt="سبز لرن" loading="lazy" />
                    <span className="dana-extra text-5xl text-gray-900 dark:text-white">سبزلرن</span>
                </Link>


                {isSignInPage ? <SignUp setState={setIsSignInPage} /> : <Login setState={setIsSignInPage} />}

                <div className="max-w-[330px] w-full dana-medium mx-auto text-center mt-3 sm:mt-8 text-gray-900 dark:text-white">
                    با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمات <Link to='/' className="text-[#22c55e]"> سبزلرن </Link> را پذیرفته اید.
                </div>

                <div className="hidden md:block absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-400 opacity-20 blur-[120px] rounded-full"></div>
            </div>
            <Footer />
        </>
    )
}
