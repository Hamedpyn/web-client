/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import { maxValidators, minValidators } from "../../Rules/Rules";
import { GoLock, GoUnlock } from "react-icons/go";
import { useForm } from "../../Hooks/useFrom";
import { CiUser } from "react-icons/ci";
import { useContext, useState } from "react";
import Toastify, { Notify } from "../Toastify/Toastify";
import SabzLearnContext from "../../Contexts/SabzlearnContext";

export default function Login({ setState }) {
	let navigate = useNavigate()
	const { login } = useContext(SabzLearnContext)
	const [showPass, setShowPass] = useState(true)

	const [formState, onInputHandler] = useForm({
		username: {
			value: '',
			isValid: false
		},
		userpass: {
			value: '',
			isValid: false
		},
	}, false)


	const LoginUser = async (e) => {
		e.preventDefault();
		const { username, userpass } = formState.inputs;
		const userLoginData = {
			identifier: username.value,
			password: userpass.value,
		};

		try {
			const response = await fetch('https://web-api-silk-three.vercel.app/v1/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userLoginData),
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}

			const result = await response.json();
			if (result.accessToken) {
				Notify('success');
				setTimeout(() => {
					login(result.accessToken, {});
					navigate('/')
				}, 3000);
			} else {
				Notify('error');
			}
		} catch (error) {
			console.error('Error:', error);
			Notify('error');
		}
	};


	return (
		<>

			<div className="w-full flex justify-center">
				<div className="max-w-[400px] w-full pt-5 p-6 text-center bg-white dark:bg-[#242A38] rounded-2xl">
					<div className="user-data">
						<h4 className="dana-bold text-xl mb-4 sm:mb-5 !text-gray-900 dark:!text-white">ورود با نام کاربری</h4>
						<p className="mb-5 dana-regular !text-gray-900 dark:!text-white">
							حساب کاربری ندارید؟
							<a className="dana-demi cursor-pointer text-[#22c55e]" onClick={() => setState(true)}> ثبت نام کنید </a>
						</p>
						<form className="">

							<Input onInputHandler={onInputHandler} id='username' style={{ all: 'unset' }} type="text" className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="نام کاربری" validations={[
								minValidators(6),
								maxValidators(16)
							]}>
								<CiUser className="text-2xl text-slate-400" />
							</Input>

							<Input onInputHandler={onInputHandler} id='userpass' style={{ all: 'unset' }} type={`${!showPass ? "text" : "password"}`} className="!text-base dana-regular !text-gray-900 dark:!text-white !text-start !pl-3 !w-full !h-full" placeholder="رمز عبور" validations={[
								minValidators(8),
								maxValidators(20)
							]}>

								{!showPass ?
									<GoUnlock title="مخفی کردن رمز" onClick={() => setShowPass(true)} className="text-2xl cursor-pointer text-slate-400" />
									:
									<GoLock onClick={() => setShowPass(false)} title="مشاهده رمز" className="text-2xl cursor-pointer text-slate-400" />
								}
							</Input>


							<button onClick={LoginUser} disabled={!formState.formIsValid} type="submit" className="dana-regular disabled:opacity-60 bg-[#22c55e] h-[52px] rounded-full w-full">ورود</button>
						</form>
						<div className="flex items-center justify-center dana-medium text-sm text-slate-500 mt-5">
							<Link to={'/Terms-conditions'} className="underline">حریم خصوصی</Link></div>
					</div>

				</div>

			</div>

			<div className="">
				<Toastify />
			</div>
		</>
	)
}
