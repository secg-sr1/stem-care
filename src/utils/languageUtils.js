// Language detection and translation utilities

export const detectBrowserLanguage = () => {
  // Get browser language
  const browserLang = navigator.language || navigator.languages[0] || 'en';
  
  // Check if Spanish (es) or any Spanish variant (es-ES, es-MX, etc.)
  if (browserLang.startsWith('es')) {
    return 'es';
  }
  
  // Default to English
  return 'en';
};

export const getSupportedLanguages = () => {
  return ['en', 'es'];
};

export const getLanguageFromPath = (pathname) => {
  // Check if URL contains language prefix (e.g., /es/yoamoamibebe-blog)
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (getSupportedLanguages().includes(firstSegment)) {
    return firstSegment;
  }
  
  return null;
};

export const getLocalizedPath = (path, language = 'en') => {
  if (language === 'en') {
    return path;
  }
  
  // Add language prefix for non-English paths
  return `/${language}${path}`;
};
