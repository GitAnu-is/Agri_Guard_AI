import React, { useMemo, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { EmptyState, LoadingState } from './Feedback';

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
  /** Hide on small screens to keep mobile tables readable. */
  hideBelow?: 'sm' | 'md' | 'lg';
}

export function DataTable<T extends {id: string;}>({
  columns,
  rows,
  onRowClick,
  pageSize = 8,
  loading = false,
  emptyTitle = 'No records found',
  emptyDescription = 'Adjust the filters above to widen the result set.',
  caption









}: {columns: Column<T>[];rows: T[];onRowClick?: (row: T) => void;pageSize?: number;loading?: boolean;emptyTitle?: string;emptyDescription?: string;caption: string;}) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visible = useMemo(() => rows.slice((safePage - 1) * pageSize, safePage * pageSize), [rows, safePage, pageSize]);

  const hideClass = (hideBelow?: 'sm' | 'md' | 'lg') =>
  hideBelow === 'sm' ? 'hidden sm:table-cell' : hideBelow === 'md' ? 'hidden md:table-cell' : hideBelow === 'lg' ? 'hidden lg:table-cell' : '';

  if (loading) return <LoadingState label="Loading records…" rows={5} />;
  if (rows.length === 0) return <EmptyState title={emptyTitle} description={emptyDescription} />;

  return (
    <div>
      <div className="overflow-x-auto scroll-thin">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-earth-200 bg-earth-50/70">
              {columns.map((c) =>
              <th
                key={c.key}
                scope="col"
                className={cn(
                  'whitespace-nowrap px-4 py-2.5 text-[12px] font-semibold uppercase tracking-wide text-earth-600',
                  c.align === 'right' ? 'text-right' : c.align === 'center' ? 'text-center' : 'text-left',
                  hideClass(c.hideBelow)
                )}>
                
                  {c.header}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) =>
            <tr
              key={row.id}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              onKeyDown={
              onRowClick ?
              (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onRowClick(row);
                }
              } :
              undefined
              }
              className={cn(
                'border-b border-earth-100 last:border-0',
                onRowClick && 'cursor-pointer transition-colors duration-150 ease-out hover:bg-leaf-50/60'
              )}>
              
                {columns.map((c) =>
              <td
                key={c.key}
                className={cn(
                  'px-4 py-3 align-middle text-[13px] text-earth-800',
                  c.align === 'right' ? 'text-right' : c.align === 'center' ? 'text-center' : 'text-left',
                  hideClass(c.hideBelow),
                  c.className
                )}>
                
                    {c.render(row)}
                  </td>
              )}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pageCount > 1 &&
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-earth-200 px-4 py-3">
          <p className="text-xs text-earth-600">
            Showing <span className="font-semibold text-leaf-900">{(safePage - 1) * pageSize + 1}</span>–
            <span className="font-semibold text-leaf-900">{Math.min(safePage * pageSize, rows.length)}</span> of{' '}
            <span className="font-semibold text-leaf-900">{rows.length}</span>
          </p>
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            aria-label="Previous page"
            className="rounded-lg border border-earth-200 p-1.5 text-earth-600 transition-colors duration-150 ease-out hover:bg-earth-50 disabled:opacity-40">
            
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            {Array.from({ length: pageCount }).map((_, i) =>
          <button
            key={i}
            type="button"
            onClick={() => setPage(i + 1)}
            aria-current={safePage === i + 1 ? 'page' : undefined}
            className={cn(
              'h-8 min-w-8 rounded-lg px-2 font-mono text-[13px] font-semibold transition-colors duration-150 ease-out',
              safePage === i + 1 ? 'bg-leaf-700 text-white' : 'text-earth-600 hover:bg-earth-100'
            )}>
            
                {i + 1}
              </button>
          )}
            <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={safePage === pageCount}
            aria-label="Next page"
            className="rounded-lg border border-earth-200 p-1.5 text-earth-600 transition-colors duration-150 ease-out hover:bg-earth-50 disabled:opacity-40">
            
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>
        </div>
      }
    </div>);

}