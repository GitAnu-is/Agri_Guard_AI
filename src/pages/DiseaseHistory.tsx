import React, { useMemo, useState } from 'react';
import { CartesianGrid, Legend, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PageHeader } from '../components/PageHeader';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { ChartCard } from '../components/ui/ChartCard';
import { DataTable, type Column } from '../components/ui/DataTable';
import { DatePicker, Select } from '../components/ui/Input';
import { Button, LinkButton } from '../components/ui/Button';
import { Drawer } from '../components/ui/Overlay';
import { ConfidenceBadge, SeverityBadge, StatusBadge } from '../components/ui/Badge';
import { InfoGrid } from '../components/InfoGrid';
import { GradCAMViewer } from '../components/GradCAMViewer';
import { allDiseases, diseaseHistory, diseaseSeverityTrend } from '../data/mockDiseaseResults';
import { supportedCrops } from '../data/mockCrops';
import { chartColors } from '../utils/semantics';
import type { DiseaseResult, SeverityLevel } from '../types';

const severities: SeverityLevel[] = ['None', 'Low', 'Medium', 'High'];
const axisStyle = { fontSize: 12, fill: chartColors.axis };
const tooltipStyle = { borderRadius: 10, border: '1px solid #e3d9c9', fontSize: 12 };

export function DiseaseHistory() {
  const [crop, setCrop] = useState('all');
  const [disease, setDisease] = useState('all');
  const [severity, setSeverity] = useState('all');
  const [from, setFrom] = useState('');
  const [selected, setSelected] = useState<DiseaseResult | null>(null);

  const rows = useMemo(
    () =>
    diseaseHistory.filter((d) => {
      if (crop !== 'all' && d.crop !== crop) return false;
      if (disease !== 'all' && d.disease !== disease) return false;
      if (severity !== 'all' && d.severity !== severity) return false;
      if (from && new Date(d.date) < new Date(from)) return false;
      return true;
    }),
    [crop, disease, severity, from]
  );

  const columns: Column<DiseaseResult>[] = [
  { key: 'date', header: 'Date', render: (r) => <span className="font-mono text-[12px]">{r.date}</span> },
  { key: 'crop', header: 'Crop', render: (r) => <span className="font-semibold text-leaf-900">{r.crop}</span> },
  { key: 'disease', header: 'Disease', render: (r) => r.disease },
  { key: 'severity', header: 'Severity', render: (r) => <SeverityBadge level={r.severity} size="sm" /> },
  { key: 'confidence', header: 'Confidence', align: 'right', hideBelow: 'sm', render: (r) => <span className="font-mono">{r.confidence.toFixed(1)}%</span> },
  { key: 'infected', header: 'Infected area', align: 'right', hideBelow: 'lg', render: (r) => <span className="font-mono">{r.infectedPercentage}%</span> },
  { key: 'status', header: 'Status', hideBelow: 'md', render: (r) => <StatusBadge status={r.status} size="sm" /> },
  {
    key: 'action',
    header: 'Action',
    align: 'right',
    render: () => <span className="text-[13px] font-semibold text-leaf-700">View</span>
  }];


  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        title="Disease Diagnosis History"
        description="Every diagnosis produced by the disease detection component, filterable by crop, disease, severity and date."
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Pre-harvest AI' }, { label: 'Disease History' }]}
        actions={<LinkButton to="/disease-detection">New diagnosis</LinkButton>} />
      

      <Card className="mb-4">
        <CardBody className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Select label="Crop" value={crop} onChange={(e) => setCrop(e.target.value)} options={[{ value: 'all', label: 'All crops' }, ...supportedCrops.map((c) => ({ value: c, label: c }))]} />
          <Select label="Disease" value={disease} onChange={(e) => setDisease(e.target.value)} options={[{ value: 'all', label: 'All diseases' }, ...allDiseases.map((d) => ({ value: d, label: d }))]} />
          <Select label="Severity" value={severity} onChange={(e) => setSeverity(e.target.value)} options={[{ value: 'all', label: 'All severities' }, ...severities.map((s) => ({ value: s, label: s }))]} />
          <DatePicker label="From date" value={from} onChange={(e) => setFrom(e.target.value)} />
          <div className="flex items-end">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => {
                setCrop('all');
                setDisease('all');
                setSeverity('all');
                setFrom('');
              }}>
              
              Clear filters
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardHeader title="Diagnosis records" description={`${rows.length} of ${diseaseHistory.length} diagnoses`} />
        <DataTable caption="Disease diagnosis history" columns={columns} rows={rows} onRowClick={(row) => setSelected(row)} pageSize={6} />
      </Card>

      <ChartCard title="Disease severity trend" description="Monthly count of diagnoses by severity band across all crops." height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={diseaseSeverityTrend} margin={{ top: 8, right: 16, bottom: 4, left: -12 }}>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Low" stackId="a" fill={chartColors.leaf} radius={[0, 0, 0, 0]} />
            <Bar dataKey="Medium" stackId="a" fill={chartColors.harvest} />
            <Bar dataKey="High" stackId="a" fill={chartColors.risk} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <Drawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.disease} — ${selected.id}` : 'Diagnosis'}
        description={selected ? `${selected.crop} · ${selected.date}` : undefined}
        width="max-w-2xl">
        
        {selected &&
        <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <SeverityBadge level={selected.severity} />
              <ConfidenceBadge value={selected.confidence} />
              <StatusBadge status={selected.status} />
            </div>
            <InfoGrid
            columns={2}
            items={[
            { label: 'Crop', value: selected.crop },
            { label: 'Health', value: selected.health },
            { label: 'Infected area', value: `${selected.infectedPercentage}%` },
            { label: 'Model', value: selected.modelUsed }]
            } />
          
            <GradCAMViewer
            originalUrl={selected.imageUrl}
            heatmapUrl={selected.gradcamUrl}
            maskUrl={selected.maskUrl}
            confidence={selected.confidence}
            explanation={selected.explanation}
            infectedPercentage={selected.infectedPercentage} />
          
            <div>
              <h4 className="text-[13px] font-semibold uppercase tracking-wide text-earth-500">Immediate actions recorded</h4>
              <ul className="mt-2 space-y-1.5">
                {selected.treatment.immediate.map((t) =>
              <li key={t} className="flex gap-2 text-[13px] leading-5 text-earth-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-500" aria-hidden="true" />
                    {t}
                  </li>
              )}
              </ul>
            </div>
          </div>
        }
      </Drawer>
    </div>);

}