import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const Inbox = () => {
  const { t } = useLanguage()

  return (
    <div>
      <h2>{t('Съобщения', 'Inbox')}</h2>
      <div className="card">
        <h3>{t('Входящи съобщения', 'Incoming Messages')}</h3>
        <p>{t('Няма нови съобщения.', 'No new messages.')}</p>
      </div>
    </div>
  )
}

export default Inbox