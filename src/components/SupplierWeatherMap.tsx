import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MultimodalOption } from '../types';
import { Navigation, Maximize2, X, CloudRain, Sun, Wind, Waves, AlertTriangle } from 'lucide-react';

interface SupplierWeatherMapProps {
  multimodalOptions: MultimodalOption[];
  selectedModeId: 'ship' | 'air' | 'rail' | 'road';
  onSelectMode: (modeId: 'ship' | 'air' | 'rail' | 'road') => void;
}

export const SupplierWeatherMap: React.FC<SupplierWeatherMapProps> = ({
  multimodalOptions,
  selectedModeId,
  onSelectMode,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Route Coordinates
  const routeCoordinates: Record<'ship' | 'air' | 'rail' | 'road', [number, number][]> = {
    ship: [
      [18.948, 72.951], // JNPA Port Mumbai
      [21.112, 72.639], // Hazira Port
      [20.900, 71.500], // Coastal Waters
      [22.800, 70.100], // Mundra Port
    ],
    air: [
      [19.089, 72.868], // Mumbai Airport Cargo
      [23.022, 72.571], // Ahmedabad Air Hub
      [28.556, 77.100], // Delhi IGI Cargo Terminal
    ],
    rail: [
      [18.948, 72.951], // JNPA Port Yard
      [20.000, 73.780], // Nashik Rail Hub
      [23.180, 75.770], // Ratlam Yard
      [28.200, 76.600], // WDFC Rewari Junction
      [28.535, 77.553], // ICD Dadri
    ],
    road: [
      [18.948, 72.951], // JNPA Terminal
      [19.076, 72.877], // Mumbai
      [22.307, 73.181], // Vadodara (NH48 Heavy Rain Hazard)
      [26.912, 75.787], // Jaipur Bypass
      [28.535, 77.553], // ICD Dadri
    ],
  };

  const routeColors: Record<'ship' | 'air' | 'rail' | 'road', string> = {
    ship: '#06B6D4', // cyan-500
    air: '#A855F7',  // purple-500
    rail: '#10B981', // emerald-500
    road: '#EF4444', // red-500 (hazardous rain)
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!leafletMapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [23.5, 74.5],
        zoom: 5.5,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CARTO &copy; OpenStreetMap',
        maxZoom: 18,
        subdomains: 'abcd',
      }).addTo(map);

      layersGroupRef.current = L.layerGroup().addTo(map);
      leafletMapRef.current = map;
    }

    const map = leafletMapRef.current;
    const layersGroup = layersGroupRef.current;
    if (!map || !layersGroup) return;

    layersGroup.clearLayers();

    // Helper marker generator
    const createCustomIcon = (bgColor: string, symbol: string, pulse: boolean = false) => {
      return L.divIcon({
        className: 'custom-weather-marker',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: ${bgColor}; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 12px ${bgColor}; color: white; font-weight: bold; font-size: 13px;">
            ${pulse ? `<span style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${bgColor}; opacity: 0.6; animation: ping 1.5s infinite;"></span>` : ''}
            <span>${symbol}</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
    };

    // Add key location markers
    L.marker([18.948, 72.951], { icon: createCustomIcon('#0284C7', '⚓') })
      .bindPopup('<b>JNPA Port Freight Terminal</b><br/>Origin Node')
      .addTo(layersGroup);

    L.marker([28.535, 77.553], { icon: createCustomIcon('#10B981', '🏭') })
      .bindPopup('<b>ICD Dadri Freight Terminal</b><br/>Destination Node')
      .addTo(layersGroup);

    // Weather Hazard Marker on NH48 Highway (Vadodara Zone)
    L.marker([22.307, 73.181], { icon: createCustomIcon('#EF4444', '🌧️', true) })
      .bindPopup('<b>NH48 Vadodara Corridor Weather Hazard</b><br/>Heavy Rain & Torrential Flash Floods<br/>Delay: +14 Hours')
      .addTo(layersGroup);

    // Weather Hazard Marker for Air Cargo (Western Ghats Wind Turbulence)
    L.marker([23.022, 72.571], { icon: createCustomIcon('#A855F7', '💨', true) })
      .bindPopup('<b>Western Air Corridor</b><br/>High Altitude Turbulence Alert<br/>Delay: +1.5 Hours')
      .addTo(layersGroup);

    // Draw Polylines for each route
    (Object.keys(routeCoordinates) as ('ship' | 'air' | 'rail' | 'road')[]).forEach((mode) => {
      const isSelected = selectedModeId === mode;
      const coords = routeCoordinates[mode];
      const color = routeColors[mode];

      const polyline = L.polyline(coords, {
        color,
        weight: isSelected ? 6 : 3,
        opacity: isSelected ? 1 : 0.45,
        dashArray: mode === 'road' ? '8, 8' : mode === 'air' ? '4, 8' : undefined,
      });

      polyline.on('click', () => {
        onSelectMode(mode);
      });

      layersGroup.addLayer(polyline);
    });

  }, [selectedModeId, onSelectMode, isExpanded]);

  const activeOption = multimodalOptions.find((o) => o.id === selectedModeId) || multimodalOptions[0];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-[var(--border-strong)] shadow-xl space-y-4 font-sans bg-[var(--bg-surface)]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <Navigation className="w-4 h-4" />
            <span>GIS Multimodal Weather & Pathway Tracker</span>
          </div>
          <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
            Live Route Weather Analysis & Overlay
          </h2>
        </div>

        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-surface-inset)] hover:bg-[var(--bg-surface-hover)] border border-[var(--border-color)] text-xs font-bold text-cyan-400"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Expand Weather Map</span>
        </button>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {multimodalOptions.map((opt) => {
          const isSelected = selectedModeId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelectMode(opt.id)}
              className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between ${
                isSelected
                  ? 'bg-cyan-500/10 border-cyan-500 shadow-md ring-1 ring-cyan-500/30'
                  : 'bg-[var(--bg-surface-inset)] border-[var(--border-color)] hover:bg-[var(--bg-surface-hover)]'
              }`}
            >
              <div>
                <div className="text-xs font-extrabold text-[var(--text-primary)]">{opt.mode}</div>
                <div className="text-[10px] text-[var(--text-secondary)] font-mono">{opt.transitTimeHours}h | ₹{opt.costPerTeu.toLocaleString()}</div>
              </div>

              <div className="text-right">
                <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-extrabold ${
                  opt.weatherStatus.severity === 'CRITICAL'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : opt.weatherStatus.severity === 'WARNING'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {opt.weatherStatus.weatherType}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Weather Overlay Banner for Active Selected Mode */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            {activeOption.id === 'road' ? (
              <CloudRain className="w-5 h-5 text-rose-400" />
            ) : activeOption.id === 'ship' ? (
              <Waves className="w-5 h-5 text-cyan-400" />
            ) : activeOption.id === 'air' ? (
              <Wind className="w-5 h-5 text-purple-400" />
            ) : (
              <Sun className="w-5 h-5 text-emerald-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">{activeOption.mode} ({activeOption.pathwayName})</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                {activeOption.weatherStatus.location}
              </span>
            </div>
            <p className="text-slate-300 text-[11px] mt-0.5">{activeOption.weatherStatus.impactDescription}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-700 pt-2 md:pt-0 md:pl-4 shrink-0">
          <div>
            <span className="text-slate-400 block text-[10px]">TEMP / WIND</span>
            <span className="text-white font-bold">{activeOption.weatherStatus.temperature} | {activeOption.weatherStatus.windSpeed}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">RISK FACTOR</span>
            <span className={`font-bold ${
              activeOption.riskLevel === 'Critical' || activeOption.riskLevel === 'High' ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {activeOption.riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative w-full h-[340px] rounded-xl overflow-hidden border border-[var(--border-color)] shadow-inner">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/85 p-4 flex flex-col space-y-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white">Full-Screen Multimodal Weather Map</h3>
            <button onClick={() => setIsExpanded(false)} className="p-2 rounded-xl bg-slate-800 text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 w-full rounded-2xl overflow-hidden border border-cyan-500/40">
            <div ref={mapContainerRef} className="w-full h-full" />
          </div>
        </div>
      )}

    </div>
  );
};
