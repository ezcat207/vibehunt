import type { AppData, Platform } from './types';
import vercelData from '../../data/processed/vercel.json';
import lovableData from '../../data/processed/lovable.json';
import base44Data from '../../data/processed/base44.json';
import youwareData from '../../data/processed/youware.json';

/**
 * 加载指定平台的应用数据
 */
export function loadAppsData(platform: Platform): AppData[] {
  if (platform === 'all') {
    // 合并所有平台数据
    return [
      ...(vercelData as AppData[]),
      ...(lovableData as AppData[]),
      ...(base44Data as AppData[]),
      ...(youwareData as AppData[]),
    ];
  }

  switch (platform) {
    case 'vercel':
      return vercelData as AppData[];
    case 'lovable':
      return lovableData as AppData[];
    case 'base44':
      return base44Data as AppData[];
    case 'youware':
      return youwareData as AppData[];
    default:
      return [];
  }
}

/**
 * 获取平台统计信息
 */
export function getPlatformStats() {
  return {
    vercel: (vercelData as AppData[]).length,
    lovable: (lovableData as AppData[]).length,
    base44: (base44Data as AppData[]).length,
    youware: (youwareData as AppData[]).length,
    all: (vercelData as AppData[]).length +
         (lovableData as AppData[]).length +
         (base44Data as AppData[]).length +
         (youwareData as AppData[]).length,
  };
}

/**
 * 根据 ID 获取单个应用数据
 */
export function getAppById(id: string, platform?: Platform): AppData | null {
  const apps = platform ? loadAppsData(platform) : loadAppsData('all');
  return apps.find(app => app.id === id) || null;
}

/**
 * 获取应用的历史数据（跨月）- 按精确 URL 匹配，避免同域名不同路径混入
 */
export function getAppHistory(url: string, platform?: Platform): AppData[] {
  const apps = platform ? loadAppsData(platform) : loadAppsData('all');
  return apps.filter(app => app.url === url);
}

/**
 * 获取所有可用的月份
 */
export function getAvailableMonths(platform: Platform): string[] {
  const apps = loadAppsData(platform);
  const months = [...new Set(apps.map(app => app.month))];
  return months.sort().reverse(); // 最新的在前
}
