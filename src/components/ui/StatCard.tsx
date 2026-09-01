import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { toneClasses, type Tone } from '../../utils/semantics';
import { ProgressBar } from './Progress';

export interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  caption?: string;
  tone?: Tone;
  icon?: React.ReactNode;
  progress?: number;
  trend?: {value: string;direction: 'up' | 'down';good: boolean;};
  to?: string;
  badge?: React.ReactNode;
}

export function StatCard({ label, value, unit, caption, tone = 'leaf', icon, progress, trend, to, badge }: StatCardProps) {
  const t = toneClasses[tone];
  const body =
  <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', t.softBg, t.text)}>{icon}</span>
          <p className="text-[13px] font-medium text-earth-600">{label}</p>
        </div>
        {badge}
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-[26px] font-bold leading-none tracking-tight text-leaf-900">{value}</span>
        {unit && <span className="text-sm font-medium text-earth-500">{unit}</span>}
      </div>
      {typeof progress === 'number' && <ProgressBar value={progress} tone={tone} height="sm" className="mt-3" />}
      <div className="mt-2 flex items-center justify-between gap-2">
        {caption && <p className="text-xs leading-4 text-earth-600">{caption}</p>}
        {trend &&
      <span
        className={cn(
          'inline-flex shrink-0 items-center gap-1 text-xs font-semibold',
          trend.good ? 'text-leaf-700' : 'text-risk-700'
        )}>
        
            {trend.direction === 'up' ?
        <TrendingUpIcon className="h-3.5 w-3.5" aria-hidden="true" /> :

        <TrendingDownIcon className="h-3.5 w-3.5" aria-hidden="true" />
        }
            {trend.value}
          </span>
      }
      </div>
    </>;


  const shell = 'flex h-full flex-col rounded-xl border border-earth-200 bg-white p-4 shadow-card';

  if (!to) return <div className={shell}>{body}</div>;

  return (
    <Link
      to={to}
      className={cn(
        shell,
        'group transition-[box-shadow,border-color] duration-150 ease-out hover:border-leaf-300 hover:shadow-lift'
      )}>
      
      {body}
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-leaf-700">
        View details
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>);

}