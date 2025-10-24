import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Profile = () => {
  const { t } = useLanguage()

  return (
    <div>
      <h2>{t('Профил', 'Profile')}</h2>
      <div className="card">
        
      </div>
    </div>
  )
}

export default Profile