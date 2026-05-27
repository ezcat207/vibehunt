import Link from 'next/link';
import { getAppById, getAppHistory } from '@/lib/data-loader';
import { formatNumber, formatPercentage, getFaviconUrl } from '@/lib/utils';
import { MONTH_DISPLAY } from '@/lib/types';
import type { Metadata } from 'next';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getAppById(params.id);

  if (!app) {
    return {
      title: 'App Not Found - VibeHunt',
    };
  }

  return {
    title: `${app.name} - VibeHunt`,
    description: `${app.name} ranks #${app.rank} on ${app.platform} with ${formatNumber(app.visits)} monthly visits. Growth: ${formatPercentage(app.change)}.`,
  };
}

export default function AppDetailPage({ params }: Props) {
  const app = getAppById(params.id);

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">App Not Found</h1>
          <p className="mt-2 text-gray-600">The app you're looking for doesn't exist.</p>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // 获取历史数据
  const history = getAppHistory(app.domain).sort((a, b) => a.timestamp - b.timestamp);

  const changeColor = app.change > 0 ? 'text-green-600' : app.change < 0 ? 'text-red-600' : 'text-gray-500';
  const changeIcon = app.change > 0 ? '↑' : app.change < 0 ? '↓' : '→';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to apps
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* App Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start gap-6">
            <img
              src={getFaviconUrl(app.domain, 128)}
              alt={app.name}
              className="w-24 h-24 rounded-xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22128%22 height=%22128%22%3E%3Crect width=%22128%22 height=%22128%22 fill=%22%23ddd%22/%3E%3C/svg%3E';
              }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{app.name}</h1>
                <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-900 text-white capitalize">
                  {app.platform}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{app.url}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Rank</p>
                  <p className="text-3xl font-bold text-gray-900">#{app.rank}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly Visits</p>
                  <p className="text-3xl font-bold text-gray-900">{formatNumber(app.visits)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Growth</p>
                  <p className={`text-3xl font-bold ${changeColor}`}>
                    {changeIcon} {formatPercentage(app.change)}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <a
                  href={`https://${app.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Visit App
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Month</p>
              <p className="text-lg font-semibold text-gray-900">{MONTH_DISPLAY[app.month] || app.month}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Keywords Tracked</p>
              <p className="text-lg font-semibold text-gray-900">{app.keywordCount}</p>
            </div>
          </div>
        </div>

        {/* Historical Data */}
        {history.length > 1 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Historical Performance</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {MONTH_DISPLAY[record.month] || record.month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #{record.rank}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatNumber(record.visits)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${record.change > 0 ? 'text-green-600' : record.change < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                        {record.change > 0 ? '↑' : record.change < 0 ? '↓' : '→'} {formatPercentage(record.change)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
