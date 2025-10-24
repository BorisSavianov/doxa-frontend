import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import SimpleChart from '../components/Charts/SimpleChart'

const Dashboard = () => {
  const { t } = useLanguage()

  const stats = [
    { number: '1,234', label: t('Потребители', 'Users'), trend: '+12%' },
    { number: '567', label: t('Продажби', 'Sales'), trend: '+8%' },
    { number: '89%', label: t('Ефективност', 'Efficiency'), trend: '+3%' },
    { number: '2,345', label: t('Прегледи', 'Views'), trend: '+15%' }
  ]

  return (
    <div>
      <h2>{t('Общ преглед', 'Overview')}</h2>
      
      <div className="dashboard-grid">
        {stats.map((stat, index) => (
          <div key={index} className="card stat-card">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">
              {stat.label} 
              <span className="badge">{stat.trend}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.random() * 60 + 40}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-container">
        <h3>{t('Статистика на продажбите', 'Sales Statistics')}</h3>
        <SimpleChart />
      </div>

      <div className="dashboard-grid" style={{ marginTop: '25px' }}>
        <div className="card">
          <h3>{t('Последни активности', 'Recent Activities')}</h3>
          <div style={{ marginTop: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', background: 'var(--background)', borderRadius: '6px' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%', marginRight: '10px' }}></div>
              <span>{t('Нов потребител се регистрира', 'New user registered')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', background: 'var(--background)', borderRadius: '6px' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', marginRight: '10px' }}></div>
              <span>{t('Продажбата е завършена', 'Sale completed')}</span>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3>{t('Бързи задачи', 'Quick Tasks')}</h3>
          <div style={{ marginTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
              <span>{t('Провери имейли', 'Check emails')}</span>
              <div style={{ width: '20px', height: '20px', border: '2px solid var(--primary)', borderRadius: '4px' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '12px', border: '1px solid var(--border)', borderRadius: '6px' }}>
              <span>{t('Обнови статистики', 'Update statistics')}</span>
              <div style={{ width: '20px', height: '20px', border: '2px solid var(--primary)', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard