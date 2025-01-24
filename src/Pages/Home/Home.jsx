import ArticleSection from "../../Components/ArticleSection/ArticleSection";
import HelpSection from "../../Components/HelpSection/HelpSection";
import Landing from "../../Components/Landing/Landing";
import LatestCourses from "../../Components/LatestCourses/LatestCourses";
import MostPopular from "../../Components/MostPopular/MostPopular";
import NewCourses from "../../Components/NewCourses/NewCourses";
import PopularCourses from "../../Components/PopularCourses/PopularCourses";
import Roadmap from "../../Components/Roadmap/Roadmap";
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
export default function Home() {
  document.title = "سبزلرن"
  return (
    <>
      <Header />

      <div className="mt-9 overflow-x-hidden w-full lg:mt-12 flex justify-center flex-col items-center">
        <Landing />
        <LatestCourses />
        <Roadmap />
        <PopularCourses />
        <HelpSection />
        <NewCourses />
        <ArticleSection />
        <MostPopular />
      </div>
      <Footer />

    </>
  )
}
