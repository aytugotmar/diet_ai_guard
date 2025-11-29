'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
        getDirections: 'Get Directions',
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
        destination: 'Hedef',
        destinationPlaceholder: 'Nereye gitmek istersiniz?',
        startDate: 'Başlangıç Tarihi',
        endDate: 'Bitiş Tarihi',
        budget: 'Bütçe',
        budgetPlaceholder: 'örn: $2000',
        selectVibe: 'Seyahat Tarzınızı Seçin',
        chill: 'Dinlendirici',
        chillDesc: 'Rahat ve huzurlu',
        adventure: 'Macera',
        adventureDesc: 'Heyecan verici',
        foodie: 'Yemek Tutkunu',
        foodieDesc: 'Gastronomi keşfi',
        localSecret: 'Yerel Keşif',
        localSecretDesc: 'Gizli mekanlar',
        generateItinerary: 'Gezi Planımı Oluştur',
        generating: 'Mükemmel yolculuğunuz hazırlanıyor...',
        weatherCheck: 'Yağmurlu Hava Planı',
        backToForm: 'Yeni Gezi Planla',
        day: 'Gün',
        morning: 'Sabah',
        afternoon: 'Öğleden Sonra',
        evening: 'Akşam',
        hiddenGem: 'Gizli Mekan',
        totalBudget: 'Toplam Bütçe',
        travelTips: 'Seyahat İpuçları',
        getDirections: 'Yol Tarifi Al',
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
    const [language, setLanguage] = useState<Language>('tr');

    useEffect(() => {
        // Load language from localStorage on mount
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    const toggleLanguage = () => {
        setLanguage(prev => {
            const newLang = prev === 'en' ? 'tr' : 'en';
            localStorage.setItem('language', newLang);
            return newLang;
        });
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
