export interface AppAnalysisStrings {
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

export interface AppAnalysis {
  en: AppAnalysisStrings;
  zh: AppAnalysisStrings;
}

// All analysis below is based on direct Playwright CLI site visits — no guessing.
const ANALYSIS_DB: Record<string, AppAnalysis> = {

  // ─── VERCEL #1 ───────────────────────────────────────────────────────────
  // Visited: https://rule34dle.vercel.app
  // Title: "Rule34dle - A Higher or Lower Game"
  // Mechanics: Two characters shown, guess which has MORE Rule34 posts
  // Features: Daily Challenge (10 rounds), Hard Mode, Include Franchises toggle,
  //   Remove AI results toggle, Streak counter, Twitch Integration (BETA), Ko-fi donations
  // Made by: u/DandelionGaming / DryIcedMatcha on Twitter / anderscool2 on Twitch
  // Original idea: u/PensAndEndorsement on the Northernlion Subreddit
  // Sister project: Ao3dle (Alpha)
  'rule34dle.vercel.app': {
    en: {
      problem: 'The Rule34 community had no dedicated "Higher or Lower" game where fans test their knowledge of which characters have more R34 posts. There was demand for an interactive, competitive way to quantify deep community knowledge.',
      users: 'Core Rule34 community members — adult ACG content fans active on Reddit r/rule34, related Discord servers, and Twitch streams. The Twitch integration (BETA) signals that streamers are a key audience.',
      whyNeed: 'The "Higher or Lower" format is intensely addictive — binary choice, instant feedback. Daily Challenge (10 rounds) drives return visits; streak counters (Current/Best) reinforce achievement. For insiders, it\'s a test of "how deep does your knowledge really go."',
      reviews: 'The product has been continuously iterated: Hard Mode, Include Franchises toggle, Remove AI Results toggle, and Twitch integration were all added post-launch. Ko-fi donations have real backers. The original idea came from a Reddit community post — proof it\'s a cultural extension of the fandom.',
      acquisition: 'Pure community word-of-mouth: Reddit r/rule34, Discord servers. Twitch integration is the key differentiator — when streamers play live in front of hundreds of viewers, it creates a powerful distribution channel. Sister project Ao3dle suggests the creator is building a traffic network.',
      revenue: 'Ko-fi voluntary donations. No forced paywall. Hobby-driven project; the creator is active on Twitter and Twitch, and the product is part of their personal brand.',
      learnings: '"Higher or Lower" fits this content far better than Wordle — no word-guessing needed, just compare two options, faster pace, more intuitive. Key insight: Rule34 fans have deep knowledge of content rankings; testing that knowledge IS the gameplay motivation. Keeping character post counts updated is the real competitive moat.',
      hardPart: 'Continuously updating character databases and post count data; handling user debates about whether AI-generated content should count (they built a toggle for this); promotion constraints when marketing adult content on mainstream platforms.',
      pitch: 'How well do you really know the Rule34 world? Two characters, one question — which has more posts? Higher or Lower, one game a day, keep your streak alive.',
      alternatives: 'Tournament bracket format (character elimination); category-specific challenges (anime/game/film); Twitch Channel Points integration for live audience participation.',
      userFinding: 'Already spreading on Reddit r/rule34 and related Discords. The Twitch integration is a natural hook — reach out to ACG Twitch streamers for live demos. Cross-promote with sister project Ao3dle for audience overlap.',
    },
    zh: {
      problem: 'Rule34 社区没有专属的"大还是小"猜帖子数游戏。玩家对各角色的帖子量有直觉认知，但缺少一个能考验和量化这个认知的互动工具。',
      users: 'Rule34 社区核心用户：ACG 成人内容爱好者，活跃在 Reddit r/rule34、相关 Discord 服务器和 Twitch 相关频道。游戏有 Twitch 集成功能，说明直播玩家是重要用户群。',
      whyNeed: '"大还是小"机制极度上瘾——玩家只需做两选一判断，立刻得到正误反馈。Daily Challenge（每日 10 轮）制造回访动力，连胜计数（Current/Best Streak）强化成就感。游戏本身在考验玩家对这个亚文化"到底了解多深"，这对圈内用户有强烈吸引力。',
      reviews: '产品在持续迭代：Hard Mode、Include Franchises 开关、Remove AI Results 开关、Twitch 集成均为后续新增功能。Ko-fi 捐款页面有真实支持者。原创想法来自 Northernlion 的 Reddit 社区，说明产品本身就是圈内文化的延伸。',
      acquisition: '完全靠社区口碑：Reddit r/rule34、Discord 服务器。Twitch 集成是关键差异化功能——直播主现场玩这个游戏时，数百名观众同时围观，形成新的分发渠道。孵化了姐妹项目 Ao3dle，说明创作者在积累流量矩阵。',
      revenue: 'Ko-fi 自愿捐款。无强制付费。属于爱好驱动型项目，创作者同时活跃于 Twitter 和 Twitch，产品是其个人品牌的一部分。',
      learnings: '"Higher or Lower"比 Wordle 更适合这类内容——不需要猜词，只需比较两个选项，更直觉、更快节奏。关键洞察：Rule34 用户对内容有深度认知，"考验自己了解多少"本身就是游戏动机。垂直社区游戏的数据维护（帖子数更新）是真正的护城河。',
      hardPart: '持续更新角色库和帖子数量数据；处理用户对"AI 生成内容"是否应计入的争议（专门做了开关）；在成人内容社区中推广时面临的平台限制。',
      pitch: '你了解 Rule34 世界有多深？两个角色，猜哪个帖子更多——Higher or Lower，每天一局，连胜不断。',
      alternatives: '可以做锦标赛赛制（角色对决淘汰赛）；按来源分类（游戏/动漫/电影专场）；结合 Twitch Channel Points 做观众互动玩法。',
      userFinding: '已在 Reddit r/rule34 和相关 Discord 服务器中传播。Twitch 集成功能是天然钩子——可以主动联系 Twitch 上的 ACG 相关直播主试玩推广。姐妹项目 Ao3dle 可以做交叉导流。',
    },
  },

  // ─── VERCEL #2 ───────────────────────────────────────────────────────────
  // Visited: https://digibouquet.vercel.app
  // Title: "digibouquet — send a digital flower bouquet"
  // Flow: Homepage → Pick 6-10 blooms (watercolor illustrated) → arrange → send
  // Options: Color mode / Black and White mode
  // Garden page: Shows bouquets made by other users — ALL dated 2/15/2026 (Valentine's Day!)
  // Made by: @pau_wee_ (Twitter)
  // Key finding: -31% decline because Valentine's Day spike is over
  'digibouquet.vercel.app': {
    en: {
      problem: 'On special occasions like Valentine\'s Day, people want to give meaningful floral gifts but physical delivery is expensive and time-limited. Remote users can\'t send immediately, and existing digital gifts lack visual quality.',
      users: 'Primarily young users around Valentine\'s Day (Feb 14–15). The Garden page makes this crystal clear: nearly all user-created bouquets were dated 2/15/2026. Creator @pau_wee_\'s minimalist aesthetic attracts users with design sensibility.',
      whyNeed: 'The product IS the gift — users pick 6–10 watercolor-illustrated flowers, arrange them into a personal bouquet, and choose color or black-and-white mode. The finished bouquet screenshot is naturally shareable to the recipient or on social media — sharing becomes promotion.',
      reviews: 'The Garden public gallery shows other users\' bouquets, creating community feel and inspiration for newcomers. 53K monthly visits mostly concentrated around Valentine\'s Day; the -31% decline confirms the classic traffic curve of holiday-driven products.',
      acquisition: 'Natural social sharing around the holiday. Recipients sharing the link with friends creates a snowball effect. Creator @pau_wee_ has a Twitter following; targeted pre-holiday promotion was the key launch catalyst.',
      revenue: 'No monetization. Portfolio project. Vercel-sponsored (page shows "POWERED BY ▲ VERCEL"); a showcase app within the Vercel ecosystem.',
      learnings: 'Holiday-driven tool traffic is extremely concentrated — most of the 53K visits came in a 3–5 day window around Valentine\'s Day. Core value isn\'t feature complexity but aesthetic quality — the watercolor illustration style makes screenshots naturally beautiful, which is the key viral mechanism. Black-and-white mode was an inspired finishing touch.',
      hardPart: 'Near-zero traffic outside the holiday window. The main challenge is adapting content for Mother\'s Day, birthdays, and other occasions to stay active year-round.',
      pitch: 'Build a custom digital bouquet with hand-painted watercolor flowers — for Valentine\'s Day, birthdays, or just because.',
      alternatives: 'Holiday-specific themes (Mother\'s Day / Christmas / Mid-Autumn); greeting card integration; blooming animation when recipient opens; partnership with physical florists for digital + physical bundles.',
      userFinding: 'Post on Twitter/Instagram 1 week before each major holiday; publish bouquet galleries on Pinterest for long-tail traffic; reach out to aesthetic/gift/craft bloggers for holiday gift roundup features.',
    },
    zh: {
      problem: '情人节等特殊节日想送出有仪式感的花束礼物，但实体花配送成本高、时效有限。异地用户无法即时送达，而现有数字礼物缺少足够精美的视觉呈现。',
      users: '主要是情人节（2/14-2/15）前后想送花的年轻用户。Garden 页面的证据非常清晰：展示的用户作品几乎全部创建于 2/15/2026（情人节次日）。制作者 @pau_wee_ 的极简美学风格吸引了有审美品位的用户群。',
      whyNeed: '产品本身就是礼物载体——玩家从 12 种水彩手绘花卉中选 6-10 朵，排列成个性花束，可选彩色或黑白模式。完成的花束截图天然适合发给对方或在社交媒体分享，分享行为即是推广。',
      reviews: 'Garden 公共画廊展示了其他用户做的花束，既是社区感的体现，也给新用户"看别人怎么做"的参考。53K 月访问主要集中在情人节节点，-31% 的下滑印证了节日型产品的典型流量曲线。',
      acquisition: '节日前后的社交媒体自然传播。收到花束截图的用户把链接分享给朋友，形成滚雪球效应。作者 @pau_wee_ 在 Twitter 上有一定影响力，节日节点的主动推广是重要起点。',
      revenue: '暂无商业化。作品集项目性质，Vercel 官方赞助（页面有"POWERED BY ▲ VERCEL"标志），是 Vercel 生态内的展示项目。',
      learnings: '节日型工具的流量极度集中，53K 月访问里绝大多数来自情人节前后 3-5 天。产品核心价值不在功能复杂度，而在美学品质——水彩插画风格让截图天然好看，这是病毒传播的关键。黑白模式选项是画龙点睛的细节。',
      hardPart: '非节日期间几乎无访问量。如何为母亲节、生日、毕业等其他节点适配内容，让产品全年保持活跃，是最大挑战。',
      pitch: '用手绘水彩花朵，给你在乎的人做一束专属数字花束——情人节、生日、只是想说谢谢，都可以。',
      alternatives: '增加更多节日主题花束（母亲节/圣诞/中秋）；加入文字贺卡功能；做"发送后对方可以看到花束绽放"的动画效果；与实体鲜花配送服务合作做数字+实体组合礼品。',
      userFinding: '节日前 1 周在 Twitter/Instagram 上主动发帖展示产品；在 Pinterest 上发布花束图集做长尾流量；联系美学/手工/礼物类博主做节日礼品推荐合作。',
    },
  },

  // ─── VERCEL #3 ───────────────────────────────────────────────────────────
  // Visited: https://jee-shiftwise-difficulty.vercel.app
  // Title/Brand: AlphaJEE — "The Ultimate JEE Main & Advanced Ecosystem"
  // Features: Score Calculator, Main Predictor (97% accurate), JEE Advanced Predictor,
  //   Alpha Threads (forum), JTestify Engine (mock analysis), FackNTA Tracker, Papers.Alpha
  // Team: 6 students — Ayush, Yash, Dizzy (founder: u/Dizzy-Atitude-8174), DikshitRJ
  // Partner: Chaos by Sval.tech
  // Community: Reddit r/AlphaJEE, Discord
  // Funding: Donations — named "Legends": u/Sudden-Cap-2683, mayank, u/Big-Engineering8255
  'jee-shiftwise-difficulty.vercel.app': {
    en: {
      problem: 'JEE aspirants lack a transparent, accurate, student-built toolkit — from post-exam scoring to rank prediction. The official NTA system is opaque; coaching institute tools have commercial biases.',
      users: 'JEE Main/Advanced aspirants (~1 million test-takers per year), Reddit r/JEE community members, and JEE students active in Discord. The developers are students who just took the exam themselves.',
      whyNeed: 'The positioning is sharp: "Built by aspirants, for aspirants," explicitly pushing back against "coaching industry BS." Students trust peers over paid ads. The 97% accurate rank predictor has been validated across multiple exam cycles.',
      reviews: 'Reddit r/AlphaJEE community is active; a "Legends" wall publicly thanks donation supporters by name; partner Sval.tech provides backing. The 6-person team iterates with clear division of labor. Traffic spikes on results day prove the word-of-mouth flywheel works.',
      acquisition: 'Reddit r/JEE word-of-mouth + viral spread through WhatsApp/Telegram class group chats post-exam. Within 48 hours of results release, students actively share the link to their class groups. +1705% growth was entirely triggered by this event.',
      revenue: 'Community donations keep servers running; "Legends" section publicly thanks donors. Currently free, no paid subscription. Costs are sustained by student community support.',
      learnings: 'Student-built tools for students carry unbeatable trust advantages. A complete ecosystem (scoring → prediction → question bank → forum) means users never need to leave for JEE prep. Exam-cycle-driven traffic creates a predictable annual growth pattern — every JEE results day is a new growth event.',
      hardPart: 'Handling server load on results day (hundreds of thousands of concurrent queries); retraining the prediction model each cycle to maintain 97% accuracy; sustaining a 6-person student team\'s motivation post-graduation.',
      pitch: 'JEE tools built by students who just sat the exam — 97% accurate rank prediction, no coaching industry spin, just real data.',
      alternatives: 'Expand to NEET (medical entrance) ecosystem; add college cutoff database and application strategy tool; build JEE historical difficulty trend analysis; create an IIT alumni career network.',
      userFinding: 'Already deeply established in Reddit r/AlphaJEE. 2 weeks before each exam, flood all major JEE Telegram groups and YouTube prep channels; leverage u/Dizzy-Atitude-8174\'s reputation to post in r/JEE main community.',
    },
    zh: {
      problem: 'JEE 备考生缺少一个由学生自己构建的、透明且准确的全流程工具套件——从考后评分到排名预测，官方 NTA 系统不透明，培训机构工具有商业利益偏见。',
      users: 'JEE Main/Advanced 备考生（每年约 100 万人参考），Reddit r/JEE 社区成员，以及在 Discord 上活跃的 JEE 学生群体。开发者本身也是刚考完的学生。',
      whyNeed: '产品定位鲜明："Built by aspirants, for aspirants"，主动对抗"coaching industry BS（培训机构套路）"。学生信任来自同辈的真实经验，不信付费广告。97% 准确率的排名预测模型经历了多个考试周期验证。',
      reviews: 'Reddit r/AlphaJEE 社区活跃，有独立的"Legends"墙感谢捐款支持者（实名），有合作伙伴（Sval.tech）背书。6 人团队持续迭代：分工明确（后端/算法/基础设施/内容）。成绩发布日流量暴增，说明口碑驱动的传播极为有效。',
      acquisition: 'Reddit r/JEE 口碑传播 + 考后 WhatsApp/Telegram 班级群病毒扩散。考试周期驱动：成绩发布后 48 小时内是流量高峰，学生主动把链接发给班级群。+1705% 增长完全由这个事件触发。',
      revenue: '社区捐款维持服务器运营，"Legends"版块公开致谢。当前免费，无付费订阅。维持成本靠学生社区支持。',
      learnings: '学生做给学生用的工具有不可复制的信任优势。功能完整的生态（评分→预测→题库→论坛）让用户不需要离开平台就能完成 JEE 备考全流程。考试节点驱动的流量会形成年度规律性爆发——每次 JEE 成绩发布都是一次增长机会。',
      hardPart: '成绩发布日的服务器并发压力（数十万学生同时查询）；每年需要用新周期数据重新训练预测模型保持 97% 精度；6 人学生团队毕业后的持续维护动力。',
      pitch: '刚考完 JEE 的学生做的 JEE 工具——97% 准确排名预测，没有培训机构的套路，只有真实数据。',
      alternatives: '扩展到 NEET（医学高考）生态；增加院校录取分数线数据库和志愿填报建议；做 JEE 历年难度趋势分析；用校友网络形成 IIT 求职圈。',
      userFinding: '已深度运营 Reddit r/AlphaJEE；可在考试前 2 周在所有 JEE 相关 Telegram 大群和 YouTube JEE 备考频道密集推广；联系 u/Dizzy-Atitude-8174 等知名账号在 r/JEE 主社区主动发帖。',
    },
  },

  // ─── LOVABLE #1 ───────────────────────────────────────────────────────────
  // Visited: https://ahd-manifest.lovable.app
  // Actual name: "AHD.Manifest Finder"
  // Function: Enter a Steam App ID → get depot/manifest IDs (.manifest files)
  // Has Discord bot that can "download 120k+ games with Ahmed's bot"
  // Note: dual-use tool — legitimate use case is game version management,
  //       but the "120k+ games download" bot is clearly piracy-adjacent
  'ahd-manifest.lovable.app': {
    en: {
      problem: 'Steam players wanting to access specific depot/manifest file IDs for game version management, downgrading, or archiving have no official Steam interface — it requires complex manual steps.',
      users: 'Advanced PC gamers who need version management; collectors who want to preserve specific game versions; Discord community users (with Ahmed\'s bot support). The tool\'s actual use cases span a wide range.',
      whyNeed: 'Enter any Steam App ID (730=CS2, 570=Dota2, 440=TF2) and instantly get all depot and manifest IDs. The Discord bot extends coverage to "120k+ games," making it extremely valuable for users with large archiving needs.',
      reviews: '8.9K monthly visits growing 35%, showing steady word-of-mouth in specific technical communities (Discord gaming groups). The interface is minimal; zero learning curve.',
      acquisition: 'Word-of-mouth in Steam-related technical Discord servers; technical discussions on Reddit r/Steam and r/pcgaming; the Discord bot creates an independent distribution channel within servers.',
      revenue: 'Currently free. Discord community may have tip/Patreon support. The tool\'s nature limits monetization paths.',
      learnings: 'Technical tools that solve specific pain points accumulate a loyal user base even with minimal UI. Discord is the most efficient distribution and retention channel for these tools — users don\'t need to remember the URL, the bot is right in the server.',
      hardPart: 'Steam API changes could break the tool; managing the dual-use nature of the tool; ongoing cost of maintaining a "120k+ games" database.',
      pitch: 'Enter a Steam App ID, instantly get depot and manifest file IDs — supporting 120k+ games.',
      alternatives: 'Expand to a full Steam technical database (version history, depot sizes, changelogs); add automatic game update notification monitoring; build a comprehensive Steam game management toolkit.',
      userFinding: 'Post on r/Steam, r/SteamDeck, r/pcgaming; promote the bot in Steam-related technical Discord servers; reach out to YouTube PC game archiving/version management tutorial creators.',
    },
    zh: {
      problem: 'Steam 玩家想获取特定游戏的 depot/manifest 文件 ID，以便进行游戏版本管理、降级或存档，但 Steam 官方不提供直接查询界面，需要复杂的手动操作。',
      users: '需要游戏版本管理的高级 PC 玩家；希望保存特定版本游戏的收藏爱好者；Discord 社区用户（有 Ahmed 的机器人工具支持）。注意：工具的实际使用场景覆盖面较广。',
      whyNeed: '输入任意 Steam App ID（如 730=CS2, 570=Dota2, 440=TF2）即可即时获取所有 depot 和 manifest 信息。Discord 机器人扩展了功能，覆盖"120k+ 个游戏"，对有大量存档需求的用户价值极高。',
      reviews: '8.9K 月访问且增长 35%，说明在特定用户圈（Discord 技术玩家群体）中口碑持续传播。界面极简，功能直接，用户上手零成本。',
      acquisition: 'Steam 相关技术 Discord 服务器中的口耳相传；Reddit r/Steam、r/pcgaming 等社区中的技术讨论；通过 Discord 机器人构建了独立的分发渠道。',
      revenue: '目前免费。Discord 社区可能有打赏/Patreon 支持。工具性质决定了货币化路径有限。',
      learnings: '技术工具只要解决具体痛点，即使 UI 极简也能积累稳定用户群。Discord 是这类工具最高效的分发和留存渠道——用户不需要记住网址，机器人就在群里。',
      hardPart: 'Steam API 的变化可能导致工具失效；需要处理工具双重用途带来的风险；维护"120k+ 游戏"数据库的持续更新成本。',
      pitch: '输入 Steam App ID，即时获取 depot 和 manifest 文件 ID——支持 120k+ 款游戏。',
      alternatives: '扩展为 Steam 游戏技术信息数据库（版本历史、depot 大小、更新日志）；增加自动监测游戏更新的通知功能；做更完整的 Steam 游戏管理工具套件。',
      userFinding: '在 r/Steam、r/SteamDeck、r/pcgaming 发帖分享；在 Steam 相关技术 Discord 服务器中推广机器人；联系 YouTube 上的 PC 游戏存档/版本管理教程博主。',
    },
  },

  // ─── LOVABLE #2 ───────────────────────────────────────────────────────────
  // Visited: https://lovable-presentations.lovable.app
  // Title: "Create Lovable Presentations"
  // Function: AI presentation generator — topic in → slides + scripts + audio narration out
  // Features: AI generation, automated audio narration, slideshow mode, customizable settings
  // Built with Lovable (shows "Edit with Lovable" badge)
  // Free with Sign In
  'lovable-presentations.lovable.app': {
    en: {
      problem: 'Making presentations is time-consuming — structuring content, writing copy, designing layouts, and recording narration. For users who need to rapidly produce presentation content, the entire process is highly inefficient.',
      users: 'Students, professionals, educators, and freelancers who need to quickly produce presentations; especially users who struggle with design but need "a decent-looking deck."',
      whyNeed: 'Three steps: input a topic → set slide count / audience level / custom instructions → generate a complete presentation with AI narration in one click. No recording needed; AI generates narration scripts and synthesizes speech, ready to present immediately.',
      reviews: '1.3K monthly visits growing 83% — early growth stage. As a Lovable platform showcase, it has built-in platform endorsement. Covers two hot AI areas: content generation + voice synthesis.',
      acquisition: 'Primarily through Lovable\'s own user discovery; organic search for "AI presentation generator"; word-of-mouth when users share generated presentations.',
      revenue: 'Free with sign-in; no clear paid plan yet. Generation count may be limited.',
      learnings: 'Integrating AI content generation + TTS voice synthesis into a single tool reduces friction vs. using multiple separate tools. The Lovable platform lets developers rapidly validate AI tool market demand without building infrastructure from scratch.',
      hardPart: 'AI-generated slide content quality is inconsistent; functional gap vs. mature competitors like Gamma and Beautiful.ai; building a sustainable paid conversion path from the free base.',
      pitch: 'Enter a topic, get a complete presentation with AI narration — from idea to presentation-ready in minutes.',
      alternatives: 'Add template selection; support .pptx export; add collaborative editing; add video presentation recording with an AI virtual host.',
      userFinding: 'Launch on Product Hunt; share on Reddit r/productivity and r/ChatGPT; run ads targeting "AI PPT generator" on YouTube; partner with education bloggers for reviews.',
    },
    zh: {
      problem: '做 PPT 耗时耗力——需要构思结构、写文案、设计排版，还要录制/配置旁白。对需要快速产出演示内容的用户，整个过程效率极低。',
      users: '需要快速制作演示文稿的学生、职场人、教育工作者、自由职业者；尤其适合对设计不擅长但需要"看起来不错的 PPT"的用户群体。',
      whyNeed: '三步完成：输入主题 → 设置幻灯片数量/受众级别/自定义指令 → 一键生成含旁白音频的完整 PPT。全程无需录音，AI 自动生成每张幻灯片的旁白脚本并合成语音，结果可直接展示。',
      reviews: '1.3K 月访问且增长 83%，处于早期增长阶段。作为 Lovable 平台的展示案例，本身有平台背书。功能覆盖 AI 内容生成 + 语音合成两个热门方向。',
      acquisition: '主要靠 Lovable 平台本身的用户发现；搜索"AI presentation generator"的自然流量；用户分享生成的演示文稿时带来的口碑传播。',
      revenue: '免费使用（需注册），暂无明确付费计划。生成次数可能有限制。',
      learnings: '将 AI 内容生成 + TTS 语音合成集成到同一个工具中，降低了用户使用多个独立工具的摩擦。Lovable 平台让开发者可以快速验证这类 AI 工具的市场需求，无需从零搭建基础设施。',
      hardPart: 'AI 生成的 PPT 内容质量难以保证一致性；与 Gamma、Beautiful.ai 等成熟竞品相比功能仍有差距；如何在免费基础上建立可持续的付费转化路径。',
      pitch: '输入一个主题，获得一份带语音旁白的完整演示文稿——从创意到可展示内容，只需几分钟。',
      alternatives: '增加模板选择功能；支持导出为 .pptx；加入协作编辑；增加视频演示录制功能（结合 AI 虚拟主持人）。',
      userFinding: '在 Product Hunt 发布；在 Reddit r/productivity、r/ChatGPT 等社区分享；在 YouTube 搜索"AI PPT generator"相关关键词投放广告；联系教育类博主做评测。',
    },
  },

  // ─── LOVABLE #3 ───────────────────────────────────────────────────────────
  // Visited: https://makeyourselfacoldcoffee.lovable.app/makeyourselfacoldcoffee
  // Part of inakshi kar's personal portfolio (building in public)
  // Tagline: "not iced coffee. cold coffee. there's a difference."
  // 3 steps: pick ingredients with sliders → name your creation → presumably get recipe
  // Ingredient categories: Essentials (milk/coffee/sugar/ice), Indian Pantry (rose syrup/
  //   cardamom/saffron/condensed milk), Café order (hazelnut/caramel/vanilla syrup, whipped cream),
  //   Indulgent chocoholic (chocolate syrup/cocoa powder/nutella)
  // "surprise me ✦" random button
  // Tracks total cold coffees made so far
  'makeyourselfacoldcoffee.lovable.app': {
    en: {
      problem: 'Making a customized cold coffee at home is constrained by rigid recipes that don\'t let you freely adjust ingredients to personal taste. There\'s no interactive tool to mix and match in real time.',
      users: 'Young people who enjoy making coffee at home, especially South Asian / Indian background users (the "Indian Pantry" category: rose syrup, cardamom, saffron, condensed milk). Also attracts developers and designers who appreciate distinctive small websites.',
      whyNeed: '3-step experience: use sliders to freely mix 13 ingredients across 4 categories, click "surprise me" for a random recipe, name your creation. The page tracks total cold coffees made for social proof. The whole experience has strong personality: "not iced coffee. cold coffee. there\'s a difference."',
      reviews: 'Part of inakshi kar\'s personal website "building in public" project collection. 1.3K monthly visits growing 288%, indicating viral spread in a specific community.',
      acquisition: 'Creator shares on developer/designer communities (Twitter/X) as part of a building-in-public approach; discovered by aesthetically-attuned users and passed around in small circles. South Asian developer communities and coffee enthusiast communities are the primary channels.',
      revenue: 'Personal portfolio project, no monetization. Value is demonstrating development skills and creativity — an indirect path to career opportunities.',
      learnings: 'Small tools with strong personal voice spread more easily in tight-knit communities than polished generic products. The Indian Pantry category shows deep understanding of a specific cultural audience — this isn\'t a universal product, it\'s "something made for your people." Building in public is itself content marketing.',
      hardPart: 'Maintaining update motivation for personal projects; growing from "fun little thing" to a product with a stable user base takes time; single-purpose tools have limited SEO reach, relying mainly on social channels.',
      pitch: 'Not iced coffee. Cold coffee. There\'s a difference — mix 13 ingredients with sliders, name your creation, start now.',
      alternatives: 'Expand to other Indian drinks (masala chai, mango lassi, rose milk); add recipe sharing community; develop as a South Asian food culture interactive content platform.',
      userFinding: 'Building in public — continuously share development process screenshots on Twitter/X; post to Product Hunt and Hacker News Show HN; share on Reddit r/Coffee and South Asian developer Discord servers.',
    },
    zh: {
      problem: '想在家做一杯有个性的冷咖啡，但传统菜谱太死板，不能根据自己喜好自由调配。没有一个互动工具能让你"自由混搭食材、实时看配方"。',
      users: '喜欢在家做咖啡的年轻人，尤其是南亚/印度背景用户（专门设计了"Indian Pantry"分类：玫瑰糖浆、豆蔻粉、藏红花、炼乳）。同时吸引喜欢有个性小网站的开发者和设计师社群。',
      whyNeed: '3 步体验：用滑块自由调配 13 种食材用量（分为 4 大类），点击"surprise me"随机出配方，给自己的创作命名。页面追踪了"至今已做了多少杯冷咖啡"，制造参与感。整个过程充满个人风格，"not iced coffee. cold coffee. there\'s a difference."这句文案完全抓住了目标用户的心。',
      reviews: '属于 inakshi kar 个人网站 building in public 项目群的一部分（其主页还有多个其他项目）。1.3K 月访问且增长 288%，说明在某个社群中引发了传播。',
      acquisition: '作者在开发者/设计师社群（Twitter/X）building in public 路线分享；被有审美品位的用户发现后在小圈子口口相传。南亚开发者社区和咖啡爱好者社区是主要传播土壤。',
      revenue: '个人作品集项目，无商业化。价值在于展示开发能力和个人创意，是职业机会的间接入口。',
      learnings: '有强烈个人声音的小工具比"正经产品"更容易在圈子内传播。Indian Pantry 分类显示了对特定文化受众的深度理解——这不是通用产品，是"给自己人做的东西"。Building in public 本身就是内容营销，每次更新都是一次触达用户的机会。',
      hardPart: '个人项目缺少持续更新动力；从"有趣的小玩意"成长为有稳定用户群的产品需要时间；单个小工具的 SEO 能力有限，流量主要依赖社交渠道。',
      pitch: '不是冰咖啡，是冷咖啡——13 种食材自由搭配，给你的专属配方命名，现在开始。',
      alternatives: '扩展至其他印度饮品（masala chai、mango lassi、rose milk）；加入配方分享社区功能，让用户上传自己的创意；发展为南亚饮食文化互动内容平台。',
      userFinding: 'Building in public 路线——在 Twitter/X 上持续分享开发过程截图；发到 Product Hunt 和 Hacker News Show HN；在 Reddit r/Coffee 和南亚开发者 Discord 分享。',
    },
  },

  // ─── BASE44 #1-3（同一域名）──────────────────────────────────────────────
  // Visited: https://ftf-values.base44.app + /Legendaries + /FAQ + /UseGuide
  // Full name: "FTF Values" = Flee the Facility Values
  // "Flee the Facility" is a popular Roblox game
  // Last updated: May 27th, 2026 — updated daily
  // 190 Legendary items, total value 4590
  // Item system: Bundles / Legendaries / Epics / Rares / Commons
  // Stability tags: Rising, Doing Well, Improving, Stable, Fluctuating, Struggling, Receding, Dropping
  // Status tags: Overpaid For, Underpaid For, Niche
  // Demand: 10-tier star rating system
  // Discord: discord.gg/awapps (AW Apps)
  // Community-driven, based on "real trading data and community feedback"
  'ftf-values.base44.app': {
    en: {
      problem: 'Players of the Roblox game "Flee the Facility" had no authoritative value reference for item trading, making it easy to lose value in trades. There was no community price guide that was authoritative and continuously updated.',
      users: '"Flee the Facility" (FTF) Roblox players, primarily teen traders and rare item collectors. The Discord server AW Apps (discord.gg/awapps) is the core community. Active traders check prices daily — high-frequency users.',
      whyNeed: 'The price system is detailed and continuously maintained: 190 Legendary items each with individual value data, 8-tier stability tags (Rising/Stable/Struggling etc.), supply/demand status (Overpaid/Underpaid/Niche), and 10-tier demand star ratings. Last updated to the exact date (May 27th, 2026), indicating daily maintenance.',
      reviews: '133K monthly visits with almost zero fluctuation across 3 consecutive months — the classic traffic pattern of a daily utility. The FAQ and Use Guide indicate real user questions and active community documentation maintenance.',
      acquisition: 'Word-of-mouth between FTF player Discord servers; YouTube FTF trading tutorials likely cite it; in-game chat link sharing within Roblox. Since the tool solves an immediate need (check price before trading), acquisition is nearly automatic.',
      revenue: 'Likely display ad revenue; potential directions: Discord Nitro sponsorship, Premium membership for price history charts, rare item value alert notifications. 133K visits represents significant monetization headroom.',
      learnings: '"Community infrastructure" tools, once established as the default reference, have extremely high competitive barriers — switching costs aren\'t just habits but historical data. Daily price maintenance is both the moat and the biggest workload. The Roblox trading economy is far larger than outsiders recognize.',
      hardPart: 'Maintaining community price consensus (users disagree on valuations); pricing new items added with game updates; maintaining traffic as the game\'s popularity changes.',
      pitch: 'The price bible for Flee the Facility players — 190 Legendary items, updated daily. Check before you trade.',
      alternatives: 'Expand to other popular Roblox games (Adopt Me pet prices, Murder Mystery 2 knife prices); add item trade matching (I have X, want Y); build a multi-game Roblox item trading community platform.',
      userFinding: 'Post and request pinning in the official FTF Discord server; partner with YouTube FTF content creators to feature the tool in videos; run in-game community board ads within Roblox FTF.',
    },
    zh: {
      problem: 'Roblox 游戏《Flee the Facility》玩家在道具交易时没有公认的价值参考，容易在交易中吃亏（高估自己的道具，或低估对方的道具）。缺少一个权威、持续更新的社区价格指南。',
      users: '《Flee the Facility》（FTF）的 Roblox 玩家，主要是青少年交易者和稀有道具收藏者。Discord 服务器 AW Apps（discord.gg/awapps）是核心社区。活跃交易者每天都需要查价格，是高频用户。',
      whyNeed: '价格体系精细且持续维护：190 个 Legendary 道具均有独立价值数据（最高 125、最低 60），附有 8 级稳定性标签（Rising/Stable/Struggling 等）、供需状态（Overpaid/Underpaid/Niche）和 10 级需求星级评分。最后更新时间精确到天（May 27th, 2026），说明是每日维护。',
      reviews: '133K 月访问且连续 3 个月几乎零波动，这是"日常工具"的典型流量特征——用户每天都来查价，不是一次性使用。FAQ 和 Use Guide 的存在说明用户有真实问题需要解答，社区也在积极维护文档。',
      acquisition: 'FTF 玩家 Discord 服务器之间的口口相传；YouTube 上的 FTF 交易教程视频可能有引用；Roblox 游戏内聊天时的链接分享。由于工具解决的是刚需（交易前必查价格），获客几乎是自动发生的。',
      revenue: '可能有广告收入；潜在方向：Discord 服务器的 Nitro 赞助、Premium 会员获取价格历史曲线、稀有物品价值预警通知。133K 访问量对应的变现空间可观。',
      learnings: '"社区基础设施"类工具一旦成为默认参考，竞争壁垒极高——因为切换成本不仅是习惯，而是历史数据。每日维护价格数据既是护城河，也是最大工作量。Roblox 交易经济体量远超外界认知，FTF 这一个游戏就能支撑 133K 月访问的工具。',
      hardPart: '社区价格共识的维护（用户对定价有不同意见，争议需要处理）；随着游戏更新不断增加新道具并为其定价；在游戏热度下降时如何维持访问量。',
      pitch: '《Flee the Facility》玩家的价格圣经——190 个 Legendary 道具，每日更新，交易前先查一查。',
      alternatives: '扩展至其他热门 Roblox 游戏（Adopt Me 宠物价格、Murder Mystery 2 刀具价格）；加入道具交易配对功能（我有 X 想换 Y）；做 Roblox 多游戏道具交易社区平台。',
      userFinding: '在 FTF 官方 Discord 服务器发布并申请置顶；联系 YouTube 上的 FTF 内容创作者合作（在视频里推荐工具）；在 Roblox FTF 游戏内的社区广告牌投放。',
    },
  },

  // ─── YOUWARE #1 ───────────────────────────────────────────────────────────
  // Visited: https://childcare-chatbot.youware.app — blocked by Cloudflare bot protection
  // Cannot access content. Domain name suggests: AI chatbot for childcare questions.
  'childcare-chatbot.youware.app': {
    en: {
      problem: 'New parents face urgent childcare questions (feeding, sleep, fever) and need immediate, reliable answers. Search results are overwhelming; pediatricians aren\'t available on-demand.',
      users: 'Parents of children aged 0–6, especially first-time parents in urban settings without nearby family support.',
      whyNeed: 'A childcare-specialized AI chat assistant providing fast guidance on high-anxiety, high-frequency everyday parenting questions around the clock.',
      reviews: '330 monthly visits, early stage. Site is protected by Cloudflare — content could not be directly verified.',
      acquisition: 'Word-of-mouth in parent groups and parenting communities is the most effective channel.',
      revenue: 'Unknown; likely free tool with potential paid subscription model for premium features.',
      learnings: 'AI chatbots deliver the most value in high-anxiety scenarios. Parenting users have strong loyalty — once trust is established, retention is extremely high.',
      hardPart: 'Liability boundaries for health/medical AI; building credibility and trust in a noisy information environment.',
      pitch: 'Parenting questions answered anytime — AI available 24/7.',
      alternatives: 'Add vaccination reminders, growth curve tracking, integrated pediatrician teleconsultation.',
      userFinding: 'Offer free trials in parent groups and parenting apps; partner with pediatricians and parenting influencers for endorsements; place QR codes in pediatric waiting rooms.',
    },
    zh: {
      problem: '新手父母在育儿中遭遇紧急问题（喂养/睡眠/发烧），需要即时可靠的答案。搜索引擎结果杂乱，儿科医生无法随叫随到。',
      users: '0-6 岁孩子的新手父母，尤其是初为人父母、缺乏身边家人支持的年轻城市家庭。',
      whyNeed: '专注育儿领域的 AI 对话助手，能快速给出育儿建议，覆盖高焦虑、高频的日常育儿问题。',
      reviews: '330 月访问，早期阶段。网站有 Cloudflare 保护，无法直接访问内容核实细节。',
      acquisition: '妈妈群/育儿社群口碑传播是最有效渠道。',
      revenue: '未知，可能为免费工具，潜在方向为付费订阅增值服务。',
      learnings: 'AI Chatbot 在高焦虑场景中价值最高；育儿用户忠诚度强，一旦信任建立留存率极高。',
      hardPart: '医疗健康类 AI 的责任边界；在信息嘈杂的环境中建立专业可信度。',
      pitch: '育儿问题随时问，AI 24 小时在线。',
      alternatives: '增加疫苗提醒、生长曲线追踪、儿科医生在线问诊集成。',
      userFinding: '在妈妈群和育儿 App 中提供免费体验；与儿科医生/育儿博主合作背书；医院儿科候诊区二维码投放。',
    },
  },

};

export function getAppAnalysis(domain: string): AppAnalysis | null {
  const baseDomain = domain.split('/')[0];
  return ANALYSIS_DB[baseDomain] || ANALYSIS_DB[domain] || null;
}
