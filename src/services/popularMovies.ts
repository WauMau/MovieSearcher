import { searchMovies } from './api';

export const getPopularMovies = async (page = 1) => {
  return searchMovies('movie', page);
};
