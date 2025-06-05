import { useContext } from "react";
import HeroSection from "./Components/HeroSection";
import "./App.css";
import SectionTitle from "./Components/SectionTitle";
import MoviesSlider from "./Components/MoviesSlider";
import Loader from "./Components/Loader";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import { Background } from "./utils";
import { moviesContext } from "./context/MoviesDataContext";
import MovieDetails from "./pages/MovieDetails";
import Explore from "./pages/Explore";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import SignUp from "./pages/SignUp";
import AuthLayout from "./AuthLayout";
import ProtectedRoute from "./Components/ProtectedRoute";
import SignIn from "./pages/Signin";

function App() {
  const {
    popularMovies,
    topRatedMovies,
    trendingMovies,
    loading,
    popularCategory,
    setPopularCategory,
    topRatedCategory,
    setTopRatedCategory,
    range,
    setRange,
  } = useContext(moviesContext);

  return (
    <Routes>
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
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
                selectedOption={popularCategory}
                setSelectedOption={setPopularCategory}
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
                selectedOption={topRatedCategory}
                setSelectedOption={setTopRatedCategory}
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
              {loading ? <Loader /> : <MoviesSlider data={trendingMovies} />}
            </Background>
          }
        />

        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<MovieDetails />} />

        {/* Explore routes */}
        <Route path="/explore" element={<Explore />}>
          <Route path="movies" element={<Movies />} />
          <Route path="tv" element={<TvShows />} />
        </Route>
      </Route>

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
