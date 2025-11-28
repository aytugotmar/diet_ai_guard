'use client';

import dynamic from 'next/dynamic';
import { Place } from '@/types';

// This is the crucial fix for "window is not defined" error
const MapComponentInner = dynamic(
    () => import('./MapComponent').then((mod) => mod.MapComponentInner),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full rounded-2xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
                </div>
            </div>
        ),
    }
);

interface MapWrapperProps {
    places: Place[];
    selectedPlaceIndex: number | null;
    onMarkerClick: (index: number) => void;
}

export default function MapWrapper({ places, selectedPlaceIndex, onMarkerClick }: MapWrapperProps) {
    return (
        <MapComponentInner
            places={places}
            selectedPlaceIndex={selectedPlaceIndex}
            onMarkerClick={onMarkerClick}
        />
    );
}
