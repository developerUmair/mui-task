import axios from "axios";
import {
  baseUrl,
  discoverMoviesAndTvEndPoint,
  genreListEndPoint,
  PopularEndPoint,
  popularMoviesEndPoint,
  topRatedEndPoint,
  topRatedMoviesEndPoint,
  trendingEndPoint,
  upComingMoviesEndPoint,
  videosEndPoint,
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
    `${baseUrl}/search/multi?query=${query}&include_adult=false&language=en-US&page=1`
  );
  return result;
}

export async function getMovieDetails({ id, category = "movie" }) {
  const result = await get(`${baseUrl}${category}/${id}?language=en-US`);
  return result;
}

export async function getCastDetails(id) {
  const result = await get(`${baseUrl}movie/${id}/credits`);
  return result;
}

export async function getPopular({ category = "movie" }) {
  const result = await get(PopularEndPoint(category));
  return result;
}

export async function getTopRated({ category = "movie" }) {
  const result = await get(topRatedEndPoint(category));
  return result;
}
export async function getTrending({ range = "day" }) {
  const result = await get(trendingEndPoint(range));
  return result;
}

export async function getVideos({id, mediaType = "movie"}) {
  const result = await get(videosEndPoint({id, mediaType}));
  return result;
}

export async function getGenras(mediaType = "movie") {
  const result = await get(genreListEndPoint(mediaType));
  return result;
}

export async function getDiscoveredMoviesAndTvShows({mediaType = "movie", page = 1, genres=""}) {
  const result = await get(discoverMoviesAndTvEndPoint({mediaType, page, genres}));
  return result;
}
