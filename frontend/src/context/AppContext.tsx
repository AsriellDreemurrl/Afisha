import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

type AppContextType = {
  search: string
  setSearch: (value: string) => void
  category: string
  setCategory: (value: string) => void
  date: string
  setDate: (value: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  const value = useMemo(() => ({ search, setSearch, category, setCategory, date, setDate }), [search, category, date])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext должен использоваться внутри AppProvider')
  return ctx
}

export default AppContext
