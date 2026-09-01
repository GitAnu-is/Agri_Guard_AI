import React from 'react';
import { cn } from '../utils/cn';
import { toneClasses, type Tone } from '../utils/semantics';
import { ProgressBar } from './ui/Progress';

/** Risk / impact summary tile used on weather, transport and dashboard surfaces. */
export function RiskCard({
  label,
  level,
  value,
  note,
  tone,
  icon







}: {label: string;level: string;value: number;note: string;tone: Tone;icon?: React.ReactNode;}) {
  const t = toneClasses[tone];
  return (
    <article className={cn('rounded-xl border bg-white p-4 shadow-card', t.border)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {icon && <span className={cn('flex h-7 w-7 items-center justify-center rounded-lg', t.softBg, t.text)}>{icon}</span>}
          <h4 className="text-[13px] font-semibold text-leaf-900">{label}</h4>
        </div>
        <span className={cn('text-[12px] font-bold uppercase tracking-wide', t.text)}>{level}</span>
      </div>
      <ProgressBar value={value} tone={tone} height="sm" className="mt-3" />
      <p className="mt-2 text-[12px] leading-4 text-earth-600">{note}</p>
    </article>);

}