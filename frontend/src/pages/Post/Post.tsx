import styles from './Post.module.css'
import clsx from 'clsx'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { AfishaEvent } from '../../types/Event'

const Post = ()  => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [event, setEvent] = useState<AfishaEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  useEffect(() => {
    if(id) {
      axios
      .get(`http://localhost:3000/events/${id}`)
      .then((response) => {
        setEvent(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log('Ошибка загрузки события:', error)
        setLoading(false)
      })
    }
  }, [id])
  if(loading) return <div className={styles.container}>Загрузка...</div>
  if (!event) return <div className={styles.container}>Событие не найдено</div>

  const handleDelete = async () => {
    if (!id) return
    try {
      await axios.delete(`http://localhost:3000/events/${id}`)
      navigate('/', {state: {message: 'Событие успешно удалено', type: 'success'}})
      
    } catch (error) {
      console.error(error)

      setMessage({
        type: 'error',
        text: 'Не удалось удалить событие',
      })
      setTimeout(() => {
        setMessage(null)
      }, 2500)
    }
  }

  return (
    <div className={styles.container}>
      {message && (
        <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>{message.text}</div>
      )}
      <button className={styles.backButton} onClick={() => navigate('/')}>
        <span className={styles.backIcon}>&larr;</span> Назад к списку
      </button>

      <div className={styles.image}>
        <img src={event.photo} alt="Изображение места" />
      </div>

      <div className={styles.content}>
        <p className={styles.description}>{event.description}</p>
        <span className={styles.category}>{event.category}</span>
      </div>

      <div className={styles.info}>
        <div className={styles.infoRow}>
          <img src="/calendar-icon.svg" alt="icon" className={styles.infoIcon} />
          <p className={styles.date}>{event.datetime}</p>
        </div>

        <div className={styles.infoRow}>
          <img src="/gps-icon.svg" alt="icon" className={styles.infoIcon} />
          <p className={styles.location}>{event.location}</p>
        </div>

        <div className={styles.infoRow}>
          <img src="/ticket-icon.svg" alt="icon" className={styles.infoIcon} />
          <p className={styles.price}>{event.price} Сом</p>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={clsx(styles.btnAction, styles.btnEdit)} onClick={() => navigate(`/editor/${event.id}`)}>
          <img src="/edit-icon.svg" alt="" className={styles.infoIcon} />
          Редактировать
        </button>

        <button className={clsx(styles.btnAction, styles.btnDelete)} onClick={handleDelete}>
          <img src="/trash-icon.svg" alt="" className={styles.infoIcon} />
          Удалить
        </button>
      </div>
    </div>
  )
}

export default Post