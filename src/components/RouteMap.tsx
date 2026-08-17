import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { RouteOption } from '../types';
import { Layers, MapPin, Navigation, ShieldCheck } from 'lucide-react';

interface RouteMapProps {
  routes: RouteOption[];
  selectedRouteId: string;
  onSelectRoute: (id: 'road' | 'rail' | 'coastal') => void;
}

export const RouteMap: React.FC<RouteMapProps> = ({
  routes,
  selectedRouteId,
  onSelectRoute,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet map if not created yet
    if (!leafletMapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [23.5, 74.5], // Center of Western Freight Corridor (India)
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      // Dark theme map tiles (CartoDB Dark Matter)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
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

    // Custom Icon Generator using L.divIcon
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

    // Add Origin Marker (JNPA)
    const jnpaIcon = createCustomIcon('#00F2FE', 'JNPA');
    L.marker([18.948, 72.951], { icon: jnpaIcon })
      .bindPopup(`
        <div class="p-2 text-xs font-mono">
          <strong class="text-cyan-400 text-sm block">JNPA PORT TERMINAL</strong>
          <span>Nhava Sheva, Navi Mumbai</span><br/>
          <span class="text-slate-300">Origin Node: 1,248 TEU Active</span>
        </div>
      `)
      .addTo(layersGroup);

    // Add Destination Marker (ICD Dadri / Delhi)
    const dadriIcon = createCustomIcon('#38BDF8', 'DADRI');
    L.marker([28.535, 77.553], { icon: dadriIcon })
      .bindPopup(`
        <div class="p-2 text-xs font-mono">
          <strong class="text-sky-400 text-sm block">ICD DADRI TERMINAL</strong>
          <span>Greater Noida, NCR</span><br/>
          <span class="text-slate-300">Destination Logistics Hub</span>
        </div>
      `)
      .addTo(layersGroup);

    // Add Disruption Marker on NH48 Highway
    const DisruptionIcon = createCustomIcon('#EF4444', '⚠', true);
    L.marker([19.065, 73.001], { icon: DisruptionIcon })
      .bindPopup(`
        <div class="p-2 text-xs font-mono">
          <strong class="text-rose-400 text-sm block">⚠ NH48 CONGESTION NODE</strong>
          <span class="text-rose-300 font-bold">Congestion Score: 82/100</span><br/>
          <span>Delay impact: +8.2 hours</span>
        </div>
      `)
      .addTo(layersGroup);

    // Render Routes as Animated Polylines
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
      });

      polyline.bindPopup(`
        <div class="p-2 text-xs font-mono space-y-1">
          <strong style="color:${route.color}" class="text-sm block">${route.name}</strong>
          <div>Mode: <strong>${route.mode}</strong></div>
          <div>ETA: <strong>${route.transitTimeFormatted}</strong></div>
          <div>Cost/TEU: <strong>₹${route.costPerContainer.toLocaleString()}</strong></div>
          <div>AI Score: <strong>${route.aiScore}/100</strong></div>
        </div>
      `);

      layersGroup.addLayer(polyline);
    });

  }, [routes, selectedRouteId, onSelectRoute]);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-card space-y-4">
      
      {/* Map Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Navigation className="w-4 h-4" />
            GIS MULTI-MODAL PATHWAY TRACKER
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            LIVE ROUTE INTELLIGENCE
          </h2>
        </div>

        {/* Route Selector Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {routes.map((r) => (
            <button
              key={r.id}
              onClick={() => onSelectRoute(r.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                selectedRouteId === r.id
                  ? 'bg-slate-800 text-white border-2 shadow-md'
                  : 'bg-slate-900/60 text-slate-400 border border-white/10 hover:text-white'
              }`}
              style={{ borderColor: selectedRouteId === r.id ? r.color : undefined }}
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: r.color }}></span>
              {r.id.toUpperCase()} ({r.aiScore} pts)
            </button>
          ))}
        </div>
      </div>

      {/* Map Display Container */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-white/10 shadow-inner">
        <div ref={mapContainerRef} className="w-full h-full" />
        
        {/* Floating Legend */}
        <div className="absolute bottom-4 right-4 z-[1000] bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs font-mono space-y-1.5">
          <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">CORRIDOR LEGEND</div>
          <div className="flex items-center gap-2 text-slate-200">
            <span className="w-3 h-1 bg-rose-500 rounded"></span>
            <span>Route A (NH48 Highway Trucking)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <span className="w-3 h-1 bg-emerald-400 rounded"></span>
            <span className="text-emerald-400 font-bold">Route B (WDFC Rail - Recommended)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <span className="w-3 h-1 bg-blue-400 rounded"></span>
            <span>Route C (Coastal Feeder + Rail)</span>
          </div>
        </div>
      </div>

    </div>
  );
};
