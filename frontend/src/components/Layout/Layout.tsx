import Header from '../Header/Header'
import styles from './Layout.module.css'
import type { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode}) => {
  return (
    <div className={styles.layout}>
      <Header />
        {children}
    </div>
  )
}

export default Layout
