"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "kn" | "te" | "ta"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations for all supported languages
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    "app.name": "FarmConnect 360",
    "nav.home": "Home",
    "nav.crops": "Crop Recommendation",
    "nav.disease": "Disease Detection",
    "nav.marketplace": "Marketplace",
    "nav.weather": "Weather",
    "nav.fertilizer": "Fertilizer Calculator",
    "nav.dashboard": "Dashboard",
    "nav.loans": "Loan Calculator",
    "nav.documents": "Document Locker",
    "nav.carbon": "Carbon Footprint",
    "nav.sdg": "SDG Goals",

    // Home page
    "home.title": "Empowering Farmers with Technology",
    "home.subtitle": "Your complete farming companion for better yields and sustainable practices",
    "home.get-started": "Get Started",

    // Crop recommendation
    "crops.title": "Crop Recommendation System",
    "crops.subtitle": "Get personalized crop recommendations based on your land and conditions",
    "crops.soil-type": "Soil Type",
    "crops.region": "Geographical Region",
    "crops.weather": "Weather Forecast",
    "crops.submit": "Get Recommendations",

    // More translations would be added here
  },
  kn: {
    // Kannada translations
    "app.name": "ಫಾರ್ಮ್‌ಕನೆಕ್ಟ್ 360",
    "nav.home": "ಮುಖಪುಟ",
    "nav.crops": "ಬೆಳೆ ಶಿಫಾರಸು",
    "nav.disease": "ರೋಗ ಪತ್ತೆ",
    "nav.marketplace": "ಮಾರುಕಟ್ಟೆ",
    "nav.weather": "ಹವಾಮಾನ",
    "nav.fertilizer": "ರಸಗೊಬ್ಬರ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
    "nav.dashboard": "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    "nav.loans": "ಸಾಲ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
    "nav.documents": "ದಾಖಲೆ ಲಾಕರ್",
    "nav.carbon": "ಕಾರ್ಬನ್ ಹೆಜ್ಜೆಗುರುತು",
    "nav.sdg": "SDG ಗುರಿಗಳು",

    // Home page
    "home.title": "ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು",
    "home.subtitle": "ಉತ್ತಮ ಇಳುವರಿ ಮತ್ತು ಸುಸ್ಥಿರ ಅಭ್ಯಾಸಗಳಿಗಾಗಿ ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಕೃಷಿ ಸಂಗಾತಿ",
    "home.get-started": "ಪ್ರಾರಂಭಿಸಿ",

    // More translations would be added here
  },
  te: {
    // Telugu translations
    "app.name": "ఫార్మ్‌కనెక్ట్ 360",
    "nav.home": "హోమ్",
    "nav.crops": "పంట సిఫార్సు",
    "nav.disease": "వ్యాధి గుర్తింపు",
    "nav.marketplace": "మార్కెట్‌ప్లేస్",
    "nav.weather": "వాతావరణం",
    "nav.fertilizer": "ఎరువుల కాలిక్యులేటర్",
    "nav.dashboard": "డాష్‌బోర్డ్",
    "nav.loans": "రుణ కాలిక్యులేటర్",
    "nav.documents": "డాక్యుమెంట్ లాకర్",
    "nav.carbon": "కార్బన్ ఫుట్‌ప్రింట్",
    "nav.sdg": "SDG లక్ష్యాలు",

    // More translations would be added here
  },
  ta: {
    // Tamil translations
    "app.name": "பார்ம்கனெக்ட் 360",
    "nav.home": "முகப்பு",
    "nav.crops": "பயிர் பரிந்துரை",
    "nav.disease": "நோய் கண்டறிதல்",
    "nav.marketplace": "சந்தை",
    "nav.weather": "வானிலை",
    "nav.fertilizer": "உர கால்குலேட்டர்",
    "nav.dashboard": "டாஷ்போர்டு",
    "nav.loans": "கடன் கால்குலேட்டர்",
    "nav.documents": "ஆவண லாக்கர்",
    "nav.carbon": "கார்பன் தடம்",
    "nav.sdg": "SDG இலக்குகள்",

    // More translations would be added here
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "kn", "te", "ta"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
