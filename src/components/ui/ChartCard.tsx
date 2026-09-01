import React from 'react';
import { cn } from '../../utils/cn';
import { DemoBadge } from './Badge';

export function ChartCard({
  title,
  description,
  action,
  height = 280,
  children,
  className,
  demo = true,
  footer









}: {title: string;description?: string;action?: React.ReactNode;height?: number;children: React.ReactNode;className?: string;demo?: boolean;footer?: React.ReactNode;}) {
  return (
    <section className={cn('flex flex-col rounded-xl border border-earth-200 bg-white shadow-card', className)}>
      <div className="flex items-start justify-between gap-4 px-5 pb-2 pt-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-semibold text-leaf-900">{title}</h3>
            {demo && <DemoBadge />}
          </div>
          {description && <p className="mt-0.5 max-w-xl text-[13px] leading-5 text-earth-600">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="px-2 pb-3 pt-1" style={{ height }}>
        {children}
      </div>
      {footer && <div className="mt-auto border-t border-earth-200 px-5 py-3 text-xs text-earth-600">{footer}</div>}
    </section>);

}