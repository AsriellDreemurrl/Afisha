import './Header.css'
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

export default function Header({ search, setSearch, category, setCategory, date, setDate }: Props) {
  const navigate = useNavigate()
  
  return (
    <div className="header">
      <div className="header-logo">
        <div className="logo-box">
          <img title="Афиша" src="/calendar-icon.svg" />
          <h2 className="logo">Афиша</h2>
        </div>
        <button className="create-btn" onClick={() => navigate('/editor')}>
          <span>+</span>Создать
        </button>
      </div>

      <div className="header-content">
        <div className="search-row">
          <input
            className="search"
            placeholder="Поиск по названию"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="filters-row">
          <div className="select-wrapper">
            <select
              title="Категория"
              value={category}
              onChange={e => {
                setCategory(e.target.value)
                e.target.blur()
              }}>
              <option value="" disabled hidden>
                Категория
              </option>
              <option value="all">Все</option>
              <option value="concert">Концерты</option>
              <option value="sport">Спорт</option>
              <option value="lecture">Лекции</option>
            </select>
          </div>

          <div className="select-wrapper">
            <DatePicker
              className="datepicker-wrapper"
              selected={date ? new Date(date) : null}
              onChange={(selectedDate: Date | null) => {
                setDate(selectedDate ? selectedDate.toISOString().split('T')[0] : '')
                ;(document.activeElement as HTMLElement)?.blur()
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
