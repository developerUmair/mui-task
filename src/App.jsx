import { useContext } from "react";
import HeroSection from "./Components/HeroSection";
import Toggle from "./Components/Toggle";
import "./App.css";
import SectionTitle from "./Components/SectionTitle";
import MoviesSlider from "./Components/MoviesSlider";
import Loader from "./Components/Loader";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import { Background } from "./utils";
import { moviesContext } from "./context/MoviesDataContext";
import MovieDetails from "./pages/MovieDetails";

function App() {
  const {
    popularMovies,
    topRatedMovies,
    upComingMovies,
    loading,
    category,
    setCategory,
    range,
    setRange,
  } = useContext(moviesContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HeroSection data={popularMovies} />} />
        <Route
          path="/popular"
          element={
            <Background>
              <SectionTitle
                title="Popular"
                options={[
                  { title: "Movies", value: "movie" },
                  { title: "TV Shows", value: "tv" },
                ]}
                showToggle={true}
                selectedOption={category}
                setSelectedOption={setCategory}
              />
              {loading ? <Loader /> : <MoviesSlider data={popularMovies} />}
            </Background>
          }
        />

        <Route
          path="/top-rated"
          element={
            <Background>
              <SectionTitle
                title="Top Rated"
                options={[
                  { title: "Movies", value: "movie" },
                  { title: "TV Shows", value: "tv" },
                ]}
                showToggle={true}
                selectedOption={category}
                setSelectedOption={setCategory}
              />
              {loading ? <Loader /> : <MoviesSlider data={topRatedMovies} />}
            </Background>
          }
        />
        <Route
          path="/trending"
          element={
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
              {loading ? <Loader /> : <MoviesSlider data={upComingMovies} />}
            </Background>
          }
        />

        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
