
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translationService } from '@/services/translationService';

interface TranslationContextType {
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
  translateText: (text: string) => Promise<string>;
  isTranslating: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [isTranslating, setIsTranslating] = useState(false);

  const translateText = async (text: string): Promise<string> => {
    if (currentLanguage === 'English') {
      return text;
    }
    
    setIsTranslating(true);
    try {
      const translated = await translationService.translateText(text, currentLanguage);
      return translated;
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <TranslationContext.Provider value={{
      currentLanguage,
      setCurrentLanguage,
      translateText,
      isTranslating
    }}>
      {children}
    </TranslationContext.Provider>
  );
};
