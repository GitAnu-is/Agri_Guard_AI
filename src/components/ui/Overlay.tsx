import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

const EASE = [0.23, 1, 0.32, 1] as const;

function useEscapeKey(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md'








}: {open: boolean;onClose: () => void;title: string;description?: string;children: React.ReactNode;footer?: React.ReactNode;size?: 'sm' | 'md' | 'lg' | 'xl';}) {
  useEscapeKey(open, onClose);
  const widths = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center">
          <motion.div
          className="fixed inset-0 bg-leaf-900/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          onClick={onClose} />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={cn('relative z-10 w-full rounded-xl border border-earth-200 bg-white shadow-lift', widths[size])}
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 6 }}
          transition={{ duration: 0.24, ease: EASE }}>
          
            <div className="flex items-start justify-between gap-4 border-b border-earth-200 px-5 py-4">
              <div>
                <h2 className="text-base font-semibold text-leaf-900">{title}</h2>
                {description && <p className="mt-0.5 text-[13px] text-earth-600">{description}</p>}
              </div>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded-lg p-1.5 text-earth-500 transition-colors duration-150 ease-out hover:bg-earth-100 hover:text-leaf-900">
              
                <XIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto px-5 py-4 scroll-thin">{children}</div>
            {footer && <div className="flex items-center justify-end gap-3 border-t border-earth-200 px-5 py-3">{footer}</div>}
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  side = 'right',
  width = 'max-w-md'









}: {open: boolean;onClose: () => void;title: string;description?: string;children: React.ReactNode;footer?: React.ReactNode;side?: 'left' | 'right';width?: string;}) {
  useEscapeKey(open, onClose);
  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50">
          <motion.div
          className="absolute inset-0 bg-leaf-900/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          onClick={onClose} />
        
          <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={cn('absolute inset-y-0 flex w-full flex-col bg-white shadow-lift', width, side === 'right' ? 'right-0' : 'left-0')}
          initial={{ x: side === 'right' ? '100%' : '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: side === 'right' ? '100%' : '-100%' }}
          transition={{ duration: 0.28, ease: EASE }}>
          
            <div className="flex items-start justify-between gap-4 border-b border-earth-200 px-5 py-4">
              <div>
                <h2 className="text-base font-semibold text-leaf-900">{title}</h2>
                {description && <p className="mt-0.5 text-[13px] text-earth-600">{description}</p>}
              </div>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close panel"
              className="rounded-lg p-1.5 text-earth-500 transition-colors duration-150 ease-out hover:bg-earth-100 hover:text-leaf-900">
              
                <XIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 scroll-thin">{children}</div>
            {footer && <div className="flex items-center justify-end gap-3 border-t border-earth-200 px-5 py-3">{footer}</div>}
          </motion.aside>
        </div>
      }
    </AnimatePresence>);

}

export function Tooltip({ label, children, className }: {label: string;children: React.ReactNode;className?: string;}) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}>
      
      {children}
      <AnimatePresence>
        {open &&
        <motion.span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 w-max max-w-xs -translate-x-1/2 rounded-md bg-leaf-900 px-2.5 py-1.5 text-xs font-medium leading-4 text-white shadow-lift"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 2 }}
          transition={{ duration: 0.14, ease: EASE }}>
          
            {label}
          </motion.span>
        }
      </AnimatePresence>
    </span>);

}

export function Dropdown({
  trigger,
  children,
  align = 'right',
  className





}: {trigger: (props: {open: boolean;toggle: () => void;}) => React.ReactNode;children: React.ReactNode;align?: 'left' | 'right';className?: string;}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  useEscapeKey(open, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      {trigger({ open, toggle: () => setOpen((v) => !v) })}
      <AnimatePresence>
        {open &&
        <motion.div
          className={cn(
            'absolute top-full z-40 mt-2 min-w-[200px] overflow-hidden rounded-xl border border-earth-200 bg-white py-1 shadow-lift',
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
          initial={{ opacity: 0, scale: 0.97, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -2 }}
          transition={{ duration: 0.16, ease: EASE }}
          onClick={() => setOpen(false)}>
          
            {children}
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}

export function DropdownItem({
  children,
  onClick,
  icon,
  tone = 'default'





}: {children: React.ReactNode;onClick?: () => void;icon?: React.ReactNode;tone?: 'default' | 'danger';}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] font-medium transition-colors duration-150 ease-out',
        tone === 'danger' ? 'text-risk-700 hover:bg-risk-50' : 'text-earth-700 hover:bg-earth-50 hover:text-leaf-900'
      )}>
      
      {icon}
      {children}
    </button>);

}