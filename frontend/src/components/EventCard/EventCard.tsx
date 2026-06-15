import "./EventCard.css"
import type { Event } from "../../types/Event"

type Props = Pick<Event, "name" | "description" | "datetime" | "location" | "category" | "price" | "photo">;

export default function EventCard({
  name,
  description,
  datetime,
  location,
  category,
  price,
  photo
}: Props) {
  return (
    <div className="card">
      <img src={photo} alt={name} className="card-image" />

      <div className="card-content">
        <h3>{name}</h3>

        <p className="card-info">
          📅 {datetime} • 📍 {location}
        </p>

        <p className="card-description">{description}</p>

        <div className="card-footer">
          <span className="category">{category}</span>
          <span className="price">{price} c</span>
        </div>
      </div>
    </div>
  )
}