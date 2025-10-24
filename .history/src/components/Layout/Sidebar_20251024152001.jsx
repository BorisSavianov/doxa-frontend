import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const Sidebar = () => {
  const { t } = useLanguage()

  const menuItems = [
    { path: '/dashboard', label: t('Дашборд', 'Dashboard') },
    { path: '/procedures', label: t('Процедури', 'Procedures') },
    { path: '/calendar', label: t('Календар', 'Calendar') },
    { path: '/inbox', label: t('Съобщения', 'Inbox') },
    { path: '/profile', label: t('Профил', 'Profile') },
    { path: '/admin', label: t('Админ', 'Admin') }
  ]

  return (
    <aside className="sidebar">
      {/* Header with Logo */}
      <div className="sidebar-header">
        <div className="logo-container">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="logo"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'block'
            }}
          />
         
        </div>
        <div className="header-glow"></div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <div className="nav-header">
          <div className="nav-title">НАВИГАЦИЯ</div>
          <div className="nav-divider"></div>
        </div>
        
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="nav-label">{item.label}</span>
                <div className="nav-active-indicator"></div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

     
    </aside>
  )
}

export default Sidebar