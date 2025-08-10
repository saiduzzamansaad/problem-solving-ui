import { useState, useEffect } from 'react';
import  useDebounce  from '../hooks/useDebounce';

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [tagFilter, setTagFilter] = useState('All');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleDifficultyChange = (e) => {
    const value = e.target.value;
    setDifficultyFilter(value);
    onFilter({ difficulty: value, tag: tagFilter });
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    setTagFilter(value);
    onFilter({ difficulty: difficultyFilter, tag: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search problems..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty
          </label>
          <select
            id="difficulty"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            value={difficultyFilter}
            onChange={handleDifficultyChange}
          >
            <option value="All">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
            Tag
          </label>
          <select
            id="tag"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            value={tagFilter}
            onChange={handleTagChange}
          >
            <option value="All">All</option>
            <option value="Array">Array</option>
            <option value="String">String</option>
            <option value="Tree">Tree</option>
            <option value="Graph">Graph</option>
            <option value="DP">Dynamic Programming</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;