import React, { useState } from 'react';
import { EditIcon, HistoryIcon, MapPinIcon, PlusIcon, SaveIcon, Trash2Icon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { InfoGrid } from '../components/InfoGrid';
import { MapView } from '../components/MapView';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Input, Select } from '../components/ui/Input';
import { Modal } from '../components/ui/Overlay';
import { Alert } from '../components/ui/Feedback';
import { Badge, DemoBadge } from '../components/ui/Badge';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../contexts/ToastContext';
import { supportedCrops } from '../data/mockCrops';
import type { CropName, Farm, Season, SoilType } from '../types';

const soilTypes: SoilType[] = ['Red Yellow Podzolic', 'Reddish Brown Latosolic', 'Alluvial', 'Sandy Loam', 'Clay Loam'];
const seasons: Season[] = ['Yala', 'Maha', 'Inter-monsoon'];

const farmHistory = [
{ date: 'Nov 18, 2025', event: 'Banana planted on Plot B (tissue-cultured suckers, 2.0 m × 2.0 m).' },
{ date: 'Feb 04, 2026', event: 'Soil test recorded: pH 6.2, N 96, P 42, K 118 kg/ha.' },
{ date: 'May 22, 2026', event: 'Flowering recorded across 82% of mats.' },
{ date: 'Jul 19, 2026', event: 'First Black Sigatoka symptoms logged at Low severity.' },
{ date: 'Aug 31, 2026', event: 'Diagnosis escalated to High severity (38% leaf area infected).' }];


