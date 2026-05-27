'use client';

interface SortFilterProps {
  selectedSort: 'visits' | 'change' | 'keywords' | 'rank';
  onChange: (sort: 'visits' | 'change' | 'keywords' | 'rank') => void;
}

export function SortFilter({ selectedSort, onChange }: SortFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">Sort by:</label>
      <select
        value={selectedSort}
        onChange={(e) => onChange(e.target.value as any)}
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="rank">Rank</option>
        <option value="visits">Most Visits</option>
        <option value="change">Highest Growth</option>
        <option value="keywords">Most Keywords</option>
      </select>
    </div>
  );
}
