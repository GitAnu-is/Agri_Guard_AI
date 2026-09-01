import type { CropName, PackagingRecommendation, TransportInput, TransportRiskResult } from '../types';
import { mockTransportRisk, packagingRecommendations } from '../data/mockTransportationData';
import { endpoints, mockRequest } from './apiClient';

/** Weight table used to make the demo output respond to the submitted inputs. */
const roadWeights: Record<string, number> = {
  'Good (A-grade metalled)': -12,
  'Fair (B-grade metalled)': 0,
  'Poor (gravel)': 10,
  'Very poor (unpaved rural)': 18
};

const packagingWeights: Record<string, number> = {
  'Ventilated corrugated produce box': -16,
  'Plastic crate': -10,
  'Wooden crate': -4,
  'Woven polypropylene sack': 0,
  'Bulk loose (unpackaged)': 9
};

export const transportService = {
  /** POST /api/transport/risk — demo response, not a live model prediction. */
  async predictRisk(input: TransportInput): Promise<TransportRiskResult> {
    let probability = 40;
    probability += Math.min(input.distanceKm / 4, 22);
    probability += Math.min(input.durationHours * 3, 12);
    probability += roadWeights[input.roadCondition] ?? 0;
    probability += packagingWeights[input.packagingType] ?? 0;
    probability += input.temperature > 30 ? 8 : input.temperature > 26 ? 4 : 0;
    probability += input.humidity > 80 ? 6 : input.humidity > 70 ? 3 : 0;
    probability += input.storageCondition.startsWith('Refrigerated') ? -14 : input.storageCondition.startsWith('Cooled') ? -8 : 0;
    probability += input.cropSensitivity === 'Very high' ? 6 : input.cropSensitivity === 'High' ? 3 : 0;

    const damageProbability = Math.max(8, Math.min(94, Math.round(probability)));
    const riskLevel: TransportRiskResult['riskLevel'] =
    damageProbability >= 80 ? 'Critical' : damageProbability >= 70 ? 'High' : damageProbability >= 40 ? 'Medium' : 'Low';

    const result: TransportRiskResult = {
      ...mockTransportRisk,
      damageProbability,
      riskLevel,
      factors: mockTransportRisk.factors.map((f) => ({ ...f }))
    };

    result.explanation = `Transportation risk is ${result.riskLevel} at ${damageProbability}% predicted damage probability for ${input.crop} over ${input.distanceKm} km on ${input.roadCondition.toLowerCase()}. Distance and road condition dominate the prediction, amplified by ${input.temperature} °C and ${input.humidity}% relative humidity. Packaging remains the largest controllable lever in this consignment.`;

    return mockRequest(endpoints.transportRisk, result, { delay: 2500 });
  },

  /** POST /api/packaging/recommend */
  recommendPackaging(crop: CropName): Promise<PackagingRecommendation> {
    const match = packagingRecommendations.find((p) => p.crop === crop) ?? packagingRecommendations[0];
    return mockRequest(endpoints.packagingRecommend, match, { delay: 1200 });
  }
};