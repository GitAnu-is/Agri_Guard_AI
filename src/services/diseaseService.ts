import type { CropName, DiseaseResult } from '../types';
import { diseaseHistory, mockDiseaseResult } from '../data/mockDiseaseResults';
import { endpoints, mockRequest } from './apiClient';

export const diseaseService = {
  /** POST /api/disease/predict — demo response, not a live model prediction. */
  async predict(crop: CropName, imageDataUrl: string): Promise<DiseaseResult> {
    const result: DiseaseResult = {
      ...mockDiseaseResult,
      crop,
      // The uploaded image is echoed back so the demo shows the user's own capture.
      imageUrl: imageDataUrl || mockDiseaseResult.imageUrl
    };

    if (crop === 'Pineapple') {
      result.disease = 'Mealybug Wilt';
      result.confidence = 90.3;
      result.severity = 'Medium';
      result.infectedPercentage = 21;
      result.symptoms = [
      'Reddening and inward curling of leaf margins',
      'Wilting from the leaf tip downward',
      'Reduced root activity and stunted fruit development',
      'Mealybug colonies at the leaf base'];

      result.risk =
      'Medium severity. Mealybug Wilt spreads through mealybug and ant activity, so untreated patches expand rapidly and reduce fruit size at harvest.';
      result.explanation =
      'The model concentrated on the reddened, inward-curled leaf margins and the basal leaf region when assigning this class. Activation over uniformly green tissue was low.';
    } else if (crop === 'Black Pepper') {
      result.disease = 'Anthracnose';
      result.confidence = 91.2;
      result.severity = 'Low';
      result.infectedPercentage = 9;
      result.symptoms = [
      'Small circular brown spots with dark margins on leaves',
      'Spots coalescing into irregular necrotic patches',
      'Spike shedding in advanced infections',
      'Lesions on young berries'];

      result.risk =
      'Low severity. Contained at present, but sustained leaf wetness above 80% humidity can escalate infection to spike shedding and direct yield loss.';
      result.explanation =
      'The model focused on the circular necrotic spots and their dark margins. Attention was distributed across several small lesions rather than one region, which is consistent with early-stage Anthracnose.';
    }

    return mockRequest(endpoints.diseasePredict, result, { delay: 3000 });
  },

  /** POST /api/disease/severity */
  async severity(id: string): Promise<{id: string;severity: DiseaseResult['severity'];infectedPercentage: number;}> {
    return mockRequest(endpoints.diseaseSeverity, {
      id,
      severity: mockDiseaseResult.severity,
      infectedPercentage: mockDiseaseResult.infectedPercentage
    });
  },

  history(): Promise<DiseaseResult[]> {
    return mockRequest('GET /api/disease/history', diseaseHistory, { delay: 600 });
  }
};