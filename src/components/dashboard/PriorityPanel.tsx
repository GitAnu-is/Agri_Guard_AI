import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CalendarClockIcon, MicroscopeIcon } from 'lucide-react';
import { ConfidenceBadge, SeverityBadge } from '../ui/Badge';
import { CircularProgress } from '../ui/Progress';
import { mockDiseaseResult } from '../../data/mockDiseaseResults';
import { mockHarvestPrediction } from '../../data/mockHarvestData';

/**
 * The single highest-priority decision on the farm right now. This panel is
 * deliberately the largest element on the dashboard: a diseased crop inside an
 * opening harvest window is the situation the platform exists to catch.
 */
export function PriorityPanel() {
  const disease = mockDiseaseResult;
  const harvest = mockHarvestPrediction;

  return (
    <section className="overflow-hidden rounded-xl border border-risk-200 bg-white shadow-card" aria-labelledby="priority-heading">
      <div className="flex flex-wrap items-center gap-2 border-b border-risk-100 bg-risk-50 px-5 py-3">
        <span className="rounded-full bg-risk-600 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">Needs action today</span>
        <p id="priority-heading" className="text-[13px] font-semibold text-risk-900">
          Diseased crop inside an opening harvest window
        </p>
      </div>

      <div className="grid gap-6 px-5 py-5 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="flex flex-col gap-5 sm:flex-row">
            <img
              src={disease.imageUrl}
              alt="Banana leaf showing dark streak lesions from the latest diagnosis"
              className="h-32 w-32 shrink-0 rounded-lg border border-earth-200 object-cover" />
            
            <div className="min-w-0">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-earth-500">Latest diagnosis · Plot B (Banana)</p>
              <h3 className="mt-1 text-[22px] font-bold leading-7 text-leaf-900">{disease.disease}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <SeverityBadge level={disease.severity} size="sm" />
                <ConfidenceBadge value={disease.confidence} size="sm" />
                <span className="rounded-full border border-earth-200 px-2 py-0.5 text-[11px] font-semibold text-earth-700">
                  {disease.infectedPercentage}% leaf area infected
                </span>
              </div>
              <p className="mt-3 text-[13px] leading-6 text-earth-700">
                The optimal harvest window opens on <span className="font-semibold text-leaf-900">{harvest.harvestWindow.start}</span> and heavy
                rainfall is forecast from Sep 3. Treating the infection and harvesting inside the window are competing for the same three days.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/disease-detection"
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-risk-600 px-3.5 text-[13px] font-semibold text-white transition-colors duration-150 ease-out hover:bg-risk-700">
                  
                  <MicroscopeIcon className="h-4 w-4" aria-hidden="true" />
                  Review diagnosis &amp; treatment
                </Link>
                <Link
                  to="/harvest-planning"
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-earth-200 bg-white px-3.5 text-[13px] font-semibold text-leaf-800 transition-colors duration-150 ease-out hover:bg-earth-50">
                  
                  <CalendarClockIcon className="h-4 w-4" aria-hidden="true" />
                  Open harvest plan
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-earth-200 bg-earth-50 px-4 py-5">
          <CircularProgress value={harvest.readinessScore} tone="harvest" status={harvest.readinessStatus} size={140} />
          <div className="text-center">
            <p className="text-[13px] font-semibold text-leaf-900">
              Harvest window {harvest.harvestWindow.start} – {harvest.harvestWindow.end}
            </p>
            <p className="mt-0.5 text-[12px] leading-5 text-earth-600">
              Weather risk is {harvest.weatherRisk.toLowerCase()} for this window.
            </p>
          </div>
          <Link to="/harvest-planning" className="inline-flex items-center gap-1 text-[13px] font-semibold text-harvest-700 hover:text-harvest-800">
            Harvest planning
            <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>);

}