import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export interface StatCardProps {
  label: string;
  value: string | number;
  changePercent?: number;
  isPositive?: boolean;
  sublabel?: string;
  icon: React.ReactNode;
  iconBg?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  changePercent,
  isPositive,
  sublabel,
  icon,
  iconBg = 'bg-primary-50 text-primary-600',
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-card hover:shadow-elevated transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        <div className={`p-2.5 rounded-xl ${iconBg}`}>{icon}</div>
      </div>

      <div className="mt-3">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
      </div>

      {(changePercent !== undefined || sublabel) && (
        <div className="mt-2.5 flex items-center text-xs text-slate-500 gap-1.5">
          {changePercent !== undefined && (
            <span
              className={`inline-flex items-center font-semibold ${
                isPositive === true
                  ? 'text-emerald-600'
                  : isPositive === false
                  ? 'text-rose-600'
                  : 'text-slate-600'
              }`}
            >
              {isPositive === true ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : isPositive === false ? (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <Minus className="w-3.5 h-3.5 mr-0.5" />
              )}
              {Math.abs(changePercent)}%
            </span>
          )}
          {sublabel && <span className="text-slate-400">{sublabel}</span>}
        </div>
      )}
    </div>
  );
};
