import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import Header from './Header'
import Sidebar from './Sidebar'
import Dashboard from '../../pages/Dashboard'
import Profile from '../../pages/Profile'
import Inbox from '../../pages/Inbox'
import Calendar from '../../pages/Calendar'
import Admin from '../../pages/Admin'
import '../../styles/globals.css'

const Layout = () => {
  const { isDark } = useTheme()

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <Sidebar />
      <div className="main-content">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  )
}

export default Layout