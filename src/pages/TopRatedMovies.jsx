import React, { useContext } from "react";
import { Background } from "../utils/helpers";
import SectionTitle from "../Components/SectionTitle";
import Loader from "../Components/Loader";
import MoviesSlider from "../Components/MoviesSlider";
import { moviesContext } from "../context/MoviesDataContext";

const TopRatedMovies = () => {
  const { topRatedMovies, loading, topRatedCategory, setTopRatedCategory } =
    useContext(moviesContext);
  return (
    <>
      <Background>
        <SectionTitle
          title="Top Rated"
          options={[
            { title: "Movies", value: "movie" },
            { title: "TV Shows", value: "tv" },
          ]}
          showToggle={true}
          selectedOption={topRatedCategory}
          setSelectedOption={setTopRatedCategory}
        />
        {loading ? <Loader /> : <MoviesSlider data={topRatedMovies} />}
      </Background>
    </>
  );
};

export default TopRatedMovies;
