import React, { useState } from 'react';
import { BoxesIcon, DropletsIcon, HandIcon, ThermometerIcon, TimerIcon, WindIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { Alert, DemoDataNotice } from '../components/ui/Feedback';
import { Badge } from '../components/ui/Badge';
import { ActionList } from '../components/RecommendationCard';
import { storageRecommendations } from '../data/mockQualityData';
import { handlingChecklist } from '../data/mockTransportationData';
import { supportedCrops } from '../data/mockCrops';
import type { CropName } from '../types';

const cards = [
{ key: 'temperature', label: 'Temperature', icon: <ThermometerIcon className="h-4 w-4" aria-hidden="true" />, tone: 'sky' },
{ key: 'humidity', label: 'Humidity', icon: <DropletsIcon className="h-4 w-4" aria-hidden="true" />, tone: 'sky' },
{ key: 'ventilation', label: 'Ventilation', icon: <WindIcon className="h-4 w-4" aria-hidden="true" />, tone: 'leaf' },
{ key: 'stacking', label: 'Stacking', icon: <BoxesIcon className="h-4 w-4" aria-hidden="true" />, tone: 'earth' },
{ key: 'handling', label: 'Handling', icon: <HandIcon className="h-4 w-4" aria-hidden="true" />, tone: 'harvest' },
{ key: 'duration', label: 'Storage duration', icon: <TimerIcon className="h-4 w-4" aria-hidden="true" />, tone: 'leaf' }] as
const;

const toneMap = {
  sky: 'border-sky-200 bg-sky-50 text-sky-800',
  leaf: 'border-leaf-200 bg-leaf-50 text-leaf-800',
  earth: 'border-earth-200 bg-earth-100 text-earth-800',
  harvest: 'border-harvest-200 bg-harvest-50 text-harvest-800'
};

export function Storage() {
  const [crop, setCrop] = useState<CropName>('Banana');
  const recommendation = storageRecommendations.find((s) => s.crop === crop) ?? storageRecommendations[0];

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        title="Storage Recommendation"
        description="Recommended holding conditions for graded consignments, plus the handling guidelines that protect quality before, during and after transport."
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Post-harvest AI' }, { label: 'Storage' }]}
        meta={<Badge tone="earth">Indicative sample values — not scientifically validated</Badge>} />
      

      <Tabs
        variant="pill"
        className="mb-4 w-fit"
        items={supportedCrops.map((c) => ({ id: c, label: c }))}
        active={crop}
        onChange={(id) => setCrop(id as CropName)} />
      

      <Alert variant="warning" title="Sample values" className="mb-4">
        The temperature, humidity and duration figures below are demonstration values for the research prototype. They are not validated
        post-harvest standards and must be confirmed against Department of Agriculture guidance before operational use.
      </Alert>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) =>
        <article key={card.key} className={`rounded-xl border p-4 ${toneMap[card.tone]}`}>
            <div className="flex items-center gap-2">
              {card.icon}
              <h3 className="text-[13px] font-semibold uppercase tracking-wide">{card.label}</h3>
            </div>
            <p className="mt-2.5 text-[18px] font-bold leading-6 text-leaf-900">{recommendation[card.key]}</p>
          </article>
        )}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {handlingChecklist.map((phase) =>
        <ActionList
          key={phase.phase}
          title={phase.phase}
          items={phase.items}
          tone={phase.phase === 'Before Transportation' ? 'leaf' : phase.phase === 'During Transportation' ? 'harvest' : 'sky'} />

        )}
      </div>

      <Card className="mt-4">
        <CardHeader
          title="Why storage matters to the loss target"
          description="Storage and transportation together account for the largest share of recorded post-harvest loss in the demo dataset." />
        
        <CardBody>
          <p className="text-[13px] leading-6 text-earth-700">
            In the sample loss breakdown, transportation contributes 4.3% and storage 2.2% of total production lost — roughly 42% of the
            measured 15.4% loss figure. Holding {crop.toLowerCase()} at {recommendation.temperature} with {recommendation.humidity} is the
            single cheapest intervention available at the collection point, because it does not require new equipment on the vehicle.
          </p>
          <DemoDataNotice className="mt-4" />
        </CardBody>
      </Card>
    </div>);

}