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

type FieldErrors = Partial<Record<keyof FormState | 'datetime', string>>;

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

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

    // Убираем ошибку у поля сразу после того, как пользователь начал его исправлять
    setErrors(prev => {
      if (!prev[fieldName]) return prev;
      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date instanceof Date) {
      setFormData(prev => ({
        ...prev,
        datetime: date.toISOString()
      }));
      setErrors(prev => {
        if (!prev.datetime) return prev;
        const updated = { ...prev };
        delete updated.datetime;
        return updated;
      });
    }
  };

  const validate = (): FieldErrors => {
    const newErrors: FieldErrors = {};
    const priceNumber = Number(formData.price);

    if (!formData.name.trim()) {
      newErrors.name = 'Введите название события';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Введите описание события';
    }

    if (!selectedDate) {
      newErrors.datetime = 'Выберите дату и время';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Укажите место проведения';
    }

    if (!formData.category) {
      newErrors.category = 'Выберите категорию';
    }

    if (formData.price.trim() === '' || Number.isNaN(priceNumber) || priceNumber < 0) {
      newErrors.price = 'Укажите корректную цену';
    }

    if (!formData.photo.trim()) {
      newErrors.photo = 'Добавьте ссылку на фото';
    } else {
      try {
        new URL(formData.photo);
      } catch {
        newErrors.photo = 'Ссылка на фото должна быть корректным URL';
      }
    }

    return newErrors;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const payload: Omit<AfishaEvent, 'id'> = {
        name: formData.name,
        description: formData.description,
        datetime: selectedDate!.toISOString(),
        location: formData.location,
        category: formData.category,
        price: Number(formData.price),
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
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.name}>{id ? 'Редактировать событие' : 'Новое событие'}</h1>

      <form onSubmit={handleSave} noValidate>
        <label htmlFor="name" className={style.label}>Название</label>
        <input
          type="text"
          className={errors.name ? `${style.title} ${style.inputError}` : style.title}
          id="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <span className={style.errorText}>{errors.name}</span>}

        <label htmlFor="description" className={style.label}>Описание</label>
        <textarea
          className={errors.description ? `${style.description} ${style.inputError}` : style.description}
          id="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        {errors.description && <span className={style.errorText}>{errors.description}</span>}

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
              className={errors.datetime ? style.inputError : ''}
            />
            {errors.datetime && <span className={style.errorText}>{errors.datetime}</span>}
          </div>
          <div className={style.input_group}>
            <label htmlFor="location" className={style.label}>Место</label>
            <input
              type="text"
              className={errors.location ? `${style.aboutinp} ${style.inputError}` : style.aboutinp}
              id="location"
              value={formData.location}
              onChange={handleInputChange}
            />
            {errors.location && <span className={style.errorText}>{errors.location}</span>}
          </div>
        </div>

        <div className={style.aboutinp_wrapper}>
          <div className={style.input_group}>
            <label htmlFor="category" className={style.label}>Категория</label>
            <select
              className={errors.category ? `${style.aboutinp} ${style.inputError}` : style.aboutinp}
              id="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="" disabled>Выберите</option>
              <option value="Концерт">Концерт</option>
              <option value="Лекция">Лекция</option>
              <option value="Спорт">Спорт</option>
              <option value="Выставка">Выставка</option>
              <option value="Другое">Другое</option>
            </select>
            {errors.category && <span className={style.errorText}>{errors.category}</span>}
          </div>
          <div className={style.input_group}>
            <label htmlFor="price" className={style.label}>Цена</label>
            <input
              type="number"
              className={errors.price ? `${style.aboutinp} ${style.inputError}` : style.aboutinp}
              id="price"
              value={formData.price}
              onChange={handleInputChange}
            />
            {errors.price && <span className={style.errorText}>{errors.price}</span>}
          </div>
        </div>

        <label htmlFor="photo" className={style.label}>Ссылка на фото</label>
        <input
          type="url"
          className={errors.photo ? `${style.photo} ${style.inputError}` : style.photo}
          id="photo"
          value={formData.photo}
          onChange={handleInputChange}
        />
        {errors.photo && <span className={style.errorText}>{errors.photo}</span>}

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