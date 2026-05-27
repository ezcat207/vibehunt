import Link from 'next/link';
import { getAppById, getAppHistory } from '@/lib/data-loader';
import { formatNumber, formatPercentage, getFaviconUrl } from '@/lib/utils';
import { MONTH_DISPLAY, PLATFORM_CONFIGS } from '@/lib/types';
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
  const platformConfig = PLATFORM_CONFIGS[app.platform];

  const changeColor = app.change > 0 ? 'text-green-600' : app.change < 0 ? 'text-red-600' : 'text-gray-500';
  const changeBgColor = app.change > 0 ? 'bg-green-50' : app.change < 0 ? 'bg-red-50' : 'bg-gray-50';
  const changeIcon = app.change > 0 ? '↑' : app.change < 0 ? '↓' : '→';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all apps
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {/* App Header with gradient background */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 border-b border-gray-200">
            <div className="flex items-start gap-6">
              <img
                src={getFaviconUrl(app.domain, 128)}
                alt={app.name}
                className="w-20 h-20 rounded-xl shadow-md bg-white p-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22128%22 height=%22128%22%3E%3Crect width=%22128%22 height=%22128%22 fill=%22%23ddd%22/%3E%3C/svg%3E';
                }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{app.name}</h1>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-white capitalize"
                    style={{ backgroundColor: platformConfig.color }}
                  >
                    {platformConfig.displayName}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-white text-gray-700 border border-gray-300">
                    #{app.rank}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{app.url}</p>

                {/* Visit Button */}
                <a
                  href={`https://${app.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Live App
                </a>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            <div className="p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Monthly Visits</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(app.visits)}</p>
              <p className="text-xs text-gray-500 mt-1">{MONTH_DISPLAY[app.month]}</p>
            </div>
            <div className={`p-6 text-center ${changeBgColor}`}>
              <p className="text-sm text-gray-600 mb-2">Growth Rate</p>
              <p className={`text-3xl font-bold ${changeColor}`}>
                {changeIcon} {formatPercentage(app.change)}
              </p>
              <p className="text-xs text-gray-500 mt-1">vs. previous month</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">SEO Keywords</p>
              <p className="text-3xl font-bold text-gray-900">{app.keywordCount}</p>
              <p className="text-xs text-gray-500 mt-1">tracked keywords</p>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Why This App is Popular</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>{app.name}</strong> has achieved rank <strong>#{app.rank}</strong> on <strong>{platformConfig.displayName}</strong> platform,
            attracting <strong>{formatNumber(app.visits)} monthly visits</strong> in {MONTH_DISPLAY[app.month]}.
            {app.change > 0 && (
              <> The app is experiencing strong growth with a <span className="text-green-600 font-medium">{formatPercentage(app.change)} increase</span> compared to the previous period,
              indicating rising user interest and engagement.</>
            )}
            {app.change < 0 && (
              <> The app saw a <span className="text-red-600 font-medium">{formatPercentage(Math.abs(app.change))} decline</span> compared to the previous period.</>
            )}
            {app.change === 0 && <> The app maintains stable traffic levels with consistent user engagement.</>}
            {app.keywordCount > 0 && (
              <> With <strong>{app.keywordCount} SEO keywords</strong> being tracked, it demonstrates good search visibility and organic reach.</>
            )}
          </p>
        </div>

        {/* Historical Performance */}
        {history.length > 1 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Performance History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Visits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Change</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {history.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {MONTH_DISPLAY[record.month] || record.month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                          #{record.rank}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {formatNumber(record.visits)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 text-sm font-semibold ${record.change > 0 ? 'text-green-600' : record.change < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                          {record.change > 0 ? '↑' : record.change < 0 ? '↓' : '→'} {formatPercentage(record.change)}
                        </span>
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
