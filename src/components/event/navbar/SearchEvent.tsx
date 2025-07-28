import React from "react";

interface SearchEventProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
}

const SearchEvent: React.FC<SearchEventProps> = ({
  searchTerm,
  setSearchTerm,
}) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search results:"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
  </div>
);

export default SearchEvent;
