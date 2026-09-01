import React, { useState } from 'react';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CalendarClockIcon, DownloadIcon, SproutIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PredictionStages, type PredictionStage } from '../components/PredictionStages';
import { AIProcessingAnimation } from '../components/AIProcessingAnimation';
import { XAIExplanation } from '../components/XAIExplanation';
import { Timeline, type TimelineStep } from '../components/ui/Timeline';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { ChartCard } from '../components/ui/ChartCard';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Gauge } from '../components/ui/Progress';
import { Alert, DemoDataNotice, ErrorState } from '../components/ui/Feedback';
import { Badge, RiskBadge } from '../components/ui/Badge';
import { InfoGrid } from '../components/InfoGrid';
import { maturityIndicators } from '../data/mockHarvestData';
import { supportedCrops } from '../data/mockCrops';
import { harvestService } from '../services/harvestService';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../contexts/ToastContext';
import { chartColors, riskTone } from '../utils/semantics';
import type { CropName, HarvestPrediction, Season } from '../types';

const seasons: Season[] = ['Yala', 'Maha', 'Inter-monsoon'];
const maturityOptions = ['Immature', 'Approaching maturity', 'Mature green', 'Breaking / turning', 'Fully ripe'];
const axisStyle = { fontSize: 12, fill: chartColors.axis };
const tooltipStyle = { borderRadius: 10, border: '1px solid #e3d9c9', fontSize: 12 };

const stages = [
'Loading crop maturity indicators',
'Assembling historical weather sequence',
'Merging current conditions and forecast',
'Running the harvest-time forecast model',
'Deriving the optimal harvest window'];


