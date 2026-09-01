import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ClockIcon, StoreIcon, TruckIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { InfoGrid } from '../components/InfoGrid';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { ChartCard } from '../components/ui/ChartCard';
import { Select } from '../components/ui/Input';
import { LinkButton } from '../components/ui/Button';
import { CircularProgress, ProgressBar } from '../components/ui/Progress';
import { Alert, DemoDataNotice, LoadingState } from '../components/ui/Feedback';
import { Badge, DemoBadge } from '../components/ui/Badge';
import { supportedCrops } from '../data/mockCrops';
import { qualityService } from '../services/qualityService';
import { chartColors, scoreTone } from '../utils/semantics';
import type { CropName, MarketReadiness, StorageRecommendation } from '../types';

const axisStyle = { fontSize: 12, fill: chartColors.axis };
const tooltipStyle = { borderRadius: 10, border: '1px solid #e3d9c9', fontSize: 12 };

export function MarketReadinessPage() {
  const [crop, setCrop] = useState<CropName>('Banana');
  const [result, setResult] = useState<MarketReadiness | null>(null);
  const [storage, setStorage] = useState<StorageRecommendation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([qualityService.marketReadiness(crop), qualityService.storage(crop)]).then(([readiness, store]) => {
      if (!active) return;
      setResult(readiness);
      setStorage(store);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [crop]);

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        title="Market Readiness Prediction"
        description="Estimates how ready a graded consignment is for market, how long it will hold quality, and when it should be dispatched."
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Post-harvest AI' }, { label: 'Market Readiness' }]}
        actions={
        <div className="w-44">
            <Select
            label="Crop"
            options={supportedCrops.map((c) => ({ value: c, label: c }))}
            value={crop}
            onChange={(e) => setCrop(e.target.value as CropName)} />
          
          </div>
        } />
      

      {loading || !result || !storage ?
      <Card>
          <LoadingState label="Estimating market readiness and shelf life…" rows={6} />
        </Card> :

      <div className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Card>
              <CardHeader title="Readiness result" description={`Model: ${result.modelUsed}`} action={<DemoBadge />} />
              <CardBody className="grid gap-6 sm:grid-cols-[200px_1fr]">
                <div className="flex flex-col items-center gap-3">
                  <CircularProgress value={result.score} tone={scoreTone(result.score)} status={result.level === 'Ready for Market' ? 'Ready' : 'Hold'} size={150} />
                  <Badge tone={scoreTone(result.score)}>{result.level}</Badge>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[34px] font-bold leading-none text-leaf-900">{result.shelfLifeDays}</span>
                    <span className="text-[13px] font-medium text-earth-600">
                      {crop === 'Black Pepper' ? 'days (dried storage estimate)' : 'days estimated shelf life'}
                    </span>
                  </div>
                  <InfoGrid
                  className="mt-5"
                  columns={2}
                  items={[
                  { label: 'Market readiness', value: `${result.score}%` },
                  { label: 'Readiness level', value: result.level },
                  { label: 'Recommended storage', value: result.recommendedStorage },
                  { label: 'Recommended market timing', value: result.recommendedTiming }]
                  } />
                
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Recommended action" icon={<TruckIcon className="h-4 w-4 text-harvest-600" aria-hidden="true" />} />
              <CardBody className="space-y-4">
                <p className="rounded-lg border border-harvest-200 bg-harvest-50 px-4 py-3 text-[14px] font-semibold leading-6 text-harvest-900">
                  {result.action}
                </p>
                <div>
                  <h4 className="text-[13px] font-semibold uppercase tracking-wide text-earth-500">Storage conditions</h4>
                  <InfoGrid
                  className="mt-3"
                  columns={2}
                  items={[
                  { label: 'Temperature', value: storage.temperature },
                  { label: 'Humidity', value: storage.humidity },
                  { label: 'Ventilation', value: storage.ventilation },
                  { label: 'Duration', value: storage.duration }]
                  } />
                
                </div>
                <LinkButton to="/storage" variant="secondary" fullWidth>
                  Full storage recommendation
                </LinkButton>
              </CardBody>
            </Card>
          </div>

          <ChartCard
          title="Shelf-life timeline"
          description="Projected quality decline under the recommended storage conditions. The marker shows the end of the marketable window."
          height={300}>
          
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.shelfLife} margin={{ top: 8, right: 20, bottom: 4, left: -12 }}>
                <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis domain={[30, 100]} tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={tooltipStyle} formatter={(value: number, _name, entry) => [`${value}% · ${entry.payload.phase}`, 'Quality']} />
                <ReferenceLine y={55} stroke={chartColors.risk} strokeDasharray="5 5" label={{ value: 'End of marketable quality', fontSize: 11, fill: chartColors.risk, position: 'insideTopRight' }} />
                <Area type="monotone" dataKey="quality" stroke={chartColors.leaf} fill={chartColors.leaf} fillOpacity={0.14} strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <Card>
            <CardHeader
            title="Quality factors behind the score"
            description="Each factor is scored independently; the lowest scores are the levers with the most headroom."
            icon={<StoreIcon className="h-4 w-4 text-leaf-600" aria-hidden="true" />} />
          
            <CardBody className="space-y-3.5">
              {result.factors.map((f) =>
            <div key={f.label}>
                  <ProgressBar value={f.value} tone={scoreTone(f.value)} label={f.label} showValue height="sm" />
                  <p className="mt-1 text-[12px] text-earth-600">{f.note}</p>
                </div>
            )}
            </CardBody>
          </Card>

          <Alert variant="info" title="Workflow position">
            Market Readiness sits between Harvest Quality and Storage Recommendation. The shelf-life estimate also constrains the acceptable
            transportation window on the Transportation Risk page.
          </Alert>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[13px] text-earth-600">
              <ClockIcon className="h-4 w-4" aria-hidden="true" />
              Estimates assume the recommended storage conditions are maintained throughout.
            </span>
          </div>

          <DemoDataNotice />
        </div>
      }
    </div>);

}