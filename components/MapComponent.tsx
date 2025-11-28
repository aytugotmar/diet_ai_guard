'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Place } from '@/types';
import { useEffect } from 'react';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons for different place types
const createIcon = (type: Place['type'], isSelected: boolean = false) => {
    const colors = {
        food: '#ef4444',
        sight: '#3b82f6',
        nature: '#22c55e',
    };

    const size = isSelected ? 40 : 32;
    const borderColor = isSelected ? '#fbbf24' : 'white';
    const borderWidth = isSelected ? '4px' : '3px';
    const shadow = isSelected ? '0 6px 16px rgba(0,0,0,0.5)' : '0 4px 8px rgba(0,0,0,0.3)';

    return L.divIcon({
        className: 'custom-marker',
        html: `<div style="
      background-color: ${colors[type]};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: ${borderWidth} solid ${borderColor};
      box-shadow: ${shadow};
      transition: all 0.3s ease;
    "><div style="
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(45deg);
      color: white;
      font-weight: bold;
      font-size: ${isSelected ? '20px' : '16px'};
    ">${type === 'food' ? '🍽️' : type === 'sight' ? '🏛️' : '🌿'}</div></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size],
    });
};

// Component to handle map view updates
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();

    useEffect(() => {
        // Force map to recalculate size immediately and after delay
        map.invalidateSize();
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
        setTimeout(() => {
            map.invalidateSize();
        }, 300);
        setTimeout(() => {
            map.invalidateSize();
        }, 600);

        map.flyTo(center, zoom, {
            duration: 1.5,
            easeLinearity: 0.25
        });
    }, [center, zoom, map]);

    useEffect(() => {
        // Listen to resize events
        const handleResize = () => {
            map.invalidateSize();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [map]);

    return null;
}

interface MapComponentProps {
    places: Place[];
    selectedPlaceIndex: number | null;
    onMarkerClick: (index: number) => void;
}

export function MapComponentInner({ places, selectedPlaceIndex, onMarkerClick }: MapComponentProps) {
    const center: [number, number] = places.length > 0
        ? (selectedPlaceIndex !== null ? places[selectedPlaceIndex].coordinates : places[0].coordinates)
        : [41.0082, 28.9784]; // Default to Istanbul

    const zoom = selectedPlaceIndex !== null ? 16 : 13;

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            className="w-full h-full rounded-xl overflow-hidden"
            zoomControl={true}
            scrollWheelZoom={true}
            dragging={true}
            doubleClickZoom={true}
            preferCanvas={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
                minZoom={3}
                keepBuffer={4}
                updateWhenIdle={false}
                updateWhenZooming={true}
                updateInterval={100}
                tileSize={256}
            />
            <MapController center={center} zoom={zoom} />
            {places.map((place, index) => (
                <Marker
                    key={index}
                    position={place.coordinates}
                    icon={createIcon(place.type, selectedPlaceIndex === index)}
                    eventHandlers={{
                        click: () => {
                            onMarkerClick(index);
                        },
                    }}
                >
                    <Popup
                        autoClose={true}
                        closeOnClick={false}
                        autoPan={true}
                        autoPanPadding={[100, 100]}
                        keepInView={true}
                        maxWidth={450}
                        minWidth={280}
                        className="custom-popup"
                    >
                        <div className="p-4 min-w-[280px] bg-white">
                            <h3 className="font-bold text-lg mb-3 text-gray-900 leading-tight">{place.name}</h3>
                            <p className="text-sm text-gray-800 leading-relaxed mb-3 whitespace-normal">{place.description}</p>
                            <div className="flex items-center gap-2">
                                <span className="inline-block px-3 py-1.5 bg-blue-500 text-white text-xs font-bold rounded-full">
                                    {place.type === 'food' ? '🍽️ Yemek' : place.type === 'nature' ? '🌿 Doğa' : '🏛️ Görülecek Yer'}
                                </span>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
