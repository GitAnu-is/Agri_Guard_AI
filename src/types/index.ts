/**
 * Shared domain types for the AgriGuard AI platform.
 * All values produced by the mock services are sample/demo data.
 */

export type CropName = 'Pineapple' | 'Banana' | 'Black Pepper';

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type SeverityLevel = 'None' | 'Low' | 'Medium' | 'High';

export type QualityGrade = 'A' | 'B' | 'C' | 'D';

export type UserRole =
'Farmer' |
'Agricultural Officer' |
'Transport Operator' |
'Wholesale Market Manager' |
'Researcher' |
'Policymaker' |
'Administrator';

export type Season = 'Yala' | 'Maha' | 'Inter-monsoon';

export type SoilType = 'Red Yellow Podzolic' | 'Reddish Brown Latosolic' | 'Alluvial' | 'Sandy Loam' | 'Clay Loam';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  district: string;
  location: string;
  status: 'Active' | 'Disabled' | 'Pending';
  lastActive: string;
  avatarInitials: string;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  district: string;
  latitude: number;
  longitude: number;
  landSizeAcres: number;
  soilType: SoilType;
  altitudeM: number;
  currentCrop: CropName;
  plantingDate: string;
  cropAgeMonths: number;
  environment: EnvironmentReadings;
}

export interface EnvironmentReadings {
  soilPh: number;
  nitrogen: number; // kg/ha
  phosphorus: number; // kg/ha
  potassium: number; // kg/ha
  soilMoisture: number; // %
  temperature: number; // °C
  rainfall: number; // mm/month
  humidity: number; // %
  season: Season;
}

export interface CropRecord {
  id: string;
  crop: CropName;
  imageUrl: string;
  farmId: string;
  location: string;
  plantingDate: string;
  cropAgeMonths: number;
  expectedHarvest: string;
  healthScore: number;
  healthStatus: 'Healthy' | 'At Risk' | 'Diseased';
  harvestReadiness: number;
  yieldEstimate: string;
  riskLevel: RiskLevel;
  status: string;
}

export interface FeatureContribution {
  feature: string;
  contribution: number; // percentage, signed
  direction: 'positive' | 'negative';
  note?: string;
}

export interface CropRecommendationResult {
  recommendedCrop: CropName;
  recommendationScore: number;
  confidence: number;
  suitability: number;
  expectedYield: string;
  environmentalCompatibility: number;
  comparison: {crop: CropName;score: number;}[];
  radar: {metric: string;Pineapple: number;Banana: number;'Black Pepper': number;}[];
  cultivation: {title: string;icon: string;detail: string;}[];
  shap: FeatureContribution[];
  explanation: string;
  modelUsed: string;
}

export interface DiseaseResult {
  id: string;
  date: string;
  crop: CropName;
  health: 'Healthy' | 'Diseased';
  disease: string;
  confidence: number;
  severity: SeverityLevel;
  infectedPercentage: number;
  status: 'Reviewed' | 'Pending Review' | 'Treated';
  imageUrl: string;
  gradcamUrl: string;
  maskUrl: string;
  symptoms: string[];
  risk: string;
  treatment: {
    immediate: string[];
    management: string[];
    prevention: string[];
    monitoring: string[];
  };
  explanation: string;
  modelUsed: string;
}

export interface HarvestPrediction {
  crop: CropName;
  optimalHarvestDate: string;
  harvestWindow: {start: string;end: string;};
  readinessScore: number;
  readinessStatus: 'Growing' | 'Maturing' | 'Almost Ready' | 'Ready' | 'Overdue';
  weatherRisk: RiskLevel;
  recommendation: string;
  timeline: {stage: string;range: string;state: 'done' | 'current' | 'optimal' | 'risk';}[];
  forecast: WeatherDay[];
  alerts: string[];
  shap: FeatureContribution[];
  modelUsed: string;
}

export interface QualityAssessment {
  crop: CropName;
  grade: QualityGrade;
  gradeLabel: string;
  qualityScore: number;
  defectStatus: string;
  confidence: number;
  imageUrl: string;
  defectImageUrl: string;
  defects: Defect[];
  factors: {label: string;value: number;}[];
  modelUsed: string;
}

export interface Defect {
  id: string;
  label: 'Bruising' | 'Compression' | 'Discoloration' | 'Physical damage' | 'Rot/spoilage';
  confidence: number;
  /** Normalised bounding box (0-1) for the mock YOLOv8-style overlay */
  box: {x: number;y: number;w: number;h: number;};
}

export interface MarketReadiness {
  crop: CropName;
  score: number;
  level: 'Ready for Market' | 'Hold Briefly' | 'Not Ready';
  shelfLifeDays: number;
  recommendedStorage: string;
  recommendedTiming: string;
  action: string;
  shelfLife: {day: string;quality: number;phase: string;}[];
  factors: {label: string;value: number;note: string;}[];
  modelUsed: string;
}

export interface TransportInput {
  crop: CropName;
  distanceKm: number;
  durationHours: number;
  vehicleType: string;
  roadCondition: string;
  temperature: number;
  humidity: number;
  cropSensitivity: string;
  cropMaturity: string;
  packagingType: string;
  packagingMaterial: string;
  storageCondition: string;
  origin: string;
  destination: string;
}

export interface TransportRiskResult {
  damageProbability: number;
  riskLevel: RiskLevel;
  factors: FeatureContribution[];
  route: {name: string;lat: number;lng: number;note: string;}[];
  explanation: string;
  modelUsed: string;
}

export interface PackagingRecommendation {
  crop: CropName;
  recommended: string;
  material: string;
  ventilation: string;
  cushioning: string;
  stacking: string;
  storageTemp: string;
  humidity: string;
  damageReduction: number;
  current: {name: string;damageRisk: number;ventilation: string;cushioning: string;};
  proposed: {name: string;damageRisk: number;ventilation: string;cushioning: string;};
}

export interface StorageRecommendation {
  crop: CropName;
  temperature: string;
  humidity: string;
  ventilation: string;
  stacking: string;
  handling: string;
  duration: string;
}

export interface WeatherDay {
  day: string;
  date: string;
  condition: string;
  temperature: number;
  tempMin: number;
  rainfall: number;
  humidity: number;
  windSpeed: number;
}

export interface WeatherNow {
  location: string;
  district: string;
  condition: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  updatedAt: string;
  lat: number;
  lng: number;
}

export type AlertType =
'Disease Alert' |
'Harvest Alert' |
'Weather Alert' |
'Transportation Alert' |
'Storage Alert' |
'Market Readiness Alert';

export type AlertPriority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface AppAlert {
  id: string;
  type: AlertType;
  priority: AlertPriority;
  title: string;
  message: string;
  time: string;
  read: boolean;
  link: string;
}

export interface AIModelInfo {
  id: string;
  component: string;
  name: string;
  algorithms: string[];
  purpose: string;
  input: string;
  output: string;
  status: 'Trained (demo)' | 'In Training' | 'Planned';
  metrics: {label: string;value: string;}[];
  kind: 'classification' | 'regression' | 'detection';
}

export interface ReportDefinition {
  id: string;
  title: string;
  description: string;
  module: string;
  lastGenerated: string;
  records: number;
}

export interface TeamMember {
  id: string;
  name: string;
  studentId: string;
  component: string;
  responsibility: string;
}