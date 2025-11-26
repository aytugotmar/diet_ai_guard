'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, TranslationKey } from '@/lib/translations';

type Theme = 'light' | 'dark' | 'system';

interface AppContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKey) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('system');
    const [language, setLanguageState] = useState<Language>('tr');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Load saved preferences
        const savedTheme = localStorage.getItem('theme') as Theme;
        const savedLanguage = localStorage.getItem('language') as Language;

        if (savedTheme) setThemeState(savedTheme);
        if (savedLanguage) setLanguageState(savedLanguage);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
    }, [theme, mounted]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const setLanguage = (newLanguage: Language) => {
        setLanguageState(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    const t = (key: TranslationKey): string => {
        return translations[language][key] || key;
    };

    if (!mounted) {
        return null;
    }

    return (
        <AppContext.Provider value={{ theme, setTheme, language, setLanguage, t }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
}
