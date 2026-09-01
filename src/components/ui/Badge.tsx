import React from 'react';
import { SparklesIcon } from 'lucide-react';
import type { AlertPriority, QualityGrade, RiskLevel, SeverityLevel } from '../../types';
import { cn } from '../../utils/cn';
import { gradeTone, priorityTone, riskTone, severityTone, type Tone } from '../../utils/semantics';

const toneStyles: Record<Tone, string> = {
  leaf: 'bg-leaf-50 text-leaf-800 border-leaf-200',
  harvest: 'bg-harvest-50 text-harvest-800 border-harvest-200',
  risk: 'bg-risk-50 text-risk-800 border-risk-200',
  sky: 'bg-sky-50 text-sky-800 border-sky-200',
  xai: 'bg-xai-50 text-xai-800 border-xai-200',
  earth: 'bg-earth-100 text-earth-800 border-earth-200'
};

export function Badge({
  tone = 'earth',
  children,
  className,
  icon,
  size = 'md'






}: {tone?: Tone;children: React.ReactNode;className?: string;icon?: React.ReactNode;size?: 'sm' | 'md';}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-semibold',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        toneStyles[tone],
        className
      )}>
      
      {icon}
      {children}
    </span>);

}

export function RiskBadge({ level, size }: {level: RiskLevel;size?: 'sm' | 'md';}) {
  return (
    <Badge tone={riskTone(level)} size={size}>
      {level} risk
    </Badge>);

}

export function SeverityBadge({ level, size }: {level: SeverityLevel;size?: 'sm' | 'md';}) {
  return (
    <Badge tone={severityTone(level)} size={size}>
      {level === 'None' ? 'No severity' : `${level} severity`}
    </Badge>);

}

export function ConfidenceBadge({ value, size }: {value: number;size?: 'sm' | 'md';}) {
  return (
    <Badge tone="xai" size={size} icon={<SparklesIcon className="h-3 w-3" aria-hidden="true" />}>
      {value.toFixed(1)}% confidence
    </Badge>);

}

export function GradeBadge({ grade, label, size }: {grade: QualityGrade;label?: string;size?: 'sm' | 'md';}) {
  return (
    <Badge tone={gradeTone(grade)} size={size}>
      Grade {grade}
      {label ? ` · ${label}` : ''}
    </Badge>);

}

export function PriorityBadge({ priority, size }: {priority: AlertPriority;size?: 'sm' | 'md';}) {
  return (
    <Badge tone={priorityTone(priority)} size={size}>
      {priority}
    </Badge>);

}

export function StatusBadge({ status, size }: {status: string;size?: 'sm' | 'md';}) {
  const tone: Tone =
  status === 'Active' || status === 'Treated' || status === 'Reviewed' || status === 'Healthy' ?
  'leaf' :
  status === 'Pending' || status === 'Pending Review' || status === 'At Risk' || status === 'In Training' ?
  'harvest' :
  status === 'Disabled' || status === 'Diseased' ?
  'risk' :
  'earth';
  return (
    <Badge tone={tone} size={size}>
      {status}
    </Badge>);

}

/** Marks any figure on screen as demonstration data rather than a validated result. */
export function DemoBadge({ label = 'Sample data' }: {label?: string;}) {
  return (
    <span className="inline-flex items-center gap-1 rounded border border-dashed border-earth-300 bg-earth-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-earth-600">
      {label}
    </span>);

}