import type { ReportDefinition } from '../types';

/** SAMPLE DATA — demo analytics aggregates. */
export const cropDistribution = [
{ name: 'Banana', value: 46 },
{ name: 'Pineapple', value: 34 },
{ name: 'Black Pepper', value: 20 }];


export const riskDistribution = [
{ name: 'Low', value: 38 },
{ name: 'Medium', value: 41 },
{ name: 'High', value: 16 },
{ name: 'Critical', value: 5 }];


export const marketReadinessTrend = [
{ month: 'Mar', readiness: 71, dispatched: 62 },
{ month: 'Apr', readiness: 74, dispatched: 66 },
{ month: 'May', readiness: 78, dispatched: 71 },
{ month: 'Jun', readiness: 81, dispatched: 76 },
{ month: 'Jul', readiness: 85, dispatched: 80 },
{ month: 'Aug', readiness: 88, dispatched: 84 }];


/** Risk matrix — likelihood (rows) × impact (columns), values are consignment counts. */
export const riskMatrix = {
  likelihood: ['Very likely', 'Likely', 'Possible', 'Unlikely'],
  impact: ['Minor', 'Moderate', 'Major', 'Severe'],
  cells: [
  [4, 7, 9, 6],
  [6, 11, 8, 3],
  [9, 12, 5, 2],
  [14, 8, 3, 1]]

};

/** District heatmap — post-harvest loss percentage by district and month. */
export const lossHeatmap = {
  districts: ['Gampaha', 'Kurunegala', 'Matale', 'Kandy'],
  months: ['Apr', 'May', 'Jun', 'Jul', 'Aug'],
  values: [
  [19.4, 18.1, 17.2, 16.1, 15.4],
  [21.2, 20.4, 19.1, 18.4, 17.6],
  [17.8, 17.1, 16.4, 15.9, 15.1],
  [22.6, 21.8, 21.1, 20.2, 19.4]]

};

export const cropSuitabilityComparison = [
{ district: 'Gampaha', Pineapple: 72, Banana: 91, 'Black Pepper': 65 },
{ district: 'Kurunegala', Pineapple: 88, Banana: 74, 'Black Pepper': 58 },
{ district: 'Matale', Pineapple: 61, Banana: 69, 'Black Pepper': 89 },
{ district: 'Kandy', Pineapple: 57, Banana: 66, 'Black Pepper': 84 }];


export const reportDefinitions: ReportDefinition[] = [
{ id: 'R1', title: 'Crop Recommendation Report', description: 'Suitability scores, SHAP drivers and cultivation guidance per land parcel.', module: 'Crop Recommendation', lastGenerated: '2026-08-30', records: 24 },
{ id: 'R2', title: 'Disease Detection Report', description: 'Diagnoses, confidence, severity bands and Grad-CAM references.', module: 'Disease Detection', lastGenerated: '2026-08-31', records: 97 },
{ id: 'R3', title: 'Harvest Prediction Report', description: 'Predicted optimal windows, readiness scores and weather risk.', module: 'Harvest Planning', lastGenerated: '2026-08-29', records: 31 },
{ id: 'R4', title: 'Harvest Quality Report', description: 'Grade distribution, quality scores and defect summaries.', module: 'Harvest Quality', lastGenerated: '2026-08-31', records: 68 },
{ id: 'R5', title: 'Transportation Risk Report', description: 'Damage probability by route, vehicle and packaging combination.', module: 'Transportation Risk', lastGenerated: '2026-08-28', records: 54 },
{ id: 'R6', title: 'Packaging Recommendation Report', description: 'Recommended packaging and estimated damage reduction per crop.', module: 'Packaging', lastGenerated: '2026-08-27', records: 19 },
{ id: 'R7', title: 'Overall Farm Health Report', description: 'Consolidated crop health, disease pressure and risk indicators.', module: 'Farm', lastGenerated: '2026-08-31', records: 12 },
{ id: 'R8', title: 'Post-Harvest Loss Report', description: 'Loss percentage by stage, crop and district against the target.', module: 'Analytics', lastGenerated: '2026-08-31', records: 42 }];


export const preprocessingStats = [
{ label: 'Raw records collected', value: '48,210' },
{ label: 'Clean records', value: '45,884' },
{ label: 'Missing values handled', value: '2,326' },
{ label: 'Processed records', value: '45,884' },
{ label: 'Engineered features', value: '37' },
{ label: 'Annotated images', value: '14,620' }];


export const preprocessingStages = [
{ stage: 'Data Collection', progress: 100, detail: 'Soil, weather, image, logistics and packaging sources ingested.' },
{ stage: 'Data Cleaning', progress: 100, detail: 'Duplicate removal, outlier treatment and unit harmonisation.' },
{ stage: 'Missing Value Handling', progress: 100, detail: 'Median imputation for soil nutrients, forward fill for weather series.' },
{ stage: 'Feature Engineering', progress: 82, detail: 'Accumulated heat units, rainfall lags, maturity indices, defect ratios.' },
{ stage: 'Normalisation', progress: 64, detail: 'Min–max scaling for tabular features, per-channel image standardisation.' },
{ stage: 'Integration', progress: 41, detail: 'Joining farm, weather and logistics records into the unified feature store.' }];


export const datasetInventory = [
{ name: 'Soil & nutrient records', records: '12,480', source: 'Field survey + department records', status: 'Processed' },
{ name: 'Weather time series', records: '18,250', source: 'Meteorological station feeds', status: 'Processed' },
{ name: 'Leaf disease images', records: '9,140', source: 'Field capture + public datasets', status: 'Annotated' },
{ name: 'Harvested produce images', records: '5,480', source: 'Collection-point capture', status: 'Annotated' },
{ name: 'Transportation & damage logs', records: '3,860', source: 'Transport operator records', status: 'Processing' },
{ name: 'Packaging trials', records: '1,220', source: 'Controlled trials', status: 'Processing' }];