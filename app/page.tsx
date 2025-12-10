'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { dietaryRestrictions } from '@/types';

export default function Home() {
    const router = useRouter();
    const { t, language, setLanguage, theme, setTheme } = useApp();
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [mounted, setMounted] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('dietaryRestrictions');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setSelected(new Set(parsed));
            } catch (e) {
                console.error('Failed to parse saved restrictions', e);
            }
        }
    }, []);

    const toggleRestriction = (id: string) => {
        setSelected((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            localStorage.setItem('dietaryRestrictions', JSON.stringify([...newSet]));
            return newSet;
        });
    };

    const handleStartCamera = () => {
        if (selected.size === 0) {
            alert(t('selectAtLeastOne'));
            return;
        }
        router.push('/camera');
    };

    const categories = [
        { id: 'all', icon: '🎯', label: language === 'tr' ? 'Tümü' : 'All' },
        { id: 'allergies', icon: '⚠️', label: t('allergies') },
        { id: 'dietary', icon: '🥗', label: t('dietary') },
        { id: 'health', icon: '💪', label: t('health') },
        { id: 'religious', icon: '🕌', label: t('religious') },
    ];

    const filteredRestrictions = activeCategory === 'all'
        ? dietaryRestrictions
        : dietaryRestrictions.filter(r => r.category === activeCategory);

    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Header */}
            <header className="glass-card m-4 p-4 animate-fade-in">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-4xl">🛡️</div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent dark:from-green-400 dark:to-blue-400">
                                {t('appTitle')}
                            </h1>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{t('appSubtitle')}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-95"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>

                {/* Settings Dropdown */}
                {showSettings && (
                    <div className="mt-4 p-4 glass rounded-xl animate-slide-up space-y-3">
                        {/* Theme Toggle */}
                        <div>
                            <label className="text-sm font-medium block mb-2">{t('theme')}</label>
                            <div className="flex gap-2">
                                {(['light', 'dark', 'system'] as const).map((themeVal) => (
                                    <button
                                        key={themeVal}
                                        onClick={() => setTheme(themeVal)}
                                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${theme === themeVal
                                            ? 'bg-green-500 text-white shadow-md'
                                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        {themeVal === 'light' ? '☀️ ' + t('lightMode') :
                                            themeVal === 'dark' ? '🌙 ' + t('darkMode') :
                                                '💻 ' + t('systemMode')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Language Toggle */}
                        <div>
                            <label className="text-sm font-medium block mb-2">{t('language')}</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setLanguage('tr')}
                                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${language === 'tr'
                                        ? 'bg-green-500 text-white shadow-md'
                                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    🇹🇷 Türkçe
                                </button>
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${language === 'en'
                                        ? 'bg-green-500 text-white shadow-md'
                                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    🇬🇧 English
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <main className="px-4 pb-24">
                {/* Category Filter */}
                <div className="mb-6 animate-slide-up">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {categories.map((cat, idx) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                style={{ animationDelay: `${idx * 50}ms` }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all animate-scale-in ${activeCategory === cat.id
                                    ? 'bg-green-500 text-white shadow-lg scale-105'
                                    : 'glass hover:scale-105'
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                <span className="text-sm font-medium">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Restrictions Grid */}
                <div className="glass-card p-6 mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <h2 className="text-lg font-bold mb-4">{t('selectRestrictions')}</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {filteredRestrictions.map((restriction, idx) => (
                            <button
                                key={restriction.id}
                                onClick={() => toggleRestriction(restriction.id)}
                                style={{ animationDelay: `${idx * 30}ms` }}
                                className={`p-4 rounded-xl border-2 transition-all duration-300 animate-scale-in ${selected.has(restriction.id)
                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg scale-105'
                                    : 'border-gray-200 dark:border-gray-700 glass hover:scale-102 hover:border-green-400'
                                    }`}
                            >
                                <div className="text-3xl mb-2">{restriction.icon}</div>
                                <div className={`text-sm font-medium ${selected.has(restriction.id) ? 'text-green-700 dark:text-green-400' : ''
                                    }`}>
                                    {t(restriction.id as any)}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Selected Count */}
                {selected.size > 0 && (
                    <div className="text-center mb-4 animate-fade-in">
                        <div className="inline-block glass-card px-4 py-2">
                            <span className="text-green-600 dark:text-green-400 font-bold text-lg">{selected.size}</span>
                            <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">{t('selectedCount')}</span>
                        </div>
                    </div>
                )}
            </main>

            {/* Floating Action Button */}
            <div className="fixed bottom-6 left-0 right-0 px-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <button
                    onClick={handleStartCamera}
                    disabled={selected.size === 0}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl ${selected.size === 0
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-green-500/50 active:scale-95 hover:scale-105'
                        }`}
                >
                    <span className="flex items-center justify-center gap-2">
                        <span className="text-2xl">📸</span>
                        <span>{t('takePhoto')}</span>
                    </span>
                </button>
            </div>
        </div>
    );
}
