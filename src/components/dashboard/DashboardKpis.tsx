import React from 'react';
import { motion } from 'framer-motion';
import {
  ActivityIcon,
  CloudRainIcon,
  GaugeIcon,
  LeafIcon,
  PackageMinusIcon,
  ScanSearchIcon,
  StoreIcon,
  TruckIcon } from
'lucide-react';
import { StatCard, type StatCardProps } from '../ui/StatCard';
import { DemoBadge } from '../ui/Badge';

const kpis: StatCardProps[] = [
{
  label: 'Current crop',
  value: 'Banana',
  caption: 'Plot B · planted Nov 18, 2025 · 9 months old',
  tone: 'leaf',
  icon: <LeafIcon className="h-4 w-4" aria-hidden="true" />,
  to: '/farm'
},
{
  label: 'Crop suitability',
  value: '91',
  unit: '%',
  caption: 'Banana ranked highest for this land',
  tone: 'leaf',
  progress: 91,
  icon: <ScanSearchIcon className="h-4 w-4" aria-hidden="true" />,
  to: '/crop-recommendation'
},
{
  label: 'Disease risk',
  value: 'High',
  caption: 'Black Sigatoka · 38% leaf area infected',
  tone: 'risk',
  progress: 78,
  icon: <ActivityIcon className="h-4 w-4" aria-hidden="true" />,
  to: '/disease-detection'
},
{
  label: 'Harvest readiness',
  value: '86',
  unit: '%',
  caption: 'Almost ready · window opens Sep 1',
  tone: 'harvest',
  progress: 86,
  icon: <GaugeIcon className="h-4 w-4" aria-hidden="true" />,
  to: '/harvest-planning'
},
{
  label: 'Transportation risk',
  value: '68',
  unit: '%',
  caption: 'Medium · Gampaha → Manning Market',
  tone: 'harvest',
  progress: 68,
  icon: <TruckIcon className="h-4 w-4" aria-hidden="true" />,
  to: '/transportation-risk'
},
{
  label: 'Market readiness',
  value: '88',
  unit: '%',
  caption: 'Grade A · 6-day estimated shelf life',
  tone: 'leaf',
  progress: 88,
  icon: <StoreIcon className="h-4 w-4" aria-hidden="true" />,
  to: '/market-readiness'
},
{
  label: 'Estimated crop loss',
  value: '15.4',
  unit: '%',
  caption: 'Against a 15% programme target',
  tone: 'harvest',
  trend: { value: '1.4 pts', direction: 'down', good: true },
  icon: <PackageMinusIcon className="h-4 w-4" aria-hidden="true" />,
  to: '/analytics'
},
{
  label: 'Weather risk',
  value: 'High',
  caption: '48 mm rainfall forecast on Sep 3',
  tone: 'sky',
  progress: 74,
  icon: <CloudRainIcon className="h-4 w-4" aria-hidden="true" />,
  to: '/weather'
}];


export function DashboardKpis() {
  return (
    <section aria-labelledby="kpi-heading">
      <div className="mb-3 flex items-center gap-2">
        <h2 id="kpi-heading" className="text-[13px] font-semibold uppercase tracking-wide text-earth-500">
          Farm indicators
        </h2>
        <DemoBadge />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi, i) =>
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: Math.min(i * 0.035, 0.24), ease: [0.23, 1, 0.32, 1] }}>
          
            <StatCard {...kpi} />
          </motion.div>
        )}
      </div>
    </section>);

}