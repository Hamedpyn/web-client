import { ToastContainer, toast } from 'react-toastify';

export const Notify = (type,msg) => {
  const options = {
    autoClose: 2000,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
  };

  switch (type) {
    case 'success':
      toast.success('عملیات با موفقیت به انجام رسید.', options);
      break;
    case 'Off200':
      toast.success(msg, options);
      break;
    case 'delete':
      toast.success('حذف کاربر با موفقیت به انجام رسید.', options);
      break;
    case 'banReg':
      toast.error('شماره تلفن مورد استفاده بن میباشد', options);
      break;
    case 'Off404':
      toast.error('کد تخفیف نامعتبر میباشد.', options);
      break;
    case 'Off409':
      toast.error('قبلا از این کد تخفیف استفاده کردن!', options);
      break;
    case 'catError':
      toast.error('عملیات ناموفقیت آمیز بود!', options);
      break;
    case 'file':
      toast.error('حجم فایل نباید بیشتر از 50 مگابایت باشد.', options);
      break;
    case 'ban':
      toast.success('بن کاربر با موفقیت به انجام رسید.', options);
      break;
    case 'copy':
      toast.success('لینک با موفقیت کپی شد(اما کار نمیکند:)', options);
      break;
    case 'error':
      toast.error(
        <>
          اطلاعات وارد شده نادرست است.
          لطفاً دوباره تلاش کنید
        </>,
        options
      );
      break;
    case 'errorReg':
      toast.error(
        <>
          اطلاعات وارد شده در سامانه موجود میباشد..
          لطفاً دوباره تلاش کنید
        </>,
        options
      );
      break;
    case 'noComment':
      toast.error(
        <>
          جهت ثبت کامنت، وارد سایت شوید.
        </>,
        options
      );
      break;
    case 'logout':
      toast.error(
        <>
          عملیات خروج از اکانت با موفقیت انجام شد.
        </>,
        options
      );
      break;
    case 'YesComment':
      toast.success(
        <>
          کامنت در انتظار تایید توسط ادمین است.
        </>,
        options
      );
      break;
    default:
      break;
  }
};


export default function Toastify() {
  return (
    <ToastContainer
      rtl={true}
      className={'font !top-10'}
      pauseOnHover={false} // Global setting to prevent pausing on hover
      pauseOnFocusLoss={false} // Global setting to prevent pausing on focus loss
    />
  );
}
