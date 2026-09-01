import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, XIcon } from 'lucide-react';

type ToastVariant = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (toast: {title: string;description?: string;variant?: ToastVariant;}) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2Icon className="h-4 w-4 text-leaf-600" aria-hidden="true" />,
  error: <AlertTriangleIcon className="h-4 w-4 text-risk-600" aria-hidden="true" />,
  info: <InfoIcon className="h-4 w-4 text-sky-600" aria-hidden="true" />
};

export function ToastProvider({ children }: {children: React.ReactNode;}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, variant = 'success' }: {title: string;description?: string;variant?: ToastVariant;}) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, title, description, variant }]);
      window.setTimeout(() => dismiss(id), 4200);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0" role="region" aria-label="Notifications">
        <AnimatePresence>
          {toasts.map((t) =>
          <motion.div
            key={t.id}
            className="pointer-events-auto flex items-start gap-3 rounded-xl border border-earth-200 bg-white px-4 py-3 shadow-lift"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
            
              <span className="mt-0.5 shrink-0">{icons[t.variant]}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-leaf-900">{t.title}</p>
                {t.description && <p className="mt-0.5 text-[13px] leading-5 text-earth-600">{t.description}</p>}
              </div>
              <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="rounded p-1 text-earth-400 transition-colors duration-150 ease-out hover:bg-earth-100 hover:text-leaf-900">
              
                <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>);

}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}