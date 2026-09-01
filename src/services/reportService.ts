import type { ReportDefinition } from '../types';
import { reportDefinitions } from '../data/mockAnalytics';
import { endpoints, mockRequest } from './apiClient';

export interface ReportFilters {
  reportId: string;
  from: string;
  to: string;
  crop: string;
  location: string;
}

export interface GeneratedReport extends ReportFilters {
  reference: string;
  generatedAt: string;
  rows: number;
  title: string;
}

export const reportService = {
  /** GET /api/reports */
  list(): Promise<ReportDefinition[]> {
    return mockRequest(endpoints.reports, reportDefinitions, { delay: 500 });
  },

  async generate(filters: ReportFilters): Promise<GeneratedReport> {
    const definition = reportDefinitions.find((r) => r.id === filters.reportId) ?? reportDefinitions[0];
    const report: GeneratedReport = {
      ...filters,
      title: definition.title,
      reference: `RPT-${definition.id}-${Math.floor(Math.random() * 9000 + 1000)}`,
      generatedAt: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
      rows: definition.records
    };
    return mockRequest('POST /api/reports/generate', report, { delay: 2000 });
  },

  /** Export placeholders — a real backend would stream a file here. */
  async export(format: 'pdf' | 'csv', reference: string): Promise<{format: string;reference: string;}> {
    return mockRequest(`GET /api/reports/${reference}/export?format=${format}`, { format, reference }, { delay: 1200 });
  }
};