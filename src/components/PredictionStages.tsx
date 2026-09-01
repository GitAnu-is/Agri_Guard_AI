import React from 'react';
import { cn } from '../utils/cn';

export type PredictionStage = 'input' | 'processing' | 'result' | 'explanation' | 'recommendation' | 'saved';

const order: PredictionStage[] = ['input', 'processing', 'result', 'explanation', 'recommendation', 'saved'];

const labels: Record<PredictionStage, string> = {
  input: 'Input',
  processing: 'Processing',
  result: 'Result',
  explanation: 'Explanation',
  recommendation: 'Recommendation',
  saved: 'Save report'
};

/**
 * Shared progress strip that makes the prediction pipeline explicit on every
 * AI page: Input → Processing → Result → Explanation → Recommendation → Report.
 */
export function PredictionStages({ current }: {current: PredictionStage;}) {
  const currentIndex = order.indexOf(current);
  return (
    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2" aria-label="Prediction workflow progress">
      {order.map((stage, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li key={stage} className="flex items-center gap-1.5">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-semibold transition-colors duration-150 ease-out',
                active ?
                'border-xai-300 bg-xai-50 text-xai-800' :
                done ?
                'border-leaf-200 bg-leaf-50 text-leaf-700' :
                'border-earth-200 bg-white text-earth-400'
              )}
              aria-current={active ? 'step' : undefined}>
              
              <span
                className={cn(
                  'flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold',
                  active ? 'bg-xai-600 text-white' : done ? 'bg-leaf-600 text-white' : 'bg-earth-100 text-earth-500'
                )}>
                
                {i + 1}
              </span>
              {labels[stage]}
            </span>
            {i < order.length - 1 &&
            <span className="text-earth-300" aria-hidden="true">
                →
              </span>
            }
          </li>);

      })}
    </ol>);

}