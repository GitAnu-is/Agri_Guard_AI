import React, { useMemo } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CloudRainIcon, CloudSunIcon, DropletsIcon, SparklesIcon, ThermometerIcon, WindIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { MapView } from '../components/MapView';
import { RiskCard } from '../components/RiskCard';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { ChartCard } from '../components/ui/ChartCard';
import { Select } from '../components/ui/Input';
import { StatCard } from '../components/ui/StatCard';
import { DemoDataNotice } from '../components/ui/Feedback';
import { agriculturalImpact, currentWeather, locations, sevenDayForecast, weatherInsights, weatherTrend30Day } from '../data/mockWeather';
import { useApp } from '../contexts/AppContext';
import { chartColors } from '../utils/semantics';

const axisStyle = { fontSize: 12, fill: chartColors.axis };
const tooltipStyle = { borderRadius: 10, border: '1px solid #e3d9c9', fontSize: 12 };

export function WeatherIntelligence() {
  const { locationId, setLocationId } = useApp();
  const location = useMemo(() => locations.find((l) => l.id === locationId) ?? locations[0], [locationId]);

  return (
    <div className="mx-auto max-w-[1300px]">
      <PageHeader
        title="Weather Intelligence"
        description="Current conditions, a 7-day forecast and the agricultural impact of that forecast on harvesting, disease pressure, transport and crop suitability."
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Intelligence' }, { label: 'Weather Intelligence' }]}
        actions={
        <div className="w-52">
            <Select
            label="Location"
            options={locations.map((l) => ({ value: l.id, label: `${l.name} — ${l.district}` }))}
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)} />
          
          </div>
        } />
      

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard label="Temperature" value={`${currentWeather.temperature}`} unit="°C" caption={currentWeather.condition} tone="harvest" icon={<ThermometerIcon className="h-4 w-4" aria-hidden="true" />} />
            <StatCard label="Humidity" value={`${currentWeather.humidity}`} unit="%" caption="Above the 75% disease threshold" tone="sky" icon={<DropletsIcon className="h-4 w-4" aria-hidden="true" />} />
            <StatCard label="Rainfall (24h)" value={`${currentWeather.rainfall}`} unit="mm" caption="48 mm forecast on Thursday" tone="sky" icon={<CloudRainIcon className="h-4 w-4" aria-hidden="true" />} />
            <StatCard label="Wind speed" value={`${currentWeather.windSpeed}`} unit="km/h" caption="Below the 25 km/h lodging threshold" tone="leaf" icon={<WindIcon className="h-4 w-4" aria-hidden="true" />} />
          </div>

          <Card>
            <CardHeader title="7-day forecast" description={`${location.name}, ${location.district} District`} icon={<CloudSunIcon className="h-4 w-4 text-sky-600" aria-hidden="true" />} />
            <CardBody className="overflow-x-auto scroll-thin">
              <ul className="flex min-w-[640px] gap-2">
                {sevenDayForecast.map((day) =>
                <li
                  key={day.day}
                  className={
                  day.rainfall > 30 ?
                  'flex-1 rounded-xl border border-risk-200 bg-risk-50 px-3 py-3 text-center' :
                  'flex-1 rounded-xl border border-earth-200 px-3 py-3 text-center'
                  }>
                  
                    <p className="text-[12px] font-bold text-earth-600">{day.day}</p>
                    <p className="text-[11px] text-earth-500">{day.date}</p>
                    <p className="mt-2 text-[18px] font-bold text-leaf-900">{day.temperature}°</p>
                    <p className="text-[11px] text-earth-500">min {day.tempMin}°</p>
                    <p className="mt-2 font-mono text-[12px] font-bold text-sky-700">{day.rainfall} mm</p>
                    <p className="text-[11px] text-earth-500">{day.humidity}% RH</p>
                    <p className="mt-1.5 text-[11px] font-medium leading-4 text-earth-700">{day.condition}</p>
                  </li>
                )}
              </ul>
            </CardBody>
          </Card>

          <div className="grid gap-4 xl:grid-cols-2">
            <ChartCard title="Temperature trend" description="Weekly mean temperature over the last five weeks." height={250}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weatherTrend30Day} margin={{ top: 8, right: 16, bottom: 4, left: -16 }}>
                  <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="period" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis domain={[26, 34]} tick={axisStyle} axisLine={false} tickLine={false} unit="°C" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="temperature" name="Temperature" stroke={chartColors.harvest} strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Rainfall trend" description="Total weekly rainfall. Week 4 exceeded the field-capacity threshold." height={250}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weatherTrend30Day} margin={{ top: 8, right: 16, bottom: 4, left: -16 }}>
                  <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="period" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} unit="mm" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="rainfall" name="Rainfall" fill={chartColors.sky} radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Humidity trend" description="Weekly mean relative humidity against the 85% disease-risk threshold." height={250}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weatherTrend30Day} margin={{ top: 8, right: 16, bottom: 4, left: -16 }}>
                  <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="period" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis domain={[60, 100]} tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="humidity" name="Humidity" stroke={chartColors.leafLight} fill={chartColors.leafLight} fillOpacity={0.16} strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Forecast wind speed" description="Daily wind speed across the forecast window." height={250}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sevenDayForecast} margin={{ top: 8, right: 16, bottom: 4, left: -16 }}>
                  <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} unit="km/h" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="windSpeed" name="Wind speed" fill={chartColors.leaf} radius={[6, 6, 0, 0]} barSize={26} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader title="Selected location" description={`${location.name}, ${location.district} District`} />
            <CardBody className="px-3 py-3">
              <MapView
                center={[location.lat, location.lng]}
                zoom={11}
                height={240}
                points={[
                {
                  id: location.id,
                  name: location.name,
                  lat: location.lat,
                  lng: location.lng,
                  tone: 'sky',
                  label: `${location.name} — ${currentWeather.temperature}°C`,
                  popup:
                  <div className="text-[12px] leading-5">
                        <p className="font-semibold text-leaf-900">{location.name}</p>
                        <p>
                          {currentWeather.temperature}°C · {currentWeather.condition}
                        </p>
                        <p>{currentWeather.humidity}% RH</p>
                      </div>

                }]
                } />
              
            </CardBody>
          </Card>

          <section aria-labelledby="impact-heading">
            <h2 id="impact-heading" className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-earth-500">
              Agricultural impact
            </h2>
            <div className="grid gap-3">
              {agriculturalImpact.map((impact) =>
              <RiskCard key={impact.label} label={impact.label} level={impact.level} value={impact.value} note={impact.note} tone={impact.tone} />
              )}
            </div>
          </section>

          <Card>
            <CardHeader
              title="AI weather insights"
              description="Forecast interpreted against crop, disease and logistics thresholds."
              icon={<SparklesIcon className="h-4 w-4 text-xai-600" aria-hidden="true" />} />
            
            <CardBody>
              <ul className="space-y-2.5">
                {weatherInsights.map((insight) =>
                <li key={insight} className="flex gap-2.5 text-[13px] leading-5 text-earth-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-xai-500" aria-hidden="true" />
                    {insight}
                  </li>
                )}
              </ul>
              <DemoDataNotice className="mt-4" />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>);

}