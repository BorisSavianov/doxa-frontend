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

  // Примерни събития
  const [events, setEvents] = useState([
    {
      id: '1',
      title: t('Среща с екипа', 'Team Meeting'),
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 2)),
      color: '#165895'
    },
    {
      id: '2',
      title: t('Презентация', 'Presentation'),
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(new Date().setDate(new Date().getDate() + 1)),
      color: '#5FACE6'
    },
    {
      id: '3',
      title: t('Обедна почивка', 'Lunch Break'),
      start: new Date(new Date().setDate(new Date().getDate() + 2)),
      end: new Date(new Date().setDate(new Date().getDate() + 2)),
      color: '#FFD700'
    }
  ])

  const handleDateSelect = (selectInfo) => {
    const title = prompt(t('Въведете заглавие на събитието:', 'Enter event title:'))
    const calendarApi = selectInfo.view.calendar

    calendarApi.unselect()

    if (title) {
      calendarApi.addEvent({
        id: Date.now().toString(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        color: '#165895'
      })
    }
  }

  const handleEventClick = (clickInfo) => {
    if (confirm(`${t('Изтриване на събитие', 'Delete event')} '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove()
    }
  }

  const handleViewChange = (viewInfo) => {
    setCurrentView(viewInfo.view.type)
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
            onClick={() => {
              const title = prompt(t('Заглавие на събитието:', 'Event title:'))
              if (title) {
                setEvents(prev => [...prev, {
                  id: Date.now().toString(),
                  title,
                  start: new Date(),
                  end: new Date(new Date().setHours(new Date().getHours() + 1)),
                  color: '#165895'
                }])
              }
            }}
          >
            {t('Добави събитие', 'Add Event')}
          </button>
        </div>

        <div className="card">
          <h3>{t('Предстоящи събития', 'Upcoming Events')}</h3>
          <div className="upcoming-events">
            {events.slice(0, 3).map(event => (
              <div key={event.id} className="event-item">
                <div 
                  className="event-color" 
                  style={{ backgroundColor: event.color }}
                ></div>
                <div className="event-info">
                  <div className="event-title">{event.title}</div>
                  <div className="event-date">
                    {event.start.toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar