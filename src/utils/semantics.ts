import type { AlertPriority, AlertType, QualityGrade, RiskLevel, SeverityLevel } from '../types';

export type Tone = 'leaf' | 'harvest' | 'risk' | 'sky' | 'xai' | 'earth';

export const toneClasses: Record<Tone, {text: string;bg: string;softBg: string;border: string;fill: string;ring: string;}> = {
  leaf: { text: 'text-leaf-700', bg: 'bg-leaf-600', softBg: 'bg-leaf-50', border: 'border-leaf-200', fill: '#236e4a', ring: 'ring-leaf-200' },
  harvest: { text: 'text-harvest-700', bg: 'bg-harvest-500', softBg: 'bg-harvest-50', border: 'border-harvest-200', fill: '#f79009', ring: 'ring-harvest-200' },
  risk: { text: 'text-risk-700', bg: 'bg-risk-600', softBg: 'bg-risk-50', border: 'border-risk-200', fill: '#d92d20', ring: 'ring-risk-200' },
  sky: { text: 'text-sky-700', bg: 'bg-sky-600', softBg: 'bg-sky-50', border: 'border-sky-200', fill: '#1570ef', ring: 'ring-sky-200' },
  xai: { text: 'text-xai-700', bg: 'bg-xai-600', softBg: 'bg-xai-50', border: 'border-xai-200', fill: '#6938ef', ring: 'ring-xai-200' },
  earth: { text: 'text-earth-700', bg: 'bg-earth-500', softBg: 'bg-earth-100', border: 'border-earth-200', fill: '#7e6749', ring: 'ring-earth-200' }
};

export function riskTone(level: RiskLevel): Tone {
  if (level === 'Low') return 'leaf';
  if (level === 'Medium') return 'harvest';
  return 'risk';
}

export function severityTone(level: SeverityLevel): Tone {
  if (level === 'None') return 'leaf';
  if (level === 'Low') return 'leaf';
  if (level === 'Medium') return 'harvest';
  return 'risk';
}

export function scoreTone(score: number): Tone {
  if (score >= 75) return 'leaf';
  if (score >= 50) return 'harvest';
  return 'risk';
}

/** For values where a HIGH number is bad (risk, loss, damage probability). */
export function inverseScoreTone(score: number): Tone {
  if (score >= 70) return 'risk';
  if (score >= 40) return 'harvest';
  return 'leaf';
}

export function gradeTone(grade: QualityGrade): Tone {
  if (grade === 'A') return 'leaf';
  if (grade === 'B') return 'sky';
  if (grade === 'C') return 'harvest';
  return 'risk';
}

export function priorityTone(priority: AlertPriority): Tone {
  if (priority === 'Critical') return 'risk';
  if (priority === 'High') return 'risk';
  if (priority === 'Medium') return 'harvest';
  return 'sky';
}

export function alertTypeTone(type: AlertType): Tone {
  switch (type) {
    case 'Disease Alert':
      return 'risk';
    case 'Harvest Alert':
      return 'leaf';
    case 'Weather Alert':
      return 'sky';
    case 'Transportation Alert':
      return 'harvest';
    case 'Storage Alert':
      return 'earth';
    case 'Market Readiness Alert':
      return 'xai';
    default:
      return 'earth';
  }
}

export const chartColors = {
  leaf: '#236e4a',
  leafLight: '#57a87c',
  harvest: '#f79009',
  risk: '#d92d20',
  sky: '#1570ef',
  xai: '#6938ef',
  earth: '#9a805d',
  grid: '#e3d9c9',
  axis: '#65523c'
};

export const cropColors: Record<string, string> = {
  Pineapple: chartColors.harvest,
  Banana: chartColors.leaf,
  'Black Pepper': chartColors.earth
};