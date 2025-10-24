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