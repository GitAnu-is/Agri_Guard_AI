import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PageHeader } from '../components/PageHeader';
import { InfoGrid } from '../components/InfoGrid';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { ChartCard } from '../components/ui/ChartCard';
import { CircularProgress, ProgressBar } from '../components/ui/Progress';
import { Badge, ConfidenceBadge, GradeBadge, RiskBadge, SeverityBadge, StatusBadge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/Feedback';
import { LinkButton } from '../components/ui/Button';
import { RiskCard } from '../components/RiskCard';
import { mockCropRecords, cropHealthTrend } from '../data/mockCrops';
import { diseaseHistory } from '../data/mockDiseaseResults';
import { mockHarvestPrediction } from '../data/mockHarvestData';
import { mockQualityAssessment } from '../data/mockQualityData';
import { mockTransportRisk } from '../data/mockTransportationData';
import { sevenDayForecast, agriculturalImpact } from '../data/mockWeather';
import { reportDefinitions } from '../data/mockAnalytics';
import { chartColors } from '../utils/semantics';

const tabs = [
{ id: 'overview', label: 'Overview' },
{ id: 'health', label: 'Health' },
{ id: 'weather', label: 'Weather' },
{ id: 'disease', label: 'Disease history' },
{ id: 'harvest', label: 'Harvest prediction' },
{ id: 'quality', label: 'Quality' },
{ id: 'transport', label: 'Transportation' },
{ id: 'reports', label: 'Reports' }];


const axisStyle = { fontSize: 12, fill: chartColors.axis };
const tooltipStyle = { borderRadius: 10, border: '1px solid #e3d9c9', fontSize: 12 };

export function CropDetail() {
  const { cropId } = useParams();
  const [tab, setTab] = useState('overview');
  const record = mockCropRecords.find((r) => r.id === cropId);

  if (!record) {
    return (
      <div className="mx-auto max-w-3xl">
        <EmptyState
          title="Crop record not found"
          description="This crop cycle is not part of the demo dataset."
          action={<LinkButton to="/crops">Back to crop records</LinkButton>} />
        
      </div>);

  }

  const cropDiseases = diseaseHistory.filter((d) => d.crop === record.crop);

  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        title={`${record.crop} — ${record.id}`}
        description={`${record.location}. Consolidated view of every AI component output for this crop cycle.`}
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Crop Records', to: '/crops' }, { label: record.id }]}
        meta={
        <>
            <StatusBadge status={record.healthStatus} />
            <RiskBadge level={record.riskLevel} />
            <Badge tone="earth">{record.cropAgeMonths} months old</Badge>
          </>
        } />
      

      <Tabs items={tabs} active={tab} onChange={setTab} className="mb-5" />

      {tab === 'overview' &&
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <CardHeader title="Cycle summary" />
            <CardBody>
              <InfoGrid
              items={[
              { label: 'Crop', value: record.crop },
              { label: 'Location', value: record.location },
              {
                label: 'Planting date',
                value: new Date(record.plantingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
              },
              { label: 'Crop age', value: `${record.cropAgeMonths} months` },
              {
                label: 'Expected harvest',
                value: new Date(record.expectedHarvest).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
              },
              { label: 'Yield estimate', value: record.yieldEstimate }]
              } />
            
              <p className="mt-5 rounded-lg border border-earth-200 bg-earth-50 px-4 py-3 text-[13px] leading-6 text-earth-700">{record.status}</p>
            </CardBody>
          </Card>
          <Card>
            <CardHeader title="Readiness &amp; health" />
            <CardBody className="flex flex-col items-center gap-5 py-6">
              <CircularProgress value={record.harvestReadiness} tone="harvest" status="Readiness" caption="Harvest readiness score" />
              <div className="w-full">
                <ProgressBar value={record.healthScore} tone={record.healthScore >= 75 ? 'leaf' : 'risk'} label="Crop health index" showValue />
              </div>
            </CardBody>
          </Card>
        </div>
      }

      {tab === 'health' &&
      <ChartCard title="Crop health trend" description="Six-month health index for the three crops in the research scope." height={320}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cropHealthTrend} margin={{ top: 8, right: 16, bottom: 4, left: -12 }}>
              <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey={record.crop} stroke={chartColors.leaf} strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      }

      {tab === 'weather' &&
      <div className="space-y-4">
          <ChartCard title="7-day forecast" description="Temperature and rainfall outlook for this plot." height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sevenDayForecast} margin={{ top: 8, right: 16, bottom: 4, left: -12 }}>
                <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="temperature" name="Temp (°C)" stroke={chartColors.harvest} strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="rainfall" name="Rainfall (mm)" stroke={chartColors.sky} strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {agriculturalImpact.map((impact) =>
          <RiskCard key={impact.label} label={impact.label} level={impact.level} value={impact.value} note={impact.note} tone={impact.tone} />
          )}
          </div>
        </div>
      }

      {tab === 'disease' &&
      <Card>
          <CardHeader title="Diagnosis history" description={`${cropDiseases.length} diagnoses recorded for this crop.`} />
          <CardBody>
            {cropDiseases.length === 0 ?
          <EmptyState title="No diagnoses recorded" description="Upload a leaf image to run the disease detection component." /> :

          <ul className="divide-y divide-earth-100">
                {cropDiseases.map((d) =>
            <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div>
                      <p className="text-[13px] font-semibold text-leaf-900">{d.disease}</p>
                      <p className="text-[12px] text-earth-500">{d.date}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <SeverityBadge level={d.severity} size="sm" />
                      <ConfidenceBadge value={d.confidence} size="sm" />
                      <StatusBadge status={d.status} size="sm" />
                    </div>
                  </li>
            )}
              </ul>
          }
          </CardBody>
        </Card>
      }

      {tab === 'harvest' &&
      <Card>
          <CardHeader title="Harvest prediction" description={`Model: ${mockHarvestPrediction.modelUsed}`} />
          <CardBody>
            <InfoGrid
            items={[
            { label: 'Optimal harvest date', value: mockHarvestPrediction.optimalHarvestDate },
            { label: 'Harvest window', value: `${mockHarvestPrediction.harvestWindow.start} – ${mockHarvestPrediction.harvestWindow.end}` },
            { label: 'Readiness score', value: `${mockHarvestPrediction.readinessScore}%` },
            { label: 'Readiness status', value: mockHarvestPrediction.readinessStatus },
            { label: 'Weather risk', value: mockHarvestPrediction.weatherRisk }]
            } />
          
            <p className="mt-5 text-[13px] leading-6 text-earth-700">{mockHarvestPrediction.recommendation}</p>
            <LinkButton to="/harvest-planning" variant="secondary" className="mt-4">
              Open harvest planning
            </LinkButton>
          </CardBody>
        </Card>
      }

      {tab === 'quality' &&
      <Card>
          <CardHeader title="Latest quality assessment" description={`Model: ${mockQualityAssessment.modelUsed}`} />
          <CardBody className="flex flex-col gap-5 sm:flex-row">
            <img
            src={mockQualityAssessment.imageUrl}
            alt="Harvested produce submitted for quality grading"
            className="h-40 w-40 rounded-lg border border-earth-200 object-cover" />
          
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <GradeBadge grade={mockQualityAssessment.grade} label={mockQualityAssessment.gradeLabel} />
                <ConfidenceBadge value={mockQualityAssessment.confidence} />
              </div>
              <p className="mt-3 text-[13px] leading-6 text-earth-700">
                Quality score {mockQualityAssessment.qualityScore}% with {mockQualityAssessment.defects.length} detected defects (
                {mockQualityAssessment.defectStatus.toLowerCase()}).
              </p>
              <LinkButton to="/harvest-quality" variant="secondary" className="mt-4">
                Open quality assessment
              </LinkButton>
            </div>
          </CardBody>
        </Card>
      }

      {tab === 'transport' &&
      <Card>
          <CardHeader title="Transportation risk" description={`Model: ${mockTransportRisk.modelUsed}`} />
          <CardBody>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-3xl font-bold text-harvest-700">{mockTransportRisk.damageProbability}%</span>
              <RiskBadge level={mockTransportRisk.riskLevel} />
            </div>
            <p className="mt-3 text-[13px] leading-6 text-earth-700">{mockTransportRisk.explanation}</p>
            <LinkButton to="/transportation-risk" variant="secondary" className="mt-4">
              Open transportation risk
            </LinkButton>
          </CardBody>
        </Card>
      }

      {tab === 'reports' &&
      <Card>
          <CardHeader title="Related reports" description="Reports that include this crop cycle." />
          <CardBody>
            <ul className="divide-y divide-earth-100">
              {reportDefinitions.slice(0, 5).map((r) =>
            <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-[13px] font-semibold text-leaf-900">{r.title}</p>
                    <p className="text-[12px] text-earth-500">Last generated {r.lastGenerated}</p>
                  </div>
                  <Link to="/reports" className="text-[13px] font-semibold text-leaf-700 hover:text-leaf-900">
                    Generate
                  </Link>
                </li>
            )}
            </ul>
          </CardBody>
        </Card>
      }
    </div>);

}