import "./App.css";
import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import Explore from "./pages/Explore";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import SignUp from "./pages/SignUp";
import AuthLayout from "./AuthLayout";
import ProtectedRoute from "./Components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import PopularMovies from "./pages/PopularMovies";
import TopRatedMovies from "./pages/TopRatedMovies";
import TrendingMovies from "./pages/TrendingMovies";

function App() {

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/popular" element={<PopularMovies />} />
        <Route path="/top-rated" element={<TopRatedMovies />} />
        <Route path="/trending" element={<TrendingMovies />} />

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
