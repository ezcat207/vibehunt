import Link from 'next/link';
import type { AppData } from '@/lib/types';
import { formatNumber, formatPercentage, getFaviconUrl, getAppDetailUrl } from '@/lib/utils';

interface AppCardProps {
  app: AppData;
}

export function AppCard({ app }: AppCardProps) {
  const changeColor = app.change > 0 ? 'text-green-600' : app.change < 0 ? 'text-red-600' : 'text-gray-500';
  const changeIcon = app.change > 0 ? '↑' : app.change < 0 ? '↓' : '→';

  return (
    <Link href={getAppDetailUrl(app.id)}>
      <div className="group relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
        {/* 排名徽章 */}
        <div className="absolute top-2 right-2 bg-gray-900 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
          #{app.rank}
        </div>

        {/* Favicon + 标题 */}
        <div className="flex items-start gap-3 mb-3">
          <img
            src={getFaviconUrl(app.domain)}
            alt={app.name}
            className="w-12 h-12 rounded-lg flex-shrink-0"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2264%22 height=%2264%22%3E%3Crect width=%2264%22 height=%2264%22 fill=%22%23ddd%22/%3E%3C/svg%3E';
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {app.name}
            </h3>
            <p className="text-xs text-gray-500 truncate">{app.domain}</p>
          </div>
        </div>

        {/* 统计数据 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(app.visits)}</p>
              <p className="text-xs text-gray-500">visits</p>
            </div>
            <div className={`flex items-center gap-1 ${changeColor} font-medium`}>
              <span>{changeIcon}</span>
              <span>{formatPercentage(app.change)}</span>
            </div>
          </div>
        </div>

        {/* 关键词标签 */}
        {app.keywordCount > 0 && (
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span>{app.keywordCount} keywords</span>
          </div>
        )}

        {/* 平台标识 */}
        <div className="absolute bottom-2 right-2">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 capitalize">
            {app.platform}
          </span>
        </div>
      </div>
    </Link>
  );
}
