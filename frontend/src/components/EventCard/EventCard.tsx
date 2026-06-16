import "./EventCard.css"
import { Link } from "react-router-dom"
import type { AfishaEvent } from "../../../../backend/src/events/events.store"

type Props = {
  event: AfishaEvent
  onDelete: (id: number) => void
}

export default function EventCard({ event }: Props) {
  return (
    <div className="card">
      <Link className="eventcard__link" to={`/events/${event.id}`}>
        <img src={event.photo} alt={event.name} className="card-image" />
        <div className="card-content">
          <h3>{event.name}</h3>
          <p className="card-info">
            📅 {event.datetime} • 📍 {event.location}
          </p>
          <div className="card-footer">
            <span className="category">{event.category}</span>
            <span className="price">{event.price} c</span>
          </div>
        </div>
      </Link>
    </div>
  )
}