import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Alert } from '../components/ui/Feedback';
import { Badge } from '../components/ui/Badge';

/**
 * Placeholder shells for the remaining research modules. Routes, navigation,
 * breadcrumbs and layout are already wired; the full implementations replace
 * these exports one file at a time.
 */
function ModuleShell({
  title,
  description,
  section,
  planned





}: {title: string;description: string;section: string;planned: string[];}) {
  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: section }, { label: title }]}
        meta={<Badge tone="earth">Module shell — implementation in progress</Badge>} />
      
      <Alert variant="info" title="This module is not built out yet" className="mb-4">
        Routing, navigation and layout for this page are complete. The content below lists exactly what this module will contain.
      </Alert>
      <Card>
        <CardHeader title="Planned contents" description="Defined by the research specification for this component." />
        <CardBody>
          <ul className="space-y-2">
            {planned.map((item) =>
            <li key={item} className="flex gap-2.5 text-[13px] leading-5 text-earth-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-500" aria-hidden="true" />
                {item}
              </li>
            )}
          </ul>
        </CardBody>
      </Card>
    </div>);

}

export function XAICenter() {
  return (
    <ModuleShell
      title="Explainable AI Centre"
      section="Intelligence"
      description="Consolidated SHAP and Grad-CAM explanations for every prediction the platform produces."
      planned={[
      'SHAP analysis across crop recommendation, harvest and transportation models',
      'Grad-CAM analysis for disease detection and quality grading',
      'Feature importance and prediction explanation cards',
      'Confidence analysis per model and per prediction']
      } />);


}

export function Reports() {
  return (
    <ModuleShell
      title="Reports"
      section="Intelligence"
      description="Generate and export the eight research reports with date, crop and location filters."
      planned={[
      'Crop Recommendation, Disease Detection, Harvest Prediction and Harvest Quality reports',
      'Transportation Risk, Packaging Recommendation, Overall Farm Health and Post-Harvest Loss reports',
      'Date, crop and location filters with Generate, Export PDF, Export CSV and Print actions']
      } />);


}

export function Analytics() {
  return (
    <ModuleShell
      title="Analytics"
      section="Intelligence"
      description="Cross-module analytics on crop distribution, disease frequency, quality grades and loss trends."
      planned={[
      'Crop distribution, disease frequency and severity distribution charts',
      'Harvest readiness, quality grade and transportation risk breakdowns',
      'Packaging effectiveness and post-harvest loss trend analysis']
      } />);


}

export function DataVisualization() {
  return (
    <ModuleShell
      title="Data Visualization"
      section="Intelligence"
      description="Dedicated chart workspace covering every visualisation type in the research scope."
      planned={[
      'Line, bar, pie/donut, radar and area charts',
      'District loss heatmap and likelihood × impact risk matrix',
      'Crop suitability and market readiness comparison charts']
      } />);


}

export function AIModels() {
  return (
    <ModuleShell
      title="AI Models & Research"
      section="Research"
      description="Model cards for all fifteen models across the five research components."
      planned={[
      'Crop Recommendation: Random Forest, XGBoost, ANN',
      'Disease Detection: EfficientNet-B0, ResNet50, Vision Transformer, Grad-CAM',
      'Harvest Prediction: LSTM, Prophet, XGBoost',
      'Quality Grading: CNN, EfficientNet, Vision Transformer, YOLOv8, Grad-CAM',
      'Transportation: Random Forest, XGBoost, CatBoost, Gradient Boosting, SHAP',
      'Purpose, input, output, status and evaluation metrics per model']
      } />);


}

export function ModelPerformance() {
  return (
    <ModuleShell
      title="Model Performance"
      section="Research"
      description="Evaluation metrics and model comparison charts, clearly labelled as demonstration values."
      planned={[
      'Classification metrics: accuracy, precision, recall, F1',
      'Regression metrics: MAE, RMSE, R²',
      'Model comparison charts and a confusion matrix']
      } />);


}

export function DataProcessing() {
  return (
    <ModuleShell
      title="Data Preprocessing"
      section="Research"
      description="Dataset inventory and the preprocessing pipeline that feeds the models."
      planned={[
      'Dataset status: raw, clean and processed records, missing values, feature and image counts',
      'Pipeline stages: collection, cleaning, missing value handling, feature engineering, normalisation, integration',
      'Per-stage processing progress']
      } />);


}

export function SystemArchitecture() {
  return (
    <ModuleShell
      title="System Architecture"
      section="Research"
      description="Interactive six-layer architecture diagram where each block opens its related module."
      planned={[
      'Input data sources layer',
      'Data preprocessing and integration layer',
      'AI models layer',
      'Explainable AI layer',
      'Advisory platform layer',
      'Outputs and decision support layer']
      } />);


}

export function ResearchOverview() {
  return (
    <ModuleShell
      title="Research Overview"
      section="Research"
      description="Research objective, components, technologies, contributions, datasets and target users."
      planned={[
      'Research objective and the five research components',
      'System architecture summary and technology stack',
      'Expected contributions, datasets and AI models',
      'Target users: farmers, agricultural officers, transport operators, wholesale markets, researchers, policymakers']
      } />);


}

export function ProjectTeam() {
  return (
    <ModuleShell
      title="Project Team"
      section="Research"
      description="Team members and research responsibilities per component."
      planned={[
      'One row per research component with its responsibility',
      'Member names and student IDs must be taken from the project presentation rather than invented']
      } />);


}

export function UserManagement() {
  return (
    <ModuleShell
      title="User Management"
      section="Administration"
      description="Administrator view of platform users across all seven roles."
      planned={[
      'Users table: name, email, role, location, status, last active',
      'Role filter across all seven platform roles',
      'View, edit, disable and delete actions']
      } />);


}

export function Settings() {
  return (
    <ModuleShell
      title="Settings"
      section="Administration"
      description="Profile, farm, notification, language, units, theme, privacy and security settings, plus support contacts."
      planned={[
      'Profile and farm settings',
      'Notification, language, units and theme preferences',
      'Privacy and security controls',
      'Help centre, contact support and agricultural officer contact']
      } />);


}
