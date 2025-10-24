import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import SimpleChart from '../components/Charts/SimpleChart'

const Dashboard = () => {
  const { t } = useLanguage()

  const stats = [
    { number: '1,234', label: t('Потребители', 'Users') },
    { number: '567', label: t('Продажби', 'Sales') },
    { number: '89%', label: t('Ефективност', 'Efficiency') },
    { number: '2,345', label: t('Прегледи', 'Views') }
  ]

  return (
    <div>
      <h2>{t('Общ преглед', 'Overview')}</h2>
      <div className="dashboard-grid">
        {stats.map((stat, index) => (
          <div key={index} className="card stat-card">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="chart-container">
        <h3>{t('Статистика на продажбите', 'Sales Statistics')}</h3>
        <SimpleChart />
      </div>

      <div className="dashboard-grid" style={{ marginTop: '20px' }}>
        <div className="card">
          <h3>{t('Последни активности', 'Recent Activities')}</h3>
          <p>{t('Няма нови активности', 'No recent activities')}</p>
        </div>
        <div className="card">
          <h3>{t('Бързи задачи', 'Quick Tasks')}</h3>
          <p>{t('Няма задачи', 'No tasks')}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard