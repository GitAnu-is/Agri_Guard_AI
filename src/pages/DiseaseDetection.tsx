import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DownloadIcon, HistoryIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PredictionStages, type PredictionStage } from '../components/PredictionStages';
import { AIProcessingAnimation } from '../components/AIProcessingAnimation';
import { ImageUploader } from '../components/ImageUploader';
import { GradCAMViewer } from '../components/GradCAMViewer';
import { DiseaseResultPanel } from '../components/disease/DiseaseResultPanel';
import { TreatmentPanel } from '../components/disease/TreatmentPanel';
import { Button, LinkButton } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Select } from '../components/ui/Input';
import { Alert, DemoDataNotice, EmptyState, ErrorState } from '../components/ui/Feedback';
import { Badge } from '../components/ui/Badge';
import { diseasesByCrop } from '../data/mockDiseaseResults';
import { images } from '../data/images';
import { supportedCrops } from '../data/mockCrops';
import { diseaseService } from '../services/diseaseService';
import { useToast } from '../contexts/ToastContext';
import type { CropName, DiseaseResult } from '../types';

const stages = ['Analyzing crop image…', 'Detecting disease…', 'Estimating severity…', 'Generating explanation…'];

export function DiseaseDetection() {
  const { toast } = useToast();
  const [crop, setCrop] = useState<CropName>('Banana');
  const [image, setImage] = useState<string | null>(null);
  const [stage, setStage] = useState<PredictionStage>('input');
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [failed, setFailed] = useState(false);

  const analyze = async () => {
    if (!image) {
      toast({ title: 'Upload or capture an image first', variant: 'error' });
      return;
    }
    setFailed(false);
    setStage('processing');
    setResult(null);
    try {
      const response = await diseaseService.predict(crop, image);
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
        title="AI Plant Disease Detection"
        description="Classifies leaf images into crop-specific diseases, estimates severity and infected area, and explains the prediction with a Grad-CAM attention map."
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Pre-harvest AI' }, { label: 'Disease Detection' }]}
        actions={
        <LinkButton to="/disease-history" variant="secondary">
            <HistoryIcon className="h-4 w-4" aria-hidden="true" />
            Diagnosis history
          </LinkButton>
        }
        meta={<PredictionStages current={stage} />} />
      

      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <Card as="div" className="h-fit">
          <CardHeader title="Capture" description="Select the crop, then upload, drag and drop, or capture a leaf image." />
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
              }}
              hint={`Detectable in scope: ${diseasesByCrop[crop].join(', ')}.`} />
            

            <ImageUploader
              value={image}
              onChange={(value) => {
                setImage(value);
                setResult(null);
                setStage('input');
              }}
              onAnalyze={analyze}
              analyzing={stage === 'processing'}
              sampleUrl={images.diseasedBananaLeaf}
              sampleLabel="Use sample leaf image" />
            

            <div className="rounded-lg border border-earth-200 bg-earth-50 px-4 py-3">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-earth-500">Diseases in research scope</p>
              <ul className="mt-2 space-y-1.5">
                {supportedCrops.map((c) =>
                <li key={c} className="text-[12px] leading-5 text-earth-700">
                    <span className="font-semibold text-leaf-900">{c}:</span> {diseasesByCrop[c].join(', ')}
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
              <ErrorState onRetry={analyze} />
            </Card>
          }

          {stage === 'processing' && <AIProcessingAnimation stages={stages} title="Analyzing crop image" />}

          {stage === 'input' && !failed && !result &&
          <Card>
              <EmptyState
              title="No image analysed yet"
              description="Upload or capture a leaf image on the left. On a phone, the camera button opens the rear camera directly for field use."
              action={
              <Button variant="secondary" onClick={() => setImage(images.diseasedBananaLeaf)}>
                    Load the sample banana leaf
                  </Button>
              } />
            
            </Card>
          }

          {result && stage !== 'processing' &&
          <>
              <DiseaseResultPanel result={result} />
              <GradCAMViewer
              originalUrl={result.imageUrl}
              heatmapUrl={result.gradcamUrl}
              maskUrl={result.maskUrl}
              confidence={result.confidence}
              explanation={result.explanation}
              infectedPercentage={result.infectedPercentage} />
            
              <TreatmentPanel result={result} />

              <Alert variant="info" title="Workflow position">
                Disease Detection → Severity Assessment → Treatment Recommendation. Each diagnosis is written to{' '}
                <Link to="/disease-history" className="font-semibold underline">
                  Disease History
                </Link>{' '}
                for monitoring over time.
              </Alert>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                onClick={() => {
                  setStage('saved');
                  toast({ title: 'Report saved', description: 'Disease Detection Report added to Reports & Analytics.' });
                }}>
                
                  <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                  Save report
                </Button>
                <Button
                variant="secondary"
                onClick={() => {
                  setImage(null);
                  setResult(null);
                  setStage('input');
                }}>
                
                  Analyse another image
                </Button>
                <Badge tone="earth" size="sm">
                  Diagnosis {result.id}
                </Badge>
              </div>
            </>
          }
        </div>
      </div>
    </div>);

}