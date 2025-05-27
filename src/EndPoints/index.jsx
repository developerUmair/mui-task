
export const baseUrl = import.meta.env.VITE_TMDB_API_URL;

// Popular movies 
export const popularMoviesEndPoint = `${baseUrl}/popular?language=en-US&page=1`;
export const topRatedMoviesEndPoint = `${baseUrl}/top_rated?language=en-US&page=1`;
export const upComingMoviesEndPoint = `${baseUrl}/upcoming?language=en-US&page=1`;


// https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1
