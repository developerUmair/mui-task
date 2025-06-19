import React, { useContext } from "react";
import { Background } from "../utils/helpers";
import SectionTitle from "../components/SectionTitle";
import Loader from "../components/Loader";
import MoviesSlider from "../components/MoviesSlider";
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
