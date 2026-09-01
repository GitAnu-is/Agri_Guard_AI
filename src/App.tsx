import React, { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { ToastProvider } from './contexts/ToastContext';
import { AppLayout } from './layouts/AppLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Auth
const Login = lazy(() => import('./pages/auth/Login').then((m) => ({ default: m.Login })));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword').then((m) => ({ default: m.ForgotPassword })));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword').then((m) => ({ default: m.ResetPassword })));
const Register = lazy(() => import('./pages/auth/Register').then((m) => ({ default: m.Register })));
const ProfileSetup = lazy(() => import('./pages/auth/ProfileSetup').then((m) => ({ default: m.ProfileSetup })));

// Core
const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const MyFarm = lazy(() => import('./pages/MyFarm').then((m) => ({ default: m.MyFarm })));
const CropRecords = lazy(() => import('./pages/CropRecords').then((m) => ({ default: m.CropRecords })));
const CropDetail = lazy(() => import('./pages/CropDetail').then((m) => ({ default: m.CropDetail })));
const AgriculturalMap = lazy(() => import('./pages/AgriculturalMap').then((m) => ({ default: m.AgriculturalMap })));

// Pre-harvest AI
const CropRecommendation = lazy(() => import('./pages/CropRecommendation').then((m) => ({ default: m.CropRecommendation })));
const DiseaseDetection = lazy(() => import('./pages/DiseaseDetection').then((m) => ({ default: m.DiseaseDetection })));
const DiseaseHistory = lazy(() => import('./pages/DiseaseHistory').then((m) => ({ default: m.DiseaseHistory })));
const HarvestPlanning = lazy(() => import('./pages/HarvestPlanning').then((m) => ({ default: m.HarvestPlanning })));

// Post-harvest AI
const HarvestQuality = lazy(() => import('./pages/HarvestQuality').then((m) => ({ default: m.HarvestQuality })));
const MarketReadinessPage = lazy(() => import('./pages/MarketReadinessPage').then((m) => ({ default: m.MarketReadinessPage })));
const TransportationRisk = lazy(() => import('./pages/TransportationRisk').then((m) => ({ default: m.TransportationRisk })));
const Packaging = lazy(() => import('./pages/Packaging').then((m) => ({ default: m.Packaging })));
const Storage = lazy(() => import('./pages/Storage').then((m) => ({ default: m.Storage })));

// Intelligence
const WeatherIntelligence = lazy(() => import('./pages/WeatherIntelligence').then((m) => ({ default: m.WeatherIntelligence })));
const Alerts = lazy(() => import('./pages/Alerts').then((m) => ({ default: m.Alerts })));

// Modules whose shells are wired but not yet built out
const XAICenter = lazy(() => import('./pages/PendingModules').then((m) => ({ default: m.XAICenter })));
const Reports = lazy(() => import('./pages/PendingModules').then((m) => ({ default: m.Reports })));
const Analytics = lazy(() => import('./pages/PendingModules').then((m) => ({ default: m.Analytics })));
const DataVisualization = lazy(() => import('./pages/PendingModules').then((m) => ({ default: m.DataVisualization })));
const AIModels = lazy(() => import('./pages/PendingModules').then((m) => ({ default: m.AIModels })));
const ModelPerformance = lazy(() => import('./pages/PendingModules').then((m) => ({ default: m.ModelPerformance })));
const DataProcessing = lazy(() => import('./pages/PendingModules').then((m) => ({ default: m.DataProcessing })));
const SystemArchitecture = lazy(() => import('./pages/PendingModules').then((m) => ({ default: m.SystemArchitecture })));
const ResearchOverview = lazy(() => import('./pages/PendingModules').then((m) => ({ default: m.ResearchOverview })));
const ProjectTeam = lazy(() => import('./pages/PendingModules').then((m) => ({ default: m.ProjectTeam })));
const UserManagement = lazy(() => import('./pages/PendingModules').then((m) => ({ default: m.UserManagement })));
const Settings = lazy(() => import('./pages/PendingModules').then((m) => ({ default: m.Settings })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

export function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile-setup" element={<ProfileSetup />} />
            </Route>

            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/farm" element={<MyFarm />} />
              <Route path="/crops" element={<CropRecords />} />
              <Route path="/crops/:cropId" element={<CropDetail />} />
              <Route path="/map" element={<AgriculturalMap />} />

              <Route path="/crop-recommendation" element={<CropRecommendation />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
              <Route path="/disease-history" element={<DiseaseHistory />} />
              <Route path="/harvest-planning" element={<HarvestPlanning />} />

              <Route path="/harvest-quality" element={<HarvestQuality />} />
              <Route path="/market-readiness" element={<MarketReadinessPage />} />
              <Route path="/transportation-risk" element={<TransportationRisk />} />
              <Route path="/packaging" element={<Packaging />} />
              <Route path="/storage" element={<Storage />} />

              <Route path="/weather" element={<WeatherIntelligence />} />
              <Route path="/xai" element={<XAICenter />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/data-visualization" element={<DataVisualization />} />

              <Route path="/ai-models" element={<AIModels />} />
              <Route path="/model-performance" element={<ModelPerformance />} />
              <Route path="/data-processing" element={<DataProcessing />} />
              <Route path="/architecture" element={<SystemArchitecture />} />
              <Route path="/research" element={<ResearchOverview />} />
              <Route path="/team" element={<ProjectTeam />} />

              <Route path="/users" element={<UserManagement />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/:tab" element={<Settings />} />
            </Route>

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AppProvider>);

}