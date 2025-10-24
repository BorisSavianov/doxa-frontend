import React, { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import Modal from '../components/UI/Modal'
import EventForm from '../components/Forms/EventForm'
import './Calendar.css'

const Calendar = () => {
  const { t } = useLanguage()
  const [CalendarComponent, setCalendarComponent] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const calendarRef = useRef()

  // Динамично зареждане на FullCalendar
  useEffect(() => {
    const loadFullCalendar = async () => {
      try {
        // Импортваме всички необходими модули
        const [
          { default: FullCalendar },
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin
        ] = await Promise.all([
          import('@fullcalendar/react'),
          import('@fullcalendar/daygrid'),
          import('@fullcalendar/timegrid'),
          import('@fullcalendar/interaction'),
          import('@fullcalendar/list')
        ])

        setCalendarComponent(() => (props) => (
          <FullCalendar
            {...props}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          />
        ))
        setIsLoaded(true)
      } catch (error) {
        console.error('Грешка при зареждане на FullCalendar:', error)
        setIsLoaded(true) // Все пак маркираме като заредено, за да покажем грешка
      }
    }

    loadFullCalendar()
  }, [])

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
    }
  ])

  const handleDateSelect = (selectInfo) => {
    setSelectedDate({
      start: selectInfo.start,
      end: selectInfo.end,
      allDay: selectInfo.allDay
    })
    setIsModalOpen(true)
  }

  const handleEventClick = (clickInfo) => {
    if (confirm(`${t('Изтриване на събитие', 'Delete event')} '${clickInfo.event.title}'?`)) {
      setEvents(prev => prev.filter(event => event.id !== clickInfo.event.id))
      clickInfo.event.remove()
    }
  }

  const handleAddEvent = () => {
    const now = new Date()
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000)
    
    setSelectedDate({
      start: now,
      end: oneHourLater,
      allDay: false
    })
    setIsModalOpen(true)
  }

  const handleFormSubmit = (formData) => {
    const newEvent = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      start: formData.start,
      end: formData.end,
      allDay: formData.allDay,
      color: formData.color,
      extendedProps: {
        description: formData.description
      }
    }

    setEvents(prev => [...prev, newEvent])
    setIsModalOpen(false)
    setSelectedDate(null)
  }

  const handleFormCancel = () => {
    setIsModalOpen(false)
    setSelectedDate(null)
  }

  if (!isLoaded) {
    return (
      <div className="calendar-page">
        <div className="calendar-loading">
          <h2>{t('Календар', 'Calendar')}</h2>
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>{t('Зареждане на календара...', 'Loading calendar...')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h2>{t('Календар', 'Calendar')}</h2>
        <div className="calendar-controls">
          <button 
            className="btn btn-primary"
            onClick={handleAddEvent}
          >
            <span style={{ marginRight: '8px' }}>+</span>
            {t('Добави събитие', 'Add Event')}
          </button>
        </div>
      </div>

      <div className="calendar-container" ref={calendarRef}>
        {CalendarComponent && (
          <CalendarComponent
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
            height="auto"
            contentHeight="auto"
            aspectRatio={1.5}
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
        )}
      </div>

      <div className="calendar-sidebar">
        <div className="card">
          <h3>{t('Предстоящи събития', 'Upcoming Events')}</h3>
          <div className="upcoming-events">
            {events
              .filter(event => new Date(event.start) >= new Date())
              .sort((a, b) => new Date(a.start) - new Date(b.start))
              .slice(0, 5)
              .map(event => (
                <div key={event.id} className="event-item">
                  <div 
                    className="event-color" 
                    style={{ backgroundColor: event.color }}
                  ></div>
                  <div className="event-info">
                    <div className="event-title">{event.title}</div>
                    <div className="event-date">
                      {new Date(event.start).toLocaleDateString()} 
                      {!event.allDay && event.start.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleFormCancel}
        title={t('Добави ново събитие', 'Add New Event')}
      >
        <EventForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          initialData={selectedDate ? {
            startDate: selectedDate.start.toISOString().split('T')[0],
            endDate: selectedDate.end.toISOString().split('T')[0],
            startTime: selectedDate.start.toTimeString().slice(0, 5),
            endTime: selectedDate.end.toTimeString().slice(0, 5),
            allDay: selectedDate.allDay
          } : {
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            startTime: '09:00',
            endTime: '10:00',
            allDay: false
          }}
        />
      </Modal>
    </div>
  )
}

export default Calendar