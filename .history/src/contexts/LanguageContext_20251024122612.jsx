import React, { createContext, useContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [isEnglish, setIsEnglish] = useLocalStorage('language', false)
  
  const toggleLanguage = () => {
    setIsEnglish(prev => !prev)
  }

  const t = (bg, en) => {
    return isEnglish ? en : bg
  }

  const value = {
    isEnglish,
    toggleLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// В LanguageContext.jsx, добави следния код в t функцията или създай нова:
const calendarLocales = {
  bg: {
    buttonText: {
      today: 'Днес',
      month: 'Месец',
      week: 'Седмица',
      day: 'Ден',
      list: 'Списък'
    },
    allDayText: 'Цял ден',
    noEventsText: 'Няма събития'
  },
  en: {
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      list: 'List'
    },
    allDayText: 'All day',
    noEventsText: 'No events'
  }
}

// Актуализирай t функцията или добави нова:
const getCalendarLocale = () => {
  return isEnglish ? calendarLocales.en : calendarLocales.bg
}