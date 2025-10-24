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
            {/* Нова диаграма до аналитиките */}
            <div className="analytics-with-chart">
              <div className="analytics-main">
                <div className="month">Септември</div>
                <div className="trend positive">+2.5% от Август</div>
              </div>
              
              {/* Анимирана диаграма */}
              <div className="chart-container">
                <div className="animated-chart">
                  <div className="chart-title">Статус на процедури</div>
                  <div className="chart-bars">
                    <div className="chart-bar-container">
                      <div 
                        className="chart-bar completed-bar" 
                        data-value="8"
                        style={{ '--height': '70%' }}
                      >
                        <span className="bar-value">8</span>
                        <div className="bar-label">Завършени</div>
                      </div>
                    </div>
                    <div className="chart-bar-container">
                      <div 
                        className="chart-bar pending-bar" 
                        data-value="3"
                        style={{ '--height': '30%' }}
                      >
                        <span className="bar-value">3</span>
                        <div className="bar-label">Изчакващи</div>
                      </div>
                    </div>
                    <div className="chart-bar-container">
                      <div 
                        className="chart-bar accepted-bar" 
                        data-value="7"
                        style={{ '--height': '60%' }}
                      >
                        <span className="bar-value">7</span>
                        <div className="bar-label">Приети</div>
                      </div>
                    </div>
                    <div className="chart-bar-container">
                      <div 
                        className="chart-bar rejected-bar" 
                        data-value="1"
                        style={{ '--height': '10%' }}
                      >
                        <span className="bar-value">1</span>
                        <div className="bar-label">Отказани</div>
                      </div>
                    </div>
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <div className="legend-color completed"></div>
                      <span>Завършени</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color pending"></div>
                      <span>Изчакващи</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color accepted"></div>
                      <span>Приети</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color rejected"></div>
                      <span>Отказани</span>
                    </div>
                  </div>
                </div>
              </div>
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