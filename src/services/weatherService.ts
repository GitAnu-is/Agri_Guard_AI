import type { AppAlert, WeatherDay, WeatherNow } from '../types';
import { currentWeather, sevenDayForecast } from '../data/mockWeather';
import { mockAlerts } from '../data/mockAlerts';
import { endpoints, mockRequest } from './apiClient';

export const weatherService = {
  /** GET /api/weather */
  current(locationName?: string): Promise<WeatherNow> {
    return mockRequest(endpoints.weather, { ...currentWeather, location: locationName ?? currentWeather.location }, { delay: 700 });
  },

  forecast(): Promise<WeatherDay[]> {
    return mockRequest('GET /api/weather/forecast', sevenDayForecast, { delay: 700 });
  },

  /** GET /api/alerts */
  alerts(): Promise<AppAlert[]> {
    return mockRequest(endpoints.alerts, mockAlerts, { delay: 600 });
  }
};