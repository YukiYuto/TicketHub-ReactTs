import React from "react";
import type { IEvent } from "@/types/event.types";
import "@/styles/event/EventComponent.css";
import "@/styles/event/EventList.css";

interface EventListProps {
  events: IEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => (
  <div className="event-list">
    {events.map((event) => (
      <div key={event.eventId} className="event-card">
        <img
          className="event-image"
          src={event.eventImage || "/api/placeholder/300/200"}
          alt={event.eventName}
          loading="lazy"
        />
        <div className="event-content">
          <div className="event-title">{event.eventName}</div>
          <div className="event-list-date-time">
            <span className="event-date">
              📅 {formatDateDay(event.eventDate)}
            </span>
            <span className="event-list-time">
              <span role="img" aria-label="clock">
                ⏰
              </span>{" "}
              {formatDateTime(event.eventDate)}
            </span>
          </div>
          {/* <div className="event-meta">{event.location}</div> */}
          {/* {event.eventDescription && (
            <div className="event-list-description">
              {event.eventDescription}
            </div>
          )} */}
          {/* Optionally, add a View Details button for homepage parity */}
          <button className="event-list-view-details-btn">View Details</button>
        </div>
      </div>
    ))}
  </div>
);

function formatDateDay(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(date.getDate())}/${pad(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;
}

function formatDateTime(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)} ${ampm}`;
}

export default EventList;
