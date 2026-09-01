import type { TeamMember } from '../types';

export const researchProject = {
  id: 'J26-IT-420',
  title: 'AgriGuard AI Platform for Minimizing Post-Harvest Crop Losses',
  area: 'Artificial Intelligence / AgriGuard AI',
  module: 'IT4010 — Research Project',
  crops: ['Pineapple', 'Banana', 'Black Pepper'],
  objective:
  'To design and evaluate an integrated, explainable AI decision-support platform that reduces agricultural and post-harvest crop losses in Sri Lanka by combining crop recommendation, plant disease detection and severity assessment, harvest-time prediction, harvest quality grading with market readiness estimation, and transportation risk prediction with smart packaging and storage guidance.',
  components: [
  { name: 'AI Crop Recommendation', detail: 'Recommends the most suitable crop among Pineapple, Banana and Black Pepper from soil and environmental parameters, with SHAP explanations.', route: '/crop-recommendation' },
  { name: 'Plant Disease Detection & Severity', detail: 'Classifies leaf images into crop-specific diseases, estimates severity and infected area, and explains predictions with Grad-CAM.', route: '/disease-detection' },
  { name: 'Harvest Time Prediction', detail: 'Predicts the optimal harvesting period from crop maturity and historical, current and forecast weather.', route: '/harvest-planning' },
  { name: 'Harvest Quality Grading & Market Readiness', detail: 'Grades harvested produce, localises defects, and estimates market readiness and shelf life.', route: '/harvest-quality' },
  { name: 'Transportation Risk & Smart Packaging', detail: 'Predicts transit damage probability and recommends packaging, storage and handling measures.', route: '/transportation-risk' }],

  technologies: [
  'Python (scikit-learn, XGBoost, CatBoost)',
  'TensorFlow / PyTorch',
  'EfficientNet, ResNet50, Vision Transformer',
  'YOLOv8 object detection',
  'LSTM, Prophet time-series forecasting',
  'SHAP and Grad-CAM explainability',
  'React, TypeScript, Tailwind CSS frontend',
  'REST API service layer'],

  contributions: [
  'An integrated decision-support platform spanning pre-harvest to market, rather than isolated single-task models.',
  'Explainability as a first-class output: SHAP for tabular predictions and Grad-CAM for image predictions.',
  'Crop-specific post-harvest guidance for three economically significant Sri Lankan crops.',
  'A quantified link between predicted transportation risk and packaging/storage interventions.',
  'A reusable annotated dataset and preprocessing pipeline for the selected crops.'],

  targetUsers: [
  { role: 'Farmers', benefit: 'Crop selection, disease diagnosis, harvest timing and handling guidance.' },
  { role: 'Agricultural Officers', benefit: 'Field-level disease and risk visibility across farms in a district.' },
  { role: 'Transport Operators', benefit: 'Route and packaging risk assessment before dispatch.' },
  { role: 'Wholesale Markets', benefit: 'Incoming quality grade and market readiness expectations.' },
  { role: 'Researchers', benefit: 'Model performance, explainability and dataset provenance.' },
  { role: 'Policymakers', benefit: 'District-level post-harvest loss trends for intervention planning.' }]

};

/**
 * Team member names and student IDs are intentionally left unpopulated —
 * they must be taken from the project presentation rather than invented.
 */
export const teamMembers: TeamMember[] = [
{ id: 'T1', name: 'Not provided in supplied documents', studentId: '—', component: 'AI Crop Recommendation', responsibility: 'Soil and environmental data modelling, Random Forest / XGBoost / ANN comparison, SHAP explanation layer.' },
{ id: 'T2', name: 'Not provided in supplied documents', studentId: '—', component: 'Plant Disease Detection & Severity', responsibility: 'Leaf image dataset preparation, EfficientNet-B0 / ResNet50 / ViT training, severity estimation and Grad-CAM visualisation.' },
{ id: 'T3', name: 'Not provided in supplied documents', studentId: '—', component: 'Harvest Time Prediction', responsibility: 'Weather and maturity time-series pipeline, LSTM / Prophet / XGBoost forecasting of optimal harvest windows.' },
{ id: 'T4', name: 'Not provided in supplied documents', studentId: '—', component: 'Harvest Quality Grading & Market Readiness', responsibility: 'Produce image grading with CNN / EfficientNet / ViT, YOLOv8 defect detection, shelf-life and market readiness estimation.' },
{ id: 'T5', name: 'Not provided in supplied documents', studentId: '—', component: 'Transportation Risk & Smart Packaging', responsibility: 'Logistics feature engineering, Random Forest / XGBoost / CatBoost risk prediction, SHAP-driven packaging and storage recommendations.' }];


export interface ArchitectureBlock {
  label: string;
  route?: string;
}

export interface ArchitectureLayer {
  id: string;
  title: string;
  subtitle: string;
  tone: 'earth' | 'sky' | 'leaf' | 'xai' | 'harvest' | 'risk';
  blocks: ArchitectureBlock[];
}

