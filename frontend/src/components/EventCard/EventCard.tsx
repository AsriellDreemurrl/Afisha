import "./EventCard.css"
import  { useNavigate } from 'react-router-dom'
import type { Event } from "../../types/Event"

export default function EventCard({
  id,
  name,
  location,
  datetime,
  price,
  photo,
  category
}: Event) {

  const navigate = useNavigate()
  const handleClick = () => { navigate(`/post/${id}`) }
  return (
    <div className="card" onClick={handleClick}>
      <img src={photo} alt={name} className="card-image" />

      <div className="card-content">
        <h3>{name}</h3>

        <p className="card-info">
          📅 {datetime} • 📍 {location}
        </p>

        <div className="card-footer">
          <span className="category">{category}</span>
          <span className="price">{price} c</span>
        </div>
      </div>
    </div>
  )
}