import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LeafIcon } from 'lucide-react';
import { images } from '../data/images';
import { researchProject } from '../data/mockResearch';
import { LoadingState } from '../components/ui/Feedback';
import { useApp } from '../contexts/AppContext';

export function AuthLayout() {
  const { isAuthenticated } = useApp();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen w-full bg-white">
      <div className="relative hidden w-[44%] shrink-0 lg:block">
        <img src={images.loginHero} alt="Terraced tropical farmland at sunrise" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-leaf-900/70" />
        <div className="relative flex h-full flex-col justify-between p-10 text-white">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-leaf-600">
              <LeafIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[15px] font-bold leading-tight">AgriGuard AI</p>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-leaf-200/80">Research decision-support system</p>
            <h2 className="mt-3 max-w-md text-[30px] font-bold leading-9">{researchProject.title}</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-leaf-100/85">
              An integrated, explainable AI platform covering crop recommendation, disease detection, harvest planning, quality grading and
              transportation risk for Pineapple, Banana and Black Pepper.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {['SHAP', 'Grad-CAM', 'YOLOv8', 'LSTM', 'EfficientNet'].map((tag) =>
              <li key={tag} className="rounded-full border border-white/25 px-2.5 py-1 text-[12px] font-semibold text-white/90">
                  {tag}
                </li>
              )}
            </ul>
          </div>

          <p className="text-[12px] text-leaf-100/60">
            Demonstration build. All predictions shown in this frontend are sample data from mock services.
          </p>
        </div>
      </div>

      <div className="flex min-h-screen flex-1 items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <Suspense fallback={<LoadingState label="Loading…" rows={4} />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>);

}
