import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Movie } from '../types/movie';
import { getImageUrl } from '../services/api';

interface MovieCardProps {
  movie: Movie;
  onFavoriteToggle: (movie: Movie) => void;
  isFavorite: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onFavoriteToggle,
  isFavorite,
}) => {
  const year = movie.release_date?.split('-')[0] || 'N/A';
  
  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
            <p className="text-gray-400">{year}</p>
          </div>
          <button
            onClick={() => onFavoriteToggle(movie)}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
        
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-gray-400">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};