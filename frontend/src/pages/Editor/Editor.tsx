import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import style from './Editor.module.css';
import { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import type { AfishaEvent } from '../../types/Event';

registerLocale('ru', ru);

function Editor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [photo, setPhoto] = useState('')

  useEffect(() => {
    if (!id) return
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/events/${id}`)
        const event = response.data
        setName(event.name)
        setDescription(event.description)
        setLocation(event.location)
        setCategory(event.category)
        setPrice(String(event.price))
        setPhoto(event.photo)
        if (event.datetime) {
          const parts = event.datetime.split(' ')
          const dateParts = parts[0].split('.')
          const timeParts = parts[1] ? parts[1] : '00:00'
          const isoString = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timeParts}:00`
          const parsedDate = new Date(isoString)
          if (!isNaN(parsedDate.getTime())) {
            setSelectedDate(parsedDate)
          }
        }
      } catch (error) {
        console.error('Ошибка загрузки:', error)
      }
    }
    fetchEvent()
  }, [id])

  const formatDateForBackend = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day}.${month}.${year} ${hours}:${minutes}`
  }

  const handleSave = async () => {
    try {
      const eventData: Omit<AfishaEvent, 'id'> = {
        name,
        description,
        datetime: selectedDate ? selectedDate.toISOString() : '',
        location,
        category,
        price: Number(price),
        photo,
      }
      
      if (id) {
        await axios.put(`http://localhost:3000/events/${id}`, eventData)
        navigate(`/post/${id}`)
      } else {
        const response = await axios.post('http://localhost:3000/events', eventData)
        navigate(`/post/${response.data.id}`)
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error)
    }
  }

  return (
    <div className={style.container}>
      <h1 className={style.name}>{id ? 'Редактировать событие' : 'Новое событие'}</h1>
      <label htmlFor="title" className={style.label}>
        Название
      </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} className={style.title} id="title" />
      <label htmlFor="desc" className={style.label}>
        Описание
      </label>
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        className={style.description}
        id="desc"
      />
      <div className={style.aboutinp_wrapper}>
        <div className={style.input_group}>
          <label htmlFor="date" className={style.label}>
            Дата и время
          </label>
          <DatePicker
            locale="ru"
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className={style.input_group}>
          <label htmlFor="place" className={style.label}>
            Место
          </label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className={style.aboutinp}
            id="place"
          />
        </div>
      </div>
      <div className={style.aboutinp_wrapper}>
        <div className={style.input_group}>
          <label htmlFor="cat" className={style.label}>
            Категория
          </label>
          <select className={style.aboutinp} id="cat" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="" disabled hidden>
              Выберите
            </option>
            <option value="Концерт">Концерт</option>
            <option value="Лекция">Лекция</option>
            <option value="Спорт">Спорт</option>
          </select>
        </div>
        <div className={style.input_group}>
          <label htmlFor="price" className={style.label}>
            Цена
          </label>
          <input
            type="text"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className={style.aboutinp}
            id="price"
          />
        </div>
      </div>
      <label htmlFor="photo" className={style.label}>
        Ссылка на фото
      </label>
      <input type="url" value={photo} onChange={e => setPhoto(e.target.value)} className={style.photo} id="photo" />
      <div className={style.btnwrapper}>
        <button className={style.btn} onClick={handleSave}>
          Сохранить
        </button>
        <button className={style.btn} onClick={() => navigate(-1)}>
          Отмена
        </button>
      </div>
    </div>
  )
}

export default Editor