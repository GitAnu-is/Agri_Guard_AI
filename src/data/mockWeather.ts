import type { WeatherDay, WeatherNow } from '../types';

/** SAMPLE DATA — not a live meteorological feed. */
export const locations = [
{ id: 'gampaha', name: 'Gampaha', district: 'Gampaha', lat: 7.0917, lng: 79.9999 },
{ id: 'kurunegala', name: 'Kurunegala', district: 'Kurunegala', lat: 7.4863, lng: 80.3647 },
{ id: 'matale', name: 'Matale', district: 'Matale', lat: 7.4675, lng: 80.6234 },
{ id: 'kandy', name: 'Kandy', district: 'Kandy', lat: 7.2906, lng: 80.6337 },
{ id: 'colombo', name: 'Colombo (Market)', district: 'Colombo', lat: 6.9271, lng: 79.8612 }];


export const currentWeather: WeatherNow = {
  location: 'Gampaha',
  district: 'Gampaha District',
  condition: 'Partly cloudy',
  temperature: 31,
  humidity: 78,
  rainfall: 4.2,
  windSpeed: 12,
  updatedAt: 'Today, 08:15',
  lat: 7.0917,
  lng: 79.9999
};

export const sevenDayForecast: WeatherDay[] = [
{ day: 'Mon', date: 'Aug 31', condition: 'Partly cloudy', temperature: 31, tempMin: 24, rainfall: 4, humidity: 78, windSpeed: 12 },
{ day: 'Tue', date: 'Sep 1', condition: 'Sunny', temperature: 33, tempMin: 25, rainfall: 1, humidity: 71, windSpeed: 10 },
{ day: 'Wed', date: 'Sep 2', condition: 'Light showers', temperature: 30, tempMin: 24, rainfall: 12, humidity: 84, windSpeed: 15 },
{ day: 'Thu', date: 'Sep 3', condition: 'Heavy rain', temperature: 27, tempMin: 23, rainfall: 48, humidity: 92, windSpeed: 26 },
{ day: 'Fri', date: 'Sep 4', condition: 'Heavy rain', temperature: 26, tempMin: 23, rainfall: 41, humidity: 93, windSpeed: 24 },
{ day: 'Sat', date: 'Sep 5', condition: 'Cloudy', temperature: 29, tempMin: 24, rainfall: 8, humidity: 86, windSpeed: 14 },
{ day: 'Sun', date: 'Sep 6', condition: 'Partly cloudy', temperature: 31, tempMin: 25, rainfall: 3, humidity: 77, windSpeed: 11 }];


export const weatherTrend30Day = [
{ period: 'Wk 1', temperature: 30.1, rainfall: 42, humidity: 74 },
{ period: 'Wk 2', temperature: 31.4, rainfall: 28, humidity: 71 },
{ period: 'Wk 3', temperature: 30.8, rainfall: 66, humidity: 81 },
{ period: 'Wk 4', temperature: 29.6, rainfall: 104, humidity: 88 },
{ period: 'Wk 5', temperature: 30.2, rainfall: 87, humidity: 85 }];


export const agriculturalImpact = [
{ label: 'Harvest risk', level: 'High', value: 74, note: 'Two consecutive heavy-rain days from Thu.', tone: 'risk' as const },
{ label: 'Disease risk', level: 'Medium', value: 61, note: 'Humidity above 85% favours Black Sigatoka spread.', tone: 'harvest' as const },
{ label: 'Transportation risk', level: 'Medium', value: 52, note: 'Wet road conditions expected on rural segments.', tone: 'harvest' as const },
{ label: 'Crop suitability', level: 'Favourable', value: 83, note: 'Temperature and rainfall within Banana optimum.', tone: 'leaf' as const }];


export const weatherInsights = [
'Rainfall of 48 mm expected on Thursday may affect harvesting operations.',
'High humidity (>90%) on Thu–Fri may increase Black Sigatoka disease risk in Banana.',
'Weather conditions on Tuesday are favourable for transportation to Colombo market.',
'Soil moisture is likely to exceed field capacity by Friday — avoid heavy machinery.'];