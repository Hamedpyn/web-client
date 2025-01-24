import ArticlesBox from '../ArticlesBox/ArticlesBox';
import SectionsTitle from '../SectionsTitle/SectionsTitle';
import useArticles from "../../Hooks/useArticles";
import { memo } from 'react';

export default memo(function ArticleSection() {
    const articles = useArticles();

    // Get the first 4 articles without mutating the original array
    const newArticles = articles.slice(0, 4);

    return (
        <div className="slide px-2">
            <SectionsTitle
                path={'/blog'}
                title={"وبلاگ آموزشی سبزلرن"}
                text={'مقالات بروز برنامه نویسی'}
                alert={"bg-[#FBBF24]"}
                buttonText={'مقالات'}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {newArticles.filter(articles=>articles.publish).map(item => (
                    <ArticlesBox key={item._id} {...item} />
                ))}
            </div>
        </div>
    );
});
