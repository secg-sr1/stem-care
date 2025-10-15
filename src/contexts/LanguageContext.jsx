import React, { createContext, useState, useEffect } from 'react';
import { detectBrowserLanguage } from '../utils/languageUtils';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Detect browser language on first load
    const detectedLang = detectBrowserLanguage();
    setLanguage(detectedLang);
    
    // Store in localStorage for persistence
    localStorage.setItem('preferred-language', detectedLang);
  }, []);

  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('preferred-language', newLang);
  };

  const getLocalizedText = (textObject, fallback = '') => {
    if (typeof textObject === 'string') {
      return textObject; // If it's already a string, return as is
    }
    
    if (typeof textObject === 'object' && textObject !== null) {
      // Try current language first, then English, then fallback
      return textObject[language] || textObject['en'] || fallback || '';
    }
    
    // Handle null, undefined, or other types
    return fallback || '';
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    getLocalizedText
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
