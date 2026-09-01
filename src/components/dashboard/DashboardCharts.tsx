import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis } from
'recharts';
import { ChartCard } from '../ui/ChartCard';
import { cropHealthTrend, harvestReadinessTrend } from '../../data/mockCrops';
import { postHarvestLossTrend } from '../../data/mockHarvestData';
import { riskDistribution } from '../../data/mockAnalytics';
import { weatherTrend30Day } from '../../data/mockWeather';
import { chartColors, cropColors } from '../../utils/semantics';

const axisStyle = { fontSize: 12, fill: chartColors.axis };
const tooltipStyle = {
  borderRadius: 10,
  border: '1px solid #e3d9c9',
  fontSize: 12,
  boxShadow: '0 4px 12px rgb(16 24 40 / 0.08)'
};

const riskColors = [chartColors.leaf, chartColors.harvest, chartColors.risk, '#7a271a'];

export function DashboardCharts() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <ChartCard
        title="Crop health trend"
        description="Health index per crop over the last six months. Banana's decline tracks the Black Sigatoka progression."
        height={280}>
        
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cropHealthTrend} margin={{ top: 8, right: 16, bottom: 4, left: -12 }}>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis domain={[50, 100]} tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {(['Pineapple', 'Banana', 'Black Pepper'] as const).map((crop) =>
            <Line key={crop} type="monotone" dataKey={crop} stroke={cropColors[crop]} strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Harvest readiness trend"
        description="Predicted readiness score per crop. Banana crosses the harvest threshold this month."
        height={280}>
        
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={harvestReadinessTrend} margin={{ top: 8, right: 16, bottom: 4, left: -12 }}>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {(['Pineapple', 'Banana', 'Black Pepper'] as const).map((crop) =>
            <Area
              key={crop}
              type="monotone"
              dataKey={crop}
              stroke={cropColors[crop]}
              fill={cropColors[crop]}
              fillOpacity={0.12}
              strokeWidth={2.5} />

            )}
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Weather trend" description="Weekly mean temperature against total rainfall for the selected location." height={260}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weatherTrend30Day} margin={{ top: 8, right: 16, bottom: 4, left: -12 }}>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="period" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={axisStyle} axisLine={false} tickLine={false} unit="°C" domain={[24, 34]} />
            <YAxis yAxisId="right" orientation="right" tick={axisStyle} axisLine={false} tickLine={false} unit="mm" />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line yAxisId="left" type="monotone" dataKey="temperature" name="Temperature" stroke={chartColors.harvest} strokeWidth={2.5} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="rainfall" name="Rainfall" stroke={chartColors.sky} strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
        <ChartCard title="Risk distribution" description="Share of assessments by risk band." height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={riskDistribution} dataKey="value" nameKey="name" innerRadius={44} outerRadius={72} paddingAngle={2}>
                {riskDistribution.map((entry, i) =>
                <Cell key={entry.name} fill={riskColors[i]} />
                )}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Post-harvest loss trend" description="Measured loss against the 15% target." height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={postHarvestLossTrend} margin={{ top: 8, right: 12, bottom: 4, left: -18 }}>
              <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis domain={[10, 25]} tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="loss" name="Loss" stroke={chartColors.risk} fill={chartColors.risk} fillOpacity={0.12} strokeWidth={2.5} />
              <Line type="monotone" dataKey="target" name="Target" stroke={chartColors.leaf} strokeDasharray="5 5" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>);

}