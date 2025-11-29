'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, MapPin, Calendar, DollarSign, Sparkles, Sun, Moon, Languages, CloudRain, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import ItineraryDisplay from '@/components/ItineraryDisplay';
import type { Itinerary, Vibe } from '@/types/itinerary';

export default function Home() {
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage, t } = useLanguage();

    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        budget: '',
        vibe: 'chill' as Vibe,
    });

    const [loading, setLoading] = useState(false);
    const [itinerary, setItinerary] = useState<Itinerary | null>(null);

    // Load saved form data from localStorage
    React.useEffect(() => {
        const savedFormData = localStorage.getItem('travelFormData');
        if (savedFormData) {
            try {
                const parsed = JSON.parse(savedFormData);
                setFormData(parsed);
            } catch (e) {
                console.error('Failed to parse saved form data');
            }
        }
    }, []);

    // Save form data to localStorage whenever it changes
    React.useEffect(() => {
        if (formData.destination || formData.budget) {
            localStorage.setItem('travelFormData', JSON.stringify(formData));
        }
    }, [formData]);
    const [loadingFactIndex, setLoadingFactIndex] = useState(0);

    const vibes: { value: Vibe; emoji: string; labelKey: string; descKey: string }[] = [
        { value: 'chill', emoji: '🧘', labelKey: 'chill', descKey: 'chillDesc' },
        { value: 'adventure', emoji: '🏔️', labelKey: 'adventure', descKey: 'adventureDesc' },
        { value: 'foodie', emoji: '🍜', labelKey: 'foodie', descKey: 'foodieDesc' },
        { value: 'local-secret', emoji: '🗺️', labelKey: 'localSecret', descKey: 'localSecretDesc' },
    ];

    const handleSubmit = async (e: React.FormEvent, weatherAdjustment = false) => {
        e.preventDefault();
        setLoading(true);
        setLoadingFactIndex(0);

        // Rotate loading facts
        const factInterval = setInterval(() => {
            setLoadingFactIndex((prev) => (prev + 1) % 5);
        }, 3000);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    language,
                    weatherAdjustment,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate itinerary');
            }

            const data: Itinerary = await response.json();
            setItinerary(data);
        } catch (error) {
            console.error('Error generating itinerary:', error);
            alert('Failed to generate itinerary. Please try again.');
        } finally {
            clearInterval(factInterval);
            setLoading(false);
        }
    };

    const handleWeatherCheck = (e: React.FormEvent) => {
        handleSubmit(e, true);
    };

    const handleBackToForm = () => {
        setItinerary(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3"
                        >
                            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg">
                                <Plane className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    {t('appTitle')}
                                </h1>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{t('tagline')}</p>
                            </div>
                        </motion.div>

                        {/* Controls */}
                        <div className="flex items-center gap-2">
                            {/* Language Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleLanguage}
                                className="p-3 rounded-xl backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all"
                                title="Toggle Language"
                            >
                                <div className="flex items-center gap-2">
                                    <Languages className="w-5 h-5" />
                                    <span className="text-sm font-semibold">{language.toUpperCase()}</span>
                                </div>
                            </motion.button>

                            {/* Theme Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleTheme}
                                className="p-3 rounded-xl backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all"
                                title="Toggle Theme"
                            >
                                {theme === 'light' ? (
                                    <Moon className="w-5 h-5 text-gray-700" />
                                ) : (
                                    <Sun className="w-5 h-5 text-yellow-400" />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                    {loading ? (
                        // Loading State
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center min-h-[60vh]"
                        >
                            <motion.div
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                className="w-20 h-20 mb-8 rounded-full bg-gradient-to-br from-primary to-secondary p-4 shadow-2xl"
                            >
                                <Plane className="w-full h-full text-white" />
                            </motion.div>

                            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                                {t('generating')}
                            </h2>

                            <motion.div
                                key={loadingFactIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="max-w-md text-center px-6 py-4 rounded-xl backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50"
                            >
                                <p className="text-gray-600 dark:text-gray-300">
                                    {(t('loadingFacts') as string[])[loadingFactIndex]}
                                </p>
                            </motion.div>
                        </motion.div>
                    ) : itinerary ? (
                        // Itinerary Display
                        <motion.div
                            key="itinerary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 mb-8 justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleBackToForm}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    {t('backToForm')}
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleWeatherCheck}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    <CloudRain className="w-5 h-5" />
                                    {t('weatherCheck')}
                                </motion.button>
                            </div>

                            <ItineraryDisplay itinerary={itinerary} />
                        </motion.div>
                    ) : (
                        // Input Form
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-2xl mx-auto"
                        >
                            {/* Hero Section */}
                            <div className="text-center mb-12">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                    className="inline-block mb-6"
                                >
                                    <Sparkles className="w-16 h-16 text-primary" />
                                </motion.div>
                                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                                    {t('appTitle')}
                                </h2>
                                <p className="text-xl text-gray-600 dark:text-gray-300">
                                    {t('tagline')}
                                </p>
                            </div>

                            {/* Form */}
                            <motion.form
                                onSubmit={handleSubmit}
                                className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-8 space-y-6"
                            >
                                {/* Destination */}
                                <div>
                                    <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        {t('destination')}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                        placeholder={t('destinationPlaceholder') as string}
                                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                            <Calendar className="w-4 h-4 text-primary" />
                                            {t('startDate')}
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                            <Calendar className="w-4 h-4 text-primary" />
                                            {t('endDate')}
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Budget */}
                                <div>
                                    <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        <DollarSign className="w-4 h-4 text-primary" />
                                        {t('budget')}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        placeholder={t('budgetPlaceholder') as string}
                                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                {/* Vibe Selection */}
                                <div>
                                    <label className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        <Sparkles className="w-4 h-4 text-primary" />
                                        {t('selectVibe')}
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {vibes.map((vibe) => (
                                            <motion.button
                                                key={vibe.value}
                                                type="button"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setFormData({ ...formData, vibe: vibe.value })}
                                                className={`p-4 rounded-xl border-2 transition-all ${formData.vibe === vibe.value
                                                    ? 'border-primary bg-gradient-to-br from-primary/20 to-secondary/20 shadow-lg'
                                                    : 'border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-900/50 hover:border-primary/50'
                                                    }`}
                                            >
                                                <div className="text-3xl mb-2">{vibe.emoji}</div>
                                                <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                                    {t(vibe.labelKey)}
                                                </div>
                                                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                    {t(vibe.descKey)}
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                                >
                                    <Sparkles className="w-6 h-6" />
                                    {t('generateItinerary')}
                                </motion.button>
                            </motion.form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
