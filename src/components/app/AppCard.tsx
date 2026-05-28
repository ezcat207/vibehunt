import Link from 'next/link';
import type { AppData } from '@/lib/types';
import { PLATFORM_CONFIGS } from '@/lib/types';
import { formatNumber, formatPercentage, getFaviconUrl, getAppDetailUrl } from '@/lib/utils';

interface AppCardProps {
  app: AppData;
}

export function AppCard({ app }: AppCardProps) {
  const isUp = app.change > 0;
  const isDown = app.change < 0;
  const platformConfig = PLATFORM_CONFIGS[app.platform];

  return (
    <Link href={getAppDetailUrl(app.id)}>
      <div className="group bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer relative overflow-hidden">

        {/* Platform color accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ backgroundColor: platformConfig.color }}
        />

        {/* Top row: favicon + name + rank badge */}
        <div className="flex items-start gap-3 mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getFaviconUrl(app.domain)}
            alt={app.name}
            className="w-10 h-10 rounded-lg flex-shrink-0 bg-slate-100"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2264%22 height=%2264%22%3E%3Crect width=%2264%22 height=%2264%22 fill=%22%23e2e8f0%22/%3E%3C/svg%3E';
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 truncate text-sm group-hover:text-blue-600 transition-colors leading-tight">
              {app.name}
            </h3>
            <p className="text-xs text-slate-400 truncate mt-0.5">{app.domain}</p>
          </div>
          <span
            className="flex-shrink-0 text-xs font-bold text-white px-2 py-0.5 rounded-full"
            style={{ backgroundColor: platformConfig.color }}
          >
            #{app.rank}
          </span>
        </div>

        {/* Stats row */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-slate-900 leading-none">{formatNumber(app.visits)}</p>
            <p className="text-xs text-slate-400 mt-0.5">visits / mo</p>
          </div>
          <div className={`flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-full ${
            isUp ? 'bg-emerald-50 text-emerald-700' : isDown ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'
          }`}>
            <span>{isUp ? '↑' : isDown ? '↓' : '→'}</span>
            <span>{formatPercentage(app.change)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
