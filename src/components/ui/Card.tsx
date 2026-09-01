import React from 'react';
import { cn } from '../../utils/cn';

export function Card({
  className,
  children,
  as: Tag = 'section'




}: {className?: string;children: React.ReactNode;as?: 'section' | 'div' | 'article' | 'aside';}) {
  return <Tag className={cn('rounded-xl border border-earth-200 bg-white shadow-card', className)}>{children}</Tag>;
}

export function CardHeader({
  title,
  description,
  icon,
  action,
  className






}: {title: React.ReactNode;description?: React.ReactNode;icon?: React.ReactNode;action?: React.ReactNode;className?: string;}) {
  return (
    <div className={cn('flex items-start justify-between gap-4 border-b border-earth-200 px-5 py-4', className)}>
      <div className="flex items-start gap-3">
        {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
        <div>
          <h3 className="text-[15px] font-semibold leading-6 text-leaf-900">{title}</h3>
          {description && <p className="mt-0.5 max-w-2xl text-[13px] leading-5 text-earth-600">{description}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>);

}

export function CardBody({ className, children }: {className?: string;children: React.ReactNode;}) {
  return <div className={cn('px-5 py-4', className)}>{children}</div>;
}

export function CardFooter({ className, children }: {className?: string;children: React.ReactNode;}) {
  return <div className={cn('mt-auto flex items-center gap-3 border-t border-earth-200 px-5 py-3', className)}>{children}</div>;
}