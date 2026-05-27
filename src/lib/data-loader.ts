import type { AppData, Platform } from './types';
import vercelData from '../../data/processed/vercel.json';

/**
 * 加载指定平台的应用数据
 */
export function loadAppsData(platform: Platform): AppData[] {
  if (platform === 'all') {
    // TODO: 加载所有平台数据
    return vercelData as AppData[];
  }

  switch (platform) {
    case 'vercel':
      return vercelData as AppData[];
    case 'lovable':
    case 'base44':
    case 'youware':
      // TODO: 加载其他平台数据
      return [];
    default:
      return [];
  }
}

/**
 * 根据 ID 获取单个应用数据
 */
export function getAppById(id: string, platform?: Platform): AppData | null {
  const apps = platform ? loadAppsData(platform) : loadAppsData('all');
  return apps.find(app => app.id === id) || null;
}

/**
 * 获取应用的历史数据（跨月）
 */
export function getAppHistory(domain: string, platform?: Platform): AppData[] {
  const apps = platform ? loadAppsData(platform) : loadAppsData('all');
  return apps.filter(app => app.domain === domain);
}

/**
 * 获取所有可用的月份
 */
export function getAvailableMonths(platform: Platform): string[] {
  const apps = loadAppsData(platform);
  const months = [...new Set(apps.map(app => app.month))];
  return months.sort().reverse(); // 最新的在前
}
