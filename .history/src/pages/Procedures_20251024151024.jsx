import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/procedures.css';

const Procedures = () => {
  const [selectedCategory, setSelectedCategory] = useState('всички');

  const proceduresData = {
    'всички': [
      { 
        title: 'Процедура за Доктор', 
        date: 'Петък, 30 юни 2025 гр. София',
        category: 'изчакващи',
        status: 'pending'
      },
      { 
        title: 'Процедура за Доцент', 
        date: 'Четвъртък, 29 юни 2025 гр. Пловдив',
        category: 'завършени',
        status: 'completed'
      },
      { 
        title: 'Процедура за Професор', 
        date: 'Сряда, 28 юни 2025 гр. Варна',
        category: 'приети',
        status: 'accepted'
      },
      { 
        title: 'Процедура за Доктор по науките', 
        date: 'Понеделник, 26 юни 2025 гр. София',
        category: 'завършени',
        status: 'completed'
      },
      { 
        title: 'Процедура за Доцент', 
        date: 'Петък, 23 юни 2025 гр. Бургас',
        category: 'отказани',
        status: 'rejected'
      },
      { 
        title: 'Процедура за Професор', 
        date: 'Сряда, 21 юни 2025 гр. София',
        category: 'изчакващи',
        status: 'pending'
      }
    ],
    'изчакващи': [
      { 
        title: 'Процедура за Доктор', 
        date: 'Петък, 30 юни 2025 гр. София',
        category: 'изчакващи',
        status: 'pending'
      },
      { 
        title: 'Процедура за Професор', 
        date: 'Сряда, 21 юни 2025 гр. София',
        category: 'изчакващи',
        status: 'pending'
      }
    ],
    'завършени': [
      { 
        title: 'Процедура за Доцент', 
        date: 'Четвъртък, 29 юни 2025 гр. Пловдив',
        category: 'завършени',
        status: 'completed'
      },
      { 
        title: 'Процедура за Доктор по науките', 
        date: 'Понеделник, 26 юни 2025 гр. София',
        category: 'завършени',
        status: 'completed'
      }
    ],
    'приети': [
      { 
        title: 'Процедура за Професор', 
        date: 'Сряда, 28 юни 2025 гр. Варна',
        category: 'приети',
        status: 'accepted'
      }
    ],
    'отказани': [
      { 
        title: 'Процедура за Доцент', 
        date: 'Петък, 23 юни 2025 гр. Бургас',
        category: 'отказани',
        status: 'rejected'
      }
    ]
  };

  const categories = [
    { value: 'всички', label: 'Всички процедури', count: 6 },
    { value: 'изчакващи', label: 'Изчакващи', count: 2 },
    { value: 'завършени', label: 'Завършени', count: 2 },
    { value: 'приети', label: 'Приети', count: 1 },
    { value: 'отказани', label: 'Отказани', count: 1 }
  ];

  const getProceduresToShow = () => {
    if (selectedCategory === 'всички') {
      return proceduresData['всички'];
    }
    return proceduresData[selectedCategory] || [];
  };

  const getCategoryColor = (category) => {
    const colors = {
      'изчакващи': '#f59e0b',
      'завършени': '#10b981',
      'приети': '#8b5cf6',
      'отказани': '#ef4444'
    };
    return colors[category] || '#6b7280';
  };

  const getStatusText = (status) => {
    const statusText = {
      'pending': 'Изчаква',
      'completed': 'Завършена',
      'accepted': 'Приета',
      'rejected': 'Отхвърлена'
    };
    return statusText[status] || 'Неизвестен';
  };

  return (
    <div className="procedures-page">
      <div className="page-header">
        
        <h2>Процедури</h2>
      </div>

      <div className="procedures-container">
        {/* Филтри */}
        <div className="procedures-filters">
          <h2>Филтриране на процедури</h2>
          <div className="filters-grid">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                <span className="filter-label">{category.label}</span>
                <span className="filter-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Списък с процедури */}
        <div className="procedures-list-section">
          <div className="section-header">
            <h3>
              {selectedCategory === 'всички' 
                ? 'Всички процедури' 
                : categories.find(cat => cat.value === selectedCategory)?.label
              }
              <span className="procedures-count">({getProceduresToShow().length})</span>
            </h3>
          </div>

          <div className="procedures-list">
            {getProceduresToShow().map((procedure, index) => (
              <div key={index} className="procedure-card">
                <div className="procedure-header">
                  <div className="procedure-category">
                    <span 
                      className="category-badge"
                      style={{ backgroundColor: getCategoryColor(procedure.category) }}
                    >
                      {procedure.category}
                    </span>
                  </div>
                </div>
                
                <div className="procedure-content">
                  <div className="procedure-info">
                    <div className="procedure-title">{procedure.title}</div>
                    <div className="procedure-date">{procedure.date}</div>
                  </div>
                  <div className="procedure-actions">
                    <button className="details-btn">Детайли</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {getProceduresToShow().length === 0 && (
            <div className="no-procedures">
              <h3>Няма намерени процедури</h3>
              <p>Не са открити процедури за избрания филтър</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Procedures;