import styles from './Header.module.css'
import 'react-datepicker/dist/react-datepicker.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import FormInput from '../FormInput/FormInput'
import FormSelect from '../FormSelect/FormSelect'
import FormDatePicker from '../FormDatePicker/FormDatePicker'
import Button from '../Button/Button'

const CATEGORY_FILTER_OPTIONS = [
  { value: '', label: 'Все' },
  { value: 'Концерт', label: 'Концерты' },
  { value: 'Спорт', label: 'Спорт' },
  { value: 'Лекция', label: 'Лекции' },
];

const Header = () => {
  const { search, setSearch, category, setCategory, date, setDate } = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isEditorPage = location.pathname === '/editor' || location.pathname.startsWith('/editor/')

  return (
    <div className={styles.header}>
      <div className={styles.headerLogo}>
        <a href="/" className={styles.logoBox}>
          <img title="Афиша" src="/calendar-icon.svg" />
          <h2 className={styles.logo}>Афиша</h2>
        </a>
        {!isEditorPage && (
          <Button className={styles.createBtn} onClick={() => navigate('/editor')}>
            <span>+</span>Создать
          </Button>
        )}
      </div>

      {isHomePage && (
        <div className={styles.headerContent}>
          <div className={styles.searchRow}>
            <FormInput
              id="search"
              placeholder="Поиск по названию"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              icon="/search-icon.png"
            />
          </div>

          <div className={styles.filtersRow}>
            <div className={styles.selectWrapper}>
              <FormSelect
                id="category-filter"
                options={CATEGORY_FILTER_OPTIONS}
                value={category}
                onChange={(e: any) => {
                  setCategory(e.target.value)
                  e.target.blur()
                }}
              />
            </div>

            <div className={styles.selectWrapper}>
              <FormDatePicker
                id="date-filter"
                value={date ? new Date(date) : null}
                onChange={(selectedDate: Date | null) => {
                  setDate(selectedDate ? selectedDate.toLocaleDateString('en-CA') : '')
                }}
                showTimeSelect={false}
                dateFormat="dd.MM.yyyy"
                placeholderText="Дата"
                isClearable
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header