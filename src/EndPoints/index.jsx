
export const baseUrl = import.meta.env.VITE_TMDB_API_URL;

// Popular movies 
export const popularMoviesEndPoint = `${baseUrl}movie/popular?language=en-US&page=1`;
export const topRatedMoviesEndPoint = `${baseUrl}movie/top_rated?language=en-US&page=1`;
export const upComingMoviesEndPoint = `${baseUrl}movie/upcoming?language=en-US&page=1`;


// https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1
