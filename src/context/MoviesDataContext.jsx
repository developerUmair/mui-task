/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, createContext, useContext } from "react";
import {
  getPopular,
  getSearchResults,
  getTopRated,
  getTrending,
} from "../services";
import { AuthContext } from "./AuthContext";

export const moviesContext = createContext();

const MovieProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [popularCategory, setPopularCategory] = useState({
    title: "Movies",
    value: "movie",
  });
  const [topRatedCategory, setTopRatedCategory] = useState({
    title: "Movies",
    value: "movie",
  });
  const [trendinCategory, setTrendingCategory] = useState({
    title: "Movies",
    value: "movie",
  });
  const [range, setRange] = useState({ title: "Day", value: "day" });
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [hasMoreSearchResults, setHasMoreSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [genras, setGenras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
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
  }, [popularCategory, token]);

  useEffect(() => {
    if (!token) return;
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
  }, [topRatedCategory, token]);

  useEffect(() => {
    if (!token) return;

    const fetchTrending = async () => {
      try {
        setLoading(true);
        const trendingData = await getTrending({
          range: range.value,
          mediaType: trendinCategory.value,
        });
        setTrendingMovies(trendingData.results || []);
      } catch (error) {
        console.error("Trending Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [range, token, trendinCategory]);

  const searchMovies = async (query, page = 1, append = false) => {
    if (!query || isSearching) return;

    setIsSearching(true);
    setLoading(true);

    try {
      const data = await getSearchResults({ query, page });

      if (append) {
        setSearchResults((prev) => [...prev, ...data.results]);
      } else {
        setSearchResults(data.results);
      }

      setHasMoreSearchResults(data.page < data.total_pages);
      setSearchPage(data.page);
    } catch (error) {
      console.error("Search error:", error);
      setHasMoreSearchResults(false);
    } finally {
      setIsSearching(false);
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
        trendinCategory,
        setTrendingCategory,
        range,
        setRange,
        genras,
        setGenras,
        searchPage,
        setSearchPage,
        hasMoreSearchResults,
        isSearching,
      }}
    >
      {children}
    </moviesContext.Provider>
  );
};

export default MovieProvider;
