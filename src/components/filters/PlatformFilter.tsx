'use client';

import type { Platform } from '@/lib/types';
import { PLATFORM_CONFIGS } from '@/lib/types';
import { useLang } from '@/contexts/LanguageContext';
import { t } from '@/locales';

interface PlatformFilterProps {
  selectedPlatform: Platform;
  onChange: (platform: Platform) => void;
  stats?: Record<string, number>;
}

export function PlatformFilter({ selectedPlatform, onChange, stats }: PlatformFilterProps) {
  const { lang } = useLang();
  const platforms: Platform[] = ['all', 'vercel', 'lovable', 'base44', 'youware'];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex gap-1.5">
        {platforms.map(platform => {
          const isActive = selectedPlatform === platform;
          const config = platform === 'all'
            ? { name: 'all', displayName: lang === 'zh' ? '全部' : 'All', color: '#334155' }
            : PLATFORM_CONFIGS[platform as Exclude<Platform, 'all'>];

          const count = stats?.[platform] || 0;

          return (
            <button
              key={platform}
              onClick={() => onChange(platform)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isActive
                  ? 'text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              style={isActive ? { backgroundColor: config.color } : {}}
            >
              {config.displayName}
              {count > 0 && (
                <span className={`ml-1 ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
