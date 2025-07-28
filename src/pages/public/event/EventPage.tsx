import { useState, useEffect } from "react";
import type { IEvent } from "@/types/event.types";
import { useTheme } from "@/contexts/ThemeContext";
import axiosInstance from "@/utils/axios/axiosInstance";
import { Event_List_URL } from "@/utils/apiUrl/eventApiUrl";
import EventList from "@/components/event/list/EventList";
import FilterEvent from "@/components/event/navbar/FilterEvent";
import SearchEvent from "@/components/event/navbar/SearchEvent";
import "@/styles/event/EventPage.css";

const EventPage = () => {
  const { theme } = useTheme();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All days");
  const [selectedFilter, setSelectedFilter] = useState<string>("Filter");

  // Call API to get event list
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get(Event_List_URL);
        setEvents(response.data.result || []);
      } catch (error) {
        // Handle error if needed
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.status === 1 &&
      (event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="event-page" data-theme={theme}>
      <div className="event-container">
        {/* Header with search and filters */}
        <div className="event-header">
          <div className="search-section">
            <SearchEvent
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <div className="filter-section">
            <FilterEvent
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
            {/* <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button> */}
          </div>
        </div>
        {/* Events Grid */}
        <section className="events-section">
          <EventList events={filteredEvents} />
        </section>
      </div>
    </div>
  );
};

export default EventPage;
