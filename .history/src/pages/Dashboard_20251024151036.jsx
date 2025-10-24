import React from 'react';
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Дашборд</h2>
      
      {/* Процедури секция - цяла ширина */}
      <div className="card procedures-card full-width">
        <h2>Процедури</h2>
        
        <div className="procedures-grid">
          {/* Лява колона - Следваща и Последна процедура */}
          <div className="procedures-column">
            <div className="procedure-section">
              <h3>Следваща процедура:</h3>
              <div className="procedure-item">
                <div className="procedure-content">
                  <div className="procedure-info">
                    <div className="procedure-title">Процедура за Доктор</div>
                    <div className="procedure-date">Петък, 30 юни 2025 гр. София</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="procedure-section">
              <h3>Последна процедура:</h3>
              <div className="procedure-item">
                <div className="procedure-content">
                  <div className="procedure-info">
                    <div className="procedure-title">Процедура за Доктор по науките</div>
                    <div className="procedure-date">Петък, 30 юни 2025 гр. София</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Дясна колона - Изчакващи процедури */}
          <div className="procedures-column">
            <div className="procedure-section">
              <h3>Изчакващи отговор:</h3>
              <div className="procedure-list">
                <div className="procedure-item waiting">
                  <div className="procedure-content">
                    <div className="procedure-info">
                      <div className="procedure-title">Процедура за Доктор</div>
                      <div className="procedure-date">Петък, 30 юни 2025 гр. София</div>
                    </div>
                    <button className="details-btn">Детайли</button>
                  </div>
                </div>
                <div className="procedure-item waiting">
                  <div className="procedure-content">
                    <div className="procedure-info">
                      <div className="procedure-title">Процедура за Доцент</div>
                      <div className="procedure-date">Петък, 30 юни 2025 гр. София</div>
                    </div>
                    <button className="details-btn">Детайли</button>
                  </div>
                </div>
                <div className="procedure-item waiting">
                  <div className="procedure-content">
                    <div className="procedure-info">
                      <div className="procedure-title">Процедура за Професор</div>
                      <div className="procedure-date">Петък, 30 юни 2025 гр. София</div>
                    </div>
                    <button className="details-btn">Детайли</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Долни секции */}
      <div className="bottom-sections">
        {/* Аналитики секция - разтегната на цялата дължина */}
        <div className="card analytics-card full-width">
          <h2>Аналитики</h2>
          <div className="analytics-content">
            <div className="analytics-main">
              <div className="month">Септември</div>
              <div className="trend positive">+2.5% от Август</div>
            </div>
            <div className="analytics-stats">
              <div className="stat-item">
                <div className="stat-value">12</div>
                <div className="stat-label">Общо процедури</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">8</div>
                <div className="stat-label">Завършени</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">3</div>
                <div className="stat-label">Изчакващи</div>
              </div>
              <div className="stat-item">
                <div className="stat-value accepted">7</div>
                <div className="stat-label">Приети</div>
              </div>
              <div className="stat-item">
                <div className="stat-value rejected">1</div>
                <div className="stat-label">Отказани</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;