import { cropDistribution, lossHeatmap, marketReadinessTrend, riskDistribution, riskMatrix } from '../data/mockAnalytics';
import { cropHealthTrend, harvestReadinessTrend } from '../data/mockCrops';
import { diseaseFrequency, severityDistribution } from '../data/mockDiseaseResults';
import { lossByStage, postHarvestLossTrend } from '../data/mockHarvestData';
import { qualityGradeDistribution } from '../data/mockQualityData';
import { packagingEffectiveness, transportRiskTrend } from '../data/mockTransportationData';
import { endpoints, mockRequest } from './apiClient';

export interface AnalyticsBundle {
  cropDistribution: typeof cropDistribution;
  cropHealthTrend: typeof cropHealthTrend;
  harvestReadinessTrend: typeof harvestReadinessTrend;
  diseaseFrequency: typeof diseaseFrequency;
  severityDistribution: typeof severityDistribution;
  qualityGradeDistribution: typeof qualityGradeDistribution;
  transportRiskTrend: typeof transportRiskTrend;
  packagingEffectiveness: typeof packagingEffectiveness;
  postHarvestLossTrend: typeof postHarvestLossTrend;
  lossByStage: typeof lossByStage;
  riskDistribution: typeof riskDistribution;
  marketReadinessTrend: typeof marketReadinessTrend;
  riskMatrix: typeof riskMatrix;
  lossHeatmap: typeof lossHeatmap;
}

export const analyticsService = {
  /** GET /api/analytics */
  bundle(): Promise<AnalyticsBundle> {
    return mockRequest(
      endpoints.analytics,
      {
        cropDistribution,
        cropHealthTrend,
        harvestReadinessTrend,
        diseaseFrequency,
        severityDistribution,
        qualityGradeDistribution,
        transportRiskTrend,
        packagingEffectiveness,
        postHarvestLossTrend,
        lossByStage,
        riskDistribution,
        marketReadinessTrend,
        riskMatrix,
        lossHeatmap
      },
      { delay: 800 }
    );
  }
};