import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { toneClasses, type Tone } from '../../utils/semantics';

export function ProgressBar({
  value,
  tone = 'leaf',
  label,
  showValue = false,
  height = 'md',
  className







}: {value: number;tone?: Tone;label?: string;showValue?: boolean;height?: 'sm' | 'md' | 'lg';className?: string;}) {
  const clamped = Math.max(0, Math.min(100, value));
  const heights = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' };
  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) &&
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
          {label && <span className="text-[13px] font-medium text-earth-700">{label}</span>}
          {showValue && <span className="font-mono text-[13px] font-semibold text-leaf-900">{clamped}%</span>}
        </div>
      }
      <div
        className={cn('w-full overflow-hidden rounded-full bg-earth-100', heights[height])}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}>
        
        <motion.div
          className={cn('h-full rounded-full', toneClasses[tone].bg)}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }} />
        
      </div>
    </div>);

}

export function CircularProgress({
  value,
  size = 132,
  thickness = 10,
  tone = 'leaf',
  caption,
  status







}: {value: number;size?: number;thickness?: number;tone?: Tone;caption?: string;status?: string;}) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f2ede5" strokeWidth={thickness} />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={toneClasses[tone].fill}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} />
          
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-bold tabular-nums text-leaf-900">{clamped}%</span>
          {status && <span className={cn('text-[11px] font-semibold', toneClasses[tone].text)}>{status}</span>}
        </div>
      </div>
      {caption && <p className="mt-2 text-center text-xs text-earth-600">{caption}</p>}
    </div>);

}

/** Semi-circular risk / readiness gauge with labelled bands. */
export function Gauge({
  value,
  tone = 'leaf',
  status,
  bands = ['Low', 'Medium', 'High'],
  caption






}: {value: number;tone?: Tone;status?: string;bands?: string[];caption?: string;}) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = 88;
  const cx = 110;
  const cy = 104;
  const arcLength = Math.PI * radius;
  const offset = arcLength * (1 - clamped / 100);
  const needleAngle = -180 + clamped / 100 * 180;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 220, height: 124 }}>
        <svg width={220} height={124} aria-hidden="true">
          <path d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`} fill="none" stroke="#f2ede5" strokeWidth={16} strokeLinecap="round" />
          <motion.path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke={toneClasses[tone].fill}
            strokeWidth={16}
            strokeLinecap="round"
            strokeDasharray={arcLength}
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} />
          
          <motion.line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - radius + 22}
            stroke="#194632"
            strokeWidth={3}
            strokeLinecap="round"
            style={{ originX: `${cx}px`, originY: `${cy}px` }}
            initial={{ rotate: -90 }}
            animate={{ rotate: needleAngle + 90 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} />
          
          <circle cx={cx} cy={cy} r={5} fill="#194632" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <span className="font-mono text-[26px] font-bold leading-none tabular-nums text-leaf-900">{clamped}%</span>
          {status && <span className={cn('mt-1 text-xs font-semibold uppercase tracking-wide', toneClasses[tone].text)}>{status}</span>}
        </div>
      </div>
      <div className="mt-2 flex w-full max-w-[220px] justify-between text-[11px] font-medium text-earth-500">
        {bands.map((b) =>
        <span key={b}>{b}</span>
        )}
      </div>
      {caption && <p className="mt-2 max-w-xs text-center text-xs text-earth-600">{caption}</p>}
    </div>);

}