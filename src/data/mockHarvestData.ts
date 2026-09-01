import type { HarvestPrediction } from '../types';
import { sevenDayForecast } from './mockWeather';

/** SAMPLE DATA — demo output of the harvest prediction component. */
export const mockHarvestPrediction: HarvestPrediction = {
  crop: 'Banana',
  optimalHarvestDate: 'Tuesday, 1 September 2026',
  harvestWindow: { start: 'Sep 1, 2026', end: 'Sep 3, 2026' },
  readinessScore: 86,
  readinessStatus: 'Almost Ready',
  weatherRisk: 'High',
  recommendation:
  'Harvest within Sep 1 – Sep 3. Heavy rainfall of 48 mm is forecast for Sep 3–4, which raises handling damage and field-loss risk. Harvesting before Sep 3 keeps the consignment inside the Grade A quality band.',
  timeline: [
  { stage: 'Planting', range: 'Nov 18, 2025', state: 'done' },
  { stage: 'Vegetative growth', range: 'Dec 2025 – Apr 2026', state: 'done' },
  { stage: 'Flowering', range: 'May 2026', state: 'done' },
  { stage: 'Maturing (current)', range: 'Jun – Aug 2026', state: 'current' },
  { stage: 'Optimal harvest window', range: 'Sep 1 – Sep 3, 2026', state: 'optimal' },
  { stage: 'Late harvest risk', range: 'From Sep 4, 2026', state: 'risk' }],

  forecast: sevenDayForecast,
  alerts: [
  'Heavy rainfall expected in 3 days. Consider harvesting within the recommended window.',
  'Humidity above 90% on Sep 3–4 increases post-harvest rot risk for field-packed fruit.',
  'Arrange transport capacity for Sep 1–2 to avoid holding harvested fruit on-farm.'],

  shap: [
  { feature: 'Crop age (9 months)', contribution: 29, direction: 'positive' },
  { feature: 'Maturity indicators', contribution: 24, direction: 'positive' },
  { feature: 'Accumulated heat units', contribution: 18, direction: 'positive' },
  { feature: 'Forecast rainfall', contribution: 15, direction: 'negative' },
  { feature: 'Humidity', contribution: 9, direction: 'negative' },
  { feature: 'Season (Yala)', contribution: 5, direction: 'positive' }],

  modelUsed: 'LSTM + Prophet ensemble (demo)'
};

export const maturityIndicators = [
{ label: 'Fruit angularity', value: 'Rounded (grade 3/4)' },
{ label: 'Finger length', value: '19.4 cm avg' },
{ label: 'Peel colour', value: 'Light green, breaking' },
{ label: 'Bunch age since flowering', value: '13 weeks' }];


export const postHarvestLossTrend = [
{ month: 'Mar', loss: 22.4, target: 15 },
{ month: 'Apr', loss: 21.1, target: 15 },
{ month: 'May', loss: 19.6, target: 15 },
{ month: 'Jun', loss: 18.2, target: 15 },
{ month: 'Jul', loss: 16.8, target: 15 },
{ month: 'Aug', loss: 15.4, target: 15 }];


export const lossByStage = [
{ stage: 'Field / harvesting', value: 4.1 },
{ stage: 'On-farm handling', value: 2.6 },
{ stage: 'Packaging', value: 2.2 },
{ stage: 'Transportation', value: 4.3 },
{ stage: 'Storage', value: 2.2 }];