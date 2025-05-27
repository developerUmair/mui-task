import axios from "axios";
import {
  popularMoviesEndPoint,
  topRatedMoviesEndPoint,
  upComingMoviesEndPoint,
} from "../EndPoints";

export async function get(endPoint) {
  try {
    const response = await axios.get(endPoint, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function getPopularMovies() {
  const result = await get(popularMoviesEndPoint);
  return result;
}

export async function getTopRatedMovies() {
  const result = await get(topRatedMoviesEndPoint);
  return result;
}

export async function getUpComingMovies() {
  const result = await get(upComingMoviesEndPoint);
  return result;
}

export async function getSearchResults({ query }) {
  const result = await get(
    `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`
  );
  return result;
}
