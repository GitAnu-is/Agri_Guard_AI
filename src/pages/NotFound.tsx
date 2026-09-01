import React from 'react';
import { Link } from 'react-router-dom';
import { CompassIcon } from 'lucide-react';

export function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-earth-50 px-6 text-center">
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-earth-200 bg-white text-leaf-700">
        <CompassIcon className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="font-mono text-[13px] font-semibold text-earth-500">404</p>
      <h1 className="mt-1 text-2xl font-bold text-leaf-900">This page is not part of the platform</h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-earth-600">
        The route you requested does not exist in this research build. Return to the dashboard to reach any of the five AI components.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 inline-flex h-11 items-center rounded-xl bg-leaf-700 px-5 text-[15px] font-medium text-white transition-colors duration-150 ease-out hover:bg-leaf-800">
        
        Back to dashboard
      </Link>
    </div>);

}