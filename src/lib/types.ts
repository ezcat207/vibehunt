export type Platform = 'vercel' | 'lovable' | 'base44' | 'youware' | 'all';

export interface AppData {
  id: string;              // 唯一ID：vercel-rule34dle-202604
  platform: Exclude<Platform, 'all'>;
  url: string;             // 完整 URL
  domain: string;          // 主域名（用于匹配跨月数据）
  name: string;            // 应用名称（从 URL 提取）
  rank: number;            // 排名 1-100
  visits: number;          // 访问量（数字）
  change: number;          // 变动百分比
  keywords: string[];      // 关键词数组
  keywordCount: number;    // 关键词数量
  month: string;           // 格式：2026-04
  timestamp: number;       // Unix 时间戳
}

export interface FilterOptions {
  platform: Platform;
  month: string | 'all';
  sortBy: 'visits' | 'change' | 'keywords' | 'rank';
  searchQuery: string;
}

export interface MonthData {
  month: string;           // 2026-04
  displayName: string;     // April 2026
  apps: AppData[];
}

export interface PlatformConfig {
  name: string;
  displayName: string;
  color: string;
  icon?: string;
  count?: number;
}

export const PLATFORM_CONFIGS: Record<Exclude<Platform, 'all'>, PlatformConfig> = {
  vercel: {
    name: 'vercel',
    displayName: 'Vercel',
    color: '#171717',
  },
  lovable: {
    name: 'lovable',
    displayName: 'Lovable',
    color: '#E11D48',
  },
  base44: {
    name: 'base44',
    displayName: 'Base44',
    color: '#0891B2',
  },
  youware: {
    name: 'youware',
    displayName: 'Youware',
    color: '#7C3AED',
  },
};

export const MONTHS = ['2026-04', '2026-03', '2026-02'] as const;
export const MONTH_DISPLAY: Record<string, string> = {
  '2026-04': 'April 2026',
  '2026-03': 'March 2026',
  '2026-02': 'February 2026',
};
