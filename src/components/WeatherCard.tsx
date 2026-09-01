import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CloudRainIcon, CloudSunIcon, DropletsIcon, MapPinIcon, ThermometerIcon, WindIcon } from 'lucide-react';
import type { WeatherDay, WeatherNow } from '../types';

export function WeatherCard({ now, forecast }: {now: WeatherNow;forecast: WeatherDay[];}) {
  const metrics = [
  { icon: <ThermometerIcon className="h-4 w-4" aria-hidden="true" />, label: 'Temperature', value: `${now.temperature}°C` },
  { icon: <DropletsIcon className="h-4 w-4" aria-hidden="true" />, label: 'Humidity', value: `${now.humidity}%` },
  { icon: <CloudRainIcon className="h-4 w-4" aria-hidden="true" />, label: 'Rainfall', value: `${now.rainfall} mm` },
  { icon: <WindIcon className="h-4 w-4" aria-hidden="true" />, label: 'Wind', value: `${now.windSpeed} km/h` }];


  return (
    <section className="flex h-full flex-col rounded-xl border border-sky-200 bg-sky-50 shadow-card" aria-labelledby="weather-today">
      <div className="flex items-start justify-between gap-4 px-5 pt-4">
        <div>
          <h2 id="weather-today" className="text-[15px] font-semibold text-sky-900">
            Today's weather
          </h2>
          <p className="mt-0.5 flex items-center gap-1 text-[13px] text-sky-800/80">
            <MapPinIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {now.location}, {now.district}
          </p>
        </div>
        <CloudSunIcon className="h-9 w-9 text-sky-600" aria-hidden="true" />
      </div>

      <div className="flex items-end gap-3 px-5 pt-3">
        <p className="text-[44px] font-bold leading-none tracking-tight text-sky-900">{now.temperature}°</p>
        <div className="pb-1">
          <p className="text-sm font-semibold text-sky-900">{now.condition}</p>
          <p className="text-[12px] text-sky-800/70">Updated {now.updatedAt}</p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 px-5">
        {metrics.map((m) =>
        <div key={m.label} className="flex items-center gap-2">
            <span className="text-sky-600">{m.icon}</span>
            <div>
              <dt className="text-[11px] text-sky-800/70">{m.label}</dt>
              <dd className="text-[13px] font-semibold text-sky-900">{m.value}</dd>
            </div>
          </div>
        )}
      </dl>

      <ul className="mt-4 flex gap-1 border-t border-sky-200 px-3 py-3">
        {forecast.slice(0, 7).map((d) =>
        <li key={d.day} className="flex flex-1 flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-center">
            <span className="text-[11px] font-semibold text-sky-800/70">{d.day}</span>
            <span className="text-[13px] font-bold text-sky-900">{d.temperature}°</span>
            <span className="font-mono text-[10px] font-semibold text-sky-700">{d.rainfall}mm</span>
          </li>
        )}
      </ul>

      <div className="mt-auto border-t border-sky-200 px-5 py-3">
        <Link to="/weather" className="group inline-flex items-center gap-1 text-[13px] font-semibold text-sky-800">
          Open weather intelligence
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </section>);

}