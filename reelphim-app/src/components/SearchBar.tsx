import React, { useState, useCallback } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { tmdbapi } from '../services/tmdbApi';
import debounce from 'lodash/debounce';
import SearchSuggestions from './SearchSuggestions';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const { data } = tmdbapi.Search({
    query: searchTerm,
    enabled: searchTerm.length >= 2, // Chỉ gọi API khi có ít nhất 2 ký tự
  });

  const suggestions = data?.results || [];

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSetSearchTerm(value);
    setShowSuggestions(true);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = () => {
    setShowSuggestions(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Tìm kiếm phim..."
          value={searchTerm}
          onChange={handleInputChange}
          className="input-field h-10 pl-4 pr-10"
          onBlur={() => {
            // Delay hiding suggestions to allow clicks to register
            setTimeout(() => setShowSuggestions(false), 200);
          }}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
          title="Tìm kiếm"
        >
          <SearchIcon size={20} />
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <SearchSuggestions 
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
};

export default Search;