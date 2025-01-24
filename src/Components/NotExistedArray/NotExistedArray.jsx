
export default function NotExistedArray({msg,course}) {
    return (
        <div className={`dark:bg-[#242A38] bg-white rounded p-4 lg:p-6 border-r-[#ef4444] border-r-[10px] dana-demi ${course && " m-3 md:m-5"}`}>
            {msg}
        </div>
    )
}
