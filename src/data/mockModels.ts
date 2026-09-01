import type { AIModelInfo } from '../types';

/**
 * SAMPLE / DEMO METRICS — these figures are placeholders for the research
 * evaluation and are NOT validated model results.
 */
export const mockModels: AIModelInfo[] = [
{
  id: 'M1',
  component: 'Crop Recommendation',
  name: 'Random Forest',
  algorithms: ['Random Forest', 'XGBoost', 'ANN'],
  purpose: 'Recommend the most suitable crop among Pineapple, Banana and Black Pepper for a given land and season.',
  input: 'Soil pH, N, P, K, soil moisture, soil type, temperature, rainfall, humidity, altitude, location, season',
  output: 'Recommended crop + suitability score per crop',
  status: 'Trained (demo)',
  kind: 'classification',
  metrics: [
  { label: 'Accuracy', value: '92.4%' },
  { label: 'Precision', value: '91.1%' },
  { label: 'Recall', value: '90.6%' },
  { label: 'F1 Score', value: '90.8%' }]

},
{
  id: 'M2',
  component: 'Crop Recommendation',
  name: 'XGBoost',
  algorithms: ['XGBoost'],
  purpose: 'Gradient-boosted comparison baseline for crop suitability classification.',
  input: 'Soil and environmental feature vector (11 features)',
  output: 'Class probabilities per crop',
  status: 'Trained (demo)',
  kind: 'classification',
  metrics: [
  { label: 'Accuracy', value: '93.8%' },
  { label: 'Precision', value: '93.0%' },
  { label: 'Recall', value: '92.4%' },
  { label: 'F1 Score', value: '92.7%' }]

},
{
  id: 'M3',
  component: 'Crop Recommendation',
  name: 'Artificial Neural Network (ANN)',
  algorithms: ['ANN'],
  purpose: 'Non-linear baseline for soil–climate to crop suitability mapping.',
  input: 'Normalised soil and environmental features',
  output: 'Softmax suitability distribution',
  status: 'In Training',
  kind: 'classification',
  metrics: [
  { label: 'Accuracy', value: '90.2%' },
  { label: 'Precision', value: '89.4%' },
  { label: 'Recall', value: '88.9%' },
  { label: 'F1 Score', value: '89.1%' }]

},
{
  id: 'M4',
  component: 'Disease Detection',
  name: 'EfficientNet-B0',
  algorithms: ['EfficientNet-B0', 'Grad-CAM'],
  purpose: 'Classify leaf images into healthy or crop-specific disease classes and expose visual explanations.',
  input: 'Leaf image (224×224 RGB)',
  output: 'Disease class, confidence, Grad-CAM heatmap',
  status: 'Trained (demo)',
  kind: 'classification',
  metrics: [
  { label: 'Accuracy', value: '95.1%' },
  { label: 'Precision', value: '94.3%' },
  { label: 'Recall', value: '93.8%' },
  { label: 'F1 Score', value: '94.0%' }]

},
{
  id: 'M5',
  component: 'Disease Detection',
  name: 'ResNet50',
  algorithms: ['ResNet50'],
  purpose: 'Convolutional baseline for disease classification comparison.',
  input: 'Leaf image (224×224 RGB)',
  output: 'Disease class + confidence',
  status: 'Trained (demo)',
  kind: 'classification',
  metrics: [
  { label: 'Accuracy', value: '93.4%' },
  { label: 'Precision', value: '92.6%' },
  { label: 'Recall', value: '92.0%' },
  { label: 'F1 Score', value: '92.3%' }]

},
{
  id: 'M6',
  component: 'Disease Detection',
  name: 'Vision Transformer (ViT)',
  algorithms: ['ViT-B/16'],
  purpose: 'Attention-based classifier for fine-grained lesion patterns and severity estimation.',
  input: 'Leaf image patches',
  output: 'Disease class, severity band, attention map',
  status: 'In Training',
  kind: 'classification',
  metrics: [
  { label: 'Accuracy', value: '95.8%' },
  { label: 'Precision', value: '95.0%' },
  { label: 'Recall', value: '94.6%' },
  { label: 'F1 Score', value: '94.8%' }]

},
{
  id: 'M7',
  component: 'Harvest Prediction',
  name: 'LSTM',
  algorithms: ['LSTM'],
  purpose: 'Predict optimal harvesting period from crop age and sequential weather history.',
  input: 'Crop age, maturity indicators, historical + forecast weather sequence',
  output: 'Harvest readiness score, optimal window',
  status: 'Trained (demo)',
  kind: 'regression',
  metrics: [
  { label: 'MAE', value: '2.1 days' },
  { label: 'RMSE', value: '3.0 days' },
  { label: 'R²', value: '0.89' }]

},
{
  id: 'M8',
  component: 'Harvest Prediction',
  name: 'Prophet',
  algorithms: ['Prophet', 'Time Series Forecasting'],
  purpose: 'Seasonal decomposition of weather and maturity trends for harvest window forecasting.',
  input: 'Historical weather + maturity time series',
  output: 'Forecast trend + seasonal components',
  status: 'Trained (demo)',
  kind: 'regression',
  metrics: [
  { label: 'MAE', value: '2.6 days' },
  { label: 'RMSE', value: '3.5 days' },
  { label: 'R²', value: '0.84' }]

},
{
  id: 'M9',
  component: 'Harvest Prediction',
  name: 'XGBoost Regressor',
  algorithms: ['XGBoost'],
  purpose: 'Tabular regression baseline for harvest readiness scoring.',
  input: 'Crop, age, maturity indicators, aggregated weather features',
  output: 'Readiness score (0–100)',
  status: 'Trained (demo)',
  kind: 'regression',
  metrics: [
  { label: 'MAE', value: '2.4 days' },
  { label: 'RMSE', value: '3.2 days' },
  { label: 'R²', value: '0.87' }]

},
{
  id: 'M10',
  component: 'Harvest Quality Grading',
  name: 'EfficientNet Quality Grader',
  algorithms: ['CNN', 'EfficientNet', 'Grad-CAM'],
  purpose: 'Assign quality grade A–D to harvested produce images.',
  input: 'Harvested crop image',
  output: 'Quality grade, quality score, confidence, Grad-CAM',
  status: 'Trained (demo)',
  kind: 'classification',
  metrics: [
  { label: 'Accuracy', value: '91.7%' },
  { label: 'Precision', value: '90.8%' },
  { label: 'Recall', value: '90.1%' },
  { label: 'F1 Score', value: '90.4%' }]

},
{
  id: 'M11',
  component: 'Harvest Quality Grading',
  name: 'YOLOv8 Defect Detector',
  algorithms: ['YOLOv8'],
  purpose: 'Localise surface defects (bruising, compression, discoloration, physical damage, rot).',
  input: 'Harvested crop image',
  output: 'Bounding boxes, defect labels, per-defect confidence',
  status: 'Trained (demo)',
  kind: 'detection',
  metrics: [
  { label: 'mAP@50', value: '87.9%' },
  { label: 'Precision', value: '89.2%' },
  { label: 'Recall', value: '85.4%' },
  { label: 'F1 Score', value: '87.3%' }]

},
{
  id: 'M12',
  component: 'Harvest Quality Grading',
  name: 'Vision Transformer (Quality)',
  algorithms: ['Vision Transformer'],
  purpose: 'Attention-based grading for market readiness and shelf-life estimation.',
  input: 'Harvested crop image + defect summary',
  output: 'Market readiness score, shelf-life estimate',
  status: 'Planned',
  kind: 'regression',
  metrics: [
  { label: 'MAE', value: '0.7 days' },
  { label: 'RMSE', value: '1.1 days' },
  { label: 'R²', value: '0.82' }]

},
{
  id: 'M13',
  component: 'Transportation Risk',
  name: 'Random Forest (Transport)',
  algorithms: ['Random Forest', 'SHAP'],
  purpose: 'Predict probability of transit damage for a consignment and explain risk drivers.',
  input: 'Distance, duration, vehicle, road condition, temperature, humidity, packaging, maturity',
  output: 'Damage probability, risk level, SHAP contributions',
  status: 'Trained (demo)',
  kind: 'classification',
  metrics: [
  { label: 'Accuracy', value: '89.6%' },
  { label: 'Precision', value: '88.4%' },
  { label: 'Recall', value: '87.7%' },
  { label: 'F1 Score', value: '88.0%' }]

},
{
  id: 'M14',
  component: 'Transportation Risk',
  name: 'CatBoost',
  algorithms: ['CatBoost', 'Gradient Boosting'],
  purpose: 'Handle categorical logistics features (vehicle, road class, packaging) natively.',
  input: 'Mixed categorical + numeric logistics features',
  output: 'Damage probability',
  status: 'Trained (demo)',
  kind: 'classification',
  metrics: [
  { label: 'Accuracy', value: '90.8%' },
  { label: 'Precision', value: '90.1%' },
  { label: 'Recall', value: '89.2%' },
  { label: 'F1 Score', value: '89.6%' }]

},
{
  id: 'M15',
  component: 'Transportation Risk',
  name: 'XGBoost (Transport)',
  algorithms: ['XGBoost'],
  purpose: 'Boosted baseline for damage probability and packaging effectiveness comparison.',
  input: 'Logistics + environment feature vector',
  output: 'Damage probability, packaging uplift estimate',
  status: 'Trained (demo)',
  kind: 'classification',
  metrics: [
  { label: 'Accuracy', value: '90.2%' },
  { label: 'Precision', value: '89.5%' },
  { label: 'Recall', value: '88.6%' },
  { label: 'F1 Score', value: '89.0%' }]

}];


