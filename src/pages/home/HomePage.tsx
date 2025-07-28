import { useState, useEffect } from "react";
import "@styles/page/HomePage.css";
import { useTheme } from "@/contexts/ThemeContext";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  description: string;
  category: string;
}

interface FeaturedVideo {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  videoUrl?: string;
}

const HomePage = () => {
  const { theme, toggleTheme } = useTheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [featuredVideos, setFeaturedVideos] = useState<FeaturedVideo[]>([]);
  const [selectedTab, setSelectedTab] = useState<"weekend" | "month">(
    "weekend"
  );

  // Mock data for featured videos
  useEffect(() => {
    setFeaturedVideos([
      {
        id: "1",
        title: "Event Highlights 2024",
        description: "Watch the best moments from recent events",
      },
      {
        id: "2",
        title: "Upcoming Events Preview",
        description: "Get excited for what's coming next",
      },
    ]);
  }, []);

  // Mock data for events
  useEffect(() => {
    setEvents([
      {
        id: "1",
        title: "Music Festival",
        date: "Mar 15",
        time: "7:00 PM",
        location: "Central Park, New York",
        category: "Music",
        description:
          "Join us for an amazing music festival featuring top artists",
      },
      {
        id: "2",
        title: "Art Exhibition",
        date: "Dec 18",
        time: "2:00 PM",
        location: "Modern Art Museum",
        category: "Art",
        description:
          "Explore contemporary art from local and international artists",
      },
      {
        id: "3",
        title: "Tech Conference",
        date: "Dec 20",
        time: "9:00 AM",
        location: "Convention Center",
        category: "Technology",
        description: "Latest trends and innovations in technology",
      },
      {
        id: "4",
        title: "Food Festival",
        date: "Jan 22",
        time: "12:00 PM",
        location: "Downtown Plaza",
        category: "Food",
        description: "Taste delicious food from around the world",
      },
      {
        id: "5",
        title: "Sports Tournament",
        date: "Dec 25",
        time: "3:00 PM",
        location: "City Stadium",
        category: "Sports",
        description: "Exciting sports competition with top athletes",
      },
      {
        id: "6",
        title: "Comedy Workshop",
        date: "Jan 28",
        time: "10:00 AM",
        location: "Community Center",
        category: "Comedy",
        description: "Learn the art of comedy from professional comedians",
      },
    ]);
  }, []);

  return (
    <div className="home-page">
      <div className="home-container">
        {/* Header Tabs */}
        <div className="home-header">
          <div className="tab-buttons">
            <button
              className={`tab-btn ${selectedTab === "weekend" ? "active" : ""}`}
              onClick={() => setSelectedTab("weekend")}
            >
              This Weekend
            </button>
            <button
              className={`tab-btn ${selectedTab === "month" ? "active" : ""}`}
              onClick={() => setSelectedTab("month")}
            >
              This Month
            </button>
          </div>
          <div className="search-section">
            <input
              type="text"
              placeholder="Search Events..."
              className="search-input"
            />
            <div className="theme-toggle">
              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                title={`Switch to ${
                  theme === "light" ? "dark" : "light"
                } theme`}
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </div>
          </div>
        </div>

        {/* Featured Videos Section */}
        <section className="featured-videos">
          <h2 className="section-title">Featured Videos</h2>
          <div className="videos-grid">
            {featuredVideos.map((video) => (
              <div key={video.id} className="video-card">
                <div className="video-thumbnail">
                  <div className="play-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="upcoming-events">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-image">
                  <div className="image-placeholder">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17l-3-3 1.5-1.5L9 14l6-6L16.5 9.5 9 17z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <div className="event-content">
                  <div className="event-date-time">
                    <span className="event-date">{event.date}</span>
                    <span className="event-time">{event.time}</span>
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-location">{event.location}</p>
                  <p className="event-description">{event.description}</p>
                  <button className="view-details-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
