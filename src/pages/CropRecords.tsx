import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { CropCard } from '../components/CropCard';
import { Card, CardHeader } from '../components/ui/Card';
import { DataTable, type Column } from '../components/ui/DataTable';
import { Select } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/Progress';
import { RiskBadge, StatusBadge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { mockCropRecords, supportedCrops } from '../data/mockCrops';
import type { CropRecord } from '../types';

export function CropRecords() {
  const navigate = useNavigate();
  const [crop, setCrop] = useState('all');
  const [view, setView] = useState('cards');

  const rows = useMemo(() => crop === 'all' ? mockCropRecords : mockCropRecords.filter((r) => r.crop === crop), [crop]);

  const columns: Column<CropRecord>[] = [
  { key: 'crop', header: 'Crop', render: (r) => <span className="font-semibold text-leaf-900">{r.crop}</span> },
  {
    key: 'planting',
    header: 'Planting date',
    hideBelow: 'md',
    render: (r) => new Date(r.plantingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  },
  { key: 'age', header: 'Crop age', hideBelow: 'lg', render: (r) => `${r.cropAgeMonths} months` },
  { key: 'location', header: 'Location', hideBelow: 'md', render: (r) => r.location },
  {
    key: 'harvest',
    header: 'Expected harvest',
    render: (r) => new Date(r.expectedHarvest).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  },
  {
    key: 'health',
    header: 'Health',
    render: (r) =>
    <div className="w-32">
          <ProgressBar value={r.healthScore} tone={r.healthScore >= 75 ? 'leaf' : r.healthScore >= 50 ? 'harvest' : 'risk'} height="sm" showValue />
        </div>

  },
  { key: 'yield', header: 'Yield estimate', hideBelow: 'lg', render: (r) => r.yieldEstimate },
  { key: 'risk', header: 'Current risk', render: (r) => <RiskBadge level={r.riskLevel} size="sm" /> },
  { key: 'status', header: 'Status', hideBelow: 'lg', render: (r) => <StatusBadge status={r.healthStatus} size="sm" /> }];


  return (
    <div className="mx-auto max-w-[1400px]">
      <PageHeader
        title="Crop Records"
        description="Every crop cycle registered on the platform, with health, readiness and risk indicators rolled up from the AI components."
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Crop Records' }]}
        actions={
        <Button variant="secondary" onClick={() => navigate('/farm')}>
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            Add crop cycle
          </Button>
        } />
      

      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="w-48">
          <Select
            label="Crop"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            options={[{ value: 'all', label: 'All crops' }, ...supportedCrops.map((c) => ({ value: c, label: c }))]} />
          
        </div>
        <Tabs
          variant="pill"
          items={[
          { id: 'cards', label: 'Cards' },
          { id: 'table', label: 'Table' }]
          }
          active={view}
          onChange={setView} />
        
      </div>

      {view === 'cards' ?
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((record) =>
        <CropCard key={record.id} record={record} />
        )}
        </div> :

      <Card>
          <CardHeader title="Crop cycle records" description={`${rows.length} records`} />
          <DataTable
          caption="Crop cycle records with health, yield and risk indicators"
          columns={columns}
          rows={rows}
          onRowClick={(row) => navigate(`/crops/${row.id}`)} />
        
        </Card>
      }
    </div>);

}