export const classificationComparison = [
{ model: 'Random Forest', Accuracy: 92.4, Precision: 91.1, Recall: 90.6, F1: 90.8 },
{ model: 'XGBoost', Accuracy: 93.8, Precision: 93.0, Recall: 92.4, F1: 92.7 },
{ model: 'ANN', Accuracy: 90.2, Precision: 89.4, Recall: 88.9, F1: 89.1 },
{ model: 'EfficientNet-B0', Accuracy: 95.1, Precision: 94.3, Recall: 93.8, F1: 94.0 },
{ model: 'ResNet50', Accuracy: 93.4, Precision: 92.6, Recall: 92.0, F1: 92.3 },
{ model: 'ViT-B/16', Accuracy: 95.8, Precision: 95.0, Recall: 94.6, F1: 94.8 }];


export const regressionComparison = [
{ model: 'LSTM', MAE: 2.1, RMSE: 3.0, R2: 0.89 },
{ model: 'Prophet', MAE: 2.6, RMSE: 3.5, R2: 0.84 },
{ model: 'XGBoost', MAE: 2.4, RMSE: 3.2, R2: 0.87 },
{ model: 'ViT (Quality)', MAE: 0.7, RMSE: 1.1, R2: 0.82 }];


export const confusionMatrix = {
  labels: ['Pineapple', 'Banana', 'Black Pepper'],
  rows: [
  [186, 9, 5],
  [7, 204, 6],
  [6, 8, 169]]

};