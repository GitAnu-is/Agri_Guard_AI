import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BoxIcon, DownloadIcon, ShieldCheckIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PredictionStages, type PredictionStage } from '../components/PredictionStages';
import { AIProcessingAnimation } from '../components/AIProcessingAnimation';
import { ImageUploader } from '../components/ImageUploader';
import { DefectOverlay } from '../components/DefectOverlay';
import { InfoGrid } from '../components/InfoGrid';
import { Button, LinkButton } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { ChartCard } from '../components/ui/ChartCard';
import { Select } from '../components/ui/Input';
import { CircularProgress, ProgressBar } from '../components/ui/Progress';
import { Alert, DemoDataNotice, EmptyState, ErrorState } from '../components/ui/Feedback';
import { ConfidenceBadge, DemoBadge, GradeBadge } from '../components/ui/Badge';
import { qualityGradeMeta, defectSummary } from '../data/mockQualityData';
import { supportedCrops } from '../data/mockCrops';
import { images } from '../data/images';
import { qualityService } from '../services/qualityService';
import { useToast } from '../contexts/ToastContext';
import { chartColors, gradeTone, toneClasses } from '../utils/semantics';
import { cn } from '../utils/cn';
import type { CropName, QualityAssessment } from '../types';

const stages = [
'Analyzing harvested crop image…',
'Detecting surface defects…',
'Scoring quality factors…',
'Assigning quality grade…',
'Generating explanation…'];


const axisStyle = { fontSize: 12, fill: chartColors.axis };
const tooltipStyle = { borderRadius: 10, border: '1px solid #e3d9c9', fontSize: 12 };

