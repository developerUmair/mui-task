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
  const [popularCategory, setPopularCategory] = useState({ title: "Movies", value: "movie" });
  const [topRatedCategory, setTopRatedCategory] = useState({ title: "Movies", value: "movie" });
  const [range, setRange] = useState({ title: "Day", value: "day" });
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [genras, setGenras] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPopularCategory = async () => {
      try {
        setLoading(true);
        const [popularData] = await Promise.allSettled([
          getPopular({ category: popularCategory.value }),
        ]);

        setPopularMovies(popularData?.value.results || []);
      } catch (error) {
        console.error("Category Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCategory();
  }, [popularCategory]);

  useEffect(() => {
    const fetchTopRatedCategory = async () => {
      try {
        setLoading(true);
        const [topRatedData] = await Promise.allSettled([
          getTopRated({ category: topRatedCategory.value }),
        ]);

        setTopRatedMovies(topRatedData?.value.results || []);
      } catch (error) {
        console.error("Category Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedCategory();
  }, [topRatedCategory]);

  
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
        setLoading,
        searchMovies,
        searchResults,
        popularCategory,
        setPopularCategory,
        topRatedCategory,
        setTopRatedCategory,
        range,
        setRange,
        genras,
        setGenras,
      }}
    >
      {children}
    </moviesContext.Provider>
  );
};

export default MovieProvider;
