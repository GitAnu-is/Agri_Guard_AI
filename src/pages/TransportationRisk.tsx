import React, { useState } from 'react';
import { DownloadIcon, MapIcon, TruckIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PredictionStages, type PredictionStage } from '../components/PredictionStages';
import { AIProcessingAnimation } from '../components/AIProcessingAnimation';
import { XAIExplanation } from '../components/XAIExplanation';
import { MapView } from '../components/MapView';
import { InfoGrid } from '../components/InfoGrid';
import { Button, LinkButton } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Input, Select } from '../components/ui/Input';
import { Gauge, ProgressBar } from '../components/ui/Progress';
import { Alert, DemoDataNotice, ErrorState } from '../components/ui/Feedback';
import { RiskBadge, DemoBadge } from '../components/ui/Badge';
import {
  cropMaturities,
  cropSensitivities,
  defaultTransportInput,
  mockTransportRisk,
  packagingMaterials,
  packagingTypes,
  roadConditions,
  storageConditions,
  vehicleTypes } from
'../data/mockTransportationData';
import { supportedCrops } from '../data/mockCrops';
import { transportService } from '../services/transportService';
import { useToast } from '../contexts/ToastContext';
import { inverseScoreTone } from '../utils/semantics';
import type { CropName, TransportInput, TransportRiskResult } from '../types';

const stages = [
'Validating consignment and route inputs',
'Encoding categorical logistics features',
'Running the damage probability model',
'Computing SHAP risk contributions',
'Selecting the packaging intervention'];


