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
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/inbox" element={<Inbox />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/procedures" element={<Procedures />} />
                </Routes>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout