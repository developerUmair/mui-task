import { useEffect, useState } from "react";
import HeroSection from "./Components/HeroSection";
import "./App.css";
import SectionTitle from "./Components/SectionTitle";
import MoviesSlider from "./Components/MoviesSlider";
import { Box } from "@mui/material";
import styled from "styled-components";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
} from "./services";
import Loader from "./Components/Loader";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import { Background } from "./utils";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [popularLoading, setPopularLoading] = useState(true);
  const [topRatedLoading, setTopRatedLoading] = useState(true);
  const [upComingLoading, setUpComingLoading] = useState(true);

  useEffect(() => {
    setPopularLoading(true);
    async function fetchPopularMovies() {
      const data = await getPopularMovies();
      setPopularMovies(data.results);
      setPopularLoading(false);
    }

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    setTopRatedLoading(true);
    async function fetchTopRatedMovies() {
      const data = await getTopRatedMovies();
      setTopRatedMovies(data.results);
      setTopRatedLoading(false);
    }

    fetchTopRatedMovies();
  }, []);

  useEffect(() => {
    setUpComingLoading(true);
    async function fetchUpComingMovies() {
      const data = await getUpComingMovies();
      setUpComingMovies(data.results);
      setUpComingLoading(false);
    }

    fetchUpComingMovies();
  }, []);


  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HeroSection data={popularMovies} />} />
        <Route
          path="/popular"
          element={
            <Background>
              <SectionTitle title="Popular" />
              {popularLoading ? (
                <Loader />
              ) : (
                <MoviesSlider data={popularMovies} />
              )}
            </Background>
          }
        />

        <Route
          path="/top-rated"
          element={
            <Background>
              <SectionTitle title="Top Rated" />
              {topRatedLoading ? (
                <Loader />
              ) : (
                <MoviesSlider data={topRatedMovies} />
              )}
            </Background>
          }
        />
        <Route
          path="/upcoming"
          element={
            <Background>
              <SectionTitle title="Up Coming" />
              {upComingLoading ? (
                <Loader />
              ) : (
                <MoviesSlider data={upComingMovies} />
              )}
            </Background>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
