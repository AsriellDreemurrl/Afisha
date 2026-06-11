import "./EventCard.css"

type Props = {
  title: string
  place: string
  date: string
  price: string
  image: string
}

export default function EventCard({
  title,
  place,
  date,
  price,
  image
}: Props) {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />

      <div className="card-content">
        <h3>{title}</h3>

        <p className="card-info">
          📅 {date} • 📍 {place}
        </p>

        <div className="card-footer">
          <span className="category">концерт</span>
          <span className="price">{price} c</span>
        </div>
      </div>
    </div>
  )
}