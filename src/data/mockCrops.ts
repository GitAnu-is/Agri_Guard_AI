import type { CropName, CropRecord, CropRecommendationResult, Farm } from '../types';
import { images } from './images';

/** SAMPLE DATA — demo farm and crop records. */
export const cropImages: Record<CropName, string> = {
  Pineapple: images.pineappleField,
  Banana: images.bananaField,
  'Black Pepper': images.pepperVines
};

export const supportedCrops: CropName[] = ['Pineapple', 'Banana', 'Black Pepper'];

export const mockFarms: Farm[] = [
{
  id: 'FARM-01',
  name: 'Meewitiya Estate — Plot B',
  location: 'Meewitiya, Gampaha',
  district: 'Gampaha',
  latitude: 7.0917,
  longitude: 79.9999,
  landSizeAcres: 3.5,
  soilType: 'Red Yellow Podzolic',
  altitudeM: 42,
  currentCrop: 'Banana',
  plantingDate: '2025-11-18',
  cropAgeMonths: 9,
  environment: {
    soilPh: 6.2,
    nitrogen: 96,
    phosphorus: 42,
    potassium: 118,
    soilMoisture: 62,
    temperature: 31,
    rainfall: 178,
    humidity: 78,
    season: 'Yala'
  }
},
{
  id: 'FARM-02',
  name: 'Halgahawela Fields — Plot A',
  location: 'Halgahawela, Kurunegala',
  district: 'Kurunegala',
  latitude: 7.4863,
  longitude: 80.3647,
  landSizeAcres: 5.2,
  soilType: 'Reddish Brown Latosolic',
  altitudeM: 116,
  currentCrop: 'Pineapple',
  plantingDate: '2025-02-04',
  cropAgeMonths: 18,
  environment: {
    soilPh: 5.6,
    nitrogen: 74,
    phosphorus: 38,
    potassium: 142,
    soilMoisture: 48,
    temperature: 32,
    rainfall: 132,
    humidity: 71,
    season: 'Yala'
  }
},
{
  id: 'FARM-03',
  name: 'Ukuwela Spice Garden',
  location: 'Ukuwela, Matale',
  district: 'Matale',
  latitude: 7.4675,
  longitude: 80.6234,
  landSizeAcres: 2.1,
  soilType: 'Clay Loam',
  altitudeM: 468,
  currentCrop: 'Black Pepper',
  plantingDate: '2023-06-12',
  cropAgeMonths: 38,
  environment: {
    soilPh: 6.0,
    nitrogen: 88,
    phosphorus: 46,
    potassium: 104,
    soilMoisture: 58,
    temperature: 27,
    rainfall: 204,
    humidity: 84,
    season: 'Inter-monsoon'
  }
}];


export const mockCropRecords: CropRecord[] = [
{
  id: 'CR-2210',
  crop: 'Banana',
  imageUrl: images.bananaField,
  farmId: 'FARM-01',
  location: 'Meewitiya, Gampaha',
  plantingDate: '2025-11-18',
  cropAgeMonths: 9,
  expectedHarvest: '2026-09-02',
  healthScore: 68,
  healthStatus: 'Diseased',
  harvestReadiness: 86,
  yieldEstimate: '11.4 t/acre',
  riskLevel: 'High',
  status: 'Optimal harvest window opens Sep 1'
},
{
  id: 'CR-2189',
  crop: 'Pineapple',
  imageUrl: images.pineappleField,
  farmId: 'FARM-02',
  location: 'Halgahawela, Kurunegala',
  plantingDate: '2025-02-04',
  cropAgeMonths: 18,
  expectedHarvest: '2026-09-15',
  healthScore: 91,
  healthStatus: 'Healthy',
  harvestReadiness: 64,
  yieldEstimate: '21.8 t/acre',
  riskLevel: 'Low',
  status: 'Maturing — 12 days to predicted window'
},
{
  id: 'CR-2154',
  crop: 'Black Pepper',
  imageUrl: images.pepperVines,
  farmId: 'FARM-03',
  location: 'Ukuwela, Matale',
  plantingDate: '2023-06-12',
  cropAgeMonths: 38,
  expectedHarvest: '2026-11-08',
  healthScore: 79,
  healthStatus: 'At Risk',
  harvestReadiness: 38,
  yieldEstimate: '0.9 t/acre',
  riskLevel: 'Medium',
  status: 'Foot Rot risk elevated by sustained rainfall'
}];


