import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, Loader2Icon, SparklesIcon } from 'lucide-react';
import { cn } from '../utils/cn';

/**
 * Staged progress indicator shown while a mock inference request is in flight.
 * Each stage advances on a timer so the pipeline is legible during a demo.
 */
export function AIProcessingAnimation({
  stages,
  title = 'Running inference',
  subtitle = 'Mock inference pipeline — no trained model is connected.',
  stageDuration = 700





}: {stages: string[];title?: string;subtitle?: string;stageDuration?: number;}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => prev < stages.length - 1 ? prev + 1 : prev);
    }, stageDuration);
    return () => window.clearInterval(timer);
  }, [stages.length, stageDuration]);

  return (
    <div className="rounded-xl border border-xai-200 bg-xai-50/60 p-6">
      <div className="flex items-center gap-3">
        <span className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-xai-600 text-white">
          <SparklesIcon className="h-5 w-5" aria-hidden="true" />
          <motion.span
            className="absolute inset-0 rounded-lg border-2 border-xai-400"
            animate={{ opacity: [0.7, 0.1, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }} />
          
        </span>
        <div>
          <p className="text-[15px] font-semibold text-xai-900">{title}</p>
          <p className="text-[13px] text-xai-800/80">{subtitle}</p>
        </div>
      </div>

      <ol className="mt-5 space-y-2.5" aria-live="polite">
        {stages.map((stage, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <li key={stage} className="flex items-center gap-3">
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold',
                  done ? 'bg-leaf-600 text-white' : current ? 'bg-xai-600 text-white' : 'bg-white text-earth-400 ring-1 ring-earth-200'
                )}>
                
                {done ? <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> : current ? <Loader2Icon className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> : i + 1}
              </span>
              <span className={cn('text-[13px]', done ? 'text-earth-600' : current ? 'font-semibold text-xai-900' : 'text-earth-400')}>{stage}</span>
            </li>);

        })}
      </ol>

      <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white">
        <motion.div
          className="h-full rounded-full bg-xai-600"
          animate={{ width: `${(active + 1) / stages.length * 100}%` }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} />
        
      </div>
    </div>);

}