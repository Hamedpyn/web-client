import SectionsTitle from '../SectionsTitle/SectionsTitle';
import { IoBookOutline } from "react-icons/io5";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2"; import { BsBarChart } from "react-icons/bs";
import { LuClipboardCheck } from "react-icons/lu";
import { memo } from 'react';
import HelpCard from "../HelpCard/HelpCard"

export default memo( function HelpSection() {
// Data for the help cards
const helpCards = [{
      icon: IoBookOutline,
      bgColor: "bg-[#F0F9FF] dark:bg-[#1D3C55]",
      iconColor: "text-[#0EA5E9]",
      title: "تضمین کاملترین محتوا",
      description:
        "بزار خیالت راحت کنم توی دوره هامون به ریز ترین موارد پرداختیم بعداز دیدن این دوره نیاز به هیچ آموزش دیگه ای نداری.",},
    {
      icon: HiOutlineChatBubbleLeftRight,
      bgColor: "bg-[#FFFBEB] dark:bg-[#4F4834]",
      iconColor: "text-[#FBBF24]",
      title: "پشتیبانی دائمی",
      description:
        "هرجا سوالی داشتی به مشکل خوردی بچه های تیم آمادن که مشکلت رو حل کنن تلاشمون اینه بدون نگرانی دوره رو کامل کنی.",
    },
    {
      icon: BsBarChart,
      bgColor: "bg-[#F0FDF4] dark:bg-[#244940]",
      iconColor: "text-[#22C55E]",
      title: "پروژه محور در راستای بازار کار",
      description:
        "کل تمرکز ما رو این هستش بعداز تموم شدن دوره شخص بتونه با اعتماد به نفس کامل پروژه بزنه واقدام کنه برای کسب درآمد.",
    },
    {
      icon: LuClipboardCheck,
      bgColor: "bg-[#FEF2F2] dark:bg-[#4D303B]",
      iconColor: "text-[#EF4444]",
      title: "سراغ حرفه ای ها رفتیم",
      description:
        "به جرعت میتونم بگم سخت گیرترین شرایط جذب مدرس داریم چون برامون مهمه محتوا خیلی ساده و روان بیان بشه که توی یادگیری به مشکل نخورید.",
    },
  ];
    return (
      <div className="slide px-2">
        <SectionsTitle
          title={"ما چه کمکی میتونیم بهت بکنیم"}
          text={"از شروع مسیر کنارتیم نمیذاریم آب تو دلت تکون بخوره"}
          alert={"bg-[#0EA5E9]"}
        />
        <div className="flex justify-center">
          <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center lg:px-0">
            {helpCards.map((card, index) => (
              <HelpCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    );
})