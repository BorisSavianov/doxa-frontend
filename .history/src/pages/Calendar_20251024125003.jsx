import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import './Calendar.css'

const Calendar = () => {
  const { t } = useLanguage()
  const [currentView, setCurrentView] = useState('dayGridMonth')
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    allDay: false,
    description: ''
  })

  // Примерни събития
  const [events, setEvents] = useState([
    {
      id: '1',
      title: t('Среща с екипа', 'Team Meeting'),
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 2)),
      color: '#165895',
      description: t('Седмична среща с целия екип', 'Weekly team meeting')
    },
    {
      id: '2',
      title: t('Презентация', 'Presentation'),
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(new Date().setDate(new Date().getDate() + 1)),
      color: '#5FACE6',
      description: t('Презентация на нов продукт', 'New product presentation')
    },
    {
      id: '3',
      title: t('Обедна почивка', 'Lunch Break'),
      start: new Date(new Date().setDate(new Date().getDate() + 2)),
      end: new Date(new Date().setDate(new Date().getDate() + 2)),
      color: '#FFD700',
      description: t('Обедна почивка с клиенти', 'Lunch with clients')
    }
  ])

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo)
    setNewEvent({
      title: '',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
      description: ''
    })
    setShowEventModal(true)
  }

  const handleEventClick = (clickInfo) => {
    setNewEvent({
      title: clickInfo.event.title,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
      allDay: clickInfo.event.allDay,
      description: clickInfo.event.extendedProps.description || ''
    })
    setShowEventModal(true)
  }

  const handleAddEvent = () => {
    setSelectedDate(null)
    setNewEvent({
      title: '',
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
      allDay: true,
      description: ''
    })
    setShowEventModal(true)
  }

  const handleSaveEvent = () => {
    if (!newEvent.title.trim()) {
      alert(t('Моля, въведете заглавие на събитието', 'Please enter event title'))
      return
    }

    const eventToSave = {
      id: Date.now().toString(),
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      allDay: newEvent.allDay,
      color: '#165895',
      description: newEvent.description
    }

    setEvents(prev => [...prev, eventToSave])
    setShowEventModal(false)
    setNewEvent({
      title: '',
      start: '',
      end: '',
      allDay: false,
      description: ''
    })
  }

  const handleViewChange = (viewInfo) => {
    setCurrentView(viewInfo.view.type)
  }

  const closeModal = () => {
    setShowEventModal(false)
    setNewEvent({
      title: '',
      start: '',
      end: '',
      allDay: false,
      description: ''
    })
  }

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h2>{t('Календар', 'Calendar')}</h2>
        <div className="calendar-controls">
          <button 
            className={`view-btn ${currentView === 'dayGridMonth' ? 'active' : ''}`}
            onClick={() => document.querySelector('.fc-dayGridMonth-button').click()}
          >
            {t('Месец', 'Month')}
          </button>
          <button 
            className={`view-btn ${currentView === 'timeGridWeek' ? 'active' : ''}`}
            onClick={() => document.querySelector('.fc-timeGridWeek-button').click()}
          >
            {t('Седмица', 'Week')}
          </button>
          <button 
            className={`view-btn ${currentView === 'timeGridDay' ? 'active' : ''}`}
            onClick={() => document.querySelector('.fc-timeGridDay-button').click()}
          >
            {t('Ден', 'Day')}
          </button>
          <button 
            className={`view-btn ${currentView === 'listMonth' ? 'active' : ''}`}
            onClick={() => document.querySelector('.fc-listMonth-button').click()}
          >
            {t('Списък', 'List')}
          </button>
          <button 
            className="btn btn-accent"
            onClick={handleAddEvent}
          >
            {t('➕ Добави събитие', '➕ Add Event')}
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={events}
          select={handleDateSelect}
          eventClick={handleEventClick}
          viewDidMount={handleViewChange}
          height="auto"
          contentHeight="auto"
          aspectRatio={1.5}
          locale={t('bg', 'en')}
          buttonText={{
            today: t('Днес', 'Today'),
            month: t('Месец', 'Month'),
            week: t('Седмица', 'Week'),
            day: t('Ден', 'Day'),
            list: t('Списък', 'List')
          }}
          allDayText={t('Цял ден', 'All day')}
          noEventsText={t('Няма събития', 'No events')}
        />
      </div>

      <div className="calendar-sidebar">
        <div className="card">
          <h3>{t('Бързи действия', 'Quick Actions')}</h3>
          <button 
            className="btn btn-primary"
            onClick={handleAddEvent}
          >
            {t('Добави събитие', 'Add Event')}
          </button>
        </div>

        <div className="card">
          <h3>{t('Предстоящи събития', 'Upcoming Events')}</h3>
          <div className="upcoming-events">
            {events.slice(0, 5).map(event => (
              <div key={event.id} className="event-item">
                <div 
                  className="event-color" 
                  style={{ backgroundColor: event.color }}
                ></div>
                <div className="event-info">
                  <div className="event-title">{event.title}</div>
                  <div className="event-date">
                    {new Date(event.start).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{t('Добави събитие', 'Add Event')}</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>{t('Заглавие', 'Title')} *</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={t('Въведете заглавие на събитието', 'Enter event title')}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>{t('Описание', 'Description')}</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder={t('Въведете описание', 'Enter description')}
                  className="form-textarea"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t('Начална дата', 'Start Date')}</label>
                  <input
                    type="datetime-local"
                    value={newEvent.start}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, start: e.target.value }))}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>{t('Крайна дата', 'End Date')}</label>
                  <input
                    type="datetime-local"
                    value={newEvent.end}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, end: e.target.value }))}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newEvent.allDay}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, allDay: e.target.checked }))}
                  />
                  {t('Цял ден', 'All day')}
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                {t('Отказ', 'Cancel')}
              </button>
              <button className="btn btn-primary" onClick={handleSaveEvent}>
                {t('Запази', 'Save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar