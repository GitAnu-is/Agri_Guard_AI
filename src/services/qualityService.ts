import type { CropName, Defect, MarketReadiness, QualityAssessment, StorageRecommendation } from '../types';
import { mockMarketReadiness, mockQualityAssessment, storageRecommendations } from '../data/mockQualityData';
import { endpoints, mockRequest } from './apiClient';

export const qualityService = {
  /** POST /api/quality/predict — demo response, not a live model prediction. */
  async assess(crop: CropName, imageDataUrl: string): Promise<QualityAssessment> {
    const result: QualityAssessment = {
      ...mockQualityAssessment,
      crop,
      imageUrl: imageDataUrl || mockQualityAssessment.imageUrl,
      defectImageUrl: imageDataUrl || mockQualityAssessment.defectImageUrl
    };

    if (crop === 'Pineapple') {
      result.grade = 'B';
      result.gradeLabel = 'Good';
      result.qualityScore = 83;
      result.confidence = 92;
      result.defectStatus = 'Moderate defects';
      result.defects = [
      { id: 'D1', label: 'Bruising', confidence: 90.1, box: { x: 0.22, y: 0.28, w: 0.2, h: 0.18 } },
      { id: 'D2', label: 'Discoloration', confidence: 84.6, box: { x: 0.52, y: 0.2, w: 0.18, h: 0.16 } },
      { id: 'D3', label: 'Physical damage', confidence: 77.3, box: { x: 0.4, y: 0.63, w: 0.24, h: 0.17 } }];

      result.factors = [
      { label: 'Surface integrity', value: 84 },
      { label: 'Colour uniformity', value: 81 },
      { label: 'Size consistency', value: 90 },
      { label: 'Crown condition', value: 78 },
      { label: 'Defect load', value: 74 }];

    } else if (crop === 'Black Pepper') {
      result.grade = 'A';
      result.gradeLabel = 'Premium';
      result.qualityScore = 93;
      result.confidence = 90;
      result.defectStatus = 'Trace defects';
      result.defects = [
      { id: 'D1', label: 'Discoloration', confidence: 71.4, box: { x: 0.3, y: 0.34, w: 0.14, h: 0.12 } }];

      result.factors = [
      { label: 'Berry uniformity', value: 94 },
      { label: 'Colour / bulk density', value: 92 },
      { label: 'Moisture proxy', value: 90 },
      { label: 'Foreign matter', value: 96 },
      { label: 'Defect load', value: 91 }];

    }

    return mockRequest(endpoints.qualityPredict, result, { delay: 2800 });
  },

  /** POST /api/quality/defects */
  detectDefects(crop: CropName): Promise<Defect[]> {
    void crop;
    return mockRequest(endpoints.qualityDefects, mockQualityAssessment.defects, { delay: 1400 });
  },

  /** POST /api/market/readiness — demo response. */
  async marketReadiness(crop: CropName): Promise<MarketReadiness> {
    const result: MarketReadiness = { ...mockMarketReadiness, crop };
    if (crop === 'Pineapple') {
      result.score = 79;
      result.level = 'Hold Briefly';
      result.shelfLifeDays = 12;
      result.recommendedStorage = 'Ventilated store at 8–12 °C, 85–90% RH';
      result.recommendedTiming = 'Dispatch within 3 days; grading uplift possible after 24 h de-greening';
      result.action = 'Hold for up to 24 hours, then transport within 3 days.';
      result.shelfLife = [
      { day: 'Day 0', quality: 83, phase: 'Peak' },
      { day: 'Day 2', quality: 81, phase: 'Peak' },
      { day: 'Day 4', quality: 78, phase: 'Marketable' },
      { day: 'Day 6', quality: 73, phase: 'Marketable' },
      { day: 'Day 8', quality: 67, phase: 'Declining' },
      { day: 'Day 10', quality: 60, phase: 'Declining' },
      { day: 'Day 12', quality: 53, phase: 'End of shelf life' },
      { day: 'Day 14', quality: 42, phase: 'Loss' }];

    } else if (crop === 'Black Pepper') {
      result.score = 94;
      result.level = 'Ready for Market';
      result.shelfLifeDays = 180;
      result.recommendedStorage = 'Dry palletised store at 20–25 °C, below 60% RH';
      result.recommendedTiming = 'No urgency — dispatch against price signals';
      result.action = 'Store dry and dispatch when market prices are favourable.';
      result.shelfLife = [
      { day: 'Month 0', quality: 94, phase: 'Peak' },
      { day: 'Month 1', quality: 93, phase: 'Peak' },
      { day: 'Month 2', quality: 91, phase: 'Marketable' },
      { day: 'Month 3', quality: 89, phase: 'Marketable' },
      { day: 'Month 4', quality: 86, phase: 'Marketable' },
      { day: 'Month 5', quality: 82, phase: 'Declining' },
      { day: 'Month 6', quality: 77, phase: 'End of shelf life' }];

    }
    return mockRequest(endpoints.marketReadiness, result, { delay: 1800 });
  },

  storage(crop: CropName): Promise<StorageRecommendation> {
    const match = storageRecommendations.find((s) => s.crop === crop) ?? storageRecommendations[0];
    return mockRequest('GET /api/storage/recommend', match, { delay: 600 });
  }
};