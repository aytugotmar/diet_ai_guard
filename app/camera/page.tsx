'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { resizeImage } from '@/lib/imageUtils';
import { AnalysisResponse, AnalysisResult } from '@/types';
import { useApp } from '@/contexts/AppContext';

export default function CameraPage() {
    const router = useRouter();
    const { t } = useApp();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [restrictions, setRestrictions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('dietaryRestrictions');
        if (!saved) {
            router.push('/');
            return;
        }
        try {
            const parsed = JSON.parse(saved);
            setRestrictions(parsed);
        } catch (e) {
            console.error('Failed to parse restrictions', e);
            router.push('/');
        }
    }, [router]);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const base64Image = await resizeImage(file);

            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: base64Image,
                    restrictions,
                }),
            });

            const data: AnalysisResponse = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Analysis failed');
            }

            if (data.result) {
                setResult(data.result);
                // Save to history
                const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
                history.unshift({
                    id: Date.now().toString(),
                    timestamp: Date.now(),
                    result: data.result,
                    restrictions,
                });
                localStorage.setItem('analysisHistory', JSON.stringify(history.slice(0, 20)));
            }
        } catch (err) {
            console.error('Error analyzing image:', err);
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleTakePhoto = () => {
        fileInputRef.current?.click();
    };

    const handleReset = () => {
        setResult(null);
        setError(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'safe':
                return {
                    color: 'bg-green-100 dark:bg-green-900/30 border-green-500',
                    textColor: 'text-green-800 dark:text-green-300',
                    icon: '✅',
                    title: t('safe'),
                };
            case 'unsafe':
                return {
                    color: 'bg-red-100 dark:bg-red-900/30 border-red-500',
                    textColor: 'text-red-800 dark:text-red-300',
                    icon: '❌',
                    title: t('unsafe'),
                };
            case 'caution':
                return {
                    color: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500',
                    textColor: 'text-yellow-800 dark:text-yellow-300',
                    icon: '⚠️',
                    title: t('caution'),
                };
            default:
                return {
                    color: 'bg-gray-100 dark:bg-gray-800 border-gray-500',
                    textColor: 'text-gray-800 dark:text-gray-300',
                    icon: '❓',
                    title: 'Unknown',
                };
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
            <div className="w-full max-w-md mx-auto flex flex-col min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 animate-fade-in">
                    <button
                        onClick={() => router.push('/')}
                        className="p-2 rounded-lg glass hover:scale-105 transition-all active:scale-95"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold">{t('productAnalysis')}</h1>
                    <div className="w-10" />
                </div>

                {/* Restrictions Display */}
                <div className="glass-card p-4 mb-6 animate-slide-up">
                    <p className="text-sm font-medium mb-2">{t('activeRestrictions')}</p>
                    <div className="flex flex-wrap gap-2">
                        {restrictions.map((restriction) => (
                            <span
                                key={restriction}
                                className="px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-400 rounded-full text-xs font-medium border border-green-500/30"
                            >
                                {t(restriction as any)}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    {!loading && !result && !error && !imagePreview && (
                        <div className="text-center animate-scale-in">
                            <div className="text-6xl mb-6 animate-bounce">📸</div>
                            <h2 className="text-2xl font-semibold mb-4">
                                {t('captureIngredients')}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 px-4">
                                {t('captureDescription')}
                            </p>
                            <button
                                onClick={handleTakePhoto}
                                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-green-500/50"
                            >
                                <span className="flex items-center gap-2">
                                    <span>📷</span>
                                    <span>{t('takePhoto')}</span>
                                </span>
                            </button>
                        </div>
                    )}

                    {imagePreview && !loading && !result && !error && (
                        <div className="w-full animate-fade-in">
                            <div className="glass-card p-4 mb-4">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full rounded-lg"
                                />
                            </div>
                        </div>
                    )}

                    {loading && (
                        <div className="text-center animate-scale-in">
                            <div className="relative w-20 h-20 mx-auto mb-4">
                                <div className="absolute inset-0 rounded-full border-4 border-green-200 dark:border-green-800"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 animate-spin"></div>
                            </div>
                            <p className="font-medium text-lg mb-2">{t('analyzing')}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{t('analyzingDesc')}</p>
                        </div>
                    )}

                    {error && (
                        <div className="w-full animate-scale-in">
                            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-2xl p-6 mb-4">
                                <div className="text-5xl text-center mb-3">❌</div>
                                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 text-center mb-2">
                                    {t('errorOccurred')}
                                </h3>
                                <p className="text-red-700 dark:text-red-400 text-sm text-center">{error}</p>
                            </div>
                            <button
                                onClick={handleReset}
                                className="w-full glass-card py-3 rounded-2xl font-semibold hover:scale-105 transition-all"
                            >
                                {t('tryAgain')}
                            </button>
                        </div>
                    )}

                    {result && (
                        <div className="w-full animate-scale-in">
                            {imagePreview && (
                                <div className="glass-card p-3 mb-4">
                                    <img
                                        src={imagePreview}
                                        alt="Analyzed"
                                        className="w-full rounded-lg max-h-48 object-cover"
                                    />
                                </div>
                            )}

                            <div className={`border-2 rounded-2xl p-6 mb-4 ${getStatusConfig(result.status).color}`}>
                                <div className="text-6xl text-center mb-4 animate-bounce">
                                    {getStatusConfig(result.status).icon}
                                </div>
                                <h3 className={`text-2xl font-bold text-center mb-3 ${getStatusConfig(result.status).textColor}`}>
                                    {getStatusConfig(result.status).title}
                                </h3>
                                <p className={`text-center leading-relaxed ${getStatusConfig(result.status).textColor}`}>
                                    {result.reason}
                                </p>
                            </div>
                            <button
                                onClick={handleReset}
                                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-2xl font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg"
                            >
                                {t('newAnalysis')}
                            </button>
                        </div>
                    )}
                </div>

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>
        </div>
    );
}
