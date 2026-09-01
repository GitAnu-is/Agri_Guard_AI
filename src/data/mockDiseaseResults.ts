import type { CropName, DiseaseResult } from '../types';
import { images } from './images';

/** Diseases explicitly covered by the research scope. */
export const diseasesByCrop: Record<CropName, string[]> = {
  Pineapple: ['Fusarium Disease', 'Mealybug Wilt'],
  Banana: ['Black Sigatoka', 'Panama Disease'],
  'Black Pepper': ['Anthracnose', 'Foot Rot']
};

export const allDiseases = [
'Fusarium Disease',
'Mealybug Wilt',
'Black Sigatoka',
'Panama Disease',
'Anthracnose',
'Foot Rot'];


/** SAMPLE DATA — demo inference output, not a live model prediction. */
export const mockDiseaseResult: DiseaseResult = {
  id: 'DX-3081',
  date: '2026-08-31 08:42',
  crop: 'Banana',
  health: 'Diseased',
  disease: 'Black Sigatoka',
  confidence: 94.6,
  severity: 'High',
  infectedPercentage: 38,
  status: 'Pending Review',
  imageUrl: images.diseasedBananaLeaf,
  gradcamUrl: images.gradcamOverlay,
  maskUrl: images.gradcamOverlay,
  symptoms: [
  'Narrow dark-brown streaks running parallel to leaf veins',
  'Streaks widening into black elongated lesions with yellow halos',
  'Premature drying and collapse of older leaves',
  'Reduced effective leaf area at bunch filling stage'],

  risk:
  'High severity at bunch-filling stage. Effective leaf area loss above 30% is associated with reduced bunch weight and uneven ripening, which in turn increases post-harvest grading losses.',
  treatment: {
    immediate: [
    'Isolate affected plants and restrict movement of tools between plots',
    'Remove and destroy severely infected leaves away from the field',
    'Avoid overhead irrigation until the canopy dries'],

    management: [
    'Follow an approved fungicide programme in rotation to limit resistance build-up',
    'Improve canopy ventilation by de-suckering to 2–3 followers per mat',
    'Maintain balanced potassium nutrition to support leaf longevity'],

    prevention: [
    'Use disease-free planting material for new blocks',
    'Maintain drainage to reduce prolonged leaf wetness',
    'Keep the plantation weed-free to lower in-canopy humidity'],

    monitoring: [
    'Re-image the same plants every 7 days and log results in Disease History',
    'Track youngest leaf spotted (YLS) as a severity indicator',
    'Escalate to an agricultural officer if infected area exceeds 45%']

  },
  explanation:
  'The model focused primarily on the discoloured lesion regions along the leaf veins when identifying the disease. Activation was concentrated on the elongated dark streaks and their chlorotic margins, and was low over healthy green tissue and the background.',
  modelUsed: 'EfficientNet-B0 (demo) · Grad-CAM'
};

export const diseaseHistory: DiseaseResult[] = [
mockDiseaseResult,
{
  ...mockDiseaseResult,
  id: 'DX-3075',
  date: '2026-08-24 09:10',
  disease: 'Black Sigatoka',
  confidence: 89.1,
  severity: 'Medium',
  infectedPercentage: 22,
  status: 'Treated'
},
{
  ...mockDiseaseResult,
  id: 'DX-3068',
  date: '2026-08-17 16:03',
  crop: 'Black Pepper',
  disease: 'Anthracnose',
  confidence: 91.2,
  severity: 'Low',
  infectedPercentage: 9,
  status: 'Reviewed',
  imageUrl: images.pepperVines
},
{
  ...mockDiseaseResult,
  id: 'DX-3057',
  date: '2026-08-09 11:27',
  crop: 'Pineapple',
  disease: 'Mealybug Wilt',
  confidence: 87.4,
  severity: 'Medium',
  infectedPercentage: 17,
  status: 'Treated',
  imageUrl: images.pineappleField
},
{
  ...mockDiseaseResult,
  id: 'DX-3041',
  date: '2026-07-28 07:55',
  crop: 'Banana',
  disease: 'Panama Disease',
  confidence: 93.8,
  severity: 'High',
  infectedPercentage: 41,
  status: 'Reviewed'
},
{
  ...mockDiseaseResult,
  id: 'DX-3030',
  date: '2026-07-19 15:41',
  crop: 'Black Pepper',
  disease: 'Foot Rot',
  confidence: 90.5,
  severity: 'High',
  infectedPercentage: 34,
  status: 'Treated',
  imageUrl: images.pepperVines
},
{
  ...mockDiseaseResult,
  id: 'DX-3018',
  date: '2026-07-06 10:12',
  crop: 'Pineapple',
  disease: 'Fusarium Disease',
  confidence: 85.9,
  severity: 'Low',
  infectedPercentage: 7,
  status: 'Reviewed',
  imageUrl: images.pineappleField
},
{
  ...mockDiseaseResult,
  id: 'DX-3002',
  date: '2026-06-22 08:31',
  crop: 'Banana',
  health: 'Healthy',
  disease: 'No disease detected',
  confidence: 96.2,
  severity: 'None',
  infectedPercentage: 0,
  status: 'Reviewed'
}];


export const diseaseFrequency = [
{ disease: 'Black Sigatoka', count: 28 },
{ disease: 'Panama Disease', count: 14 },
{ disease: 'Anthracnose', count: 19 },
{ disease: 'Foot Rot', count: 11 },
{ disease: 'Fusarium Disease', count: 9 },
{ disease: 'Mealybug Wilt', count: 16 }];


export const severityDistribution = [
{ name: 'Low', value: 34 },
{ name: 'Medium', value: 41 },
{ name: 'High', value: 22 }];


export const diseaseSeverityTrend = [
{ month: 'Mar', Low: 12, Medium: 6, High: 2 },
{ month: 'Apr', Low: 10, Medium: 8, High: 3 },
{ month: 'May', Low: 9, Medium: 11, High: 4 },
{ month: 'Jun', Low: 8, Medium: 12, High: 6 },
{ month: 'Jul', Low: 7, Medium: 14, High: 8 },
{ month: 'Aug', Low: 6, Medium: 13, High: 11 }];