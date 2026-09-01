import React from 'react';
import { cn } from '../utils/cn';
import { toneClasses, type Tone } from '../utils/semantics';

/** Numbered / iconed advisory card used for cultivation, treatment and handling guidance. */
export function RecommendationCard({
  index,
  title,
  detail,
  icon,
  tone = 'leaf'






}: {index?: number;title: string;detail: string;icon?: React.ReactNode;tone?: Tone;}) {
  const t = toneClasses[tone];
  return (
    <article className="flex gap-3 rounded-xl border border-earth-200 bg-white p-4 shadow-card">
      <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold', t.softBg, t.text)}>
        {icon ?? index}
      </span>
      <div className="min-w-0">
        <h4 className="text-[14px] font-semibold text-leaf-900">{title}</h4>
        <p className="mt-1 text-[13px] leading-6 text-earth-700">{detail}</p>
      </div>
    </article>);

}

/** Compact checklist block for grouped action lists. */
export function ActionList({
  title,
  items,
  tone = 'leaf',
  ordered = false





}: {title: string;items: string[];tone?: Tone;ordered?: boolean;}) {
  const t = toneClasses[tone];
  const List = ordered ? 'ol' : 'ul';
  return (
    <div className="rounded-xl border border-earth-200 bg-white p-4 shadow-card">
      <h4 className={cn('text-[13px] font-semibold uppercase tracking-wide', t.text)}>{title}</h4>
      <List className="mt-3 space-y-2">
        {items.map((item, i) =>
        <li key={item} className="flex gap-2.5 text-[13px] leading-5 text-earth-700">
            <span className={cn('mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold', t.softBg, t.text)}>
              {ordered ? i + 1 : '✓'}
            </span>
            <span>{item}</span>
          </li>
        )}
      </List>
    </div>);

}