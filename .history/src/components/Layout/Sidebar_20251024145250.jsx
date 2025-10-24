import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { 
  LayoutDashboard, 
  User, 
  Mail, 
  Calendar, 
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import './Sidebar.css'

const Sidebar = () => {
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { path: '/dashboard', label: t('Дашборд', 'Dashboard'), icon: LayoutDashboard },
    { path: '/profile', label: t('Профил', 'Profile'), icon: User },
    { path: '/inbox', label: t('Съобщения', 'Inbox'), icon: Mail },
    { path: '/calendar', label: t('Календар', 'Calendar'), icon: Calendar },
    { path: '/procedures', label: t('Процедури', 'Procedures'), icon: FileText },
    { path: '/admin', label: t('Админ', 'Admin'), icon: Settings }
  ]

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Header with Logo */}
      <div className="sidebar-header">
        <div className="logo-container">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="logo"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="logo-fallback">
            <div className="logo-icon">⚡</div>
          </div>
        </div>
        
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <li key={item.path}>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <div className="nav-icon">
                    <IconComponent size={20} />
                  </div>
                  {!isCollapsed && (
                    <span className="nav-label">{item.label}</span>
                  )}
                  {isActive && !isCollapsed && (
                    <div className="active-indicator"></div>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <User size={20} />
            </div>
            <div className="user-details">
              <div className="user-name">Александър Иванов</div>
              <div className="user-role">Администратор</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

export default Sidebar