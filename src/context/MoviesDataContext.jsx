import { useEffect, useState } from "react";
import { createContext } from "react";
import {
  getPopularMovies,
  getSearchResults,
  getTopRatedMovies,
  getUpComingMovies,
} from "../services";

export const moviesContext = createContext();

const MovieProvider = ({ children }) => {
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
            getPopularMovies(),
            getTopRatedMovies(),
            getUpComingMovies(),
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
  }, []);

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
        searchResults
      }}
    >
      {children}
    </moviesContext.Provider>
  );
};

export default MovieProvider;
