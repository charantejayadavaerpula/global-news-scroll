
import { useState, useEffect } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';

export const useTranslatedText = (originalText: string) => {
  const { currentLanguage, translateText } = useTranslation();
  const [translatedText, setTranslatedText] = useState(originalText);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const performTranslation = async () => {
      if (currentLanguage === 'English') {
        setTranslatedText(originalText);
        return;
      }

      setIsLoading(true);
      try {
        const translated = await translateText(originalText);
        setTranslatedText(translated);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslatedText(originalText);
      } finally {
        setIsLoading(false);
      }
    };

    performTranslation();
  }, [originalText, currentLanguage, translateText]);

  return { translatedText, isLoading };
};
