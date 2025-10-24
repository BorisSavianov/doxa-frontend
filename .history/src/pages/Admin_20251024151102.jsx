import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/admin.css';

const Admin = () => {
  const [selectedFilter, setSelectedFilter] = useState('всички');
  const [showAddProcedure, setShowAddProcedure] = useState(false);

  const usersData = [
    {
      id: 1,
      name: 'Иван Петров',
      position: 'Професор',
      university: 'Софийски университет',
      lastJuryDate: '15.12.2024',
      previousJuryDate: '20.06.2024',
      city: 'София'
    },
    {
      id: 2,
      name: 'Мария Георгиева',
      position: 'Доктор',
      university: 'Медицински университет - София',
      lastJuryDate: '10.01.2025',
      previousJuryDate: '15.08.2024',
      city: 'София'
    },
    {
      id: 3,
      name: 'Георги Димитров',
      position: 'Доцент',
      university: 'Технически университет - София',
      lastJuryDate: '05.11.2024',
      previousJuryDate: '12.03.2024',
      city: 'София'
    },
    {
      id: 4,
      name: 'Елена Василева',
      position: 'Професор',
      university: 'Пловдивски университет',
      lastJuryDate: '20.10.2024',
      previousJuryDate: '25.04.2024',
      city: 'Пловдив'
    },
    {
      id: 5,
      name: 'Стоян Иванов',
      position: 'Доктор',
      university: 'Университет по хранителни технологии',
      lastJuryDate: '08.12.2024',
      previousJuryDate: '14.07.2024',
      city: 'Пловдив'
    },
    {
      id: 6,
      name: 'Анна Николова',
      position: 'Доцент',
      university: 'Варненски свободен университет',
      lastJuryDate: '12.09.2024',
      previousJuryDate: '18.02.2024',
      city: 'Варна'
    },
    {
      id: 7,
      name: 'Петър Стоянов',
      position: 'Професор',
      university: 'Бургаски свободен университет',
      lastJuryDate: '25.11.2024',
      previousJuryDate: '30.05.2024',
      city: 'Бургас'
    },
    {
      id: 8,
      name: 'Диана Попова',
      position: 'Доктор',
      university: 'Медицински университет - Варна',
      lastJuryDate: '18.01.2025',
      previousJuryDate: '22.09.2024',
      city: 'Варна'
    }
  ];

  const filters = [
    { value: 'всички', label: 'Всички', count: usersData.length },
    { value: 'професор', label: 'Професори', count: usersData.filter(user => user.position === 'Професор').length },
    { value: 'доктор', label: 'Доктори', count: usersData.filter(user => user.position === 'Доктор').length },
    { value: 'доцент', label: 'Доценти', count: usersData.filter(user => user.position === 'Доцент').length },
    { value: 'софия', label: 'София', count: usersData.filter(user => user.city === 'София').length },
    { value: 'пловдив', label: 'Пловдив', count: usersData.filter(user => user.city === 'Пловдив').length },
    { value: 'варна', label: 'Варна', count: usersData.filter(user => user.city === 'Варна').length },
    { value: 'бургac', label: 'Бургас', count: usersData.filter(user => user.city === 'Бургас').length }
  ];

  const getFilteredUsers = () => {
    if (selectedFilter === 'всички') {
      return usersData;
    }
    
    if (['професор', 'доктор', 'доцент'].includes(selectedFilter)) {
      return usersData.filter(user => user.position.toLowerCase() === selectedFilter);
    }
    
    return usersData.filter(user => user.city.toLowerCase() === selectedFilter);
  };

  const getPositionColor = (position) => {
    const colors = {
      'Професор': '#8b5cf6',
      'Доктор': '#10b981',
      'Доцент': '#f59e0b'
    };
    return colors[position] || '#6b7280';
  };

  const getCityColor = (city) => {
    const colors = {
      'София': '#2563eb',
      'Пловдив': '#ef4444',
      'Варна': '#06b6d4',
      'Бургас': '#84cc16'
    };
    return colors[city] || '#6b7280';
  };

  return (
    <div className="admin-page">
      <div className="page-header">
    
        <h2>Административен панел</h2>
      </div>

      <div className="admin-container">
        {/* Административни действия */}
        <div className="admin-actions">
          <div className="actions-header">
            <h2>Действия</h2>
          </div>
          <div className="actions-grid">
            <button 
              className="action-btn primary"
              onClick={() => setShowAddProcedure(true)}
            >
              <span className="action-icon">+</span>
              <span className="action-text">Добави процедура</span>
            </button>
            <button className="action-btn secondary">
              <span className="action-icon">👥</span>
              <span className="action-text">Добави потребител</span>
            </button>
            <button className="action-btn secondary">
              <span className="action-icon">📊</span>
              <span className="action-text">Генерирай отчет</span>
            </button>
          </div>
        </div>

        {/* Филтри за потребители */}
        <div className="users-filters">
          <div className="filters-header">
            <h2>Потребители</h2>
            <span className="users-count">{getFilteredUsers().length} потребители</span>
          </div>
          <div className="filters-scroll">
            {filters.map((filter) => (
              <button
                key={filter.value}
                className={`filter-btn ${selectedFilter === filter.value ? 'active' : ''}`}
                onClick={() => setSelectedFilter(filter.value)}
              >
                <span className="filter-label">{filter.label}</span>
                <span className="filter-count">{filter.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Списък с потребители */}
        <div className="users-list-section">
          <div className="users-list">
            {getFilteredUsers().map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-header">
                  <div className="user-name">{user.name}</div>
                  <div className="user-badges">
                    <span 
                      className="position-badge"
                      style={{ backgroundColor: getPositionColor(user.position) }}
                    >
                      {user.position}
                    </span>
                    <span 
                      className="city-badge"
                      style={{ backgroundColor: getCityColor(user.city) }}
                    >
                      {user.city}
                    </span>
                  </div>
                </div>
                
                <div className="user-info">
                  <div className="info-item">
                    <span className="info-label">Университет:</span>
                    <span className="info-value">{user.university}</span>
                  </div>
                </div>

                <div className="user-dates">
                  <div className="date-item">
                    <span className="date-label">Последно жури:</span>
                    <span className="date-value">{user.lastJuryDate}</span>
                  </div>
                  <div className="date-item">
                    <span className="date-label">Предпоследно жури:</span>
                    <span className="date-value">{user.previousJuryDate}</span>
                  </div>
                </div>

                <div className="user-actions">
                  <button className="user-btn edit">Редактирай</button>
                  <button className="user-btn details">Детайли</button>
                  <button className="user-btn assign">Назначи жури</button>
                </div>
              </div>
            ))}
          </div>

          {getFilteredUsers().length === 0 && (
            <div className="no-users">
              <h3>Няма намерени потребители</h3>
              <p>Не са открити потребители за избрания филтър</p>
            </div>
          )}
        </div>
      </div>

      {/* Модал за добавяне на процедура */}
      {showAddProcedure && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Добавяне на нова процедура</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddProcedure(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Функционалността за добавяне на процедура ще бъде реализирана скоро.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn secondary"
                onClick={() => setShowAddProcedure(false)}
              >
                Откажи
              </button>
              <button className="modal-btn primary">
                Запази
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;