import { memo } from 'react';
import { TiInfoOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

export default memo(function InfoAlert({ blog, searchBlog }) {
  const navigate = useNavigate();

  return (
    <div className="slide mt-20">
      <div className="border-yellow-500 border-y-4 bg-yellow-200 text-yellow-800 p-4 md:p-5 rounded-lg text-lg dana-demi flex flex-col items-center gap-2 sm:flex-row justify-center sm:justify-between" aria-live="polite">
        <div className="flex items-center gap-2">
          <TiInfoOutline className="text-3xl" />
          <span className="mt-1">
            {!searchBlog ? (
              blog ? "مقاله ای مرتبط با این بخش وجود ندارد." : "دوره ای مرتبط با این بخش وجود ندارد."
            ) : searchBlog}
          </span>
        </div>
        <button onClick={() => navigate(-1)} className="bg-yellow-500 py-2 px-6 dana-demi rounded">
          صفحه قبلی
        </button>
      </div>
    </div>
  );
});
