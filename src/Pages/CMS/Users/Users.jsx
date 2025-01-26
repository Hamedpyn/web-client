import { useCallback, useState } from "react";
import DataTable from "../../../Components/CMS/DataTable/DataTable";
import { useEffect } from "react";
import { CiUser } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { MdFamilyRestroom, MdOutlineLocalPhone, MdOutlineMail } from "react-icons/md";
import Pagination from "../../../Components/Pagination/Pagination";
import ModalAlert from "../../../Components/CMS/Modal/Modal";
import Toastify, { Notify } from '../../../Components/Toastify/Toastify'
import Input from "../../../Components/Input/Input";
import { emailValidators, maxValidators, minValidators } from "../../../Rules/Rules";
import { useForm } from "../../../Hooks/useFrom";

export default function Users() {
  const [openModal, setOpenModal] = useState(false);
  const [openBanModal, setOpenBanModal] = useState(false);
  const [openRollModal, setOpenRollModal] = useState(false);
  const [Users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [userId, setUserId] = useState('')
  const [value, setValue] = useState('')
  const localStorageData = JSON.parse(localStorage.getItem('user'))
  const tableTitles = [
    { title: 'شناسه', id: 1 },
    { title: 'نام و نام خانوادگی', id: 2 },
    { title: 'ایمیل', id: 3 },
    { title: 'نقش', id: 4 },
    { title: 'تغییر نقش', id: 4 },
  ]
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

  const getAllUsers = useCallback(
    (() => {
      fetch("https://web-api-silk-three.vercel.app/v1/users", {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${localStorageData.token}`
        }
      }).then(res => res.json())
        .then(result => {
          setUsers(result)
        })
    }), [])

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])


  const removeUser = (userId) => {
    setOpenModal(true)
    setUserId(userId)
  };

  const removeMustHappen = () => {
    setOpenModal(false);
    fetch(`https://web-api-silk-three.vercel.app/v1/users/${userId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    }).then((res) => {
      if (res.ok) {
        Notify('delete');
        getAllUsers(); // Fetch updated users immediately
      }
    });
  };

  const banMustHappen = () => {
    setOpenModal(false);
    fetch(`https://web-api-silk-three.vercel.app/v1/users/ban/${userId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    }).then((res) => {
      if (res.ok) {
        Notify('ban');
      }
    })
  };

  const banUser = (userId) => {
    setOpenBanModal(true)
    setUserId(userId);
  };

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
        if (result.message === "this phone number banned!") {
          Notify('banReg')
        } else {
          if (result.accessToken) {
            Notify('success')
          } else {
            Notify('errorReg')
          }
        }
      })


    } catch (error) {
      console.error('Error:', error);
    }
  };

  const changeRollConfirmation = (userId) => {
    setUserId(userId)
    setOpenRollModal(true)
  };

  const changeRoll = () => {
    fetch('https://web-api-silk-three.vercel.app/v1/users/role', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ id: userId, role: value.toUpperCase() })
    }).then(res => {
      if (res.ok) {
        Notify('success')
        getAllUsers()
        return res.json()
      } else {
        Notify('catError')
      }
    })
  };
  return (
    <>

      <div>
        <div className="mb-7 bg-white dark:bg-[#242A38] px-6 py-4 md:mx-4 rounded-xl">
          <h2 className="dana-demi md:pr-3 text-lg sm:text-xl lg:text-2xl text-black dark:text-white">ثبت نام <span className="text-[#22c55e] dana-extra">کاربر</span></h2>
          <div className="flex justify-center">
            <form className="grid grid-cols-1 md:grid-cols-2 w-full md:gap-x-4 lg:grid-cols-3 mt-4">
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
              <button onClick={registerUser} disabled={!formState.formIsValid} type="submit" className="dana-demi disabled:opacity-60 bg-[#22c55e] h-[52px] rounded-full w-full">ثبت</button>

            </form>
          </div>

        </div>
        <DataTable onAccept={changeRollConfirmation} tableTitles={tableTitles} onBan={(e) => banUser(e)} Datas={filteredUsers} onRemove={removeUser} name={'کاربران'} />
        <Pagination items={Users} itemsCount={8} setShownCourse={setFilteredUsers} />
        <ModalAlert onRemove={removeMustHappen} openModal={openModal} setOpenModal={setOpenModal} msg={"آیا از حذف کاربر اطمینان دارید؟"} />
        <ModalAlert onRemove={banMustHappen} openModal={openBanModal} setOpenModal={setOpenBanModal} msg={"آیا از بن کاربر اطمینان دارید؟"} />
        <ModalAlert value={value} setValue={setValue} roll={true} onRemove={changeRoll} openModal={openRollModal} setOpenModal={setOpenRollModal} msg={"نقش موردنظر خود را وارد کنید"} />
      </div>
      <Toastify />
    </>
  )
}
