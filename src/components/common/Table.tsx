import React from 'react';

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  onRowClick?: (item: T) => void;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyState,
  onRowClick,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full overflow-hidden border border-slate-200 rounded-xl bg-white animate-pulse">
        <div className="h-12 bg-slate-100 border-b border-slate-200" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 border-b border-slate-100 flex items-center px-6 gap-4">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-4 bg-slate-100 rounded w-1/4" />
            <div className="h-4 bg-slate-200 rounded w-1/6" />
            <div className="h-4 bg-slate-100 rounded w-1/6 ml-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0 && emptyState) {
    return <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">{emptyState}</div>;
  }

  return (
    <div className="w-full overflow-x-auto border border-slate-200/90 rounded-xl bg-white shadow-subtle">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`py-3.5 px-6 font-semibold ${col.headerClassName || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item, rowIdx) => (
            <tr
              key={keyExtractor(item)}
              onClick={() => onRowClick?.(item)}
              className={`transition-colors ${
                onRowClick ? 'cursor-pointer hover:bg-slate-50/80' : 'hover:bg-slate-50/50'
              }`}
            >
              {columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  className={`py-4 px-6 text-slate-700 align-middle ${col.className || ''}`}
                >
                  {col.render
                    ? col.render(item, rowIdx)
                    : col.accessor
                    ? String(item[col.accessor] ?? '-')
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
