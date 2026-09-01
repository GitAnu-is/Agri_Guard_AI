import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CalendarIcon, SproutIcon } from 'lucide-react';
import type { CropRecord } from '../types';
import { cn } from '../utils/cn';
import { scoreTone, toneClasses } from '../utils/semantics';
import { ProgressBar } from './ui/Progress';
import { RiskBadge, StatusBadge } from './ui/Badge';

export function CropCard({ record }: {record: CropRecord;}) {
  const healthTone = scoreTone(record.healthScore);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-earth-200 bg-white shadow-card">
      <div className="relative h-36 overflow-hidden bg-earth-100">
        <img src={record.imageUrl} alt={`${record.crop} crop at ${record.location}`} className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2 py-1 text-[12px] font-bold text-leaf-900">{record.crop}</span>
        <span className="absolute right-3 top-3">
          <StatusBadge status={record.healthStatus} size="sm" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[13px] leading-5 text-earth-600">{record.status}</p>

        <div className="mt-4 space-y-3">
          <ProgressBar value={record.healthScore} tone={healthTone} label="Crop health" showValue height="sm" />
          <ProgressBar value={record.harvestReadiness} tone="harvest" label="Harvest readiness" showValue height="sm" />
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
          <div>
            <dt className="flex items-center gap-1 text-[12px] text-earth-500">
              <SproutIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Expected yield
            </dt>
            <dd className="mt-0.5 font-semibold text-leaf-900">{record.yieldEstimate}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-[12px] text-earth-500">
              <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Expected harvest
            </dt>
            <dd className="mt-0.5 font-semibold text-leaf-900">
              {new Date(record.expectedHarvest).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <RiskBadge level={record.riskLevel} size="sm" />
          <Link
            to={`/crops/${record.id}`}
            className={cn('group inline-flex items-center gap-1 text-[13px] font-semibold', toneClasses[healthTone].text)}>
            
            Crop detail
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>);

}