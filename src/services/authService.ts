import type { User, UserRole } from '../types';
import { demoCredentials, mockUsers } from '../data/mockUsers';
import { endpoints, mockRequest } from './apiClient';

export interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  district: string;
  location: string;
}

export const authService = {
  /** POST /api/auth/login */
  async login(payload: LoginPayload): Promise<User> {
    const email = payload.email.trim().toLowerCase();
    const matched = mockUsers.find((u) => u.email.toLowerCase() === email);
    const acceptedPasswords = new Set([demoCredentials.user.password, demoCredentials.admin.password]);

    if (!matched || !acceptedPasswords.has(payload.password)) {
      await mockRequest(endpoints.login, null, { delay: 600 });
      throw new Error('Invalid demo credentials');
    }

    const user = matched;
    await mockRequest(endpoints.login, user, { delay: 1100 });
    localStorage.setItem('sap.token', 'demo-token');
    localStorage.setItem('sap.user', JSON.stringify(user));
    return user;
  },

  /** POST /api/auth/register */
  async register(payload: RegisterPayload): Promise<User> {
    const user: User = {
      id: `U-${Math.floor(Math.random() * 900 + 100)}`,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      role: payload.role,
      district: payload.district,
      location: payload.location,
      status: 'Active',
      lastActive: 'Now',
      avatarInitials: payload.fullName.
      split(' ').
      filter(Boolean).
      slice(0, 2).
      map((p) => p[0]?.toUpperCase() ?? '').
      join('')
    };
    await mockRequest(endpoints.register, user, { delay: 1200 });
    localStorage.setItem('sap.token', 'demo-token');
    localStorage.setItem('sap.user', JSON.stringify(user));
    return user;
  },

  async requestPasswordReset(email: string): Promise<{email: string;}> {
    return mockRequest('POST /api/auth/forgot-password', { email }, { delay: 900 });
  },

  async resetPassword(password: string): Promise<{ok: true;}> {
    await mockRequest('POST /api/auth/reset-password', { password }, { delay: 900 });
    return { ok: true };
  },

  getStoredUser(): User | null {
    const raw = localStorage.getItem('sap.user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },

  logout(): void {
    localStorage.removeItem('sap.token');
    localStorage.removeItem('sap.user');
  },

  listUsers(): Promise<User[]> {
    return mockRequest('GET /api/users', mockUsers, { delay: 600 });
  }
};
