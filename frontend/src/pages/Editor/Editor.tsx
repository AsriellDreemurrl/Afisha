import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Editor.module.css"
import { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import type { Event } from "../../types/Event";
import axios from 'axios';

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

function Editor() {
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
      const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      setFormData(prev => ({
        ...prev,
        datetime: formatted
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
      const payload: Event = {
        name: formData.name,
        description: formData.description,
        datetime: formData.datetime,
        location: formData.location,
        category: formData.category,
        price: priceNumber,
        photo: formData.photo,
        id: String(Date.now())
      };

      const response = await axios.post('http://localhost:3000/events', payload);
      console.log('Данные сохранены:', response.data);

      navigate('/');
    } catch (err) {
      console.error('Error saving event:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка при сохранении события');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className={style.container}>
      <h1 className={style.name}>Новое событие</h1>
      
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
            onClick={handleCancel}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}

export default Editor