'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { AppCard } from '@/components/app/AppCard';
import { PlatformFilter } from '@/components/filters/PlatformFilter';
import { TimeFilter } from '@/components/filters/TimeFilter';
import { SortFilter } from '@/components/filters/SortFilter';
import { SearchBar } from '@/components/filters/SearchBar';
import { loadAppsData, getPlatformStats } from '@/lib/data-loader';
import { formatNumber, formatPercentage } from '@/lib/utils';
import { PLATFORM_CONFIGS, MONTH_DISPLAY } from '@/lib/types';
import type { Platform } from '@/lib/types';
import { useLang } from '@/contexts/LanguageContext';
import { t } from '@/locales';

type ViewMode = 'grid' | 'top10';
type RankedPlatform = Exclude<Platform, 'all'>;

export default function Home() {
  const { lang, toggle } = useLang();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-04');
  const [sortBy, setSortBy] = useState<'visits' | 'change' | 'keywords' | 'rank'>('rank');
  const [searchQuery, setSearchQuery] = useState('');
  const [top10Platform, setTop10Platform] = useState<RankedPlatform>('vercel');

  // 加载数据
  const allApps = useMemo(() => loadAppsData(selectedPlatform), [selectedPlatform]);

  // 最新月份（用于默认值和 All 模式去重的优先级）
  const latestMonth = useMemo(() => {
    const months = [...new Set(allApps.map(a => a.month))].sort();
    return months[months.length - 1] ?? 'all';
  }, [allApps]);

  // Top 10 leaderboard data
  const top10Data = useMemo(() => {
    const platformApps = loadAppsData(top10Platform);
    const months = [...new Set(platformApps.map(a => a.month))].sort().reverse();
    return months.map(month => ({
      month,
      apps: platformApps
        .filter(a => a.month === month)
        .sort((a, b) => a.rank - b.rank)
        .slice(0, 10),
    }));
  }, [top10Platform]);
  const stats = useMemo(() => getPlatformStats(), []);

  // 筛选和排序逻辑
  const filteredApps = useMemo(() => {
    let filtered = allApps;

    // 按月份筛选；All 模式下每个 URL 只保留最新月份记录
    if (selectedMonth !== 'all') {
      filtered = filtered.filter(app => app.month === selectedMonth);
    } else {
      // 去重：同一 URL 只保留最新月份的那条记录
      const latestByUrl = new Map<string, typeof allApps[0]>();
      for (const app of filtered) {
        const existing = latestByUrl.get(app.url);
        if (!existing || app.month > existing.month) {
          latestByUrl.set(app.url, app);
        }
      }
      filtered = Array.from(latestByUrl.values());
    }

    // 按搜索关键词筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(query) ||
        app.domain.toLowerCase().includes(query) ||
        app.url.toLowerCase().includes(query)
      );
    }

    // 排序
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'visits':
          return b.visits - a.visits;
        case 'change':
          return b.change - a.change;
        case 'keywords':
          return b.keywordCount - a.keywordCount;
        case 'rank':
        default:
          return a.rank - b.rank;
      }
    });

    return sorted;
  }, [allApps, selectedMonth, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-4">
            {/* Brand */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white tracking-tight">
                VibeHunt
                <span className="ml-2 text-xs font-normal text-slate-400 hidden sm:inline">{t[lang].tagline}</span>
              </h1>
            </div>

            {/* Search — only in grid mode */}
            {viewMode === 'grid' && (
              <div className="flex-1 max-w-sm hidden md:block">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder={t[lang].searchPlaceholder}
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              {/* View mode toggle */}
              <div className="flex items-center gap-0.5 bg-slate-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:text-white'}`}
                >
                  {t[lang].allApps}
                </button>
                <button
                  onClick={() => setViewMode('top10')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${viewMode === 'top10' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:text-white'}`}
                >
                  {t[lang].top10Charts}
                </button>
              </div>
              {/* Language toggle */}
              <button
                onClick={toggle}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-all"
              >
                {lang === 'en' ? '中文' : 'EN'}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          {viewMode === 'grid' && (
            <div className="mt-2 md:hidden">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t[lang].searchPlaceholder}
              />
            </div>
          )}
        </div>
      </header>

      {viewMode === 'grid' && (
        /* Filters for grid view */
        <div className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
            <div className="flex items-center gap-4 flex-wrap">
              <PlatformFilter
                selectedPlatform={selectedPlatform}
                onChange={setSelectedPlatform}
                stats={stats}
              />
              <div className="flex items-center gap-4 ml-auto flex-wrap">
                <TimeFilter
                  selectedMonth={selectedMonth}
                  onChange={setSelectedMonth}
                />
                <SortFilter
                  selectedSort={sortBy}
                  onChange={setSortBy}
                />
                <span className="text-xs text-slate-400 font-medium">
                  {t[lang].appsFound(filteredApps.length)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {viewMode === 'top10' ? (
          /* Top 10 Leaderboard View */
          <div>
            {/* Platform selector */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-sm font-medium text-gray-700">{t[lang].top10Platform}</span>
              {(['vercel', 'lovable', 'base44', 'youware'] as RankedPlatform[]).map(p => {
                const cfg = PLATFORM_CONFIGS[p];
                return (
                  <button
                    key={p}
                    onClick={() => setTop10Platform(p)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border-2 ${
                      top10Platform === p
                        ? 'text-white shadow-md scale-105'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                    style={top10Platform === p ? { backgroundColor: cfg.color, borderColor: cfg.color } : {}}
                  >
                    {cfg.displayName}
                  </button>
                );
              })}
            </div>

            {/* Leaderboard tables per month */}
            <div className="space-y-8">
              {top10Data.map(({ month, apps }) => (
                <div key={month} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div
                    className="px-6 py-3 flex items-center gap-2"
                    style={{ backgroundColor: PLATFORM_CONFIGS[top10Platform].color }}
                  >
                    <span className="text-white font-semibold">{t[lang].top10Title(PLATFORM_CONFIGS[top10Platform].displayName, MONTH_DISPLAY[month] || month)}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-12">{t[lang].colRank}</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{t[lang].colApp}</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">{t[lang].colVisits}</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">{t[lang].colGrowth}</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase w-20">{t[lang].colDetail}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {apps.map((app, idx) => {
                          const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : null;
                          return (
                            <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-4 whitespace-nowrap text-center">
                                {medal ? (
                                  <span className="text-xl">{medal}</span>
                                ) : (
                                  <span className="text-sm font-bold text-gray-400">#{app.rank}</span>
                                )}
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={`https://www.google.com/s2/favicons?domain=${app.domain}&sz=32`}
                                    alt={app.name}
                                    className="w-7 h-7 rounded bg-gray-100"
                                  />
                                  <div>
                                    <p className="text-sm font-semibold text-gray-900">{app.name}</p>
                                    <p className="text-xs text-gray-400">{app.domain}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right">
                                <span className="text-sm font-semibold text-gray-900">{formatNumber(app.visits)}</span>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-right">
                                <span className={`text-sm font-semibold ${app.change > 0 ? 'text-green-600' : app.change < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                                  {app.change > 0 ? '↑' : app.change < 0 ? '↓' : '→'} {formatPercentage(app.change)}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-center">
                                <Link
                                  href={`/app/${app.id}`}
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                                >
                                  {t[lang].detail}
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">{t[lang].noAppsFound}</h3>
            <p className="mt-1 text-sm text-gray-500">{t[lang].adjustFilters}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-center text-xs text-slate-500">
            {t[lang].footer}
          </p>
        </div>
      </footer>
    </div>
  );
}
