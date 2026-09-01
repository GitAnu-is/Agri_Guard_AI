import React from 'react';
import { cn } from '../utils/cn';

export interface InfoItem {
  label: string;
  value: React.ReactNode;
  hint?: string;
}

/** Dense, readable key–value grid used across farm, crop and logistics detail views. */
export function InfoGrid({ items, columns = 3, className }: {items: InfoItem[];columns?: 2 | 3 | 4;className?: string;}) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' };
  return (
    <dl className={cn('grid grid-cols-1 gap-x-6 gap-y-4', cols[columns], className)}>
      {items.map((item) =>
      <div key={item.label} className="min-w-0">
          <dt className="text-[12px] font-medium text-earth-500">{item.label}</dt>
          <dd className="mt-0.5 text-[14px] font-semibold leading-5 text-leaf-900">{item.value}</dd>
          {item.hint && <p className="mt-0.5 text-[12px] leading-4 text-earth-500">{item.hint}</p>}
        </div>
      )}
    </dl>);

}