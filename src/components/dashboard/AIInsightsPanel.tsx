import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { toneClasses, type Tone } from '../../utils/semantics';
import { DemoDataNotice } from '../ui/Feedback';
import { PriorityBadge } from '../ui/Badge';
import { useApp } from '../../contexts/AppContext';
import { alertTypeTone } from '../../utils/semantics';

interface Insight {
  text: string;
  module: string;
  to: string;
  tone: Tone;
}

const insights: Insight[] = [
{ text: 'Banana is currently the most suitable crop for your selected land at 91% suitability.', module: 'Crop Recommendation', to: '/crop-recommendation', tone: 'leaf' },
{ text: 'Heavy rainfall of 48 mm on Sep 3 may affect harvesting — bring the harvest forward.', module: 'Harvest Planning', to: '/harvest-planning', tone: 'sky' },
{ text: 'Disease risk detected in the uploaded leaf image: Black Sigatoka at High severity.', module: 'Disease Detection', to: '/disease-detection', tone: 'risk' },
{ text: 'Transportation risk is moderate for the selected route at 68% damage probability.', module: 'Transportation Risk', to: '/transportation-risk', tone: 'harvest' },
{ text: 'Upgrading to a ventilated corrugated box is estimated to reduce transit damage by 18%.', module: 'Smart Packaging', to: '/packaging', tone: 'xai' }];


export function AIInsightsPanel() {
  const { alerts } = useApp();

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="flex flex-col rounded-xl border border-earth-200 bg-white shadow-card" aria-labelledby="insights-heading">
        <div className="flex items-center gap-2.5 border-b border-earth-200 px-5 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-xai-50 text-xai-700">
            <SparklesIcon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <h2 id="insights-heading" className="text-[15px] font-semibold text-leaf-900">
              AI insights
            </h2>
            <p className="text-[12px] text-earth-500">Generated across the five research components</p>
          </div>
        </div>
        <ul className="divide-y divide-earth-100">
          {insights.map((insight) =>
          <li key={insight.module}>
              <Link
              to={insight.to}
              className="group flex items-start gap-3 px-5 py-3.5 transition-colors duration-150 ease-out hover:bg-earth-50">
              
                <span className={cn('mt-1 h-2 w-2 shrink-0 rounded-full', toneClasses[insight.tone].bg)} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] leading-5 text-earth-800">{insight.text}</span>
                  <span className={cn('mt-1 block text-[11px] font-semibold uppercase tracking-wide', toneClasses[insight.tone].text)}>
                    {insight.module}
                  </span>
                </span>
                <ArrowRightIcon
                className="mt-0.5 h-4 w-4 shrink-0 text-earth-300 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:text-earth-500"
                aria-hidden="true" />
              
              </Link>
            </li>
          )}
        </ul>
        <div className="mt-auto px-5 py-3">
          <DemoDataNotice>Insights are derived from mock service output for demonstration purposes.</DemoDataNotice>
        </div>
      </section>

      <section className="flex flex-col rounded-xl border border-earth-200 bg-white shadow-card" aria-labelledby="upcoming-alerts">
        <div className="flex items-center justify-between gap-3 border-b border-earth-200 px-5 py-4">
          <div>
            <h2 id="upcoming-alerts" className="text-[15px] font-semibold text-leaf-900">
              Upcoming alerts
            </h2>
            <p className="text-[12px] text-earth-500">Harvest, weather, disease, transport and storage</p>
          </div>
          <Link to="/alerts" className="text-[13px] font-semibold text-leaf-700 hover:text-leaf-900">
            View all
          </Link>
        </div>
        <ul className="divide-y divide-earth-100">
          {alerts.slice(0, 5).map((alert) =>
          <li key={alert.id}>
              <Link to={alert.link} className="block px-5 py-3.5 transition-colors duration-150 ease-out hover:bg-earth-50">
                <div className="flex items-center gap-2">
                  <span className={cn('h-2 w-2 rounded-full', toneClasses[alertTypeTone(alert.type)].bg)} aria-hidden="true" />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-earth-500">{alert.type}</span>
                  <PriorityBadge priority={alert.priority} size="sm" />
                  <span className="ml-auto text-[11px] text-earth-400">{alert.time}</span>
                </div>
                <p className="mt-1.5 text-[13px] font-medium leading-5 text-leaf-900">{alert.title}</p>
              </Link>
            </li>
          )}
        </ul>
      </section>
    </div>);

}