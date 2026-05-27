import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化访问量数字
 * 例如：190600 -> "190.6K", 1300000 -> "1.3M"
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  } else {
    return num.toString();
  }
}

/**
 * 格式化百分比
 */
export function formatPercentage(num: number): string {
  return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
}

/**
 * 生成应用详情页 URL
 */
export function getAppDetailUrl(id: string): string {
  return `/app/${id}`;
}

/**
 * 获取 favicon URL
 */
export function getFaviconUrl(domain: string, size: number = 64): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}
