import { toast } from 'react-toastify';

export const Notify = (type,msg) => {
  const options = {
    autoClose: 2000,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    toastId:type,
  };

  switch (type) {
    case 'success':
      toast.dismiss();
      toast.success('عملیات با موفقیت به انجام رسید.', options);
      break;
    case 'Off200':
      toast.dismiss();
      toast.success(msg, options);
      break;
    case 'delete':
      toast.dismiss();
      toast.success('حذف کاربر با موفقیت به انجام رسید.', options);
      break;
    case 'banReg':
      toast.dismiss();
      toast.error('شماره تلفن مورد استفاده بن میباشد', options);
      break;
    case 'Off404':
      toast.dismiss();
      toast.error('کد تخفیف نامعتبر میباشد.', options);
      break;
    case 'Off409':
      toast.dismiss();
      toast.error('قبلا از این کد تخفیف استفاده کردن!', options);
      break;
    case 'catError':
      toast.dismiss();
      toast.error('عملیات ناموفقیت آمیز بود!', options);
      break;
    case 'file':
      toast.dismiss();
      toast.error('حجم فایل نباید بیشتر از 50 مگابایت باشد.', options);
      break;
    case 'ban':
      toast.dismiss();
      toast.success('بن کاربر با موفقیت به انجام رسید.', options);
      break;
    case 'copy':
      toast.dismiss();
      toast.success('لینک با موفقیت کپی شد(اما کار نمیکند:)', options);
      break;
    case 'error':
      toast.dismiss();
      toast.error(
        <>
          اطلاعات وارد شده نادرست است.
          لطفاً دوباره تلاش کنید
        </>,
        options
      );
      break;
    case 'errorReg':
      toast.dismiss();
      toast.error(
        <>
          اطلاعات وارد شده در سامانه موجود میباشد..
          لطفاً دوباره تلاش کنید
        </>,
        options
      );
      break;
    case 'noComment':
      toast.dismiss();
      toast.error(
        <>
          جهت ثبت کامنت، وارد سایت شوید.
        </>,
        options
      );
      break;
    case 'logout':
      toast.dismiss();
      toast.error(
        <>
          عملیات خروج از اکانت با موفقیت انجام شد.
        </>,
        options
      );
      break;
    case 'YesComment':
      toast.dismiss();
      toast.success(
        <>
          کامنت در انتظار تایید توسط ادمین است.
        </>,
        options
      );
      break;
  }
};
