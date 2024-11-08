import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MediaItem } from '../types/media.types';
interface SearchSuggestionsProps {
  suggestions: MediaItem[];
  onSuggestionClick: () => void;
}

const SearchSuggestions = ({ suggestions, onSuggestionClick }: SearchSuggestionsProps) => {
  const navigate = useNavigate();

  const handleSuggestionClick = (suggestion: MediaItem) => {
    const type = suggestion.mediaType === 'movie' ? 'movie' : 'tv';
    navigate(`/${type}/${suggestion.id}`);
    onSuggestionClick();
  };

  return (
    <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg">
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => handleSuggestionClick(suggestion)}
        >
          <div className="font-medium">{suggestion.title}</div>
          <div className="text-sm text-gray-500">
            {suggestion.mediaType === 'movie' ? 'Phim' : 'TV Series'} •{' '}
            {suggestion.releaseDate ? new Date(suggestion.releaseDate).getFullYear() : ''}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions;