import Link from 'next/link';
import { getAppById, getAppHistory } from '@/lib/data-loader';
import { formatNumber, formatPercentage, getFaviconUrl } from '@/lib/utils';
import { MONTH_DISPLAY, PLATFORM_CONFIGS } from '@/lib/types';
import { getAppAnalysis } from '@/lib/app-analysis';
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

  const history = getAppHistory(app.domain, app.platform).sort((a, b) => a.timestamp - b.timestamp);
  const platformConfig = PLATFORM_CONFIGS[app.platform];
  const analysis = app.rank <= 3 ? getAppAnalysis(app.domain) : null;

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getFaviconUrl(app.domain, 128)}
                alt={app.name}
                className="w-20 h-20 rounded-xl shadow-md bg-white p-2"
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

        {/* Deep Analysis for Top 3 */}
        {analysis && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">🔬</span>
              <h2 className="text-lg font-bold text-gray-900">深度产品分析</h2>
              <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">Top {app.rank} · {platformConfig.displayName}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: '💡', label: '解决什么问题？', text: analysis.problem },
                { icon: '👤', label: '用户是谁？', text: analysis.users },
                { icon: '🤔', label: '用户为什么需要它？', text: analysis.whyNeed },
                { icon: '🗣️', label: '用户是如何评价它的？', text: analysis.reviews },
                { icon: '🔍', label: '如何找到用户？', text: analysis.acquisition },
                { icon: '💰', label: '它赚钱吗？多少？', text: analysis.revenue },
                { icon: '🧠', label: '从它身上学到了什么？', text: analysis.learnings },
                { icon: '⛰️', label: '什么做法不容易复制？', text: analysis.hardPart },
              ].map(({ icon, label, text }) => (
                <div key={label} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    {icon} {label}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: '🎯', label: '一句话推销', text: analysis.pitch },
                { icon: '💡', label: '不同的实现方法', text: analysis.alternatives },
                { icon: '🧭', label: '如何找到第一批用户', text: analysis.userFinding },
              ].map(({ icon, label, text }) => (
                <div key={label} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                    {icon} {label}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

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
