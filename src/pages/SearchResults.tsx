import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MovieCard } from '../components/MovieCard';
import { SearchBar } from '../components/SearchBar';
import { searchMovies } from '../services/api';
import { Movie } from '../types/movie';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const year = searchParams.get('year') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading } = useQuery({
    queryKey: ['searchMovies', query, year, page],
    queryFn: () => searchMovies(query, page, year),
    enabled: !!query,
  });

  const handleSearch = (newQuery: string, newYear?: string) => {
    setSearchParams({ 
      q: newQuery, 
      ...(newYear && { year: newYear }), 
      page: '1' 
    });
  };

  const handleFavoriteToggle = (movie: Movie) => {
    // Implement favorite toggle logic
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <SearchBar 
            onSearch={handleSearch} 
            initialQuery={query}
            initialYear={year}
          />
        </div>

        {query && (
          <h2 className="text-2xl font-semibold mb-6">
            Search results for "{query}"{year && ` (${year})`}
          </h2>
        )}

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.results.map((movie: Movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={false}
              />
            ))}
          </div>
        )}

        {data && data.total_pages > 1 && (
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setSearchParams({ 
                q: query, 
                ...(year && { year }), 
                page: String(page - 1) 
              })}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-gray-800 text-white rounded-lg">
              Page {page} of {data.total_pages}
            </span>
            <button
              onClick={() => setSearchParams({ 
                q: query, 
                ...(year && { year }), 
                page: String(page + 1) 
              })}
              disabled={page === data.total_pages}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;