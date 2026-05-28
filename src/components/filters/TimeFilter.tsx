'use client';

import { MONTHS, MONTH_DISPLAY } from '@/lib/types';
import { useLang } from '@/contexts/LanguageContext';
import { t } from '@/locales';

interface TimeFilterProps {
  selectedMonth: string;
  onChange: (month: string) => void;
}

export function TimeFilter({ selectedMonth, onChange }: TimeFilterProps) {
  const { lang } = useLang();
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">{t[lang].time}</label>
      <select
        value={selectedMonth}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="all">{t[lang].allMonths}</option>
        {MONTHS.map(month => (
          <option key={month} value={month}>
            {MONTH_DISPLAY[month]}
          </option>
        ))}
      </select>
    </div>
  );
}
