import { useEffect, useState } from "react";
import { createContext } from "react";
import {
  getPopular,
  getPopularMovies,
  getSearchResults,
  getTopRated,
  getTopRatedMovies,
  getTrending,
  getUpComingMovies,
} from "../services";

export const moviesContext = createContext();

const MovieProvider = ({ children }) => {
  const [category, setCategory] = useState({ title: "Movies", value: "movie" });
  const [range, setRange] = useState({ title: "Day", value: "day" });
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [popularData, topRatedData, upComingData] =
          await Promise.allSettled([
            getPopular({ category: category.value }),
            getTopRated({category: category.value }),
            getTrending({range: range.value }),
          ]);

        setPopularMovies(popularData?.value.results);
        setTopRatedMovies(topRatedData?.value.results);
        setUpComingMovies(upComingData?.value.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [category, range]);

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
        upComingMovies,
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
