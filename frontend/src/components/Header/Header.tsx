import styles from './Header.module.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from "react-router-dom"

type Props = {
  search: string
  setSearch: (value: string) => void
  category: string
  setCategory: (value: string) => void
  date: string
  setDate: (value: string) => void
}

const Header = ({ search, setSearch, category, setCategory, date, setDate }: Props) => {
  const navigate = useNavigate()

  return (
    <div className={styles.header}>
      <div className={styles.headerLogo}>
        <div className={styles.logoBox}>
          <img title="Афиша" src="/calendar-icon.svg" />
          <h2 className={styles.logo}>Афиша</h2>
        </div>
        <button className={styles.createBtn} onClick={() => navigate('/editor')}>
          <span>+</span>Создать
        </button>
      </div>

      <div className={styles.headerContent}>
        <div className={styles.searchRow}>
          <input
            className={styles.search}
            placeholder="Поиск по названию"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.filtersRow}>
          <div className={styles.selectWrapper}>
            <select
              value={category === '' ? 'all' : category}
              onChange={e => {
                setCategory(e.target.value === 'all' ? '' : e.target.value)
                e.target.blur()
              }}>
              <option value="" disabled hidden>
                Категория
              </option>
              <option value="all">Все</option>
              <option value="Концерт">Концерты</option>
              <option value="Спорт">Спорт</option>
              <option value="Лекция">Лекции</option>
            </select>
          </div>

          <div className={styles.selectWrapper}>
            <DatePicker
              className={styles.datepickerWrapper}
              selected={date ? new Date(date) : null}
              onChange={(selectedDate: Date | null) => {
                setDate(selectedDate ? selectedDate.toLocaleDateString('en-CA') : '')
                  ; (document.activeElement as HTMLElement)?.blur()
              }}
              placeholderText="Дата"
              dateFormat="dd.MM.yyyy"
              isClearable
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header