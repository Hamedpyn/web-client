import { useState, useEffect } from "react";
import ArticlesBox from "../../Components/ArticlesBox/ArticlesBox";
import ProductsSection from "../../Components/ProductsSection/ProductsSection";
import useArticles from "../../Hooks/useArticles";
import CircleSpinner from "../../Components/CircleSpinner/CircleSpinner";
import InfoAlert from "../../Components/InfoAlert/InfoAlert";
import Pagination from "../../Components/Pagination/Pagination";
import { TiInfoOutline } from "react-icons/ti";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

export default function Blog() {
  const [isArticles, setIsArticles] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // For showing spinner
  const [shownArticles, setShownArticles] = useState([])
  const [orderedArticles, setOrderedArticles] = useState([]);
  const [searchValue, setSearchValue] = useState('')

  const articles = useArticles();
  const [sortItems, setSortItems] = useState("عادی");
  document.title="همه مقالات"


  useEffect(() => {
    let filteredArticles = [...articles]
    setSearchValue('')

    // Handle sorting logic
    switch (sortItems) {
      case "جدید ترین":
        filteredArticles = filteredArticles.slice(0, 3);
        break;
      case "قدیمی ترین":
        filteredArticles = filteredArticles.slice(-3).reverse();
        break;
      case "پر نظر ها":
        filteredArticles = filteredArticles.slice().sort(() => Math.random() - 0.5).slice(0, 4)
        break;
      default:
        // "همه دوره ها", no sorting applied
        break;
    }
    // Update ordered courses
    setOrderedArticles(filteredArticles);

  }, [sortItems, articles]);

  useEffect(() => {
    if (articles.length > 0) {
      setTimeout(() => {
        setIsLoading(false); // Loading complete
      }, 500);
    } else {
      // Keep showing the spinner if articles aren't loaded yet
      setIsLoading(true);
    }
  }, [articles]);

  useEffect(() => {
    // Synchronize shownCourses with orderedCourses
    setShownArticles(orderedArticles.slice(0, 6)); // For the first page in pagination
  }, [orderedArticles]);


  useEffect(() => {
    const filteredSearch = articles.filter(i => i.title.toLowerCase().includes(searchValue.toLowerCase()))
    setOrderedArticles(filteredSearch)

  }, [searchValue])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircleSpinner />
      </div>
    );
  }

  return (
    <>
        <Header />
      {articles.length > 0 ? (
        <ProductsSection
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          sortItems={sortItems}
          setSortItems={setSortItems}
          text={orderedArticles.length}
          isAllCourses={isArticles}
          setIsAllCourses={setIsArticles}
        >
          {orderedArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {shownArticles.filter(articles=>articles.publish).map((item) => (
                <ArticlesBox key={item.cover} {...item} />
              ))}
            </div>
          ) : (
            <div className=" border-red-900 border-y-4 bg-red-500 text-white p-4 md:p-5 rounded-lg text-lg dana-demi flex flex-col items-center gap-2 sm:flex-row justify-center sm:justify-between !w-full">
              <div className="flex items-center gap-2">
                <TiInfoOutline className="text-3xl" />
                <span className="mt-1 text-base">مقاله ای ای مرتبط با این بخش وجود ندارد.</span>
              </div>
            </div>
          )}
          <Pagination items={orderedArticles} itemsCount={7} setShownCourse={setShownArticles} />
        </ProductsSection>
      ) : (
        <InfoAlert blog={true} />
      )}
      <Footer />
    </>
  );
}
