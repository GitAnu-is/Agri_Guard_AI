import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { AppAlert, CropName, Farm, User } from '../types';
import { mockAlerts } from '../data/mockAlerts';
import { mockFarms } from '../data/mockCrops';
import { locations } from '../data/mockWeather';
import { authService } from '../services/authService';

interface AppContextValue {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (user: User) => void;
  signOut: () => void;
  farms: Farm[];
  saveFarm: (farm: Farm) => void;
  deleteFarm: (id: string) => void;
  activeFarm: Farm;
  setActiveFarmId: (id: string) => void;
  activeCrop: CropName;
  setActiveCrop: (crop: CropName) => void;
  locationId: string;
  setLocationId: (id: string) => void;
  alerts: AppAlert[];
  unreadCount: number;
  markAlertRead: (id: string) => void;
  markAllAlertsRead: () => void;
  deleteAlert: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<User | null>(() => authService.getStoredUser());
  const [farms, setFarms] = useState<Farm[]>(mockFarms);
  const [activeFarmId, setActiveFarmId] = useState<string>(mockFarms[0].id);
  const [activeCrop, setActiveCrop] = useState<CropName>(mockFarms[0].currentCrop);
  const [locationId, setLocationId] = useState<string>(locations[0].id);
  const [alerts, setAlerts] = useState<AppAlert[]>(mockAlerts);

  const activeFarm = useMemo(() => farms.find((f) => f.id === activeFarmId) ?? farms[0], [farms, activeFarmId]);

  const signIn = useCallback((next: User) => setUser(next), []);
  const signOut = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const saveFarm = useCallback((farm: Farm) => {
    setFarms((prev) => {
      const exists = prev.some((f) => f.id === farm.id);
      return exists ? prev.map((f) => f.id === farm.id ? farm : f) : [...prev, farm];
    });
  }, []);

  const deleteFarm = useCallback(
    (id: string) => {
      setFarms((prev) => {
        const next = prev.filter((f) => f.id !== id);
        return next.length > 0 ? next : prev;
      });
      setActiveFarmId((current) => current === id ? farms.filter((f) => f.id !== id)[0]?.id ?? current : current);
    },
    [farms]
  );

  const markAlertRead = useCallback((id: string) => {
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, read: true } : a));
  }, []);

  const markAllAlertsRead = useCallback(() => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  }, []);

  const deleteAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signIn,
      signOut,
      farms,
      saveFarm,
      deleteFarm,
      activeFarm,
      setActiveFarmId,
      activeCrop,
      setActiveCrop,
      locationId,
      setLocationId,
      alerts,
      unreadCount: alerts.filter((a) => !a.read).length,
      markAlertRead,
      markAllAlertsRead,
      deleteAlert
    }),
    [user, signIn, signOut, farms, saveFarm, deleteFarm, activeFarm, activeCrop, locationId, alerts, markAlertRead, markAllAlertsRead, deleteAlert]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}