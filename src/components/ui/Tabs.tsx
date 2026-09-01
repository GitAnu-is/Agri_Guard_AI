import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

export function Tabs({
  items,
  active,
  onChange,
  className,
  variant = 'underline'






}: {items: TabItem[];active: string;onChange: (id: string) => void;className?: string;variant?: 'underline' | 'pill';}) {
  return (
    <div
      role="tablist"
      className={cn(
        'flex gap-1 overflow-x-auto scroll-thin',
        variant === 'underline' ? 'border-b border-earth-200' : 'rounded-lg border border-earth-200 bg-earth-50 p-1',
        className
      )}>
      
      {items.map((item) => {
        const selected = item.id === active;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(item.id)}
            className={cn(
              'inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-[13px] font-medium transition-colors duration-150 ease-out',
              variant === 'underline' ?
              cn(
                '-mb-px border-b-2 px-3 pb-2.5 pt-2',
                selected ? 'border-leaf-700 text-leaf-900' : 'border-transparent text-earth-600 hover:text-leaf-800'
              ) :
              cn('rounded-md px-3 py-1.5', selected ? 'bg-white text-leaf-900 shadow-sm' : 'text-earth-600 hover:text-leaf-800')
            )}>
            
            {item.icon}
            {item.label}
            {typeof item.count === 'number' &&
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 font-mono text-[11px] font-semibold',
                selected ? 'bg-leaf-100 text-leaf-800' : 'bg-earth-100 text-earth-600'
              )}>
              
                {item.count}
              </span>
            }
          </button>);

      })}
    </div>);

}