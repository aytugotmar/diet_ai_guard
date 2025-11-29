'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Sparkles, Lightbulb } from 'lucide-react';
import type { Itinerary } from '@/types/itinerary';
import { useLanguage } from '@/contexts/LanguageContext';

interface ItineraryDisplayProps {
    itinerary: Itinerary;
}

export default function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
    const { t } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'breakfast':
            case 'lunch':
            case 'dinner':
                return '🍽️';
            case 'activity':
                return '🎯';
            case 'hidden-gem':
                return '💎';
            case 'transport':
                return '🚗';
            default:
                return '📍';
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-6xl mx-auto px-4 py-8"
        >
            {/* Header Section */}
            <motion.div
                variants={itemVariants}
                className="mb-12 text-center"
            >
                <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/30">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {itinerary.destination}
                    </span>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{itinerary.startDate} - {itinerary.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{t('totalBudget')}: {itinerary.totalBudget}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span>{itinerary.hiddenGems} {t('hiddenGem')}s</span>
                    </div>
                </div>
            </motion.div>

            {/* Days Itinerary */}
            <div className="space-y-8">
                {itinerary.days.map((day, dayIndex) => (
                    <motion.div
                        key={day.day}
                        variants={itemVariants}
                        className="relative"
                    >
                        {/* Day Header - Glassmorphism */}
                        <div className="sticky top-20 z-10 mb-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl p-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        {t('day')} {day.day}
                                    </h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">{day.theme}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{day.date}</p>
                                </div>
                                <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Est. Cost</p>
                                    <p className="text-xl font-bold text-primary">{day.totalEstimatedCost}</p>
                                </div>
                            </div>
                        </div>

                        {/* Time Blocks */}
                        <div className="space-y-6 ml-4 md:ml-8">
                            {/* Morning */}
                            {day.activities.morning.length > 0 && (
                                <TimeBlock
                                    title={t('morning') as string}
                                    activities={day.activities.morning}
                                    icon="🌅"
                                    getActivityIcon={getActivityIcon}
                                />
                            )}              {/* Afternoon */}
                            {day.activities.afternoon.length > 0 && (
                                <TimeBlock
                                    title={t('afternoon') as string}
                                    activities={day.activities.afternoon}
                                    icon="☀️"
                                    getActivityIcon={getActivityIcon}
                                />
                            )}                            {/* Evening */}
                            {day.activities.evening.length > 0 && (
                                <TimeBlock
                                    title={t('evening') as string}
                                    activities={day.activities.evening}
                                    icon="🌙"
                                    getActivityIcon={getActivityIcon}
                                />
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Travel Tips Section */}
            {itinerary.travelTips && itinerary.travelTips.length > 0 && (
                <motion.div
                    variants={itemVariants}
                    className="mt-12 backdrop-blur-xl bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 p-6 md:p-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Lightbulb className="w-6 h-6 text-primary" />
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('travelTips')}</h3>
                    </div>
                    <ul className="space-y-2">
                        {itinerary.travelTips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                <span className="text-primary mt-1">•</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </motion.div>
    );
}

// TimeBlock Component
function TimeBlock({
    title,
    activities,
    icon,
    getActivityIcon,
}: {
    title: string;
    activities: any[];
    icon: string;
    getActivityIcon: (type: string) => string;
}) {
    const { t } = useLanguage();

    return (
        <div>
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{icon}</span>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
            </div>

            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.02, x: 8 }}
                        className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors"
                    >
                        {/* Timeline dot */}
                        <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-gray-900" />

                        {/* Activity Card - Glassmorphism */}
                        <div className="backdrop-blur-lg bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-5 hover:shadow-xl transition-all">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex items-start gap-3 flex-1">
                                    <span className="text-2xl mt-1">{getActivityIcon(activity.type)}</span>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                                {activity.title}
                                            </h4>
                                            {activity.hiddenGem && (
                                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg animate-pulse-slow">
                                                    💎 {t('hiddenGem') as string}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                            {activity.description}
                                        </p>
                                        <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{activity.time}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{activity.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="w-4 h-4" />
                                                <span>{activity.estimatedCost}</span>
                                            </div>
                                        </div>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                                        >
                                            <MapPin className="w-3.5 h-3.5" />
                                            {t('getDirections') as string}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
