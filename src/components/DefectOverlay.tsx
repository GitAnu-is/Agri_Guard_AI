import React, { useState } from 'react';
import { cn } from '../utils/cn';
import type { Defect } from '../types';

const labelColors: Record<Defect['label'], string> = {
  Bruising: '#d92d20',
  Compression: '#f79009',
  Discoloration: '#6938ef',
  'Physical damage': '#1570ef',
  'Rot/spoilage': '#7a271a'
};

/** Mock YOLOv8-style bounding-box overlay for detected surface defects. */
export function DefectOverlay({ imageUrl, defects, alt }: {imageUrl: string;defects: Defect[];alt: string;}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-earth-200 bg-earth-900">
        <img src={imageUrl} alt={alt} className="aspect-square w-full object-cover" />
        {defects.map((d) => {
          const color = labelColors[d.label];
          const active = hovered === null || hovered === d.id;
          return (
            <div
              key={d.id}
              className="absolute transition-opacity duration-150 ease-out"
              style={{
                left: `${d.box.x * 100}%`,
                top: `${d.box.y * 100}%`,
                width: `${d.box.w * 100}%`,
                height: `${d.box.h * 100}%`,
                border: `2px solid ${color}`,
                opacity: active ? 1 : 0.25
              }}
              onMouseEnter={() => setHovered(d.id)}
              onMouseLeave={() => setHovered(null)}>
              
              <span
                className="absolute -top-[19px] left-0 whitespace-nowrap rounded-t px-1.5 py-0.5 text-[10px] font-bold text-white"
                style={{ backgroundColor: color }}>
                
                {d.label} {d.confidence.toFixed(0)}%
              </span>
            </div>);

        })}
      </div>

      <ul className="mt-3 flex flex-wrap gap-2">
        {defects.map((d) =>
        <li key={d.id}>
            <button
            type="button"
            onMouseEnter={() => setHovered(d.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(d.id)}
            onBlur={() => setHovered(null)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border border-earth-200 bg-white px-2.5 py-1 text-[12px] font-medium text-earth-700 transition-colors duration-150 ease-out hover:border-earth-300',
              hovered === d.id && 'border-leaf-300 bg-leaf-50'
            )}>
            
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: labelColors[d.label] }} aria-hidden="true" />
              {d.label}
              <span className="font-mono font-semibold text-leaf-900">{d.confidence.toFixed(1)}%</span>
            </button>
          </li>
        )}
      </ul>
    </div>);

}