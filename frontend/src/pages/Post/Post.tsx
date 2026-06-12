// Post.jsx
<<<<<<< HEAD
import type { JSX } from 'react/jsx-runtime'
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

export const Post = ({ image, category, description, date, location, price }: PostProps) : JSX.Element => {
  return (
    <div className={styles.container}>
      <button className={styles.backButton}>
        <span className={styles.backIcon}>&larr;</span> Назад к списку
      </button>

      <div className={styles.image}>
        <img src={image} alt="Изображение места" />
      </div>

      <div className={styles.content}>
        <p className={styles.description}>Lorem ipsum dolor sit amet ham joda papada.{description}</p>
        <span className={styles.category}>Lorem .{category}</span>
      </div>

      {/* Объединяем иконки и текст в строки */}
      <div className={styles.info}>
        <div className={styles.infoRow}>
          <img src="/calendar-icon.svg" alt="icon" className={styles.infoIcon} />
          <p className={styles.date}>13.03.2026{date}</p>
        </div>

        <div className={styles.infoRow}>
          <img src="/gps-icon.svg" alt="icon" className={styles.infoIcon} />
          <p className={styles.location}>Lorem, ipsum dolor.{location}</p>
        </div>

        <div className={styles.infoRow}>
          <img src="/ticket-icon.svg" alt="icon" className={styles.infoIcon} />
          <p className={styles.price}>1300{price}</p>
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
=======
function Post() {
  return <div>Post</div>
>>>>>>> ae33de8a74de8538e11d3b87adc6b76389dc5d34
}

export default Post