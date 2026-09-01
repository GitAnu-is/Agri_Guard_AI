import type { CropName, HarvestPrediction } from '../types';
import { mockHarvestPrediction } from '../data/mockHarvestData';
import { endpoints, mockRequest } from './apiClient';

export interface HarvestPayload {
  crop: CropName;
  cropAgeMonths: number;
  maturity: string;
  temperature: number;
  rainfall: number;
  humidity: number;
  season: string;
}

export const harvestService = {
  /** POST /api/harvest/predict — demo response, not a live model prediction. */
  async predict(payload: HarvestPayload): Promise<HarvestPrediction> {
    const result: HarvestPrediction = { ...mockHarvestPrediction, crop: payload.crop };

    if (payload.crop === 'Pineapple') {
      result.readinessScore = 64;
      result.readinessStatus = 'Maturing';
      result.optimalHarvestDate = 'Tuesday, 15 September 2026';
      result.harvestWindow = { start: 'Sep 12, 2026', end: 'Sep 18, 2026' };
      result.weatherRisk = 'Low';
      result.recommendation =
      'No action required this week. Predicted optimal window opens in 12 days; re-run the prediction after the forecast rainfall clears to refine the window.';
      result.timeline = [
      { stage: 'Planting', range: 'Feb 4, 2025', state: 'done' },
      { stage: 'Vegetative growth', range: 'Mar 2025 – Feb 2026', state: 'done' },
      { stage: 'Flowering / fruit set', range: 'Mar – Jun 2026', state: 'done' },
      { stage: 'Maturing (current)', range: 'Jul – Sep 2026', state: 'current' },
      { stage: 'Optimal harvest window', range: 'Sep 12 – Sep 18, 2026', state: 'optimal' },
      { stage: 'Late harvest risk', range: 'From Sep 19, 2026', state: 'risk' }];

      result.alerts = ['Forecast rainfall is not expected to affect the predicted window.', 'Schedule crate and carton supply for the week of Sep 12.'];
    } else if (payload.crop === 'Black Pepper') {
      result.readinessScore = 38;
      result.readinessStatus = 'Growing';
      result.optimalHarvestDate = 'Sunday, 8 November 2026';
      result.harvestWindow = { start: 'Nov 8, 2026', end: 'Nov 22, 2026' };
      result.weatherRisk = 'Medium';
      result.recommendation =
      'Spikes are still filling. Continue Foot Rot monitoring through the inter-monsoon period; the predicted window opens in November.';
      result.timeline = [
      { stage: 'Planting', range: 'Jun 12, 2023', state: 'done' },
      { stage: 'Vine establishment', range: '2023 – 2025', state: 'done' },
      { stage: 'Spike initiation', range: 'May – Jul 2026', state: 'done' },
      { stage: 'Berry filling (current)', range: 'Aug – Oct 2026', state: 'current' },
      { stage: 'Optimal harvest window', range: 'Nov 8 – Nov 22, 2026', state: 'optimal' },
      { stage: 'Late harvest risk', range: 'From Nov 23, 2026', state: 'risk' }];

      result.alerts = ['Sustained rainfall raises Foot Rot risk — inspect vine collars weekly.'];
    }

    return mockRequest(endpoints.harvestPredict, result, { delay: 2400 });
  }
};