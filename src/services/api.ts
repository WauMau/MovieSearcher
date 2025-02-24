import axios from 'axios';
import { Movie, MovieDetails } from '../types/movie';

const BASE_URL = 'https://www.omdbapi.com';
const API_KEY = ''; // Free tier, no API key needed

export const api = axios.create({
  baseURL: BASE_URL,
});

export const searchMovies = async (query: string, page = 1, year?: string) => {
  const response = await api.get('/', {
    params: {
      s: query,
      type: 'movie',
      page,
      y: year || undefined,
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
    poster_path: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/500x750',
    release_date: movie.Year,
    vote_average: 0, // OMDb doesn't provide this in search results
    overview: '', // OMDb doesn't provide this in search results
    genre_ids: [], // OMDb doesn't provide this in search results
  }));

  return {
    results: movies,
    total_pages: Math.ceil(parseInt(response.data.totalResults) / 10),
    total_results: parseInt(response.data.totalResults),
  };
};

export const getPopularMovies = async (page = 1) => {
  const currentYear = new Date().getFullYear();
  const response = await api.get('/', {
    params: {
      s: 'movie',
      type: 'movie',
      y: currentYear,
      page,
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
    poster_path: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/500x750',
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
};

export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  const response = await api.get('/', {
    params: {
      i: id,
      plot: 'full',
    },
  });

  const movie = response.data;

  return {
    id: movie.imdbID,
    title: movie.Title,
    poster_path: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/500x750',
    release_date: movie.Released,
    vote_average: parseFloat(movie.imdbRating),
    overview: movie.Plot,
    runtime: parseInt(movie.Runtime),
    genres: movie.Genre.split(', ').map((name: string) => ({ id: name, name })),
    cast: movie.Actors.split(', ').map((name: string, index: number) => ({
      id: index,
      name,
      profile_path: 'https://via.placeholder.com/500x750',
      character: '',
    })),
  };
};

// Добавлена функция для получения URL изображения
export const getImageUrl = (imagePath: string) => {
  return `https://image.tmdb.org/t/p/w500${imagePath}`;
};
