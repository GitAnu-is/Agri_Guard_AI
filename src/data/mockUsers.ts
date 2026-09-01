import type { User, UserRole } from '../types';

export const userRoles: UserRole[] = [
'Farmer',
'Agricultural Officer',
'Transport Operator',
'Wholesale Market Manager',
'Researcher',
'Policymaker',
'Administrator'];


export const districts = [
'Gampaha',
'Kurunegala',
'Matale',
'Kandy',
'Colombo',
'Kalutara',
'Ratnapura',
'Badulla',
'Anuradhapura',
'Monaragala'];


/** Signed-in demo user. */
export const currentUser: User = {
  id: 'U-001',
  fullName: 'Nimal Perera',
  email: 'nimal.perera@demo.lk',
  phone: '+94 71 234 5678',
  role: 'Farmer',
  district: 'Gampaha',
  location: 'Meewitiya, Gampaha',
  status: 'Active',
  lastActive: 'Now',
  avatarInitials: 'NP'
};

export const demoCredentials = {
  user: {
    email: 'nimal.perera@demo.lk',
    password: 'demo1234'
  },
  admin: {
    email: 'admin@smartagri.demo.lk',
    password: 'admin1234'
  }
} as const;

/** SAMPLE DATA — demo user directory for the administrator view. */
export const mockUsers: User[] = [
currentUser,
{ id: 'U-002', fullName: 'Kumari Silva', email: 'k.silva@agridept.demo.lk', phone: '+94 77 811 2233', role: 'Agricultural Officer', district: 'Gampaha', location: 'Ja-Ela', status: 'Active', lastActive: '18 min ago', avatarInitials: 'KS' },
{ id: 'U-003', fullName: 'Ranjan Fernando', email: 'ranjan.f@translk.demo.lk', phone: '+94 76 445 9081', role: 'Transport Operator', district: 'Colombo', location: 'Wattala', status: 'Active', lastActive: '2 hrs ago', avatarInitials: 'RF' },
{ id: 'U-004', fullName: 'Sunil Jayawardena', email: 'sunil.j@manningmarket.demo.lk', phone: '+94 71 990 1122', role: 'Wholesale Market Manager', district: 'Colombo', location: 'Manning Market', status: 'Active', lastActive: 'Yesterday', avatarInitials: 'SJ' },
{ id: 'U-005', fullName: 'Dr. Anusha Weerasinghe', email: 'anusha.w@research.demo.lk', phone: '+94 70 332 4455', role: 'Researcher', district: 'Kandy', location: 'Peradeniya', status: 'Active', lastActive: '3 days ago', avatarInitials: 'AW' },
{ id: 'U-006', fullName: 'Mahesh Bandara', email: 'm.bandara@policy.demo.lk', phone: '+94 78 220 7788', role: 'Policymaker', district: 'Colombo', location: 'Battaramulla', status: 'Disabled', lastActive: '2 weeks ago', avatarInitials: 'MB' },
{ id: 'U-007', fullName: 'Ishara Gunawardana', email: 'ishara.g@demo.lk', phone: '+94 72 664 3311', role: 'Farmer', district: 'Kurunegala', location: 'Halgahawela', status: 'Active', lastActive: '5 hrs ago', avatarInitials: 'IG' },
{ id: 'U-008', fullName: 'Thilina Rathnayake', email: 'thilina.r@demo.lk', phone: '+94 75 118 2299', role: 'Farmer', district: 'Matale', location: 'Ukuwela', status: 'Pending', lastActive: 'Never', avatarInitials: 'TR' },
{ id: 'U-009', fullName: 'System Administrator', email: 'admin@smartagri.demo.lk', phone: '+94 11 234 5000', role: 'Administrator', district: 'Colombo', location: 'Colombo 07', status: 'Active', lastActive: '1 hr ago', avatarInitials: 'SA' }];
