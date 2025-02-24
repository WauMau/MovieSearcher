import axios from 'axios';
import { Movie, MovieDetails } from '../types/movie';

const BASE_URL = 'https://www.omdbapi.com';
const API_KEY = '6105a5dc'; // Free tier, no API key needed

export const api = axios.create({
  baseURL: BASE_URL,
});

export const getImageUrl = (posterPath: string) => {
  return posterPath !== 'N/A' ? posterPath : 'https://via.placeholder.com/500x750';
};

export const searchMovies = async (query: string, page = 1, year?: string) => {
  try {
    const response = await api.get('/', {
      params: {
        s: query,
        type: 'movie',
        page,
        y: year || undefined,
        apikey: API_KEY, // Добавление API ключа
      },
    });

    if (response.data.Response === 'False') {
      return {
        results: [],
        total_pages: 0,
        total_results: 0,
      };
    }

    const movies = response.data.Search.map((movie: any) => ({
      id: movie.imdbID,
      title: movie.Title,
      poster_path: getImageUrl(movie.Poster),
      release_date: movie.Year,
      vote_average: 0,
      overview: '',
      genre_ids: [],
    }));

    return {
      results: movies,
      total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
      total_results: parseInt(response.data.totalResults),
    };
  } catch (error) {
    console.error("Error fetching movies: ", error);
    return {
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }
};
