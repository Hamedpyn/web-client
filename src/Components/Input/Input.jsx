/* eslint-disable react/prop-types */
import { useEffect, useReducer } from "react";
import Validator from "../../Rules/ValidInputs";

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.value,
                isValid: Validator(action.value, action.validations),
            };
        case "TOUCH":
            return {
                ...state,
                touched: true,
            };
        default:
            return state;
    }
};

export default function Input(props) {
    const [mainInput, dispatch] = useReducer(inputReducer, {
        value: "",
        isValid: false,
        touched: false,
    });

    const { value, isValid } = mainInput
    useEffect(() => {
        props.onInputHandler(props.id, value, isValid)
    }, [value])


    const element = (
        <div className={`flex flex-col items-start ${mainInput.touched ? "mb-0" : "mb-4"} ${mainInput.isValid && "mb-4"}`}>
            <div
                className={`flex bg-[#f3f4f6] dark:bg-[rgb(51,60,76)] h-[52px] rounded-xl items-center justify-between w-full flex-row-reverse px-3 ${mainInput.isValid && "border !border-[#22c55e]"} ${mainInput.touched && 'border border-[#ef4444]'}`}
            >
                {props.children}
                <input
                    id={props.id}
                    style={props.style}
                    type={props.type}
                    placeholder={props.placeholder}
                    value={mainInput.value}
                    className={props.className}
                    onChange={(e) => {
                        dispatch({
                            type: "CHANGE",
                            value: e.target.value,
                            validations: props.validations,
                        });
                    }}
                    onBlur={() => {
                        dispatch({ type: "TOUCH" });
                    }}
                />
            </div>

            {!mainInput.isValid && mainInput.touched && props.placeholder === "آدرس ایمیل" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">ایمیل باید معتبر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "لطفا عنوان را وارد کنید" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">عنوان باید بین 3 تا 25 کاراکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "عنوان جلسه" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">عنوان جلسه باید بین 5 تا 30 کاراکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "مدت زمان جلسه" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">لطفا 4 رقم وارد کنید</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "نام دوره" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">نام دوره باید بین 6 تا 80 کاراکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "کد تخفیف" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">کد تخفیف باید بین 2 تا 15 کاراکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "نام مقاله" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">نام مقاله باید بین 6 تا 80 کاراکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "توضیحات دوره" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">توضیحات دوره باید بین 10 تا 200 کاراکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "توضیحات مقاله" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">توضیحات مقاله باید بین 10 تا 200 کاراکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "نام کوتاه" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">نام کوتاه باید بین 2 تا 10 کاراکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "دسته بندی" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">دسته بندی باید بین 1 تا 12 کاراکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "قیمت دوره" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">قیمت دوره باید بین 0 تا 12 کاراکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "پشتیبانی دوره" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">پشتیبانی دوره باید بین 8 تا 25 کاراکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "لطفا اسم کوتاه را وارد کنید" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">اسم کوتاه باید بین 2 تا 14 کاراکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "شماره تلفن" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">شماره تلفن  باید 11 رقم باشد  .</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "رمز عبور" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">رمز عبور باید بین 8 تا 20 کارکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "درصد تخفیف" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">درصد تخفیف باید عدد و حداکثر سه رقم باشد</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "تعداد دفعات قابل استفاده" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">تعداد دفعات قابل استفاده باید بین 1 تا 5 رقم باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "نام کاربری" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">نام کاربری باید بین 6 تا 16 کارکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "نام و نام خانوادگی" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">نام و نام خانوادگی باید بین 6 تا 16 کارکتر باشد.</span>
            )}
            {!mainInput.isValid && mainInput.touched && props.placeholder === "لطفا درصد تخفیف همگانی را وارد کنید" && (
                <span className="dana-regular text-sm text-[#ef4444] p-2">درصد تخفیف باید بین 0 تا 100 باشد.</span>
            )}
        </div>
    );

    return <>{element}</>;
}
