import React, { useState } from 'react';
import { DownloadIcon, RotateCcwIcon, SproutIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PredictionStages, type PredictionStage } from '../components/PredictionStages';
import { AIProcessingAnimation } from '../components/AIProcessingAnimation';
import { RecommendationResult } from '../components/crop/RecommendationResult';
import { XAIExplanation } from '../components/XAIExplanation';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Input, Select } from '../components/ui/Input';
import { Alert, DemoDataNotice, ErrorState } from '../components/ui/Feedback';
import { cropService } from '../services/cropService';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../contexts/ToastContext';
import type { CropRecommendationResult, Season, SoilType } from '../types';

const soilTypes: SoilType[] = ['Red Yellow Podzolic', 'Reddish Brown Latosolic', 'Alluvial', 'Sandy Loam', 'Clay Loam'];
const seasons: Season[] = ['Yala', 'Maha', 'Inter-monsoon'];

const emptyForm = {
  soilPh: '',
  nitrogen: '',
  phosphorus: '',
  potassium: '',
  soilMoisture: '',
  soilType: soilTypes[0] as string,
  temperature: '',
  rainfall: '',
  humidity: '',
  altitudeM: '',
  location: '',
  season: 'Yala' as string
};

type FormState = typeof emptyForm;

const stages = [
'Validating soil and environmental inputs',
'Normalising the feature vector',
'Running the crop suitability model',
'Scoring all three candidate crops',
'Computing SHAP feature attributions'];


