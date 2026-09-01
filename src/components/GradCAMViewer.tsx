import React, { useState } from 'react';
import { EyeIcon, LayersIcon, ScanIcon } from 'lucide-react';
import { cn } from '../utils/cn';
import { DemoDataNotice } from './ui/Feedback';

type ViewMode = 'slider' | 'side-by-side';

/**
 * Grad-CAM visual explanation: original capture, model attention map, and the
 * highlighted infected region, comparable through a drag slider.
 */
export function GradCAMViewer({
  originalUrl,
  heatmapUrl,
  maskUrl,
  confidence,
  explanation,
  infectedPercentage







}: {originalUrl: string;heatmapUrl: string;maskUrl: string;confidence: number;explanation: string;infectedPercentage: number;}) {
  const [position, setPosition] = useState(52);
  const [mode, setMode] = useState<ViewMode>('slider');

  return (
    <section className="rounded-xl border border-xai-200 bg-white shadow-card" aria-labelledby="gradcam-heading">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-xai-100 bg-xai-50/70 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-xai-600 text-white">
            <LayersIcon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-xai-700">Grad-CAM visual explanation</p>
            <h3 id="gradcam-heading" className="text-[15px] font-semibold text-leaf-900">
              Where did the model look?
            </h3>
          </div>
        </div>
        <div className="flex rounded-lg border border-earth-200 bg-white p-0.5">
          {(['slider', 'side-by-side'] as ViewMode[]).map((m) =>
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={cn(
              'rounded-md px-2.5 py-1 text-[12px] font-semibold transition-colors duration-150 ease-out',
              mode === m ? 'bg-xai-600 text-white' : 'text-earth-600 hover:text-leaf-900'
            )}>
            
              {m === 'slider' ? 'Comparison slider' : 'Side by side'}
            </button>
          )}
        </div>
      </div>

      <div className="px-5 py-5">
        {mode === 'slider' ?
        <div>
            <div className="relative aspect-square w-full max-w-xl overflow-hidden rounded-xl border border-earth-200 bg-earth-900">
              <img src={originalUrl} alt="Original uploaded crop image" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
                <img src={heatmapUrl} alt="Grad-CAM attention heatmap overlaid on the crop image" className="h-full w-full object-cover" />
              </div>
              <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow" style={{ left: `${position}%` }} aria-hidden="true">
                <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-xai-600 text-white">
                  <ScanIcon className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <span className="absolute bottom-3 left-3 rounded-md bg-leaf-900/80 px-2 py-1 text-[11px] font-semibold text-white">Original Image</span>
              <span className="absolute bottom-3 right-3 rounded-md bg-xai-700/90 px-2 py-1 text-[11px] font-semibold text-white">AI Attention Map</span>
            </div>
            <label htmlFor="gradcam-slider" className="mt-3 block text-[13px] font-medium text-earth-700">
              Drag to compare the original capture with the model attention map
            </label>
            <input
            id="gradcam-slider"
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="mt-1.5 w-full max-w-xl accent-xai-600" />
          
          </div> :

        <div className="grid gap-4 sm:grid-cols-3">
            {[
          { label: 'Original Image', url: originalUrl, alt: 'Original uploaded crop image', note: 'The capture submitted for analysis.' },
          { label: 'AI Attention Map', url: heatmapUrl, alt: 'Grad-CAM attention heatmap', note: 'Warm regions received the highest activation.' },
          { label: 'Infected Region', url: maskUrl, alt: 'Highlighted infected region', note: `Approximately ${infectedPercentage}% of the leaf area.` }].
          map((panel) =>
          <figure key={panel.label}>
                <div className="overflow-hidden rounded-lg border border-earth-200 bg-earth-900">
                  <img src={panel.url} alt={panel.alt} className="aspect-square w-full object-cover" />
                </div>
                <figcaption className="mt-2">
                  <p className="text-[13px] font-semibold text-leaf-900">{panel.label}</p>
                  <p className="text-[12px] leading-4 text-earth-600">{panel.note}</p>
                </figcaption>
              </figure>
          )}
          </div>
        }

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-lg border border-earth-200 bg-earth-50 px-4 py-3">
            <h4 className="flex items-center gap-2 text-[13px] font-semibold text-leaf-900">
              <EyeIcon className="h-4 w-4 text-xai-600" aria-hidden="true" />
              Model Explanation
            </h4>
            <p className="mt-1.5 text-[13px] leading-6 text-earth-700">{explanation}</p>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-earth-200 px-4 py-3">
              <dt className="text-[12px] font-medium text-earth-600">Prediction confidence</dt>
              <dd className="mt-1 font-mono text-xl font-bold text-xai-700">{confidence.toFixed(1)}%</dd>
            </div>
            <div className="rounded-lg border border-earth-200 px-4 py-3">
              <dt className="text-[12px] font-medium text-earth-600">Infected area</dt>
              <dd className="mt-1 font-mono text-xl font-bold text-risk-700">{infectedPercentage}%</dd>
            </div>
          </dl>
        </div>

        <DemoDataNotice className="mt-4">
          The heatmap shown is a pre-rendered demonstration overlay. It illustrates how Grad-CAM output will be presented once the trained
          disease-detection model is connected — it is not the output of a live model run.
        </DemoDataNotice>
      </div>
    </section>);

}