export function TransportationRisk() {
  const { toast } = useToast();
  const [input, setInput] = useState<TransportInput>(defaultTransportInput);
  const [stage, setStage] = useState<PredictionStage>('input');
  const [result, setResult] = useState<TransportRiskResult | null>(null);
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState<{distanceKm?: string;durationHours?: string;}>({});

  const set = <K extends keyof TransportInput,>(key: K, value: TransportInput[K]) => setInput((prev) => ({ ...prev, [key]: value }));

  const predict = async () => {
    const next: typeof errors = {};
    if (!input.distanceKm || input.distanceKm <= 0) next.distanceKm = 'Enter a distance greater than zero';
    if (!input.durationHours || input.durationHours <= 0) next.durationHours = 'Enter a travel duration greater than zero';
    setErrors(next);
    if (Object.keys(next).length > 0) {
      toast({ title: 'Check the highlighted fields', variant: 'error' });
      return;
    }

    setFailed(false);
    setStage('processing');
    setResult(null);
    try {
      const response = await transportService.predictRisk(input);
      setResult(response);
      setStage('recommendation');
    } catch {
      setFailed(true);
      setStage('input');
    }
  };

  const positives = result?.factors.filter((f) => f.contribution > 0) ?? [];
  const negatives = result?.factors.filter((f) => f.contribution < 0) ?? [];
  const routePoints = result?.route ?? mockTransportRisk.route;

  return (
    <div className="mx-auto max-w-[1300px]">
      <PageHeader
        title="Transportation Risk Prediction"
        description="Predicts the probability of transit damage for a consignment from route, vehicle, environment, crop and packaging features, and explains which factors drive the risk."
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Post-harvest AI' }, { label: 'Transportation Risk' }]}
        meta={<PredictionStages current={stage} />} />
      

      <div className="grid gap-4 xl:grid-cols-[380px_1fr]">
        <Card as="div" className="h-fit">
          <CardHeader title="Consignment inputs" description="Route, environment, crop condition and packaging." />
          <CardBody className="space-y-5">
            <fieldset>
              <legend className="mb-3 text-[12px] font-bold uppercase tracking-wide text-earth-500">Crop</legend>
              <div className="grid grid-cols-2 gap-3">
                <Select label="Crop" wrapperClassName="col-span-2" options={supportedCrops.map((c) => ({ value: c, label: c }))} value={input.crop} onChange={(e) => set('crop', e.target.value as CropName)} />
                <Select label="Crop sensitivity" options={cropSensitivities.map((c) => ({ value: c, label: c }))} value={input.cropSensitivity} onChange={(e) => set('cropSensitivity', e.target.value)} />
                <Select label="Crop maturity" options={cropMaturities.map((c) => ({ value: c, label: c }))} value={input.cropMaturity} onChange={(e) => set('cropMaturity', e.target.value)} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-[12px] font-bold uppercase tracking-wide text-earth-500">Transportation</legend>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Origin" wrapperClassName="col-span-2" value={input.origin} onChange={(e) => set('origin', e.target.value)} />
                <Input label="Destination" wrapperClassName="col-span-2" value={input.destination} onChange={(e) => set('destination', e.target.value)} />
                <Input label="Distance" type="number" unit="km" required value={input.distanceKm} onChange={(e) => set('distanceKm', Number(e.target.value))} error={errors.distanceKm} />
                <Input label="Travel duration" type="number" step="0.5" unit="hrs" required value={input.durationHours} onChange={(e) => set('durationHours', Number(e.target.value))} error={errors.durationHours} />
                <Select label="Vehicle type" wrapperClassName="col-span-2" options={vehicleTypes.map((v) => ({ value: v, label: v }))} value={input.vehicleType} onChange={(e) => set('vehicleType', e.target.value)} />
                <Select label="Road condition" wrapperClassName="col-span-2" options={roadConditions.map((r) => ({ value: r, label: r }))} value={input.roadCondition} onChange={(e) => set('roadCondition', e.target.value)} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-[12px] font-bold uppercase tracking-wide text-earth-500">Environment</legend>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Temperature" type="number" unit="°C" value={input.temperature} onChange={(e) => set('temperature', Number(e.target.value))} />
                <Input label="Humidity" type="number" unit="%" value={input.humidity} onChange={(e) => set('humidity', Number(e.target.value))} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-[12px] font-bold uppercase tracking-wide text-earth-500">Packaging &amp; storage</legend>
              <div className="grid gap-3">
                <Select label="Packaging type" options={packagingTypes.map((p) => ({ value: p, label: p }))} value={input.packagingType} onChange={(e) => set('packagingType', e.target.value)} />
                <Select label="Packaging material" options={packagingMaterials.map((p) => ({ value: p, label: p }))} value={input.packagingMaterial} onChange={(e) => set('packagingMaterial', e.target.value)} />
                <Select label="Storage condition" options={storageConditions.map((p) => ({ value: p, label: p }))} value={input.storageCondition} onChange={(e) => set('storageCondition', e.target.value)} />
              </div>
            </fieldset>

            <div className="flex gap-2">
              <Button variant="ai" fullWidth onClick={predict} loading={stage === 'processing'}>
                <TruckIcon className="h-4 w-4" aria-hidden="true" />
                Predict risk
              </Button>
              <Button variant="secondary" onClick={() => setInput(defaultTransportInput)}>
                Reset
              </Button>
            </div>
            <DemoDataNotice />
          </CardBody>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader
              title="Route"
              description={`${input.origin} → ${input.destination} · ${input.distanceKm} km · ${input.durationHours} hrs`}
              icon={<MapIcon className="h-4 w-4 text-sky-600" aria-hidden="true" />} />
            
            <CardBody className="px-3 py-3">
              <MapView
                center={[7.02, 79.93]}
                zoom={10}
                height={300}
                route={routePoints.map((r) => [r.lat, r.lng] as [number, number])}
                points={routePoints.map((r, i) => ({
                  id: `${r.name}-${i}`,
                  name: r.name,
                  lat: r.lat,
                  lng: r.lng,
                  tone: i === 0 ? 'leaf' : i === routePoints.length - 1 ? 'xai' : 'harvest',
                  label: r.name,
                  popup:
                  <div className="text-[12px] leading-5">
                      <p className="font-semibold text-leaf-900">{r.name}</p>
                      <p>{r.note}</p>
                    </div>

                }))} />
              
            </CardBody>
          </Card>

          {failed &&
          <Card>
              <ErrorState onRetry={predict} />
            </Card>
          }

          {stage === 'processing' && <AIProcessingAnimation stages={stages} title="Predicting transit damage probability" />}

          {stage === 'input' && !failed && !result &&
          <Card>
              <CardBody className="flex flex-col items-center justify-center px-6 py-14 text-center">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-earth-200 bg-earth-50 text-harvest-600">
                  <TruckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-[15px] font-semibold text-leaf-900">No risk prediction yet</h3>
                <p className="mt-1 max-w-md text-[13px] leading-5 text-earth-600">
                  Enter the consignment details on the left and run the prediction. The output responds to distance, road condition, packaging and
                  storage so you can compare scenarios during the demonstration.
                </p>
                <Button className="mt-5" variant="secondary" onClick={predict}>
                  Predict with the default consignment
                </Button>
              </CardBody>
            </Card>
          }

          {result && stage !== 'processing' &&
          <>
              <Card>
                <CardHeader title="Risk prediction result" description={`Model: ${result.modelUsed}`} action={<DemoBadge />} />
                <CardBody className="grid gap-6 lg:grid-cols-[260px_1fr]">
                  <div className="flex flex-col items-center justify-center">
                    <Gauge
                    value={result.damageProbability}
                    tone={inverseScoreTone(result.damageProbability)}
                    status={`${result.riskLevel} risk`}
                    caption="Predicted damage probability for this consignment" />
                  
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-earth-500">Damage probability</p>
                    <div className="mt-1 flex items-baseline gap-3">
                      <span className="font-mono text-[40px] font-bold leading-none text-leaf-900">{result.damageProbability}%</span>
                      <RiskBadge level={result.riskLevel} />
                    </div>
                    <InfoGrid
                    className="mt-5"
                    columns={2}
                    items={[
                    { label: 'Crop', value: input.crop },
                    { label: 'Vehicle', value: input.vehicleType },
                    { label: 'Road condition', value: input.roadCondition },
                    { label: 'Packaging', value: input.packagingType },
                    { label: 'Storage condition', value: input.storageCondition },
                    { label: 'Crop maturity', value: input.cropMaturity }]
                    } />
                  
                  </div>
                </CardBody>
              </Card>

              <div className="grid gap-4 xl:grid-cols-2">
                <Card>
                  <CardHeader title="Risk factors" description="Ranked contribution of each factor to the predicted probability." />
                  <CardBody className="space-y-3">
                    {positives.map((f) =>
                  <div key={f.feature}>
                        <ProgressBar value={Math.abs(f.contribution) * 4} tone="risk" label={f.feature} height="sm" />
                        <div className="mt-1 flex items-baseline justify-between gap-3">
                          <p className="text-[12px] text-earth-600">{f.note}</p>
                          <span className="font-mono text-[12px] font-bold text-risk-700">+{f.contribution}%</span>
                        </div>
                      </div>
                  )}
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader title="Risk-reducing factors" description="Factors that lower the predicted probability for this consignment." />
                  <CardBody className="space-y-3">
                    {negatives.map((f) =>
                  <div key={f.feature}>
                        <ProgressBar value={Math.abs(f.contribution) * 8} tone="sky" label={f.feature} height="sm" />
                        <div className="mt-1 flex items-baseline justify-between gap-3">
                          <p className="text-[12px] text-earth-600">{f.note}</p>
                          <span className="font-mono text-[12px] font-bold text-sky-700">{f.contribution}%</span>
                        </div>
                      </div>
                  )}
                    <div className="rounded-lg border border-earth-200 bg-earth-50 px-4 py-3">
                      <p className="text-[12px] font-semibold text-earth-700">Overall contribution</p>
                      <p className="mt-1 text-[13px] leading-5 text-earth-700">
                        Risk-increasing factors total{' '}
                        <span className="font-mono font-bold text-risk-700">
                          +{positives.reduce((sum, f) => sum + f.contribution, 0)}%
                        </span>{' '}
                        against{' '}
                        <span className="font-mono font-bold text-sky-700">
                          {negatives.reduce((sum, f) => sum + f.contribution, 0)}%
                        </span>{' '}
                        from mitigating factors.
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <XAIExplanation
              question={`Why is transportation risk ${result.riskLevel.toLowerCase()}?`}
              explanation={result.explanation}
              features={result.factors}
              modelUsed={result.modelUsed}
              positiveLabel="Increases damage risk"
              negativeLabel="Reduces damage risk" />
            

              <Alert variant="warning" title="Recommended intervention">
                Packaging is the largest controllable factor in this prediction. Open the Smart Packaging Recommendation to see the specified
                packaging for {input.crop} and its estimated damage reduction.
              </Alert>

              <div className="flex flex-wrap gap-2">
                <LinkButton to="/packaging">View packaging recommendation</LinkButton>
                <LinkButton to="/storage" variant="secondary">
                  Storage &amp; handling guidance
                </LinkButton>
                <Button
                variant="ghost"
                onClick={() => {
                  setStage('saved');
                  toast({ title: 'Report saved', description: 'Transportation Risk Report added to Reports & Analytics.' });
                }}>
                
                  <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                  Save report
                </Button>
              </div>
            </>
          }
        </div>
      </div>
    </div>);

}