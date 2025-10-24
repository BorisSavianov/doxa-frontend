import React from 'react'
import { Outlet } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import Header from './Header'
import Sidebar from './Sidebar'
import '../../styles/globals.css'

const Layout = () => {
  const { isDark } = useTheme()

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <Sidebar />
      <div className="main-content">
        
        <Outlet />
      </div>
    </div>
  )
}

export default Layout