import React from 'react';
import { ActivityIcon } from 'lucide-react';
import type { DiseaseResult } from '../../types';
import { cn } from '../../utils/cn';
import { severityTone, toneClasses } from '../../utils/semantics';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { ConfidenceBadge, DemoBadge, SeverityBadge, StatusBadge } from '../ui/Badge';
import { ProgressBar } from '../ui/Progress';
import { InfoGrid } from '../InfoGrid';

const bands: DiseaseResult['severity'][] = ['Low', 'Medium', 'High'];

export function DiseaseResultPanel({ result }: {result: DiseaseResult;}) {
  const tone = severityTone(result.severity);

  return (
    <Card>
      <CardHeader
        title="Diagnosis result"
        description={`Model: ${result.modelUsed}`}
        icon={<ActivityIcon className="h-4 w-4 text-risk-600" aria-hidden="true" />}
        action={<DemoBadge />} />
      
      <CardBody className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <InfoGrid
            columns={2}
            items={[
            { label: 'Crop', value: result.crop },
            { label: 'Health', value: <span className={result.health === 'Diseased' ? 'text-risk-700' : 'text-leaf-700'}>{result.health}</span> },
            { label: 'Disease', value: result.disease },
            { label: 'Analysed', value: result.date }]
            } />
          
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <SeverityBadge level={result.severity} />
            <ConfidenceBadge value={result.confidence} />
            <StatusBadge status={result.status} />
          </div>

          <div className="mt-5">
            <h4 className="text-[13px] font-semibold uppercase tracking-wide text-earth-500">Observed symptoms</h4>
            <ul className="mt-2 space-y-1.5">
              {result.symptoms.map((s) =>
              <li key={s} className="flex gap-2 text-[13px] leading-5 text-earth-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-risk-400" aria-hidden="true" />
                  {s}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div>
          <h4 className="text-[13px] font-semibold uppercase tracking-wide text-earth-500">Severity</h4>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={cn('text-[32px] font-bold leading-none', toneClasses[tone].text)}>{result.severity}</span>
            <span className="text-[13px] text-earth-600">severity band</span>
          </div>

          <div className="mt-4 flex gap-1.5" role="img" aria-label={`Severity meter showing ${result.severity}`}>
            {bands.map((band) => {
              const reached = bands.indexOf(result.severity) >= bands.indexOf(band);
              const bandTone = severityTone(band);
              return (
                <div key={band} className="flex-1">
                  <div className={cn('h-2.5 rounded-full', reached ? toneClasses[bandTone].bg : 'bg-earth-100')} />
                  <p className={cn('mt-1.5 text-[11px] font-semibold', reached ? toneClasses[bandTone].text : 'text-earth-400')}>{band}</p>
                </div>);

            })}
          </div>

          <div className="mt-5">
            <ProgressBar value={result.infectedPercentage} tone={tone} label="Infected leaf area" showValue />
          </div>

          <div className={cn('mt-5 rounded-lg border px-4 py-3', toneClasses[tone].border, toneClasses[tone].softBg)}>
            <h4 className={cn('text-[13px] font-semibold', toneClasses[tone].text)}>Risk assessment</h4>
            <p className="mt-1 text-[13px] leading-6 text-earth-700">{result.risk}</p>
          </div>
        </div>
      </CardBody>
    </Card>);

}