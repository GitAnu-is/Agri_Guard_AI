import React from 'react';
import { AlertTriangleIcon, CheckCircle2Icon, InboxIcon, InfoIcon, Loader2Icon, RefreshCwIcon, XCircleIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'ai';

const alertStyles: Record<AlertVariant, {wrap: string;icon: React.ReactNode;}> = {
  info: { wrap: 'border-sky-200 bg-sky-50 text-sky-900', icon: <InfoIcon className="h-4 w-4 text-sky-600" aria-hidden="true" /> },
  success: { wrap: 'border-leaf-200 bg-leaf-50 text-leaf-900', icon: <CheckCircle2Icon className="h-4 w-4 text-leaf-600" aria-hidden="true" /> },
  warning: { wrap: 'border-harvest-200 bg-harvest-50 text-harvest-900', icon: <AlertTriangleIcon className="h-4 w-4 text-harvest-600" aria-hidden="true" /> },
  danger: { wrap: 'border-risk-200 bg-risk-50 text-risk-900', icon: <XCircleIcon className="h-4 w-4 text-risk-600" aria-hidden="true" /> },
  ai: { wrap: 'border-xai-200 bg-xai-50 text-xai-900', icon: <InfoIcon className="h-4 w-4 text-xai-600" aria-hidden="true" /> }
};

export function Alert({
  variant = 'info',
  title,
  children,
  action,
  className






}: {variant?: AlertVariant;title?: string;children?: React.ReactNode;action?: React.ReactNode;className?: string;}) {
  const style = alertStyles[variant];
  return (
    <div role="status" className={cn('flex items-start gap-3 rounded-lg border px-4 py-3', style.wrap, className)}>
      <span className="mt-0.5 shrink-0">{style.icon}</span>
      <div className="min-w-0 flex-1">
        {title && <p className="text-[13px] font-semibold">{title}</p>}
        {children && <div className="text-[13px] leading-5 opacity-90">{children}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>);

}

export function Skeleton({ className }: {className?: string;}) {
  return (
    <div className={cn('relative overflow-hidden rounded-md bg-earth-100', className)}>
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>);

}

export function LoadingState({ label = 'Loading…', rows = 3 }: {label?: string;rows?: number;}) {
  return (
    <div className="p-5" aria-busy="true" aria-live="polite">
      <p className="mb-4 flex items-center gap-2 text-[13px] font-medium text-earth-600">
        <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />
        {label}
      </p>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) =>
        <Skeleton key={i} className={cn('h-4', i === rows - 1 ? 'w-2/3' : 'w-full')} />
        )}
      </div>
    </div>);

}

export function EmptyState({
  title,
  description,
  action,
  icon





}: {title: string;description?: string;action?: React.ReactNode;icon?: React.ReactNode;}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-earth-200 bg-earth-50 text-earth-500">
        {icon ?? <InboxIcon className="h-5 w-5" aria-hidden="true" />}
      </span>
      <h3 className="text-[15px] font-semibold text-leaf-900">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-[13px] leading-5 text-earth-600">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>);

}

export function ErrorState({
  title = 'Something went wrong',
  description = 'The request could not be completed. This demo runs on mock services, so retrying usually resolves it.',
  onRetry




}: {title?: string;description?: string;onRetry?: () => void;}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center" role="alert">
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-risk-200 bg-risk-50 text-risk-600">
        <AlertTriangleIcon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="text-[15px] font-semibold text-leaf-900">{title}</h3>
      <p className="mt-1 max-w-sm text-[13px] leading-5 text-earth-600">{description}</p>
      {onRetry &&
      <Button variant="secondary" className="mt-5" onClick={onRetry}>
          <RefreshCwIcon className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button>
      }
    </div>);

}

/** Persistent disclaimer used on every prediction surface. */
export function DemoDataNotice({ children, className }: {children?: React.ReactNode;className?: string;}) {
  return (
    <p className={cn('flex items-start gap-2 rounded-lg border border-dashed border-earth-300 bg-earth-50 px-3 py-2 text-xs leading-5 text-earth-700', className)}>
      <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-earth-500" aria-hidden="true" />
      <span>
        {children ??
        'Demonstration output generated from mock services. No trained model is connected to this frontend yet, so these values are sample data and are not validated predictions.'}
      </span>
    </p>);

}