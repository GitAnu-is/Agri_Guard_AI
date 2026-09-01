import {
  ActivityIcon,
  BarChart3Icon,
  BellIcon,
  BoxIcon,
  BrainCircuitIcon,
  CloudSunIcon,
  CpuIcon,
  DatabaseIcon,
  FileTextIcon,
  FlaskConicalIcon,
  GaugeIcon,
  LayoutDashboardIcon,
  LeafIcon,
  MapIcon,
  MicroscopeIcon,
  NetworkIcon,
  PackageIcon,
  ScanSearchIcon,
  SettingsIcon,
  ShieldCheckIcon,
  SproutIcon,
  StoreIcon,
  TruckIcon,
  UsersIcon,
  WarehouseIcon } from
'lucide-react';
import type { UserRole } from '../types';

export interface NavItem {
  label: string;
  to: string;
  icon: typeof LeafIcon;
  /** Shown as a small counter badge (alerts). */
  badgeKey?: 'alerts';
}

export interface NavSection {
  title: string;
  items: NavItem[];
  adminOnly?: boolean;
}

export const navSections: NavSection[] = [
{
  title: 'Overview',
  items: [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboardIcon },
  { label: 'My Farm', to: '/farm', icon: SproutIcon },
  { label: 'Crop Records', to: '/crops', icon: LeafIcon },
  { label: 'Agricultural Map', to: '/map', icon: MapIcon }]

},
{
  title: 'Pre-harvest AI',
  items: [
  { label: 'Crop Recommendation', to: '/crop-recommendation', icon: ScanSearchIcon },
  { label: 'Disease Detection', to: '/disease-detection', icon: MicroscopeIcon },
  { label: 'Disease History', to: '/disease-history', icon: ActivityIcon },
  { label: 'Harvest Planning', to: '/harvest-planning', icon: GaugeIcon }]

},
{
  title: 'Post-harvest AI',
  items: [
  { label: 'Harvest Quality', to: '/harvest-quality', icon: ShieldCheckIcon },
  { label: 'Market Readiness', to: '/market-readiness', icon: StoreIcon },
  { label: 'Transportation Risk', to: '/transportation-risk', icon: TruckIcon },
  { label: 'Packaging', to: '/packaging', icon: PackageIcon },
  { label: 'Storage', to: '/storage', icon: WarehouseIcon }]

},
{
  title: 'Intelligence',
  items: [
  { label: 'Weather Intelligence', to: '/weather', icon: CloudSunIcon },
  { label: 'AI Insights / XAI', to: '/xai', icon: BrainCircuitIcon },
  { label: 'Alerts & Notifications', to: '/alerts', icon: BellIcon, badgeKey: 'alerts' },
  { label: 'Reports', to: '/reports', icon: FileTextIcon },
  { label: 'Analytics', to: '/analytics', icon: BarChart3Icon },
  { label: 'Data Visualization', to: '/data-visualization', icon: BoxIcon }]

},
{
  title: 'Research',
  items: [
  { label: 'AI Model Information', to: '/ai-models', icon: CpuIcon },
  { label: 'Model Performance', to: '/model-performance', icon: ActivityIcon },
  { label: 'Data Processing', to: '/data-processing', icon: DatabaseIcon },
  { label: 'System Architecture', to: '/architecture', icon: NetworkIcon },
  { label: 'Research Overview', to: '/research', icon: FlaskConicalIcon },
  { label: 'Project Team', to: '/team', icon: UsersIcon }]

},
{
  title: 'Administration',
  adminOnly: true,
  items: [
  { label: 'User Management', to: '/users', icon: UsersIcon },
  { label: 'Settings', to: '/settings', icon: SettingsIcon }]

}];

export function getNavSectionsForRole(role?: UserRole): NavSection[] {
  if (role === 'Administrator') return navSections;
  return navSections.filter((section) => !section.adminOnly);
}


/** Mobile bottom bar — the six surfaces prioritised for field use. */
export const mobileNav: NavItem[] = [
{ label: 'Dashboard', to: '/dashboard', icon: LayoutDashboardIcon },
{ label: 'Detect', to: '/disease-detection', icon: MicroscopeIcon },
{ label: 'Weather', to: '/weather', icon: CloudSunIcon },
{ label: 'Harvest', to: '/harvest-planning', icon: GaugeIcon },
{ label: 'Alerts', to: '/alerts', icon: BellIcon, badgeKey: 'alerts' }];

export function getMobileNavForRole(role?: UserRole): NavItem[] {
  if (role !== 'Administrator') return mobileNav;
  return [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboardIcon },
  { label: 'Users', to: '/users', icon: UsersIcon },
  { label: 'Alerts', to: '/alerts', icon: BellIcon, badgeKey: 'alerts' },
  { label: 'Settings', to: '/settings', icon: SettingsIcon }];
}


/** Flat lookup for page titles used by the header. */
export const routeTitles: Record<string, string> = Object.fromEntries(
  navSections.flatMap((s) => s.items.map((i) => [i.to, i.label]))
);
