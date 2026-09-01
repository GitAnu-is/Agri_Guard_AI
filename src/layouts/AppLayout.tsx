import React, { Suspense, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { MobileNav } from './MobileNav';
import { AIAssistant } from '../components/AIAssistant';
import { LoadingState } from '../components/ui/Feedback';
import { Drawer } from '../components/ui/Overlay';
import { useApp } from '../contexts/AppContext';

export function AppLayout() {
  const { isAuthenticated, user } = useApp();
  const { pathname } = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (pathname.startsWith('/users') && user?.role !== 'Administrator') return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen w-full bg-earth-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block" aria-label="Sidebar">
        <Sidebar />
      </aside>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Navigation" side="left" width="max-w-[17rem]">
        <div className="-mx-5 -my-4">
          <Sidebar onNavigate={() => setDrawerOpen(false)} />
        </div>
      </Drawer>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <TopHeader onOpenSidebar={() => setDrawerOpen(true)} />
        <main className="flex-1 px-4 pb-24 pt-6 lg:px-6 lg:pb-10">
          <Suspense fallback={<LoadingState label="Loading module…" rows={6} />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </main>
      </div>

      <AIAssistant />
      <MobileNav />
    </div>);

}
