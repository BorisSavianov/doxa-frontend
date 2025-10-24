import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Calendar = () => {
  const { t } = useLanguage()

  return (
    <div>
      <h2>{t('Календар', 'Calendar')}</h2>
      <div className="card">
        <h3>{t('Събития', 'Events')}</h3>
        <p>{t('Няма предстоящи събития.', 'No upcoming events.')}</p>
      </div>
    </div>
  )
}

export default Calendar