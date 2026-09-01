import type { MarketReadiness, QualityAssessment, StorageRecommendation } from '../types';
import { images } from './images';

export const qualityGradeMeta = [
{ grade: 'A' as const, label: 'Premium', range: '90 – 100', description: 'Export / premium retail. No visible defects beyond trace surface marks.' },
{ grade: 'B' as const, label: 'Good', range: '75 – 89', description: 'Primary wholesale market. Minor defects that do not affect shelf life.' },
{ grade: 'C' as const, label: 'Acceptable', range: '55 – 74', description: 'Local market or processing. Visible defects, shortened shelf life.' },
{ grade: 'D' as const, label: 'Poor', range: 'Below 55', description: 'Processing or rejection. Significant damage or early spoilage.' }];


/** SAMPLE DATA — demo output of the harvest quality grading component. */
export const mockQualityAssessment: QualityAssessment = {
  crop: 'Banana',
  grade: 'A',
  gradeLabel: 'Premium',
  qualityScore: 91,
  defectStatus: 'Minor defects',
  confidence: 94,
  imageUrl: images.harvestedBanana,
  defectImageUrl: images.bananaDefects,
  defects: [
  { id: 'D1', label: 'Bruising', confidence: 88.4, box: { x: 0.18, y: 0.22, w: 0.17, h: 0.14 } },
  { id: 'D2', label: 'Discoloration', confidence: 81.7, box: { x: 0.56, y: 0.31, w: 0.2, h: 0.13 } },
  { id: 'D3', label: 'Compression', confidence: 74.9, box: { x: 0.34, y: 0.62, w: 0.22, h: 0.16 } },
  { id: 'D4', label: 'Physical damage', confidence: 69.2, box: { x: 0.66, y: 0.68, w: 0.15, h: 0.12 } }],

  factors: [
  { label: 'Surface integrity', value: 93 },
  { label: 'Colour uniformity', value: 89 },
  { label: 'Size consistency', value: 95 },
  { label: 'Firmness proxy', value: 87 },
  { label: 'Defect load', value: 82 }],

  modelUsed: 'EfficientNet grader + YOLOv8 defect detector (demo)'
};

export const defectSummary = [
{ label: 'Bruising', count: 1, severity: 'Minor', impact: 'Low' },
{ label: 'Discoloration', count: 1, severity: 'Minor', impact: 'Low' },
{ label: 'Compression', count: 1, severity: 'Moderate', impact: 'Medium' },
{ label: 'Physical damage', count: 1, severity: 'Minor', impact: 'Low' },
{ label: 'Rot/spoilage', count: 0, severity: 'None', impact: 'None' }];


export const qualityGradeDistribution = [
{ name: 'Grade A', value: 42 },
{ name: 'Grade B', value: 31 },
{ name: 'Grade C', value: 19 },
{ name: 'Grade D', value: 8 }];


/** SAMPLE DATA — demo output of the market readiness component. */
export const mockMarketReadiness: MarketReadiness = {
  crop: 'Banana',
  score: 88,
  level: 'Ready for Market',
  shelfLifeDays: 6,
  recommendedStorage: 'Ventilated ambient store at 13–15 °C, 85–90% RH',
  recommendedTiming: 'Dispatch to Colombo Manning Market on Sep 1 (morning consignment)',
  action: 'Transport to market within 24–48 hours.',
  shelfLife: [
  { day: 'Day 0', quality: 91, phase: 'Peak' },
  { day: 'Day 1', quality: 89, phase: 'Peak' },
  { day: 'Day 2', quality: 85, phase: 'Marketable' },
  { day: 'Day 3', quality: 79, phase: 'Marketable' },
  { day: 'Day 4', quality: 71, phase: 'Declining' },
  { day: 'Day 5', quality: 62, phase: 'Declining' },
  { day: 'Day 6', quality: 54, phase: 'End of shelf life' },
  { day: 'Day 7', quality: 41, phase: 'Loss' }],

  factors: [
  { label: 'Quality grade', value: 91, note: 'Grade A — premium band' },
  { label: 'Defect load', value: 82, note: '4 minor defects detected' },
  { label: 'Maturity stage', value: 86, note: 'Light green, breaking' },
  { label: 'Storage conditions', value: 74, note: 'Store RH currently above range' },
  { label: 'Ambient temperature', value: 68, note: '31 °C accelerates ripening' }],

  modelUsed: 'Vision Transformer quality head + gradient boosting shelf-life regressor (demo)'
};

/** SAMPLE VALUES — indicative only, not scientifically validated recommendations. */
export const storageRecommendations: StorageRecommendation[] = [
{
  crop: 'Banana',
  temperature: '13 – 15 °C',
  humidity: '85 – 90% RH',
  ventilation: 'High — continuous air exchange',
  stacking: 'Maximum 4 crates high, cross-stacked',
  handling: 'Avoid compression; do not tip or drop crates',
  duration: 'Up to 6 days at recommended conditions'
},
{
  crop: 'Pineapple',
  temperature: '8 – 12 °C',
  humidity: '85 – 90% RH',
  ventilation: 'Moderate',
  stacking: 'Maximum 3 crates high, crown upward',
  handling: 'Protect the crown; avoid crown-to-base contact',
  duration: 'Up to 14 days at recommended conditions'
},
{
  crop: 'Black Pepper',
  temperature: '20 – 25 °C (dried)',
  humidity: 'Below 60% RH',
  ventilation: 'Low but dry — avoid moisture ingress',
  stacking: 'Palletised bags, off-floor, maximum 6 high',
  handling: 'Keep dry; re-dry if moisture exceeds 11%',
  duration: 'Up to 6 months at recommended conditions'
}];