export const architectureLayers: ArchitectureLayer[] = [
{
  id: 'inputs',
  title: 'Input Data Sources',
  subtitle: 'Field, environmental and logistics data captured from farms and operators',
  tone: 'earth',
  blocks: [
  { label: 'Soil Data', route: '/farm' },
  { label: 'Weather Data', route: '/weather' },
  { label: 'Crop Images', route: '/disease-detection' },
  { label: 'Historical Data', route: '/analytics' },
  { label: 'Transportation Data', route: '/transportation-risk' },
  { label: 'Packaging Data', route: '/packaging' },
  { label: 'Location Data', route: '/map' }]

},
{
  id: 'preprocessing',
  title: 'Data Preprocessing & Integration',
  subtitle: 'Cleaning, imputation, feature engineering and unification into the feature store',
  tone: 'sky',
  blocks: [
  { label: 'Data Cleaning', route: '/data-processing' },
  { label: 'Missing Value Handling', route: '/data-processing' },
  { label: 'Feature Engineering', route: '/data-processing' },
  { label: 'Normalisation', route: '/data-processing' },
  { label: 'Data Integration', route: '/data-processing' }]

},
{
  id: 'models',
  title: 'AI Models',
  subtitle: 'Five research components, each with its own model family and evaluation protocol',
  tone: 'leaf',
  blocks: [
  { label: 'Crop Recommendation', route: '/crop-recommendation' },
  { label: 'Disease Detection', route: '/disease-detection' },
  { label: 'Harvest Prediction', route: '/harvest-planning' },
  { label: 'Harvest Quality', route: '/harvest-quality' },
  { label: 'Transportation Risk', route: '/transportation-risk' }]

},
{
  id: 'xai',
  title: 'Explainable AI',
  subtitle: 'Every prediction is paired with an explanation the end user can act on',
  tone: 'xai',
  blocks: [
  { label: 'SHAP', route: '/xai' },
  { label: 'Grad-CAM', route: '/xai' },
  { label: 'Feature Importance', route: '/xai' },
  { label: 'Visual Heatmaps', route: '/xai' }]

},
{
  id: 'platform',
  title: 'AgriGuard AI Advisory Platform',
  subtitle: 'The application layer that delivers predictions to each user role',
  tone: 'harvest',
  blocks: [
  { label: 'Dashboard', route: '/dashboard' },
  { label: 'Alerts', route: '/alerts' },
  { label: 'AI Recommendations', route: '/crop-recommendation' },
  { label: 'User Management', route: '/users' },
  { label: 'Reports', route: '/reports' },
  { label: 'Data Visualization', route: '/data-visualization' }]

},
{
  id: 'outputs',
  title: 'Outputs / Decision Support',
  subtitle: 'Actionable outputs that reduce agricultural and post-harvest losses',
  tone: 'risk',
  blocks: [
  { label: 'Crop Recommendation', route: '/crop-recommendation' },
  { label: 'Disease Detection', route: '/disease-detection' },
  { label: 'Disease Severity', route: '/disease-detection' },
  { label: 'Treatment Recommendation', route: '/disease-detection' },
  { label: 'Harvest Alerts', route: '/harvest-planning' },
  { label: 'Quality Grade', route: '/harvest-quality' },
  { label: 'Market Readiness', route: '/market-readiness' },
  { label: 'Transportation Risk', route: '/transportation-risk' },
  { label: 'Smart Packaging', route: '/packaging' },
  { label: 'Storage Recommendation', route: '/storage' },
  { label: 'Weather Notifications', route: '/weather' },
  { label: 'Reports & Analytics', route: '/reports' }]

}];


export const workflowChains = [
{
  title: 'Pre-harvest chain',
  steps: ['Crop Recommendation', 'Harvest Planning'],
  routes: ['/crop-recommendation', '/harvest-planning'],
  tone: 'leaf' as const
},
{
  title: 'Plant health chain',
  steps: ['Disease Detection', 'Severity Assessment', 'Treatment Recommendation'],
  routes: ['/disease-detection', '/disease-detection', '/disease-detection'],
  tone: 'risk' as const
},
{
  title: 'Post-harvest quality chain',
  steps: ['Harvest Quality', 'Defect Detection', 'Market Readiness', 'Shelf Life', 'Storage Recommendation'],
  routes: ['/harvest-quality', '/harvest-quality', '/market-readiness', '/market-readiness', '/storage'],
  tone: 'harvest' as const
},
{
  title: 'Logistics chain',
  steps: ['Transportation Data', 'Risk Prediction', 'Packaging Recommendation', 'Handling Guidelines'],
  routes: ['/transportation-risk', '/transportation-risk', '/packaging', '/packaging'],
  tone: 'sky' as const
}];


export const assistantSuggestions = [
'What crop should I cultivate?',
'When should I harvest?',
'Is my crop diseased?',
'What packaging should I use?',
'Is this route safe?',
'How can I reduce crop losses?'];


export const assistantAnswers: Record<string, string> = {
  'What crop should I cultivate?':
  'For Meewitiya, Gampaha with soil pH 6.2 and 178 mm monthly rainfall, the demo model ranks Banana highest at 91% suitability, ahead of Pineapple (72%) and Black Pepper (65%). Open Crop Recommendation to see the SHAP breakdown behind that ranking.',
  'When should I harvest?':
  'The demo harvest model places the optimal window for your Banana plot between Sep 1 and Sep 3, at 86% readiness. Heavy rainfall from Sep 3 makes the earlier part of the window safer.',
  'Is my crop diseased?':
  'Your most recent leaf image was classified as Black Sigatoka with 94.6% confidence and High severity (38% infected area) in the demo model. Open Disease Detection for the Grad-CAM explanation and treatment steps.',
  'What packaging should I use?':
  'For Banana on a 62 km road route, the recommended packaging is a ventilated corrugated produce box with a perforated liner — an estimated 18% reduction in damage compared with woven sacks.',
  'Is this route safe?':
  'Gampaha → Manning Market is currently rated Medium risk with a 68% damage probability, driven mainly by distance, road condition and ambient temperature. Upgrading packaging is the largest controllable lever.',
  'How can I reduce crop losses?':
  'The three highest-impact actions in your current data are: harvest inside the predicted window, upgrade packaging before transport, and hold produce at 13–15 °C with 85–90% RH. Together these address the transportation and storage stages, which account for the largest share of your recorded losses.'
};
