import axios from "axios";
import { popularMoviesEndPoint, topRatedMoviesEndPoint } from "../EndPoints";

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
  


export async function getPopularMovies(){
    const result = await get(popularMoviesEndPoint)
    return result;
}

export async function getTopRatedMovies(){
    const result = await get(topRatedMoviesEndPoint)
    return result;
}

