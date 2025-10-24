import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { useLanguage } from '../../contexts/LanguageContext'

const Header = () => {
  const { isDark, toggleTheme } = useTheme()
  const { isEnglish, toggleLanguage, t } = useLanguage()

  return (
    <header className="header">
      <h1>{t('Дашборд', 'Dashboard')}</h1>
      <div className="header-controls">
        <button 
          className="btn btn-accent" 
          onClick={toggleLanguage}
        >
          {isEnglish ? 'BG' : 'EN'}
        </button>
        <button 
          className="btn btn-primary" 
          onClick={toggleTheme}
        >
          {isDark ? t('Светла', 'Light') : t('Тъмна', 'Dark')}
        </button>
      </div>
    </header>
  )
}

export default Header