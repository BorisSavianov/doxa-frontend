import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Profile = () => {
  const { t } = useLanguage()

  return (
    <div>
      <h2>{t('Профил', 'Profile')}</h2>
      <div className="card">
        <h3>{t('Лична информация', 'Personal Information')}</h3>
        <p>{t('Тук ще се покаже профилната информация.', 'Profile information will be displayed here.')}</p>
      </div>
    </div>
  )
}

export default Profile