'use client';

import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';
import { motion } from 'framer-motion';
import { MapPin, X, Maximize2, Minimize2, Navigation, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MapWrapper = dynamic(() => import('./MapWrapper'), { ssr: false });

export default function ResultsPanel() {
    const {
        language,
        places,
        selectedPlaceIndex,
        setSelectedPlaceIndex,
        error,
        setError,
        isLoading,
        preferences
    } = useAppStore();
    const [mounted, setMounted] = useState(false);
    const [mapFullscreen, setMapFullscreen] = useState(false);
    const [cardsFullscreen, setCardsFullscreen] = useState(false);
    const t = translations[language];

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 h-full flex items-center justify-center shadow-xl border border-gray-200 dark:border-gray-800">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl font-semibold">Yükleniyor...</p>
                </div>
            </div>
        );
    }

    const getTypeColor = (type: 'food' | 'sight' | 'nature') => {
        const colors = {
            food: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
            sight: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
            nature: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
        };
        return colors[type];
    };

    const getTypeIcon = (type: 'food' | 'sight' | 'nature') => {
        const icons = {
            food: '🍽️',
            sight: '🏛️',
            nature: '🌿',
        };
        return icons[type];
    };

    if (isLoading) {
        return (
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 h-full flex items-center justify-center shadow-xl border border-gray-200 dark:border-gray-800">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl font-semibold">{t.generating}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t.generatingNote}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 h-full flex items-center justify-center shadow-xl border border-gray-200 dark:border-gray-800">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t.errorTitle}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={() => setError(null)}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (places.length === 0) {
        return (
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 h-full flex items-center justify-center shadow-xl border border-gray-200 dark:border-gray-800">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t.resultsTitle}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t.noResults}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Map Section - Top */}
            <div className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border-2 border-gray-200 dark:border-gray-700 transition-all ${mapFullscreen ? 'fixed inset-4 z-50 h-auto' : 'h-[420px]'
                }`}>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">🗺️ Harita</h2>
                    <button
                        onClick={() => setMapFullscreen(!mapFullscreen)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        title={mapFullscreen ? 'Normal boyut' : 'Tam ekran'}
                    >
                        {mapFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                    </button>
                </div>
                <div className={mapFullscreen ? 'h-[calc(100%-3rem)]' : 'h-[calc(100%-2.5rem)]'}>
                    <MapWrapper
                        places={places}
                        selectedPlaceIndex={selectedPlaceIndex}
                        onMarkerClick={(index) => {
                            setSelectedPlaceIndex(index);
                            // Don't scroll if map is fullscreen
                            if (!mapFullscreen) {
                                setTimeout(() => {
                                    const element = document.getElementById(`place-${index}`);
                                    if (element) {
                                        element.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'nearest',
                                            inline: 'nearest'
                                        });
                                    }
                                }, 100);
                            }
                        }}
                    />
                </div>
            </div>

            {/* Itinerary Cards - Bottom - Grid Layout */}
            <div className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-4 overflow-y-auto shadow-xl border-2 border-gray-200 dark:border-gray-700 transition-all ${cardsFullscreen ? 'fixed inset-4 z-50 max-h-none' : 'max-h-[340px]'
                }`}>
                <div className="flex items-center justify-between mb-3 sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm pb-2 z-10">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        📍 {t.resultsTitle}
                    </h2>
                    <button
                        onClick={() => setCardsFullscreen(!cardsFullscreen)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        title={cardsFullscreen ? 'Normal boyut' : 'Tam ekran'}
                    >
                        {cardsFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                    </button>
                </div>
                <div className={`grid gap-4 ${cardsFullscreen ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'
                    }`}>
                    {places.map((place, index) => (
                        <motion.div
                            key={index}
                            id={`place-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedPlaceIndex(index)}
                            className={`cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-gray-800 hover:scale-[1.02] transition-all duration-200 shadow-lg border-2 ${selectedPlaceIndex === index
                                ? 'ring-4 ring-blue-500 border-blue-500 shadow-2xl scale-[1.02]'
                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                                }`}
                        >
                            <div className="relative h-32 overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center">
                                <div className="text-6xl opacity-80">
                                    {getTypeIcon(place.type)}
                                </div>
                                <div className="absolute top-2 right-2">
                                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md ${getTypeColor(place.type)}`}>
                                        {getTypeIcon(place.type)} {t.placeTypes[place.type]}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white leading-tight">{place.name}</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                                    {place.description}
                                </p>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        <span className="font-mono">{place.coordinates[0].toFixed(4)}, {place.coordinates[1].toFixed(4)}</span>
                                    </div>
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${place.coordinates[0]},${place.coordinates[1]}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-colors shadow-md hover:shadow-lg"
                                    >
                                        <Navigation className="w-3 h-3" />
                                        Git
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Timeline Section */}
            {places.length > 0 && (
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-purple-500" />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            ⏰ Zaman Planlaması
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {places.map((place, index) => {
                            // Parse user's start time or default to 09:00
                            const userStartTime = preferences.startTime || '09:00';
                            const [startHour, startMinute] = userStartTime.split(':').map(Number);

                            // Calculate start time for this place
                            const minutesFromStart = index === 0 ? 0 : Math.floor(index * 150); // 2.5 hours = 150 minutes
                            const totalMinutes = startHour * 60 + startMinute + minutesFromStart;
                            const placeStartHour = Math.floor(totalMinutes / 60) % 24;
                            const placeStartMinute = totalMinutes % 60;

                            // Calculate duration and end time
                            const duration = place.type === 'food' ? 60 : 120; // 1 hour for food, 2 hours for others
                            const endTotalMinutes = totalMinutes + duration;
                            const placeEndHour = Math.floor(endTotalMinutes / 60) % 24;
                            const placeEndMinute = endTotalMinutes % 60;

                            const startTime = `${placeStartHour.toString().padStart(2, '0')}:${placeStartMinute.toString().padStart(2, '0')}`;
                            const endTime = `${placeEndHour.toString().padStart(2, '0')}:${placeEndMinute.toString().padStart(2, '0')}`;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setSelectedPlaceIndex(index)}
                                    className={`flex items-start gap-4 p-3 rounded-lg cursor-pointer transition-all ${selectedPlaceIndex === index
                                        ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500'
                                        : 'bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent hover:border-blue-300'
                                        }`}
                                >
                                    <div className="flex flex-col items-center min-w-[80px]">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            {startTime}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {endTime}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-2xl">{getTypeIcon(place.type)}</span>
                                            <h3 className="font-bold text-gray-900 dark:text-white">{place.name}</h3>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {place.description}
                                        </p>
                                        <div className="mt-2">
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${getTypeColor(place.type)}`}>
                                                {t.placeTypes[place.type]}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                        <MapPin className="w-3 h-3" />
                                        <span>{index + 1}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}