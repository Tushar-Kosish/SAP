import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { RouteOption } from '../types';
import { Layers, MapPin, Navigation, Maximize2, X, CheckCircle2 } from 'lucide-react';

interface RouteMapProps {
  routes: RouteOption[];
  selectedRouteId: string;
  onSelectRoute: (id: 'road' | 'rail' | 'coastal' | 'ship' | 'air') => void;
}

export const RouteMap: React.FC<RouteMapProps> = ({
  routes,
  selectedRouteId,
  onSelectRoute,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeRouteSheet, setActiveRouteSheet] = useState<RouteOption | null>(null);

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

    const createCustomIcon = (bgColor: string, text: string, ping: boolean = false) => {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: ${bgColor}; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 15px ${bgColor}; color: white; font-weight: bold; font-size: 11px;">
            ${ping ? `<span style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${bgColor}; opacity: 0.65; animation: ping 1.5s infinite;"></span>` : ''}
            <span>${text}</span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
    };

    L.marker([18.948, 72.951], { icon: createCustomIcon('#00F2FE', 'JNPA') }).addTo(layersGroup);
    L.marker([28.535, 77.553], { icon: createCustomIcon('#38BDF8', 'DADRI') }).addTo(layersGroup);
    L.marker([19.065, 73.001], { icon: createCustomIcon('#EF4444', '⚠', true) }).addTo(layersGroup);

    routes.forEach((route) => {
      const isSelected = selectedRouteId === route.id;

      const polyline = L.polyline(route.coordinates, {
        color: route.color,
        weight: isSelected ? 6 : 3,
        opacity: isSelected ? 1 : 0.6,
        dashArray: route.id === 'road' ? '8, 8' : undefined,
      });

      polyline.on('click', () => {
        onSelectRoute(route.id);
        setActiveRouteSheet(route);
      });

      layersGroup.addLayer(polyline);
    });

  }, [routes, selectedRouteId, onSelectRoute, isExpanded]);

  return (
    <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-white/10 shadow-card space-y-4">
      
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Navigation className="w-4 h-4" />
            GIS PATHWAY TRACKER
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            LIVE ROUTE INTELLIGENCE
          </h2>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-cyan-300 text-xs font-mono font-bold active:scale-95"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>⛶ EXPAND MAP</span>
          </button>
        </div>
      </div>

      {/* Route Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {routes.map((r) => (
          <button
            key={r.id}
            onClick={() => {
              onSelectRoute(r.id);
              setActiveRouteSheet(r);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all active:scale-95 ${
              selectedRouteId === r.id
                ? 'bg-slate-800 text-white border-2 shadow-md'
                : 'bg-slate-900/60 text-slate-400 border border-white/10'
            }`}
            style={{ borderColor: selectedRouteId === r.id ? r.color : undefined }}
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: r.color }}></span>
            {r.id.toUpperCase()} ({r.aiScore} pts)
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden border border-white/10 shadow-inner">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Route Info Bottom Sheet */}
      {activeRouteSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-sm lg:hidden animate-fadeIn">
          <div className="flex-1" onClick={() => setActiveRouteSheet(null)} />
          <div className="bg-[#0A0E17] rounded-t-3xl border-t border-cyan-500/40 p-6 space-y-4 shadow-2xl animate-slideUp font-mono">
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto" />
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeRouteSheet.color }}></span>
                <span className="text-base font-extrabold text-white font-sans">{activeRouteSheet.name}</span>
              </div>
              <button onClick={() => setActiveRouteSheet(null)} className="text-slate-400 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px]">ETA</span>
                <span className="text-white font-bold text-sm">{activeRouteSheet.etaHours} Hours</span>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px]">COST / TEU</span>
                <span className="text-emerald-400 font-bold text-sm">₹{activeRouteSheet.costPerContainer.toLocaleString()}</span>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px]">CO₂ FOOTPRINT</span>
                <span className="text-indigo-400 font-bold text-sm">{activeRouteSheet.co2PerContainerTons} t</span>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px]">AI SCORE</span>
                <span className="text-cyan-400 font-bold text-sm">{activeRouteSheet.aiScore} / 100</span>
              </div>
            </div>

            <button
              onClick={() => {
                onSelectRoute(activeRouteSheet.id);
                setActiveRouteSheet(null);
              }}
              className="w-full py-3 rounded-xl bg-cyan-400 text-black font-extrabold text-xs shadow-glow-cyan font-sans"
            >
              SELECT ROUTE
            </button>
          </div>
        </div>
      )}

      {/* Expanded Full-Screen Map Modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-[#080B11] p-4 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white">Full-Screen Corridor Map</h3>
            <button onClick={() => setIsExpanded(false)} className="p-2 rounded-xl bg-slate-900 text-white">
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
