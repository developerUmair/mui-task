import React, { useContext } from "react";
import { Background } from "../utils/helpers";
import SectionTitle from "../components/SectionTitle";
import Loader from "../components/Loader";
import MoviesSlider from "../components/MoviesSlider";
import { moviesContext } from "../context/MoviesDataContext";

const TrendingMovies = () => {
  const {
    trendingMovies,
    loading,
    range,
    setRange,
    trendinCategory,
    setTrendingCategory,
  } = useContext(moviesContext);

  return (
    <>
      <Background>
        <SectionTitle
          title="Trending"
          options={[
            { title: "Day", value: "day" },
            { title: "Week", value: "week" },
          ]}
          showToggle={true}
          selectedOption={range}
          setSelectedOption={setRange}
        />
        <SectionTitle
          title=""
          options={[
            { title: "Movies", value: "movie" },
            { title: "TV Shows", value: "tv" },
          ]}
          showToggle={true}
          selectedOption={trendinCategory}
          setSelectedOption={setTrendingCategory}
        />
        {loading ? <Loader /> : <MoviesSlider data={trendingMovies} />}
      </Background>
    </>
  );
};

export default TrendingMovies;
