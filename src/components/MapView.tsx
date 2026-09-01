import React from 'react';
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, Tooltip as LeafletTooltip } from 'react-leaflet';

export interface MapPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  tone: 'leaf' | 'harvest' | 'risk' | 'sky' | 'xai' | 'earth';
  radius?: number;
  popup?: React.ReactNode;
  label?: string;
}

const toneHex: Record<MapPoint['tone'], string> = {
  leaf: '#236e4a',
  harvest: '#f79009',
  risk: '#d92d20',
  sky: '#1570ef',
  xai: '#6938ef',
  earth: '#7e6749'
};

/**
 * Leaflet map wrapper. Circle markers are used instead of default pin icons so
 * no external marker asset is required and semantic colour is preserved.
 */
export function MapView({
  center,
  zoom = 10,
  points,
  route,
  height = 380,
  onSelect







}: {center: [number, number];zoom?: number;points: MapPoint[];route?: [number, number][];height?: number;onSelect?: (point: MapPoint) => void;}) {
  return (
    <div className="overflow-hidden rounded-xl border border-earth-200" style={{ height }}>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {route && route.length > 1 && <Polyline positions={route} pathOptions={{ color: '#1570ef', weight: 4, opacity: 0.75, dashArray: '6 8' }} />}
        {points.map((p) =>
        <CircleMarker
          key={p.id}
          center={[p.lat, p.lng]}
          radius={p.radius ?? 11}
          pathOptions={{ color: '#ffffff', weight: 2, fillColor: toneHex[p.tone], fillOpacity: 0.92 }}
          eventHandlers={onSelect ? { click: () => onSelect(p) } : undefined}>
          
            {p.label &&
          <LeafletTooltip direction="top" offset={[0, -8]}>
                {p.label}
              </LeafletTooltip>
          }
            {p.popup && <Popup>{p.popup}</Popup>}
          </CircleMarker>
        )}
      </MapContainer>
    </div>);

}