/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, createContext } from "react";
import {
  getPopular,
  getSearchResults,
  getTopRated,
  getTrending,
} from "../services";

export const moviesContext = createContext();

const MovieProvider = ({ children }) => {
  const [category, setCategory] = useState({ title: "Movies", value: "movie" });
  const [range, setRange] = useState({ title: "Day", value: "day" });
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch category-based movies (popular, top-rated)
  useEffect(() => {
    const fetchCategoryBased = async () => {
      try {
        setLoading(true);
        const [popularData, topRatedData] = await Promise.allSettled([
          getPopular({ category: category.value }),
          getTopRated({ category: category.value }),
        ]);

        setPopularMovies(popularData?.value.results || []);
        setTopRatedMovies(topRatedData?.value.results || []);
      } catch (error) {
        console.error("Category Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBased();
  }, [category]);

  
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const trendingData = await getTrending({ range: range.value });
        setTrendingMovies(trendingData.results || []);
      } catch (error) {
        console.error("Trending Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [range]);

  // Search API
  const searchMovies = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await getSearchResults({ query });
      setSearchResults(data.results);
    } catch (error) {
      console.error("Search Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <moviesContext.Provider
      value={{
        popularMovies,
        topRatedMovies,
        trendingMovies,
        loading,
        searchMovies,
        searchResults,
        category,
        setCategory,
        range,
        setRange,
      }}
    >
      {children}
    </moviesContext.Provider>
  );
};

export default MovieProvider;
