import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const Sidebar = () => {
  const { t } = useLanguage()

  const menuItems = [
    { path: '/dashboard', label: t('Дашборд', 'Dashboard'), icon: '📊' },
    { path: '/profile', label: t('Профил', 'Profile'), icon: '👤' },
    { path: '/inbox', label: t('Съобщения', 'Inbox'), icon: '📧' },
    { path: '/calendar', label: t('Календар', 'Calendar'), icon: '📅' },
    { path: '/admin', label: t('Админ', 'Admin'), icon: '⚙️' }
  ]

  return (
    <aside className="sidebar">
      <div style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '10px' }}>
          {t('Панел', 'Panel')}
        </h2>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          background: 'linear-gradient(135deg, var(--accent), #FFC400)', 
          borderRadius: '50%', 
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem'
        }}>
          🚀
        </div>
      </div>
      
      <nav style={{ marginTop: '20px' }}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <span style={{ marginRight: '10px' }}>{item.icon}</span>
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