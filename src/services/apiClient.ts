import axios from 'axios';

/**
 * Real HTTP client, pre-configured for the future backend.
 * Until the research backend is available, every service resolves against
 * `mockRequest`, which mirrors the endpoint contract below.
 */
/** Base URL for the future research backend. */
export const API_BASE_URL = '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('sap.token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/** Endpoint contract shared with the backend team. */
export const endpoints = {
  login: 'POST /api/auth/login',
  register: 'POST /api/auth/register',
  cropRecommend: 'POST /api/crop/recommend',
  diseasePredict: 'POST /api/disease/predict',
  diseaseSeverity: 'POST /api/disease/severity',
  harvestPredict: 'POST /api/harvest/predict',
  qualityPredict: 'POST /api/quality/predict',
  qualityDefects: 'POST /api/quality/defects',
  marketReadiness: 'POST /api/market/readiness',
  transportRisk: 'POST /api/transport/risk',
  packagingRecommend: 'POST /api/packaging/recommend',
  weather: 'GET /api/weather',
  alerts: 'GET /api/alerts',
  analytics: 'GET /api/analytics',
  reports: 'GET /api/reports',
  models: 'GET /api/models'
} as const;

export const USING_MOCK_API = true;

export interface MockOptions {
  /** Simulated latency in ms. */
  delay?: number;
  /** Force a rejected promise so error states can be demonstrated. */
  fail?: boolean;
}

/**
 * Resolves demo data with realistic latency. Replace the body of each service
 * method with an `apiClient` call when the backend is connected — the return
 * types are already the platform's domain types.
 */
export function mockRequest<T>(endpoint: string, data: T, options: MockOptions = {}): Promise<T> {
  const { delay = 900, fail = false } = options;
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (fail) {
        reject(new Error(`Mock request failed: ${endpoint}`));
        return;
      }
      resolve(data);
    }, delay);
  });
}