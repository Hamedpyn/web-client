import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ModalAlert({ openModal, setOpenModal, msg, onRemove, roll, value, setValue }) {

    return (
        <>
            <Modal dir="rtl" show={openModal} size="md" onClose={() => {
                setOpenModal(false)
            }} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg dana-demi text-gray-500 dark:text-gray-400">
                            {msg}
                        </h3>
                        {roll ? (
                            <>
                            <input value={value} onChange={(e)=>setValue(e.target.value)} className="w-full bg-transparent rounded dark:text-white text-gray-900 placeholder:text-slate-700 dark:placeholder:text-slate-400 dana-regular" type="text" placeholder="ADMIN OR USER" />
                            {value.toLowerCase() === 'user' &&  (
                            <button onClick={() => {
                                    onRemove()
                                    setOpenModal(false)
                                }} className="dana-demi bg-[#22c55e] mt-3 h-[52px] rounded w-full">تغییر</button>
                            )}
                            {value.toLowerCase() === 'admin' &&  (
                            <button onClick={() => {
                                    onRemove()
                                    setOpenModal(false)
                                }} className="dana-demi bg-[#22c55e] mt-3 h-[52px] rounded w-full">تغییر</button>
                            )}
                            </>
                                
                        ) : (
                            <div className="flex justify-center gap-4 dana-medium">
                                <Button color="failure" onClick={() => {
                                    onRemove()
                                    setOpenModal(false)
                                }}>
                                    بله
                                </Button>
                                <Button color="gray" onClick={(e) => {
                                    setOpenModal(false)
                                    e.stopPropagation()
                                }}>
                                    خیر
                                </Button>
                            </div>
                        )}

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
