import { useEffect, useState } from 'react';

function useArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://web-api-silk-three.vercel.app/v1/articles', {
      credentials: 'include'
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch articles');
        return res.json();
      })
      .then((data) => setArticles(data))
      .catch((err) => console.log(err))
  }, []);

  return articles;
}

export default useArticles;
