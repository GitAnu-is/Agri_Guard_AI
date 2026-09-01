import type { CropRecommendationResult, CropRecord, EnvironmentReadings, Farm } from '../types';
import { mockCropRecords, mockFarms, mockRecommendation } from '../data/mockCrops';
import { endpoints, mockRequest } from './apiClient';

export interface CropRecommendationPayload extends EnvironmentReadings {
  soilType: string;
  altitudeM: number;
  location: string;
}

export const cropService = {
  /** POST /api/crop/recommend — demo response, not a live model prediction. */
  async recommend(payload: CropRecommendationPayload): Promise<CropRecommendationResult> {
    // The demo response is shaped by the submitted pH and temperature so the
    // evaluator can see the output respond to input changes.
    const result: CropRecommendationResult = { ...mockRecommendation };
    if (payload.altitudeM > 400) {
      result.recommendedCrop = 'Black Pepper';
      result.comparison = [
      { crop: 'Black Pepper', score: 88 },
      { crop: 'Banana', score: 69 },
      { crop: 'Pineapple', score: 61 }];

      result.recommendationScore = 88;
      result.suitability = 88;
      result.confidence = 90.7;
      result.expectedYield = '0.9 – 1.2 t/acre';
      result.explanation =
      'At altitudes above 400 m the demo model favours Black Pepper: elevation and the cooler temperature band dominate the decision, while Banana and Pineapple lose suitability as temperature falls below their optimum.';
      result.shap = [
      { feature: 'Altitude', contribution: 31, direction: 'positive', note: `${payload.altitudeM} m suits Black Pepper's higher-elevation preference.` },
      { feature: 'Temperature', contribution: 25, direction: 'positive', note: `${payload.temperature} °C is inside the cooler optimum.` },
      { feature: 'Rainfall', contribution: 18, direction: 'positive' },
      { feature: 'Humidity', contribution: 13, direction: 'positive' },
      { feature: 'Soil pH', contribution: 8, direction: 'positive' },
      { feature: 'Potassium', contribution: 5, direction: 'positive' }];

    } else if (payload.soilPh < 5.8) {
      result.recommendedCrop = 'Pineapple';
      result.comparison = [
      { crop: 'Pineapple', score: 89 },
      { crop: 'Banana', score: 71 },
      { crop: 'Black Pepper', score: 58 }];

      result.recommendationScore = 89;
      result.suitability = 89;
      result.confidence = 91.8;
      result.expectedYield = '20.4 – 22.6 t/acre';
      result.explanation =
      'A soil pH below 5.8 shifts the demo model towards Pineapple, which tolerates acidic soils better than Banana. Soil pH becomes the dominant feature in the explanation.';
      result.shap = [
      { feature: 'Soil pH', contribution: 34, direction: 'positive', note: `pH ${payload.soilPh} matches Pineapple's acid tolerance.` },
      { feature: 'Temperature', contribution: 22, direction: 'positive' },
      { feature: 'Potassium', contribution: 17, direction: 'positive' },
      { feature: 'Rainfall', contribution: 12, direction: 'negative' },
      { feature: 'Humidity', contribution: 9, direction: 'positive' },
      { feature: 'Nitrogen', contribution: 6, direction: 'positive' }];

    }
    return mockRequest(endpoints.cropRecommend, result, { delay: 2600 });
  },

  listFarms(): Promise<Farm[]> {
    return mockRequest('GET /api/farms', mockFarms, { delay: 500 });
  },

  listCropRecords(): Promise<CropRecord[]> {
    return mockRequest('GET /api/crops', mockCropRecords, { delay: 500 });
  }
};