import React from 'react';
import { Link } from 'react-router-dom';
import { Repeat, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 mb-6">
        <Repeat className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404</h1>
      <h2 className="text-xl font-bold text-slate-800 mt-2">Page Not Found</h2>
      <p className="text-sm text-slate-500 max-w-sm mt-2 mb-8 leading-relaxed">
        The requested admin resource or page doesn't exist in the CampusLoop dashboard.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
};
