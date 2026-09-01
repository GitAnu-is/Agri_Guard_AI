import React from 'react';
import { NavLink } from 'react-router-dom';
import { getMobileNavForRole } from '../data/navigation';
import { useApp } from '../contexts/AppContext';
import { cn } from '../utils/cn';

/** Bottom navigation for field use on phones. */
export function MobileNav() {
  const { unreadCount, user } = useApp();
  const mobileNav = getMobileNavForRole(user?.role);
  return (
    <nav
      aria-label="Primary mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-earth-200 bg-white/97 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      
      <ul className="flex">
        {mobileNav.map((item) =>
        <li key={item.to} className="flex-1">
            <NavLink
            to={item.to}
            className={({ isActive }) =>
            cn(
              'relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors duration-150 ease-out',
              isActive ? 'text-leaf-800' : 'text-earth-500'
            )
            }>
            
              {({ isActive }) =>
            <>
                  <span className={cn('flex h-7 w-7 items-center justify-center rounded-lg', isActive && 'bg-leaf-50')}>
                    <item.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  {item.label}
                  {item.badgeKey === 'alerts' && unreadCount > 0 &&
              <span className="absolute right-1/2 top-1 translate-x-3 rounded-full bg-risk-500 px-1 font-mono text-[9px] font-bold text-white">
                      {unreadCount}
                    </span>
              }
                </>
            }
            </NavLink>
          </li>
        )}
      </ul>
    </nav>);

}
