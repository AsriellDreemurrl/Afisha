import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Editor.module.css"
import { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { useNavigate, useParams } from 'react-router-dom';
import type { AfishaEvent } from "../../types/Event";
import axios from 'axios';
import { parseDate } from "../../utils/dateUtils";

registerLocale('ru', ru);

interface FormState {
  name: string;
  description: string;
  datetime: string;
  location: string;
  category: '' | 'Концерт' | 'Лекция' | 'Спорт' | 'Выставка' | 'Другое';
  price: string;
  photo: string;
}

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormState>({
    name: '',
    description: '',
    datetime: '',
    location: '',
    category: '',
    price: '',
    photo: ''
  });

  useEffect(() => {
    if (!id) return
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/events/${id}`)
        const event: AfishaEvent = response.data
        setFormData({
          name: event.name,
          description: event.description,
          datetime: event.datetime,
          location: event.location,
          category: event.category as FormState['category'],
          price: String(event.price),
          photo: event.photo,
        })
        if (event.datetime) {
          const parsed = parseDate(event.datetime)
          if(parsed) setSelectedDate(parsed)
        }
      } catch (error) {
        console.error('Ошибка загрузки:', error)
      }
    }
    fetchEvent()
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const fieldName = id as keyof FormState;
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date instanceof Date) {
      setFormData(prev => ({
        ...prev,
        datetime: date.toISOString()
      }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const priceNumber = Number(formData.price);
    if (
      !formData.name ||
      !formData.description ||
      !selectedDate ||
      !formData.location ||
      !formData.category ||
      !formData.photo ||
      formData.price.trim() === '' ||
      Number.isNaN(priceNumber)
    ) {
      setError('Пожалуйста, заполните все поля правильными значениями');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload: Omit<AfishaEvent, 'id'> = {
        name: formData.name,
        description: formData.description,
        datetime: selectedDate.toISOString(),
        location: formData.location,
        category: formData.category,
        price: priceNumber,
        photo: formData.photo,
      };

      if (id) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/events/${id}`, payload)
        navigate(`/post/${id}`)
      } else {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/events`, payload);
        navigate(`/post/${response.data.id}`);
      }
    } catch (err) {
      console.error('Error saving event:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка при сохранении события');
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.name}>{id ? 'Редактировать событие' : 'Новое событие'}</h1>

      {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}

      <form onSubmit={handleSave}>
        <label htmlFor="name" className={style.label}>Название</label>
        <input
          type="text"
          className={style.title}
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="description" className={style.label}>Описание</label>
        <textarea
          className={style.description}
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        <div className={style.aboutinp_wrapper}>
          <div className={style.input_group}>
            <label htmlFor="datetime" className={style.label}>Дата и время</label>
            <DatePicker
              id="datetime"
              locale="ru"
              selected={selectedDate}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="Pp"
              required
            />
          </div>
          <div className={style.input_group}>
            <label htmlFor="location" className={style.label}>Место</label>
            <input
              type="text"
              className={style.aboutinp}
              id="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className={style.aboutinp_wrapper}>
          <div className={style.input_group}>
            <label htmlFor="category" className={style.label}>Категория</label>
            <select
              className={style.aboutinp}
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Выберите</option>
              <option value="Концерт">Концерт</option>
              <option value="Лекция">Лекция</option>
              <option value="Спорт">Спорт</option>
              <option value="Выставка">Выставка</option>
              <option value="Другое">Другое</option>
            </select>
          </div>
          <div className={style.input_group}>
            <label htmlFor="price" className={style.label}>Цена</label>
            <input
              type="number"
              className={style.aboutinp}
              id="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <label htmlFor="photo" className={style.label}>Ссылка на фото</label>
        <input
          type="url"
          className={style.photo}
          id="photo"
          value={formData.photo}
          onChange={handleInputChange}
          required
        />

        <div className={style.btnwrapper}>
          <button
            type="submit"
            className={style.btn}
            disabled={loading}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button
            type="button"
            className={style.btn}
            onClick={() => navigate(-1)}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}

export default Editor