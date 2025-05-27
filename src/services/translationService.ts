
// Simple translation service - in a real app, you'd use Google Translate API, DeepL, etc.
// For demo purposes, this will simulate translation
export interface TranslationService {
  translateText(text: string, targetLanguage: string): Promise<string>;
}

class MockTranslationService implements TranslationService {
  private translations: Record<string, Record<string, string>> = {
    Spanish: {
      "Like": "Me gusta",
      "Share": "Compartir", 
      "Save": "Guardar",
      "Read More": "Leer más",
      "Read Less": "Leer menos",
      "min read": "min de lectura",
      "Loading more stories...": "Cargando más historias...",
      "Technology": "Tecnología",
      "Sports": "Deportes",
      "Politics": "Política",
      "Business": "Negocios",
      "Entertainment": "Entretenimiento",
      "Health": "Salud",
      "Science": "Ciencia"
    },
    Hindi: {
      "Like": "पसंद",
      "Share": "साझा करें",
      "Save": "सेव करें", 
      "Read More": "और पढ़ें",
      "Read Less": "कम पढ़ें",
      "min read": "मिनट पढ़ें",
      "Loading more stories...": "और कहानियां लोड हो रही हैं...",
      "Technology": "तकनीक",
      "Sports": "खेल",
      "Politics": "राजनीति", 
      "Business": "व्यापार",
      "Entertainment": "मनोरंजन",
      "Health": "स्वास्थ्य",
      "Science": "विज्ञान"
    },
    German: {
      "Like": "Gefällt mir",
      "Share": "Teilen",
      "Save": "Speichern",
      "Read More": "Mehr lesen", 
      "Read Less": "Weniger lesen",
      "min read": "Min Lesezeit",
      "Loading more stories...": "Weitere Geschichten werden geladen...",
      "Technology": "Technologie",
      "Sports": "Sport",
      "Politics": "Politik",
      "Business": "Geschäft", 
      "Entertainment": "Unterhaltung",
      "Health": "Gesundheit",
      "Science": "Wissenschaft"
    }
  };

  async translateText(text: string, targetLanguage: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (targetLanguage === "English") {
      return text;
    }

    const languageTranslations = this.translations[targetLanguage];
    if (languageTranslations && languageTranslations[text]) {
      return languageTranslations[text];
    }

    // For content that doesn't have predefined translations, 
    // simulate translation by adding a prefix
    if (targetLanguage === "Spanish") {
      return `[ES] ${text}`;
    } else if (targetLanguage === "Hindi") {
      return `[HI] ${text}`;
    } else if (targetLanguage === "German") {
      return `[DE] ${text}`;
    }

    return text;
  }
}

export const translationService = new MockTranslationService();
