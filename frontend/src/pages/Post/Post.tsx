import type { JSX } from 'react/jsx-runtime'
import { useNavigate } from 'react-router-dom'
import styles from './Post.module.css'
import clsx from 'clsx'

interface PostProps {
  image?: string
  category?: string
  description?: string
  date?: string
  location?: string
  price?: string
}

export const Post = ({ image, category, description, date, location, price }: PostProps): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <span className={styles.backIcon}>&larr;</span> Назад к списку
      </button>

      <div className={styles.image}>
        <img src={image} alt="Изображение места" />
      </div>

      <div className={styles.content}>
        <p className={styles.description}>{description}</p>
        <span className={styles.category}>{category}</span>
      </div>

      <div className={styles.info}>
        <div className={styles.infoRow}>
          <img src="/calendar-icon.svg" alt="icon" className={styles.infoIcon} />
          <p className={styles.date}>{date}</p>
        </div>

        <div className={styles.infoRow}>
          <img src="/gps-icon.svg" alt="icon" className={styles.infoIcon} />
          <p className={styles.location}>{location}</p>
        </div>

        <div className={styles.infoRow}>
          <img src="/ticket-icon.svg" alt="icon" className={styles.infoIcon} />
          <p className={styles.price}>{price}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={clsx(styles.btnAction, styles.btnEdit)}>
          <img src="/edit-icon.svg" alt="" className={styles.infoIcon} />
          Редактировать
        </button>

        <button className={clsx(styles.btnAction, styles.btnDelete)}>
          <img src="/trash-icon.svg" alt="" className={styles.infoIcon} />
          Удалить
        </button>
      </div>
    </div>
  )
}

export default Post