import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { MapView, type MapPoint } from '../components/MapView';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Badge, DemoBadge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/Progress';
import { Checkbox } from '../components/ui/Input';
import { mockFarms } from '../data/mockCrops';
import { mockTransportRisk } from '../data/mockTransportationData';
import { locations } from '../data/mockWeather';

interface SiteInfo {
  id: string;
  name: string;
  crop: string;
  diseaseRisk: string;
  harvestReadiness: number;
  weather: string;
  lat: number;
  lng: number;
}

const sites: SiteInfo[] = [
{ id: 'S1', name: 'Gampaha', crop: 'Banana', diseaseRisk: 'High', harvestReadiness: 86, weather: '31 °C · Partly cloudy', lat: 7.0917, lng: 79.9999 },
{ id: 'S2', name: 'Kurunegala', crop: 'Pineapple', diseaseRisk: 'Low', harvestReadiness: 64, weather: '32 °C · Sunny', lat: 7.4863, lng: 80.3647 },
{ id: 'S3', name: 'Matale', crop: 'Black Pepper', diseaseRisk: 'Medium', harvestReadiness: 38, weather: '27 °C · Showers', lat: 7.4675, lng: 80.6234 }];


const markets = [
{ id: 'M1', name: 'Manning Market, Colombo', lat: 6.9394, lng: 79.8653 },
{ id: 'M2', name: 'Dambulla Dedicated Economic Centre', lat: 7.8731, lng: 80.6511 }];


export function AgriculturalMap() {
  const [layers, setLayers] = useState({ farms: true, disease: true, markets: true, route: true, weather: true });
  const [selected, setSelected] = useState<SiteInfo>(sites[0]);

  const points: MapPoint[] = [];

  if (layers.farms) {
    mockFarms.forEach((farm) =>
    points.push({
      id: `farm-${farm.id}`,
      name: farm.name,
      lat: farm.latitude,
      lng: farm.longitude,
      tone: 'leaf',
      label: `${farm.name} · ${farm.currentCrop}`,
      popup:
      <div className="text-[12px] leading-5">
            <p className="font-semibold text-leaf-900">{farm.name}</p>
            <p>Crop: {farm.currentCrop}</p>
            <p>
              {farm.landSizeAcres} acres · {farm.soilType}
            </p>
          </div>

    })
    );
  }

  if (layers.disease) {
    sites.forEach((site) =>
    points.push({
      id: `disease-${site.id}`,
      name: site.name,
      lat: site.lat + 0.045,
      lng: site.lng + 0.045,
      tone: site.diseaseRisk === 'High' ? 'risk' : site.diseaseRisk === 'Medium' ? 'harvest' : 'leaf',
      radius: site.diseaseRisk === 'High' ? 18 : site.diseaseRisk === 'Medium' ? 14 : 10,
      label: `${site.name} — ${site.diseaseRisk} disease risk`,
      popup:
      <div className="text-[12px] leading-5">
            <p className="font-semibold text-leaf-900">{site.name}</p>
            <p>Crop: {site.crop}</p>
            <p>Disease risk: {site.diseaseRisk}</p>
            <p>Harvest readiness: {site.harvestReadiness}%</p>
            {layers.weather && <p>Weather: {site.weather}</p>}
          </div>

    })
    );
  }

  if (layers.markets) {
    markets.forEach((m) =>
    points.push({
      id: `market-${m.id}`,
      name: m.name,
      lat: m.lat,
      lng: m.lng,
      tone: 'xai',
      label: m.name,
      popup: <p className="text-[12px] font-semibold text-leaf-900">{m.name}</p>
    })
    );
  }

  const route: [number, number][] | undefined = layers.route ?
  mockTransportRisk.route.map((r) => [r.lat, r.lng] as [number, number]) :
  undefined;

  return (
    <div className="mx-auto max-w-[1400px]">
      <PageHeader
        title="Agricultural Map"
        description="Spatial view of registered farms, disease-risk areas, transportation routes and wholesale market locations."
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Agricultural Map' }]}
        meta={<DemoBadge label="Sample locations" />} />
      

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardBody className="px-3 py-3">
            <MapView center={[7.3, 80.2]} zoom={8} points={points} route={route} height={520} />
          </CardBody>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader title="Map layers" />
            <CardBody className="space-y-2.5">
              <Checkbox label="Farm locations" checked={layers.farms} onChange={(e) => setLayers({ ...layers, farms: e.target.checked })} />
              <Checkbox label="Disease risk areas" checked={layers.disease} onChange={(e) => setLayers({ ...layers, disease: e.target.checked })} />
              <Checkbox label="Market locations" checked={layers.markets} onChange={(e) => setLayers({ ...layers, markets: e.target.checked })} />
              <Checkbox label="Transportation route" checked={layers.route} onChange={(e) => setLayers({ ...layers, route: e.target.checked })} />
              <Checkbox label="Weather in popups" checked={layers.weather} onChange={(e) => setLayers({ ...layers, weather: e.target.checked })} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Select a location" description="Location summaries drawn from the demo dataset." />
            <CardBody className="space-y-2">
              {sites.map((site) =>
              <button
                key={site.id}
                type="button"
                onClick={() => setSelected(site)}
                aria-pressed={selected.id === site.id}
                className={
                selected.id === site.id ?
                'w-full rounded-lg border border-leaf-300 bg-leaf-50 px-3 py-2 text-left' :
                'w-full rounded-lg border border-earth-200 px-3 py-2 text-left transition-colors duration-150 ease-out hover:border-earth-300'
                }>
                
                  <span className="block text-[13px] font-semibold text-leaf-900">{site.name}</span>
                  <span className="block text-[12px] text-earth-500">
                    {site.crop} · {site.diseaseRisk} disease risk
                  </span>
                </button>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title={selected.name} description={locations.find((l) => l.name === selected.name)?.district ?? 'Sri Lanka'} />
            <CardBody className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] text-earth-600">Crop</span>
                <Badge tone="leaf" size="sm">
                  {selected.crop}
                </Badge>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] text-earth-600">Disease risk</span>
                <Badge tone={selected.diseaseRisk === 'High' ? 'risk' : selected.diseaseRisk === 'Medium' ? 'harvest' : 'leaf'} size="sm">
                  {selected.diseaseRisk}
                </Badge>
              </div>
              <ProgressBar value={selected.harvestReadiness} tone="harvest" label="Harvest readiness" showValue height="sm" />
              <p className="text-[12px] text-earth-600">Current weather: {selected.weather}</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>);

}