// Editor.jsx
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Editor.module.css"

function Editor() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className={style.container}>
      <h1 className={style.name}>Новое событие</h1>
      <label htmlFor="title" className={style.label}>Название</label>
      <input type="text" className={style.title} id="title" />
      <label htmlFor="desc" className={style.label}>Описание</label>
      <textarea className={style.description} id="desc" />
      <div className={style.aboutinp_wrapper}>
        <div className={style.input_group}>
          <label htmlFor="date" className={style.label}>Дата и время</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className={style.input_group}>
          <label htmlFor="place" className={style.label}>Место</label>
          <input type="text" className={style.aboutinp} id="place" />
        </div>
      </div>
      <div className={style.aboutinp_wrapper}>
        <div className={style.input_group}>
          <label htmlFor="cat" className={style.label}>Категория</label>
          <select className={style.aboutinp} id="cat">
            <option value="" disabled selected hidden>Выберите</option>
            <option value="Концерт">Концерт</option>
            <option value="Лекция">Лекция</option>
            <option value="Спорт">Спорт</option>
          </select>
        </div>
        <div className={style.input_group}>
          <label htmlFor="price" className={style.label}>Цена</label>
          <input type="text" className={style.aboutinp} id="price" />
        </div>
      </div>
      <label htmlFor="photo" className={style.label}>Ссылка на фото</label>
      <input type="url" className={style.photo} id="photo" />
      <div className={style.btnwrapper}>
        <button className={style.btn}>Сохранить</button>
        <button className={style.btn}>Отмена</button>
      </div>
    </div>
  )
}

export default Editor