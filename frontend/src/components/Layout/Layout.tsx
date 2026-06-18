import './Layout.module.css'
import type { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode}) => {
  return (
    <div className="layout">
        {children}
    </div>
  )
}

export default Layout
