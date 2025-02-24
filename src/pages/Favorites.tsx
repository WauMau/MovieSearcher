import React from 'react';
import { Link } from 'react-router-dom';
import { MovieCard } from '../components/MovieCard';
import { Movie } from '../types/movie';

const Favorites = () => {
  // This will be implemented with localStorage
  const favorites: Movie[] = [];

  const handleFavoriteToggle = (movie: Movie) => {
    // Implement favorite toggle logic
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">
              You haven't added any movies to your favorites yet.
            </p>
            <Link
              to="/"
              className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Discover Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;