import './Header.css'

type Props = {
  search: string
  setSearch: (value: string) => void
  category: string
  setCategory: (value: string) => void
  date: string
  setDate: (value: string) => void
}

export default function Header({
  search,
  setSearch,
  category,
  setCategory,
  date,
  setDate
}: Props) {
  return (
    <div className="header">

      <h2 className="logo">
  Afisha
  <button className="create-btn">+ создать</button>
</h2>

    
      <div className="search-row">
        <input
          className="search"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

   
      <div className="filters-row">

        <div className="left">
          <div className="select-wrapper">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Категории</option>
              <option value="concert">Концерты</option>
              <option value="sport">Спорт</option>
              <option value="lecture">Лекции</option>
            </select>
            <span className="arrow">▼</span>
          </div>

          <div className="select-wrapper">
            <input
              type="date"
              
            />
            <span className="arrow">▼</span>
          </div>
        </div>

      </div>

    </div>
  )
}