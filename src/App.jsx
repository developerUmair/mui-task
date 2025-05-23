import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Container from "@mui/material/Container";
import HeroSection from "./Components/HeroSection";
import "./App.css";
import SectionTitle from "./Components/SectionTitle";
import MoviesSlider from "./Components/MoviesSlider";
import { Box } from "@mui/material";
import styled from "styled-components";
import { getPopularMovies, getTopRatedMovies } from "./services";


function App() {

  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    async function fetchPopularMovies() {
      const data = await getPopularMovies();
      setPopularMovies(data.results);
    }

    fetchPopularMovies();
  }, []);


  useEffect(() => {
    async function fetchTopRatedMovies() {
      const data = await getTopRatedMovies();
      setTopRatedMovies(data.results);
    }

    fetchTopRatedMovies();
  }, []);

  const Background = styled(Box)(() => ({
    position: "relative",
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",

    color: "#fff",
    minHeight: "100vh",
  }));

  return (
    <Container maxWidth="xl" disableGutters>
      <Navbar />
      <HeroSection />
      <Background>
        <SectionTitle title="Popular" />
        <MoviesSlider data={popularMovies} />
      </Background>
      <Background>
        <SectionTitle title="Top Rated" />
        <MoviesSlider data={topRatedMovies} />
      </Background>
    </Container>
  );
}

export default App;
