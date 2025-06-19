import React, { useContext } from "react";
import HeroSection from "../components/HeroSection";
import { moviesContext } from "../context/MoviesDataContext";

const Home = () => {
  const { popularMovies } = useContext(moviesContext);
  return (
    <>
      <HeroSection data={popularMovies} />
    </>
  );
};

export default Home;
