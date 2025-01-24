import { memo } from "react";

const HelpCard = ({ icon: Icon, bgColor, iconColor, title, description }) => {
    return (
        <div className="xl:max-w-[616px] lg:flex-row lg:max-w-[488px] sm:w-auto sm:max-w-[620px] md:max-w-[370px] py-5 lg:py-6 rounded-xl bg-white dark:bg-[#242A38] px-5 flex flex-col gap-4 items-center">
            <div className="flex flex-col relative items-center">
                <span className={`${bgColor} lg:mb-0 mb-7 lg:ml-7 w-[94px] h-[52px] lg:w-14 lg:h-[94px] rounded-full`} />
                <Icon
                    className={`z-50 absolute top-[27px] lg:right-[30px] ${iconColor} text-5xl`}
                    aria-hidden="true"
                />
            </div>
            <div className="flex flex-col gap-4 lg:items-start items-center">
                <h4 className="dana-bold dark:text-white text-gray-900 lg:text-lg text-center">{title}</h4>
                <p className="dana-regular dark:text-white text-gray-900 lg:text-base text-center opacity-70 lg:text-start pl-1">
                    {description}
                </p>
            </div>
        </div>
    );
};
export default memo(HelpCard)