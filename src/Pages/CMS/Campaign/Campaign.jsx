import { VscPercentage } from "react-icons/vsc";
import Input from "../../../Components/Input/Input";
import { useForm } from "../../../Hooks/useFrom";
import { maxValidators, minValidators } from "../../../Rules/Rules";
import Toastify, { Notify } from "../../../Components/Toastify/Toastify";
import { useEffect } from "react";


export default function Campaign() {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    const [formState, onInputHandler] = useForm({
        percent: {
            value: '',
            isValid: false
        },

    }, false)


    const setCampaign = (e) => {
        e.preventDefault();

        fetch('https://web-api-silk-three.vercel.app/v1/offs/all', {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorageData.token}`
            },
            body: JSON.stringify({ discount: formState.inputs.percent.value })
        })
            .then(res => {
                if (res.ok) {
                    Notify('success')
                    return res.json()
                } else {
                    Notify('catError')
                }
            })
    };
    const removeCampaign = (e) => {
        e.preventDefault();

        fetch('https://web-api-silk-three.vercel.app/v1/offs/all', {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorageData.token}`
            },
        })
            .then(res => {
                if (res.ok) {
                    Notify('success')
                    return res.json()
                } else {
                    Notify('catError')
                }
            })
    };
    return (
        <div>
            <div className="mb-7 bg-white dark:bg-[#242A38] px-6 py-4 md:mx-4 rounded-xl">
                <h2 className="dana-demi md:pr-3 text-lg sm:text-xl lg:text-2xl text-black dark:text-white">ثبت <span className="text-[#22c55e] dana-extra">تخفیف همگانی</span></h2>
                <div className="flex justify-center">
                    <form className="grid grid-cols-1 md:grid-cols-2 w-full md:gap-x-4 lg:grid-cols-3 mt-4">
                        <Input id='percent' onInputHandler={onInputHandler} style={{ all: 'unset' }} type="number" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="لطفا درصد تخفیف همگانی را وارد کنید" validations={[
                            minValidators(1),
                            maxValidators(3)
                        ]} >
                            <VscPercentage className="text-2xl text-slate-400" />
                        </Input>

                        <button onClick={setCampaign} disabled={!formState.formIsValid} type="submit" className="dana-demi disabled:opacity-60 bg-[#22c55e] h-[52px] rounded-full w-full">ثبت</button>
                        <button onClick={removeCampaign} type="submit" className="dana-demi bg-[#ef4444] h-[52px] rounded-full w-full">حذف تخفیف همگانی</button>

                    </form>
                </div>

            </div>
            <Toastify />
        </div>
    )
}
