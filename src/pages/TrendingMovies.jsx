import React, { useContext } from "react";
import { Background } from "../utils";
import SectionTitle from "../Components/SectionTitle";
import Loader from "../Components/Loader";
import MoviesSlider from "../Components/MoviesSlider";
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
