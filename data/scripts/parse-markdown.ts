import * as fs from 'fs';
import * as path from 'path';

type Platform = 'vercel' | 'lovable' | 'base44' | 'youware';

interface AppData {
  id: string;
  platform: Platform;
  url: string;
  domain: string;
  name: string;
  rank: number;
  visits: number;
  change: number;
  keywords: string[];
  keywordCount: number;
  month: string;
  timestamp: number;
}

/**
 * 从 URL 提取应用名称
 */
function extractAppName(url: string): string {
  // 移除域名后缀
  let name = url.replace(/\.(vercel|lovable|base44|youware)\.app.*$/, '');

  // 处理特殊字符
  name = name
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return name || url;
}

/**
 * 提取域名（用于跨月匹配）
 */
function extractDomain(url: string): string {
  return url.split('/')[0];
}

/**
 * 转换访问量字符串为数字
 * 例如："190.6K" -> 190600, "1.3M" -> 1300000
 */
function parseVisits(visitStr: string): number {
  if (!visitStr || visitStr === '< 50') return 0;

  visitStr = visitStr.trim();

  if (visitStr.includes('K')) {
    return parseFloat(visitStr.replace('K', '')) * 1000;
  } else if (visitStr.includes('M')) {
    return parseFloat(visitStr.replace('M', '')) * 1000000;
  } else {
    return parseFloat(visitStr.replace(/,/g, '')) || 0;
  }
}

/**
 * 转换变动百分比字符串为数字
 * 例如："4.30%" -> 4.3, "-31%" -> -31
 */
function parseChange(changeStr: string): number {
  if (!changeStr || changeStr === '新' || changeStr === '-') return 0;

  changeStr = changeStr.trim().replace('%', '').replace('>', '').replace('<', '');

  if (changeStr.includes(',')) {
    changeStr = changeStr.replace(/,/g, '');
  }

  return parseFloat(changeStr) || 0;
}

/**
 * 转换月份字符串为标准格式
 * "April 2026" -> "2026-04"
 */
function parseMonth(monthStr: string): string {
  const monthMap: Record<string, string> = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };

  const match = monthStr.match(/(\w+)\s+(\d{4})/);
  if (!match) return '2026-01';

  const [, month, year] = match;
  return `${year}-${monthMap[month] || '01'}`;
}

/**
 * 解析单个平台的 Markdown 文件
 */
function parsePlatformMarkdown(filePath: string, platform: Platform): AppData[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const apps: AppData[] = [];
  let currentMonth = '';
  let rankList: number[] = [];
  let urlList: string[] = [];
  let visitsList: string[] = [];
  let changeList: string[] = [];
  let keywordsList: string[] = [];

  let inRankSection = false;
  let inUrlSection = false;
  let inVisitsSection = false;
  let inChangeSection = false;
  let inKeywordsSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 检测月份标记
    if (line.includes('明细对象：')) {
      // 保存上一个月的数据
      if (currentMonth && urlList.length > 0) {
        processMonthData(
          platform,
          currentMonth,
          rankList,
          urlList,
          visitsList,
          changeList,
          keywordsList,
          apps
        );
      }

      // 重置数据
      const monthMatch = line.match(/明细对象：(.+)/);
      currentMonth = monthMatch ? parseMonth(monthMatch[1]) : '';
      rankList = [];
      urlList = [];
      visitsList = [];
      changeList = [];
      keywordsList = [];
      inRankSection = false;
      inUrlSection = false;
      inVisitsSection = false;
      inChangeSection = false;
      inKeywordsSection = false;
      continue;
    }

    // 检测排名区间（1-100的数字）
    if (/^→?\d+$/.test(line)) {
      const num = parseInt(line.replace('→', ''));
      if (num >= 1 && num <= 100) {
        inRankSection = true;
        inUrlSection = false;
        inVisitsSection = false;
        inChangeSection = false;
        inKeywordsSection = false;
        rankList.push(num);
      }
      continue;
    }

    // 检测 URL 部分（包含 .app 域名）
    if (line.includes(`.${platform}.app`)) {
      inRankSection = false;
      inUrlSection = true;
      inVisitsSection = false;
      inChangeSection = false;
      inKeywordsSection = false;

      // 清理 URL（移除行号标记）
      const url = line.replace(/^→/, '').trim();
      urlList.push(url);
      continue;
    }

    // 检测访问量（包含 K 或数字，但不是百分比）
    if ((line.includes('K') || line.includes('M') || /^\d{1,3}(,\d{3})*(\.\d+)?$/.test(line) || line === '< 50') && !line.includes('%')) {
      inRankSection = false;
      inUrlSection = false;
      inVisitsSection = true;
      inChangeSection = false;
      inKeywordsSection = false;

      const visits = line.replace('→', '').trim();
      visitsList.push(visits);
      continue;
    }

    // 检测变动百分比
    if (line.includes('%') || line === '新' || (line === '-' && inChangeSection)) {
      inRankSection = false;
      inUrlSection = false;
      inVisitsSection = false;
      inChangeSection = true;
      inKeywordsSection = false;

      const change = line.replace('→', '').trim();
      changeList.push(change);
      continue;
    }

    // 检测关键词（"所有关键词"前的数字）
    if (line.match(/^\d+$/) && i + 1 < lines.length && lines[i + 1].includes('所有关键词')) {
      inRankSection = false;
      inUrlSection = false;
      inVisitsSection = false;
      inChangeSection = false;
      inKeywordsSection = true;

      keywordsList.push(line.replace('→', '').trim());
      continue;
    }
  }

  // 处理最后一个月的数据
  if (currentMonth && urlList.length > 0) {
    processMonthData(
      platform,
      currentMonth,
      rankList,
      urlList,
      visitsList,
      changeList,
      keywordsList,
      apps
    );
  }

  return apps;
}

