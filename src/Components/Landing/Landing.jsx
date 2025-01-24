import { CiPlay1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

export default function Landing() {

  return (
    <div className="px-6 mb-20 lg:px-0 w-full flex flex-col lg:flex-row-reverse items-center lg:justify-between gap-y-8 relative">
      {/* Hero Image Section */}
      <div className="lg:basis-1/2">
      <img
          src="/images/hero-light.svg"
          className="lg:w-[580px] xl:w-auto block dark:hidden"
          alt="تصویر بخش معرفی سبزلرن"
        />
      <img
          src="/images/hero-dark.svg"
          className="lg:w-[580px] xl:w-auto hidden dark:block"
          alt="تصویر بخش معرفی سبزلرن"
        />
      </div>

            {/* Content Section */}
            <div className="lg:pr-20 lg:basis-1/2 xl:mt-28 flex flex-col mt-9 items-center lg:items-start gap-5">
                {/* Heading and Typewriter */}
                <div className="flex flex-col gap-10 items-center lg:items-start">
                    <h2 className="text-center lg:text-start dana-extra leading-10 text-3xl sm:text-[2.625rem]/[70px] 3xl:text-5xl dark:text-white text-gray-900">
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString("آکادمی آموزش")
                                    .typeString("<br>")
                                    .typeString("برنامه نویسی سبزلرن")
                                    .pauseFor(2500)
                                    .deleteAll()
                                    .typeString("ما به هر قیمتی دوره")
                                    .typeString("<br>")
                                    .typeString("تولید نمیکنیم!")
                                    .start();
                            }}
                            options={{ loop: true }}
                        />
                    </h2>

                    {/* Subtitle */}
                    <p className="dana-medium text-center lg:text-start sm:text-2xl lg:max-w-[440px] xl:max-w-[470px] dark:text-white text-gray-900">
                        با آکادمی خصوصی سبزلرن، علم برنامه نویسی رو با خیال راحت یاد بگیر و پیشرفت کن
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-row gap-6">
                        <a
                            href="#roadmap"
                            className="bg-[rgb(14,165,233)] dana-regular transition-all hover:bg-[#0284C7] py-3 px-5 rounded-full text-lg"
                            aria-label="شروع مسیر آموزش"
                        >
                            از این مسیر شروع کن
                        </a>
                        <Link to={"/courses"} className="flex items-center gap-3">
                            <span
                                className="bg-[rgb(34,197,94)] h-[52px] w-[52px] rounded-full hover:bg-[#16A34A] transition-all flex items-center justify-center "
                                aria-label="مشاهده همه دوره ها"
                            >
                                <CiPlay1 className="w-6 h-6" />
                            </span>
                            <span className="dana-medium dark:text-white text-gray-900">همه دوره ها</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
