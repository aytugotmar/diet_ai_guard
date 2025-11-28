'use client';

import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';
import { MapPin, Clock, Utensils, Heart, Gauge, Sparkles } from 'lucide-react';
import { generateItineraryAction } from '@/app/actions';
import { useEffect, useState } from 'react';

export default function InputForm() {
    const {
        language,
        preferences,
        updatePreferences,
        setPlaces,
        setIsLoading,
        setError,
        isLoading
    } = useAppStore();
    const [mounted, setMounted] = useState(false);
    const t = translations[language];

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-4 space-y-4 shadow-xl border border-gray-200 dark:border-gray-800 h-[400px] animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="space-y-4">
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!preferences.location.trim()) {
            setError(t.errorLocationRequired);
            return;
        }

        setIsLoading(true);
        setError(null);

        const result = await generateItineraryAction({ ...preferences, language });

        if (result.success && result.places) {
            setPlaces(result.places);
        } else {
            setError(result.error || t.errorGeneric);
        }

        setIsLoading(false);
    };

    const toggleArrayValue = <T extends string>(
        array: T[],
        value: T,
        key: 'foodPreferences' | 'interests'
    ) => {
        const newArray = array.includes(value)
            ? array.filter(item => item !== value)
            : [...array, value];
        updatePreferences({ [key]: newArray });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-4 space-y-4 shadow-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.formTitle}</h2>
                </div>

                {/* Location */}
                <div>
                    <label className="flex items-center space-x-2 text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        <MapPin className="w-4 h-4" />
                        <span>{t.location}</span>
                    </label>
                    <input
                        type="text"
                        value={preferences.location}
                        onChange={(e) => updatePreferences({ location: e.target.value })}
                        placeholder={t.locationPlaceholder}
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    />
                </div>

                {/* Duration */}
                <div>
                    <label className="flex items-center space-x-2 text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        <Clock className="w-4 h-4" />
                        <span>{t.duration}</span>
                    </label>
                    <select
                        value={preferences.duration}
                        onChange={(e) => updatePreferences({ duration: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm text-gray-900 dark:text-gray-100 font-medium"
                    >
                        {Object.entries(t.durationOptions).map(([key, label]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Food Preferences */}
                <div>
                    <label className="flex items-center space-x-2 text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        <Utensils className="w-4 h-4" />
                        <span>{t.foodPreferences}</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.entries(t.foodOptions).map(([key, label]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => toggleArrayValue(preferences.foodPreferences, key as any, 'foodPreferences')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${preferences.foodPreferences.includes(key as any)
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Interests */}
                <div>
                    <label className="flex items-center space-x-2 text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        <Heart className="w-4 h-4" />
                        <span>{t.interests}</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.entries(t.interestOptions).map(([key, label]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => toggleArrayValue(preferences.interests, key as any, 'interests')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${preferences.interests.includes(key as any)
                                    ? 'bg-purple-500 text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pace */}
                <div>
                    <label className="flex items-center space-x-2 text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        <Gauge className="w-4 h-4" />
                        <span>{t.pace}</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {Object.entries(t.paceOptions).map(([key, label]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => updatePreferences({ pace: key as any })}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${preferences.pace === key
                                    ? 'bg-green-500 text-white shadow-lg'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Start Time */}
                <div>
                    <label className="flex items-center space-x-2 text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        <Clock className="w-4 h-4" />
                        <span>{t.startTime}</span>
                    </label>
                    <input
                        type="time"
                        value={preferences.startTime || '09:00'}
                        onChange={(e) => updatePreferences({ startTime: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm text-gray-900 dark:text-gray-100"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-base hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    {isLoading ? t.generating : t.generate}
                </button>
            </div>
        </form>
    );
}
