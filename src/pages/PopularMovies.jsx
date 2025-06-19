import React, { useContext } from "react";
import { Background } from "../utils/helpers";
import SectionTitle from "../components/SectionTitle";
import { moviesContext } from "../context/MoviesDataContext";
import MoviesSlider from "../components/MoviesSlider";
import Loader from "../components/Loader";

const PopularMovies = () => {
  const { popularMovies, loading, popularCategory, setPopularCategory } =
    useContext(moviesContext);
  return (
    <>
      <Background>
        <SectionTitle
          title="Popular"
          options={[
            { title: "Movies", value: "movie" },
            { title: "TV Shows", value: "tv" },
          ]}
          showToggle={true}
          selectedOption={popularCategory}
          setSelectedOption={setPopularCategory}
        />
        {loading ? <Loader /> : <MoviesSlider data={popularMovies} />}
      </Background>
    </>
  );
};

export default PopularMovies;
