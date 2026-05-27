export interface AppAnalysis {
  problem: string;
  users: string;
  whyNeed: string;
  reviews: string;
  acquisition: string;
  revenue: string;
  learnings: string;
  hardPart: string;
  pitch: string;
  alternatives: string;
  userFinding: string;
}

const ANALYSIS_DB: Record<string, AppAnalysis> = {
  'rule34dle.vercel.app': {
    problem: 'Rule34 社区缺少专属的"大还是小"猜谜游戏——玩家想靠对角色的了解来猜"哪个角色的 Rule34 帖子更多"，但市面上没有这个。',
    users: 'Rule34 网站的核心用户、ACG 文化爱好者、熟悉各种动漫/游戏角色的玩家，尤其活跃在 Reddit r/rule34 和相关 Discord 服务器上。',
    whyNeed: '"大还是小"（Higher or Lower）是极度上瘾的简单机制——考验的是玩家对这个亚文化的知识储量。每日挑战模式（Daily Challenge）制造持续回访动力，连胜纪录（Streak）强化成就感。',
    reviews: '应用内有 Daily Challenge、Hard Mode、Twitch 直播集成、连胜统计，说明开发者在持续迭代。Ko-fi 捐款页面存在，说明有用户愿意主动支持。同时还孵化了姐妹项目 Ao3dle。',
    acquisition: '完全靠社区口碑：Reddit r/rule34、相关 Discord 服务器。Twitch 集成功能是重要传播途径——直播主用它直播游戏，观众跟着玩，形成新的获客渠道。',
    revenue: 'Ko-fi 自愿捐款为主，无强制付费墙。属于热情驱动型项目，货币化不是优先项。',
    learnings: '"大还是小"机制比 Wordle 更适合某些内容——只需要比较两个选项，不需要猜词，更适合图片/数字类内容。垂直社区游戏的核心壁垒在于数据维护，而非技术。',
    hardPart: '持续更新角色库和帖子数量数据；平衡题目难度（太简单没意思，太难玩家流失）；在成人内容社区推广时如何获得平台曝光。',
    pitch: '你了解 Rule34 世界有多深？猜一猜哪个角色的帖子更多——这是专为这个社区打造的"大还是小"终极考验。',
    alternatives: '可做每日固定题（已有 Daily Challenge）、赛季锦标赛、派系对决投票；也可以把这个机制复制到其他亚文化（FurryAffinity 帖子数、AO3 同人文数量等）。',
    userFinding: '直接在 Rule34.xxx 论坛发帖；联系 Reddit r/rule34 版主做置顶推广；找 Twitch 成人内容相关频道主播合作（Twitch 集成功能是天然钩子）；在 Discord FTF 类服务器主动推广。',
  },
  'jee-shiftwise-difficulty.vercel.app': {
    problem: 'JEE 备考生缺乏由学生自己构建的、不带"培训机构利益"的可信分数计算器、排名预测器和备考生态工具。官方 NTA 系统不透明，市面工具要么收费要么不准确。',
    users: 'JEE Main/Advanced 考生（每年约 100 万人）、备考学生、家长，以及关注 JEE 的 Reddit r/JEE 社区成员。开发团队本身就是刚考过的学生。',
    whyNeed: '学生信任"刚经历过的学长"，不信"培训机构营销话术"。AlphaJEE 宣称 97% 准确率的 AI 排名预测模型，并号称"no coaching industry BS"——这种反建制定位在学生群体中极有共鸣。',
    reviews: '有独立 Reddit 社区 r/AlphaJEE、Discord 服务器，社区在活跃维护。平台有"Legends"页面感谢顶级贡献者和赞助者（按名字列出），构建了强烈的归属感。',
    acquisition: '靠 Reddit（r/JEE、r/alphaJEE）和 Discord 的口碑传播；在考试关键节点（成绩公布日）流量暴增；6 人学生开发团队本身就是种子用户社区。',
    revenue: '依靠社区捐款维持服务器运营，"Legends"板块点名致谢顶级捐款人。当前无订阅收费，是典型的学生自发公益项目。',
    learnings: '学生做给学生用的工具有天然信任优势；功能完整度（分数计算→主线排名→Advanced 排名→题库→论坛）让用户不需要离开就能完成全流程；考试节点驱动的流量会形成年度规律性爆发。',
    hardPart: '考试成绩发布日的并发高峰（数百万人同时查询）对服务器稳定性要求极高；需要每年更新预测模型以保持精度；团队全是学生，持续维护有精力瓶颈。',
    pitch: '印度学生自己做的 JEE 工具，97% 准确排名预测——没有培训机构的套路，只有真实数据。',
    alternatives: '可扩展至 NEET（医学高考）生态；增加院校录取分数线数据库；做 JEE 历年真题 AI 解析；毕业后帮助校友网络形成 IIT 求职圈。',
    userFinding: '已经在 Reddit r/JEE 深度运营；可在考试前 2 周在 WhatsApp 学生群、Telegram 培训班群内密集推广；联系 YouTube JEE 备考频道博主做评测合作。',
  },
  'digibouquet.vercel.app': {
    problem: '想送花但没有实体配送条件（异地、费用高、送完就谢）——缺少一个有美感、即时送达的数字花束工具。',
    users: '想在特殊时刻送出有仪式感礼物的年轻用户；设计/美学爱好者；喜欢分享视觉内容的社交媒体用户。作者 @pau_wee_ 风格极简，吸引有审美品位的受众。',
    whyNeed: '产品本身就是内容——极简黑白美学让花束截图天然适合 Instagram/Twitter 分享；"Build in black and white"选项更是为美学社区定制的功能。',
    reviews: '内容本身即传播载体——用户分享自己做的花束截图等于帮产品做广告。53K 月访问且有明显波动，说明在节日节点（情人节、母亲节）有流量峰值。',
    acquisition: '视觉内容社区的自然传播（Twitter、Instagram、Pinterest）；节假日搜索流量；作者 @pau_wee_ 自身的社交媒体影响力。',
    revenue: '目前看起来是免费公益项目，暂无明显变现。潜力在于限量主题包付费解锁、品牌定制花束（企业送礼场景）。',
    learnings: '极简美学产品的传播成本极低——产品本身的截图就是广告素材；"Build in black and white"这一个选项就让产品的艺术感提升了一个档次，吸引了特定用户群。',
    hardPart: '非节假日如何维持访问量；如何在"一次性体验"工具上建立回访和留存；以及在众多数字礼物工具中保持视觉差异化。',
    pitch: '美丽的数字花束，即时送达——用像素表达心意，永不凋谢。',
    alternatives: '可做节气/节日专属主题（春节、中秋）；加入动态花束（CSS 动画）；做"花束 + 音乐"的组合礼物体验；B2B 方向服务企业节日问候需求。',
    userFinding: '在 Pinterest、Instagram 上发布花束作品集吸引设计爱好者；联系情感类/美学类博主做内容合作；在情人节前 2 周通过 Product Hunt 等平台发布。',
  },
  'ftf-values.base44.app': {
    problem: 'Roblox 游戏《Flee the Facility》玩家在道具交易时缺少公认的价值参考——没有权威的物品价格指南，玩家容易在交易中被坑。',
    users: '《Flee the Facility》（FTF）的 Roblox 玩家，主要是 8-18 岁的青少年；活跃交易者；收藏稀有道具（Legendaries、Epics）的玩家。',
    whyNeed: 'Roblox 游戏的虚拟道具交易生态极度活跃，但价格完全由社区决定，没有官方定价。一个权威的价值指南能防止玩家在交易中被欺骗，是社区的基础设施。',
    reviews: '133K 月访问且稳定，说明已经成为 FTF 社区的默认参考工具。有完整分类（Legendaries、Epics、Rares、Commons）和 Bundles，说明内容覆盖全面，社区信任度高。',
    acquisition: 'Roblox FTF 相关 Discord 服务器的传播；玩家在游戏内交流时互相分享；YouTube FTF 相关教程视频可能有提及。',
    revenue: '可能有广告收入；潜在方向：高级会员获取价格历史曲线、稀有物品预警通知、卖家认证服务。',
    learnings: '服务特定游戏社区的工具型网站可以获得极稳定的流量——只要游戏还在运营，这个工具就有存在价值；内容维护（价格更新）是核心护城河，也是最大工作量。',
    hardPart: '社区价格共识的维护——玩家对物品价值有不同意见，定价太高或太低都会引发争议；以及随着游戏更新不断增加新物品、更新价格的持续运营成本。',
    pitch: '《Flee the Facility》玩家的价格圣经——交易前先查一查，确保你的物品物有所值。',
    alternatives: '可扩展至其他热门 Roblox 游戏的价值指南（Adopt Me、Murder Mystery 2 等）；加入交易配对功能（我有什么、我想要什么）；做 Roblox 多游戏道具交易平台。',
    userFinding: '直接在 FTF 官方 Discord 服务器发布并申请置顶；联系 YouTube FTF 内容创作者合作；在 Roblox 游戏内的聊天区宣传（需遵守平台规则）。',
  },
  'ahd-manifest.lovable.app': {
    problem: 'Steam 游戏玩家有时需要获取特定游戏版本的 depot/manifest 文件 ID，以便进行游戏降级、备份或特定版本管理，但官方 Steam 不提供直接查询界面。',
    users: '需要游戏版本管理的高级 PC 玩家、游戏存档/收藏爱好者、需要特定版本用于服务器搭建或兼容性测试的玩家。关联 Discord 社区有大量活跃用户。',
    whyNeed: '输入 Steam App ID 即可即时获取 depot/manifest ID 列表，简化了需要手动查找的技术流程。Discord 社区的机器人功能进一步扩展了使用场景。',
    reviews: '8.9K 月访问且增长 35%，Discord 社区活跃，说明在特定用户群中口碑良好。注意：该工具具有双重用途性，使用场景可能涵盖合法的游戏版本管理。',
    acquisition: '在 Steam 相关 Reddit 社区（r/Steam、r/pcgaming）和 Discord 服务器中传播；口耳相传于有技术需求的玩家群体。',
    revenue: '目前看起来是免费工具；Discord 社区可能有 Patreon/捐款支持机制。',
    learnings: '技术工具只要解决具体痛点，即使 UI 极简也能积累稳定用户；Discord 社区是这类工具最重要的分发和支持渠道。',
    hardPart: '工具的使用边界需要谨慎处理；Steam API 变化可能导致工具失效；维护服务稳定性和避免滥用是核心挑战。',
    pitch: '输入 Steam App ID，即时获取所有 depot/manifest 信息。',
    alternatives: '可扩展为游戏版本历史数据库；加入自动检测 Steam 更新并通知的功能；做更完整的 Steam 游戏技术信息查询平台。',
    userFinding: '在 r/Steam、r/SteamDeck、r/pcgaming 等 Reddit 社区分享；在 Steam 技术 Discord 服务器中推广；针对有版本管理需求的游戏服务器社区定向推广。',
  },
  'makeyourselfacoldcoffee.lovable.app': {
    problem: '想在家做一杯有个性的冷咖啡，但不知道怎么搭配食材——既不是教程视频，也不是菜谱书，而是缺少一个有趣的互动配方工具。',
    users: '喜欢在家做咖啡的年轻人（尤其是南亚/印度背景用户，项目有专门的"Indian Pantry"食材分类）；对个人项目/创意网站感兴趣的开发者和设计师。',
    whyNeed: '互动式配方工具比静态菜谱更有趣——用滑块调整每种食材的用量，有"surprise me"随机功能，完成后能给你的创作命名，整个过程是一次有参与感的体验。',
    reviews: '这是开发者 inakshi kar 个人网站的一个子项目，定位是"building in public"的一部分。产品有明显的个人风格和细节用心（如"not iced coffee. cold coffee. there\'s a difference."这样的文案）。',
    acquisition: '作者的个人网站流量导入；在开发者社区（Twitter/X、Indie Hackers）分享 building in public 进展；口碑传播于对"有趣小项目"感兴趣的社群。',
    revenue: '个人作品集项目，无直接变现。价值在于展示开发能力和创意，间接为职业机会服务。',
    learnings: '有个性的小工具比功能全面的"正经产品"更容易传播——"not iced coffee. cold coffee. there\'s a difference." 这句文案比任何功能介绍都更有记忆点；building in public 是极低成本的内容营销策略。',
    hardPart: '把个人项目从"有趣的小玩意"变成有持续用户的产品；在 1.3K 月访问的基础上如何进一步增长；保持个人风格和产品实用性之间的平衡。',
    pitch: '不是冰咖啡，是冷咖啡——来自印度厨房的食材，搭配出你专属的那一杯。',
    alternatives: '可扩展至其他饮品（masala chai、lassi 等）；做"配方分享社区"让用户上传自己的创意；或发展为南亚饮食文化的互动内容平台。',
    userFinding: 'Building in public 路线——在 Twitter/X 上持续分享开发过程；发到 Product Hunt、Hacker News、Indie Hackers；在咖啡爱好者社群（Reddit r/Coffee）和南亚开发者社区分享。',
  },
  'childcare-chatbot.youware.app': {
    problem: '新手父母在育儿过程中经常遭遇紧急问题（喂养、睡眠、发烧处理），可靠且即时的答案难以获取——搜索引擎结果杂乱，儿科医生无法随叫随到。',
    users: '0-6 岁孩子的新手父母，尤其是初为人父母、缺乏身边家人支持网络的 25-40 岁城市家庭；以及专业育儿工作者（保育员、早教老师）。',
    whyNeed: '凌晨三点宝宝发烧时，去医院太折腾，搜索引擎太杂乱。一个专注育儿领域的 AI 对话助手能即时给出基于循证的靠谱建议，大幅降低父母焦虑。',
    reviews: '330 月访问仍处于早期阶段，但育儿领域用户忠诚度极高——一旦信任建立，父母会反复使用并强烈推荐给同类群体（妈妈群口碑传播效率极高）。',
    acquisition: '主要靠妈妈群/育儿社群的真实推荐；新手父母最信任"跟我同处境的人的推荐"。',
    revenue: '付费订阅（$5-15/月）提供个性化儿童发育追踪、疫苗提醒等增值服务；或与母婴品牌合作内容营销。',
    learnings: 'AI Chatbot 在高焦虑、高频问题场景中价值最高；育儿是用户愿意为"准确且即时"的信息付费的领域；早期用户获取慢，但留存率极高。',
    hardPart: '医疗健康类 AI 产品的责任边界处理（必须清晰声明"不替代医生建议"，否则面临法律风险）；以及在信息爆炸的环境中建立足够的专业可信度。',
    pitch: '育儿问题随时问，AI 24小时陪你带娃——比搜索引擎更专注，比等候室更快给你答案。',
    alternatives: '可扩展为疫苗打卡提醒、生长曲线追踪（与 WHO 标准对比）、儿科医生在线问诊集成，打造完整的 AI 育儿助手平台。',
    userFinding: '在各大妈妈群（宝宝树、妈妈圈）中提供免费体验；与儿科医生/育儿博主合作背书；在医院儿科候诊区投放二维码海报；加入 BabyCenter、What to Expect 等国际育儿社区。',
  },
};

export function getAppAnalysis(domain: string): AppAnalysis | null {
  const baseDomain = domain.split('/')[0];
  return ANALYSIS_DB[baseDomain] || ANALYSIS_DB[domain] || null;
}
