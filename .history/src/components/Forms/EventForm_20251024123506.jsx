import React, { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import './EventForm.css'

const EventForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    startDate: initialData.startDate || '',
    startTime: initialData.startTime || '09:00',
    endDate: initialData.endDate || '',
    endTime: initialData.endTime || '10:00',
    allDay: initialData.allDay || false,
    color: initialData.color || '#165895'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert(t('Моля, въведете заглавие', 'Please enter a title'))
      return
    }

    const startDateTime = formData.allDay 
      ? new Date(formData.startDate)
      : new Date(`${formData.startDate}T${formData.startTime}`)
    
    const endDateTime = formData.allDay 
      ? new Date(formData.endDate || formData.startDate)
      : new Date(`${formData.endDate || formData.startDate}T${formData.endTime}`)

    onSubmit({
      ...formData,
      start: startDateTime,
      end: endDateTime
    })
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const colorOptions = [
    { value: '#165895', label: t('Основен син', 'Primary Blue') },
    { value: '#5FACE6', label: t('Светло син', 'Light Blue') },
    { value: '#FFD700', label: t('Жълт', 'Yellow') },
    { value: '#28a745', label: t('Зелен', 'Green') },
    { value: '#dc3545', label: t('Червен', 'Red') },
    { value: '#6f42c1', label: t('Лилав', 'Purple') }
  ]

  const today = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="form-group">
        <label className="form-label">
          {t('Заглавие *', 'Title *')}
        </label>
        <input
          type="text"
          className="form-input"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder={t('Въведете заглавие на събитието', 'Enter event title')}
          autoFocus
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          {t('Описание', 'Description')}
        </label>
        <textarea
          className="form-textarea"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder={t('Допълнителна информация', 'Additional information')}
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            {t('Начална дата *', 'Start Date *')}
          </label>
          <input
            type="date"
            className="form-input"
            value={formData.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            min={today}
            required
          />
        </div>

        {!formData.allDay && (
          <div className="form-group">
            <label className="form-label">
              {t('Начален час', 'Start Time')}
            </label>
            <input
              type="time"
              className="form-input"
              value={formData.startTime}
              onChange={(e) => handleChange('startTime', e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            {t('Крайна дата', 'End Date')}
          </label>
          <input
            type="date"
            className="form-input"
            value={formData.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
            min={formData.startDate || today}
          />
        </div>

        {!formData.allDay && (
          <div className="form-group">
            <label className="form-label">
              {t('Краен час', 'End Time')}
            </label>
            <input
              type="time"
              className="form-input"
              value={formData.endTime}
              onChange={(e) => handleChange('endTime', e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.allDay}
            onChange={(e) => handleChange('allDay', e.target.checked)}
            className="checkbox-input"
          />
          <span className="checkbox-custom"></span>
          {t('Цял ден', 'All day')}
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          {t('Цвят', 'Color')}
        </label>
        <div className="color-options">
          {colorOptions.map(color => (
            <label key={color.value} className="color-option">
              <input
                type="radio"
                name="color"
                value={color.value}
                checked={formData.color === color.value}
                onChange={(e) => handleChange('color', e.target.value)}
                className="color-input"
              />
              <span 
                className="color-preview"
                style={{ backgroundColor: color.value }}
              ></span>
              <span className="color-label">{color.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          {t('Отказ', 'Cancel')}
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {t('Запази събитие', 'Save Event')}
        </button>
      </div>
    </form>
  )
}

export default EventForm