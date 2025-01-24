import {  Button, Modal } from "flowbite-react";

export function DisCountModal({value,setNoOff,setValue,openModal,setOpenModal,setConfirm}) {

  return (
    <>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl dana-demi text-center text-gray-900 dark:text-white">در صورت داشتن کد تخفیف وارد کنید</h3>
            <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} className="w-full rounded bg-transparent dana-demi dark:text-white text-gray-900" placeholder="کد تخفیف خود را وارد کنید" />
          <div className="dana-regular gap-4 flex justify-between">
            <Button onClick={()=>{
                setOpenModal(false)
                setNoOff(true)

            }} className="w-1/2 !bg-[#22c55e]">ثبت نام بدون کد تخفیف</Button>
            <Button onClick={()=>{
                setOpenModal(false)
                setConfirm(true)
            }} className="w-1/2 !bg-[#22c55e]">اعمال کد تخفیف</Button>
          </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};