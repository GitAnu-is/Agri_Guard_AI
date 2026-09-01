import type { AIModelInfo } from '../types';
import { classificationComparison, confusionMatrix, mockModels, regressionComparison } from '../data/mockModels';
import { endpoints, mockRequest } from './apiClient';

export const modelService = {
  /** GET /api/models */
  list(): Promise<AIModelInfo[]> {
    return mockRequest(endpoints.models, mockModels, { delay: 600 });
  },

  performance(): Promise<{
    classification: typeof classificationComparison;
    regression: typeof regressionComparison;
    confusionMatrix: typeof confusionMatrix;
  }> {
    return mockRequest(
      'GET /api/models/performance',
      { classification: classificationComparison, regression: regressionComparison, confusionMatrix },
      { delay: 700 }
    );
  }
};