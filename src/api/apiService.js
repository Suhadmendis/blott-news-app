
const API_URL = "https://finnhub.io/api/v1/news?category=general&token=crals9pr01qhk4bqotb0crals9pr01qhk4bqotbg";

export const fetchNewsData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch news data");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err; // Throw error to be handled by calling function
  }
};
