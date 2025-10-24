import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const Sidebar = () => {
  const { t } = useLanguage()

  const menuItems = [
    { path: '/dashboard', label: t('Дашборд', 'Dashboard') },
    { path: '/profile', label: t('Профил', 'Profile') },
    { path: '/inbox', label: t('Съобщения', 'Inbox') },
    { path: '/calendar', label: t('Календар', 'Calendar') },
    { path: '/admin', label: t('Админ', 'Admin') }
  ]

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar