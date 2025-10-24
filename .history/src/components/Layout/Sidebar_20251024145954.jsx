import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'
import { 
  LayoutDashboard, 
  User, 
  Mail, 
  Calendar, 
  Settings,
  FileText,
  ChevronRight,
  Sparkles
} from 'lucide-react'

const Sidebar = () => {
  const { t } = useLanguage()

  const menuItems = [
    { 
      path: '/dashboard', 
      label: t('Дашборд', 'Dashboard'), 
      icon: LayoutDashboard,
      color: '#165895'
    },
    { 
      path: '/profile', 
      label: t('Профил', 'Profile'), 
      icon: User,
      color: '#5FACE6'
    },
    { 
      path: '/inbox', 
      label: t('Съобщения', 'Inbox'), 
      icon: Mail,
      color: '#FFD700'
    },
    { 
      path: '/calendar', 
      label: t('Календар', 'Calendar'), 
      icon: Calendar,
      color: '#10b981'
    },
    { 
      path: '/procedures', 
      label: t('Процедури', 'Procedures'), 
      icon: FileText,
      color: '#8b5cf6'
    },
    { 
      path: '/admin', 
      label: t('Админ', 'Admin'), 
      icon: Settings,
      color: '#ef4444'
    }
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
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="logo-fallback">
            <Sparkles size={32} color="#FFD700" />
          </div>
        </div>
        <div className="header-glow"></div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <div className="nav-header">
          <div className="nav-title">Навигация</div>
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
                <div className="nav-icon-wrapper">
                  <item.icon 
                    size={20} 
                    className="nav-icon"
                    style={{ color: item.color }}
                  />
                  <div 
                    className="nav-glow"
                    style={{ backgroundColor: item.color }}
                  ></div>
                </div>
                <span className="nav-label">{item.label}</span>
                <ChevronRight size={16} className="nav-chevron" />
                <div 
                  className="nav-active-indicator"
                  style={{ backgroundColor: item.color }}
                ></div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <div className="user-name">Александър Иванов</div>
            <div className="user-role">Администратор</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar