export const t = {
  en: {
    // Header
    tagline: 'Discover trending Vibe Coding apps',
    allApps: 'All Apps',
    top10Charts: '🏆 Top 10 Charts',
    searchPlaceholder: 'Search by name, domain, or URL...',
    appsFound: (n: number) => `${n} apps`,

    // Filters
    platform: 'Platform:',
    time: 'Time:',
    sortBy: 'Sort by:',
    allMonths: 'All Months',
    sortRank: 'Rank',
    sortVisits: 'Most Visits',
    sortGrowth: 'Highest Growth',
    sortKeywords: 'Most Keywords',

    // Top 10
    top10Platform: 'Platform:',
    top10Title: (platform: string, month: string) => `${platform} Top 10 · ${month}`,
    colRank: 'Rank',
    colApp: 'App',
    colVisits: 'Monthly Visits',
    colGrowth: 'Growth',
    colKeywords: 'Keywords',
    colDetail: 'Detail',
    detail: 'Detail →',

    // Empty state
    noAppsFound: 'No apps found',
    adjustFilters: 'Try adjusting your search or filters',

    // Footer
    footer: 'Built with ❤️ using Claude Code · Data from public traffic analytics',

    // Detail page
    backToAll: '← Back to all apps',
    visitLiveApp: 'Visit Live App',
    monthlyVisits: 'Monthly Visits',
    growthRate: 'Growth Rate',
    vsPrevMonth: 'vs. previous month',
    seoKeywords: 'SEO Keywords',
    trackedKeywords: 'tracked keywords',
    whyPopular: 'Why This App is Popular',
    performanceHistory: 'Performance History',
    platformLabel: 'Platform',
    period: 'Period',
    rank: 'Rank',
    visits: 'Visits',
    change: 'Change',

    // Analysis
    deepAnalysis: '🔬 Deep Product Analysis',
    analysisLabels: {
      problem: '💡 Problem it solves',
      users: '👤 Who are the users?',
      whyNeed: '🤔 Why do users need it?',
      reviews: '🗣️ How do users talk about it?',
      acquisition: '🔍 How does it find users?',
      revenue: '💰 Does it make money?',
      learnings: '🧠 What can we learn from it?',
      hardPart: '⛰️ What\'s hard to replicate?',
      pitch: '🎯 One-line pitch',
      alternatives: '💡 Alternative approaches',
      userFinding: '🧭 How to find first users',
    },
  },

  zh: {
    // Header
    tagline: '发现热门 Vibe Coding 应用',
    allApps: '所有应用',
    top10Charts: '🏆 Top 10 榜单',
    searchPlaceholder: '按名称、域名或 URL 搜索...',
    appsFound: (n: number) => `${n} 个应用`,

    // Filters
    platform: '平台：',
    time: '时间：',
    sortBy: '排序：',
    allMonths: '所有月份',
    sortRank: '排名',
    sortVisits: '访问量最高',
    sortGrowth: '增长最快',
    sortKeywords: '关键词最多',

    // Top 10
    top10Platform: '平台：',
    top10Title: (platform: string, month: string) => `${platform} Top 10 · ${month}`,
    colRank: '排名',
    colApp: '应用',
    colVisits: '月访问量',
    colGrowth: '增长',
    colKeywords: '关键词',
    colDetail: '详情',
    detail: '详情 →',

    // Empty state
    noAppsFound: '未找到应用',
    adjustFilters: '尝试调整搜索或筛选条件',

    // Footer
    footer: '由 Claude Code 构建 · 数据来自公开流量分析',

    // Detail page
    backToAll: '← 返回全部应用',
    visitLiveApp: '访问应用',
    monthlyVisits: '月访问量',
    growthRate: '增长率',
    vsPrevMonth: '较上月',
    seoKeywords: 'SEO 关键词',
    trackedKeywords: '个关键词',
    whyPopular: '为什么这个应用受欢迎',
    performanceHistory: '历史表现',
    platformLabel: '平台',
    period: '时间段',
    rank: '排名',
    visits: '访问量',
    change: '变化',

    // Analysis
    deepAnalysis: '🔬 深度产品分析',
    analysisLabels: {
      problem: '💡 解决什么问题？',
      users: '👤 用户是谁？',
      whyNeed: '🤔 用户为什么需要它？',
      reviews: '🗣️ 用户是如何评价它的？',
      acquisition: '🔍 它是如何找到用户的？',
      revenue: '💰 它赚钱吗？多少？',
      learnings: '🧠 我从这个产品身上学到了什么？',
      hardPart: '⛰️ 什么做法不容易复制？',
      pitch: '🎯 一句话推销',
      alternatives: '💡 不同的方法',
      userFinding: '🧭 如何找到第一批用户',
    },
  },
} as const;

export type Translations = typeof t.en;
