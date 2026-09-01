import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { cn } from '../utils/cn';

export interface Crumb {
  label: string;
  to?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  meta,
  className







}: {title: string;description: string;breadcrumbs: Crumb[];actions?: React.ReactNode;meta?: React.ReactNode;className?: string;}) {
  return (
    <header className={cn('mb-6', className)}>
      <nav aria-label="Breadcrumb" className="mb-2">
        <ol className="flex flex-wrap items-center gap-1 text-[12px] text-earth-500">
          {breadcrumbs.map((crumb, i) =>
          <li key={`${crumb.label}-${i}`} className="flex items-center gap-1">
              {crumb.to ?
            <Link to={crumb.to} className="font-medium transition-colors duration-150 ease-out hover:text-leaf-700">
                  {crumb.label}
                </Link> :

            <span className="font-semibold text-earth-700">{crumb.label}</span>
            }
              {i < breadcrumbs.length - 1 && <ChevronRightIcon className="h-3 w-3 text-earth-300" aria-hidden="true" />}
            </li>
          )}
        </ol>
      </nav>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-[26px] font-bold leading-8 tracking-tight text-leaf-900">{title}</h1>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-earth-600">{description}</p>
          {meta && <div className="mt-3 flex flex-wrap items-center gap-2">{meta}</div>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>);

}