export function HarvestPlanning() {
  const { activeFarm } = useApp();
  const { toast } = useToast();
  const [crop, setCrop] = useState<CropName>(activeFarm.currentCrop);
  const [form, setForm] = useState({
    cropAge: String(activeFarm.cropAgeMonths),
    maturity: 'Breaking / turning',
    temperature: String(activeFarm.environment.temperature),
    rainfall: String(activeFarm.environment.rainfall),
    humidity: String(activeFarm.environment.humidity),
    season: activeFarm.environment.season as string
  });
  const [stage, setStage] = useState<PredictionStage>('input');
  const [result, setResult] = useState<HarvestPrediction | null>(null);
  const [failed, setFailed] = useState(false);

  const predict = async () => {
    setFailed(false);
    setStage('processing');
    setResult(null);
    try {
      const response = await harvestService.predict({
        crop,
        cropAgeMonths: Number(form.cropAge),
        maturity: form.maturity,
        temperature: Number(form.temperature),
        rainfall: Number(form.rainfall),
        humidity: Number(form.humidity),
        season: form.season
      });
      setResult(response);
      setStage('recommendation');
    } catch {
      setFailed(true);
      setStage('input');
    }
  };

  const timelineSteps: TimelineStep[] =
  result?.timeline.map((t) => ({
    label: t.stage,
    detail: t.range,
    state: t.state
  })) ?? [];

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        title="Harvest Planning"
        description="Predicts the optimal harvesting period from crop maturity and historical, current and forecast weather, then flags the weather risk around that window."
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Pre-harvest AI' }, { label: 'Harvest Planning' }]}
        meta={<PredictionStages current={stage} />} />
      

      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <Card as="div" className="h-fit">
          <CardHeader title="Prediction inputs" description="Crop maturity and weather features used by the forecasting model." />
          <CardBody className="space-y-4">
            <Select
              label="Crop type"
              required
              options={supportedCrops.map((c) => ({ value: c, label: c }))}
              value={crop}
              onChange={(e) => {
                setCrop(e.target.value as CropName);
                setResult(null);
                setStage('input');
              }} />
            
            <Input label="Crop age" type="number" unit="months" required value={form.cropAge} onChange={(e) => setForm({ ...form, cropAge: e.target.value })} />
            <Select
              label="Crop maturity indicator"
              options={maturityOptions.map((m) => ({ value: m, label: m }))}
              value={form.maturity}
              onChange={(e) => setForm({ ...form, maturity: e.target.value })} />
            
            <div className="grid grid-cols-2 gap-3">
              <Input label="Temperature" type="number" unit="°C" value={form.temperature} onChange={(e) => setForm({ ...form, temperature: e.target.value })} />
              <Input label="Rainfall" type="number" unit="mm" value={form.rainfall} onChange={(e) => setForm({ ...form, rainfall: e.target.value })} />
              <Input label="Humidity" type="number" unit="%" value={form.humidity} onChange={(e) => setForm({ ...form, humidity: e.target.value })} />
              <Select label="Season" options={seasons.map((s) => ({ value: s, label: s }))} value={form.season} onChange={(e) => setForm({ ...form, season: e.target.value })} />
            </div>

            <div className="rounded-lg border border-earth-200 bg-earth-50 px-4 py-3">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-earth-500">Recorded maturity indicators</p>
              <dl className="mt-2 space-y-1.5">
                {maturityIndicators.map((m) =>
                <div key={m.label} className="flex justify-between gap-3 text-[12px]">
                    <dt className="text-earth-600">{m.label}</dt>
                    <dd className="font-semibold text-leaf-900">{m.value}</dd>
                  </div>
                )}
              </dl>
            </div>

            <Button variant="ai" fullWidth onClick={predict} loading={stage === 'processing'}>
              <CalendarClockIcon className="h-4 w-4" aria-hidden="true" />
              Predict harvest window
            </Button>
            <DemoDataNotice />
          </CardBody>
        </Card>

        <div className="space-y-4">
          {failed &&
          <Card>
              <ErrorState onRetry={predict} />
            </Card>
          }

          {stage === 'processing' && <AIProcessingAnimation stages={stages} title="Predicting the optimal harvest window" />}

          {stage === 'input' && !failed && !result &&
          <Card>
              <CardBody className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-earth-200 bg-earth-50 text-harvest-600">
                  <SproutIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-[15px] font-semibold text-leaf-900">No prediction yet</h3>
                <p className="mt-1 max-w-md text-[13px] leading-5 text-earth-600">
                  Confirm the crop, age and maturity indicators, then run the prediction to see the optimal harvest date, harvest window,
                  readiness score and the weather risk around it.
                </p>
                <Button className="mt-5" variant="secondary" onClick={predict}>
                  Predict for {crop}
                </Button>
              </CardBody>
            </Card>
          }

          {result && stage !== 'processing' &&
          <>
              <Card>
                <CardHeader title="Harvest prediction" description={`Model: ${result.modelUsed}`} />
                <CardBody className="grid gap-6 lg:grid-cols-[1fr_240px]">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-harvest-700">Optimal harvest date</p>
                    <h2 className="mt-1 text-[28px] font-bold leading-8 tracking-tight text-leaf-900">{result.optimalHarvestDate}</h2>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge tone="harvest">
                        Window {result.harvestWindow.start} – {result.harvestWindow.end}
                      </Badge>
                      <RiskBadge level={result.weatherRisk} />
                    </div>
                    <p className="mt-4 text-[13px] leading-6 text-earth-700">{result.recommendation}</p>
                    <InfoGrid
                    className="mt-5"
                    columns={2}
                    items={[
                    { label: 'Readiness status', value: result.readinessStatus },
                    { label: 'Readiness score', value: `${result.readinessScore}%` },
                    { label: 'Crop', value: result.crop },
                    { label: 'Weather risk', value: result.weatherRisk }]
                    } />
                  
                  </div>
                  <div className="flex items-center justify-center">
                    <Gauge
                    value={result.readinessScore}
                    tone={result.readinessScore >= 80 ? 'harvest' : result.readinessScore >= 50 ? 'sky' : 'leaf'}
                    status={result.readinessStatus}
                    bands={['Growing', 'Maturing', 'Ready']}
                    caption={`Harvest readiness: ${result.readinessScore}%`} />
                  
                  </div>
                </CardBody>
              </Card>

              <div className="grid gap-4 xl:grid-cols-2">
                <Card>
                  <CardHeader title="Crop calendar" description="Growth stages, the predicted optimal window and the late-harvest risk period." />
                  <CardBody>
                    <Timeline steps={timelineSteps} />
                  </CardBody>
                </Card>

                <div className="space-y-4">
                  <ChartCard title="7-day weather forecast" description="Temperature, rainfall and humidity across the harvest window." height={280}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={result.forecast} margin={{ top: 8, right: 12, bottom: 4, left: -16 }}>
                        <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="left" tick={axisStyle} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="right" orientation="right" tick={axisStyle} axisLine={false} tickLine={false} unit="mm" />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Bar yAxisId="right" dataKey="rainfall" name="Rainfall (mm)" fill={chartColors.sky} radius={[4, 4, 0, 0]} barSize={22} />
                        <Line yAxisId="left" type="monotone" dataKey="temperature" name="Temp (°C)" stroke={chartColors.harvest} strokeWidth={2.5} dot={false} />
                        <Area yAxisId="left" type="monotone" dataKey="humidity" name="Humidity (%)" stroke={chartColors.leafLight} fill={chartColors.leafLight} fillOpacity={0.1} strokeWidth={2} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ChartCard>

                  <Card>
                    <CardHeader title="Harvest alerts" />
                    <CardBody className="space-y-2.5">
                      {result.alerts.map((alert) =>
                    <Alert key={alert} variant={alert.toLowerCase().includes('rain') ? 'warning' : 'info'}>
                          {alert}
                        </Alert>
                    )}
                    </CardBody>
                  </Card>
                </div>
              </div>

              <XAIExplanation
              question="What drove this harvest window?"
              explanation={`Crop age and the recorded maturity indicators account for just over half of the readiness score. Forecast rainfall and humidity pull the safe window earlier, which is why the model recommends harvesting before ${result.harvestWindow.end}.`}
              features={result.shap}
              modelUsed={result.modelUsed}
              positiveLabel="Advances readiness"
              negativeLabel="Delays or narrows the window" />
            

              <div className="flex flex-wrap gap-2">
                <Button
                onClick={() => {
                  setStage('saved');
                  toast({ title: 'Report saved', description: 'Harvest Prediction Report added to Reports & Analytics.' });
                }}>
                
                  <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                  Save report
                </Button>
                <Button variant="secondary" onClick={predict}>
                  Re-run prediction
                </Button>
              </div>
            </>
          }
        </div>
      </div>
    </div>);

}