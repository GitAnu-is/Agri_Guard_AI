import React from 'react';
import { NavLink } from 'react-router-dom';
import { HelpCircleIcon, LeafIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { getNavSectionsForRole } from '../data/navigation';
import { useApp } from '../contexts/AppContext';
import { cn } from '../utils/cn';

export function Sidebar({ onNavigate }: {onNavigate?: () => void;}) {
  const { unreadCount, user, signOut } = useApp();
  const navSections = getNavSectionsForRole(user?.role);

  const linkClass = ({ isActive }: {isActive: boolean;}) =>
  cn(
    'group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors duration-150 ease-out',
    isActive ? 'bg-leaf-800 text-white' : 'text-leaf-100/75 hover:bg-leaf-800/60 hover:text-white'
  );

  return (
    <div className="flex h-full flex-col bg-leaf-900">
      <div className="flex items-center gap-2.5 px-4 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-leaf-600 text-white">
          <LeafIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-bold leading-tight text-white">AgriGuard AI</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-4 scroll-thin" aria-label="Main navigation">
        {navSections.map((section) =>
        <div key={section.title} className="mb-4">
            <p className="px-2.5 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-leaf-300/60">{section.title}</p>
            <ul className="space-y-0.5">
              {section.items.map((item) =>
            <li key={item.to}>
                  <NavLink to={item.to} className={linkClass} onClick={onNavigate}>
                    <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.label}</span>
                    {item.badgeKey === 'alerts' && unreadCount > 0 &&
                <span className="ml-auto rounded-full bg-risk-500 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">{unreadCount}</span>
                }
                  </NavLink>
                </li>
            )}
            </ul>
          </div>
        )}
      </nav>

      <div className="border-t border-leaf-800 px-2 py-3">
        <ul className="space-y-0.5">
          <li>
            <NavLink to="/settings/support" className={linkClass} onClick={onNavigate}>
              <HelpCircleIcon className="h-4 w-4" aria-hidden="true" />
              Help &amp; Support
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={linkClass} onClick={onNavigate}>
              <UserIcon className="h-4 w-4" aria-hidden="true" />
              User Profile
            </NavLink>
          </li>
        </ul>
        <div className="mt-3 flex items-center gap-2.5 rounded-lg bg-leaf-800/60 px-2.5 py-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-[12px] font-bold text-white">
            {user?.avatarInitials ?? 'NP'}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-white">{user?.fullName ?? 'Demo User'}</p>
            <p className="truncate text-[11px] text-leaf-200/70">{user?.role ?? 'Farmer'}</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            aria-label="Log out"
            className="rounded-md p-1.5 text-leaf-200/70 transition-colors duration-150 ease-out hover:bg-leaf-700 hover:text-white">
            
            <LogOutIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>);

}
