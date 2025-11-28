'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun, Globe } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';
import { useEffect, useState } from 'react';

export default function Header() {
    const { theme, setTheme } = useTheme();
    const { language, setLanguage } = useAppStore();
    const [mounted, setMounted] = useState(false);
    const t = translations[language];

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                            T
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                {t.title}
                            </h1>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{t.subtitle}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        {/* Language Toggle */}
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
                            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-2 border-gray-300 dark:border-gray-600 shadow-sm text-gray-900 dark:text-gray-100"
                            aria-label="Toggle language"
                        >
                            <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{language.toUpperCase()}</span>
                        </button>
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-2 border-gray-300 dark:border-gray-600 shadow-sm"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-yellow-500" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
