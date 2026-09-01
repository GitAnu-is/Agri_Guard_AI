import React, { useState } from 'react';
import { ArrowRightIcon, BoxesIcon, PackageCheckIcon, ThermometerIcon, WindIcon } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PageHeader } from '../components/PageHeader';
import { InfoGrid } from '../components/InfoGrid';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { ChartCard } from '../components/ui/ChartCard';
import { Tabs } from '../components/ui/Tabs';
import { ProgressBar } from '../components/ui/Progress';
import { Badge, DemoBadge } from '../components/ui/Badge';
import { Alert, DemoDataNotice } from '../components/ui/Feedback';
import { LinkButton } from '../components/ui/Button';
import { ActionList } from '../components/RecommendationCard';
import { packagingRecommendations, packagingEffectiveness, handlingChecklist } from '../data/mockTransportationData';
import { supportedCrops } from '../data/mockCrops';
import { chartColors } from '../utils/semantics';
import type { CropName } from '../types';

const axisStyle = { fontSize: 12, fill: chartColors.axis };
const tooltipStyle = { borderRadius: 10, border: '1px solid #e3d9c9', fontSize: 12 };

export function Packaging() {
  const [crop, setCrop] = useState<CropName>('Banana');
  const rec = packagingRecommendations.find((p) => p.crop === crop) ?? packagingRecommendations[0];

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        title="Smart Packaging Recommendation"
        description="Packaging specified against the predicted transportation risk for each crop, with the estimated damage reduction over current practice."
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Post-harvest AI' }, { label: 'Packaging' }]}
        meta={<DemoBadge label="Indicative values" />}
        actions={
        <LinkButton to="/transportation-risk" variant="secondary">
            Transportation risk
          </LinkButton>
        } />
      

      <Tabs
        variant="pill"
        className="mb-4 w-fit"
        items={supportedCrops.map((c) => ({ id: c, label: c }))}
        active={crop}
        onChange={(id) => setCrop(id as CropName)} />
      

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader
            title="Recommended packaging"
            description={`Specification for ${crop} on road transport routes.`}
            icon={<PackageCheckIcon className="h-4 w-4 text-leaf-600" aria-hidden="true" />} />
          
          <CardBody>
            <p className="text-[11px] font-bold uppercase tracking-widest text-leaf-700">Recommended</p>
            <h2 className="mt-1 text-[24px] font-bold leading-8 tracking-tight text-leaf-900">{rec.recommended}</h2>
            <InfoGrid
              className="mt-5"
              columns={2}
              items={[
              { label: 'Material', value: rec.material },
              { label: 'Ventilation', value: rec.ventilation },
              { label: 'Cushioning', value: rec.cushioning },
              { label: 'Stacking guidance', value: rec.stacking },
              { label: 'Storage temperature', value: rec.storageTemp, hint: 'Indicative sample value' },
              { label: 'Humidity recommendation', value: rec.humidity, hint: 'Indicative sample value' }]
              } />
            
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge tone="sky" icon={<ThermometerIcon className="h-3 w-3" aria-hidden="true" />}>
                {rec.storageTemp}
              </Badge>
              <Badge tone="leaf" icon={<WindIcon className="h-3 w-3" aria-hidden="true" />}>
                Ventilation: {rec.ventilation}
              </Badge>
              <Badge tone="earth" icon={<BoxesIcon className="h-3 w-3" aria-hidden="true" />}>
                {rec.stacking}
              </Badge>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Current vs AI recommended" description="Predicted damage risk for the same consignment under each option." />
          <CardBody className="space-y-5">
            <div>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <p className="text-[13px] font-semibold text-earth-700">Current packaging</p>
                <span className="text-[12px] text-earth-500">{rec.current.name}</span>
              </div>
              <ProgressBar value={rec.current.damageRisk} tone="risk" showValue />
              <p className="mt-1 text-[12px] text-earth-600">
                Ventilation: {rec.current.ventilation} · Cushioning: {rec.current.cushioning}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <ArrowRightIcon className="h-5 w-5 rotate-90 text-earth-300" aria-hidden="true" />
            </div>

            <div>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <p className="text-[13px] font-semibold text-earth-700">AI recommended packaging</p>
                <span className="text-[12px] text-earth-500">{rec.proposed.name}</span>
              </div>
              <ProgressBar value={rec.proposed.damageRisk} tone="leaf" showValue />
              <p className="mt-1 text-[12px] text-earth-600">
                Ventilation: {rec.proposed.ventilation} · Cushioning: {rec.proposed.cushioning}
              </p>
            </div>

            <div className="rounded-xl border border-leaf-200 bg-leaf-50 px-4 py-4 text-center">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-leaf-700">Estimated damage reduction</p>
              <p className="mt-1 font-mono text-[34px] font-bold leading-none text-leaf-800">{rec.damageReduction}%</p>
              <p className="mt-1.5 text-[12px] text-leaf-800/80">Relative to the current packaging on the same route</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr]">
        <ChartCard title="Packaging effectiveness" description="Mean recorded damage by packaging type across the demo logistics dataset." height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={packagingEffectiveness} margin={{ top: 8, right: 16, bottom: 4, left: -12 }}>
              <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="packaging" tick={{ fontSize: 11, fill: chartColors.axis }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="damage" name="Damage" radius={[6, 6, 0, 0]} barSize={38}>
                {packagingEffectiveness.map((p) =>
                <Cell key={p.packaging} fill={p.damage > 18 ? chartColors.risk : p.damage > 10 ? chartColors.harvest : chartColors.leaf} />
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="space-y-4">
          <Card>
            <CardHeader title="Packaging by crop" description="Specification summary across the research scope." />
            <CardBody className="space-y-3">
              {packagingRecommendations.map((p) =>
              <button
                key={p.crop}
                type="button"
                onClick={() => setCrop(p.crop)}
                className={
                p.crop === crop ?
                'w-full rounded-lg border border-leaf-300 bg-leaf-50 px-3.5 py-3 text-left' :
                'w-full rounded-lg border border-earth-200 px-3.5 py-3 text-left transition-colors duration-150 ease-out hover:border-earth-300'
                }>
                
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[13px] font-semibold text-leaf-900">{p.crop}</span>
                    <span className="font-mono text-[12px] font-bold text-leaf-700">−{p.damageReduction}% damage</span>
                  </span>
                  <span className="mt-1 block text-[12px] leading-4 text-earth-600">{p.recommended}</span>
                </button>
              )}
            </CardBody>
          </Card>

          <ActionList title="Before Transportation" items={handlingChecklist[0].items} tone="leaf" />
        </div>
      </div>

      <Alert variant="info" title="Workflow position" className="mt-4">
        Transportation Data → Risk Prediction → Packaging Recommendation → Storage Recommendation → Handling Recommendation.
      </Alert>
      <DemoDataNotice className="mt-3" />
    </div>);

}