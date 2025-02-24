import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SearchBar } from '../components/SearchBar';
import { MovieCard } from '../components/MovieCard';
import { searchMovies } from '../services/api';
import { Movie } from '../types/movie';

const HomePage = () => {
  const navigate = useNavigate();
  const { data: popularMovies, isLoading } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: () => searchMovies('movie'),
  });

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleFavoriteToggle = (movie: Movie) => {
    // Implement favorite toggle logic
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            Find your perfect movie
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Discover thousands of movies to watch tonight
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Popular Movies</h2>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularMovies?.results.map((movie: Movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorite={false}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