export function CropRecommendation() {
  const { activeFarm } = useApp();
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [stage, setStage] = useState<PredictionStage>('input');
  const [result, setResult] = useState<CropRecommendationResult | null>(null);
  const [failed, setFailed] = useState(false);

  const set = (key: keyof FormState, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const useFarmData = () => {
    const env = activeFarm.environment;
    setForm({
      soilPh: String(env.soilPh),
      nitrogen: String(env.nitrogen),
      phosphorus: String(env.phosphorus),
      potassium: String(env.potassium),
      soilMoisture: String(env.soilMoisture),
      soilType: activeFarm.soilType,
      temperature: String(env.temperature),
      rainfall: String(env.rainfall),
      humidity: String(env.humidity),
      altitudeM: String(activeFarm.altitudeM),
      location: activeFarm.location,
      season: env.season
    });
    setErrors({});
    toast({ title: 'Farm data loaded', description: `${activeFarm.name} readings applied to the form.`, variant: 'info' });
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    const required: (keyof FormState)[] = [
    'soilPh',
    'nitrogen',
    'phosphorus',
    'potassium',
    'soilMoisture',
    'temperature',
    'rainfall',
    'humidity',
    'altitudeM',
    'location'];

    required.forEach((key) => {
      if (!String(form[key]).trim()) next[key] = 'This field is required';
    });
    const ph = Number(form.soilPh);
    if (form.soilPh && (ph < 3 || ph > 10)) next.soilPh = 'Soil pH must be between 3.0 and 10.0';
    const humidity = Number(form.humidity);
    if (form.humidity && (humidity < 0 || humidity > 100)) next.humidity = 'Humidity must be between 0 and 100%';
    const moisture = Number(form.soilMoisture);
    if (form.soilMoisture && (moisture < 0 || moisture > 100)) next.soilMoisture = 'Soil moisture must be between 0 and 100%';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const analyze = async () => {
    if (!validate()) {
      toast({ title: 'Check the highlighted fields', variant: 'error' });
      return;
    }
    setFailed(false);
    setStage('processing');
    setResult(null);
    try {
      const response = await cropService.recommend({
        soilPh: Number(form.soilPh),
        nitrogen: Number(form.nitrogen),
        phosphorus: Number(form.phosphorus),
        potassium: Number(form.potassium),
        soilMoisture: Number(form.soilMoisture),
        temperature: Number(form.temperature),
        rainfall: Number(form.rainfall),
        humidity: Number(form.humidity),
        season: form.season as Season,
        soilType: form.soilType,
        altitudeM: Number(form.altitudeM),
        location: form.location
      });
      setResult(response);
      setStage('recommendation');
    } catch {
      setFailed(true);
      setStage('input');
    }
  };

  const reset = () => {
    setForm(emptyForm);
    setErrors({});
    setResult(null);
    setStage('input');
    setFailed(false);
  };

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        title="AI Crop Recommendation"
        description="Recommends the most suitable crop among Pineapple, Banana and Black Pepper from soil and environmental parameters, and explains why with SHAP feature attributions."
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Pre-harvest AI' }, { label: 'Crop Recommendation' }]}
        actions={
        <>
            <Button variant="secondary" onClick={useFarmData}>
              <SproutIcon className="h-4 w-4" aria-hidden="true" />
              Use current farm data
            </Button>
            <Button variant="ghost" onClick={reset}>
              <RotateCcwIcon className="h-4 w-4" aria-hidden="true" />
              Reset
            </Button>
          </>
        }
        meta={<PredictionStages current={stage} />} />
      

      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <Card as="div" className="h-fit">
          <CardHeader title="Model inputs" description="All fields are required. Values outside the valid range are rejected before inference." />
          <CardBody className="space-y-5">
            <fieldset>
              <legend className="mb-3 text-[12px] font-bold uppercase tracking-wide text-earth-500">Soil</legend>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Soil pH" type="number" step="0.1" required value={form.soilPh} onChange={(e) => set('soilPh', e.target.value)} error={errors.soilPh} />
                <Input label="Soil moisture" type="number" unit="%" required value={form.soilMoisture} onChange={(e) => set('soilMoisture', e.target.value)} error={errors.soilMoisture} />
                <Input label="Nitrogen" type="number" unit="kg/ha" required value={form.nitrogen} onChange={(e) => set('nitrogen', e.target.value)} error={errors.nitrogen} />
                <Input label="Phosphorus" type="number" unit="kg/ha" required value={form.phosphorus} onChange={(e) => set('phosphorus', e.target.value)} error={errors.phosphorus} />
                <Input label="Potassium" type="number" unit="kg/ha" required value={form.potassium} onChange={(e) => set('potassium', e.target.value)} error={errors.potassium} />
                <Select label="Soil type" options={soilTypes.map((s) => ({ value: s, label: s }))} value={form.soilType} onChange={(e) => set('soilType', e.target.value)} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-3 text-[12px] font-bold uppercase tracking-wide text-earth-500">Environment</legend>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Temperature" type="number" unit="°C" required value={form.temperature} onChange={(e) => set('temperature', e.target.value)} error={errors.temperature} />
                <Input label="Rainfall" type="number" unit="mm" required value={form.rainfall} onChange={(e) => set('rainfall', e.target.value)} error={errors.rainfall} />
                <Input label="Humidity" type="number" unit="%" required value={form.humidity} onChange={(e) => set('humidity', e.target.value)} error={errors.humidity} />
                <Input label="Altitude" type="number" unit="m" required value={form.altitudeM} onChange={(e) => set('altitudeM', e.target.value)} error={errors.altitudeM} />
                <Input label="Geographic location" required wrapperClassName="col-span-2" value={form.location} onChange={(e) => set('location', e.target.value)} error={errors.location} />
                <Select label="Season" wrapperClassName="col-span-2" options={seasons.map((s) => ({ value: s, label: s }))} value={form.season} onChange={(e) => set('season', e.target.value)} />
              </div>
            </fieldset>

            <div className="flex gap-2">
              <Button variant="ai" fullWidth onClick={analyze} loading={stage === 'processing'}>
                Analyze
              </Button>
              <Button variant="secondary" onClick={reset}>
                Reset
              </Button>
            </div>
            <DemoDataNotice />
          </CardBody>
        </Card>

        <div>
          {failed &&
          <Card>
              <ErrorState onRetry={analyze} />
            </Card>
          }

          {stage === 'processing' && <AIProcessingAnimation stages={stages} title="Analyzing land suitability" />}

          {stage === 'input' && !failed &&
          <Card className="h-full">
              <CardBody className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-earth-200 bg-earth-50 text-leaf-700">
                  <SproutIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-[15px] font-semibold text-leaf-900">No analysis yet</h3>
                <p className="mt-1 max-w-md text-[13px] leading-5 text-earth-600">
                  Enter your soil and environmental parameters, or load the readings from your registered farm, then run the analysis to see the
                  recommended crop, comparison scores and SHAP explanation.
                </p>
                <Button variant="secondary" className="mt-5" onClick={useFarmData}>
                  Use current farm data
                </Button>
              </CardBody>
            </Card>
          }

          {result && stage !== 'processing' &&
          <div className="space-y-4">
              <RecommendationResult result={result} />
              <XAIExplanation
              question={`Why was ${result.recommendedCrop} recommended?`}
              explanation={result.explanation}
              features={result.shap}
              modelUsed={result.modelUsed}
              positiveLabel="Increases suitability"
              negativeLabel="Reduces suitability" />
            
              <Alert variant="success" title="Next step in the workflow">
                Crop recommendation feeds harvest planning. Open Harvest Planning to predict the optimal harvesting window for{' '}
                {result.recommendedCrop}.
              </Alert>
              <div className="flex flex-wrap gap-2">
                <Button
                onClick={() => {
                  setStage('saved');
                  toast({ title: 'Report saved', description: 'Crop Recommendation Report added to Reports & Analytics.' });
                }}>
                
                  <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                  Save report
                </Button>
                <Button variant="secondary" onClick={reset}>
                  Run another analysis
                </Button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

}