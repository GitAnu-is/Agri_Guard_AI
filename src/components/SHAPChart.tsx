import React from 'react';
import { motion } from 'framer-motion';
import type { FeatureContribution } from '../types';
import { cn } from '../utils/cn';

/**
 * SHAP-style feature contribution chart. Positive contributions push the
 * prediction up, negative contributions pull it down.
 */
export function SHAPChart({
  features,
  positiveLabel = 'Increases prediction',
  negativeLabel = 'Decreases prediction',
  showNotes = true





}: {features: FeatureContribution[];positiveLabel?: string;negativeLabel?: string;showNotes?: boolean;}) {
  const max = Math.max(...features.map((f) => Math.abs(f.contribution)), 1);
  const hasNegative = features.some((f) => f.contribution < 0 || f.direction === 'negative');

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4 text-[12px] font-medium text-earth-600">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-xai-600" aria-hidden="true" />
          {positiveLabel}
        </span>
        {hasNegative &&
        <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-sky-500" aria-hidden="true" />
            {negativeLabel}
          </span>
        }
      </div>

      <ul className="space-y-3">
        {features.map((f, i) => {
          const magnitude = Math.abs(f.contribution);
          const negative = f.contribution < 0 || f.direction === 'negative';
          const width = magnitude / max * 100;
          return (
            <li key={f.feature}>
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <span className="text-[13px] font-medium text-leaf-900">{f.feature}</span>
                <span className={cn('font-mono text-[13px] font-bold tabular-nums', negative ? 'text-sky-700' : 'text-xai-700')}>
                  {negative ? '−' : '+'}
                  {magnitude}%
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-earth-100">
                <motion.div
                  className={cn('h-full rounded-full', negative ? 'bg-sky-500' : 'bg-xai-600')}
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ duration: 0.28, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }} />
                
              </div>
              {showNotes && f.note && <p className="mt-1 text-[12px] leading-4 text-earth-600">{f.note}</p>}
            </li>);

        })}
      </ul>
    </div>);

}