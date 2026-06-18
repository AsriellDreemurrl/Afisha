import styles from "./EventCard.module.css"
import  { useNavigate } from 'react-router-dom'
import type { AfishaEvent } from "../../types/Event"

export default function EventCard({
  id,
  name,
  location,
  datetime,
  price,
  photo,
  category
}: AfishaEvent & { onDelete: (id: number) => void }) {
  const navigate = useNavigate()
  const handleClick = () => { navigate(`/post/${id}`) }
  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={photo} alt={name} className={styles.cardImage} />

      <div className={styles.cardContent}>
        <h3>{name}</h3>

        <p className={styles.cardInfo}>
          📅 {datetime} • 📍 {location}
        </p>

        <div className={styles.cardFooter}>
          <span className={styles.category}>{category}</span>
          <span className={styles.price}>{price} c</span>
        </div>
      </div>
    </div>
  )
}