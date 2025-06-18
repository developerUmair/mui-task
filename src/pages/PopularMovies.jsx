import React, { useContext } from "react";
import { Background } from "../utils";
import SectionTitle from "../Components/SectionTitle";
import { moviesContext } from "../context/MoviesDataContext";
import MoviesSlider from "../Components/MoviesSlider";
import Loader from "../Components/Loader";

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
