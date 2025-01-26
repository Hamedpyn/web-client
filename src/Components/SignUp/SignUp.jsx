import { CiUser } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { MdFamilyRestroom, MdOutlineLocalPhone, MdOutlineMail } from "react-icons/md";
import Input from "../Input/Input";
import { emailValidators, maxValidators, minValidators } from "../../Rules/Rules";
import { useForm } from "../../Hooks/useFrom";
import { useNavigate } from "react-router";
import Toastify, { Notify } from '../Toastify/Toastify'
import { useContext } from "react";
import SabzLearnContext from "../../Contexts/SabzlearnContext";

export default function SignUp({ setState }) {
    let navigate = useNavigate()
    const { login } = useContext(SabzLearnContext)

    const [formState, onInputHandler] = useForm({
        signUpEmail: {
            value: '',
            isValid: false
        },
        signUpPass: {
            value: '',
            isValid: false
        },
        signUpName: {
            value: '',
            isValid: false
        },
        signUpSirName: {
            value: '',
            isValid: false
        },
        signUpNum: {
            value: '',
            isValid: false
        },
    }, false)


    const registerUser = async (e) => {
        const { signUpEmail, signUpPass, signUpName, signUpSirName, signUpNum } = formState.inputs;
        e.preventDefault();

        const newUserDetails = {
            name: signUpSirName.value,
            username: signUpName.value,
            phone: signUpNum.value,
            email: signUpEmail.value,
            password: signUpPass.value,
            confirmPassword: signUpPass.value,
        };

        try {
            await fetch('https://web-api-silk-three.vercel.app/v1/auth/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserDetails),
            }).then(res => res.json()).then(result => {
                console.log(result.message);
                if (result.message === "this phone number banned!") {
                    console.log(result.message);
                    Notify('banReg')

                } else {
                    if (result.accessToken) {
                        login(result.accessToken, result.user)
                        Notify('success')
                        setTimeout(() => {
                            navigate('/') // Navigate user after successful registration
                        }, 2500);
                    } else {
                        Notify('errorReg')
                    }
                }
            })


        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <>
            <div className="w-full flex !z-50 justify-center">
                <div className="max-w-[400px] w-full pt-5 p-6 text-center bg-white dark:bg-[#242A38] rounded-2xl">
                    <div className="user-data">
                        <h4 className="dana-bold text-xl mb-4 sm:mb-5 text-gray-900 dark:text-white">عضویت</h4>
                        <p className="mb-5 dana-regular text-gray-900 dark:text-white">
                            قبلا ثبت نام کرده اید؟
                            <a className="dana-demi cursor-pointer text-[#22c55e]" onClick={() => setState(false)}> وارد شوید</a>
                        </p>
                        <form>

                            <Input id='signUpSirName' onInputHandler={onInputHandler} style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="نام و نام خانوادگی" validations={[
                                minValidators(6),
                                maxValidators(25)
                            ]} >
                                <MdFamilyRestroom className="text-2xl text-slate-400" />
                            </Input>

                            <Input id='signUpName' onInputHandler={onInputHandler} style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="نام کاربری" validations={[
                                minValidators(6),
                                maxValidators(16)
                            ]} >
                                <CiUser className="text-2xl text-slate-400" />
                            </Input>
                            <Input id='signUpNum' onInputHandler={onInputHandler} style={{ all: 'unset' }} type="number" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="شماره تلفن" validations={[
                                minValidators(11),
                                maxValidators(11)
                            ]} >
                                <MdOutlineLocalPhone className="text-2xl text-slate-400" />
                            </Input>

                            <Input onInputHandler={onInputHandler} id='signUpEmail' style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="آدرس ایمیل" validations={[
                                emailValidators(),
                                maxValidators(40)
                            ]}>
                                <MdOutlineMail className="text-2xl text-slate-400" />
                            </Input>

                            <Input onInputHandler={onInputHandler} id='signUpPass' style={{ all: 'unset' }} type="password" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="رمز عبور" validations={[
                                minValidators(8),
                                maxValidators(20)
                            ]}>

                                <GoLock className="text-2xl text-slate-400" />
                            </Input>

                            <button onClick={registerUser} disabled={!formState.formIsValid} type="submit" className="dana-demi disabled:opacity-60 bg-[#22c55e] h-[52px] rounded-full w-full">ثبت نام</button>
                        </form>
                    </div>

                </div>

            </div>
            <div className="">
                <Toastify />
            </div>
        </>

    )
}
