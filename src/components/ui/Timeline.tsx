import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { toneClasses, type Tone } from '../../utils/semantics';

export interface TimelineStep {
  label: string;
  detail?: string;
  state: 'done' | 'current' | 'upcoming' | 'optimal' | 'risk';
}

const stateStyle: Record<TimelineStep['state'], {dot: string;text: string;label: string;}> = {
  done: { dot: 'bg-leaf-600 text-white', text: 'text-earth-600', label: 'Completed' },
  current: { dot: 'bg-leaf-800 text-white ring-4 ring-leaf-100', text: 'text-leaf-900', label: 'Current stage' },
  optimal: { dot: 'bg-harvest-500 text-white ring-4 ring-harvest-100', text: 'text-harvest-800', label: 'Optimal window' },
  risk: { dot: 'bg-risk-500 text-white', text: 'text-risk-800', label: 'Risk period' },
  upcoming: { dot: 'bg-earth-200 text-earth-600', text: 'text-earth-500', label: 'Upcoming' }
};

export function Timeline({ steps, className }: {steps: TimelineStep[];className?: string;}) {
  return (
    <ol className={cn('relative space-y-0', className)}>
      {steps.map((step, i) => {
        const style = stateStyle[step.state];
        const last = i === steps.length - 1;
        return (
          <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
            {!last && <span className="absolute left-[13px] top-7 h-[calc(100%-16px)] w-0.5 bg-earth-200" aria-hidden="true" />}
            <span className={cn('relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold', style.dot)}>
              {step.state === 'done' ? <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className={cn('text-[14px] font-semibold', style.text)}>{step.label}</p>
              {step.detail && <p className="mt-0.5 text-[13px] leading-5 text-earth-600">{step.detail}</p>}
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-earth-400">{style.label}</p>
            </div>
          </li>);

      })}
    </ol>);

}

/** Horizontal, arrow-linked chain used to communicate the research workflow. */
export function FlowChain({
  steps,
  tone = 'leaf',
  onSelect




}: {steps: string[];tone?: Tone;onSelect?: (index: number) => void;}) {
  const t = toneClasses[tone];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) =>
      <React.Fragment key={`${step}-${i}`}>
          {onSelect ?
        <button
          type="button"
          onClick={() => onSelect(i)}
          className={cn(
            'rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors duration-150 ease-out',
            t.softBg,
            t.border,
            t.text,
            'hover:bg-white'
          )}>
          
              {step}
            </button> :

        <span className={cn('rounded-lg border px-3 py-1.5 text-[13px] font-medium', t.softBg, t.border, t.text)}>{step}</span>
        }
          {i < steps.length - 1 &&
        <span className="text-earth-400" aria-hidden="true">
              →
            </span>
        }
        </React.Fragment>
      )}
    </div>);

}