import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BellIcon, CloudSunIcon, LogOutIcon, MapPinIcon, MenuIcon, SearchIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { getNavSectionsForRole, routeTitles } from '../data/navigation';
import { locations, currentWeather } from '../data/mockWeather';
import { useApp } from '../contexts/AppContext';
import { Dropdown, DropdownItem } from '../components/ui/Overlay';
import { PriorityBadge } from '../components/ui/Badge';

export function TopHeader({ onOpenSidebar }: {onOpenSidebar: () => void;}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { alerts, unreadCount, locationId, setLocationId, user, signOut } = useApp();
  const [query, setQuery] = React.useState('');

  const title = routeTitles[pathname] ?? 'AgriGuard AI';
  const activeLocation = locations.find((l) => l.id === locationId) ?? locations[0];
  const navSections = getNavSectionsForRole(user?.role);

  const searchResults = React.useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return navSections.
    flatMap((s) => s.items).
    filter((i) => i.label.toLowerCase().includes(q)).
    slice(0, 6);
  }, [query]);

  return (
    <header className="sticky top-0 z-30 border-b border-earth-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
          className="rounded-lg p-2 text-earth-600 transition-colors duration-150 ease-out hover:bg-earth-100 lg:hidden">
          
          <MenuIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold leading-tight text-leaf-900">{title}</p>
          <p className="hidden truncate text-[12px] text-earth-500 sm:block">
            AgriGuard AI Advisory Platform · {activeLocation.district} District
          </p>
        </div>

        <div className="relative hidden w-64 xl:block">
          <label htmlFor="global-search" className="sr-only">
            Search the platform
          </label>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth-400" aria-hidden="true" />
          <input
            id="global-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search modules…"
            className="h-9 w-full rounded-lg border border-earth-200 bg-earth-50 pl-9 pr-3 text-[13px] text-leaf-900 placeholder:text-earth-400 focus:border-leaf-500 focus:bg-white" />
          
          {searchResults.length > 0 &&
          <ul className="absolute left-0 top-full z-40 mt-1.5 w-full overflow-hidden rounded-xl border border-earth-200 bg-white py-1 shadow-lift">
              {searchResults.map((r) =>
            <li key={r.to}>
                  <button
                type="button"
                onClick={() => {
                  navigate(r.to);
                  setQuery('');
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] font-medium text-earth-700 transition-colors duration-150 ease-out hover:bg-earth-50 hover:text-leaf-900">
                
                    <r.icon className="h-4 w-4 text-earth-400" aria-hidden="true" />
                    {r.label}
                  </button>
                </li>
            )}
            </ul>
          }
        </div>

        <div className="hidden md:block">
          <label htmlFor="location-select" className="sr-only">
            Select location
          </label>
          <div className="relative">
            <MapPinIcon className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-earth-400" aria-hidden="true" />
            <select
              id="location-select"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="h-9 appearance-none rounded-lg border border-earth-200 bg-white pl-8 pr-7 text-[13px] font-medium text-leaf-900 focus:border-leaf-500">
              
              {locations.map((l) =>
              <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              )}
            </select>
          </div>
        </div>

        <Link
          to="/weather"
          className="hidden items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-1.5 text-[13px] font-semibold text-sky-800 transition-colors duration-150 ease-out hover:bg-sky-100 sm:flex">
          
          <CloudSunIcon className="h-4 w-4" aria-hidden="true" />
          {currentWeather.temperature}°C
          <span className="hidden font-normal text-sky-700 lg:inline">{currentWeather.condition}</span>
        </Link>

        <Dropdown
          trigger={({ toggle }) =>
          <button
            type="button"
            onClick={toggle}
            aria-label={`Notifications, ${unreadCount} unread`}
            className="relative rounded-lg p-2 text-earth-600 transition-colors duration-150 ease-out hover:bg-earth-100">
            
              <BellIcon className="h-5 w-5" aria-hidden="true" />
              {unreadCount > 0 &&
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-risk-500 px-1 font-mono text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
            }
            </button>
          }
          className="w-[340px]">
          
          <div className="border-b border-earth-200 px-3 pb-2 pt-1.5">
            <p className="text-[13px] font-semibold text-leaf-900">Notifications</p>
            <p className="text-[12px] text-earth-500">{unreadCount} unread alerts</p>
          </div>
          <ul className="max-h-72 overflow-y-auto scroll-thin">
            {alerts.slice(0, 5).map((a) =>
            <li key={a.id}>
                <button
                type="button"
                onClick={() => navigate(a.link)}
                className="w-full px-3 py-2.5 text-left transition-colors duration-150 ease-out hover:bg-earth-50">
                
                  <div className="flex items-center gap-2">
                    <PriorityBadge priority={a.priority} size="sm" />
                    <span className="truncate text-[11px] text-earth-500">{a.time}</span>
                  </div>
                  <p className="mt-1 text-[13px] font-medium leading-5 text-leaf-900">{a.title}</p>
                </button>
              </li>
            )}
          </ul>
          <div className="border-t border-earth-200 px-3 py-2">
            <Link to="/alerts" className="text-[13px] font-semibold text-leaf-700 hover:text-leaf-900">
              View all alerts
            </Link>
          </div>
        </Dropdown>

        <Dropdown
          trigger={({ toggle }) =>
          <button
            type="button"
            onClick={toggle}
            aria-label="Open user menu"
            className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition-colors duration-150 ease-out hover:bg-earth-100">
            
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-leaf-700 text-[12px] font-bold text-white">
                {user?.avatarInitials ?? 'NP'}
              </span>
              <span className="hidden text-left lg:block">
                <span className="block text-[13px] font-semibold leading-tight text-leaf-900">{user?.fullName ?? 'Demo User'}</span>
                <span className="block text-[11px] text-earth-500">{user?.role ?? 'Farmer'}</span>
              </span>
            </button>
          }>
          
          <DropdownItem icon={<UserIcon className="h-4 w-4" aria-hidden="true" />} onClick={() => navigate('/settings')}>
            Profile
          </DropdownItem>
          <DropdownItem icon={<SettingsIcon className="h-4 w-4" aria-hidden="true" />} onClick={() => navigate('/settings')}>
            Settings
          </DropdownItem>
          <DropdownItem tone="danger" icon={<LogOutIcon className="h-4 w-4" aria-hidden="true" />} onClick={signOut}>
            Log out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>);

}
