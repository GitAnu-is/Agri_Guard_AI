import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CheckCircle2Icon, DropletsIcon, LayoutGridIcon, SproutIcon, TractorIcon, WindIcon } from 'lucide-react';
import type { CropRecommendationResult } from '../../types';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { ChartCard } from '../ui/ChartCard';
import { Badge, ConfidenceBadge, DemoBadge } from '../ui/Badge';
import { ProgressBar } from '../ui/Progress';
import { RecommendationCard } from '../RecommendationCard';
import { InfoGrid } from '../InfoGrid';
import { chartColors, cropColors } from '../../utils/semantics';

const axisStyle = { fontSize: 12, fill: chartColors.axis };
const tooltipStyle = { borderRadius: 10, border: '1px solid #e3d9c9', fontSize: 12 };

const icons: Record<string, React.ReactNode> = {
  shovel: <TractorIcon className="h-4 w-4" aria-hidden="true" />,
  droplets: <DropletsIcon className="h-4 w-4" aria-hidden="true" />,
  sprout: <SproutIcon className="h-4 w-4" aria-hidden="true" />,
  grid: <LayoutGridIcon className="h-4 w-4" aria-hidden="true" />,
  wind: <WindIcon className="h-4 w-4" aria-hidden="true" />
};

export function RecommendationResult({ result }: {result: CropRecommendationResult;}) {
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="grid gap-6 border-b border-earth-200 bg-leaf-50/60 px-5 py-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-leaf-700">Recommended crop</p>
            <h2 className="mt-1 text-[40px] font-bold uppercase leading-none tracking-tight text-leaf-900">{result.recommendedCrop}</h2>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge tone="leaf">Recommendation score {result.recommendationScore}%</Badge>
              <ConfidenceBadge value={result.confidence} />
              <DemoBadge />
            </div>
            <p className="mt-4 max-w-xl text-[13px] leading-6 text-earth-700">{result.explanation}</p>
          </div>
          <div className="space-y-3.5">
            <ProgressBar value={result.suitability} tone="leaf" label="Suitability score" showValue />
            <ProgressBar value={result.environmentalCompatibility} tone="sky" label="Environmental compatibility" showValue />
            <InfoGrid
              columns={2}
              items={[
              { label: 'Expected yield', value: result.expectedYield },
              { label: 'Model', value: result.modelUsed }]
              } />
            
          </div>
        </div>

        <CardBody>
          <h3 className="text-[13px] font-semibold uppercase tracking-wide text-earth-500">Crop comparison</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {result.comparison.map((c) => {
              const recommended = c.crop === result.recommendedCrop;
              return (
                <article
                  key={c.crop}
                  className={
                  recommended ?
                  'rounded-xl border-2 border-leaf-500 bg-white p-4' :
                  'rounded-xl border border-earth-200 bg-white p-4'
                  }>
                  
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[14px] font-semibold text-leaf-900">{c.crop}</p>
                    {recommended && <CheckCircle2Icon className="h-4 w-4 text-leaf-600" aria-hidden="true" />}
                  </div>
                  <p className="mt-2 font-mono text-2xl font-bold text-leaf-900">{c.score}%</p>
                  <ProgressBar value={c.score} tone={recommended ? 'leaf' : c.score >= 70 ? 'harvest' : 'earth'} height="sm" className="mt-2" />
                </article>);

            })}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <ChartCard title="Suitability by crop" description="Model-assigned suitability score for each crop in the research scope." height={280}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={result.comparison} margin={{ top: 8, right: 16, bottom: 4, left: -12 }}>
              <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="crop" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={56}>
                {result.comparison.map((c) =>
                <Cell key={c.crop} fill={cropColors[c.crop]} />
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Environmental fit profile" description="Per-factor compatibility of each crop with the submitted conditions." height={280}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={result.radar} outerRadius="72%">
              <PolarGrid stroke={chartColors.grid} />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: chartColors.axis }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: chartColors.axis }} />
              <Tooltip contentStyle={tooltipStyle} />
              {(['Pineapple', 'Banana', 'Black Pepper'] as const).map((crop) =>
              <Radar key={crop} name={crop} dataKey={crop} stroke={cropColors[crop]} fill={cropColors[crop]} fillOpacity={0.14} strokeWidth={2} />
              )}
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Card>
        <CardHeader
          title="Cultivation recommendations"
          description={`Agronomic guidance for ${result.recommendedCrop} on this land. Indicative values for demonstration — confirm with an agricultural officer.`} />
        
        <CardBody>
          <div className="grid gap-3 lg:grid-cols-2">
            {result.cultivation.map((item) =>
            <RecommendationCard key={item.title} title={item.title} detail={item.detail} icon={icons[item.icon]} tone="leaf" />
            )}
          </div>
        </CardBody>
      </Card>
    </div>);

}