export function MyFarm() {
  const { farms, activeFarm, setActiveFarmId, saveFarm, deleteFarm } = useApp();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [draft, setDraft] = useState<Farm>(activeFarm);

  const startEdit = (farm: Farm) => {
    setDraft(farm);
    setEditing(true);
  };

  const startAdd = () => {
    setDraft({
      ...activeFarm,
      id: `FARM-${Math.floor(Math.random() * 900 + 100)}`,
      name: '',
      location: '',
      cropAgeMonths: 0
    });
    setEditing(true);
  };

  const commit = () => {
    if (!draft.name.trim() || !draft.location.trim()) {
      toast({ title: 'Farm name and location are required', variant: 'error' });
      return;
    }
    saveFarm(draft);
    setActiveFarmId(draft.id);
    setEditing(false);
    toast({ title: 'Farm saved', description: `${draft.name} has been updated.` });
  };

  const env = activeFarm.environment;

  return (
    <div className="mx-auto max-w-[1400px]">
      <PageHeader
        title="My Farm"
        description="Farm registry, land characteristics and current environmental readings. These values feed every AI component in the platform."
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'My Farm' }]}
        meta={
        <>
            <Badge tone="leaf">{farms.length} registered farms</Badge>
            <DemoBadge label="Sample readings" />
          </>
        }
        actions={
        <>
            <Button variant="secondary" onClick={() => startEdit(activeFarm)}>
              <EditIcon className="h-4 w-4" aria-hidden="true" />
              Edit farm
            </Button>
            <Button onClick={startAdd}>
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
              Add farm
            </Button>
          </>
        } />
      

      <div className="mb-4 flex flex-wrap gap-2">
        {farms.map((farm) =>
        <button
          key={farm.id}
          type="button"
          onClick={() => setActiveFarmId(farm.id)}
          aria-pressed={farm.id === activeFarm.id}
          className={
          farm.id === activeFarm.id ?
          'rounded-lg border border-leaf-300 bg-leaf-50 px-3 py-2 text-left text-[13px] font-semibold text-leaf-900' :
          'rounded-lg border border-earth-200 bg-white px-3 py-2 text-left text-[13px] font-medium text-earth-700 transition-colors duration-150 ease-out hover:border-earth-300'
          }>
          
            {farm.name}
            <span className="block text-[11px] font-normal text-earth-500">
              {farm.currentCrop} · {farm.landSizeAcres} acres
            </span>
          </button>
        )}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <Card>
            <CardHeader
              title="Farm information"
              description="Registered land details for the selected plot."
              action={
              <Button variant="ghost" size="sm" onClick={() => startEdit(activeFarm)}>
                  <EditIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  Edit
                </Button>
              } />
            
            <CardBody>
              <InfoGrid
                items={[
                { label: 'Farm name', value: activeFarm.name },
                { label: 'Location', value: activeFarm.location },
                { label: 'District', value: activeFarm.district },
                { label: 'GPS location', value: `${activeFarm.latitude.toFixed(4)}, ${activeFarm.longitude.toFixed(4)}` },
                { label: 'Land size', value: `${activeFarm.landSizeAcres} acres` },
                { label: 'Soil type', value: activeFarm.soilType },
                { label: 'Altitude', value: `${activeFarm.altitudeM} m` },
                { label: 'Current crop', value: activeFarm.currentCrop },
                {
                  label: 'Planting date',
                  value: new Date(activeFarm.plantingDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                },
                { label: 'Crop age', value: `${activeFarm.cropAgeMonths} months` }]
                } />
              
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Environmental information"
              description="Latest soil and climate readings used as model inputs."
              action={<DemoBadge label="Sample data" />} />
            
            <CardBody>
              <InfoGrid
                columns={4}
                items={[
                { label: 'Soil pH', value: env.soilPh },
                { label: 'Nitrogen', value: `${env.nitrogen} kg/ha` },
                { label: 'Phosphorus', value: `${env.phosphorus} kg/ha` },
                { label: 'Potassium', value: `${env.potassium} kg/ha` },
                { label: 'Soil moisture', value: `${env.soilMoisture}%` },
                { label: 'Temperature', value: `${env.temperature} °C` },
                { label: 'Rainfall', value: `${env.rainfall} mm/month` },
                { label: 'Humidity', value: `${env.humidity}%` },
                { label: 'Season', value: env.season }]
                } />
              
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Farm history" icon={<HistoryIcon className="h-4 w-4 text-earth-500" aria-hidden="true" />} />
            <CardBody>
              <ol className="space-y-3">
                {farmHistory.map((entry) =>
                <li key={entry.date} className="flex gap-3">
                    <span className="w-[92px] shrink-0 font-mono text-[12px] font-semibold text-earth-500">{entry.date}</span>
                    <span className="text-[13px] leading-5 text-earth-800">{entry.event}</span>
                  </li>
                )}
              </ol>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader title="Farm location" icon={<MapPinIcon className="h-4 w-4 text-leaf-600" aria-hidden="true" />} />
            <CardBody className="px-3 py-3">
              <MapView
                center={[activeFarm.latitude, activeFarm.longitude]}
                zoom={12}
                height={300}
                points={[
                {
                  id: activeFarm.id,
                  name: activeFarm.name,
                  lat: activeFarm.latitude,
                  lng: activeFarm.longitude,
                  tone: 'leaf',
                  label: activeFarm.name,
                  popup:
                  <div className="text-[12px]">
                        <p className="font-semibold">{activeFarm.name}</p>
                        <p>
                          {activeFarm.currentCrop} · {activeFarm.landSizeAcres} acres
                        </p>
                      </div>

                }]
                } />
              
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Danger zone" description="Removing a farm also removes it from prediction inputs." />
            <CardBody>
              <Button variant="danger" onClick={() => setConfirmDelete(true)} disabled={farms.length <= 1}>
                <Trash2Icon className="h-4 w-4" aria-hidden="true" />
                Delete this farm
              </Button>
              {farms.length <= 1 && <p className="mt-2 text-[12px] text-earth-600">At least one farm must remain registered.</p>}
            </CardBody>
          </Card>
        </div>
      </div>

      <Modal
        open={editing}
        onClose={() => setEditing(false)}
        title={draft.name ? 'Edit farm' : 'Add farm'}
        description="Farm and environmental values are used directly as AI model inputs."
        size="lg"
        footer={
        <>
            <Button variant="ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button onClick={commit}>
              <SaveIcon className="h-4 w-4" aria-hidden="true" />
              Save farm
            </Button>
          </>
        }>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Farm name" required value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          <Input label="Location" required value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} />
          <Input label="District" value={draft.district} onChange={(e) => setDraft({ ...draft, district: e.target.value })} />
          <Input
            label="Land size"
            type="number"
            step="0.1"
            unit="acres"
            value={draft.landSizeAcres}
            onChange={(e) => setDraft({ ...draft, landSizeAcres: Number(e.target.value) })} />
          
          <Select
            label="Soil type"
            options={soilTypes.map((s) => ({ value: s, label: s }))}
            value={draft.soilType}
            onChange={(e) => setDraft({ ...draft, soilType: e.target.value as SoilType })} />
          
          <Input
            label="Altitude"
            type="number"
            unit="m"
            value={draft.altitudeM}
            onChange={(e) => setDraft({ ...draft, altitudeM: Number(e.target.value) })} />
          
          <Select
            label="Current crop"
            options={supportedCrops.map((c) => ({ value: c, label: c }))}
            value={draft.currentCrop}
            onChange={(e) => setDraft({ ...draft, currentCrop: e.target.value as CropName })} />
          
          <Input
            label="Crop age"
            type="number"
            unit="months"
            value={draft.cropAgeMonths}
            onChange={(e) => setDraft({ ...draft, cropAgeMonths: Number(e.target.value) })} />
          
          <Input
            label="Soil pH"
            type="number"
            step="0.1"
            value={draft.environment.soilPh}
            onChange={(e) => setDraft({ ...draft, environment: { ...draft.environment, soilPh: Number(e.target.value) } })} />
          
          <Input
            label="Soil moisture"
            type="number"
            unit="%"
            value={draft.environment.soilMoisture}
            onChange={(e) => setDraft({ ...draft, environment: { ...draft.environment, soilMoisture: Number(e.target.value) } })} />
          
          <Select
            label="Season"
            options={seasons.map((s) => ({ value: s, label: s }))}
            value={draft.environment.season}
            onChange={(e) => setDraft({ ...draft, environment: { ...draft.environment, season: e.target.value as Season } })} />
          
          <Input
            label="Rainfall"
            type="number"
            unit="mm"
            value={draft.environment.rainfall}
            onChange={(e) => setDraft({ ...draft, environment: { ...draft.environment, rainfall: Number(e.target.value) } })} />
          
        </div>
      </Modal>

      <Modal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete farm"
        size="sm"
        footer={
        <>
            <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
            <Button
            variant="danger"
            onClick={() => {
              deleteFarm(activeFarm.id);
              setConfirmDelete(false);
              toast({ title: 'Farm deleted', variant: 'info' });
            }}>
            
              Delete farm
            </Button>
          </>
        }>
        
        <Alert variant="warning" title={`Delete ${activeFarm.name}?`}>
          Crop records, diagnosis history and reports linked to this farm will no longer appear in the dashboard.
        </Alert>
      </Modal>
    </div>);

}