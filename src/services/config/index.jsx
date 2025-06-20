export const baseUrl = import.meta.env.VITE_TMDB_API_URL;
export const authBaseUrl = import.meta.env.VITE_AUTH_API_URL;

// Popular movies
export const popularMoviesEndPoint = `${baseUrl}movie/popular?language=en-US&page=1`;
export const topRatedMoviesEndPoint = `${baseUrl}movie/top_rated?language=en-US&page=1`;
export const upComingMoviesEndPoint = `${baseUrl}movie/upcoming?language=en-US&page=1`;

export const PopularEndPoint = (category = "movie") => {
  return `${baseUrl}${category}/popular?language=en-US&page=1`;
};

export const topRatedEndPoint = (category = "movie") => {
  return `${baseUrl}${category}/top_rated?language=en-US&page=1`;
};

export const trendingEndPoint = ({ range = "day", mediaType = "movie" }) => {
  return `${baseUrl}trending/${mediaType}/${range}?language=en-US&page=1`;
};

export const videosEndPoint = ({ id, mediaType }) => {
  return `${baseUrl}${mediaType}/${id}/videos`;
};

export const genreListEndPoint = (mediaType = "movie") => {
  return `${baseUrl}genre/${mediaType}/list?language=en-US`;
};

export const discoverMoviesAndTvEndPoint = ({
  mediaType = "movie",
  page = 1,
  genres = "",
  ratingGt = "",
  ratingLt = "",
  releaseDateGte = "",
  releaseDateLte = "",
  sortBy = "",
}) => {
  return `${baseUrl}discover/${mediaType}?include_adult=false&include_video=false&language=en-US&page=${page}&with_genres=${genres}&vote_average.gte=${ratingGt}&vote_average.lte=${ratingLt}&primary_release_date.gte=${releaseDateGte}&primary_release_date.lte=${releaseDateLte}&sort_by=${sortBy}`;
};

export const signUpEndPoint = () => {
  return `${authBaseUrl}auth/sign-up`;
};

export const signInEndPoint = () => {
  return `${authBaseUrl}auth/sign-in`;
};

export const castAndCrewEndPoint = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}/credits`;
};

export const similarMoviesEndPoint = ({ id, mediaType = "movie" }) => {
  return `${baseUrl}${mediaType}/${id}/similar`;
};

export const recommendationsEndPoint = ({ id, mediaType = "movie" }) => {
  return `${baseUrl}${mediaType}/${id}/recommendations`;
};