export function HarvestQuality() {
  const { toast } = useToast();
  const [crop, setCrop] = useState<CropName>('Banana');
  const [image, setImage] = useState<string | null>(null);
  const [stage, setStage] = useState<PredictionStage>('input');
  const [result, setResult] = useState<QualityAssessment | null>(null);
  const [failed, setFailed] = useState(false);

  const assess = async () => {
    if (!image) {
      toast({ title: 'Upload or capture a harvested crop image first', variant: 'error' });
      return;
    }
    setFailed(false);
    setStage('processing');
    setResult(null);
    try {
      const response = await qualityService.assess(crop, image);
      setResult(response);
      setStage('recommendation');
    } catch {
      setFailed(true);
      setStage('input');
    }
  };

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        title="AI Harvest Quality Assessment"
        description="Grades harvested produce A–D, localises surface defects with a detection model, and passes the result into market readiness and shelf-life estimation."
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Post-harvest AI' }, { label: 'Harvest Quality' }]}
        actions={
        <LinkButton to="/market-readiness" variant="secondary">
            Market readiness
          </LinkButton>
        }
        meta={<PredictionStages current={stage} />} />
      

      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <Card as="div" className="h-fit">
          <CardHeader title="Capture" description="Upload an image of the harvested consignment on a plain background." />
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
            
            <ImageUploader
              value={image}
              onChange={(value) => {
                setImage(value);
                setResult(null);
                setStage('input');
              }}
              onAnalyze={assess}
              analyzing={stage === 'processing'}
              label="Upload or capture a harvested crop image"
              hint="An even, well-lit shot on a plain background gives the clearest defect localisation in this demo."
              analyzeLabel="Assess quality"
              sampleUrl={images.harvestedBanana}
              sampleLabel="Use sample harvest image" />
            

            <div className="rounded-lg border border-earth-200 bg-earth-50 px-4 py-3">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-earth-500">Quality categories</p>
              <ul className="mt-2 space-y-2">
                {qualityGradeMeta.map((g) =>
                <li key={g.grade} className="flex items-start gap-2">
                    <span className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-[11px] font-bold', toneClasses[gradeTone(g.grade)].softBg, toneClasses[gradeTone(g.grade)].text)}>
                      {g.grade}
                    </span>
                    <span className="text-[12px] leading-4 text-earth-700">
                      <span className="font-semibold text-leaf-900">{g.label}</span> · score {g.range}. {g.description}
                    </span>
                  </li>
                )}
              </ul>
            </div>
            <DemoDataNotice />
          </CardBody>
        </Card>

        <div className="space-y-4">
          {failed &&
          <Card>
              <ErrorState onRetry={assess} />
            </Card>
          }

          {stage === 'processing' && <AIProcessingAnimation stages={stages} title="Assessing harvest quality" />}

          {stage === 'input' && !failed && !result &&
          <Card>
              <EmptyState
              title="No consignment assessed yet"
              description="Upload a harvested crop image to receive a quality grade, defect localisation and a market readiness handover."
              icon={<ShieldCheckIcon className="h-5 w-5" aria-hidden="true" />}
              action={
              <Button variant="secondary" onClick={() => setImage(images.harvestedBanana)}>
                    Load the sample harvest image
                  </Button>
              } />
            
            </Card>
          }

          {result && stage !== 'processing' &&
          <>
              <Card>
                <CardHeader title="Quality assessment result" description={`Model: ${result.modelUsed}`} action={<DemoBadge />} />
                <CardBody className="grid gap-6 lg:grid-cols-[220px_1fr]">
                  <div className="flex flex-col items-center gap-3">
                    <CircularProgress value={result.qualityScore} tone={gradeTone(result.grade)} status={`Grade ${result.grade}`} size={150} />
                    <GradeBadge grade={result.grade} label={result.gradeLabel} />
                    <ConfidenceBadge value={result.confidence} />
                  </div>
                  <div>
                    <InfoGrid
                    columns={2}
                    items={[
                    { label: 'Crop', value: result.crop },
                    { label: 'Quality grade', value: `${result.grade} · ${result.gradeLabel}` },
                    { label: 'Quality score', value: `${result.qualityScore}%` },
                    { label: 'Defect status', value: result.defectStatus },
                    { label: 'Defect count', value: `${result.defects.length} detected` },
                    { label: 'Confidence', value: `${result.confidence}%` }]
                    } />
                  
                    <div className="mt-5 space-y-2.5">
                      {result.factors.map((f) =>
                    <ProgressBar key={f.label} value={f.value} tone={f.value >= 85 ? 'leaf' : f.value >= 70 ? 'harvest' : 'risk'} label={f.label} showValue height="sm" />
                    )}
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader
                title="Defect detection"
                description="Bounding boxes, labels and per-defect confidence from the detection model. Hover a label to isolate its box."
                icon={<BoxIcon className="h-4 w-4 text-risk-600" aria-hidden="true" />} />
              
                <CardBody className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-earth-500">Original crop</p>
                    <div className="overflow-hidden rounded-xl border border-earth-200 bg-earth-900">
                      <img src={result.imageUrl} alt={`Harvested ${result.crop} submitted for grading`} className="aspect-square w-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-earth-500">Detected defects</p>
                    <DefectOverlay imageUrl={result.defectImageUrl} defects={result.defects} alt={`Defect detection overlay on harvested ${result.crop}`} />
                  </div>
                </CardBody>
                <CardBody className="border-t border-earth-200">
                  <h4 className="text-[13px] font-semibold uppercase tracking-wide text-earth-500">Defect summary</h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                    {defectSummary.map((d) =>
                  <div key={d.label} className="rounded-lg border border-earth-200 px-3 py-2.5">
                        <p className="text-[12px] font-semibold text-leaf-900">{d.label}</p>
                        <p className="mt-1 font-mono text-lg font-bold text-earth-800">{d.count}</p>
                        <p className="text-[11px] text-earth-500">
                          {d.severity} · {d.impact} impact
                        </p>
                      </div>
                  )}
                  </div>
                </CardBody>
              </Card>

              <ChartCard title="Quality factor breakdown" description="Contribution of each graded factor to the overall quality score." height={280}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.factors} layout="vertical" margin={{ top: 8, right: 24, bottom: 4, left: 40 }}>
                    <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
                    <YAxis type="category" dataKey="label" tick={axisStyle} axisLine={false} tickLine={false} width={120} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18}>
                      {result.factors.map((f) =>
                    <Cell key={f.label} fill={f.value >= 85 ? chartColors.leaf : f.value >= 70 ? chartColors.harvest : chartColors.risk} />
                    )}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <Alert variant="info" title="Workflow position">
                Harvest Quality → Defect Detection → Market Readiness → Shelf Life → Storage Recommendation. Continue to Market Readiness to see
                the shelf-life estimate for this grade.
              </Alert>

              <div className="flex flex-wrap gap-2">
                <Button
                onClick={() => {
                  setStage('saved');
                  toast({ title: 'Report saved', description: 'Harvest Quality Report added to Reports & Analytics.' });
                }}>
                
                  <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                  Save report
                </Button>
                <LinkButton to="/market-readiness" variant="secondary">
                  Continue to market readiness
                </LinkButton>
              </div>
            </>
          }
        </div>
      </div>
    </div>);

}