/**
 * 处理单个月份的数据
 */
function processMonthData(
  platform: Platform,
  month: string,
  rankList: number[],
  urlList: string[],
  visitsList: string[],
  changeList: string[],
  keywordsList: string[],
  apps: AppData[]
): void {
  const count = Math.min(urlList.length, visitsList.length);

  for (let i = 0; i < count; i++) {
    const url = urlList[i];
    const domain = extractDomain(url);
    const name = extractAppName(domain);
    const rank = rankList[i] || i + 1;
    const visits = parseVisits(visitsList[i]);
    const change = changeList[i] ? parseChange(changeList[i]) : 0;
    const keywordCount = keywordsList[i] ? parseInt(keywordsList[i]) : 0;

    const id = `${platform}-${domain.replace(/\./g, '-')}-${month.replace(/-/g, '')}`;

    // 解析时间戳
    const [year, monthNum] = month.split('-').map(Number);
    const timestamp = new Date(year, monthNum - 1, 1).getTime();

    apps.push({
      id,
      platform,
      url,
      domain,
      name,
      rank,
      visits,
      change,
      keywords: [], // 关键词需要从后续行解析，暂时留空
      keywordCount,
      month,
      timestamp,
    });
  }
}

/**
 * 主函数：解析所有平台或指定平台
 */
async function main() {
  const args = process.argv.slice(2);
  const platformArg = args.find(arg => arg.startsWith('--platform='));
  const allFlag = args.includes('--all');

  const platforms: Platform[] = allFlag
    ? ['vercel', 'lovable', 'base44', 'youware']
    : platformArg
    ? [platformArg.split('=')[1] as Platform]
    : ['vercel']; // 默认只处理 Vercel

  console.log(`开始解析平台：${platforms.join(', ')}`);

  for (const platform of platforms) {
    try {
      const inputPath = path.join(__dirname, '../raw', `${platform}.md`);
      const outputPath = path.join(__dirname, '../processed', `${platform}.json`);

      if (!fs.existsSync(inputPath)) {
        console.warn(`⚠️  文件不存在：${inputPath}`);
        continue;
      }

      console.log(`\n📖 解析 ${platform}.md...`);
      const apps = parsePlatformMarkdown(inputPath, platform);

      // 创建输出目录
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // 写入 JSON 文件
      fs.writeFileSync(outputPath, JSON.stringify(apps, null, 2), 'utf-8');

      console.log(`✅ ${platform}: 解析完成`);
      console.log(`   - 应用数量: ${apps.length}`);
      console.log(`   - 输出路径: ${outputPath}`);

      // 统计信息
      const months = [...new Set(apps.map(app => app.month))];
      console.log(`   - 月份: ${months.join(', ')}`);
      console.log(`   - 平均访问量: ${Math.round(apps.reduce((sum, app) => sum + app.visits, 0) / apps.length).toLocaleString()}`);
    } catch (error) {
      console.error(`❌ ${platform} 解析失败:`, error);
    }
  }

  console.log('\n🎉 所有平台解析完成！');
}

main();
