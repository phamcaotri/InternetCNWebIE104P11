import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  /** @author @phantruowngthanhtrung
   * Định nghĩa nội dung của Search:
   * - Tìm kiếm phim
   * Lấy thông tin từ file lucide-react.d.ts
   * - Chuyển hướng đến trang kết quả tìm kiếm
   * Lấy thông tin từ file index.d.ts
   */
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="Tìm kiếm phim..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-background text-text px-4 py-2 rounded-full pr-10 focus:outline-none focus:ring-2 focus:ring-primary w-full"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-primary"
      >
        <SearchIcon size={20} />
      </button>
    </form>
  );
};

export default Search;