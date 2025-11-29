'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string | string[];
}

const translations = {
    en: {
        appTitle: 'TravelGenie AI',
        tagline: 'Your AI-Powered Travel Companion',
        destination: 'Destination',
        destinationPlaceholder: 'Where do you want to go?',
        startDate: 'Start Date',
        endDate: 'End Date',
        budget: 'Budget',
        budgetPlaceholder: 'e.g., $2000',
        selectVibe: 'Select Your Vibe',
        chill: 'Chill',
        chillDesc: 'Relaxed & peaceful',
        adventure: 'Adventure',
        adventureDesc: 'Thrilling & exciting',
        foodie: 'Foodie',
        foodieDesc: 'Culinary exploration',
        localSecret: 'Local Secret',
        localSecretDesc: 'Hidden gems',
        generateItinerary: 'Generate My Itinerary',
        generating: 'Creating your perfect journey...',
        weatherCheck: 'Weather Check (Rainy Day)',
        backToForm: 'Plan Another Trip',
        day: 'Day',
        morning: 'Morning',
        afternoon: 'Afternoon',
        evening: 'Evening',
        hiddenGem: 'Hidden Gem',
        totalBudget: 'Total Budget',
        travelTips: 'Travel Tips',
        loadingFacts: [
            'Did you know? The word "travel" comes from the French word "travail" meaning work.',
            'Fun Fact: There are more possible iterations of a game of chess than atoms in the known universe!',
            'Travel Tip: The best time to book flights is typically 6-8 weeks before departure.',
            'Interesting: Japan has more than 6,800 islands!',
            'Amazing: The Great Wall of China is not visible from space with the naked eye.',
        ],
    },
    tr: {
        appTitle: 'TravelGenie AI',
        tagline: 'Yapay Zeka Destekli Seyahat Arkadaşınız',
        destination: 'Destinasyon',
        destinationPlaceholder: 'Nereye gitmek istiyorsun?',
        startDate: 'Başlangıç Tarihi',
        endDate: 'Bitiş Tarihi',
        budget: 'Bütçe',
        budgetPlaceholder: 'örn: $2000',
        selectVibe: 'Ruh Halini Seç',
        chill: 'Sakin',
        chillDesc: 'Rahat ve huzurlu',
        adventure: 'Macera',
        adventureDesc: 'Heyecan verici',
        foodie: 'Gurme',
        foodieDesc: 'Lezzet keşfi',
        localSecret: 'Yerel Sırlar',
        localSecretDesc: 'Gizli hazineler',
        generateItinerary: 'Planımı Oluştur',
        generating: 'Mükemmel yolculuğunuz hazırlanıyor...',
        weatherCheck: 'Hava Kontrolü (Yağmurlu Gün)',
        backToForm: 'Yeni Seyahat Planla',
        day: 'Gün',
        morning: 'Sabah',
        afternoon: 'Öğleden Sonra',
        evening: 'Akşam',
        hiddenGem: 'Gizli Hazine',
        totalBudget: 'Toplam Bütçe',
        travelTips: 'Seyahat İpuçları',
        loadingFacts: [
            'Biliyor muydunuz? "Travel" kelimesi Fransızca "travail" (iş) kelimesinden gelir.',
            'İlginç Bilgi: Bir satranç oyununun olası varyasyonları bilinen evrendeki atomlardan fazladır!',
            'Seyahat İpucu: Uçak bileti almak için en iyi zaman genellikle kalkıştan 6-8 hafta öncesidir.',
            'İlginç: Japonya\'nın 6,800\'den fazla adası var!',
            'Şaşırtıcı: Çin Seddi uzaydan çıplak gözle görülemez.',
        ],
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'tr' : 'en');
    };

    const t = (key: string): string | string[] => {
        const value = translations[language][key as keyof typeof translations.en];
        return value !== undefined ? value : key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
}
