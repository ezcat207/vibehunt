'use client';

import { useLang } from '@/contexts/LanguageContext';
import { t } from '@/locales';

interface SortFilterProps {
  selectedSort: 'visits' | 'change' | 'keywords' | 'rank';
  onChange: (sort: 'visits' | 'change' | 'keywords' | 'rank') => void;
}

export function SortFilter({ selectedSort, onChange }: SortFilterProps) {
  const { lang } = useLang();
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">{t[lang].sortBy}</label>
      <select
        value={selectedSort}
        onChange={(e) => onChange(e.target.value as any)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="rank">{t[lang].sortRank}</option>
        <option value="visits">{t[lang].sortVisits}</option>
        <option value="change">{t[lang].sortGrowth}</option>
        <option value="keywords">{t[lang].sortKeywords}</option>
      </select>
    </div>
  );
}
