import React from 'react';
import { MicroscopeIcon, ScanSearchIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { LinkButton } from '../components/ui/Button';
import { WeatherCard } from '../components/WeatherCard';
import { CropCard } from '../components/CropCard';
import { PriorityPanel } from '../components/dashboard/PriorityPanel';
import { DashboardKpis } from '../components/dashboard/DashboardKpis';
import { AIInsightsPanel } from '../components/dashboard/AIInsightsPanel';
import { DashboardCharts } from '../components/dashboard/DashboardCharts';
import { mockCropRecords } from '../data/mockCrops';
import { currentWeather, sevenDayForecast } from '../data/mockWeather';
import { useApp } from '../contexts/AppContext';

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function Dashboard() {
  const { user, activeFarm } = useApp();
  const firstName = user?.fullName.split(' ')[0] ?? 'there';

  return (
    <div className="mx-auto max-w-[1400px]">
      <PageHeader
        title={`${greeting()}, ${firstName}`}
        description={`AI-powered insights for ${activeFarm.name} — ${activeFarm.location}. Every prediction below is demonstration output from mock services.`}
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Dashboard' }]}
        actions={
        <>
            <LinkButton to="/disease-detection" variant="secondary">
              <MicroscopeIcon className="h-4 w-4" aria-hidden="true" />
              Detect disease
            </LinkButton>
            <LinkButton to="/crop-recommendation">
              <ScanSearchIcon className="h-4 w-4" aria-hidden="true" />
              Run crop recommendation
            </LinkButton>
          </>
        } />
      

      <div className="space-y-6">
        <PriorityPanel />

        <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
          <DashboardKpis />
          <WeatherCard now={currentWeather} forecast={sevenDayForecast} />
        </div>

        <section aria-labelledby="crop-overview">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 id="crop-overview" className="text-[15px] font-semibold text-leaf-900">
                Crop overview
              </h2>
              <p className="text-[13px] text-earth-600">The three crops within the research scope, across your registered plots.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mockCropRecords.map((record) =>
            <CropCard key={record.id} record={record} />
            )}
          </div>
        </section>

        <AIInsightsPanel />
        <DashboardCharts />
      </div>
    </div>);

}