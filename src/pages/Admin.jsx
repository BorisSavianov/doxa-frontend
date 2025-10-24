import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Admin = () => {
  const { t } = useLanguage()

  return (
    <div>
      <h2>{t('Админ панел', 'Admin Panel')}</h2>
      <div className="card">
        <h3>{t('Системни настройки', 'System Settings')}</h3>
        <p>{t('Административни функции ще са достъпни тук.', 'Administrative functions will be available here.')}</p>
      </div>
    </div>
  )
}

export default Admin