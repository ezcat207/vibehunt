'use client';

import type { Platform } from '@/lib/types';
import { PLATFORM_CONFIGS } from '@/lib/types';

interface PlatformFilterProps {
  selectedPlatform: Platform;
  onChange: (platform: Platform) => void;
  stats?: Record<string, number>;
}

export function PlatformFilter({ selectedPlatform, onChange, stats }: PlatformFilterProps) {
  const platforms: Platform[] = ['all', 'vercel', 'lovable', 'base44', 'youware'];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <label className="text-sm font-medium text-gray-700">Platform:</label>
      <div className="flex gap-2">
        {platforms.map(platform => {
          const isActive = selectedPlatform === platform;
          const config = platform === 'all'
            ? { name: 'all', displayName: 'All', color: '#6B7280' }
            : PLATFORM_CONFIGS[platform as Exclude<Platform, 'all'>];

          const count = stats?.[platform] || 0;

          return (
            <button
              key={platform}
              onClick={() => onChange(platform)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:shadow-sm'
                }
              `}
              style={isActive ? { backgroundColor: config.color } : {}}
            >
              <span className="capitalize">{config.displayName}</span>
              {count > 0 && (
                <span className={`ml-2 text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
