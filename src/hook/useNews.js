import { useState, useEffect } from "react";
import { fetchNewsData } from "../api/apiService";


const useNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [idFailed, setIdFailed] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchNewsData();
      setNewsData(data);
    } catch (err) {
      setError(err.message);
      setIdFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    newsData,
    isLoading,
    idFailed,
    error,
  };
};

export default useNews;
