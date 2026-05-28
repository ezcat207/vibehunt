'use client';

import Link from 'next/link';
import { formatNumber, formatPercentage, getFaviconUrl } from '@/lib/utils';
import { MONTH_DISPLAY, PLATFORM_CONFIGS } from '@/lib/types';
import type { AppData } from '@/lib/types';
import type { AppAnalysis } from '@/lib/app-analysis';
import { useLang } from '@/contexts/LanguageContext';
import { t } from '@/locales';

interface Props {
  app: AppData;
  history: AppData[];
  analysis: AppAnalysis | null;
}

export function DetailPageClient({ app, history, analysis }: Props) {
  const { lang, toggle } = useLang();
  const platformConfig = PLATFORM_CONFIGS[app.platform];

  const changeColor = app.change > 0 ? 'text-green-600' : app.change < 0 ? 'text-red-600' : 'text-gray-500';
  const changeBgColor = app.change > 0 ? 'bg-green-50' : app.change < 0 ? 'bg-red-50' : 'bg-gray-50';
  const changeIcon = app.change > 0 ? '↑' : app.change < 0 ? '↓' : '→';

  const labels = t[lang].analysisLabels;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t[lang].backToAll}
          </Link>
          <button
            onClick={toggle}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:shadow-sm transition-all"
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
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
                  {t[lang].visitLiveApp}
                </a>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className={`grid divide-x divide-gray-200 ${app.keywordCount > 0 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            <div className="p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">{t[lang].monthlyVisits}</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(app.visits)}</p>
              <p className="text-xs text-gray-500 mt-1">{MONTH_DISPLAY[app.month]}</p>
            </div>
            <div className={`p-6 text-center ${changeBgColor}`}>
              <p className="text-sm text-gray-600 mb-2">{t[lang].growthRate}</p>
              <p className={`text-3xl font-bold ${changeColor}`}>
                {changeIcon} {formatPercentage(app.change)}
              </p>
              <p className="text-xs text-gray-500 mt-1">{t[lang].vsPrevMonth}</p>
            </div>
            {app.keywordCount > 0 && (
              <div className="p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">{t[lang].seoKeywords}</p>
                <p className="text-3xl font-bold text-gray-900">{app.keywordCount}</p>
                <p className="text-xs text-gray-500 mt-1">{t[lang].trackedKeywords}</p>
              </div>
            )}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">{t[lang].whyPopular}</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>{app.name}</strong>{' '}
            {lang === 'zh'
              ? <>在 <strong>{platformConfig.displayName}</strong> 平台排名第 <strong>#{app.rank}</strong>，{MONTH_DISPLAY[app.month]}月访问量达 <strong>{formatNumber(app.visits)}</strong>。</>
              : <>ranks <strong>#{app.rank}</strong> on <strong>{platformConfig.displayName}</strong>, attracting <strong>{formatNumber(app.visits)} monthly visits</strong> in {MONTH_DISPLAY[app.month]}.</>
            }
            {app.change > 0 && (
              lang === 'zh'
                ? <> 应用正经历强劲增长，环比增长 <span className="text-green-600 font-medium">{formatPercentage(app.change)}</span>，显示出持续上升的用户兴趣。</>
                : <> The app is experiencing strong growth with a <span className="text-green-600 font-medium">{formatPercentage(app.change)} increase</span> vs. the previous period, indicating rising user interest.</>
            )}
            {app.change < 0 && (
              lang === 'zh'
                ? <> 应用较上月下降了 <span className="text-red-600 font-medium">{formatPercentage(Math.abs(app.change))}</span>。</>
                : <> The app saw a <span className="text-red-600 font-medium">{formatPercentage(Math.abs(app.change))} decline</span> vs. the previous period.</>
            )}
            {app.change === 0 && (
              lang === 'zh'
                ? <> 应用保持稳定的流量水平。</>
                : <> The app maintains stable traffic levels.</>
            )}
            {app.keywordCount > 0 && (
              lang === 'zh'
                ? <> 共追踪 <strong>{app.keywordCount} 个 SEO 关键词</strong>，展现出良好的搜索可见性。</>
                : <> With <strong>{app.keywordCount} SEO keywords</strong> being tracked, it demonstrates good search visibility and organic reach.</>
            )}
          </p>
        </div>

        {/* Deep Analysis for Top 3 */}
        {analysis && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">🔬</span>
              <h2 className="text-lg font-bold text-gray-900">{t[lang].deepAnalysis}</h2>
              <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                Top {app.rank} · {platformConfig.displayName}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {([
                { key: 'problem', label: labels.problem },
                { key: 'users', label: labels.users },
                { key: 'whyNeed', label: labels.whyNeed },
                { key: 'reviews', label: labels.reviews },
                { key: 'acquisition', label: labels.acquisition },
                { key: 'revenue', label: labels.revenue },
                { key: 'learnings', label: labels.learnings },
                { key: 'hardPart', label: labels.hardPart },
              ] as const).map(({ key, label }) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{analysis[lang][key]}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {([
                { key: 'pitch', label: labels.pitch },
                { key: 'alternatives', label: labels.alternatives },
                { key: 'userFinding', label: labels.userFinding },
              ] as const).map(({ key, label }) => (
                <div key={key} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{analysis[lang][key]}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Historical Performance */}
        {history.length > 1 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {t[lang].performanceHistory}
              <span className="ml-2 text-sm font-normal text-gray-400">{t[lang].platformLabel}: {platformConfig.displayName}</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t[lang].period}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t[lang].rank}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t[lang].visits}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{t[lang].change}</th>
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
