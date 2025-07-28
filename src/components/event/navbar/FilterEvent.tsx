import React from "react";
import "@/styles/event/FilterEvent.css";

interface FilterEventProps {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedFilter: string;
  setSelectedFilter: (v: string) => void;
}

const FilterEvent: React.FC<FilterEventProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedFilter,
  setSelectedFilter,
}) => (
  <div className="filter-event-section">
    <select
      className="filter-event-select filter-event-select-category"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option>📅 All days</option>
      <option>Today</option>
      <option>This week</option>
      <option>This month</option>
    </select>

    <select
      className="filter-event-select filter-event-select-filter"
      value={selectedFilter}
      onChange={(e) => setSelectedFilter(e.target.value)}
    >
      <option>🔽 Filter</option>
      <option>Free</option>
      <option>Paid</option>
      <option>Online</option>
      <option>Offline</option>
    </select>
  </div>
);

export default FilterEvent;