export const cropHealthTrend = [
{ month: 'Mar', Pineapple: 88, Banana: 91, 'Black Pepper': 84 },
{ month: 'Apr', Pineapple: 89, Banana: 89, 'Black Pepper': 83 },
{ month: 'May', Pineapple: 91, Banana: 86, 'Black Pepper': 82 },
{ month: 'Jun', Pineapple: 92, Banana: 80, 'Black Pepper': 81 },
{ month: 'Jul', Pineapple: 91, Banana: 74, 'Black Pepper': 80 },
{ month: 'Aug', Pineapple: 91, Banana: 68, 'Black Pepper': 79 }];


export const harvestReadinessTrend = [
{ month: 'Mar', Pineapple: 18, Banana: 32, 'Black Pepper': 10 },
{ month: 'Apr', Pineapple: 28, Banana: 46, 'Black Pepper': 14 },
{ month: 'May', Pineapple: 37, Banana: 58, 'Black Pepper': 19 },
{ month: 'Jun', Pineapple: 46, Banana: 68, 'Black Pepper': 25 },
{ month: 'Jul', Pineapple: 55, Banana: 78, 'Black Pepper': 31 },
{ month: 'Aug', Pineapple: 64, Banana: 86, 'Black Pepper': 38 }];


/** SAMPLE DATA — demo output of the crop recommendation component. */
export const mockRecommendation: CropRecommendationResult = {
  recommendedCrop: 'Banana',
  recommendationScore: 91,
  confidence: 93.4,
  suitability: 91,
  expectedYield: '11.2 – 12.6 t/acre',
  environmentalCompatibility: 88,
  comparison: [
  { crop: 'Banana', score: 91 },
  { crop: 'Pineapple', score: 72 },
  { crop: 'Black Pepper', score: 65 }],

  radar: [
  { metric: 'Soil pH', Pineapple: 68, Banana: 92, 'Black Pepper': 74 },
  { metric: 'Nutrients (NPK)', Pineapple: 71, Banana: 88, 'Black Pepper': 66 },
  { metric: 'Temperature', Pineapple: 82, Banana: 94, 'Black Pepper': 58 },
  { metric: 'Rainfall', Pineapple: 64, Banana: 89, 'Black Pepper': 78 },
  { metric: 'Humidity', Pineapple: 70, Banana: 86, 'Black Pepper': 80 },
  { metric: 'Altitude', Pineapple: 78, Banana: 90, 'Black Pepper': 44 }],

  cultivation: [
  {
    title: 'Soil preparation',
    icon: 'shovel',
    detail:
    'Deep-plough to 30 cm and incorporate 10–15 t/ha of well-decomposed organic matter. Maintain soil pH between 6.0 and 6.5; the recorded pH of 6.2 needs no correction.'
  },
  {
    title: 'Irrigation',
    icon: 'droplets',
    detail:
    'Provide 25–30 mm per week during the vegetative stage. With 178 mm monthly rainfall, supplement only during dry spells and ensure drainage channels are open before the forecast rainfall.'
  },
  {
    title: 'Fertilization',
    icon: 'sprout',
    detail:
    'Apply N:P:K in a 3:1:6 ratio in split doses every 8 weeks. Potassium is the limiting nutrient for bunch filling — top-dress with muriate of potash before flowering.'
  },
  {
    title: 'Planting guidance',
    icon: 'grid',
    detail:
    'Space suckers at 2.0 m × 2.0 m (approximately 1,000 plants/acre). Use disease-free tissue-cultured planting material to reduce Panama Disease incidence.'
  },
  {
    title: 'Environmental considerations',
    icon: 'wind',
    detail:
    'Establish windbreaks on the western boundary; the plot altitude of 42 m and open aspect increases lodging risk during monsoon gusts above 25 km/h.'
  }],

  shap: [
  { feature: 'Temperature', contribution: 32, direction: 'positive', note: '31 °C sits inside the 27–33 °C Banana optimum.' },
  { feature: 'Rainfall', contribution: 24, direction: 'positive', note: '178 mm/month supports continuous vegetative growth.' },
  { feature: 'Soil pH', contribution: 18, direction: 'positive', note: 'pH 6.2 is near-ideal for nutrient availability.' },
  { feature: 'Humidity', contribution: 12, direction: 'positive', note: '78% RH favours growth but raises disease pressure.' },
  { feature: 'Nitrogen', contribution: 8, direction: 'positive', note: '96 kg/ha adequate for leaf development.' },
  { feature: 'Altitude', contribution: 6, direction: 'positive', note: '42 m is well within the low-elevation preference.' }],

  explanation:
  'The model assigned Banana the highest suitability primarily because temperature and monthly rainfall for this land fall inside the crop\'s optimal range, reinforced by a near-neutral soil pH. Black Pepper scored lowest because the recorded altitude and temperature deviate from its preferred cooler, higher-elevation conditions.',
  modelUsed: 'Random Forest (demo) · SHAP TreeExplainer'
};