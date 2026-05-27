'use client';

import { useState, useMemo } from 'react';
import { AppCard } from '@/components/app/AppCard';
import { PlatformFilter } from '@/components/filters/PlatformFilter';
import { TimeFilter } from '@/components/filters/TimeFilter';
import { SortFilter } from '@/components/filters/SortFilter';
import { SearchBar } from '@/components/filters/SearchBar';
import { loadAppsData, getPlatformStats } from '@/lib/data-loader';
import type { AppData, Platform } from '@/lib/types';

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'visits' | 'change' | 'keywords' | 'rank'>('rank');
  const [searchQuery, setSearchQuery] = useState('');

  // 加载数据
  const allApps = useMemo(() => loadAppsData(selectedPlatform), [selectedPlatform]);
  const stats = useMemo(() => getPlatformStats(), []);

  // 筛选和排序逻辑
  const filteredApps = useMemo(() => {
    let filtered = allApps;

    // 按月份筛选
    if (selectedMonth !== 'all') {
      filtered = filtered.filter(app => app.month === selectedMonth);
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">VibeHunt</h1>
              <p className="text-sm text-gray-600 mt-1">Discover trending Vibe Coding apps</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">{filteredApps.length}</span>
              <span>apps found</span>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, domain, or URL..."
          />
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="space-y-3">
            <PlatformFilter
              selectedPlatform={selectedPlatform}
              onChange={setSelectedPlatform}
              stats={stats}
            />
            <div className="flex items-center gap-6 flex-wrap">
              <TimeFilter
                selectedMonth={selectedMonth}
                onChange={setSelectedMonth}
              />
              <SortFilter
                selectedSort={sortBy}
                onChange={setSortBy}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredApps.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No apps found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Built with ❤️ using Claude Code • Data from public traffic analytics
          </p>
        </div>
      </footer>
    </div>
  );
}
