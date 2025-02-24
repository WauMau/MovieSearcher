import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, year?: string) => void;
  initialQuery?: string;
  initialYear?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  initialQuery = '', 
  initialYear = '' 
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [year, setYear] = useState(initialYear);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, year);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    if (query) {
      onSearch(query, selectedYear);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies or genres..."
            className="w-full px-6 py-4 text-lg bg-gray-800 text-white rounded-full pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
        </div>
        
        <select
          value={year}
          onChange={handleYearChange}
          className="px-4 py-4 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        
        <button
          type="submit"
          className="bg-red-500 text-white px-8 py-4 rounded-full hover:bg-red-600 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};