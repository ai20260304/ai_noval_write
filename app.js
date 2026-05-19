const state = {
  activeProjectId: "apocalypse",
  activeChapterId: 126,
  activeChapterFilter: "todo",
  pendingImportProjectId: null,
  loadedStateUpdatedAt: null,
  projects: [
    {
      id: "apocalypse",
      title: "重生 2040：无敌堡垒",
      genre: "末世爽文",
      totalChapters: 2000,
      chapterTargetWords: 2200,
      logline: "主角重生到末世爆发后，用未来情报夺取旧时代节点，建立无敌堡垒。",
      currentChapter: 126,
      words: 312000,
      outlineParsed: 382,
      styleStatus: "已训练",
      styleConfidence: 91,
      averageScore: 86,
      health: { outline: 84, character: 72, style: 91, audit: 68 },
      volumes: [
        { title: "第一卷 寒潮前夜", range: "001-150", goal: "重生、夺回旧仓、建立第一批物资节点", progress: 84 },
        { title: "第二卷 堡垒成形", range: "151-320", goal: "扩建核心基地，收拢技术和医疗队", progress: 47 },
        { title: "第三卷 城市清算", range: "321-520", goal: "清理旧势力，公开新秩序", progress: 18 },
      ],
      outlineRows: [
        { chapter: "124", target: "补给短缺冲突", event: "队伍内部要求撤退", clue: "秦砚缺席需解释", status: "待修" },
        { chapter: "125", target: "冷库前夜部署", event: "许南枝主动请求前排", clue: "旧供电线再提一次", status: "完成" },
        { chapter: "126", target: "夺回旧城冷库", event: "主角碾压敌方小队", clue: "地下二层异常供电", status: "写作中" },
        { chapter: "127", target: "暴雪运输线", event: "秦砚补回军火线", clue: "解释 121-126 缺席", status: "待写" },
        { chapter: "128", target: "内鬼第一次误导", event: "周序递出假坐标", clue: "误导造成代价", status: "待写" },
      ],
      clues: [
        { name: "A17 黑匣子", detail: "埋：第 12、45、93 章；收：第 188 章。" },
        { name: "冷库供电", detail: "埋：第 18 章；需在第 126 章重新出现。" },
        { name: "周序假坐标", detail: "埋：第 88、111 章；第 128 章触发误导。" },
      ],
      characters: [
        { name: "林澈", role: "男主 / 重生者 / 堡垒核心", first: "001", plan: "001-2000", actual: "001-126", risk: "低", relation: "掌控主线，已收拢第一批追随者", next: "第 126 章公开压住旧城敌队" },
        { name: "许南枝", role: "女主线 / 医疗与侦查", first: "008", plan: "008-150, 190-260", actual: "008-122, 125", risk: "中", relation: "信任建立，等待一次主动补位", next: "第 126 章主动救下侧翼队员" },
        { name: "秦砚", role: "军火线盟友", first: "036", plan: "118-132", actual: "118-120", risk: "高", relation: "合作未稳，缺席原因不足", next: "第 127 章用通讯补回行动轨迹" },
        { name: "周序", role: "前期反派 / 情报误导", first: "021", plan: "088-140", actual: "088, 101, 111", risk: "中", relation: "表面合作，暗中递假坐标", next: "第 128 章触发第一次误导结果" },
      ],
      chapters: [
        {
          id: 124,
          title: "补给短缺冲突",
          status: "待修",
          progress: 70,
          score: 74,
          outline: "队伍要求撤退，主角用结果压住争议。",
          roles: ["林澈", "姜晚", "陈烈"],
          clues: ["补给数量必须与第 119 章一致", "秦砚缺席需要一句解释"],
          manuscript: "补给箱被打开时，里面只剩下半箱压缩饼干。\n\n有人当场变了脸。",
          scoreDetail: { plot: 78, character: 72, style: 76, hook: 70 },
        },
        {
          id: 126,
          title: "旧城冷库夺回",
          status: "写作中",
          progress: 86,
          score: null,
          outline: "夺回旧城冷库，确认地下二层供电异常。主角公开压住敌方小队，许南枝第一次主动补位。",
          roles: ["林澈", "许南枝", "陈烈"],
          clues: ["回收第 18 章冷库供电", "提到 A17 但不解释", "周序的坐标要露出一点不对"],
          manuscript: "寒风从旧城高架下灌进来，卷着雪粒打在车窗上。\n\n林澈没有让车队停。\n\n他看着导航上闪烁的冷库坐标，语气很稳：“所有人检查弹匣，三分钟后下车。这里不只是物资点，地下二层还有一条旧供电线。”\n\n许南枝抬头看他。\n\n这句话，和她昨晚在残破电表上看到的数字对上了。",
          scoreDetail: null,
        },
        {
          id: 127,
          title: "暴雪运输线",
          status: "待写",
          progress: 12,
          score: null,
          outline: "暴雪中转运冷库物资，秦砚用通讯补回军火线。",
          roles: ["林澈", "秦砚", "姜晚"],
          clues: ["解释秦砚 121-126 缺席", "运输线给第 151 章堡垒扩建铺路"],
          manuscript: "",
          scoreDetail: null,
        },
      ],
      styleProfile: [
        { label: "句长", value: "短句为主，平均 17 字" },
        { label: "节奏", value: "危机快起快收，每章 2 个明确转折" },
        { label: "对话", value: "占比 28%，偏直给和压迫感" },
        { label: "爽点", value: "每 700-900 字兑现一次优势" },
      ],
      learnedRules: ["少解释，多行动", "主角不能被动超过 600 字", "章节末尾留硬钩子", "伏笔回收要落到具体物件"],
      tasks: [
        { chapter: "126", node: "旧城冷库夺回", task: "生成正文", roles: "林澈 / 许南枝", status: "进行中", score: "--" },
        { chapter: "127", node: "暴雪运输线", task: "拆细大纲", roles: "秦砚", status: "待处理", score: "--" },
        { chapter: "128", node: "内鬼第一次误导", task: "伏笔校验", roles: "周序", status: "需审查", score: "--" },
      ],
    },
    {
      id: "entertainment",
      title: "顶流塌房后她杀回来了",
      genre: "娱乐圈爽文",
      totalChapters: 800,
      chapterTargetWords: 2200,
      logline: "过气女星靠作品、舆论和资源翻盘，把所有踩她的人送上热搜。",
      currentChapter: 42,
      words: 108000,
      outlineParsed: 120,
      styleStatus: "训练中",
      styleConfidence: 63,
      averageScore: 82,
      health: { outline: 65, character: 76, style: 63, audit: 74 },
      volumes: [
        { title: "第一卷 黑热搜开局", range: "001-080", goal: "塌房危机、综艺反击、第一波口碑翻盘", progress: 72 },
        { title: "第二卷 资源重洗", range: "081-180", goal: "拿下剧本，反压资本局", progress: 22 },
      ],
      outlineRows: [
        { chapter: "041", target: "综艺反转播出", event: "观众发现剪辑陷阱", clue: "经纪人旧录音", status: "完成" },
        { chapter: "042", target: "热搜第一轮反杀", event: "女主公开放证据", clue: "录音只放一半", status: "写作中" },
        { chapter: "043", target: "资本方压热度", event: "平台限流", clue: "粉丝数据异常", status: "待写" },
      ],
      clues: [
        { name: "旧录音", detail: "第 12 章出现，第 42 章放出一半，第 68 章彻底回收。" },
        { name: "粉丝数据异常", detail: "第 39 章埋下，第 43 章触发。" },
      ],
      characters: [
        { name: "姜一眠", role: "女主 / 过气演员", first: "001", plan: "001-800", actual: "001-042", risk: "低", relation: "从被围攻转为主动控场", next: "第 42 章公开证据" },
        { name: "沈砚", role: "导演 / 事业盟友", first: "018", plan: "030-120", actual: "030, 036, 041", risk: "中", relation: "认可能力但未公开站队", next: "第 45 章给试镜机会" },
        { name: "林薇", role: "对家 / 舆论反派", first: "004", plan: "001-100", actual: "004-042", risk: "低", relation: "造谣链条逐渐暴露", next: "第 43 章反扑失败" },
      ],
      chapters: [
        { id: 41, title: "综艺反转播出", status: "完成", progress: 100, score: 82, outline: "节目播出，观众发现女主被恶意剪辑。", roles: ["姜一眠", "林薇"], clues: ["旧录音露头"], manuscript: "节目播到第十七分钟，弹幕突然停了一秒。\n\n下一秒，满屏都是同一句话：这段剪辑不对。", scoreDetail: { plot: 84, character: 80, style: 83, hook: 79 } },
        { id: 42, title: "热搜第一轮反杀", status: "写作中", progress: 60, score: null, outline: "女主公开证据，但只放一半，为后续反扑留空间。", roles: ["姜一眠", "林薇", "沈砚"], clues: ["录音只放一半"], manuscript: "姜一眠看着不断刷新的词条，没有立刻发声。\n\n她等到对方把话说满，才点开录音。", scoreDetail: null },
      ],
      styleProfile: [
        { label: "句长", value: "中短句，强调舆论节奏" },
        { label: "节奏", value: "热搜反转和弹幕反馈密集" },
        { label: "对话", value: "台词要利落，带压迫感" },
        { label: "爽点", value: "证据释放、资源反压、公开打脸" },
      ],
      learnedRules: ["反转要有公开场", "每章保留一个热搜钩子", "不要长篇解释饭圈规则", "女主反击要主动"],
      tasks: [
        { chapter: "042", node: "热搜第一轮反杀", task: "生成正文", roles: "姜一眠 / 林薇", status: "进行中", score: "--" },
        { chapter: "043", node: "资本方压热度", task: "拆细大纲", roles: "沈砚", status: "待处理", score: "--" },
      ],
    },
    {
      id: "blank",
      title: "未命名新项目",
      genre: "自定义题材",
      totalChapters: 600,
      chapterTargetWords: 3000,
      logline: "等待填写项目卖点。",
      currentChapter: 0,
      words: 0,
      outlineParsed: 0,
      styleStatus: "未训练",
      styleConfidence: 0,
      averageScore: null,
      health: { outline: 0, character: 0, style: 0, audit: 0 },
      volumes: [],
      outlineRows: [],
      clues: [],
      characters: [],
      chapters: [],
      styleProfile: [],
      learnedRules: [],
      tasks: [],
    },
  ],
  providers: [
    { id: "openai", name: "GPT / OpenAI", key: "", baseUrl: "https://api.openai.com/v1", enabled: true, status: "待验证" },
    { id: "deepseek", name: "DeepSeek", key: "", baseUrl: "https://api.deepseek.com/v1", enabled: true, status: "待验证" },
    { id: "gemini", name: "Gemini", key: "", baseUrl: "https://generativelanguage.googleapis.com", enabled: false, status: "待验证" },
    { id: "claude", name: "Claude / Anthropic", key: "", baseUrl: "https://api.anthropic.com/v1", enabled: false, status: "待验证" },
  ],
  routes: [
    { task: "大纲拆分", provider: "GPT / OpenAI", model: "gpt-5.2", temperature: "0.3", usage: "长上下文结构化抽取" },
    { task: "章节正文", provider: "DeepSeek", model: "deepseek-chat", temperature: "0.8", usage: "高性价比正文初稿" },
    { task: "文风学习", provider: "Claude / Anthropic", model: "claude-sonnet-4.5", temperature: "0.2", usage: "样章分析和规则归纳" },
    { task: "完稿评分", provider: "GPT / OpenAI", model: "gpt-5.2", temperature: "0.1", usage: "剧情、文风、爽点评分" },
    { task: "一致性审查", provider: "Gemini", model: "gemini-2.5-pro", temperature: "0.1", usage: "长上下文事实校验" },
    { task: "公开资料补强", provider: "Gemini", model: "gemini-2.5-pro", temperature: "0.2", usage: "联网资料摘要与故事路线补强" },
    { task: "尺度红线审查", provider: "Claude / Anthropic", model: "claude-sonnet-4.5", temperature: "0", usage: "暧昧、亲密、未成年和平台风险审查" },
    { task: "去 AI 味改写", provider: "DeepSeek", model: "deepseek-chat", temperature: "0.55", usage: "压解释腔、删模板词、补具体行业动作" },
  ],
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const DEFAULT_STYLE_SAMPLE = `她没有哭，也没有解释。

门外的人还在等她低头。

可她只是把那份合同推回去，语气很轻：“这次，该你们求我了。”`;

const CURRENT_RUBRIC_METHOD = "local-rubric-v3";
const CURRENT_PROJECT_PLAN_VERSION = 2;
const CURRENT_DETAIL_OUTLINE_VERSION = 3;

const DEFAULT_STYLE_TAGS = [
  "语言风趣",
  "轻松",
  "沙雕",
  "无脑爽",
  "对白多",
  "心理活动丰富",
];

const SUGGESTED_STYLE_TAGS = [
  ...DEFAULT_STYLE_TAGS,
  "节奏快",
  "短句密集",
  "反差笑点",
  "打脸密集",
  "女星互动甜",
  "主角强势",
  "少解释",
  "强钩子",
];

const STYLE_TAG_RULE_MAP = {
  "语言风趣": "语言风趣：台词和反应可以带轻微包袱，用人物反应制造笑点，不写作者吐槽式段子。",
  "轻松": "轻松：高压事件后给短句缓冲和生活化反应，但每个缓冲都要接回冲突或结果。",
  "沙雕": "沙雕：允许反差反应和荒诞场面，但不能破坏人物底线，不能让主线变成纯段子。",
  "无脑爽": "无脑爽：每 700-900 字兑现一次优势、打脸、资源落袋或关系推进，少铺垫，快给结果。",
  "对白多": "对白多：提高对话占比，台词必须推进冲突、关系或信息，不用闲聊灌水。",
  "心理活动丰富": "心理活动丰富：心理只写当下选择、欲望、顾虑和底线；每段心理后必须接动作或结果，不写空泛抒情。",
  "节奏快": "节奏快：开场 300 字内出麻烦，中段至少两次转折，结尾留下一章压力。",
  "短句密集": "短句密集：多用短句和短段落，长解释拆成动作、对话和物件反馈。",
  "反差笑点": "反差笑点：笑点来自身份、场合和结果反差，不靠网络烂梗堆叠。",
  "打脸密集": "打脸密集：先让质疑落地，再用可见结果反击，避免只写全场震惊。",
  "女星互动甜": "女星互动甜：互动写信任、资源、事业和边界感，成年暧昧用留白和后果表达。",
  "主角强势": "主角强势：主角主动做选择、压风险、给结果，不能长时间被动解释。",
  "少解释": "少解释：系统、圈内规则和人设信息尽量放进争执、交易、任务和现场物件里。",
  "强钩子": "强钩子：章节末尾给坏消息、反转、代价、旧债或下一位关键角色入场。",
};

const DEFAULT_STYLE_BLEND_PROFILES = [
  { id: "sample", name: "样章文风", weight: 40, rule: "句长、段落、换行、对白比例和爽点密度以样章分析为底盘。", enabled: true },
  { id: "manual-revision", name: "人工修订", weight: 30, rule: "优先学习作者最近改过的正文，尤其是台词推进、动作落点和删改后的语气。", enabled: true },
  { id: "intent-tags", name: "风格标签", weight: 20, rule: "把可编辑标签转成明确生成约束，强化轻松、沙雕、无脑爽、对白多等人工意图。", enabled: true },
  { id: "genre-skill", name: "题材Skill", weight: 10, rule: "娱乐圈爽文、番茄小白文、去 AI 味和平台尺度规则只做边界与题材补强。", enabled: true },
];

const DEFAULT_STYLE_FUSION_GOAL = "先保剧情推进和人物动作，再保样章句式，最后叠加风趣、轻松、沙雕、对白多等人工标签；任何风格冲突都以追读和可读性为准。";

const ENTERTAINMENT_GOLD_FINGER_POWERS = [
  { name: "预言校准", effect: "短期事件预知从“能猜到”升级为“能校准结果”：地点、时间、对象、代价都要落成可操作信息。" },
  { name: "身体强化", effect: "预言成功后回收星运值，临时提升体能、耐力、反应、抗压和恢复，用来赶场、护人、救场、挡风险。" },
  { name: "星运赋能", effect: "男主可以把星运临时借给女明星，提升镜头感、试镜状态、台词稳定度和公众好感，但必须写出结果反馈。" },
  { name: "结果回收", effect: "每次预言和赋能都产生可见收益：身体属性、星运余额、关系信任或资源入口，同时带来反噬、时限或下一任务。" },
];

function defaultGoldFingerPowers(entertainmentPreset) {
  return entertainmentPreset ? ENTERTAINMENT_GOLD_FINGER_POWERS.map((power) => ({ ...power })) : [];
}

function mergeGoldFingerPowers(current = [], defaults = []) {
  const normalized = Array.isArray(current) ? current.filter(Boolean) : [];
  const names = new Set(normalized.map((power) => String(typeof power === "string" ? power : power.name || power.label || "").trim()));
  const missingDefaults = defaults.filter((power) => !names.has(power.name));
  return normalized.concat(missingDefaults.map((power) => ({ ...power })));
}

function goldFingerPowerNames(project = currentProject()) {
  return (project?.goldFingerPowers || [])
    .map((power) => String(typeof power === "string" ? power : power.name || power.label || "").trim())
    .filter(Boolean);
}

function normalizeStyleTags(tags = []) {
  const rawTags = Array.isArray(tags) ? tags : [];
  const seen = new Set();
  return rawTags
    .map((tag) => (typeof tag === "string" ? { name: tag, enabled: true } : tag))
    .map((tag) => ({
      name: String(tag?.name || tag?.label || "").trim(),
      enabled: tag?.enabled !== false,
    }))
    .filter((tag) => {
      if (!tag.name || seen.has(tag.name)) return false;
      seen.add(tag.name);
      return true;
    });
}

function normalizeStyleBlendProfiles(profiles = []) {
  const rawProfiles = Array.isArray(profiles) ? profiles : DEFAULT_STYLE_BLEND_PROFILES;
  return rawProfiles
    .map((profile, index) => ({
      id: String(profile?.id || `blend-${index}-${String(profile?.name || "custom").replace(/\s+/g, "-")}`),
      name: String(profile?.name || "自定义风格源").trim(),
      weight: Math.max(0, Math.min(100, Number(profile?.weight) || 0)),
      rule: String(profile?.rule || "").trim(),
      enabled: profile?.enabled !== false,
    }))
    .filter((profile) => profile.name);
}

function ensureStyleControls(project) {
  if (!project) return;
  project.styleTags = Array.isArray(project.styleTags)
    ? normalizeStyleTags(project.styleTags)
    : normalizeStyleTags(DEFAULT_STYLE_TAGS);
  project.styleBlendProfiles = Array.isArray(project.styleBlendProfiles)
    ? normalizeStyleBlendProfiles(project.styleBlendProfiles)
    : normalizeStyleBlendProfiles(DEFAULT_STYLE_BLEND_PROFILES);
  project.styleFusionGoal = String(project.styleFusionGoal || DEFAULT_STYLE_FUSION_GOAL).trim();
}

function styleTagRules(project) {
  ensureStyleControls(project);
  const tags = (project?.styleTags || []).filter((tag) => tag.enabled);
  if (!tags.length) return [];
  return [
    `作者可编辑风格标签：${tags.map((tag) => tag.name).join("、")}。这些标签必须进入正文语气和节奏，但不能覆盖细纲事件。`,
    ...tags.map((tag) => STYLE_TAG_RULE_MAP[tag.name] || `自定义风格：${tag.name}。在不破坏剧情推进、人设稳定和平台尺度的前提下体现。`),
  ];
}

function styleFusionRules(project) {
  ensureStyleControls(project);
  const activeProfiles = (project?.styleBlendProfiles || []).filter((profile) => profile.enabled);
  if (!activeProfiles.length) return [];
  const totalWeight = activeProfiles.reduce((sum, profile) => sum + Number(profile.weight || 0), 0) || 1;
  const chainText = activeProfiles
    .map((profile, index) => `${index + 1}. ${profile.name} ${Math.round((Number(profile.weight || 0) / totalWeight) * 100)}%`)
    .join(" → ");
  return [
    `多文风融合链路：${chainText}。`,
    `融合目标：${project.styleFusionGoal || DEFAULT_STYLE_FUSION_GOAL}`,
    "融合冲突处理：剧情清晰 > 人设稳定 > 样章句式 > 人工标签 > 题材装饰；如果冲突，保留推进，降低装饰。",
    ...activeProfiles.map((profile) => `融合来源｜${profile.name}：${profile.rule || "按该来源的有效规则参与生成。"}`),
  ];
}

function currentProject() {
  const project = state.projects.find((item) => item.id === state.activeProjectId) || state.projects[0];
  ensureProjectPlanning(project);
  return project;
}

function activeTargetWords(project = currentProject(), chapter = null) {
  const projectTarget = Number(project?.chapterTargetWords) || 2200;
  const chapterTarget = Number(chapter?.targetWords) || projectTarget;
  return Math.min(3000, Math.max(2200, chapterTarget));
}

function generationWordBand(targetWords) {
  const target = Math.min(3000, Math.max(2200, Number(targetWords) || 2200));
  return {
    target,
    min: 2200,
    max: 3000,
    preferredMin: Math.max(2200, target - 200),
    preferredMax: Math.min(3000, target + 200),
  };
}

function generationWordRules(targetWords = 2200) {
  const band = generationWordBand(targetWords);
  return [
    `硬性字数：正文必须控制在 2200-3000 字之间，优先落在 ${band.preferredMin}-${band.preferredMax} 字。`,
    `本章目标约 ${band.target} 字；若不足优先补人物的顾虑、欲望、误判、选择、对话交锋、结果反馈和章末钩子；若超过 3000 字先收束。`,
    `按本章细纲分场景扩写，场景字数总和必须覆盖 ${band.target} 字，不允许 800-1200 字就收尾，也不允许靠房间物品、环境清单凑字数。`,
  ];
}

function characterDepthRules() {
  return [
    "人物生动优先：每个重要场景都写清角色此刻想要什么、怕什么、误判了什么、最后做了什么选择。",
    "心理活动要有方向：写欲望、顾虑、底线、算计和羞耻感，不写“复杂情绪、心中涌起、说不清道不明”这类标签。",
    "场景描写限量：地点和物品只保留会改变人物选择、暴露处境或推动冲突的 1-2 个细节，禁止连续罗列床、凳、窗户、墙纸、报纸等物品清单。",
    "补字数不要补摆设：宁可多写一次迟疑、试探、反悔、嘴硬、让步和代价，也不要用静态陈设填充段落。",
    "每段落点尽量落在人：动作、台词、心理选择、关系变化或后果，物件只能服务这些变化。",
  ];
}

function buildGoldFingerRules(project = currentProject()) {
  return (project?.goldFingerPowers || [])
    .map((power) => {
      if (!power) return "";
      if (typeof power === "string") return power.trim();
      const name = String(power.name || power.label || "").trim();
      const effect = String(power.effect || power.desc || power.detail || "").trim();
      return [name, effect].filter(Boolean).join("：");
    })
    .filter(Boolean);
}

function sortChaptersById(chapters = []) {
  return [...(chapters || [])]
    .filter(Boolean)
    .sort((a, b) => Number(a.id) - Number(b.id));
}

function previousChapterFor(project, chapterId) {
  const targetId = Number(chapterId) || 0;
  return sortChaptersById(project?.chapters || [])
    .filter((item) => Number(item.id) < targetId)
    .at(-1) || null;
}

function nextChapterFor(project, chapterId) {
  const targetId = Number(chapterId) || 0;
  return sortChaptersById(project?.chapters || [])
    .find((item) => Number(item.id) > targetId) || null;
}

function compactMemoryText(text = "", limit = 360) {
  return cleanGeneratedDraft(text)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function uniqueMemoryParts(parts = []) {
  const seen = new Set();
  return parts
    .map((part) => compactMemoryText(part, 260))
    .filter((part) => {
      const key = compactMemoryText(part, 80);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function chapterOutlineMemoryText(chapter, limit = 320) {
  if (!chapter) return "";
  const detail = chapter.detailedOutline;
  if (detail && !Array.isArray(detail)) {
    const scenes = (detail.scenes || [])
      .map((scene) => [scene.title, scene.content].filter(Boolean).join("："))
      .filter(Boolean)
      .slice(0, 4)
      .join(" / ");
    return compactMemoryText(uniqueMemoryParts([chapter.outline, detail.core, detail.opening, scenes, detail.hook]).join(" → "), limit);
  }
  if (Array.isArray(detail)) return compactMemoryText(uniqueMemoryParts([chapter.outline, ...detail.slice(0, 3)]).join(" / "), limit);
  return compactMemoryText(chapter.outline || chapter.title || "", limit);
}

function chapterEndingMemory(chapter) {
  if (!chapter) return "";
  const manuscript = String(chapter.manuscript || "").trim();
  if (manuscript) {
    const paragraphs = manuscript.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
    const tail = (paragraphs.length > 1 ? paragraphs.slice(-2).join(" ") : paragraphs.at(-1)) || manuscript;
    return compactMemoryText(tail, 420).slice(-360);
  }
  if (chapter.endingSnapshot) return compactMemoryText(chapter.endingSnapshot, 360);
  const detail = chapter.detailedOutline;
  if (detail && !Array.isArray(detail)) {
    const sceneTail = (detail.scenes || []).at(-1)?.content || "";
    const fallback = [detail.hook, sceneTail, detail.opening, detail.core].filter(Boolean).join(" ");
    return compactMemoryText(fallback, 360);
  }
  return compactMemoryText(chapter.outline || chapter.title || "", 360);
}

function buildNextChapterBridge(project, chapter) {
  if (!project || !chapter) return "";
  const nextChapter = nextChapterFor(project, chapter.id);
  const ending = chapterEndingMemory(chapter).replace(/[。！？.!?]+$/, "");
  if (!nextChapter || !ending) return "";
  const nextNeed = chapterOutlineMemoryText(nextChapter, 120).replace(/[。！？.!?]+$/, "");
  return compactMemoryText(
    `第${chapter.id}章结尾停在：${ending}。第${nextChapter.id}章开头先处理这个结果、余波或人物移动，再进入：${nextNeed || nextChapter.title}。`,
    320,
  );
}

function buildChapterStorySnapshot(project, chapter) {
  if (!chapter) return null;
  const outline = chapterOutlineMemoryText(chapter);
  const ending = chapterEndingMemory(chapter);
  const summary = compactMemoryText(
    `第${chapter.id}章《${chapter.title || ""}》：${outline}${ending ? `；结尾落点：${ending}` : ""}`,
    480,
  );
  return {
    memorySummary: summary,
    endingSnapshot: ending,
    nextChapterBridge: buildNextChapterBridge(project, chapter),
  };
}

function refreshChapterStorySnapshot(project, chapter) {
  const snapshot = buildChapterStorySnapshot(project, chapter);
  if (!snapshot || !chapter) return null;
  const changed = chapter.memorySummary !== snapshot.memorySummary
    || chapter.endingSnapshot !== snapshot.endingSnapshot
    || chapter.nextChapterBridge !== snapshot.nextChapterBridge;
  Object.assign(chapter, snapshot);
  if (changed) chapter.memoryUpdatedAt = new Date().toISOString();
  return snapshot;
}

function summarizeChapterMemory(chapter) {
  if (!chapter) return "";
  if (chapter.memorySummary) return compactMemoryText(chapter.memorySummary, 360);
  const detail = chapter.detailedOutline;
  const chapterTitle = chapter.title || detail?.chapterTitle || `第${chapter.id}章`;
  const outlineText = Array.isArray(detail)
    ? detail.slice(0, 2).join(" / ")
    : [chapter.outline, detail?.core, detail?.hook].filter(Boolean).join(" → ");
  const ending = chapterEndingMemory(chapter);
  return `第${chapter.id}章《${chapterTitle}》：${compactMemoryText(outlineText, 180)}${ending ? `；尾声：${ending}` : ""}`;
}

function roleContinuityLines(project, chapter) {
  const roleNames = outlineRoleNames(chapter?.roles || []);
  if (!roleNames.length) return [];
  const characters = project?.characters || [];
  return roleNames.map((role) => {
    const shortRole = characterShortName(role);
    const match = characters.find((item) => {
      const itemName = characterShortName(item.name || "");
      return itemName === shortRole || itemName.includes(shortRole) || shortRole.includes(itemName);
    });
    if (!match) return `${shortRole}：按本章细纲延续出场，不要突然换设定。`;
    const pieces = [
      match.role || "",
      match.relation ? `关系：${match.relation}` : "",
      match.actual ? `已出场：${match.actual}` : "",
      match.next ? `下一步：${match.next}` : "",
    ].filter(Boolean);
    return `${shortRole}：${pieces.join("，")}`;
  });
}

function projectOpenThreads(project) {
  return (project?.clues || [])
    .filter((clue) => !/^\s*\|/.test(`${clue.name || ""}${clue.detail || ""}`))
    .map((clue) => compactMemoryText(`${clue.name || "线索"}：${clue.detail || ""}`, 130))
    .filter(Boolean)
    .slice(0, 4);
}

function buildChapterContinuityMemory(project, chapter, lookback = 3) {
  const sorted = sortChaptersById(project?.chapters || []);
  const currentId = Number(chapter?.id) || 0;
  const recent = sorted.filter((item) => Number(item.id) < currentId).slice(-lookback);
  const previous = recent.at(-1) || previousChapterFor(project, currentId);
  if (previous) refreshChapterStorySnapshot(project, previous);
  const recentLines = recent.map((item) => compactMemoryText(summarizeChapterMemory(item), 240));
  const roleLines = roleContinuityLines(project, chapter);
  const openThreads = projectOpenThreads(project);
  const previousEnding = previous ? chapterEndingMemory(previous) : "";
  const previousSummary = previous ? compactMemoryText(summarizeChapterMemory(previous), 240) : "";
  const previousBridge = previous?.nextChapterBridge ? compactMemoryText(previous.nextChapterBridge, 300) : "";
  const currentNeed = chapterOutlineMemoryText(chapter, 200);
  const carry = [
    previous ? `上一章结尾：${previousEnding}` : "上一章结尾：无",
    previousBridge ? `上章交接：${previousBridge}` : "",
    previousSummary ? `上一章摘要：${previousSummary}` : "",
    `本章必须接住：${currentNeed || compactMemoryText(chapter?.title || "", 160)}`,
    recentLines.length ? `最近剧情：${recentLines.join(" ｜ ")}` : "",
    roleLines.length ? `角色状态：${roleLines.join(" ｜ ")}` : "",
    openThreads.length ? `未回收线索：${openThreads.join(" ｜ ")}` : "",
    "连续性要求：前 300 字先处理上章结果、余波、人物移动或未回收线索，再推进本章新事件；不要重启背景，不要把前文当没发生。",
    "换场要求：如果本章开头要换地点或时间，先用 1-2 段交代上章尾声造成的后果和人物如何抵达新场。",
  ].filter(Boolean);

  return {
    previousChapterId: previous?.id || null,
    previousChapterTitle: previous?.title || "",
    previousEnding,
    previousSummary,
    previousBridge,
    currentNeed,
    recentLines,
    roleLines,
    openThreads,
    carry,
    digest: carry.join("\n"),
  };
}

function refreshProjectStoryMemory(project, chapter = null) {
  if (!project) return null;
  const targetChapter = chapter || project.chapters?.find((item) => Number(item.id) === Number(project.currentChapter)) || project.chapters?.[0] || null;
  sortChaptersById(project.chapters || [])
    .filter((item) => Number(item.id) < Number(targetChapter?.id || 0) && (item.manuscript || item.detailedOutline))
    .slice(-4)
    .forEach((item) => refreshChapterStorySnapshot(project, item));
  if (targetChapter?.manuscript) refreshChapterStorySnapshot(project, targetChapter);
  const memory = buildChapterContinuityMemory(project, targetChapter || {});
  project.storyMemory = {
    ...memory,
    activeChapterId: targetChapter?.id || null,
    activeChapterTitle: targetChapter?.title || "",
  };
  project.storyMemoryUpdatedAt = new Date().toISOString();
  if (targetChapter) {
    targetChapter.continuityMemory = memory;
    targetChapter.continuityMemoryUpdatedAt = project.storyMemoryUpdatedAt;
  }
  return memory;
}

function buildChapterGenerationContract(project, chapter) {
  const targetWords = activeTargetWords(project, chapter);
  const band = generationWordBand(targetWords);
  const goldFingerRules = buildGoldFingerRules(project);
  const continuity = buildChapterContinuityMemory(project, chapter);
  return [
    `正文目标 ${band.target} 字，合格区间 ${band.min}-${band.max} 字。`,
    "只输出小说正文，不输出粗纲、细纲、写法说明、规则复述或分析文字。",
    "开场 300 字内必须进入麻烦，中段至少 2 次转折，结尾留下下一章压力。",
    ...characterDepthRules(),
    continuity.previousChapterTitle
      ? `连续性：必须承接上一章《${continuity.previousChapterTitle}》的尾声，不能把前文当成没发生。`
      : "连续性：如果没有上一章，也要先建立清晰起点，再推进本章事件。",
    continuity.previousEnding ? `开篇落点：第一场必须处理“${continuity.previousEnding}”留下的结果、人物位置或未解决压力。` : "",
    "前 300 字必须先接住上一章结果、余波或人物状态，再写本章新推进。",
    "禁止把每章写成独立短篇；不要跳过上一章结尾直接开新事件。",
    "每段都落在人物动作、对话、心理选择、关系变化或结果变化上，少解释，少静态陈设。",
    ...(goldFingerRules.length ? [`金手指必须有操作感：${goldFingerRules.join("；")}`] : []),
  ].filter(Boolean);
}

function combinedGenerationRules(project) {
  const wordRules = generationWordRules(project?.chapterTargetWords || 2200);
  const fusionRules = styleFusionRules(project);
  const tagRules = styleTagRules(project);
  const learned = Array.isArray(project?.learnedRules) ? project.learnedRules : [];
  const revisionRules = (project?.styleRevisionSamples || []).length
    ? [
        "优先学习作者最近人工修订后的正文：保留修订稿的句长、换行、对话推进和动作落点。",
        ...(project.styleRevisionSamples || []).slice(-3).map((sample) => `人工修订样本｜第${sample.chapter}章：${sample.after}`),
      ]
    : [];
  const rules = [
    ...wordRules,
    ...characterDepthRules(),
    ...fusionRules,
    ...tagRules,
    ...learned.filter((rule) => !wordRules.includes(rule)),
    ...revisionRules,
  ];
  const seen = new Set();
  return rules.filter((rule) => {
    const key = String(rule || "").trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function styleSampleBody(text = "") {
  return String(text)
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter((line) => !/^#{1,6}\s+/.test(line.trim()) && !/^---+$/.test(line.trim()))
    .join("\n")
    .trim();
}

function textUnitLength(text = "") {
  const visibleText = String(text).replace(/\?/g, "");
  return (visibleText.match(/[\u4e00-\u9fa5A-Za-z0-9]/g) || []).length;
}

function chapterWordCount(text = "") {
  return textUnitLength(text);
}

function projectWordCount(project = {}) {
  return (project.chapters || []).reduce((sum, chapter) => sum + chapterWordCount(chapter?.manuscript || ""), 0);
}

function formatWordCount(count = 0) {
  const value = Number(count) || 0;
  if (value >= 10000) {
    return `${(value / 10000).toFixed(value % 10000 === 0 ? 0 : 1).replace(/\.0$/, "")} 万字`;
  }
  return `${value} 字`;
}

function normalizeChapterDraft(project, chapter, maxWords = 3000) {
  if (!chapter) return false;
  const originalText = String(chapter.manuscript || "");
  const originalWordCount = chapterWordCount(originalText);
  let changed = false;

  if (originalWordCount > maxWords) {
    const trimmedText = trimDraftToWordLimit(originalText, maxWords);
    if (trimmedText !== originalText) {
      chapter.manuscript = trimmedText;
      changed = true;
    }
  }

  chapter.wordCount = chapterWordCount(chapter.manuscript || "");
  chapter.progress = chapter.status === "完成"
    ? 100
    : Math.min(99, Math.round((chapter.wordCount / Math.max(chapter.targetWords || maxWords, 1)) * 100));

  if (changed && (chapter.score || chapter.scoreDetail || chapter.scoreMeta || chapter.reviewIssues?.length || chapter.reviewPassed || chapter.scoreNotes?.length)) {
    const audit = auditChapterDraft(project, chapter);
    chapter.scoreDetail = audit.detail;
    chapter.score = audit.score;
    chapter.scoreMeta = audit.meta;
    chapter.reviewIssues = audit.issues;
    chapter.reviewPassed = audit.passed;
    chapter.scoreNotes = audit.notes;
  }

  return changed;
}

function splitStyleSentences(text = "") {
  return styleSampleBody(text)
    .replace(/[“”"「」]/g, "")
    .split(/[。！？!?；;…]+/)
    .map((item) => item.trim())
    .filter((item) => textUnitLength(item) >= 2);
}

function splitStyleParagraphs(text = "") {
  return styleSampleBody(text)
    .split(/\n+/)
    .map((item) => item.trim())
    .filter((item) => textUnitLength(item) >= 2);
}

function countKeywordHits(text = "", keywords = []) {
  return keywords.reduce((sum, keyword) => {
    const word = String(keyword || "").trim();
    if (!word) return sum;
    return sum + (String(text).split(word).length - 1);
  }, 0);
}

function styleSampleHash(text = "") {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function analyzeStyleSample(rawText = "", project = currentProject()) {
  const body = styleSampleBody(rawText);
  const sampleCount = Math.max(1, (rawText.match(/^#\s+/gm) || []).length || rawText.split(/\n\s*---\s*\n/).filter((item) => item.trim()).length);
  const totalChars = textUnitLength(body);
  const paragraphs = splitStyleParagraphs(body);
  const sentences = splitStyleSentences(body);
  const sentenceLengths = sentences.map(textUnitLength);
  const paragraphLengths = paragraphs.map(textUnitLength);
  const avgSentence = Math.round(sentenceLengths.reduce((sum, item) => sum + item, 0) / Math.max(sentenceLengths.length, 1));
  const avgParagraph = Math.round(paragraphLengths.reduce((sum, item) => sum + item, 0) / Math.max(paragraphLengths.length, 1));
  const shortSentenceRatio = Math.round((sentenceLengths.filter((item) => item <= 16).length / Math.max(sentenceLengths.length, 1)) * 100);
  const longSentenceRatio = Math.round((sentenceLengths.filter((item) => item >= 42).length / Math.max(sentenceLengths.length, 1)) * 100);
  const dialogueParagraphs = paragraphs.filter((item) => /[“”"「」]/.test(item));
  const dialogueChars = dialogueParagraphs.reduce((sum, item) => sum + textUnitLength(item), 0);
  const dialogueRatio = Math.round((dialogueChars / Math.max(totalChars, 1)) * 100);
  const paragraphDensity = Math.round((paragraphs.length / Math.max(totalChars, 1)) * 1000);
  const actionWords = ["推", "拿", "递", "看", "走", "站", "坐", "敲", "拍", "打开", "关上", "挂断", "按住", "拉开", "转身", "抬头", "低头", "点头", "摇头", "停下", "退后", "靠近", "盯着", "翻开", "放下", "问", "说", "笑"];
  const innerWords = ["心里", "心中", "觉得", "感觉", "意识到", "明白", "想起", "忍不住", "不禁", "仿佛", "似乎", "好像", "复杂", "情绪", "莫名"];
  const actionHits = countKeywordHits(body, actionWords);
  const innerHits = countKeywordHits(body, innerWords);
  const forbiddenHits = ensureForbiddenWords(project).filter((word) => word && body.includes(word)).slice(0, 10);
  const charScore = Math.min(30, Math.floor(totalChars / 350));
  const sentenceScore = Math.min(18, Math.floor(sentences.length / 4));
  const paragraphScore = Math.min(14, Math.floor(paragraphs.length / 3));
  const sampleScore = Math.min(10, sampleCount * 3);
  const cleanScore = forbiddenHits.length ? -5 : 5;
  const confidence = Math.max(50, Math.min(96, 45 + charScore + sentenceScore + paragraphScore + sampleScore + cleanScore));
  const sentenceMode = avgSentence <= 16 ? "短句密集" : avgSentence <= 24 ? "中短句为主" : avgSentence <= 34 ? "中句为主" : "长句偏多";
  const paragraphMode = avgParagraph <= 36 ? "段落短，适合手机阅读" : avgParagraph <= 70 ? "段落中等，信息较密" : "段落偏长，需要拆短";
  const dialogueMode = dialogueRatio >= 35 ? "对话驱动明显" : dialogueRatio >= 18 ? "对话和叙述均衡" : "叙述多于对话";
  const paceMode = paragraphDensity >= 30 ? "换行快，节奏碎而急" : paragraphDensity >= 16 ? "节奏稳定" : "段落推进偏慢";
  const actionMode = actionHits >= innerHits * 1.5 ? "动作落点强于心理解释" : innerHits > actionHits ? "心理/解释偏多，生成时要压缩" : "动作和心理基本均衡";

  return {
    sampleCount,
    totalChars,
    paragraphCount: paragraphs.length,
    sentenceCount: sentences.length,
    avgSentence,
    avgParagraph,
    shortSentenceRatio,
    longSentenceRatio,
    dialogueRatio,
    paragraphDensity,
    actionHits,
    innerHits,
    forbiddenHits,
    confidence,
    sentenceMode,
    paragraphMode,
    dialogueMode,
    paceMode,
    actionMode,
    hash: styleSampleHash(body),
  };
}

function buildStyleProfileFromAnalysis(analysis) {
  const rows = [
    { label: "样本规模", value: `${analysis.sampleCount} 组样文，${analysis.totalChars} 字，${analysis.paragraphCount} 段，${analysis.sentenceCount} 句` },
    { label: "句长", value: `平均 ${analysis.avgSentence} 字，${analysis.sentenceMode}；短句 ${analysis.shortSentenceRatio}% / 长句 ${analysis.longSentenceRatio}%` },
    { label: "段落", value: `平均 ${analysis.avgParagraph} 字/段，${analysis.paragraphMode}` },
    { label: "对话", value: `对话占比 ${analysis.dialogueRatio}%，${analysis.dialogueMode}` },
    { label: "节奏", value: `${analysis.paceMode}，每千字约 ${analysis.paragraphDensity} 段` },
    { label: "落点", value: `动作词 ${analysis.actionHits} 次，心理/解释词 ${analysis.innerHits} 次，${analysis.actionMode}` },
  ];
  if (analysis.forbiddenHits.length) {
    rows.push({ label: "需避雷", value: `样文命中 ${analysis.forbiddenHits.join("、")}；学习节奏，不学习这些套词。` });
  }
  rows.push({ label: "训练版本", value: `样本指纹 ${analysis.hash}` });
  return rows;
}

function buildLearnedRulesFromAnalysis(analysis, project) {
  const dialogueMin = Math.max(8, analysis.dialogueRatio - 6);
  const dialogueMax = Math.min(55, analysis.dialogueRatio + 6);
  return [
    ...generationWordRules(project.chapterTargetWords || 2200),
    `句长按样章：平均 ${analysis.avgSentence} 字，保持${analysis.sentenceMode}，连续长句必须拆开。`,
    `段落按样章：平均 ${analysis.avgParagraph} 字/段，一段只承载一个动作、一个反应或一句关键台词。`,
    `对话按样章：目标占比 ${dialogueMin}%-${dialogueMax}%，台词必须推进关系或冲突。`,
    `节奏按样章：${analysis.paceMode}；开场不要铺解释，先给现场动作、冲突或结果。`,
    analysis.innerHits > analysis.actionHits
      ? "样文心理解释偏多，生成时每段必须补一个可见动作或物件落点。"
      : "保留样章的动作落点，先写人物做了什么，再写结果变化。",
    ...(analysis.forbiddenHits.length ? [`样文里的套词不继承：${analysis.forbiddenHits.join("、")}，生成时改成具体动作和现场反馈。`] : []),
    ...(isEntertainmentProject(project)
      ? [
          "娱乐圈爽点要落到热搜位、通告单、合同条款、镜头切换或商务资源。",
          "暧昧只写成年人自愿和留白，不写露骨身体细节。",
        ]
      : []),
  ];
}

function buildChapterGenerationPrompt(project, chapter, detail) {
  refreshProjectStoryMemory(project, chapter);
  const contract = buildChapterGenerationContract(project, chapter);
  const goldFingerRules = buildGoldFingerRules(project);
  const continuity = buildChapterContinuityMemory(project, chapter);
  const sceneLines = (detail?.scenes || [])
    .map((scene, index) => `${index + 1}. ${scene.title}：目标 ${scene.words || 500} 字，${scene.content}`)
    .join("\n");
  return [
    `你是中文网文正文生成模型。请为《${project.title}》生成第 ${chapter.id} 章《${chapter.title}》。`,
    "",
    "【硬性约束】",
    ...contract,
    "",
    "【连续性记忆】",
    ...(continuity.carry.length ? continuity.carry : ["上一章结尾：无"]),
    "",
    "【开篇承接写法】",
    continuity.previousEnding
      ? `第一段先承接这个尾声，不要直接另开背景：${continuity.previousEnding}`
      : "首章或无上一章时，第一段直接建立现场矛盾。",
    continuity.previousBridge ? `按上章交接写：${continuity.previousBridge}` : "",
    "如果必须换场，先写上一章结果如何落到人物身上，再写人物移动到新场景。",
    "开头禁止重新介绍世界观、系统设定或人物履历。",
    "",
    "【本章粗纲】",
    chapter.outline || detail?.core || chapter.title,
    "",
    "【本章细纲】",
    detail?.opening ? `开场：${detail.opening}` : "",
    sceneLines,
    detail?.hook ? `章末钩子：${detail.hook}` : "",
    "",
    "【必须出场角色】",
    (chapter.roles || []).join("、") || "按细纲安排",
    "",
    "【文风规则】",
    ...(combinedGenerationRules(project).length ? combinedGenerationRules(project) : ["番茄小白文，句子直给，少作者腔。"]),
    "",
    "【人物鲜活规则】",
    "不要写成“地点+物品清单”。出租屋、片场、后台、电话亭等场景只保留能压住人物处境的 1-2 个细节，重点写他为什么不敢退、为什么还要赌、他下一步怎么选。",
    "心理不是抒情，是行动前的拉扯：怕丢脸、怕没钱、怕错过机会、想翻身、想保住尊严，这些必须推动下一句动作或台词。",
    "",
    "【金手指设定】",
    ...(goldFingerRules.length ? goldFingerRules : ["预言系统：短期事件预知，必须有消耗、代价和结果回收。"]),
  ].filter(Boolean).join("\n");
}

function routeForTask(taskName = "章节正文") {
  return state.routes.find((route) => route.task === taskName)
    || state.routes.find((route) => route.task.includes(taskName) || taskName.includes(route.task))
    || state.routes.find((route) => /章节正文|正文/.test(route.task))
    || state.routes[0];
}

function chapterModelMeta(chapter = {}) {
  if (chapter.llmMeta?.source === "api") {
    return {
      className: "meta-ok",
      text: `模型：${chapter.llmMeta.provider} / ${chapter.llmMeta.model}`,
    };
  }
  const error = chapter.llmError || chapter.llmMeta?.error;
  if (error) return { className: "meta-warn", text: "模型：调用失败" };
  if (String(chapter.manuscript || "").trim()) {
    return { className: "meta-warn", text: "模型：未调用（历史/人工正文）" };
  }
  return { className: "", text: "模型：未调用" };
}

function llmUsageText(meta = {}, chapter = null) {
  if (!meta || meta.source !== "api") {
    const error = meta?.error || chapter?.llmError || chapter?.llmMeta?.error;
    if (error) return `模型调用失败：${error}`;
    if (chapter?.manuscript?.trim()) return "这章没有真实模型调用记录，可能是历史本地草稿、导入文本或手写正文。";
    return "尚未真实调用模型";
  }
  const usage = meta.usage || {};
  const total = usage.totalTokens || (Number(usage.inputTokens || 0) + Number(usage.outputTokens || 0));
  const auto = meta.autoSelectedModel && meta.requestedModel && meta.requestedModel !== meta.model
    ? ` · 自动从 ${meta.requestedModel} 切到可用模型`
    : "";
  const rag = meta.rag?.used ? ` · RAG ${meta.rag.hits || 0} 条` : "";
  return `${meta.provider || "-"} / ${meta.model || "-"}${meta.endpoint ? ` · ${meta.endpoint}` : ""}${auto}${rag} · input ${usage.inputTokens || 0} · output ${usage.outputTokens || 0} · total ${total || 0}`;
}

function recordLlmUsage(project, chapter, result) {
  const usage = result.usage || {};
  const inputTokens = Number(usage.inputTokens || 0);
  const outputTokens = Number(usage.outputTokens || 0);
  const totalTokens = Number(usage.totalTokens || inputTokens + outputTokens || 0);
  const meta = {
    source: "api",
    task: result.task,
    provider: result.provider,
    providerId: result.providerId,
    model: result.model,
    routeModel: result.routeModel,
    requestedModel: result.requestedModel,
    autoSelectedModel: Boolean(result.autoSelectedModel),
    modelSelectionReason: result.modelSelectionReason,
    temperature: result.temperature,
    endpoint: result.endpoint,
    fallbackFrom: result.fallbackFrom,
    rag: result.rag || null,
    usage: { inputTokens, outputTokens, totalTokens },
    latencyMs: result.latencyMs,
    requestId: result.requestId,
    finishReason: result.finishReason,
    calledAt: new Date().toISOString(),
  };
  chapter.llmMeta = meta;
  chapter.llmError = "";
  chapter.draftSource = "api";
  chapter.generatedAt = meta.calledAt;
  project.llmUsage = project.llmUsage || { calls: 0, inputTokens: 0, outputTokens: 0, totalTokens: 0 };
  project.llmUsage.calls += 1;
  project.llmUsage.inputTokens += inputTokens;
  project.llmUsage.outputTokens += outputTokens;
  project.llmUsage.totalTokens += totalTokens;
  project.llmCallLogs = (project.llmCallLogs || []).concat({
    chapter: chapter.id,
    title: chapter.title,
    ...meta,
  }).slice(-50);
}

async function callChapterModel(project, chapter, prompt, targetWords) {
  await saveState("before-llm-generate");
  const response = await fetch("/api/llm/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      projectId: project.id,
      chapterId: chapter.id,
      task: "章节正文",
      targetWords,
      prompt,
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || `模型服务返回 ${response.status}`);
  }
  if (!String(payload.text || "").trim()) {
    throw new Error("模型返回正文为空");
  }
  return payload;
}

function statusClass(status) {
  if (["完成", "已连接", "启用", "已训练", "已审查", "模型列表可用"].includes(status)) return "done";
  if (["待修", "需审查", "高", "不通过", "连接失败", "样章已更新"].includes(status)) return "risk";
  if (["进行中", "写作中", "训练中", "审查中", "测试中"].includes(status)) return "doing";
  return "wait";
}

function riskClass(risk) {
  if (risk === "高") return "high";
  if (risk === "中") return "mid";
  return "low";
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

let generationProgressTimer = null;
let generationProgressStartedAt = 0;
let generationProgressValue = 0;

function formatElapsed(ms) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  if (seconds < 60) return `${seconds} 秒`;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes} 分 ${rest} 秒`;
}

function setGenerationProgress(percent, title, detail, { running = true, failed = false } = {}) {
  const box = $("#generation-progress");
  if (!box) return;
  generationProgressValue = Math.max(0, Math.min(100, Math.round(percent)));
  box.hidden = false;
  box.classList.toggle("running", running && !failed);
  box.classList.toggle("failed", failed);
  $("#generation-progress-title").textContent = title;
  $("#generation-progress-percent").textContent = `${generationProgressValue}%`;
  $("#generation-progress-bar").style.width = `${generationProgressValue}%`;
  $("#generation-progress-detail").textContent = detail;
  if (generationProgressStartedAt) {
    $("#generation-progress-elapsed").textContent = formatElapsed(Date.now() - generationProgressStartedAt);
  }
}

function startGenerationProgress(route, chapter, targetWords) {
  window.clearInterval(generationProgressTimer);
  generationProgressStartedAt = Date.now();
  generationProgressValue = 5;
  const modelText = route ? `${route.provider} / ${route.model}` : "已配置模型";
  setGenerationProgress(5, "准备生成", `第 ${chapter.id} 章，目标 ${targetWords} 字，模型 ${modelText}`);
  generationProgressTimer = window.setInterval(() => {
    const elapsed = Date.now() - generationProgressStartedAt;
    const ceiling = elapsed > 90000 ? 92 : elapsed > 45000 ? 88 : 82;
    const next = Math.min(ceiling, generationProgressValue + (elapsed > 45000 ? 1 : 2));
    setGenerationProgress(next, "等待模型返回", `模型正在生成正文，已等待 ${formatElapsed(elapsed)}。长章节通常需要 60-120 秒。`);
  }, 3500);
}

function finishGenerationProgress(message = "正文已写入编辑器") {
  window.clearInterval(generationProgressTimer);
  setGenerationProgress(100, "生成完成", message, { running: false });
}

function failGenerationProgress(message = "模型调用失败") {
  window.clearInterval(generationProgressTimer);
  setGenerationProgress(Math.max(generationProgressValue, 100), "生成失败", message, { running: false, failed: true });
}

function resetGenerationProgress() {
  window.clearInterval(generationProgressTimer);
  generationProgressTimer = null;
  generationProgressStartedAt = 0;
  generationProgressValue = 0;
  const box = $("#generation-progress");
  if (box) {
    box.hidden = true;
    box.classList.remove("running", "failed");
  }
}

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

let persistenceReady = false;
let saveStateTimer = null;

function canUseLocalService() {
  return window.location.protocol === "http:" || window.location.protocol === "https:";
}

function isMaskedApiKey(value = "") {
  const text = String(value || "").trim();
  return !text || /[\u2022\u25cf\u25e6\u2219]/.test(text) || /^[*•●]+$/.test(text);
}

function normalizeProviderSecrets() {
  (state.providers || []).forEach((provider) => {
    if (isMaskedApiKey(provider.key)) {
      provider.key = "";
      if (provider.status === "已连接") provider.status = "待验证";
      if (provider.lastTest?.ok) provider.lastTest = null;
    }
  });
}

function snapshotState() {
  normalizeProviderSecrets();
  return {
    ...state,
    pendingImportProjectId: null,
    loadedStateUpdatedAt: state.loadedStateUpdatedAt || null,
    savedAt: new Date().toISOString(),
  };
}

async function loadPersistentState() {
  if (!canUseLocalService()) return false;
  try {
    const response = await fetch("/api/state", { cache: "no-store" });
    if (!response.ok) return false;
    const payload = await response.json();
    if (!payload.state || !Array.isArray(payload.state.projects)) return false;
    Object.assign(state, payload.state, { pendingImportProjectId: null });
    state.loadedStateUpdatedAt = payload.updatedAt || null;
    normalizeProviderSecrets();
    return true;
  } catch {
    return false;
  }
}

async function saveState(reason = "auto") {
  if (!canUseLocalService()) return false;
  try {
    const response = await fetch("/api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason, loadedStateUpdatedAt: state.loadedStateUpdatedAt || null, state: snapshotState() }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      saveState.lastError = payload.error || `保存失败 (${response.status})`;
      return false;
    }
    if (payload.updatedAt) state.loadedStateUpdatedAt = payload.updatedAt;
    saveState.lastError = "";
    return true;
  } catch {
    saveState.lastError = "";
    return false;
  }
}

function saveStateSoon(reason = "auto") {
  if (!persistenceReady) return;
  window.clearTimeout(saveStateTimer);
  saveStateTimer = window.setTimeout(() => saveState(reason), 450);
}

async function saveStateNow(reason = "manual") {
  const ok = await saveState(reason);
  showToast(ok ? "已保存到本地数据库。" : (saveState.lastError || "未连接本地服务，当前只能保存在页面内存。"));
  return ok;
}

async function saveStateNowWithMessage(reason, successMessage, failMessage = "未连接本地服务，当前只能保存在页面内存。") {
  const ok = await saveState(reason);
  showToast(ok ? successMessage : (saveState.lastError || failMessage));
  return ok;
}

function flushStateOnUnload(reason = "pagehide") {
  if (!canUseLocalService()) return;
  try {
    syncStyleSampleFromDom({ persist: false });
    syncModelSettingsFromDom({ persist: false });
    const payload = JSON.stringify({ reason, state: snapshotState() });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/state", new Blob([payload], { type: "application/json" }));
      return;
    }
    fetch("/api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
  } catch {
    // Page is unloading; best effort only.
  }
}

const DEFAULT_OUTLINE_SAMPLE = `第一卷：开局立住主角和核心爽点
001-050 章：主角获得关键优势，解决第一场危机，建立第一个稳定据点。
关键事件：第一次公开碾压；重要角色加入；反派线索出现。
伏笔：旧文件编号 A17，地下二层异常供电。`;

const ENTERTAINMENT_PATTERNS = [
  { title: "热搜三段式", detail: "先让黑词条发酵，再放半截证据，最后用完整证据反杀，保留下一章追问。" },
  { title: "综艺公开场", detail: "把冲突放进直播、录制间、弹幕和后台监视器，爽点要被观众、嘉宾、导演组同时看见。" },
  { title: "资源反压", detail: "合同、试镜、红毯座次、商务 brief、平台排播都是战场，主角赢的是可见资源，不是空口气场。" },
  { title: "舆论多视角", detail: "营销号、粉丝群、路人弹幕、狗仔偷拍视频、经纪人会议交替推进，避免单线解释。" },
  { title: "行业时间钉", detail: "用真实行业节点做锚点：选秀年、流量时代、短视频宣发、电影节、平台剧招商，不完全架空。" },
  { title: "爽点后果", detail: "每次打脸都要带来资源、口碑、关系或敌人升级，不能只写全网震惊。" },
];

const PUBLISHABLE_ROMANCE_RULES = [
  "所有暧昧和亲密推进只写成年人，且必须是清醒、自愿、可拒绝、关系边界明确。",
  "亲密镜头写到门关上、灯暗下、衣角被握住、呼吸停顿就切走，后续写第二天的关系变化和代价。",
  "用克制、停顿、错开的视线、未发送的消息、通告单上的名字并排来制造张力，不写露骨动作和身体细节。",
  "暧昧服务剧情：推动信任、试探、占有欲或公开危机，不单独为了刺激停留。",
  "未成年人只写事业守护、师友情、资源帮助，不写暧昧、身体亲密和成人关系暗示。",
  "禁写强迫、灌醉、权力胁迫、师生胁迫、偷拍传播、羞辱性描写和任何非自愿桥段。",
];

const ENTERTAINMENT_FORBIDDEN_WORDS = [
  "眸光", "勾唇", "薄唇", "意味深长", "气场全开", "全网炸了", "杀疯了", "封神", "惊艳全场", "全场哗然",
  "资本大佬", "顶流男神", "路人震惊", "粉丝破防", "热搜爆了", "修罗场", "命运齿轮", "空气凝固", "眼底闪过",
  "心头一颤", "莫名", "仿佛", "似乎", "无人知道", "所有人都没想到", "她不是以前的她了", "这一次换我来守护你",
  "谁也别想", "狠狠打脸", "直接起飞", "艳压", "美到失语", "欲罢不能", "荷尔蒙爆棚",
  "然而", "但是", "然而，", "但是，", "不禁", "忍不住", "好像", "突然", "某种说不清道不明的", "眼神中闪过一丝",
  "嘴角微微上扬", "心中涌起一股", "意味深长地看了他一眼", "若有所思", "空气仿佛凝固了", "不知为何",
  "微微一怔", "不由得", "不禁愣住了", "然而，事情并没有那么简单", "命运的齿轮开始转动", "这一刻注定被载入史册",
  "她的眼底闪过一丝复杂的情绪", "他的眼底闪过一丝复杂的情绪", "眼底闪过一丝复杂的情绪", "空气中弥漫着诡异的气氛",
  "他不知道的是", "她不知道的是", "事情并没有那么简单", "远没有表面看上去那么简单", "这个世界远没有表面看上去那么简单",
];
const FORBIDDEN_WORD_LIBRARY_VERSION = "ai-cliche-v2";

const PUBLIC_BACKGROUND_LIBRARY = [
  { name: "刘亦菲", publicFacts: "武汉成长，母亲有舞蹈背景，童年赴美，2002 年回国并考入北京电影学院。", storyUse: "前期路线可写成跨文化回归、母女相依、镜头感早熟，和“被过度凝视”的舆论压力绑定。" },
  { name: "赵丽颖", publicFacts: "河北廊坊出身，中专空乘专业，2006 年选秀后入行，早期从配角和丫鬟戏积累。", storyUse: "适合走非科班、低起点、跑组吃苦线，爽点落在“没人看好但一场戏留下人”的反差。" },
  { name: "杨幂", publicFacts: "北京普通家庭出身，父亲为刑警，4 岁起有童星经历，早早熟悉剧组规则。", storyUse: "适合写成规则敏感、商业嗅觉强、对合同和宣发极快上手的事业型角色。" },
  { name: "刘诗诗", publicFacts: "北京曲艺家庭，6 岁学芭蕾，后来进入北京舞蹈学院芭蕾舞系。", storyUse: "路线从舞者纪律、身体控制和镜头安静感切入，转型演员时用“被说木”到“气质立住”做长线。" },
  { name: "唐嫣", publicFacts: "上海成长，曾读空乘相关专业，后参加选美并进入中央戏剧学院。", storyUse: "可写成甜感外表下的职业韧性，港圈/内地资源转换时突出她对机会的珍惜。" },
  { name: "张靓颖", publicFacts: "成都普通工人家庭出身，2005 年参加超级女声，以英文歌和嗓音辨识度出圈。", storyUse: "适合做选秀时代节点，主线落在合约、唱片工业、粉丝组织和国际化野心。" },
  { name: "李宇春", publicFacts: "成都出身，四川音乐学院背景，2005 年超级女声冠军，成为现象级民选偶像。", storyUse: "路线重点是尊重个人风格，不改造她，用合同保护和舞台话语权换信任。" },
  { name: "孙俪", publicFacts: "上海出身，幼年学舞，15 岁进入上海警备区文工团，后来凭电视剧打开国民度。", storyUse: "可走纪律感、正剧路线、家庭韧性和大女主剧预言，爽点放在口碑积累。" },
  { name: "林志玲", publicFacts: "台北成长，曾赴加拿大求学，多伦多大学西方美术史与经济学背景，后入模特行业。", storyUse: "可写成高学历模特转型、公众礼仪和跨地区商务线，避免只写外貌标签。" },
  { name: "范冰冰", publicFacts: "出生于山东青岛，早年因影视角色出名，后长期活跃于影视、时尚和国际电影节。", storyUse: "适合承担红毯、时尚资源、电影节和资本舆论线，剧情上只引用公开事实，不写无证传闻。" },
  { name: "曾黎", publicFacts: "湖北荆州沙市出身，中央戏剧学院 96 级本科班，常被归入中戏 96 级代表演员群。", storyUse: "可做中戏人脉与佛系演员线，负责给男主提供行业老派审美和稳定关系。" },
];

const STORY_ROUTE_LIBRARY = [
  "2002-2005：北影、童星、剧组试镜、早期通稿和纸媒娱乐版，先写行业原始生态。",
  "2005-2007：超级女声、短信投票、粉丝组织和唱片约，把歌手线接入主线资本版图。",
  "2008-2012：电视剧黄金期、门户娱乐、论坛爆料和经纪公司博弈，主打口碑和合约反杀。",
  "2013-2017：流量时代、微博热搜、红毯和品牌商务，主角开始用宣发系统控局。",
  "2018-2024：短视频、直播、平台剧招商和偶像工业，爽点从单人翻红升级为集团调度。",
  "2025 以后：二代、海外业务和行业秩序收束，减少无证现实影射，转向原创家族与产业线。",
];

const FEATURE_AUDIT_ROWS = [
  { module: "大纲导入", status: "已修", detail: "支持 txt/md 真文件读取，区分覆盖章数和展示节点数，导入失败会给原因。" },
  { module: "章节解析", status: "已修", detail: "改为 Markdown 表格列解析，能识别粗体章节、章节范围和多列梗概表。" },
  { module: "章节审查", status: "已完善", detail: "写作台支持送审、审查打分、待修队列和通过后完成流转。" },
  { module: "完成功能", status: "已完善", detail: "完成不再是静态标签；只有审查通过的章节才能标记完成，并进入完成列表。" },
  { module: "文风学习", status: "已完善", detail: "可从样章训练出约束，并注入娱乐圈去 AI 味、禁词和尺度规则。" },
  { module: "多模型配置", status: "已完善", detail: "保留 GPT、DeepSeek、Gemini、Claude，并新增资料补强、尺度审查、去 AI 改写路由。" },
  { module: "一致性审查", status: "已完善", detail: "补充角色缺席、伏笔回收、文风偏移、禁词和平台尺度审查项。" },
  { module: "doc/docx 导入", status: "待接后端", detail: "前端原型已明确提示；生产版需服务端解析 Word 文档。" },
];

function stripMarkdown(value = "") {
  return String(value)
    .replace(/\*\*/g, "")
    .replace(/[`*_#>~]/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function parseTableCells(line = "") {
  if (!String(line).trim().startsWith("|")) return [];
  const normalizedLine = String(line).trim().endsWith("|") ? String(line) : `${String(line)} |`;
  return normalizedLine
    .split("|")
    .slice(1, -1)
    .map((cell) => stripMarkdown(cell.replace(/<br\s*\/?>/gi, " / ")))
    .filter((cell, index, cells) => !(index === cells.length - 1 && !cell));
}

function padChapter(value) {
  const num = Number(String(value).replace(/[^\d]/g, ""));
  if (!Number.isFinite(num)) return "";
  return String(num).padStart(3, "0");
}

function rangeLabel(start, end) {
  if (start && end) return `${padChapter(start)}-${padChapter(end)}`;
  if (start) return padChapter(start);
  return "";
}

function normalizeChapterLabel(value = "") {
  const clean = stripMarkdown(value)
    .replace(/第|章|Ch\.?/gi, "")
    .replace(/[—～~至到]/g, "-")
    .replace(/\s+/g, "");
  const match = clean.match(/(\d{1,4})(?:-(\d{1,4}))?/);
  return match ? rangeLabel(match[1], match[2]) : "";
}

function isHeaderOrSeparator(cells) {
  if (!cells.length || cells.every((cell) => /^[-:\s]+$/.test(cell))) return true;
  const joined = cells.join("");
  return /章节|姓名|名字|方式|条件|效果|限制|核心标签|角色定位|后续发展|正式绑定章|状态结局/.test(joined)
    && !/\d|Ch\.?|第/.test(joined);
}

function decodeOutlineBuffer(buffer) {
  const encodings = ["utf-8", "gb18030", "gbk"];
  for (const encoding of encodings) {
    try {
      const text = new TextDecoder(encoding, { fatal: true }).decode(buffer);
      if (text) return text.replace(/\uFEFF/g, "").replace(/\r\n?/g, "\n");
    } catch {
      // continue
    }
  }
  return new TextDecoder("utf-8").decode(buffer).replace(/\uFEFF/g, "").replace(/\r\n?/g, "\n");
}

function extractTitle(text, sourceName = "") {
  const heading = text.match(/^#\s+(.+)$/m)?.[1] || "";
  const fallback = sourceName.replace(/\.[^.]+$/, "");
  const raw = stripMarkdown(heading || fallback || "未命名小说项目");
  return raw.replace(/（.*?）|\(.*?\)/g, "").trim() || "未命名小说项目";
}

function extractTotalChapters(text) {
  const firstMatch = text.match(/(\d{3,5})\s*章/);
  if (firstMatch) return Number(firstMatch[1]);
  const all = [...text.matchAll(/(\d{3,5})\s*章/g)].map((match) => Number(match[1])).filter(Number.isFinite);
  if (!all.length) return 0;
  return Math.max(...all);
}

function extractSimpleValue(text, label) {
  const match = text.match(new RegExp(`(?:\\*\\*)?${label}(?:\\*\\*)?[：:]\\s*([^\\n]+)`));
  return match ? stripMarkdown(match[1]) : "";
}

function extractChapterRef(value) {
  const source = String(value || "");
  const explicit = source.match(/(?:Ch\.?\s*|第\s*)(\d{1,4})(?:\s*[-~～至—到]\s*(\d{1,4}))?\s*章?/i);
  if (explicit) return rangeLabel(explicit[1], explicit[2]);
  const withSuffix = source.match(/(\d{1,4})(?:\s*[-~～至—到]\s*(\d{1,4}))?\s*章/);
  if (withSuffix) return rangeLabel(withSuffix[1], withSuffix[2]);
  return "";
}

function chapterStart(value = "") {
  const match = String(value).match(/\d{1,4}/);
  return match ? Number(match[0]) : 999999;
}

function chapterEnd(value = "") {
  const matches = String(value).match(/\d{1,4}/g);
  if (!matches?.length) return 0;
  return Number(matches[matches.length - 1]);
}

function buildVolumes(lines, totalChapters) {
  const volumes = [];
  const seen = new Set();
  for (const line of lines) {
    if (!/卷/.test(line) || !line.startsWith("###")) continue;
    const bracketTitle = line.match(/^###\s*【([^】]+)】/);
    const looseTitle = line.match(/^###\s*(.+?卷[^（(【】]*)/);
    const rawTitle = stripMarkdown(bracketTitle?.[1] || looseTitle?.[1] || "").replace(/：$/, "");
    if (!rawTitle || seen.has(rawTitle)) continue;
    seen.add(rawTitle);

    const rangeMatch = line.match(/(\d{1,4})\s*[~～\-—至到]\s*(\d{1,4})\s*章/);
    const range = rangeMatch ? rangeLabel(rangeMatch[1], rangeMatch[2]) : extractChapterRef(line);
    const timeMatch = line.match(/(\d{4}年\+?(?:\s*[~～\-—至到]\s*\d{4}年\+?)?)/);
    const goal = range
      ? `第${range}章${timeMatch ? `｜${stripMarkdown(timeMatch[1])}` : ""}`
      : "根据导入大纲自动拆分";
    const progress = range && totalChapters
      ? Math.min(100, Math.round((chapterEnd(range) / totalChapters) * 100))
      : Math.min(100, 10 + volumes.length * 8);

    volumes.push({
      title: rawTitle,
      range: range || "-",
      goal,
      progress,
    });

    if (volumes.length >= 12) break;
  }

  return volumes;
}

function buildOutlineRows(lines) {
  const earlyRows = [];
  const synopsisRows = [];
  const seen = new Set();
  let inSynopsis = false;

  for (const line of lines) {
    if (/2000章完整梗概|完整梗概/.test(line)) {
      inSynopsis = true;
      continue;
    }
    if (inSynopsis && /^##\s+/.test(line) && !/完整梗概/.test(line)) {
      break;
    }

    let match = line.match(/^###\s*第(\d{1,4})章\s*(.+)$/);
    if (match) {
      const chapter = padChapter(match[1]);
      const target = stripMarkdown(match[2]);
      const key = `${chapter}|${target}`;
      if (!seen.has(key)) {
        earlyRows.push({
          chapter,
          target,
          event: target,
          clue: "根据导入大纲生成",
          status: "待写",
        });
        seen.add(key);
      }
      continue;
    }

    const cells = parseTableCells(line);
    if (cells.length >= 2 && !isHeaderOrSeparator(cells)) {
      const chapter = normalizeChapterLabel(cells[0]);
      if (!chapter) continue;
      const hasSeparateRoleColumn = cells.length >= 4;
      const targetSource = hasSeparateRoleColumn ? cells[1] : cells[1];
      const eventSource = hasSeparateRoleColumn ? cells[2] : cells[1];
      const clueSource = hasSeparateRoleColumn ? cells[3] : cells[2];
      const target = summarizeNodeTitle(targetSource || eventSource);
      const event = stripMarkdown(eventSource || targetSource);
      const clue = stripMarkdown(clueSource || "");
      const key = `${chapter}|${target}`;
      if (!seen.has(key)) {
        const row = {
          chapter,
          target,
          event: event || target,
          clue: clue || "等待回收",
          status: clue.includes("完成") ? "完成" : clue.includes("收束") ? "待修" : "待写",
        };
        if (inSynopsis) {
          synopsisRows.push(row);
        } else {
          earlyRows.push(row);
        }
        seen.add(key);
      }
    }

    if (synopsisRows.length >= 260) break;
  }

  const rows = synopsisRows.length >= 5 ? synopsisRows : earlyRows;
  const sortedRows = rows.sort((a, b) => chapterStart(a.chapter) - chapterStart(b.chapter));

  return sortedRows.length ? sortedRows : [
    { chapter: "001", target: "开篇立主角", event: "建立核心冲突", clue: "识别第一个伏笔", status: "待写" },
  ];
}

function summarizeNodeTitle(value = "") {
  const clean = stripMarkdown(value)
    .replace(/（.*?）/g, "")
    .replace(/\(.*?\)/g, "")
    .trim();
  const firstBeat = clean.split(/[。；;，,：:]/)[0].trim();
  const title = firstBeat || clean || "章节节点";
  return title.length > 34 ? `${title.slice(0, 34)}…` : title;
}

function buildClues(lines) {
  const clues = [];
  const seen = new Set();

  for (const line of lines) {
    if (!/(伏笔|系统提示|埋|回收|线索|关键事件)/.test(line)) continue;
    const clean = stripMarkdown(line);
    if (!clean || seen.has(clean)) continue;
    clues.push({
      name: clean.slice(0, 20),
      detail: clean.length > 120 ? `${clean.slice(0, 120)}…` : clean,
    });
    seen.add(clean);
    if (clues.length >= 6) break;
  }

  return clues;
}

function buildCharacters(lines, protagonist = "") {
  const characters = [];
  const seen = new Set();
  let inCharacterSection = false;

  for (const line of lines) {
    if (/^##\s+一[、.].*女星|女星分类总表/.test(line)) inCharacterSection = true;
    if (/^##\s+二[、.]/.test(line)) inCharacterSection = false;
    if (/^##\s+五[、.].*角色|全女角色索引/.test(line)) inCharacterSection = true;
    if (/^##\s+六[、.]/.test(line)) inCharacterSection = false;
    if (!inCharacterSection || !line.includes("|")) continue;

    const cells = parseTableCells(line);
    if (cells.length < 4 || isHeaderOrSeparator(cells)) continue;

    const name = stripMarkdown(cells[1] || "");
    if (!name || /姓名|名字/.test(name)) continue;

    const isEarlyHeroTable = /^\d+$|^[①②③④⑤⑥⑦⑧⑨⑩]/.test(cells[0] || "") && /演员|歌手|多元/.test(cells[2] || "") && /\d{4}|Ch\.?|第/.test(cells[3] || "");
    const isScoreTable = /^\d{2,3}$/.test(cells[2] || "") || /^\d{2,3}$/.test(cells[3] || "");
    const scoreValue = /^\d{2,3}$/.test(cells[2] || "")
      ? cells[2]
      : (/^\d{2,3}$/.test(cells[3] || "") ? cells[3] : "");
    const role = isScoreTable
      ? `解毒女配 / 颜值${scoreValue}`
      : stripMarkdown(cells[2] || "演员");
    const firstSource = isEarlyHeroTable ? cells[3] : (scoreValue === cells[3] ? cells[4] : cells[3] || cells[4] || "");
    const planSource = isEarlyHeroTable ? cells[3] : (scoreValue === cells[3] ? cells[4] : cells[4] || cells[3] || "");
    const relation = isScoreTable
      ? [cells[4], cells[5]].filter(Boolean).join("；")
      : stripMarkdown(cells[5] || cells[4] || cells[3] || "等待生成关系网");
    const first = extractChapterRef(firstSource) || extractChapterRef(cells.join(" ")) || "-";
    const plan = extractChapterRef(planSource) || first || "-";

    if (name.includes("、") || name.includes("/") || name.length > 18) {
      for (const background of PUBLIC_BACKGROUND_LIBRARY) {
        if (!name.includes(background.name) || seen.has(background.name)) continue;
        characters.push({
          name: background.name,
          role: role || "公开人物",
          first,
          plan,
          actual: "-",
          risk: "低",
          relation: stripMarkdown(cells[5] || cells[4] || "从群像索引拆分"),
          next: background.storyUse,
          background: background.publicFacts,
          storyUse: background.storyUse,
        });
        seen.add(background.name);
      }
      continue;
    }

    if (seen.has(name)) {
      const existing = characters.find((item) => item.name === name);
      if (existing) {
        const betterFirst = extractChapterRef(firstSource);
        const betterPlan = extractChapterRef(planSource);
        if (betterFirst && (existing.first === "-" || chapterStart(betterFirst) < chapterStart(existing.first))) existing.first = betterFirst;
        if (betterPlan && existing.plan === existing.first) existing.plan = betterPlan;
      }
      continue;
    }

    characters.push({
      name,
      role,
      first,
      plan,
      actual: "-",
      risk: "低",
      relation: stripMarkdown(relation || "等待生成关系网"),
      next: "从导入大纲继续扩展",
    });
    seen.add(name);

    if (characters.length >= 80) break;
  }

  if (protagonist && !seen.has(protagonist)) {
    characters.unshift({
      name: protagonist,
      role: "核心视角 / 男主",
      first: "001",
      plan: "001-2000",
      actual: "-",
      risk: "低",
      relation: "项目主线人物",
      next: "继续补人物小传",
    });
  }

  return enrichCharactersWithBackground(characters);
}

function enrichCharactersWithBackground(characters) {
  return characters.map((character) => {
    const shortName = character.name.replace(/（.*?）|\(.*?\)/g, "");
    const background = PUBLIC_BACKGROUND_LIBRARY.find((item) => item.name === shortName || character.name.includes(item.name));
    if (!background) return character;
    return {
      ...character,
      background: background.publicFacts,
      storyUse: background.storyUse,
      next: background.storyUse,
    };
  });
}

function isEntertainmentProject(projectOrTitle, genre = "", text = "") {
  const source = typeof projectOrTitle === "object"
    ? `${projectOrTitle.title || ""} ${projectOrTitle.genre || ""} ${projectOrTitle.logline || ""}`
    : `${projectOrTitle || ""} ${genre || ""} ${text || ""}`;
  return /娱乐圈|女星|热搜|综艺|演员|明星|影业|顶流|艺人/.test(source);
}

function characterShortName(name = "") {
  return stripMarkdown(name).replace(/（.*?）|\(.*?\)/g, "").trim();
}

function chapterNumberFromLabel(label = "") {
  const match = String(label).match(/\d{1,4}/);
  return match ? Number(match[0]) : 1;
}

function chapterRangeNumbers(label = "") {
  const matches = String(label).match(/\d{1,4}/g)?.map(Number).filter(Number.isFinite) || [];
  if (!matches.length) return [1, 1];
  return [matches[0], matches[matches.length - 1]];
}

function extractRolesForRow(row, characters, protagonist) {
  const text = `${row.target} ${row.event} ${row.clue}`;
  const protagonistName = characterShortName(protagonist);
  const found = characters
    .map((item) => characterShortName(item.name))
    .filter((shortName) => shortName && text.includes(shortName))
    .slice(0, 4);
  const roles = [protagonistName, ...found].filter(Boolean);
  return [...new Set(roles)].slice(0, 5).length ? [...new Set(roles)].slice(0, 5) : ["主角"];
}

function buildChapterTitle(row, chapterNumber, start, end) {
  if (/刘亦菲/.test(row.target || row.event || "") && start <= 1 && end >= 7) {
    const titles = {
      1: "这个算命的开挂了",
      2: "七块钱的信任",
      3: "这张脸就是天赋",
      4: "北京很大，但她的路更宽",
      5: "白秀珠之后",
      6: "她第一次被镜头记住",
      7: "三个月的倒计时",
    };
    if (titles[chapterNumber]) return titles[chapterNumber];
  }
  const base = summarizeNodeTitle(row.target || row.event || "章节节点").replace(/^\d+[-\d]*\s*/, "");
  if (start === end) return base;
  const position = chapterNumber - start + 1;
  const total = Math.max(1, end - start + 1);
  if (total <= 3) return `${base}（${position}/${total}）`;
  if (position === 1) return `${base}开局`;
  if (position === total) return `${base}收束`;
  if (position === Math.ceil(total / 2)) return `${base}转折`;
  return `${base}推进${position}`;
}

function splitEventBeats(value = "") {
  const beats = String(value || "")
    .split(/\s*(?:→|->|，|,|；|;|。|\n)\s*/)
    .map((item) => stripMarkdown(item))
    .filter(Boolean);
  return beats.length ? beats : ["危机出现", "主角选择", "结果落地"];
}

function pickBeat(beats, index, fallback = "") {
  return beats[index] || beats[beats.length - 1] || fallback || "继续推进主线";
}

function outlineRoleNames(roles = []) {
  return [...new Set((roles || []).map((role) => characterShortName(role)).filter(Boolean))];
}

function describeChapterArc(row, position, total, entertainmentPreset) {
  const beats = splitEventBeats(row.event || row.target);
  const target = stripMarkdown(row.target || "主线节点");
  const clue = row.clue && row.clue !== "—" ? stripMarkdown(row.clue) : "";
  const phase = total === 1
    ? "单章完成"
    : position === 1
      ? "节点开场"
      : position === total
        ? "节点收束"
        : position === Math.ceil(total / 2)
          ? "中段转折"
          : "递进推进";
  const first = pickBeat(beats, Math.max(0, position - 1), target);
  const next = pickBeat(beats, position, first);
  const final = pickBeat(beats, beats.length - 1, first);

  if (entertainmentPreset) {
    return {
      phase,
      opening: `陈玄在城中村、剧组门口或通告现场遇到麻烦，${first}先压到眼前。`,
      sceneOne: `陈玄被房租、反噬、通告变化或剧组门槛逼到台面上。旁人先质疑，他先处理眼前结果。`,
      sceneTwo: `关键角色带着和${next}有关的物件出现：报纸、报名照、电话、通知单或剧本片段。她先犹豫，再被一个结果推着往前走。`,
      sceneThree: clue
        ? `系统或现实给出代价：${clue}只露成数字、提示框或一句旁人听不懂的话。`
        : `系统或现实给出代价。提示框亮起，电话响起，剧组消息传来，压力被推到下一场。`,
      sceneFour: `${final}落成一个可见结果：预言兑现、试镜电话打来、角色机会落地，或一个人从怀疑变成愿意再找陈玄。`,
      hook: clue
        ? `陈玄刚松一口气，系统面板上的${clue}又跳了一次。`
        : `陈玄刚把这件事压下去，门外又传来新的脚步声。`,
    };
  }

  return {
    phase,
    opening: `现场先出问题，${first}把主角逼到人前。`,
    sceneOne: `${target}变成一个可见阻碍。有人挡路，有人质疑，有东西缺失，主角必须先处理眼前结果。`,
    sceneTwo: `让${next}反咬主角。不要长解释，用物件、证据、任务清单或一句对话让局势变硬。`,
    sceneThree: clue ? `伏笔只露一角：${clue}。本章不讲清全部原因，只让它改变一个人的选择。` : "给出一次选择和代价，让主角赢一小步，但留下下一步麻烦。",
    sceneFour: `把${final}推成结果。场面有人让步，有人记仇，有一条新线被迫打开。`,
    hook: `结果刚落地，新的麻烦已经追到门口。`,
  };
}

function buildLiuyifeiEarlyOutline(row, chapterNumber, goldFingerPowers = []) {
  const powerFocus = goldFingerPowers.length
    ? goldFingerPowers.map((power) => String(typeof power === "string" ? power : power.name || power.label || "").trim()).filter(Boolean).join(" / ")
    : "预言校准 / 身体强化 / 星运赋能 / 结果回收";
  const early = {
    1: {
      title: "这个算命的开挂了",
      core: "系统激活 → 第一次预言兑现 → 刘亦菲拿报纸出现 → 反噬值跳到30%",
      opening: "陈玄蹲在城中村路边啃馒头，兜里只剩七块钱。房东从巷口走过来，要他今天交房租。",
      scenes: [
        {
          title: "走投无路",
          words: 400,
          content: "房东当众涨房租，几个打牌的大爷跟着笑。陈玄咽下馒头，只说再宽限三天。脑子里突然叮一声，系统提示宿主处于生存危机，赠送新手预言一次。",
          systemLines: ["【预言系统已激活】", "→ 检测到宿主处于生存危机", "→ 赠送新手预言次数：1次"],
        },
        {
          title: "随手一预言",
          words: 500,
          content: "系统提示一辆自行车会撞过来。陈玄还以为饿出幻觉，街对面男生骑车冲来，为躲狗撞翻房东茶水摊。全场安静，陈玄确认系统是真的。",
          systemLines: ["【新手预言已兑现】", "→ 验证通过", "→ 倒计时：72小时后系统正式启动"],
        },
        {
          title: "系统规则弹出",
          words: 300,
          content: "陈玄回到不足十平的出租屋，面板弹出规则：预言消耗星运能量，成功可升级，超负荷触发反噬。两日内必须找到高星运目标建立羁绊。",
          systemLines: ["【警告：预言成功率100%，但反噬不可逆】", "→ 请在两日内找到高星运目标建立羁绊", "→ 否则72小时后系统自动解除，宿主承受全部反噬"],
        },
        {
          title: "刘亦菲出现",
          words: 800,
          content: "第二天下午，刘亦菲拿着《北京晚报》站到摊前，问能不能算命。陈玄看见星运值99/100，压住心跳，让她坐下。他一眼点破她想问演员路，并说她25岁前会红到出门戴口罩。",
          systemLines: ["【刘亦菲·星运值：99/100】", "→ 当前身份：普通中学生", "→ 未来潜力：顶流巨星", "→ 首次发现高星运目标，奖励星运能量+50"],
        },
      ],
      hook: "这句话触发系统第一次全力运转，面板上的反噬值从0%跳到30%。",
    },
    2: {
      title: "七块钱的信任",
      core: "反噬升级 → 刘亦菲再次出现 → 七块钱算命费 → 三天内试镜电话预言",
      opening: "刘亦菲走后，陈玄盯着30%的反噬值，脑子飞快转。他必须让她真正相信自己。",
      scenes: [
        { title: "反噬升级", words: 600, content: "晚上十点反噬值跳到50%。系统提示高星运目标信任度越高，反噬增长越慢。陈玄回想刘亦菲离开前那句“等我爸回来”，知道这还不是信任。", systemLines: ["【反噬值：50%】", "→ 高星运目标信任不足", "→ 剩余时间：48小时"] },
        { title: "她又来了", words: 750, content: "第二天中午，刘亦菲拿着赵薇小燕子的海报再来。她说同学和母亲都觉得她做梦。陈玄没有安慰，只把2002年、北京电影学院、被导演看中这些结果摆出来。", systemLines: [] },
        { title: "七块钱落桌", words: 450, content: "刘亦菲从兜里掏出七块钱，说昨天忘给算命费。陈玄看到钱就笑了。系统提示信任度从10%涨到35%，反噬速度减缓。", systemLines: ["【信任度：10%→35%】", "→ 反噬值增长速度减缓", "→ 当前反噬：65%"] },
        { title: "关键预言发动", words: 500, content: "周五晚上，陈玄去老小区楼下找她。她在路灯下背剧本。他告诉她《金粉世家》剧组会在三天内打电话。刘亦菲攥紧剧本，说她信。", systemLines: ["【信任度：35%→55%】", "→ 触发中级羁绊：星运共鸣"] },
      ],
      hook: "三天后，选角导演会翻到一张报名照。但陈玄当晚先发起40度高烧。",
    },
    3: {
      title: "这张脸就是天赋",
      core: "试镜电话兑现 → 反噬升到80% → 陈玄决定北上",
      opening: "陈玄烧了一整夜。第二天房东敲门要房租时，他差点没从床上爬起来。",
      scenes: [
        { title: "电话来了", words: 700, content: "第三天下午，刘亦菲家的电话响起。《金粉世家》选角组邀请她去北京试镜。她挂掉电话就跑到巷口，喊电话真的来了。陈玄脸色发白，只说小感冒。", systemLines: ["【预言完成80%】", "→ 试镜通过率提升至95%", "→ 反噬值：65%→80%"] },
        { title: "反噬大爆发", words: 500, content: "晚上陈玄在公共厕所吐了一次。系统建议寻找其他高好感度成年异性稀释反噬，但他现在除了刘亦菲谁都不认识。", systemLines: ["【反噬值：80%】", "→ 24小时后触发不可逆伤害", "→ 当前高星运目标未满18周岁，不可进行高级消除"] },
        { title: "事业型羁绊", words: 450, content: "系统给出事业型羁绊方案。陈玄盯着这四个字，决定必须让刘亦菲拿到角色，用事业结果稳定星运。", systemLines: ["【可建立事业型羁绊】", "→ 目标事业成功可降低反噬增长"] },
        { title: "决心北上", words: 550, content: "刘亦菲和母亲来告别。陈玄告诉她，到北京不要装别人，她的脸就是天赋。母女离开后，他把最后的钱交房租，收拾旧背包准备去北京。", systemLines: [] },
      ],
      hook: "这一趟北上会改掉两个人的命运，系统面板上的反噬值还在发烫。",
    },
    4: {
      title: "北京很大，但她的路更宽",
      core: "陈玄北上 → 守到刘亦菲试镜 → 白秀珠机会落地 → 反噬延迟",
      opening: "2002年9月，北京西站。陈玄背着旧书包出站，被人流挤得踉跄了一下。",
      scenes: [
        { title: "北京初遇", words: 650, content: "陈玄住进一晚十五块的地下室旅馆，去《金粉世家》剧组附近守着。下午系统提示高星运目标接近，他看见刘亦菲和母亲从出租车下来。", systemLines: ["【检测到高星运目标接近】", "→ 距离约200米"] },
        { title: "暗中护航", words: 500, content: "陈玄没资格进楼，只坐在对面台阶等。系统不断弹出导演、副导演、摄影师的正面反应。刘亦菲出来后攥拳跳了一下，他没有过去打扰。", systemLines: ["【刘亦菲试镜进行中】", "→ 导演反应：正面", "→ 摄影师看了她三眼"] },
        { title: "反噬再逼", words: 550, content: "晚上反噬值升到85%。陈玄躺在地下室床上，看着天花板水渍，知道剩下5%的失败概率也足够要命。", systemLines: ["【当前反噬值：85%】", "→ 剩余时间：36小时"] },
        { title: "白秀珠通知函", words: 500, content: "第二天中午，刘亦菲拿着通知函跑到旅馆楼下。陈玄看到白秀珠三个字，系统确认首次完整预言达成，反噬延迟三个月。", systemLines: ["【预言：刘亦菲出演《金粉世家》已确认】", "→ 星运能量+100", "→ 反噬值：85%→70%"] },
      ],
      hook: "反噬只是延迟了三个月。北京这座城里，他还只有一个人和一个刚拿到角色的女孩。",
    },
    5: {
      title: "白秀珠之后",
      core: "刘亦菲进组 → 事业型羁绊建立 → 陈玄不进片场但每天补位",
      opening: "白秀珠这个名字还没公开，系统上已经开始显示刘亦菲的星运变化。",
      scenes: [
        { title: "第一场七次卡", words: 700, content: "刘亦菲第一场戏被导演喊了七次卡。她眼睛红了，去洗手间待五分钟，出来继续拍。陈玄没进片场，只在外面看通告时间。", systemLines: [] },
        { title: "不出现的护航", words: 500, content: "陈玄每天早晨买好水和热包子，托剧务放在她能拿到的位置。他不说是自己送的，只确保她不会饿着上戏。", systemLines: ["【事业型羁绊稳定】", "→ 目标事业消耗降低"] },
        { title: "镜头第一次记住她", words: 600, content: "摄影师临时多给刘亦菲一个近景。她照陈玄说的那样不装别人，安静站住。监视器前有人停下，问这个新人叫什么。", systemLines: ["【镜头记忆点形成】", "→ 星运值短暂上浮"] },
        { title: "关系边界", words: 400, content: "刘亦菲下戏后想找陈玄道谢，陈玄只在巷口把热水递给她母亲。他清楚她未成年，所有帮助都只能落在事业和安全上。", systemLines: [] },
      ],
      hook: "当天夜里，系统提示三个月后下一次反噬需要新的成年高星运目标。",
    },
    6: {
      title: "她第一次被镜头记住",
      core: "片场小爆点 → 陈玄判断娱乐圈规则 → 下一位女星线索露头",
      opening: "剧组临时改通告，刘亦菲的戏被提前到上午。陈玄在片场外看到一张被风吹落的通告单。",
      scenes: [
        { title: "通告单改名", words: 550, content: "通告单上刘亦菲的名字从靠后挪到前面。场务说是导演临时调整，旁边几个演员都看了一眼。", systemLines: [] },
        { title: "小范围出圈", words: 550, content: "监视器前，摄影师和副导演讨论她的脸适合给近景。陈玄没有进去，只从剧务口中听到这句，知道第一步已经成了。", systemLines: ["【事业反馈确认】", "→ 高星运目标曝光机会增加"] },
        { title: "规则不是玄学", words: 500, content: "陈玄拿着通告单，第一次意识到娱乐圈不是只靠预言，座次、镜头、合同、宣发每一项都能改变命运。", systemLines: [] },
        { title: "新线索露头", words: 600, content: "夜里他在报纸上看到中戏演员饭局消息，曾黎的名字露出来。系统只闪了一下，就给出成年高星运目标提示。", systemLines: ["【检测到成年高星运目标线索】", "→ 曾黎", "→ 可缓解下一阶段反噬"] },
      ],
      hook: "陈玄还没见到曾黎，反噬倒计时已经开始重新计数。",
    },
    7: {
      title: "三个月的倒计时",
      core: "第一阶段收束 → 刘亦菲羁绊稳定 → 陈玄准备接入曾黎线",
      opening: "《金粉世家》正式开机后，陈玄在北京终于有了一个能落脚的小房间。",
      scenes: [
        { title: "羁绊稳定", words: 550, content: "刘亦菲的戏份稳定下来，母亲对陈玄的警惕也变成了有限信任。陈玄仍保持距离，只在事业节点上提醒。", systemLines: ["【刘亦菲事业型羁绊稳定】", "→ 反噬延迟维持"] },
        { title: "第一个结果", words: 600, content: "剧组内部开始有人记住白秀珠这个新人。刘亦菲第一次主动说，等戏拍完想请陈玄吃饭。陈玄没有答应，只让她先把戏拍完。", systemLines: [] },
        { title: "代价没有消失", words: 500, content: "晚上反噬值没有继续降，系统提示需要在三个月内建立成年高星运羁绊。陈玄把曾黎的名字写到纸上。", systemLines: ["【反噬延迟剩余：三个月】", "→ 需要成年高星运目标"] },
        { title: "转入下一节点", words: 500, content: "陈玄拿到一张饭局请帖。请帖不是给他的，他得想办法进去。门槛从城中村房租，变成了北京娱乐圈的第一张桌子。", systemLines: [] },
      ],
      hook: "饭局当天，陈玄在门口看见曾黎。系统面板安静了一秒，随后跳出新的星运值。",
    },
  };
  const item = early[chapterNumber];
  if (!item) return null;
  return {
    version: CURRENT_DETAIL_OUTLINE_VERSION,
    chapterTitle: item.title,
    time: chapterNumber <= 3 ? "2002年夏末，江苏某城中村" : "2002年秋，北京",
    place: chapterNumber <= 3 ? "城中村、出租屋、老小区、电话亭" : "北京西站、地下室旅馆、《金粉世家》剧组外",
    core: item.core,
    sourceNode: `${row.chapter}｜${row.target}`,
    phase: chapterNumber === 1 ? "节点开场" : chapterNumber === 7 ? "节点收束" : "递进推进",
    opening: item.opening,
    powerFocus,
    scenes: item.scenes,
    roles: ["陈玄", "刘亦菲"],
    clues: row.clue ? [stripMarkdown(row.clue)] : [],
    requirements: [
      "只写动作和结果，不让人物原地解释系统设定。",
      `金手指重点：${powerFocus}。正文里要写出一次预言兑现、一次体能变化或一次给女明星赋能，并写出代价。`,
      "刘亦菲未成年阶段只写事业守护、信任和资源帮助，不写成人暧昧。",
      "系统提示可以作为故事内提示框出现，但正文不能出现工作台提示、粗纲标签或写作要求。",
    ],
    hook: item.hook,
  };
}

function buildDetailedOutline(row, chapterNumber, start, end, roles, entertainmentPreset, goldFingerPowers = []) {
  const powerFocus = goldFingerPowers.length
    ? goldFingerPowers.map((power) => String(typeof power === "string" ? power : power.name || power.label || "").trim()).filter(Boolean).join(" / ")
    : "预言校准 / 身体强化 / 星运赋能 / 结果回收";
  if (entertainmentPreset && /刘亦菲/.test(`${row.target || ""}${row.event || ""}`) && start <= 1 && end >= 7) {
    const early = buildLiuyifeiEarlyOutline(row, chapterNumber, goldFingerPowers);
    if (early) return early;
  }
  const position = chapterNumber - start + 1;
  const total = Math.max(1, end - start + 1);
  const title = buildChapterTitle(row, chapterNumber, start, end);
  const roleNames = outlineRoleNames(roles);
  const roleText = roleNames.join("、") || "主角";
  const arc = describeChapterArc(row, position, total, entertainmentPreset);
  const words = entertainmentPreset
    ? [450, 650, 550, 500]
    : [450, 650, 600, 450];

  return {
    version: CURRENT_DETAIL_OUTLINE_VERSION,
    chapterTitle: title,
    time: entertainmentPreset ? "2002年前后，按粗纲时间线推进" : "沿当前卷时间线推进",
    place: entertainmentPreset ? "城中村、出租屋、剧组门口、电话亭或报纸摊" : "当前任务现场和关键转场点",
    core: `${row.target || title}：${row.event || row.target || title}`,
    sourceNode: `${row.chapter}｜${row.target || title}`,
    phase: arc.phase,
    opening: arc.opening,
    powerFocus,
    scenes: [
      { title: `${arc.phase}的麻烦`, words: words[0], content: arc.sceneOne },
      { title: "第一次交锋", words: words[1], content: arc.sceneTwo },
      { title: "代价露头", words: words[2], content: arc.sceneThree },
      { title: position === total ? "节点收束" : "结果推进", words: words[3], content: arc.sceneFour },
    ],
    roles: roleNames,
    clues: row.clue && row.clue !== "—" ? [stripMarkdown(row.clue)] : [],
    requirements: [
      `必须出场：${roleText}。每个人至少做一个动作，动作后要有结果。`,
      `金手指重点：${powerFocus}。正文里必须把“预言校准 / 身体强化 / 星运赋能 / 结果回收”写成可见动作与代价，不要只当设定名词。`,
      entertainmentPreset
        ? "娱乐圈物件至少落一个：报纸、报名照、试镜电话、剧组通知、通告单、后台监视器。"
        : "现场物件至少落一个：证据、清单、地图、物资、门禁、坐标或任务单。",
      "正文只写场面、动作、对话和后果，不把写作要求、粗纲节点、细纲说明写进正文。",
    ],
    hook: arc.hook,
  };
}

function buildChapterDirectory(outlineRows, characters, protagonist, entertainmentPreset, totalChapters = 0, goldFingerPowers = []) {
  const chapters = [];
  const maxChapters = Math.min(totalChapters || 2000, 2000);

  for (const row of outlineRows) {
    const [start, rawEnd] = chapterRangeNumbers(row.chapter);
    const end = Math.max(start, rawEnd);
    for (let chapterNumber = start; chapterNumber <= end; chapterNumber += 1) {
      if (chapters.some((chapter) => chapter.id === chapterNumber)) continue;
      const roles = extractRolesForRow(row, characters, protagonist);
      const title = buildChapterTitle(row, chapterNumber, start, end);
      const detailedOutline = buildDetailedOutline(row, chapterNumber, start, end, roles, entertainmentPreset, goldFingerPowers);
      chapters.push({
        id: chapterNumber,
        title,
        status: chapters.length === 0 ? "写作中" : "待写",
        progress: chapters.length === 0 ? 8 : 0,
        score: null,
        outline: row.event || row.target,
        roughOutline: row,
        detailedOutline,
        roles,
        clues: row.clue ? [row.clue] : [],
        manuscript: "",
        scoreDetail: null,
        targetWords: 2200,
      });
      if (chapters.length >= maxChapters) break;
    }
    if (chapters.length >= maxChapters) break;
  }

  return chapters.sort((a, b) => a.id - b.id);
}

function isLegacyDetailedOutline(detail) {
  return Array.isArray(detail) || !detail || detail.version !== CURRENT_DETAIL_OUTLINE_VERSION || !Array.isArray(detail.scenes);
}

function migrateChapterOutline(chapter, project, force = false) {
  if (!chapter) return;
  const legacy = isLegacyDetailedOutline(chapter.detailedOutline);
  if (!force && chapter.detailOutlineEditedAt && !legacy) return;
  if (!force && !legacy && !chapter.detailOutlineEditedAt) return;
  const rough = chapter.roughOutline || {
    chapter: padChapter(chapter.id),
    target: chapter.title,
    event: chapter.outline || chapter.title,
    clue: chapter.clues?.[0] || "等待回收",
  };
  const [start, rawEnd] = chapterRangeNumbers(rough.chapter || chapter.id);
  const end = Math.max(start, rawEnd);
  const roles = chapter.roles?.length ? chapter.roles : extractRolesForRow(rough, project.characters || [], project.characters?.[0]?.name || "");
  chapter.roughOutline = rough;
  if (force || legacy || !chapter.detailOutlineEditedAt) {
    chapter.detailedOutline = buildDetailedOutline(rough, chapter.id, start, end, roles, isEntertainmentProject(project), project.goldFingerPowers || []);
  }
  chapter.title = chapter.title || chapter.detailedOutline.chapterTitle;
  chapter.outline = chapter.outline || rough.event || rough.target;
}

function roughRowIncludesChapter(row, chapterId) {
  const [start, rawEnd] = chapterRangeNumbers(row?.chapter || chapterId);
  const end = Math.max(start, rawEnd);
  return Number(chapterId) >= start && Number(chapterId) <= end;
}

function updateChapterFromRoughRow(project, chapter, row, { forceDetail = true } = {}) {
  if (!project || !chapter || !row) return;
  const [start, rawEnd] = chapterRangeNumbers(row.chapter || chapter.id);
  const end = Math.max(start, rawEnd);
  const roles = chapter.roles?.length
    ? chapter.roles
    : extractRolesForRow(row, project.characters || [], project.characters?.[0]?.name || "");
  chapter.roughOutline = { ...row };
  chapter.outline = row.event || row.target || chapter.outline || chapter.title;
  chapter.clues = row.clue && row.clue !== "—" ? [row.clue] : [];
  if (forceDetail || !chapter.detailedOutline || isLegacyDetailedOutline(chapter.detailedOutline)) {
    const previousManuallyEdited = Boolean(chapter.detailOutlineEditedAt);
    chapter.detailedOutline = buildDetailedOutline(row, Number(chapter.id), start, end, roles, isEntertainmentProject(project), project.goldFingerPowers || []);
    chapter.detailOutlineEditedAt = previousManuallyEdited ? new Date().toISOString() : chapter.detailOutlineEditedAt;
  } else if (!Array.isArray(chapter.detailedOutline)) {
    chapter.detailedOutline = {
      ...chapter.detailedOutline,
      core: `${row.target || chapter.title}：${row.event || row.target || chapter.outline}`,
      sourceNode: `${row.chapter}｜${row.target || chapter.title}`,
      clues: row.clue && row.clue !== "—" ? [stripMarkdown(row.clue)] : [],
      updatedFromRoughAt: new Date().toISOString(),
    };
  }
  if (!chapter.manuscript) {
    chapter.title = buildChapterTitle(row, Number(chapter.id), start, end);
  }
  chapter.generationPrompt = buildChapterGenerationPrompt(project, chapter, chapter.detailedOutline);
  chapter.generationContract = buildChapterGenerationContract(project, chapter);
}

function syncChaptersFromOutlineRows(project, { forceDetail = true } = {}) {
  let changed = 0;
  for (const chapter of project.chapters || []) {
    const row = (project.outlineRows || []).find((item) => roughRowIncludesChapter(item, chapter.id));
    if (!row) continue;
    updateChapterFromRoughRow(project, chapter, row, { forceDetail });
    changed += 1;
  }
  project.chapterPlanCount = project.chapters?.length || 0;
  project.outlineNodeCount = project.outlineRows?.length || 0;
  project.outlineUpdatedAt = new Date().toISOString();
  return changed;
}

function refreshLegacyChapterScores(project) {
  let changed = false;
  for (const chapter of project.chapters || []) {
    if (!chapter.manuscript || !chapter.scoreDetail || chapter.scoreMeta?.method === CURRENT_RUBRIC_METHOD) continue;
    const audit = auditChapterDraft(project, chapter);
    chapter.scoreDetail = audit.detail;
    chapter.score = audit.score;
    chapter.scoreMeta = audit.meta;
    chapter.reviewIssues = audit.issues;
    chapter.reviewPassed = audit.passed;
    chapter.scoreNotes = audit.notes;
    changed = true;
  }
  if (changed) {
    const scores = project.chapters.filter((chapter) => chapter.score).map((chapter) => chapter.score);
    if (scores.length) project.averageScore = Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length);
  }
  return changed;
}

function ensureProjectPlanning(project) {
  if (!project) return;
  project.chapterTargetWords = Math.min(3000, Math.max(2200, Number(project.chapterTargetWords) || 2200));
  if (typeof project.styleSample !== "string") project.styleSample = DEFAULT_STYLE_SAMPLE;
  if (!Array.isArray(project.styleProfile)) project.styleProfile = [];
  if (!Array.isArray(project.learnedRules)) project.learnedRules = [];
  project.generationRules = generationWordRules(project.chapterTargetWords);
  ensureStyleControls(project);
  const protagonist = project.characters?.[0]?.name || "";
  const entertainmentPreset = isEntertainmentProject(project);
  project.goldFingerPowers = mergeGoldFingerPowers(project.goldFingerPowers, defaultGoldFingerPowers(entertainmentPreset));

  if (project.outlineRows?.length && (!project.chapters?.length || !project.chapters[0]?.detailedOutline)) {
    const generated = buildChapterDirectory(project.outlineRows, project.characters || [], protagonist, entertainmentPreset, project.totalChapters || 0, project.goldFingerPowers || []);
    const existingById = new Map((project.chapters || []).map((chapter) => [chapter.id, chapter]));
    project.chapters = generated.map((chapter) => ({
      ...chapter,
      ...(existingById.get(chapter.id) || {}),
      detailedOutline: existingById.get(chapter.id)?.detailedOutline || chapter.detailedOutline,
      roughOutline: existingById.get(chapter.id)?.roughOutline || chapter.roughOutline,
      targetWords: project.chapterTargetWords,
    }));
  }

  if (project.outlineRows?.length && project.planVersion !== CURRENT_PROJECT_PLAN_VERSION) {
    syncChaptersFromOutlineRows(project, { forceDetail: false });
    project.planVersion = CURRENT_PROJECT_PLAN_VERSION;
  }

  project.chapters?.forEach((chapter) => {
    chapter.targetWords = activeTargetWords(project, chapter);
    if (!chapter.manuscript) chapter.manuscript = "";
    migrateChapterOutline(chapter, project);
    normalizeChapterDraft(project, chapter, 3000);
  });

  refreshLegacyChapterScores(project);
  project.chapterPlanCount = project.chapters?.length || 0;
  project.words = projectWordCount(project);
  const scores = project.chapters.filter((chapter) => chapter.score).map((chapter) => chapter.score);
  project.averageScore = scores.length ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length) : null;
}

function buildImportedProject(text, sourceName = "") {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const title = extractTitle(text, sourceName);
  const totalChapters = extractTotalChapters(text);
  const genre = extractSimpleValue(text, "题材");
  const protagonist = extractSimpleValue(text, "男主");
  const timeSpan = extractSimpleValue(text, "时间跨度");
  const volumes = buildVolumes(lines, totalChapters);
  const outlineRows = buildOutlineRows(lines);
  const clues = buildClues(lines);
  const characters = buildCharacters(lines, protagonist);
  const entertainmentPreset = isEntertainmentProject(title, genre, text);
  const chapters = buildChapterDirectory(outlineRows, characters, protagonist, entertainmentPreset, totalChapters || 0, defaultGoldFingerPowers(entertainmentPreset));

  const activeChapter = chapters[0]?.id || Number(String(outlineRows[0]?.chapter || "1").split("-")[0].replace(/[^\d]/g, "")) || 1;
  const rawOutlineText = text.trim();
  const coverageChapters = Math.max(...volumes.map((volume) => chapterEnd(volume.range)), 0);
  const rowCoverage = Math.max(...outlineRows.map((row) => chapterEnd(row.chapter)), 0);
  const parsedChapters = totalChapters && coverageChapters >= totalChapters * 0.8
    ? totalChapters
    : Math.min(totalChapters || rowCoverage || outlineRows.length, coverageChapters || rowCoverage || outlineRows.length);

  return {
    title,
    genre: genre || "自定义题材",
    totalChapters: totalChapters || 2000,
    chapterTargetWords: 2200,
    logline: protagonist
      ? `${protagonist} 的故事主线已从导入大纲识别。`
      : "导入大纲后自动生成项目卖点。",
    currentChapter: activeChapter,
    words: 0,
    outlineParsed: Math.max(parsedChapters, 1),
    outlineNodeCount: outlineRows.length,
    chapterPlanCount: chapters.length,
    coverageChapters,
    styleStatus: "未训练",
    styleConfidence: 0,
    averageScore: null,
    health: {
      outline: Math.min(100, 20 + outlineRows.length * 2),
      character: Math.min(100, 15 + characters.length * 2),
      style: 0,
      audit: 0,
    },
    volumes,
    outlineRows,
    clues,
    characters,
    chapters,
    goldFingerPowers: defaultGoldFingerPowers(entertainmentPreset),
    planVersion: CURRENT_PROJECT_PLAN_VERSION,
    styleProfile: [
      ...(timeSpan ? [{ label: "时间跨度", value: timeSpan }] : []),
      ...(entertainmentPreset ? [{ label: "题材路由", value: "已注入娱乐圈爽文、去 AI 味、尺度审查和高频禁词规则。" }] : []),
    ],
    styleSample: DEFAULT_STYLE_SAMPLE,
    generationRules: generationWordRules(2200),
    styleTags: normalizeStyleTags(DEFAULT_STYLE_TAGS),
    styleBlendProfiles: normalizeStyleBlendProfiles(DEFAULT_STYLE_BLEND_PROFILES),
    styleFusionGoal: DEFAULT_STYLE_FUSION_GOAL,
    learnedRules: entertainmentPreset
      ? [
          ...generationWordRules(2200),
          "热搜、综艺、试镜、红毯、合同和宣发群必须至少落到一个具体场景。",
          "少写全网震惊，多写弹幕、后台监视器、通告单和品牌 brief 的具体反应。",
          "暧昧只写成年人和明确自愿，亲密镜头留白，重点写第二天的关系变化。",
          "生成前检查禁词：眸光、勾唇、全网炸了、杀疯了、气场全开等模板词。",
        ]
      : [],
    tasks: outlineRows.slice(0, 4).map((row, index) => ({
      chapter: row.chapter,
      node: row.target,
      task: index === 0 ? "生成正文" : "拆细大纲",
      roles: extractRolesForRow(row, characters, protagonist).join(" / "),
      status: index === 0 ? "进行中" : "待处理",
      score: "--",
    })),
    sourceFile: sourceName,
    rawOutlineText,
    researchNotes: entertainmentPreset ? ENTERTAINMENT_PATTERNS : [],
    romanceRules: entertainmentPreset ? PUBLISHABLE_ROMANCE_RULES : [],
    forbiddenWords: [...ENTERTAINMENT_FORBIDDEN_WORDS],
    forbiddenWordsSeedVersion: FORBIDDEN_WORD_LIBRARY_VERSION,
    publicBackgrounds: entertainmentPreset ? PUBLIC_BACKGROUND_LIBRARY : [],
    storyRoutes: entertainmentPreset ? STORY_ROUTE_LIBRARY : [],
    parseWarnings: outlineRows.length <= 1 ? ["未识别到完整章节表，已生成兜底节点。"] : [],
  };
}

function getOutlineTextForProject(project) {
  return project.rawOutlineText || DEFAULT_OUTLINE_SAMPLE;
}

function importSummary(project) {
  const nodeCount = project.outlineNodeCount || project.outlineRows.length;
  const volumeCount = project.volumes.length;
  const chapterCount = project.chapterPlanCount || project.chapters.length;
  return `${project.title}：覆盖 ${project.outlineParsed}/${project.totalChapters} 章，粗纲 ${nodeCount} 节点，目录 ${chapterCount} 章，${volumeCount} 卷`;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeForbiddenWord(word = "") {
  return String(word).replace(/[ \t\r\n]+/g, "").trim();
}

function ensureForbiddenWords(project = currentProject()) {
  if (!Array.isArray(project.forbiddenWords)) {
    project.forbiddenWords = [];
  }
  const mergedWords = [...project.forbiddenWords];
  if (project.forbiddenWordsSeedVersion !== FORBIDDEN_WORD_LIBRARY_VERSION) {
    mergedWords.push(...ENTERTAINMENT_FORBIDDEN_WORDS);
    project.forbiddenWordsSeedVersion = FORBIDDEN_WORD_LIBRARY_VERSION;
  }
  const seen = new Set();
  project.forbiddenWords = mergedWords
    .map(normalizeForbiddenWord)
    .filter((word) => {
      if (!word || seen.has(word)) return false;
      seen.add(word);
      return true;
    });
  return project.forbiddenWords;
}

function renderForbiddenWordManager(targetSelector, { limit = 0 } = {}) {
  const project = currentProject();
  const words = ensureForbiddenWords(project);
  const visibleWords = limit ? words.slice(0, limit) : words;
  const hiddenCount = Math.max(0, words.length - visibleWords.length);
  const target = $(targetSelector);
  if (!target) return;
  target.innerHTML = `
    ${visibleWords
      .map(
        (word) => `
          <span class="word-chip editable-word-chip">
            <span>${escapeHtml(word)}</span>
            <button type="button" class="word-chip-delete" data-forbidden-remove="${escapeHtml(word)}" title="删除禁词：${escapeHtml(word)}" aria-label="删除禁词：${escapeHtml(word)}">
              <i data-lucide="x"></i>
            </button>
          </span>
        `,
      )
      .join("")}
    ${hiddenCount ? `<span class="word-chip word-chip-more">另 ${hiddenCount} 个</span>` : ""}
    <form class="word-add-form" data-forbidden-form>
      <input type="text" data-forbidden-input placeholder="新增禁用词/句式" maxlength="80" autocomplete="off" />
      <button type="submit" class="word-add-button" title="新增禁用词" aria-label="新增禁用词">
        <i data-lucide="plus"></i>
      </button>
    </form>
  `;
}

function addForbiddenWord(word) {
  const project = currentProject();
  const normalized = normalizeForbiddenWord(word);
  if (!normalized) {
    showToast("请输入要禁用的高频词。");
    return false;
  }
  const words = ensureForbiddenWords(project);
  if (words.includes(normalized)) {
    showToast(`“${normalized}”已经在禁用列表里。`);
    return false;
  }
  project.forbiddenWords = [...words, normalized];
  refreshForbiddenWordViews();
  saveStateSoon("add-forbidden-word");
  showToast(`已新增禁用词：“${normalized}”。`);
  return true;
}

function removeForbiddenWord(word) {
  const project = currentProject();
  const normalized = normalizeForbiddenWord(word);
  const words = ensureForbiddenWords(project);
  const nextWords = words.filter((item) => item !== normalized);
  if (nextWords.length === words.length) return;
  project.forbiddenWords = nextWords;
  refreshForbiddenWordViews();
  saveStateSoon("remove-forbidden-word");
  showToast(`已删除禁用词：“${normalized}”。`);
}

function refreshForbiddenWordViews() {
  renderStylePage();
  renderSkills();
  renderAudit();
  refreshIcons();
}

function outlineSummary(detail) {
  if (!detail) return "暂无本章细纲";
  if (Array.isArray(detail)) return detail.slice(0, 3).join("<br>");
  const sceneText = (detail.scenes || [])
    .slice(0, 2)
    .map((scene) => `场景：${scene.title}（${scene.words}字）`)
    .join("<br>");
  return [
    `开场：${detail.opening || "等待生成"}`,
    sceneText,
    `钩子：${detail.hook || "等待生成"}`,
  ].filter(Boolean).join("<br>");
}

function renderDetailedOutline(detail) {
  if (!detail) return `<p class="muted">暂无本章细纲。</p>`;
  if (Array.isArray(detail)) {
    return `
      <div class="detail-outline-editor" id="detail-outline-form">
        <label>
          <span>细纲内容</span>
          <textarea data-outline-field="legacy">${escapeHtml(detail.join("\n"))}</textarea>
        </label>
      </div>
    `;
  }

  const scenes = (detail.scenes || [])
    .map((scene, index) => `
      <div class="outline-scene" data-outline-scene="${index}">
        <div class="outline-scene-row">
          <label>
            <span>场景${index + 1}</span>
            <input data-scene-field="title" value="${escapeHtml(scene.title || "")}" />
          </label>
          <label class="scene-words-input">
            <span>字数</span>
            <input data-scene-field="words" type="number" min="100" step="50" value="${Number(scene.words) || 500}" />
          </label>
        </div>
        <textarea data-scene-field="content">${escapeHtml(scene.content || "")}</textarea>
        <textarea data-scene-field="systemLines" placeholder="系统提示/面板，一行一条">${escapeHtml((scene.systemLines || []).join("\n"))}</textarea>
      </div>
    `)
    .join("");

  return `
    <div class="detail-outline-editor" id="detail-outline-form">
      <label>
        <span>时间</span>
        <input data-outline-field="time" value="${escapeHtml(detail.time || "")}" />
      </label>
      <label>
        <span>地点</span>
        <input data-outline-field="place" value="${escapeHtml(detail.place || "")}" />
      </label>
      <label>
        <span>核心</span>
        <textarea data-outline-field="core">${escapeHtml(detail.core || "")}</textarea>
      </label>
      <label>
        <span>来源粗纲</span>
        <input data-outline-field="sourceNode" value="${escapeHtml(detail.sourceNode || "")}" />
      </label>
      <label>
        <span>金手指重点</span>
        <textarea data-outline-field="powerFocus">${escapeHtml(detail.powerFocus || goldFingerPowerNames().join(" / "))}</textarea>
      </label>
      <label>
        <span>开场</span>
        <textarea data-outline-field="opening">${escapeHtml(detail.opening || "")}</textarea>
      </label>
      <h4>主线推进</h4>
      ${scenes}
      <label>
        <span>约束（一行一条）</span>
        <textarea data-outline-field="requirements">${escapeHtml((detail.requirements || []).join("\n"))}</textarea>
      </label>
      <label>
        <span>章末钩子</span>
        <textarea data-outline-field="hook">${escapeHtml(detail.hook || "")}</textarea>
      </label>
    </div>
  `;
}

function readOutlineField(name) {
  return $(`[data-outline-field="${name}"]`)?.value?.trim() || "";
}

function collectDetailedOutlineFromEditor(existing = {}) {
  const legacy = readOutlineField("legacy");
  if (legacy) return legacy.split(/\n+/).map((line) => line.trim()).filter(Boolean);

  const scenes = $$("#chapter-detail-outline [data-outline-scene]").map((node, index) => {
    const title = $("[data-scene-field='title']", node)?.value?.trim() || `场景${index + 1}`;
    const words = Number($("[data-scene-field='words']", node)?.value) || 500;
    const content = $("[data-scene-field='content']", node)?.value?.trim() || "";
    const systemLines = ($("[data-scene-field='systemLines']", node)?.value || "")
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
    return { title, words, content, systemLines };
  });

  return {
    ...(existing || {}),
    version: CURRENT_DETAIL_OUTLINE_VERSION,
    time: readOutlineField("time"),
    place: readOutlineField("place"),
    core: readOutlineField("core"),
    sourceNode: readOutlineField("sourceNode") || existing?.sourceNode || "",
    powerFocus: readOutlineField("powerFocus") || existing?.powerFocus || goldFingerPowerNames().join(" / "),
    opening: readOutlineField("opening"),
    scenes,
    requirements: readOutlineField("requirements").split(/\n+/).map((line) => line.trim()).filter(Boolean),
    hook: readOutlineField("hook"),
    editedAt: new Date().toISOString(),
  };
}

function markDetailOutlineDirty(isDirty = true) {
  const button = $("#save-detail-outline");
  if (!button) return;
  button.classList.toggle("dirty", isDirty);
  button.textContent = isDirty ? "保存细纲*" : "保存细纲";
}

async function saveCurrentDetailOutline() {
  const project = currentProject();
  const chapter = selectedChapter();
  if (!chapter) {
    showToast("当前没有可保存的章节细纲。");
    return;
  }
  chapter.detailedOutline = collectDetailedOutlineFromEditor(chapter.detailedOutline);
  if (!Array.isArray(chapter.detailedOutline)) {
    chapter.outline = chapter.detailedOutline.core || chapter.outline;
    chapter.generationPrompt = buildChapterGenerationPrompt(project, chapter, chapter.detailedOutline);
    chapter.generationContract = buildChapterGenerationContract(project, chapter);
  }
  chapter.detailOutlineEditedAt = new Date().toISOString();
  const continuity = refreshProjectStoryMemory(project, chapter);
  $("#chapter-continuity").innerHTML = renderContinuityMemory(continuity);
  markDetailOutlineDirty(false);
  renderChapters(chapter.id);
  await saveStateNowWithMessage("save-detail-outline", `第 ${chapter.id} 章细纲已保存。`);
}

function collectOutlineRowsFromDom() {
  const currentRows = currentProject().outlineRows || [];
  return $$("#outline-table [data-outline-row]").map((node, index) => {
    const previous = currentRows[index] || {};
    const valueFor = (field) => $(`[data-outline-row-field="${field}"]`, node)?.value?.trim() || "";
    return {
      ...previous,
      chapter: valueFor("chapter") || previous.chapter || padChapter(index + 1),
      target: valueFor("target") || "待补章节目标",
      event: valueFor("event") || valueFor("target") || "待补关键事件",
      clue: valueFor("clue") || "—",
      status: valueFor("status") || previous.status || "待写",
    };
  }).filter((row) => row.chapter && row.chapter !== "-");
}

async function saveOutlineRows({ forceDetail = false } = {}) {
  const project = currentProject();
  if (!project.outlineRows?.length) {
    showToast("当前没有可保存的粗纲节点。");
    return;
  }
  project.outlineRows = collectOutlineRowsFromDom().sort((a, b) => chapterStart(a.chapter) - chapterStart(b.chapter));
  const changed = syncChaptersFromOutlineRows(project, { forceDetail });
  renderAll();
  $("#save-outline-nodes")?.classList.remove("dirty");
  await saveStateNowWithMessage(
    forceDetail ? "save-outline-rows-regenerate-detail" : "save-outline-rows",
    forceDetail ? `粗纲已保存，并重生成 ${changed} 章细纲。` : `粗纲已保存，并同步 ${changed} 章章节来源。`,
  );
}

async function refreshAllDetailOutlinesFromOutline() {
  await saveOutlineRows({ forceDetail: true });
}

function editChapterOutlineFromDirectory(chapterId) {
  const id = Number(chapterId);
  if (!Number.isFinite(id)) return;
  selectChapter(id);
  switchPage("writer");
  window.setTimeout(() => $("#chapter-detail-outline")?.scrollIntoView({ block: "start", behavior: "smooth" }), 0);
}

async function importOutlineFromFile(file) {
  if (!file) return;
  const supported = /\.(txt|md|markdown)$/i.test(file.name);
  if (!supported) {
    showToast("当前前端原型支持 .txt/.md 大纲；doc/docx 需要接服务端解析。");
    return;
  }

  try {
    const text = decodeOutlineBuffer(await file.arrayBuffer());
    if (!text.trim()) throw new Error("文件内容为空");
    if ((text.match(/\0/g) || []).length > 5) throw new Error("文件看起来是二进制文档，请先转成 txt/md");

    const projectId = state.pendingImportProjectId || state.activeProjectId;
    const project = state.projects.find((item) => item.id === projectId) || currentProject();
    const imported = buildImportedProject(text, file.name);

    Object.assign(project, imported);
    state.activeProjectId = project.id;
    state.activeChapterId = project.chapters[0]?.id || imported.currentChapter || 1;
    state.pendingImportProjectId = null;

    renderAll();
    switchPage("outline");
    saveStateSoon("import-outline-file");
    showToast(`导入成功：${importSummary(project)}。`);
  } catch (error) {
    state.pendingImportProjectId = null;
    showToast(`导入失败：${error.message || "无法读取文件"}`);
  }
}

function applyOutlineText() {
  const project = currentProject();
  const text = $("#outline-input").value || "";
  const imported = buildImportedProject(text, project.sourceFile || "手动文本");
  const previousTitle = project.title;

  Object.assign(project, imported);
  project.title = imported.title || previousTitle;
  project.rawOutlineText = text.trim();
  project.sourceFile = project.sourceFile || "手动粘贴";
  state.activeChapterId = project.chapters[0]?.id || imported.currentChapter || 1;

  renderAll();
  switchPage("outline");
  saveStateSoon("apply-outline-text");
  showToast(`已使用当前文本导入：${importSummary(project)}。`);
}

function openOutlinePicker(targetProjectId = state.activeProjectId) {
  state.pendingImportProjectId = targetProjectId;
  switchPage("outline");
  window.setTimeout(() => $("#outline-file")?.click(), 0);
}

function switchPage(pageId) {
  $$(".page").forEach((page) => page.classList.toggle("active", page.id === pageId));
  $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.page === pageId));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderProjectSelect() {
  const select = $("#project-select");
  select.innerHTML = state.projects
    .map((project) => `<option value="${project.id}">${project.title}</option>`)
    .join("");
  select.value = state.activeProjectId;
  $(".sidebar-status strong").textContent = `${state.projects.length} 个项目`;
}

function renderProjectList() {
  $("#project-count").textContent = `${state.projects.length} 个项目`;
  $("#project-list").innerHTML = state.projects
    .map((project) => {
      const active = project.id === state.activeProjectId ? "active" : "";
      const score = project.averageScore ? `${project.averageScore} 分` : "未评分";
      const parsedLabel = project.outlineNodeCount
        ? `覆盖${project.outlineParsed}/${project.totalChapters}章 · 展示${project.outlineNodeCount}节点`
        : `${project.outlineParsed}/${project.totalChapters}`;
      return `
        <article class="project-card ${active}" data-project="${project.id}">
          <div>
            <strong>${project.title}</strong>
            <span>${project.genre} · ${project.totalChapters} 章目标</span>
          </div>
          <div class="project-card-meta">
            <span>大纲 ${parsedLabel}</span>
            <span>文风 ${project.styleStatus}</span>
            <span>均分 ${score}</span>
          </div>
          <div class="project-card-actions">
            <button type="button" class="mini-button" data-project-open="${project.id}" title="打开项目">
              <i data-lucide="folder-open"></i><span>打开</span>
            </button>
            <button type="button" class="mini-button danger" data-project-delete="${project.id}" title="删除项目">
              <i data-lucide="trash-2"></i><span>删除</span>
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderDashboard() {
  const project = currentProject();
  project.words = projectWordCount(project);
  $("#dashboard-title").textContent = project.title;
  $("#metric-total").textContent = project.totalChapters;
  $("#metric-outline").textContent = project.outlineParsed
    ? `覆盖 ${project.outlineParsed}/${project.totalChapters} 章，粗纲 ${project.outlineNodeCount || project.outlineRows.length} 节点，目录 ${project.chapterPlanCount || project.chapters.length} 章`
    : "待导入大纲";
  $("#metric-current").textContent = project.currentChapter ? `第 ${project.currentChapter} 章` : "第 0 章";
  $("#metric-words").textContent = `正文 ${formatWordCount(project.words)}`;
  $("#metric-style").textContent = project.styleStatus;
  $("#metric-style-detail").textContent = project.styleConfidence ? `置信度 ${project.styleConfidence}%` : "等待样章";
  $("#metric-score").textContent = project.averageScore ? `${project.averageScore}` : "--";
  $("#metric-score-detail").textContent = project.averageScore ? "最近 10 章均分" : "完稿后打分";

  $("#task-table").innerHTML = (project.tasks.length ? project.tasks : [{ chapter: "-", node: "等待导入大纲", task: "初始化", roles: "-", status: "待处理", score: "--" }])
    .map(
      (task) => `
        <tr>
          <td>${task.chapter}</td>
          <td>${task.node}</td>
          <td>${task.task}</td>
          <td>${task.roles}</td>
          <td><span class="status ${statusClass(task.status)}">${task.status}</span></td>
          <td>${task.score}</td>
        </tr>
      `,
    )
    .join("");

  $("#health-score").textContent = `${Math.round((project.health.outline + project.health.character + project.health.style + project.health.audit) / 4)}%`;
  $("#health-outline").value = project.health.outline;
  $("#health-character").value = project.health.character;
  $("#health-style").value = project.health.style;
  $("#health-audit").value = project.health.audit;
  $("#pipeline-outline").textContent = project.outlineParsed
    ? `目录 ${project.chapterPlanCount || project.chapters.length}/${project.totalChapters} 章`
    : "待导入";
  $("#pipeline-style").textContent = project.styleConfidence ? `置信度 ${project.styleConfidence}%` : "待训练";
  $("#pipeline-writing").textContent = project.currentChapter ? `第 ${project.currentChapter} 章` : "待开始";
  $("#pipeline-score").textContent = project.averageScore ? `均分 ${project.averageScore}` : "待打分";

  renderRecentScores(project);
}

function renderRecentScores(project) {
  const scored = project.chapters.filter((chapter) => chapter.score);
  $("#recent-score-list").innerHTML = (scored.length ? scored : [{ id: "-", title: "暂无完稿章节", score: "--", scoreDetail: { plot: 0, character: 0, style: 0, hook: 0 } }])
    .map(
      (chapter) => `
        <div class="score-item">
          <strong>第 ${chapter.id} 章 ${chapter.title}</strong>
          <span>${chapter.score} 分</span>
          <meter min="0" max="100" value="${chapter.score || 0}"></meter>
        </div>
      `,
    )
    .join("");
}

function renderOutline() {
  const project = currentProject();
  $("#outline-status").textContent = project.outlineParsed ? "已导入" : "待导入";
  $("#outline-status").className = `status ${project.outlineParsed ? "done" : "wait"}`;
  $("#chapter-node-range").textContent = project.outlineRows.length
    ? `覆盖 ${project.outlineParsed}/${project.totalChapters} 章，粗纲 ${project.outlineRows.length} 节点，目录 ${project.chapterPlanCount || project.chapters.length} 章`
    : "等待拆分";
  $("#outline-input").value = getOutlineTextForProject(project);
  $("#outline-source").textContent = project.sourceFile ? `来源：${project.sourceFile}` : "未选择文件";
  $("#volume-tree").innerHTML = (project.volumes.length ? project.volumes : [{ title: "未导入分卷", range: "-", goal: "导入大纲后自动生成分卷结构", progress: 0 }])
    .map(
      (volume) => `
        <article class="volume-node">
          <div class="volume-title">
            <span>${volume.title}</span>
            <span>${volume.progress}%</span>
          </div>
          <div class="volume-meta">
            <span>章节：${volume.range}</span>
            <span>${volume.goal}</span>
            <meter min="0" max="100" value="${volume.progress}"></meter>
          </div>
        </article>
      `,
    )
    .join("");

  $("#outline-table").innerHTML = (project.outlineRows.length ? project.outlineRows : [{ chapter: "-", target: "等待解析", event: "导入大纲后生成", clue: "-", status: "待处理" }])
    .map(
      (row, index) => `
        <tr data-outline-row="${index}">
          <td><input class="table-input short" data-outline-row-field="chapter" value="${escapeHtml(row.chapter)}" ${project.outlineRows.length ? "" : "disabled"} /></td>
          <td><textarea class="table-textarea" data-outline-row-field="target" ${project.outlineRows.length ? "" : "disabled"}>${escapeHtml(row.target)}</textarea></td>
          <td><textarea class="table-textarea" data-outline-row-field="event" ${project.outlineRows.length ? "" : "disabled"}>${escapeHtml(row.event)}</textarea></td>
          <td><textarea class="table-textarea" data-outline-row-field="clue" ${project.outlineRows.length ? "" : "disabled"}>${escapeHtml(row.clue)}</textarea></td>
          <td>
            <select class="table-select" data-outline-row-field="status" ${project.outlineRows.length ? "" : "disabled"}>
              ${["待写", "写作中", "待处理", "已拆章", "已完成", "待修"].map((status) => `<option value="${status}" ${row.status === status ? "selected" : ""}>${status}</option>`).join("")}
            </select>
          </td>
        </tr>
      `,
    )
    .join("");

  $("#chapter-directory-table").innerHTML = (project.chapters.length ? project.chapters : [{ id: "-", title: "等待生成目录", roughOutline: { chapter: "-" }, detailedOutline: ["导入粗纲后生成每章细纲"], status: "待处理" }])
    .slice(0, 120)
    .map(
      (chapter) => `
        <tr>
          <td>${chapter.id}</td>
          <td>${chapter.title}</td>
          <td>${chapter.roughOutline?.chapter || "-"}</td>
          <td>${outlineSummary(chapter.detailedOutline)}</td>
          <td>
            <span class="status ${statusClass(chapter.status)}">${chapter.status}</span>
            ${project.chapters.length ? `<button type="button" class="mini-button" data-edit-chapter-outline="${chapter.id}">编辑</button>` : ""}
          </td>
        </tr>
      `,
    )
    .join("");

  $("#clue-list").innerHTML = (project.clues.length ? project.clues : [{ name: "暂无伏笔", detail: "导入大纲后自动识别伏笔埋设和回收章节。" }])
    .map(
      (clue) => `
        <div>
          <strong>${clue.name}</strong>
          <span>${clue.detail}</span>
        </div>
      `,
    )
    .join("");
}

function renderCharacters(filter = $("#risk-filter")?.value || "all") {
  const project = currentProject();
  const rows = filter === "all" ? project.characters : project.characters.filter((item) => item.risk === filter);
  $("#character-table").innerHTML = (rows.length ? rows : [{ name: "暂无角色", role: "导入大纲或人物小传后生成", first: "-", plan: "-", actual: "-", risk: "低", relation: "-", next: "-" }])
    .map(
      (item) => `
        <tr>
          <td><strong>${item.name}</strong></td>
          <td>${item.role}</td>
          <td>${item.first}</td>
          <td>${item.plan}</td>
          <td>${item.actual}</td>
          <td><span class="risk-chip ${riskClass(item.risk)}">${item.risk}</span></td>
          <td>${item.relation}</td>
          <td>${item.next}</td>
        </tr>
      `,
    )
    .join("");
  $("#background-list").innerHTML = (project.publicBackgrounds?.length ? project.publicBackgrounds : PUBLIC_BACKGROUND_LIBRARY.slice(0, 6))
    .map(
      (item) => `
        <article class="background-card">
          <strong>${item.name}</strong>
          <span>${item.publicFacts}</span>
          <em>${item.storyUse}</em>
        </article>
      `,
    )
    .join("");
}

function isReviewChapter(chapter) {
  return ["审查中", "待修", "需审查"].includes(chapter.status) || (chapter.scoreDetail && chapter.status !== "完成");
}

function chapterFilterCounts(project) {
  const chapters = project.chapters || [];
  return {
    todo: chapters.filter((chapter) => chapter.status !== "完成" && !isReviewChapter(chapter)).length,
    review: chapters.filter(isReviewChapter).length,
    done: chapters.filter((chapter) => chapter.status === "完成").length,
  };
}

function chaptersForFilter(project, filter = state.activeChapterFilter || "todo") {
  const chapters = project.chapters || [];
  if (filter === "review") return chapters.filter(isReviewChapter);
  if (filter === "done") return chapters.filter((chapter) => chapter.status === "完成");
  return chapters.filter((chapter) => chapter.status !== "完成" && !isReviewChapter(chapter));
}

function chapterWindow(chapters, selectedId, limit = 240) {
  if (chapters.length <= limit) return { items: chapters, start: 0, total: chapters.length };
  const selectedIndex = chapters.findIndex((chapter) => chapter.id === selectedId);
  const start = selectedIndex > limit - 40
    ? Math.min(Math.max(selectedIndex - 80, 0), Math.max(chapters.length - limit, 0))
    : 0;
  return {
    items: chapters.slice(start, start + limit),
    start,
    total: chapters.length,
  };
}

function setChapterFilter(filter) {
  state.activeChapterFilter = filter;
  const project = currentProject();
  const visible = chaptersForFilter(project, filter);
  if (visible.length && !visible.some((chapter) => chapter.id === state.activeChapterId)) {
    state.activeChapterId = visible[0].id;
  }
  renderChapters(state.activeChapterId);
  selectChapter(state.activeChapterId);
  saveStateSoon("chapter-filter");
}

function renderChapters(selectedId = state.activeChapterId) {
  const project = currentProject();
  const counts = chapterFilterCounts(project);
  $("#tab-count-todo").textContent = counts.todo;
  $("#tab-count-review").textContent = counts.review;
  $("#tab-count-done").textContent = counts.done;
  $$("#chapter-tabs button").forEach((button) => button.classList.toggle("active", button.dataset.filter === (state.activeChapterFilter || "todo")));

  const fallback = [{ id: 1, title: "等待生成章节计划", status: "待写", progress: 0, score: null, manuscript: "" }];
  const filtered = chaptersForFilter(project, state.activeChapterFilter || "todo");
  const chapters = filtered.length ? filtered : (project.chapters.length ? [] : fallback);
  const selectedExists = chapters.some((chapter) => chapter.id === selectedId);
  if (selectedExists) {
    state.activeChapterId = selectedId;
  } else if (chapters.length) {
    state.activeChapterId = chapters[0].id;
  } else if (project.chapters[0]) {
    state.activeChapterId = project.chapters[0].id;
  }
  const activeProjectChapter = project.chapters.find((chapter) => Number(chapter.id) === Number(state.activeChapterId));
  if (activeProjectChapter) refreshProjectStoryMemory(project, activeProjectChapter);

  if (!chapters.length) {
    const emptyText = state.activeChapterFilter === "review"
      ? "暂无待审章节"
      : state.activeChapterFilter === "done"
        ? "暂无完成章节"
        : "暂无待写章节";
    $("#chapter-list").innerHTML = `<div class="empty-chapter-list">${emptyText}</div>`;
    return;
  }

  const windowed = chapterWindow(chapters, state.activeChapterId);
  const rangeNote = windowed.total > windowed.items.length
    ? `<div class="chapter-list-note">显示 ${windowed.start + 1}-${windowed.start + windowed.items.length} / ${windowed.total} 章，切换章节后会自动定位附近章节。</div>`
    : "";

  $("#chapter-list").innerHTML = rangeNote + windowed.items
    .map(
      (chapter) => `
        <button class="chapter-item ${chapter.id === state.activeChapterId ? "active" : ""}" data-chapter="${chapter.id}">
          <strong>第 ${chapter.id} 章 ${chapter.title}</strong>
          <span>${chapter.status} · ${chapterWordCount(chapter.manuscript || "")}/${activeTargetWords(project, chapter)} 字 · ${chapter.score ? `${chapter.score} 分` : "未评分"}</span>
          <meter min="0" max="100" value="${chapter.progress}"></meter>
          ${chapter.reviewPassed ? `<em class="chapter-review-ok">审查通过</em>` : chapter.reviewIssues?.length ? `<em class="chapter-review-risk">${chapter.reviewIssues.length} 项需修</em>` : ""}
          ${chapter.manualStyleEdited ? `<em class="chapter-style-edited">人工文风已记录</em>` : ""}
        </button>
      `,
    )
    .join("");
}

function renderContinuityMemory(memory) {
  if (!memory) return `<p class="muted">暂无连续性记忆。</p>`;
  const rows = [
    memory.previousEnding ? ["上章尾声", memory.previousEnding] : null,
    memory.previousBridge ? ["接力要求", memory.previousBridge] : null,
    memory.currentNeed ? ["本章承接", memory.currentNeed] : null,
    memory.roleLines?.length ? ["角色状态", memory.roleLines.join(" ｜ ")] : null,
    memory.openThreads?.length ? ["未收线索", memory.openThreads.join(" ｜ ")] : null,
  ].filter(Boolean);
  if (!rows.length) return `<p class="muted">首章或暂无上一章正文，生成时会以本章细纲建立起点。</p>`;
  return rows
    .map(([label, text]) => `
      <div class="continuity-line">
        <strong>${escapeHtml(label)}</strong>
        <span>${escapeHtml(compactMemoryText(text, 220))}</span>
      </div>
    `)
    .join("");
}

function selectedChapter() {
  const project = currentProject();
  return project.chapters.find((chapter) => chapter.id === state.activeChapterId) || project.chapters[0];
}

function editorMetaHtml(project, chapter) {
  const targetWords = activeTargetWords(project, chapter);
  const modelMeta = chapterModelMeta(chapter);
  return `
    <span>目标 ${targetWords} 字</span>
    <span>当前 ${chapterWordCount(chapter.manuscript || "")} 字</span>
    <span>粗纲：${chapter.roughOutline?.chapter || "-"}</span>
    <span>文风：${project.styleStatus}</span>
    <span>评分：${chapter.score ? `${chapter.score} 分` : "未评分"}</span>
    <span>状态：${chapter.status}</span>
    <span class="${chapter.manualStyleEdited ? "meta-warn" : ""}">人工文风：${chapter.styleRevisionStatus || "未修改"}</span>
    <span class="${modelMeta.className}">${modelMeta.text}</span>
  `;
}

function selectChapter(id) {
  state.activeChapterId = id;
  const project = currentProject();
  const chapter = selectedChapter();
  renderChapters(id);

  if (!chapter) {
    $("#writer-title").textContent = "等待章节计划";
    $("#editor-meta").textContent = "导入大纲并拆章后开始写作。";
    $("#manuscript").value = "";
    $("#chapter-outline").textContent = "暂无本章大纲。";
    $("#chapter-continuity").innerHTML = "";
    $("#chapter-detail-outline").innerHTML = "";
    $("#required-roles").innerHTML = "";
    $("#chapter-clues").innerHTML = "";
    $("#chapter-style-rules").innerHTML = "";
    $("#chapter-generation-contract").innerHTML = "";
    $("#chapter-gold-finger").innerHTML = "";
    $("#chapter-llm-status").textContent = "尚未真实调用模型";
    resetGenerationProgress();
    markDetailOutlineDirty(false);
    renderChapterScore(null);
    return;
  }

  $("#writer-title").textContent = `第 ${chapter.id} 章 ${chapter.title}`;
  const continuity = refreshProjectStoryMemory(project, chapter);
  $("#editor-meta").innerHTML = editorMetaHtml(project, chapter);
  $("#manuscript").value = chapter.manuscript;
  $("#chapter-outline").textContent = chapter.outline;
  $("#chapter-continuity").innerHTML = renderContinuityMemory(continuity);
  $("#chapter-detail-outline").innerHTML = renderDetailedOutline(chapter.detailedOutline);
  markDetailOutlineDirty(false);
  $("#required-roles").innerHTML = chapter.roles.map((role) => `<span class="tag">${role}</span>`).join("");
  $("#chapter-clues").innerHTML = chapter.clues.map((clue) => `<li>${clue}</li>`).join("");
  $("#chapter-style-rules").innerHTML = combinedGenerationRules(project)
    .map((rule) => `<li>${rule}</li>`)
    .join("");
  $("#chapter-generation-contract").innerHTML = buildChapterGenerationContract(project, chapter)
    .map((rule) => `<li>${rule}</li>`)
    .join("");
  $("#chapter-gold-finger").innerHTML = renderGoldFingerList(project);
  $("#chapter-llm-status").textContent = llmUsageText(chapter.llmMeta || (chapter.llmError ? { error: chapter.llmError } : {}), chapter);
  renderChapterScore(chapter);
  updateWorkflowButtons(chapter);
}

function renderChapterScore(chapter) {
  if (!chapter || !chapter.scoreDetail) {
    $("#chapter-score-total").textContent = "未评分";
    $("#chapter-score-detail").innerHTML = `<p class="muted">点击“完稿打分”后生成剧情、角色、文风、钩子分。</p>`;
    return;
  }

  const issues = chapter.reviewIssues || [];
  const fixPlan = buildChapterFixPlan(chapter);
  $("#chapter-score-total").textContent = `${chapter.score} 分`;
  $("#chapter-score-detail").innerHTML = [
    ["剧情推进", chapter.scoreDetail.plot],
    ["角色表现", chapter.scoreDetail.character],
    ["文风贴合", chapter.scoreDetail.style],
    ["结尾钩子", chapter.scoreDetail.hook],
    ["尺度安全", chapter.scoreDetail.scale ?? 90],
  ]
    .map(
      ([label, value]) => `
        <div>
          <span>${label}</span>
          <strong>${value}</strong>
          <meter min="0" max="100" value="${value}"></meter>
        </div>
      `,
    )
    .join("")
    + (chapter.scoreNotes?.length ? `<p class="score-notes">${chapter.scoreNotes.join("；")}</p>` : "")
    + (issues.length
      ? `<div class="score-issue-summary"><strong>已标记 ${issues.length} 处修改</strong><span>按编号逐项改完，再重新审查打分。</span></div><ul class="review-issue-list">${issues.map((issue, index) => `<li class="review-issue-item issue-${issue.level}"><span class="issue-index">${String(index + 1).padStart(2, "0")}</span><div><strong>修改 ${index + 1}｜${issue.type}｜${issue.level}</strong><p>${issue.text}</p><em>${issue.fix}</em></div></li>`).join("")}</ul>` : "")
    + (fixPlan.length
      ? `<div class="score-plan"><strong>90 分路线</strong><ol>${fixPlan.map((item) => `<li>${item}</li>`).join("")}</ol></div>`
      : chapter.reviewPassed
        ? `<p class="score-notes">${chapter.status === "完成" ? "审查通过，当前章节已完成。" : "审查通过，可以标记完成。"}</p>`
        : "");
}

function updateWorkflowButtons(chapter) {
  const hasChapter = Boolean(chapter);
  const isDone = chapter?.status === "完成";
  const isReview = chapter && isReviewChapter(chapter);
  const submitButton = $("#submit-review");
  const completeButton = $("#complete-chapter");
  submitButton.hidden = isDone;
  completeButton.hidden = isDone;
  submitButton.disabled = !hasChapter || isDone;
  $("#score-chapter").disabled = !hasChapter;
  completeButton.disabled = !hasChapter || isDone;
  $("#submit-review span").textContent = isReview ? "重新送审" : "送审";
  $("#score-chapter span").textContent = isDone ? "重新打分" : isReview ? "重新审查" : "审查打分";
}

function renderStyleTagEditor(project = currentProject()) {
  ensureStyleControls(project);
  const activeTags = project.styleTags || [];
  const selected = new Set(activeTags.map((tag) => tag.name));
  const suggestions = SUGGESTED_STYLE_TAGS.filter((tag) => !selected.has(tag));
  const tagHtml = activeTags.length
    ? activeTags.map((tag) => `
        <span class="style-tag-chip">
          <span>${escapeHtml(tag.name)}</span>
          <button type="button" data-style-tag-remove="${escapeHtml(tag.name)}" title="删除风格：${escapeHtml(tag.name)}" aria-label="删除风格：${escapeHtml(tag.name)}">
            <i data-lucide="x"></i>
          </button>
        </span>
      `).join("")
    : `<span class="muted">暂未设置人工风格标签。</span>`;
  const suggestionHtml = suggestions.map((tag) => `
      <button type="button" class="style-tag-suggestion" data-style-tag-add="${escapeHtml(tag)}">${escapeHtml(tag)}</button>
    `).join("");
  return `
    <div class="style-tag-list">${tagHtml}</div>
    <form class="style-tag-form" data-style-tag-form>
      <input type="text" data-style-tag-input placeholder="新增：毒舌、治愈、群像感..." maxlength="24" autocomplete="off" />
      <button type="submit" class="ghost-button"><i data-lucide="plus"></i><span>新增风格</span></button>
    </form>
    <div class="style-tag-suggestions">${suggestionHtml}</div>
  `;
}

function renderStyleFusionEditor(project = currentProject()) {
  ensureStyleControls(project);
  const rows = project.styleBlendProfiles || [];
  return `
    <label class="style-fusion-goal">
      <span>融合目标</span>
      <textarea id="style-fusion-goal" data-style-fusion-goal>${escapeHtml(project.styleFusionGoal || DEFAULT_STYLE_FUSION_GOAL)}</textarea>
    </label>
    <div class="style-fusion-table" id="style-fusion-table">
      ${rows.map((row) => `
        <div class="style-fusion-row" data-style-blend-row="${escapeHtml(row.id)}">
          <label class="style-fusion-enabled">
            <input type="checkbox" data-style-blend-field="enabled" ${row.enabled ? "checked" : ""} />
          </label>
          <input data-style-blend-field="name" value="${escapeHtml(row.name)}" placeholder="风格源" />
          <input data-style-blend-field="weight" type="number" min="0" max="100" step="5" value="${Number(row.weight) || 0}" />
          <textarea data-style-blend-field="rule" placeholder="这个风格源应该怎么参与生成">${escapeHtml(row.rule || "")}</textarea>
          <button type="button" class="mini-button danger" data-style-blend-remove="${escapeHtml(row.id)}">删除</button>
        </div>
      `).join("")}
    </div>
    <button type="button" class="ghost-button style-fusion-add" id="add-style-blend">
      <i data-lucide="plus"></i><span>新增融合源</span>
    </button>
  `;
}

function renderStyleRulesPreview(project = currentProject()) {
  const baseRules = [
    ...generationWordRules(project.chapterTargetWords || 2200),
    ...styleFusionRules(project),
    ...styleTagRules(project),
  ];
  const rules = project.learnedRules.length
    ? combinedGenerationRules(project)
    : [...baseRules, "等待样章训练", "可从章节评分反推风格偏移"];
  $("#learned-rules").innerHTML = rules
    .map((rule) => `<div class="rule-pill">${escapeHtml(rule)}</div>`)
    .join("");
}

function addStyleTag(tagName) {
  const project = currentProject();
  ensureStyleControls(project);
  const name = String(tagName || "").trim();
  if (!name) {
    showToast("请输入要新增的风格标签。");
    return false;
  }
  if (project.styleTags.some((tag) => tag.name === name)) {
    showToast(`“${name}”已经在风格标签里。`);
    return false;
  }
  project.styleTags.push({ name, enabled: true });
  project.styleIntentUpdatedAt = new Date().toISOString();
  renderStylePage();
  refreshIcons();
  saveStateSoon("add-style-tag");
  showToast(`已新增风格：${name}`);
  return true;
}

function removeStyleTag(tagName) {
  const project = currentProject();
  ensureStyleControls(project);
  const name = String(tagName || "").trim();
  project.styleTags = project.styleTags.filter((tag) => tag.name !== name);
  project.styleIntentUpdatedAt = new Date().toISOString();
  renderStylePage();
  refreshIcons();
  saveStateSoon("remove-style-tag");
  showToast(`已删除风格：${name}`);
}

function syncStyleBlendProfilesFromDom({ persist = true } = {}) {
  const project = currentProject();
  ensureStyleControls(project);
  const goalInput = $("#style-fusion-goal");
  project.styleFusionGoal = goalInput?.value.trim() || DEFAULT_STYLE_FUSION_GOAL;
  project.styleBlendProfiles = $$("#style-fusion-table [data-style-blend-row]")
    .map((row, index) => ({
      id: row.dataset.styleBlendRow || `blend-${index}`,
      enabled: $("[data-style-blend-field='enabled']", row)?.checked !== false,
      name: $("[data-style-blend-field='name']", row)?.value.trim() || "自定义风格源",
      weight: Math.max(0, Math.min(100, Number($("[data-style-blend-field='weight']", row)?.value) || 0)),
      rule: $("[data-style-blend-field='rule']", row)?.value.trim() || "按该来源的有效规则参与生成。",
    }));
  project.styleFusionUpdatedAt = new Date().toISOString();
  renderStyleRulesPreview(project);
  if (persist) saveStateSoon("style-fusion-edit");
}

function addStyleBlendProfile() {
  const project = currentProject();
  syncStyleBlendProfilesFromDom({ persist: false });
  project.styleBlendProfiles.push({
    id: `custom-${Date.now()}`,
    name: "自定义文风",
    weight: 10,
    rule: "补充一个新的文风来源，写清它要影响句子、对白、节奏还是爽点。",
    enabled: true,
  });
  renderStylePage();
  refreshIcons();
  saveStateSoon("add-style-blend");
}

function removeStyleBlendProfile(profileId) {
  const project = currentProject();
  syncStyleBlendProfilesFromDom({ persist: false });
  project.styleBlendProfiles = project.styleBlendProfiles.filter((profile) => profile.id !== profileId);
  renderStylePage();
  refreshIcons();
  saveStateSoon("remove-style-blend");
}

function renderStylePage() {
  const project = currentProject();
  ensureStyleControls(project);
  const sampleInput = $("#style-sample");
  if (sampleInput && document.activeElement !== sampleInput) {
    const sample = project.styleSample || DEFAULT_STYLE_SAMPLE;
    if (sampleInput.value !== sample) sampleInput.value = sample;
  }
  const currentSampleHash = styleSampleHash(styleSampleBody(project.styleSample || ""));
  if (project.styleStatus === "已训练" && project.styleSampleHash && project.styleSampleHash !== currentSampleHash) {
    project.styleStatus = "样章已更新";
    project.styleSampleDirty = true;
  }
  $("#style-status").textContent = project.styleStatus;
  $("#style-status").className = `status ${statusClass(project.styleStatus)}`;
  $("#style-confidence").textContent = project.styleTrainedAt
    ? `置信度 ${project.styleConfidence}% · ${new Date(project.styleTrainedAt).toLocaleString("zh-CN", { hour12: false })}`
    : `置信度 ${project.styleConfidence}%`;
  const manualRevisionProfile = project.styleRevisionSamples?.length
    ? [{ label: "人工修订", value: `已记录 ${project.styleRevisionSamples.length} 章正文修订，下次生成会优先模仿修订稿。` }]
    : [];
  const tagProfile = [{ label: "人工风格", value: project.styleTags.map((tag) => tag.name).join("、") || "未设置" }];
  const blendProfile = [{ label: "融合链路", value: project.styleBlendProfiles.filter((item) => item.enabled).map((item) => `${item.name}${item.weight}%`).join(" / ") || "未设置" }];
  $("#style-profile").innerHTML = [
    ...(project.styleProfile.length ? project.styleProfile : [{ label: "等待训练", value: "导入样章后生成文风画像。" }]),
    ...tagProfile,
    ...blendProfile,
    ...manualRevisionProfile,
  ]
    .map(
      (item) => `
        <div class="profile-row">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </div>
      `,
    )
    .join("");
  const tagEditor = $("#style-tag-editor");
  if (tagEditor) tagEditor.innerHTML = renderStyleTagEditor(project);
  const fusionEditor = $("#style-fusion-editor");
  if (fusionEditor) fusionEditor.innerHTML = renderStyleFusionEditor(project);
  renderStyleRulesPreview(project);
  renderForbiddenWordManager("#forbidden-words");
}

function renderSkills() {
  const project = currentProject();
  const skills = [
    { name: "番茄小白文", task: "正文生成 / 评分", desc: "句子短，信息直给，行动推动爽点。", active: true },
    { name: "文风学习器", task: "样章分析", desc: "从样章提取句长、节奏、对话比例和禁忌表达。", active: true },
    { name: "娱乐圈爽文", task: "题材模板", desc: "舆论反转、资源压制、热搜节点和粉丝反馈。", active: isEntertainmentProject(project) },
    { name: "可发表暧昧张力", task: "尺度审查", desc: "成年人、自愿、留白转场、写后果，不写露骨动作和身体细节。", active: isEntertainmentProject(project) },
    { name: "娱乐圈去 AI 味", task: "改写 / 评分", desc: "用通告单、品牌 brief、试镜、宣发群、后台监视器等具体物件替代模板腔。", active: true },
    { name: "一致性审查规则", task: "审查", desc: "检查角色轨迹、伏笔回收、时间线和物资数量。", active: true },
  ];

  $("#skill-list").innerHTML = skills
    .map(
      (skill) => `
        <article class="skill-card ${skill.active ? "active" : ""}">
          <header>
            <strong>${skill.name}</strong>
            <span class="status ${skill.active ? "done" : "wait"}">${skill.active ? "启用" : "停用"}</span>
          </header>
          <em>${skill.task}</em>
          <p>${skill.desc}</p>
        </article>
      `,
    )
    .join("");
  $("#pattern-list").innerHTML = (project.researchNotes?.length ? project.researchNotes : ENTERTAINMENT_PATTERNS)
    .map(
      (item) => `
        <article class="research-card">
          <strong>${item.title}</strong>
          <span>${item.detail}</span>
        </article>
      `,
    )
    .join("");
  $("#romance-rule-list").innerHTML = (project.romanceRules?.length ? project.romanceRules : PUBLISHABLE_ROMANCE_RULES)
    .map((rule) => `<li>${rule}</li>`)
    .join("");
  renderForbiddenWordManager("#skill-forbidden-list");
  $("#story-route-list").innerHTML = (project.storyRoutes?.length ? project.storyRoutes : STORY_ROUTE_LIBRARY)
    .map((route) => `<li>${route}</li>`)
    .join("");
}

function renderGoldFingerList(project = currentProject()) {
  const powers = project?.goldFingerPowers || [];
  return powers.length
    ? powers.map((power) => {
        const name = typeof power === "string" ? power : power.name || power.label || "金手指";
        const effect = typeof power === "string" ? power : power.effect || power.desc || power.detail || "";
        return `<li><strong>${escapeHtml(name)}</strong><span>${escapeHtml(effect)}</span></li>`;
      }).join("")
    : `<li class="muted">暂无金手指设定，建议配置为“预言 + 体能强化 + 星运赋能 + 反噬回收”。</li>`;
}

function buildChapterFixPlan(chapter) {
  const project = currentProject();
  const meta = chapter?.scoreMeta || {};
  const issues = chapter?.reviewIssues || [];
  const plan = [];
  const targetWords = meta.targetWords || activeTargetWords(project, chapter);
  const outlineRatio = meta.outlineCoverage?.ratio || 0;
  const styleMetrics = meta.styleMetrics || {};

  if (issues.some((issue) => issue.type === "字数")) {
    plan.push(`把正文控制在 2200-3000 字，优先落在 2400-2800 字。`);
  }
  if (outlineRatio < 0.7) {
    plan.push(`把细纲覆盖从 ${Math.round(outlineRatio * 100)}% 提到 70%+，把系统激活、预言兑现、刘亦菲出场、反噬变化都写进正文。`);
  }
  const forbiddenIssue = issues.find((issue) => issue.type === "禁词");
  if (forbiddenIssue) {
    const matches = forbiddenIssue.text.match(/：(.+?)[。\.]/)?.[1] || forbiddenIssue.text.replace(/^.*：/, "").replace(/[。\.]$/, "");
    plan.push(`把模板词 ${matches} 换成具体动作、物件、通告或现场反馈。`);
  }
  if (issues.some((issue) => issue.type === "伏笔")) {
    plan.push(`把伏笔数值直接落地，例如“反噬85%→65%（延迟3月）”要在正文里出现。`);
  }
  if (styleMetrics.summaryHits > 0 || (chapter?.scoreDetail?.style || 0) < 80) {
    plan.push(`减少“仿佛/好像/不禁”类解释句，改成欲望、顾虑、动作、台词和结果。`);
  }
  if (styleMetrics.inventoryPileHits > 0 || issues.some((issue) => issue.type === "AI味")) {
    plan.push("删掉场景物品清单，只留 1-2 个会改变人物选择的细节，把篇幅让给人物心理拉扯和决定。");
  }
  if (issues.some((issue) => issue.type === "角色")) {
    plan.push("把计划角色补一个动作或一句台词，避免只写结果不写出场。");
  }
  if ((chapter?.scoreDetail?.hook || 0) < 85) {
    plan.push("结尾改成电话、门外来人、反噬数值变化或角色选择，不要平收。");
  }
  return plan.slice(0, 3);
}

function renderModels() {
  $("#provider-grid").innerHTML = state.providers
    .map(
      (provider) => {
        const models = provider.availableModels || [];
        const visibleModels = models.slice(0, 18);
        const modelList = models.length
          ? `
            <div class="provider-models">
              <div>
                <strong>可用模型</strong>
                <span>${models.length} 个${provider.modelListUpdatedAt ? ` · ${new Date(provider.modelListUpdatedAt).toLocaleString("zh-CN", { hour12: false })}` : ""}</span>
              </div>
              <div class="provider-model-chipset">
                ${visibleModels.map((model) => {
                  const probeClass = model.generationOk === true ? "usable" : model.generationOk === false ? "failed" : "";
                  const title = model.generationOk === true
                    ? `实测可生成 · ${model.endpoint || "api"}`
                    : model.generationOk === false
                      ? `生成失败：${model.error || "返回为空"}`
                      : "已列出，尚未轻量生成验证";
                  return `<button type="button" class="model-chip-button ${probeClass}" title="${escapeHtml(title)}" data-provider-model="${provider.id}" data-model="${escapeHtml(model.id)}">${escapeHtml(model.id)}</button>`;
                }).join("")}
                ${models.length > visibleModels.length ? `<em>还有 ${models.length - visibleModels.length} 个未显示</em>` : ""}
              </div>
            </div>
          `
          : provider.modelListError
            ? `<div class="provider-models empty risk">模型列表获取失败：${escapeHtml(provider.modelListError)}</div>`
            : `<div class="provider-models empty">填入真实 API Key 后，点击“测试”获取可用模型。</div>`;
        return `
        <article class="provider-card" data-provider-id="${provider.id}">
          <header>
            <strong>${provider.name}</strong>
            <label class="switch">
              <input type="checkbox" ${provider.enabled ? "checked" : ""} data-provider="${provider.id}" />
              <span></span>
            </label>
          </header>
          <label>
            <span>API Key</span>
            <input type="password" value="${escapeHtml(isMaskedApiKey(provider.key) ? "" : provider.key)}" placeholder="粘贴真实 API Key，不要填 •••• 占位符" data-provider-field="key" autocomplete="off" />
          </label>
          <label>
            <span>Base URL</span>
            <input value="${escapeHtml(provider.baseUrl)}" data-provider-field="baseUrl" />
          </label>
          <footer>
            <span class="status ${statusClass(provider.status)}">${provider.status}</span>
            ${provider.lastTest?.ok ? `<em class="provider-usage">token ${provider.lastTest.usage?.totalTokens || 0}</em>` : provider.lastTest?.error ? `<em class="provider-usage risk">${escapeHtml(provider.lastTest.error)}</em>` : ""}
            ${provider.lastTest?.generationError ? `<em class="provider-usage risk">${escapeHtml(provider.lastTest.generationError)}</em>` : ""}
            <button class="ghost-button provider-test" data-provider="${provider.id}">
              <i data-lucide="plug-zap"></i><span>测试</span>
            </button>
          </footer>
          ${modelList}
        </article>
      `;
      },
    )
    .join("");

  $("#model-route-table").innerHTML = state.routes
    .map(
      (route, index) => {
        const provider = state.providers.find((item) => routeMatchesProvider(route, item));
        const hasModelList = Boolean(provider?.availableModels?.length);
        const unavailable = hasModelList && !modelIsAvailable(provider, route.model);
        return `
        <tr data-route-index="${index}" class="${unavailable ? "route-model-unavailable" : ""}">
          <td>${route.task}</td>
          <td>${route.provider}</td>
          <td>
            <input value="${escapeHtml(route.model)}" data-route-field="model" />
            ${unavailable ? `<em class="route-warning">该模型不在 ${escapeHtml(provider.name)} 返回的可用列表中，测试后会自动改为可用模型。</em>` : ""}
          </td>
          <td><input type="number" value="${escapeHtml(route.temperature)}" step="0.1" data-route-field="temperature" /></td>
          <td>${route.usage}</td>
        </tr>
      `;
      },
    )
    .join("");
}

function buildProjectAudit(project) {
  const chapters = project.chapters || [];
  const current = selectedChapter();
  const rows = [];
  const forbiddenWords = ensureForbiddenWords(project);
  const reviewChapters = chapters.filter(isReviewChapter);
  const doneChapters = chapters.filter((chapter) => chapter.status === "完成");
  const shortDrafts = chapters.filter((chapter) => chapter.manuscript && chapterWordCount(chapter.manuscript) < 2200).slice(0, 4);
  const overlongDrafts = chapters.filter((chapter) => chapter.manuscript && chapterWordCount(chapter.manuscript) > 3000).slice(0, 4);
  const metaLeak = chapters.filter((chapter) => /细纲对应|写法上|粗纲节点|本章定位|剧情目标|冲突设计/.test(chapter.manuscript || "")).slice(0, 4);
  const inventoryPileChapters = chapters
    .filter((chapter) => chapter.manuscript && sceneInventoryPileCount(chapter.manuscript) > 0)
    .slice(0, 4);
  const forbiddenHitChapters = chapters
    .map((chapter) => ({
      chapter,
      hits: forbiddenWords.filter((word) => word && (chapter.manuscript || "").includes(word)).slice(0, 5),
    }))
    .filter((item) => item.hits.length)
    .slice(0, 4);
  const roleRisk = (project.characters || []).filter((character) => character.risk === "高" || character.risk === "中").slice(0, 4);
  const noOutline = chapters.filter((chapter) => !chapter.detailedOutline || isLegacyDetailedOutline(chapter.detailedOutline)).slice(0, 4);

  if (reviewChapters.length) {
    rows.push({ type: "章节", pos: `审查队列 ${reviewChapters.length} 章`, issue: "存在待审或待修章节，不能直接算作完成。", level: "高", fix: "在写作台切到“审查”，逐章通过后再标记完成。" });
  }
  if (shortDrafts.length) {
    rows.push({ type: "字数", pos: shortDrafts.map((chapter) => `第${chapter.id}章`).join("、"), issue: "部分章节正文未达到本章生成字数约束。", level: "高", fix: "按细纲补足场景动作、冲突结果和章末钩子。" });
  }
  if (overlongDrafts.length) {
    rows.push({ type: "字数", pos: overlongDrafts.map((chapter) => `第${chapter.id}章`).join("、"), issue: "部分章节正文超过 3000 字。", level: "中", fix: "删掉重复解释、重复对话和过长过渡，把结尾压回 3000 字内。" });
  }
  if (metaLeak.length) {
    rows.push({ type: "污染", pos: metaLeak.map((chapter) => `第${chapter.id}章`).join("、"), issue: "正文混入工作台提示或细纲标签。", level: "高", fix: "重新生成或清理正文，只保留故事内容。" });
  }
  if (inventoryPileChapters.length) {
    rows.push({ type: "AI味", pos: inventoryPileChapters.map((chapter) => `第${chapter.id}章`).join("、"), issue: "存在场景物品清单式描写，人物心理和选择不足。", level: "中", fix: "删掉静态陈设堆叠，补人物的欲望、顾虑、误判和下一步动作。" });
  }
  if (forbiddenHitChapters.length) {
    const first = forbiddenHitChapters[0];
    rows.push({ type: "禁词", pos: `第${first.chapter.id}章等`, issue: `命中高频模板词：${first.hits.join("、")}。`, level: "中", fix: "改成具体欲望、动作、台词、通告、电话或现场反馈。" });
  }
  if (roleRisk.length) {
    rows.push({ type: "角色", pos: roleRisk.map((role) => role.name).join("、"), issue: "角色表存在中高缺席风险。", level: "中", fix: "在后续章节补明确出场动作，或调整计划出场章。" });
  }
  if (noOutline.length) {
    rows.push({ type: "细纲", pos: noOutline.map((chapter) => `第${chapter.id}章`).join("、"), issue: "部分章节仍是旧细纲或缺少故事化细纲。", level: "中", fix: "重新解析大纲或刷新章节细纲。" });
  }
  if (current?.reviewIssues?.length) {
    rows.push(...current.reviewIssues.slice(0, 4).map((issue) => ({
      type: issue.type,
      pos: `第 ${current.id} 章`,
      issue: issue.text,
      level: issue.level,
      fix: issue.fix,
    })));
  }
  if (!rows.length) {
    rows.push({ type: "通过", pos: "当前项目", issue: "未发现待修章节、字数不足、提示词污染或明显禁词问题。", level: "低", fix: "可以继续生成下一章或抽检角色时间线。" });
  }

  const timeline = [
    ["ok", `目录 ${project.chapterPlanCount || chapters.length} 章`, "章节目录", project.outlineParsed ? `覆盖 ${project.outlineParsed}/${project.totalChapters}` : "待导入"],
    [reviewChapters.length ? "warn" : "ok", "审查队列", "章节审查", reviewChapters.length ? `${reviewChapters.length} 章待处理` : "无待审章节"],
    [doneChapters.length ? "ok" : "warn", "完成队列", "完成功能", doneChapters.length ? `${doneChapters.length} 章已完成` : "暂无完成章"],
    [roleRisk.length ? "warn" : "ok", "角色表", "缺席风险", roleRisk.length ? `${roleRisk.length} 个中高风险角色` : "角色风险稳定"],
    [forbiddenHitChapters.length || inventoryPileChapters.length ? "warn" : "ok", "正文", "AI味扫描", forbiddenHitChapters.length || inventoryPileChapters.length ? "发现模板词或物品堆叠" : "未发现主要模板词"],
  ];

  return { rows, timeline };
}

function renderAudit() {
  const project = currentProject();
  const { rows, timeline } = buildProjectAudit(project);
  const highCount = rows.filter((row) => row.level === "高").length;
  $("#audit-summary").textContent = `${rows.length} 个检查项，${highCount} 个高风险`;
  $("#audit-table").innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td>${row.type}</td>
          <td>${row.pos}</td>
          <td>${row.issue}</td>
          <td><span class="status ${statusClass(row.level)}">${row.level}</span></td>
          <td>${row.fix}</td>
        </tr>
      `,
    )
    .join("");

  $("#timeline-list").innerHTML = timeline
    .map(
      ([kind, chapter, title, detail]) => `
        <div class="timeline-row ${kind}">
          <span>${chapter}</span>
          <strong>${title}</strong>
          <em>${detail}</em>
        </div>
      `,
    )
    .join("");
  $("#feature-audit-list").innerHTML = FEATURE_AUDIT_ROWS
    .map(
      (row) => `
        <tr>
          <td>${row.module}</td>
          <td><span class="status ${row.status.includes("待") ? "wait" : "done"}">${row.status}</span></td>
          <td>${row.detail}</td>
        </tr>
      `,
    )
    .join("");
}

function renderAll() {
  state.projects.forEach(ensureProjectPlanning);
  renderProjectSelect();
  renderProjectList();
  renderDashboard();
  renderOutline();
  renderCharacters();
  renderChapters(state.activeChapterId);
  selectChapter(state.activeChapterId);
  renderStylePage();
  renderSkills();
  renderModels();
  renderAudit();
  refreshIcons();
}

function createProject({ importOutline = false } = {}) {
  const title = $("#new-title").value.trim() || "未命名小说";
  const id = "project-" + Date.now();
  const totalChapters = Number($("#new-total").value) || 600;
  const chapterTargetWords = Math.min(3000, Math.max(2200, Number($("#new-words").value) || 2200));
  const newProject = {
    id,
    title,
    genre: $("#new-genre").value,
    totalChapters,
    chapterTargetWords,
    logline: $("#new-logline").value.trim(),
    currentChapter: 0,
    words: 0,
    outlineParsed: 0,
    styleStatus: "未训练",
    styleConfidence: 0,
    averageScore: null,
    health: { outline: 0, character: 0, style: 0, audit: 0 },
    volumes: [],
    outlineRows: [],
    clues: [],
    characters: [],
    chapters: [],
    styleProfile: [],
    styleSample: DEFAULT_STYLE_SAMPLE,
    generationRules: generationWordRules(chapterTargetWords),
    styleTags: normalizeStyleTags(DEFAULT_STYLE_TAGS),
    styleBlendProfiles: normalizeStyleBlendProfiles(DEFAULT_STYLE_BLEND_PROFILES),
    styleFusionGoal: DEFAULT_STYLE_FUSION_GOAL,
    learnedRules: [],
    tasks: [],
    planVersion: CURRENT_PROJECT_PLAN_VERSION,
    rawOutlineText: importOutline ? DEFAULT_OUTLINE_SAMPLE : "",
    forbiddenWords: [...ENTERTAINMENT_FORBIDDEN_WORDS],
    forbiddenWordsSeedVersion: FORBIDDEN_WORD_LIBRARY_VERSION,
  };

  state.projects.unshift(newProject);
  state.activeProjectId = id;
  state.activeChapterId = 1;
  state.pendingImportProjectId = importOutline ? id : null;
  renderAll();
  switchPage(importOutline ? "outline" : "dashboard");
  saveStateSoon("create-project");
  if (importOutline) {
    showToast("已创建项目，请选择要导入的大纲文件。");
    window.setTimeout(() => $("#outline-file")?.click(), 0);
  } else {
    showToast("已创建空白小说项目。");
  }
}

function openProject(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) return;
  state.activeProjectId = project.id;
  state.activeChapterId = project.chapters[0]?.id || 1;
  renderAll();
  switchPage("dashboard");
  saveStateSoon("switch-project");
  showToast(`已打开《${project.title}》。`);
}

function deleteProject(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) return;
  if (state.projects.length <= 1) {
    showToast("至少保留一个小说项目，不能删除最后一个。");
    return;
  }
  const ok = window.confirm(`确定删除《${project.title}》？删除前系统会保留数据库备份。`);
  if (!ok) return;
  state.projects = state.projects.filter((item) => item.id !== projectId);
  if (state.activeProjectId === projectId) {
    const nextProject = state.projects[0];
    state.activeProjectId = nextProject.id;
    state.activeChapterId = nextProject.chapters[0]?.id || 1;
  }
  renderAll();
  saveStateSoon("delete-project");
  showToast(`已删除《${project.title}》。`);
}

function parseOutline() {
  const project = currentProject();
  const text = $("#outline-input").value || "";
  const imported = buildImportedProject(text, project.sourceFile || "手动文本");
  Object.assign(project, imported);
  project.rawOutlineText = text.trim();
  project.sourceFile = project.sourceFile || "手动粘贴";
  state.activeChapterId = project.chapters[0]?.id || imported.currentChapter || 1;
  renderAll();
  saveStateSoon("parse-outline");
  showToast("已解析大纲，当前章节计划 " + project.outlineParsed + "/" + project.totalChapters + "。");
}
async function trainStyle() {
  const project = currentProject();
  ensureStyleControls(project);
  project.styleSample = ($("#style-sample")?.value || project.styleSample || DEFAULT_STYLE_SAMPLE).trim() || DEFAULT_STYLE_SAMPLE;
  const analysis = analyzeStyleSample(project.styleSample, project);
  project.styleStatus = "已训练";
  project.styleConfidence = analysis.confidence;
  project.health.style = project.styleConfidence;
  project.generationRules = generationWordRules(project.chapterTargetWords || 2200);
  project.styleTrainedAt = new Date().toISOString();
  project.styleSampleHash = analysis.hash;
  project.styleSampleStats = analysis;
  const entertainmentPreset = isEntertainmentProject(project);
  project.styleProfile = buildStyleProfileFromAnalysis(analysis);
  project.learnedRules = buildLearnedRulesFromAnalysis(analysis, project);
  if (entertainmentPreset) {
    project.researchNotes = ENTERTAINMENT_PATTERNS;
    project.romanceRules = PUBLISHABLE_ROMANCE_RULES;
    if (!Array.isArray(project.forbiddenWords)) project.forbiddenWords = [...ENTERTAINMENT_FORBIDDEN_WORDS];
    ensureForbiddenWords(project);
    project.publicBackgrounds = PUBLIC_BACKGROUND_LIBRARY;
    project.storyRoutes = STORY_ROUTE_LIBRARY;
  }
  renderAll();
  await saveStateNowWithMessage("train-style", `文风画像已重新训练：${analysis.sampleCount} 组样文，${analysis.totalChars} 字，置信度 ${analysis.confidence}%。`);
}

function syncStyleSampleFromDom({ persist = true } = {}) {
  const sampleInput = $("#style-sample");
  if (!sampleInput) return;
  const project = currentProject();
  project.styleSample = sampleInput.value;
  project.styleSampleUpdatedAt = new Date().toISOString();
  project.styleStatus = project.styleStatus === "已训练" ? "样章已更新" : project.styleStatus;
  project.styleSampleDirty = true;
  if (persist) saveStateSoon("style-sample");
}

async function importStyleSamples(files = []) {
  const project = currentProject();
  const readableFiles = Array.from(files).filter((file) => /\.(txt|md)$/i.test(file.name));
  const unsupported = Array.from(files).filter((file) => !/\.(txt|md)$/i.test(file.name));
  if (!readableFiles.length) {
    showToast(unsupported.length ? "当前浏览器原型只直接读取 txt/md 样章，doc/docx 需要后端解析。" : "请选择样章文件。");
    return;
  }
  const samples = await Promise.all(readableFiles.map(async (file) => {
    const text = await file.text();
    return `# ${file.name}\n\n${text.trim()}`;
  }));
  project.styleSample = samples.join("\n\n---\n\n");
  project.styleSampleUpdatedAt = new Date().toISOString();
  project.styleStatus = project.styleStatus === "已训练" ? "样章已更新" : "待训练";
  project.styleSampleDirty = true;
  $("#style-sample").value = project.styleSample;
  renderStylePage();
  refreshIcons();
  saveStateSoon("style-sample-import");
  showToast(unsupported.length
    ? `已导入 ${readableFiles.length} 个 txt/md 样章；doc/docx 需后端解析。`
    : `已导入 ${readableFiles.length} 个样章，点击训练即可写入文风画像。`);
}

function syncModelSettingsFromDom({ persist = true, markVerified = false } = {}) {
  $$("#provider-grid .provider-card").forEach((card) => {
    const provider = state.providers.find((item) => item.id === card.dataset.providerId);
    if (!provider) return;
    const enabledInput = $("input[data-provider]", card);
    const keyInput = $("input[data-provider-field='key']", card);
    const baseUrlInput = $("input[data-provider-field='baseUrl']", card);
    const nextKey = keyInput?.value || "";
    const normalizedKey = isMaskedApiKey(nextKey) ? "" : nextKey.trim();
    const previousKey = provider.key || "";
    const previousBaseUrl = provider.baseUrl || "";
    provider.enabled = enabledInput?.checked ?? provider.enabled;
    provider.key = normalizedKey;
    provider.baseUrl = baseUrlInput?.value || provider.baseUrl;
    if (normalizedKey !== previousKey || provider.baseUrl !== previousBaseUrl) {
      provider.status = "待验证";
      provider.lastTest = null;
    }
    if (markVerified && provider.enabled && provider.lastTest?.ok) provider.status = "已连接";
  });

  $$("#model-route-table tr").forEach((row) => {
    const route = state.routes[Number(row.dataset.routeIndex)];
    if (!route) return;
    route.model = $("input[data-route-field='model']", row)?.value || route.model;
    route.temperature = $("input[data-route-field='temperature']", row)?.value || route.temperature;
  });

  state.modelConfigSavedAt = new Date().toISOString();
  if (persist) saveStateSoon("model-config-input");
}

function routeMatchesProvider(route, provider) {
  const routeProvider = String(route.provider || "").toLowerCase();
  const providerName = String(provider.name || "").toLowerCase();
  const providerId = String(provider.id || "").toLowerCase();
  return routeProvider === providerName
    || routeProvider.includes(providerName)
    || providerName.includes(routeProvider)
    || routeProvider.includes(providerId);
}

function modelIsAvailable(provider, modelId) {
  const id = String(modelId || "").trim().toLowerCase();
  if (!id) return false;
  const models = provider?.availableModels || [];
  const usable = models.filter((model) => model?.generationOk === true || model?.usable === true);
  const candidates = usable.length ? usable : models.filter((model) => model?.generationOk !== false);
  return candidates.some((model) => String(model.id || model).toLowerCase() === id);
}

function scoreProviderModel(providerId, modelId, requestedModel = "") {
  const id = String(modelId || "").toLowerCase();
  const requested = String(requestedModel || "").toLowerCase();
  if (!id) return -Infinity;
  if (requested && id === requested) return 100000;

  let score = 0;
  if (requested) {
    const family = requested.match(/^[a-z]+-\d+(?:\.\d+)?/)?.[0] || requested.split("-")[0];
    if (family && id.startsWith(family)) score += 120;
  }

  if (providerId === "openai") {
    if (id.includes("gpt-5.5")) score += 95;
    else if (id.includes("gpt-5.4")) score += 90;
    else if (id.includes("gpt-5.3")) score += 80;
    else if (id.includes("gpt-5")) score += 70;
    else if (id.includes("gpt-4")) score += 50;
    if (id.includes("codex")) score -= 18;
    if (id.includes("nano")) score -= 35;
    if (id.includes("mini")) score -= 14;
  } else if (providerId === "deepseek") {
    if (id.includes("chat")) score += 70;
    if (id.includes("reasoner")) score += 45;
  } else if (providerId === "gemini") {
    if (id.includes("pro")) score += 70;
    if (id.includes("flash")) score += 45;
  } else if (providerId === "claude") {
    if (id.includes("sonnet")) score += 70;
    if (id.includes("opus")) score += 65;
    if (id.includes("haiku")) score += 35;
  }

  return score;
}

function chooseProviderModel(provider, requestedModel = "") {
  const allModels = (provider?.availableModels || []).filter((model) => model?.id || typeof model === "string");
  const usableModels = allModels.filter((model) => model?.generationOk === true || model?.usable === true);
  const models = usableModels.length ? usableModels : allModels.filter((model) => model?.generationOk !== false);
  if (!models.length) return "";
  const requested = String(requestedModel || "").trim().toLowerCase();
  const exact = models.find((model) => String(model.id || model).toLowerCase() === requested);
  if (exact) return exact.id || exact;
  if (!usableModels.length) return models[0]?.id || models[0] || "";
  return [...models]
    .sort((a, b) => scoreProviderModel(provider.id, b.id || b, requestedModel) - scoreProviderModel(provider.id, a.id || a, requestedModel))
    [0]?.id || models[0]?.id || models[0] || "";
}

function autoApplyAvailableProviderModel(providerId) {
  const provider = state.providers.find((item) => item.id === providerId);
  if (!provider?.availableModels?.length) return { changed: 0, model: "" };
  let changed = 0;
  let firstAppliedModel = "";

  state.routes.forEach((route) => {
    if (!routeMatchesProvider(route, provider)) return;
    if (modelIsAvailable(provider, route.model)) return;
    const nextModel = chooseProviderModel(provider, route.model);
    if (!nextModel) return;
    route.model = nextModel;
    firstAppliedModel ||= nextModel;
    changed += 1;
  });

  return { changed, model: firstAppliedModel };
}

function applyProviderModel(providerId, modelId) {
  const provider = state.providers.find((item) => item.id === providerId);
  if (!provider || !modelId) return;
  let changed = 0;
  state.routes.forEach((route) => {
    if (!routeMatchesProvider(route, provider)) return;
    route.model = modelId;
    changed += 1;
  });
  renderModels();
  refreshIcons();
  saveStateSoon("apply-provider-model");
  showToast(changed ? `已把 ${modelId} 填入 ${provider.name} 的 ${changed} 条任务路由。` : `没有找到 ${provider.name} 对应的任务路由。`);
}

async function saveModelSettings() {
  syncModelSettingsFromDom({ persist: false, markVerified: false });
  $("#key-status").textContent = "已保存";
  $("#key-status").className = "status wait";
  renderModels();
  refreshIcons();
  await saveStateNowWithMessage("save-models", "多模型配置已保存，点击“测试”才会真实验证并消耗 token。");
}

async function testProviderConnection(providerId) {
  syncModelSettingsFromDom({ persist: false });
  await saveState("before-provider-test");
  const provider = state.providers.find((item) => item.id === providerId);
  if (!provider) return;
  if (!provider.key) {
    provider.status = "待验证";
    provider.lastTest = { ok: false, error: "API Key 为空或仍是占位符，请粘贴真实密钥。", testedAt: new Date().toISOString() };
    renderModels();
    refreshIcons();
    saveStateSoon("provider-test-missing-key");
    showToast(`${provider.name} 未测试：API Key 为空或仍是占位符。`);
    return;
  }
  provider.status = "测试中";
  renderModels();
  refreshIcons();
  showToast(`正在检测 ${provider.name}：先获取模型列表，再做轻量生成测试。`);
  try {
    const response = await fetch("/api/llm/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ providerId }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.ok) throw new Error(payload.error || `测试失败 ${response.status}`);
    const generationOk = payload.generationOk !== false;
    provider.status = generationOk ? "已连接" : "模型列表可用";
    provider.lastTest = {
      ok: generationOk,
      model: payload.model,
      endpoint: payload.endpoint,
      fallbackFrom: payload.fallbackFrom,
      usage: payload.usage,
      generationError: payload.generationError || "",
      latencyMs: payload.latencyMs,
      testedAt: new Date().toISOString(),
    };
    provider.availableModels = payload.models || [];
    provider.usableModels = payload.usableModels || [];
    provider.modelProbes = payload.modelProbes || [];
    provider.modelListError = payload.modelListError || "";
    provider.modelListUpdatedAt = new Date().toISOString();
    const autoApplied = autoApplyAvailableProviderModel(providerId);
    saveStateSoon("provider-test");
    const autoText = autoApplied.changed ? ` 已自动把 ${autoApplied.changed} 条路由切到 ${autoApplied.model}。` : "";
    showToast(generationOk
      ? `${provider.name} 真实连接成功：${payload.endpoint || "api"}，发现 ${provider.availableModels.length} 个可用模型。${autoText}`
      : `${provider.name} 模型列表可用，但当前路由模型生成失败：${payload.generationError || "未知错误"}${autoText}`);
  } catch (error) {
    provider.status = "连接失败";
    provider.lastTest = {
      ok: false,
      error: error.message || "连接失败",
      testedAt: new Date().toISOString(),
    };
    provider.availableModels = [];
    provider.modelListError = provider.lastTest.error;
    saveStateSoon("provider-test-failed");
    showToast(`${provider.name} 连接失败：${provider.lastTest.error}`);
  } finally {
    renderModels();
    refreshIcons();
  }
}

function clampScore(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function draftParagraphs(text = "") {
  return String(text)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => textUnitLength(line) >= 2);
}

function draftSentences(text = "") {
  return String(text)
    .replace(/[“”"「」]/g, "")
    .split(/[。！？!?；;…]+/)
    .map((line) => line.trim())
    .filter((line) => textUnitLength(line) >= 2);
}

function regexCount(text = "", regex) {
  return (String(text).match(regex) || []).length;
}

function uniqueKeywordsFromText(text = "", limit = 40) {
  const stopWords = new Set(["本章", "必须", "出场", "推进", "结果", "一个", "一次", "不会", "不能", "没有", "需要", "开始", "之后", "之前", "继续", "关键", "目标", "场景", "动作", "对话", "正文", "细纲", "粗纲"]);
  const words = String(text).replace(/[0-9]{1,4}/g, " ").match(/[\u4e00-\u9fa5A-Za-z]{2,10}/g) || [];
  const seen = new Set();
  return words
    .map((word) => word.trim())
    .filter((word) => {
      if (!word || stopWords.has(word) || seen.has(word)) return false;
      seen.add(word);
      return true;
    })
    .slice(0, limit);
}

function normalizeCoverageText(value = "") {
  return String(value)
    .replace(/[\s\p{P}\p{S}]+/gu, "")
    .toLowerCase();
}

function coverageFragments(value = "") {
  const clean = normalizeCoverageText(value).replace(/[0-9]+/g, "");
  const chars = Array.from(clean);
  const fragments = [];
  for (let index = 0; index < chars.length - 1; index += 1) {
    const fragment = chars.slice(index, index + 2).join("");
    if (/[\u4e00-\u9fa5A-Za-z]{2}/.test(fragment)) fragments.push(fragment);
  }
  return [...new Set(fragments)];
}

function keywordMatchesText(text = "", keyword = "") {
  const source = normalizeCoverageText(text);
  const target = normalizeCoverageText(keyword);
  if (!target) return false;
  if (source.includes(target)) return true;
  const fragments = coverageFragments(keyword);
  if (!fragments.length) return false;
  const hits = fragments.filter((fragment) => source.includes(fragment)).length;
  const minHits = target.length <= 4
    ? Math.min(2, fragments.length)
    : Math.max(2, Math.ceil(fragments.length * 0.38));
  return hits >= minHits;
}

function keywordCoverage(text = "", keywords = []) {
  const usable = keywords.filter(Boolean);
  if (!usable.length) return { hit: 0, total: 0, ratio: 1, missed: [] };
  const hitWords = usable.filter((word) => keywordMatchesText(text, word));
  return {
    hit: hitWords.length,
    total: usable.length,
    ratio: hitWords.length / usable.length,
    missed: usable.filter((word) => !keywordMatchesText(text, word)).slice(0, 8),
  };
}

function detailOutlineKeywords(chapter = {}) {
  const detail = chapter.detailedOutline;
  const pieces = [];
  if (Array.isArray(detail)) {
    pieces.push(...detail);
  } else if (detail) {
    pieces.push(detail.core, detail.opening, detail.hook, ...(detail.clues || []));
    for (const scene of detail.scenes || []) {
      pieces.push(scene.title, scene.content, ...(scene.systemLines || []).slice(0, 2));
    }
  }
  if (!pieces.length) pieces.push(chapter.outline, chapter.title);
  return uniqueKeywordsFromText(pieces.filter(Boolean).join("。"), 12);
}

function goldFingerOutlineLine(project = currentProject()) {
  const names = goldFingerPowerNames(project);
  return names.length ? names.join(" / ") : "预言 / 身体强化 / 星运赋能 / 结果回收";
}

function scoreLengthContract(wordCount, targetWords) {
  const hardMin = 2200;
  const hardMax = 3000;
  const target = Math.min(hardMax, Math.max(hardMin, Number(targetWords) || hardMin));
  if (wordCount < hardMin) {
    const ratio = wordCount / Math.max(hardMin, 1);
    return clampScore(36 + ratio * 44, 35, 76);
  }
  if (wordCount <= hardMax) {
    const span = Math.max(target - hardMin, hardMax - target, 1);
    const distance = Math.abs(wordCount - target);
    return clampScore(95 - (distance / span) * 16, 80, 98);
  }
  const over = wordCount - hardMax;
  return clampScore(82 - over / 150, 72, 82);
}

function scoreHookText(text = "") {
  const tail = String(text).trim().slice(-180);
  if (!tail) return 40;
  let score = 58;
  if (/[？?！!。]$/.test(tail)) score += 7;
  if (/？|吗|谁|怎么|为什么|电话|消息|门|敲|来了|热搜|名单|系统|提示|反噬|倒计时|下一秒|刚要|停住|抬头/.test(tail)) score += 18;
  if (/结果|可就在|偏偏|没等|还没|直到|只剩|屏幕|弹窗|响了/.test(tail)) score += 10;
  if (/总结|回想|意识到|明白了|这就是|于是/.test(tail)) score -= 10;
  if (textUnitLength(tail) < 20) score -= 8;
  return clampScore(score, 40, 96);
}

function sceneInventoryPileCount(text = "") {
  const objectWords = ["房间", "筒子楼", "窗户", "垃圾站", "折叠床", "塑料凳", "烧水壶", "墙上", "报纸", "桌子", "椅子", "柜子", "纸箱", "床", "凳", "壶", "门", "窗"];
  return draftParagraphs(text).filter((paragraph) => {
    const commaCount = (paragraph.match(/[、，,]/g) || []).length;
    const objectHits = countKeywordHits(paragraph, objectWords);
    const measureHits = (paragraph.match(/[一二两三四五六七八九十\d]+[张个间把只扇面份本台条]/g) || []).length;
    return objectHits >= 4 && (commaCount >= 3 || measureHits >= 3);
  }).length;
}

function draftStyleMetrics(text = "") {
  const paragraphs = draftParagraphs(text);
  const sentences = draftSentences(text);
  const sentenceLengths = sentences.map(textUnitLength);
  const paragraphLengths = paragraphs.map(textUnitLength);
  const wordCount = textUnitLength(text);
  const dialogueChars = paragraphs
    .filter((line) => /[“”"「」]/.test(line))
    .reduce((sum, line) => sum + textUnitLength(line), 0);
  return {
    paragraphCount: paragraphs.length,
    sentenceCount: sentences.length,
    avgSentence: Math.round(sentenceLengths.reduce((sum, item) => sum + item, 0) / Math.max(sentenceLengths.length, 1)),
    avgParagraph: Math.round(paragraphLengths.reduce((sum, item) => sum + item, 0) / Math.max(paragraphLengths.length, 1)),
    dialogueRatio: Math.round((dialogueChars / Math.max(wordCount, 1)) * 100),
    actionHits: countKeywordHits(text, ["推", "拿", "递", "看", "走", "站", "坐", "敲", "拍", "打开", "关上", "挂断", "按住", "拉开", "转身", "抬头", "低头", "点头", "摇头", "停下", "退后", "靠近", "盯着", "翻开", "放下", "问", "说", "笑"]),
    summaryHits: countKeywordHits(text, ["复杂", "情绪", "仿佛", "似乎", "不禁", "忍不住", "莫名", "说不清道不明", "心中涌起", "眼神中闪过"]),
    innerChoiceHits: countKeywordHits(text, ["怕", "想", "不敢", "舍不得", "后悔", "赌", "忍", "认输", "翻身", "尊严", "底线", "顾虑", "算计", "退路", "机会"]),
    inventoryPileHits: sceneInventoryPileCount(text),
  };
}

function auditChapterDraft(project, chapter) {
  const targetWords = activeTargetWords(project, chapter);
  const hardMin = 2200;
  const hardMax = 3000;
  const text = chapter.manuscript || "";
  const wordCount = chapterWordCount(text);
  const styleMetrics = draftStyleMetrics(text);
  const forbiddenHits = ensureForbiddenWords(project)
    .filter((word) => word && text.includes(word))
    .slice(0, 8);
  const metaHits = ["细纲对应", "写法上", "粗纲节点", "本章定位", "剧情目标", "冲突设计", "章节结构"]
    .filter((word) => text.includes(word));
  const explicitScaleRisk = /强迫|灌醉|床戏|欲罢不能|荷尔蒙爆棚|露骨|脱衣|亲吻|接吻/.test(text);
  const underageRomanceRisk = /刘亦菲|未成年|十五岁|十五六岁|十六岁/.test(text) && /暧昧|亲密|亲吻|接吻|床戏|欲罢不能|荷尔蒙/.test(text);
  const missingRoles = (chapter.roles || [])
    .filter((role) => role && !text.includes(characterShortName(role)))
    .slice(0, 4);
  const currentDetailText = JSON.stringify(chapter.detailedOutline || "");
  const requiredClues = (chapter.clues || [])
    .filter((clue) => clue && clue.length <= 20 && (currentDetailText.includes(clue) || text.includes(clue)));
  const missingClues = requiredClues
    .filter((clue) => !text.includes(clue.replace(/第\s*\d+\s*章/g, "").trim()))
    .slice(0, 3);
  const issues = [];

  if (wordCount < hardMin) {
    issues.push({ type: "字数", level: "高", text: `正文 ${wordCount} 字，未达到硬性下限 ${hardMin} 字。`, fix: "按细纲继续补足现场行动、对话交锋、结果反馈和章末钩子。" });
  } else if (wordCount > hardMax) {
    issues.push({ type: "字数", level: "中", text: `正文 ${wordCount} 字，超过硬性上限 ${hardMax} 字。`, fix: "把后半段收束到 3000 字内，删掉重复解释和多余过渡。" });
  }
  if (metaHits.length) {
    issues.push({ type: "污染", level: "高", text: `正文混入工作台提示：${metaHits.join("、")}。`, fix: "删除提示词，只保留故事内场面。" });
  }
  if (forbiddenHits.length) {
    issues.push({ type: "禁词", level: "中", text: `命中模板词：${forbiddenHits.join("、")}。`, fix: "改成具体动作、物件、通告或现场反馈。" });
  }
  if (styleMetrics.inventoryPileHits) {
    issues.push({ type: "AI味", level: "中", text: `发现 ${styleMetrics.inventoryPileHits} 段场景物品清单式描写。`, fix: "删掉多数静态物品，只保留会影响人物选择的细节，补角色的欲望、顾虑和下一步动作。" });
  }
  if (explicitScaleRisk || underageRomanceRisk) {
    issues.push({ type: "尺度", level: "高", text: "存在平台尺度或未成年感情风险。", fix: "只保留成年人自愿、留白和关系后果；未成年只写事业守护。" });
  }
  if (missingRoles.length) {
    issues.push({ type: "角色", level: "中", text: `计划角色未明显出场：${missingRoles.join("、")}。`, fix: "补一个明确动作或调整本章角色计划。" });
  }
  if (missingClues.length) {
    issues.push({ type: "伏笔", level: "中", text: `伏笔未落到正文：${missingClues.join("、")}。`, fix: "补一处物件、提示框、台词或结果。" });
  }
  if (!/[？?。！!][\s\S]{0,120}$/.test(text)) {
    issues.push({ type: "钩子", level: "中", text: "结尾钩子不够明确。", fix: "用新问题、反噬提示、电话、门外来人或资源变化收尾。" });
  }

  const outlineCoverage = keywordCoverage(text, detailOutlineKeywords(chapter));
  const lengthScore = scoreLengthContract(wordCount, targetWords);
  const highIssues = issues.filter((issue) => issue.level === "高").length;
  const midIssues = issues.filter((issue) => issue.level === "中").length;
  const roleCount = Math.max((chapter.roles || []).length, 1);
  const roleCoverage = (roleCount - missingRoles.length) / roleCount;
  const clueCount = Math.max((chapter.clues || []).length, 1);
  const clueCoverage = ((chapter.clues || []).length - missingClues.length) / clueCount;
  const actionDensity = styleMetrics.actionHits / Math.max(wordCount / 1000, 0.2);
  const conflictHits = regexCount(text, /反噬|热搜|黑料|质疑|拒绝|威胁|压|抢|截|爆|错|没想到|偏偏|电话|敲门|名单|合同|证据|系统/g);
  const targetStyle = project.styleSampleStats || {};
  const sentenceGap = targetStyle.avgSentence ? Math.abs(styleMetrics.avgSentence - targetStyle.avgSentence) : 0;
  const dialogueGap = targetStyle.dialogueRatio ? Math.abs(styleMetrics.dialogueRatio - targetStyle.dialogueRatio) : 0;
  const detail = {
    plot: clampScore(lengthScore * 0.42 + outlineCoverage.ratio * 28 + Math.min(16, actionDensity * 2) + Math.min(14, conflictHits * 3) - metaHits.length * 12, 35, 98),
    character: clampScore(58 + roleCoverage * 24 + Math.min(10, styleMetrics.dialogueRatio / 3) + clueCoverage * 8 - missingRoles.length * 8, 35, 96),
    style: clampScore(
      86
      - forbiddenHits.length * 4
      - metaHits.length * 14
      - Math.min(14, styleMetrics.summaryHits * 2)
      - Math.min(12, styleMetrics.inventoryPileHits * 6)
      - Math.min(10, sentenceGap)
      - Math.min(8, dialogueGap / 2)
      + Math.min(8, actionDensity),
      30,
      96,
    ),
    hook: scoreHookText(text),
    scale: explicitScaleRisk || underageRomanceRisk ? 55 : 94,
  };
  let score = Math.round(detail.plot * 0.3 + detail.character * 0.18 + detail.style * 0.22 + detail.hook * 0.15 + detail.scale * 0.15);
  if (wordCount < targetWords * 0.8) score = Math.min(score, 72);
  if (metaHits.length) score = Math.min(score, 76);
  if (explicitScaleRisk || underageRomanceRisk) score = Math.min(score, 64);
  if (highIssues) score = Math.min(score, 79);
  const passed = score >= 80 && !highIssues;

  return {
    score,
    detail,
    issues,
    passed,
    meta: {
      method: CURRENT_RUBRIC_METHOD,
      wordCount,
      targetWords,
      outlineCoverage,
      roleCoverage,
      clueCoverage,
      styleMetrics,
    },
    notes: [
      wordCount >= hardMin && wordCount <= hardMax
        ? `字数达标：${wordCount}（目标 ${targetWords}）`
        : wordCount < hardMin
          ? `字数不足：${wordCount}（下限 ${hardMin}）`
          : `字数超限：${wordCount}（上限 ${hardMax}）`,
      `细纲覆盖：${outlineCoverage.hit}/${outlineCoverage.total}；角色覆盖：${Math.round(roleCoverage * 100)}%；伏笔覆盖：${Math.round(clueCoverage * 100)}%。`,
      `文风指标：均句 ${styleMetrics.avgSentence} 字，对话 ${styleMetrics.dialogueRatio}%，动作词 ${styleMetrics.actionHits}，心理选择词 ${styleMetrics.innerChoiceHits}，解释词 ${styleMetrics.summaryHits}，物品堆叠 ${styleMetrics.inventoryPileHits} 段。`,
      issues.length ? `审查发现 ${issues.length} 项问题，高风险 ${highIssues} 项。` : "审查通过：未发现明显结构、禁词、尺度和伏笔问题。",
      midIssues ? `中风险 ${midIssues} 项，完成前建议修一遍。` : "中风险 0 项。",
    ],
  };
}

function submitCurrentChapterForReview() {
  const project = currentProject();
  const chapter = selectedChapter();
  if (!chapter) {
    showToast("当前项目还没有章节，先导入大纲并拆章。");
    return;
  }

  const normalizedText = trimDraftToWordLimit($("#manuscript").value || "", 3000);
  $("#manuscript").value = normalizedText;
  chapter.manuscript = normalizedText;
  chapter.wordCount = chapterWordCount(chapter.manuscript);
  chapter.status = "审查中";
  chapter.reviewPassed = false;
  chapter.reviewIssues = [];
  chapter.submittedAt = new Date().toISOString();
  state.activeChapterFilter = "review";
  renderAll();
  switchPage("writer");
  saveStateSoon("submit-review");
  showToast(`第 ${chapter.id} 章已送审。`);
}

function scoreCurrentChapter() {
  const project = currentProject();
  const chapter = selectedChapter();
  if (!chapter) {
    showToast("当前项目还没有章节，先导入大纲并拆章。");
    return;
  }

  const normalizedText = trimDraftToWordLimit($("#manuscript").value || "", 3000);
  $("#manuscript").value = normalizedText;
  chapter.manuscript = normalizedText;
  chapter.wordCount = chapterWordCount(chapter.manuscript);
  const targetWords = activeTargetWords(project, chapter);
  const audit = auditChapterDraft(project, chapter);
  chapter.scoreDetail = audit.detail;
  chapter.score = audit.score;
  chapter.scoreMeta = audit.meta;
  chapter.reviewIssues = audit.issues;
  chapter.reviewPassed = audit.passed;
  chapter.reviewedAt = new Date().toISOString();
  if (chapter.status !== "完成") {
    chapter.status = audit.passed ? "已审查" : "待修";
  }
  chapter.wordCount = chapterWordCount(chapter.manuscript);
  chapter.progress = Math.min(99, Math.round((chapter.wordCount / targetWords) * 100));
  if (chapter.status === "完成") chapter.progress = 100;
  chapter.scoreNotes = audit.notes;
  const scores = project.chapters.filter((item) => item.score).map((item) => item.score);
  project.averageScore = Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length);
  project.health.audit = Math.min(project.health.audit + 10, 100);
  state.activeChapterFilter = chapter.status === "完成" ? "done" : "review";
  renderAll();
  switchPage("writer");
  saveStateSoon("score-chapter");
  if (chapter.status === "完成") {
    showToast(`第 ${chapter.id} 章已重新审查打分：${chapter.score} 分，完成状态保持不变。`);
  } else {
    showToast(audit.passed ? `第 ${chapter.id} 章审查通过：${chapter.score} 分，可标记完成。` : `第 ${chapter.id} 章审查未通过：${audit.issues.length} 项需修。`);
  }
}

async function completeCurrentChapter() {
  const project = currentProject();
  const chapter = selectedChapter();
  if (!chapter) return;
  const previousText = chapter.manuscript || "";
  const nextText = trimDraftToWordLimit($("#manuscript").value || "", 3000);
  if (!nextText.trim()) {
    showToast("正文为空，不能标记完成。");
    return;
  }
  $("#manuscript").value = nextText;
  recordManualStyleRevision(project, chapter, previousText, nextText);
  chapter.manuscript = nextText;
  chapter.wordCount = chapterWordCount(chapter.manuscript);
  const audit = auditChapterDraft(project, chapter);
  chapter.scoreDetail = audit.detail;
  chapter.score = audit.score;
  chapter.scoreMeta = audit.meta;
  chapter.reviewIssues = audit.issues;
  chapter.reviewPassed = audit.passed;
  chapter.scoreNotes = audit.notes;
  chapter.reviewedAt = new Date().toISOString();
  chapter.completionWarnings = audit.issues;
  chapter.status = "完成";
  chapter.progress = 100;
  chapter.completedAt = new Date().toISOString();
  project.currentChapter = Math.max(project.currentChapter || 0, chapter.id);
  project.words = projectWordCount(project);
  const scores = project.chapters.filter((item) => item.score).map((item) => item.score);
  if (scores.length) project.averageScore = Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length);
  project.health.audit = Math.min((project.health.audit || 0) + 10, 100);
  state.activeChapterFilter = "done";
  state.activeChapterId = chapter.id;
  renderAll();
  switchPage("writer");
  await saveStateNowWithMessage(
    "complete-chapter",
    audit.issues.length
      ? `第 ${chapter.id} 章已标记完成，保留 ${audit.issues.length} 项审查提示。`
      : `第 ${chapter.id} 章已标记完成。`,
  );
}

function normalizeDraftOutline(project, chapter) {
  migrateChapterOutline(chapter, project);
  return chapter.detailedOutline;
}

function cleanGeneratedDraft(text) {
  return String(text || "")
    .replace(/这一段细纲对应的是：?.*?(?:\n|$)/g, "")
    .replace(/写法上[^。\n]*[。\n]?/g, "")
    .replace(/粗纲节点[:：][^。\n]*[。\n]?/g, "")
    .replace(/本章定位[:：][^。\n]*[。\n]?/g, "")
    .replace(/剧情目标[:：][^。\n]*[。\n]?/g, "")
    .replace(/冲突设计[:：][^。\n]*[。\n]?/g, "")
    .replace(/伏笔\/约束[:：][^。\n]*[。\n]?/g, "")
    .replace(/章节结构[:：][^。\n]*[。\n]?/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function buildSystemPanel(lines = []) {
  return lines.map((line) => `> ${line}`).join("\n");
}

function scenePanel(scene, fallback = []) {
  return buildSystemPanel(scene.systemLines?.length ? scene.systemLines : fallback);
}

function buildEntertainmentScene(scene, context, index) {
  const { lead, support, detail, clue } = context;
  const sceneTitle = scene.title || `场景${index + 1}`;
  const sceneContent = scene.content || detail.core || "继续推进本章事件";

  if (/走投无路|房租|生存危机/.test(sceneTitle + sceneContent)) {
    return `陈玄蹲在城中村的路边啃馒头。\n\n馒头已经凉透了。他咬了一口，噎得半天没咽下去。裤兜里只有七块钱，房东却从巷口走了过来，手里还拿着那本旧账本。\n\n“陈玄。”房东停在摊前，把账本往桌上一拍，“三百不行了，从今天起四百。今天交不上，你晚上就搬。”\n\n旁边几个打牌的大爷抬头看热闹。\n\n陈玄把馒头咽下去，声音有点哑：“再宽限三天。”\n\n房东笑了一声：“你算命的，算到自己今天交不起房租了吗？”\n\n大爷们跟着笑。\n\n陈玄没有还嘴。他刚要把桌上的纸笔收起来，脑子里忽然响了一声。\n\n${scenePanel(scene, ["【预言系统已激活】", "→ 检测到宿主处于生存危机", "→ 赠送新手预言次数：1次"])}\n\n陈玄的手停在半空。\n\n他没有抬头，也没有把自己听见的东西说出来。房东还在催，旁边的人还在笑，巷子口的热风把纸钱吹得翻了个边。\n\n这一刻，他先把馒头放下了。`;
  }

  if (/随手一预言|自行车|茶水摊/.test(sceneTitle + sceneContent)) {
    return `系统面板上又跳出一行字。\n\n${scenePanel(scene, ["【新手预言】", "→ 即将有一辆自行车撞过来"])}\n\n陈玄盯着那行字，还没来得及反应，街对面就响起一串急促的车铃。\n\n一个穿校服的男生骑着二八大杠冲过来。前面突然窜出一条黄狗，男生一慌，车龙头往旁边一歪。\n\n哐当一声。\n\n房东刚支好的茶水摊被撞翻了。\n\n茶壶碎了，茶杯滚了一地，热水顺着水泥地往外流。刚才还在笑的几个大爷，全都张着嘴没说出话。\n\n房东低头看着自己湿掉的裤脚，脸上的笑也没了。\n\n陈玄站在原地，心跳一下比一下重。\n\n他看着那个摔在地上的男生，又看了一眼只有自己能看见的面板。\n\n${scenePanel({ systemLines: ["【新手预言已兑现】", "→ 验证通过", "→ 倒计时：72小时后系统正式启动"] })}\n\n这玩意儿是真的。`;
  }

  if (/系统规则|反噬|规则弹出/.test(sceneTitle + sceneContent)) {
    return `陈玄回到出租屋，先把门反锁。\n\n屋子不足十平，床边堆着纸箱，墙皮潮得发黑。他坐在床沿上，手心还在发汗。\n\n系统面板在眼前展开。\n\n${scenePanel(scene, ["【警告：预言成功率100%，但反噬不可逆】", "→ 请在两日内找到高星运目标建立羁绊", "→ 否则宿主承受全部反噬"])}\n\n陈玄把每一行字看完，脸上的血色一点点退下去。\n\n预言能用。\n\n但不是白用。\n\n${sceneContent}\n\n门外又有人走过，拖鞋踩在水泥地上，声音慢慢远了。陈玄把桌上的报纸拿起来，翻到娱乐版。\n\n他现在需要一个高星运目标。\n\n可他连今晚住哪儿都差点保不住。`;
  }

  if (/刘亦菲出现|星运值|报纸/.test(sceneTitle + sceneContent)) {
    return `第二天下午，太阳把巷子晒得发白。\n\n陈玄把小马扎摆在阴影里，桌上压着一张手写的“测字算命”。他正低头打瞌睡，一阵脚步声停在摊前。\n\n“请问，这里可以算命吗？”\n\n声音很轻，带一点南方口音。\n\n陈玄抬头。\n\n一个扎马尾的女生站在桌前。她穿白色短袖和牛仔裤，手里攥着一份《北京晚报》。她看起来只有十五六岁，站在这条灰扑扑的小巷里，白得有点显眼。\n\n系统面板弹出来。\n\n${scenePanel(scene, ["【高星运目标发现】", `→ ${support}·星运值：99/100`, "→ 未来潜力：顶流巨星"])}\n\n陈玄把心跳压下去，指了指马扎：“坐。”\n\n${support}坐下，把报纸摊开。中缝有一条剧组选角通告。\n\n陈玄没有等她开口。\n\n“你想问自己能不能当演员。”\n\n她手指一下攥紧报纸边：“你怎么知道？”\n\n陈玄看着她，没有解释系统，也没有讲一堆命理。他只把结果说出来。\n\n“你二十五岁之前会红。”\n\n巷子里安静了一下。\n\n他又补了一句：“红到出门要戴口罩那种。”\n\n${support}低头看着报纸，过了几秒才抬头。她没有笑，也没有立刻信，只是眼睛亮了一点。`;
  }

  const panels = [
    ["【星运波动】", `→ ${support}信任度上升`, "→ 反噬暂缓，但没有解除"],
    ["【结果确认】", "→ 预言兑现进度增加", `→ 下一步需要${support}亲自做选择`],
    ["【警告】", `→ ${clue || "新的代价已经出现"}`, "→ 请尽快处理下一阶段风险"],
  ];

  return `陈玄把今天的事记在纸上。\n\n七块钱，房租，报纸，${support}，还有系统面板上反复跳动的数字。\n\n${sceneContent}\n\n他没有把话说满，只先做眼前能做的事。能打电话就去电话亭，能看报纸就把娱乐版翻完，能守在剧组外就先守住门口。\n\n系统面板无声弹出。\n\n${scenePanel(scene, panels[index % panels.length])}\n\n${lead}把纸折好，塞进贴身口袋。\n\n这一步走出去，后面的人才会跟着动。`;
}

function buildGenericScene(scene, context, index) {
  const { lead, support, detail, clue } = context;
  const sceneContent = scene.content || detail.core || "继续推进本章事件";
  const templates = [
    `${lead}到现场的时候，争吵已经停不下来了。\n\n桌上的清单被人拍得一歪，最上面那一行正好露出来。数量不对，时间也不对。所有人都看见了，但没人先开口。\n\n${support}站在门边，手还按在门框上。他看了${lead}一眼，没有抢话。\n\n${sceneContent}\n\n${lead}把清单拿起来，先看最后一页。那里有一个被划掉的名字，还有一行补写的小字。\n\n“谁改的？”他问。\n\n没人回答。\n\n他把纸放回桌上，没有提高声音：“那就从结果查。少了多少，去了哪里，谁签的字，一项一项对。”\n\n屋里的人终于动了。有人低头翻包，有人转身去找仓库钥匙。刚才还想把事压下去的人，脸色一下沉了。`,
    `门外的风把铁皮牌吹得直响。\n\n${lead}没有进去，先站在门口看了一圈。地上有新踩出来的泥印，窗台上有半截烟灰，锁孔旁边还有一道新划痕。\n\n${support}低声说：“来过人。”\n\n${lead}点头。\n\n${sceneContent}\n\n他没有急着解释判断过程，只把手套戴上，推门进去。屋里味道很重，像潮气混着旧纸箱。角落里的东西被翻过，但翻得很克制，不像乱找，倒像知道自己要拿什么。\n\n${lead}蹲下来，从柜子底下抽出一张压皱的纸。\n\n纸上只有半个坐标。\n\n${support}看清以后，脸色变了：“这是我们内部的路线。”\n\n${lead}把纸折起来：“所以，今天不是丢东西。”\n\n他抬头看向窗外。\n\n“是有人在试路。”`,
    `下午三点，第二个消息传回来。\n\n对方没有撤，反而把人往前压了两百米。这个距离很难受，刚好卡在能看见他们、又够不着他们的位置。\n\n${lead}把地图铺开，用指节点了两下。\n\n${sceneContent}\n\n${support}看着那个点，问：“现在打？”\n\n“现在打，他们就知道我们急。”\n\n${lead}拿起笔，在旁边画了一个小圈。${clue ? `那一圈正好压住${clue}留下的位置。` : "那一圈压住了对方最容易忽略的后路。"}\n\n十分钟后，第一队人悄悄绕出去。没有口号，也没有多余的话。每个人只带够用的东西，脚步压得很轻。\n\n对方还在等他们正面冲出去。\n\n等到天色暗下来，后路先断了。`,
    `结果落地得很快。\n\n最先回来的不是人，是一串急促的敲门声。${support}把门拉开，外面的人满头是汗，手里还攥着刚拿回来的东西。\n\n“找到了。”\n\n${lead}接过来，只看一眼，就知道今天这一步没有白走。\n\n${sceneContent}\n\n屋里的人都松了一口气。但${lead}没有笑。他把东西放在桌上，又把地图往旁边推了一寸。\n\n“这只是他们愿意让我们看见的。”\n\n${support}刚放下的手又收紧了。\n\n${lead}看向门口。走廊尽头有人停了一下，很快又走开。\n\n新的麻烦没有躲太远。\n\n它已经知道他们追上来了。`,
  ];

  return templates[index % templates.length].trim();
}

function buildSceneDraft(scene, context, index) {
  return context.entertainmentPreset
    ? buildEntertainmentScene(scene, context, index)
    : buildGenericScene(scene, context, index);
}

function buildFillerBeat(context, index) {
  const { lead, support, detail, clue, entertainmentPreset } = context;
  if (entertainmentPreset) {
    return [
      `${lead}回到摊位后，没有把刚才的话再讲一遍。他把报纸压平，用铅笔在选角通告旁边画了一个小圈。圈没有画满，留了一个口子。\n\n${support}如果再来，第一眼就能看见那个口子。\n\n他要的不是让她立刻相信一切，而是让她愿意再问一句。只要她再问，下一步就能往前走。\n\n巷口有人喊卖冰棍，房东在旁边数零钱。陈玄把那七块钱重新塞进口袋，起身去电话亭看了一眼。电话亭玻璃上贴着旧广告，下面压着一张北京地图。\n\n他把地图买了下来。`,
      `夜里起风，窗户缝里一直响。\n\n陈玄把系统提示写在纸上，写到“反噬”两个字时，笔尖停了一下。他没有给自己找理由，也没有骂系统坑他。\n\n能用的东西很少。\n\n一张报纸，一个预言，一个还没完全相信他的女孩，还有三天时间。\n\n他把纸揉掉，又重新写了一张。这一次只写结果：让电话打来，让她去北京，让剧组看见她。\n\n写完以后，他把纸贴在墙上。\n\n风从窗缝里钻进来，纸边轻轻抖。`,
    ][index % 2];
  }

  return [
    `${lead}把现场重新走了一遍。\n\n他没有让人跟着，只让${support}守在门口。很多事站在人堆里看不清，安静下来反而能看见痕迹。\n\n桌角的灰，门边的泥，清单上停顿过的笔画，全都在告诉他同一件事：对方不是临时起意。\n\n${clue ? `${clue}还不能现在拆开。` : "那条线还不能现在拆开。"}\n\n现在拆开，只会让真正动手的人提前躲起来。`,
    `半小时后，第一批结果送到。\n\n没有人敢再说这是小事。少掉的东西、错开的时间、对不上的签名，连在一起就是一条很清楚的线。\n\n${support}把材料放到${lead}面前。\n\n${lead}翻完最后一页，抬头说：“先别惊动他们。”\n\n他要让对方继续往前走一步。\n\n只有那一步走出来，才知道谁在后面牵线。`,
  ][index % 2];
}

function buildTargetExpansionBeat(context, index) {
  const { lead, support, detail, clue, entertainmentPreset } = context;
  if (entertainmentPreset) {
    return [
      `${lead}没有急着给自己找答案。他把今天能查的东西全列出来：电话、地址、报名截止日、剧组联系人，还有${support}可能会被家里人问住的问题。\n\n每一项都得落到纸上。只靠一句预言，她不会真的往前走。可如果电话能打通，地址能查到，报名照能送出去，事情就不一样了。\n\n他把零钱摊在桌面上，一枚一枚数完，又把最皱的那张纸币压平。钱不够，他就先做不要钱的事。`,
      `外面的巷子已经安静下来，楼下还剩几个人在收摊。${lead}推开窗，看见房东蹲在茶水摊旁边擦地，嘴里还在骂。\n\n白天那一撞，替他挡掉了最急的一刀。可系统面板上的反噬没有消失。\n\n${clue ? `${clue}这条线还得继续往前推。` : "下一步必须让结果自己说话。"}\n\n他关上窗，把报纸翻到娱乐版，从第一行重新看起。`,
      `第二天一早，${lead}先去了电话亭。玻璃门上贴着旧广告，话筒线绕了两圈，拨号盘转得很慢。\n\n他按下号码，听见里面传来忙音，就把时间记在纸上。隔十分钟再拨一次。\n\n这不是在碰运气。\n\n他要把一个预言拆成能做的步骤。步骤走完，${support}才会看见结果，信任也才会真正落下来。`,
    ][index % 3];
  }

  return [
    `${lead}把刚才的结果重新过了一遍。\n\n他没有让人散开，只让每个人把自己手里的东西拿出来。清单、钥匙、坐标、签字页，全都摆到桌上。\n\n麻烦不能靠猜。要看谁少了一步，谁多了一句话，谁在最该出声的时候沉默。\n\n${support}站在旁边，没有打断他，只把最后一页材料推了过来。`,
    `屋里很快安静下来。\n\n${lead}点了三个人的名字，让他们分别去查不同的口子。一个查时间，一个查物资，一个查人。\n\n${clue ? `${clue}暂时不拆开，但必须先压住。` : "真正的线索暂时不拆开，但必须先压住。"}\n\n如果现在把话说满，对方会立刻缩回去。只有让他们以为还能藏，后面那只手才会继续动。`,
    `半小时后，第一个反馈送回来。\n\n结果不大，却很准。对方确实动过手，只是动得很轻，像是故意留一半痕迹给他们看。\n\n${support}看完材料，低声问：“他们想引我们过去？”\n\n${lead}把纸合上。\n\n“不是引我们。”\n\n他看向门外。\n\n“是在试我们敢不敢跟。”`,
  ][index % 3];
}

function trimDraftToWordLimit(text = "", maxWords = 3000) {
  const source = cleanGeneratedDraft(text);
  if (chapterWordCount(source) <= maxWords) return source;

  let count = 0;
  let lastSoftBreak = 0;
  let lastParagraphBreak = 0;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (/[\u4e00-\u9fa5A-Za-z0-9]/.test(char)) count += 1;
    if (/[。！？!?]/.test(char)) lastSoftBreak = index + 1;
    if (char === "\n") lastParagraphBreak = index + 1;
    if (count >= maxWords) {
      const cutPoint = Math.max(lastSoftBreak, lastParagraphBreak, index + 1);
      return source.slice(0, cutPoint).trim();
    }
  }

  return source.trim();
}

function completeDraftToTarget(draft, context, targetWords) {
  let output = cleanGeneratedDraft(draft);
  let index = 0;
  const desiredWords = Math.min(3000, Math.max(2200, Number(targetWords) || 2200));
  while (chapterWordCount(output) < desiredWords && index < 36) {
    output = cleanGeneratedDraft(`${output}\n\n${buildTargetExpansionBeat(context, index)}`);
    index += 1;
  }
  return trimDraftToWordLimit(output, 3000);
}

function buildLiuyifeiChapterOneDraft() {
  return cleanGeneratedDraft(`第1章 这个算命的开挂了

陈玄蹲在城中村的路边啃馒头。

馒头已经凉透了。他咬了一口，噎得半天没咽下去。裤兜里只有七块钱，房东却从巷口走了过来，手里还拿着那本旧账本。

“陈玄。”

房东停在摊前，把账本往桌上一拍。

“三百不行了，从今天起四百。今天交不上，你晚上就搬。”

旁边几个打牌的大爷抬头看热闹。

陈玄把馒头咽下去，声音有点哑：“再宽限三天。”

房东笑了一声：“你算命的，算到自己今天交不起房租了吗？”

大爷们跟着笑。

陈玄没有还嘴。他刚要把桌上的纸笔收起来，脑子里忽然响了一声。

> 【预言系统已激活】
> → 检测到宿主处于生存危机
> → 赠送新手预言次数：1次

陈玄的手停在半空。

他没有抬头，也没有把自己听见的东西说出来。房东还在催，旁边的人还在笑，巷子口的热风把纸钱吹得翻了个边。

系统面板又弹出一行。

> 【新手预言】
> → 三秒后，一辆自行车会撞翻茶水摊

陈玄刚看完，街对面就响起一串急促的车铃。

一个穿校服的男生骑着二八大杠冲过来。前面突然窜出一条黄狗，男生一慌，车龙头往旁边一歪。

哐当一声。

房东刚支好的茶水摊被撞翻了。

茶壶碎了，茶杯滚了一地，热水顺着水泥地往外流。刚才还在笑的几个大爷，全都张着嘴没说出话。

房东低头看着自己湿掉的裤脚，脸上的笑也没了。

陈玄站在原地，心跳一下比一下重。

他看着那个摔在地上的男生，又看了一眼只有自己能看见的面板。

> 【新手预言已兑现】
> → 验证通过
> → 倒计时：72小时后系统正式启动

这玩意儿是真的。

房东顾不上再催房租，先去扶自己的茶水摊。男生连声道歉，几个大爷也围过去捡杯子。

没人再笑陈玄。

陈玄把桌上的纸笔收进布袋，趁乱离开巷口。

出租屋不足十平，床边堆着纸箱，墙皮潮得发黑。他进门后先把门反锁，坐在床沿上，手心还在发汗。

系统面板在眼前展开。

> 【警告：预言成功率100%，但反噬不可逆】
> → 预言消耗星运能量
> → 成功可升级，超负荷将触发反噬
> → 请在两日内找到高星运目标建立羁绊

陈玄把每一行字看完，脸上的血色一点点退下去。

预言能用。

但不是白用。

他从抽屉里翻出一张旧报纸，先看日期，又看娱乐版。纸上全是明星、剧组、选角消息，离他这个城中村算命摊远得像另一个世界。

可系统要的是高星运目标。

他连自己今晚住哪儿都差点保不住。

夜里起风，窗户缝里一直响。

陈玄把系统提示写在纸上，写到“反噬”两个字时，笔尖停了一下。他没有骂系统，也没有给自己找理由。

能用的东西很少。

一张报纸，一个预言，七块钱，还有两天时间。

第二天下午，太阳把巷子晒得发白。

陈玄把小马扎摆在阴影里，桌上压着一张手写的“测字算命”。他正低头打瞌睡，一阵脚步声停在摊前。

“请问，这里可以算命吗？”

声音很轻，带一点南方口音。

陈玄抬头。

一个扎马尾的女生站在桌前。她穿白色短袖和牛仔裤，手里攥着一份《北京晚报》。她看起来只有十五六岁，站在这条灰扑扑的小巷里，白得有点显眼。

系统面板弹出来。

> 【刘亦菲·星运值：99/100】
> → 当前身份：普通中学生
> → 未来潜力：顶流巨星
> → 首次发现高星运目标，奖励星运能量+50

陈玄把心跳压下去，指了指马扎。

“坐。”

刘亦菲坐下，把报纸摊开。中缝有一条剧组选角通告，纸角已经被她攥皱了。

她开口前先看了陈玄一眼，像怕被人笑。

陈玄没有等她问。

“你想问自己能不能当演员。”

她手指一下攥紧报纸边。

“你怎么知道？”

陈玄看着她，没有解释系统，也没有讲一堆命理。他只把结果说出来。

“你二十五岁之前会红。”

巷子里安静了一下。

他又补了一句：“红到出门要戴口罩那种。”

刘亦菲低头看着报纸，过了几秒才抬头。她没有笑，也没有立刻信，只是眼睛亮了一点。

“真的？”

“真的。”

陈玄把报纸往她面前推回去：“你要去北京。不要等别人说你合不合适，你先去。”

刘亦菲把那份报纸收起来，站起身时还回头看了他一眼。

“我回去跟我妈说。”

她走到巷口，又停了一下。

“算命多少钱？”

陈玄看着她手里那张报纸，摇头：“下次再给。”

刘亦菲点点头，转身跑进阳光里。

陈玄一直看着她走远，才慢慢低下头。

系统面板没有消失。

> 【首次高星运目标接触完成】
> → 星运能量+50
> → 反噬值：0%→30%

陈玄盯着最后一行字，手指慢慢收紧。

他刚找到救命的人。

代价也跟着来了。

下午的热风还在巷子里打转，陈玄却觉得后背发冷。

他把摊子收得很慢。纸笔放进布袋，马扎夹在胳膊下，那份被刘亦菲摸皱过边角的报纸版面，被他重新买了一份。

报摊老板看他连买两份北京晚报，随口问：“你也追星啊？”

陈玄摇头，把钱递过去。

“找路。”

老板没听明白，只低头找零。

陈玄拿着报纸回到出租屋，先把门栓插上，再把报纸铺在桌上。选角通告、剧组地址、报名电话、截止日期，他一项一项抄下来。

写到最后，他的手开始发抖。

不是激动。

是系统面板上的反噬值还在缓慢跳动。

> 【反噬值：30%】
> → 首次高星运目标接触完成
> → 信任度不足，反噬仍将继续增长

陈玄把笔放下，盯着“信任度不足”四个字看了很久。

刘亦菲今天只是听见了一个好听的预言。

这还不够。

她得亲眼看见结果。

陈玄把刚抄好的报名电话圈起来，又在旁边写下三个字。

三天内。

窗外，房东还在楼下骂那个撞翻茶水摊的男生。巷子重新吵了起来，好像什么都没变。

陈玄低头看着桌上的纸。

对别人来说，这只是一个十五岁女孩想去试镜。

对他来说，这是第一条活路。`);
}

function buildLiuyifeiEarlyDraft(project, chapter, detail) {
  const targetWords = activeTargetWords(project, chapter);
  const continuity = buildChapterContinuityMemory(project, chapter);
  if (chapter.id === 1) {
    const context = { lead: "陈玄", support: "刘亦菲", detail, clue: chapter.clues?.[0] || detail?.clues?.[0] || "", entertainmentPreset: true };
    return completeDraftToTarget(buildLiuyifeiChapterOneDraft(), context, targetWords);
  }
  const roles = outlineRoleNames(chapter.roles?.length ? chapter.roles : detail.roles || ["陈玄", "刘亦菲"]);
  const lead = roles[0] || "陈玄";
  const support = roles[1] || "刘亦菲";
  const sceneText = (detail.scenes || [])
    .map((scene) => `${scene.content}${scene.systemLines?.length ? `\n\n${buildSystemPanel(scene.systemLines)}` : ""}`)
    .join("\n\n");
  let draft = `${continuity.digest ? `【连续性记忆】\n${continuity.digest}\n\n` : ""}第${chapter.id}章 ${chapter.title}\n\n${detail.opening}\n\n${sceneText}\n\n${detail.hook}`;
  const additions = [
    `${lead}没有把系统的事说出口。他只把所有线索写在纸上：时间、地点、电话、报纸，还有${support}每一次回头时的表情。\n\n他现在能做的不是解释命运，而是把一个结果推到她面前。结果落下去，信任才会往上涨。\n\n桌上的铅笔削得很短，他就用小刀重新削了一截。木屑落在报纸边上，正好压住那条剧组选角消息。`,
    `${support}离开后，巷子重新吵起来。陈玄把桌上的纸笔收好，先去电话亭确认号码，再去报摊买下当天所有娱乐版。\n\n报摊老板以为他想追明星，随手给他多塞了一份旧报纸。陈玄没解释，只把所有和剧组有关的版面折起来。\n\n他要知道北京怎么去，剧组在哪儿，报名照要寄到哪里。`,
    `夜里风很大，出租屋的窗户关不严。陈玄坐在床边，看着系统面板上的数字，知道下一步不能慢。\n\n他把今天听到的每句话都写下来，又把最有用的那一句圈住：三天内。\n\n三天内必须让${support}看到结果。否则她只会把他当成一个会说好话的算命先生。`,
    `第二天一早，房东又在楼下喊人。陈玄没有出去吵，只把布袋翻了一遍。\n\n七块钱不够去北京，也不够付房租。可现在的问题不是钱，是信任。\n\n他把最后一张干净纸铺开，在上面写下两个字：电话。\n\n只要电话响起，一切就会往前走。`,
  ];
  let index = 0;
  while (chapterWordCount(draft) < targetWords && index < additions.length * 8) {
    draft += `\n\n${additions[index % additions.length]}`;
    index += 1;
  }
  const context = { lead, support, detail, clue: chapter.clues?.[0] || detail?.clues?.[0] || "", entertainmentPreset: true };
  return completeDraftToTarget(draft, context, targetWords);
}

function buildFullChapterDraft(project, chapter) {
  const targetWords = activeTargetWords(project, chapter);
  const detail = normalizeDraftOutline(project, chapter);
  const continuity = buildChapterContinuityMemory(project, chapter);
  if (/刘亦菲/.test(detail.sourceNode || detail.core || "") && chapter.id <= 7) {
    return buildLiuyifeiEarlyDraft(project, chapter, detail);
  }
  const roles = outlineRoleNames(chapter.roles?.length ? chapter.roles : detail.roles || ["主角"]);
  const context = {
    project,
    chapter,
    detail,
    lead: roles[0] || "主角",
    support: roles[1] || (isEntertainmentProject(project) ? "刘亦菲" : "同伴"),
    clue: (detail.clues?.[0] || chapter.clues?.[0] || "").replace(/[。；;]$/, ""),
    entertainmentPreset: isEntertainmentProject(project),
    continuity,
  };
  const sections = [];

  sections.push(`${continuity.digest ? `【连续性记忆】\n${continuity.digest}\n\n` : ""}第${chapter.id}章 ${chapter.title}\n\n${detail.opening || chapter.outline || chapter.title}`);
  (detail.scenes || []).forEach((scene, index) => {
    sections.push(buildSceneDraft(scene, context, index));
  });

  let fillerIndex = 0;
  while (chapterWordCount(sections.join("\n\n")) < Math.max(2200, targetWords - 180) && fillerIndex < 18) {
    sections.splice(Math.max(2, sections.length - 1), 0, buildFillerBeat(context, fillerIndex));
    fillerIndex += 1;
  }

  const ending = context.entertainmentPreset
    ? `${context.lead}把东西收好，刚准备关灯，系统面板又亮了一下。\n\n${buildSystemPanel(["【新任务】", `→ ${detail.hook || "下一位高星运目标即将靠近"}`, "→ 倒计时已经开始"])}\n\n他看着最后一行字，没有再躺回去。\n\n这一次，电话会先响。`
    : `${context.lead}刚把材料合上，外面就有人敲门。\n\n${context.support}转头看他。\n\n${context.lead}没有立刻应声。他看着门缝下压进来的影子，知道${detail.hook || "下一步麻烦已经到了"}。\n\n“开门。”他说。`;

  return completeDraftToTarget(`${sections.join("\n\n")}\n\n${ending}`, context, targetWords);
}

async function generateCopy() {
  const chapter = selectedChapter();
  if (!chapter) {
    showToast("请先导入大纲生成章节计划。");
    return;
  }
  const project = currentProject();
  const targetWords = activeTargetWords(project, chapter);
  if ($("#detail-outline-form")) {
    chapter.detailedOutline = collectDetailedOutlineFromEditor(chapter.detailedOutline);
    chapter.detailOutlineEditedAt = new Date().toISOString();
    markDetailOutlineDirty(false);
  }
  const detail = normalizeDraftOutline(project, chapter);
  const continuity = refreshProjectStoryMemory(project, chapter);
  $("#chapter-continuity").innerHTML = renderContinuityMemory(continuity);
  chapter.generationPrompt = buildChapterGenerationPrompt(project, chapter, detail);
  chapter.generationContract = buildChapterGenerationContract(project, chapter);
  const route = routeForTask("章节正文");
  const generateButton = $("#generate-copy");
  generateButton.disabled = true;
  generateButton.classList.add("is-running");
  const generateLabel = $("#generate-copy span");
  const previousButtonText = generateLabel?.textContent || "按约束生成";
  if (generateLabel) generateLabel.textContent = "生成中";
  const previousManuscript = chapter.manuscript || "";
  startGenerationProgress(route, chapter, targetWords);
  showToast(route ? `正在调用 ${route.provider} / ${route.model} 生成正文...` : "正在调用模型生成正文...");

  try {
    setGenerationProgress(18, "整理上下文", "正在读取本章细纲、角色、伏笔和文风约束。");
    await new Promise((resolve) => window.setTimeout(resolve, 80));
    setGenerationProgress(32, "发送模型请求", route ? `已向 ${route.provider} / ${route.model} 发送生成请求。` : "已向章节正文模型发送生成请求。");
    const result = await callChapterModel(project, chapter, chapter.generationPrompt, targetWords);
    setGenerationProgress(92, "模型已返回", "正在清理正文并写入编辑器。");
    const generated = trimDraftToWordLimit(cleanGeneratedDraft(result.text), 3000);
    recordLlmUsage(project, chapter, result);
    chapter.manuscript = generated;
    chapter.autoDraftSnapshot = generated;
    chapter.manualStyleEdited = false;
    chapter.styleRevisionStatus = "未修改";
    chapter.wordCount = chapterWordCount(chapter.manuscript);
    chapter.progress = Math.min(99, Math.round((chapter.wordCount / targetWords) * 100));
    refreshChapterStorySnapshot(project, chapter);
    const nextChapter = nextChapterFor(project, chapter.id);
    if (nextChapter) refreshProjectStoryMemory(project, nextChapter);
    refreshProjectStoryMemory(project, chapter);
    $("#manuscript").value = chapter.manuscript;
    selectChapter(chapter.id);
    saveStateSoon("generate-copy");
    finishGenerationProgress(`已生成 ${chapterWordCount(chapter.manuscript)}/${targetWords} 字，${llmUsageText(chapter.llmMeta, chapter)}`);
    showToast(`模型生成完成：${llmUsageText(chapter.llmMeta, chapter)}`);
  } catch (error) {
    chapter.llmError = error.message || "模型调用失败";
    chapter.llmMeta = {
      source: "error",
      error: chapter.llmError,
      calledAt: new Date().toISOString(),
    };
    chapter.manuscript = previousManuscript;
    refreshChapterStorySnapshot(project, chapter);
    refreshProjectStoryMemory(project, chapter);
    $("#manuscript").value = chapter.manuscript;
    selectChapter(chapter.id);
    saveStateSoon("generate-copy-error");
    failGenerationProgress(chapter.llmError);
    showToast(`模型调用失败，正文未改动：${chapter.llmError}`);
  } finally {
    generateButton.disabled = false;
    generateButton.classList.remove("is-running");
    if (generateLabel) generateLabel.textContent = previousButtonText;
  }
}

function compactStyleSample(text = "") {
  return String(text || "")
    .replace(/^第\s*\d+\s*章[^\n]*\n*/m, "")
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 12 && !/^>/.test(part))
    .slice(0, 5)
    .join(" / ")
    .slice(0, 360);
}

function recordManualStyleRevision(project, chapter, previousText, nextText) {
  if (!chapter || previousText === nextText || !String(nextText || "").trim()) return;
  const delta = Math.abs(String(nextText).length - String(previousText || "").length);
  const changedEnough = delta >= 8 || compactStyleSample(previousText) !== compactStyleSample(nextText);
  if (!changedEnough) return;

  chapter.manualStyleEdited = true;
  chapter.styleRevisionStatus = "人工修订已记录";
  chapter.styleRevisionUpdatedAt = new Date().toISOString();
  chapter.styleRevisionSample = compactStyleSample(nextText);

  const sample = {
    chapter: chapter.id,
    title: chapter.title,
    before: compactStyleSample(previousText),
    after: chapter.styleRevisionSample,
    updatedAt: chapter.styleRevisionUpdatedAt,
  };
  project.styleRevisionSamples = (project.styleRevisionSamples || [])
    .filter((item) => item.chapter !== chapter.id)
    .concat(sample)
    .slice(-12);
  project.styleRevisionCount = project.styleRevisionSamples.length;
  project.styleRevisionUpdatedAt = chapter.styleRevisionUpdatedAt;
}

function syncCurrentManuscript({ persist = true, toast = false } = {}) {
  const chapter = selectedChapter();
  if (!chapter) return;
  const project = currentProject();
  const targetWords = activeTargetWords(project, chapter);
  const previousText = chapter.manuscript || "";
  const nextText = $("#manuscript").value;
  const normalizedText = trimDraftToWordLimit(nextText, 3000);
  recordManualStyleRevision(project, chapter, previousText, normalizedText);
  chapter.manuscript = normalizedText;
  chapter.wordCount = chapterWordCount(chapter.manuscript);
  chapter.progress = Math.min(99, Math.round((chapter.wordCount / targetWords) * 100));
  project.words = projectWordCount(project);
  refreshChapterStorySnapshot(project, chapter);
  const nextChapter = nextChapterFor(project, chapter.id);
  if (nextChapter) refreshProjectStoryMemory(project, nextChapter);
  const continuity = refreshProjectStoryMemory(project, chapter);
  renderChapters(chapter.id);
  $("#editor-meta").innerHTML = editorMetaHtml(project, chapter);
  $("#chapter-continuity").innerHTML = renderContinuityMemory(continuity);
  if (persist) saveStateSoon("manuscript-edit");
  if (toast) showToast(`第 ${chapter.id} 章已保存：${chapterWordCount(chapter.manuscript)}/${targetWords} 字。`);
}

function saveCurrentManuscript() {
  syncCurrentManuscript({ toast: true });
}

Object.assign(window, {
  generateCopy,
  submitCurrentChapterForReview,
  scoreCurrentChapter,
  completeCurrentChapter,
  saveCurrentManuscript,
  saveCurrentDetailOutline,
});

function runWriterCommand(commandName) {
  const actions = {
    "generate-copy": generateCopy,
    "submit-review": submitCurrentChapterForReview,
    "score-chapter": scoreCurrentChapter,
    "complete-chapter": completeCurrentChapter,
    "save-manuscript": saveCurrentManuscript,
  };
  const result = actions[commandName]?.();
  if (result?.catch) {
    result.catch((error) => showToast(error.message || "操作失败"));
  }
}

function bindEvents() {
  $$(".nav-item").forEach((item) => item.addEventListener("click", () => switchPage(item.dataset.page)));
  $$("[data-jump]").forEach((item) => item.addEventListener("click", () => switchPage(item.dataset.jump)));
  document.addEventListener("pointerdown", (event) => {
    const command = event.target.closest("[data-command]");
    if (!command || command.disabled) return;
    event.preventDefault();
    runWriterCommand(command.dataset.command);
  }, true);
  document.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    const command = event.target.closest("[data-command]");
    if (!command || command.disabled) return;
    event.preventDefault();
    runWriterCommand(command.dataset.command);
  }, true);
  document.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-forbidden-remove]");
    if (!removeButton) return;
    removeForbiddenWord(removeButton.dataset.forbiddenRemove);
  });
  document.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-forbidden-form]");
    if (!form) return;
    event.preventDefault();
    const input = form.querySelector("[data-forbidden-input]");
    if (addForbiddenWord(input?.value || "") && input) {
      input.value = "";
      window.setTimeout(() => input.focus(), 0);
    }
  });

  $("#project-select").addEventListener("change", (event) => {
    state.activeProjectId = event.target.value;
    state.activeChapterId = currentProject().chapters[0]?.id || 1;
    renderAll();
    saveStateSoon("switch-project");
    showToast(`已切换到《${currentProject().title}》。`);
  });

  $("#project-list").addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-project-delete]");
    if (deleteButton) {
      event.preventDefault();
      event.stopPropagation();
      deleteProject(deleteButton.dataset.projectDelete);
      return;
    }
    const openButton = event.target.closest("[data-project-open]");
    if (openButton) {
      event.preventDefault();
      event.stopPropagation();
      openProject(openButton.dataset.projectOpen);
      return;
    }
    const card = event.target.closest(".project-card");
    if (!card) return;
    openProject(card.dataset.project);
  });

  $("#create-project").addEventListener("click", () => createProject());
  $("#create-from-form").addEventListener("click", () => createProject());
  $("#create-and-import").addEventListener("click", () => createProject({ importOutline: true }));
  $("#top-new-project").addEventListener("click", () => switchPage("projects"));
  $("#top-import-outline").addEventListener("click", () => openOutlinePicker());
  $("#import-project-outline").addEventListener("click", () => createProject({ importOutline: true }));

  $("#parse-outline").addEventListener("click", parseOutline);
  $("#apply-outline-text").addEventListener("click", applyOutlineText);
  $("#save-outline-nodes").addEventListener("click", () => saveOutlineRows());
  $("#refresh-detail-outlines").addEventListener("click", () => refreshAllDetailOutlinesFromOutline());
  $("#outline-table").addEventListener("input", () => {
    $("#save-outline-nodes")?.classList.add("dirty");
  });
  $("#chapter-directory-table").addEventListener("click", (event) => {
    const button = event.target.closest("[data-edit-chapter-outline]");
    if (!button) return;
    editChapterOutlineFromDirectory(button.dataset.editChapterOutline);
  });
  $("#outline-file").addEventListener("change", (event) => {
    importOutlineFromFile(event.target.files?.[0]);
    event.target.value = "";
  });
  $(".drop-zone").addEventListener("dragover", (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("dragging");
  });
  $(".drop-zone").addEventListener("dragleave", (event) => {
    event.currentTarget.classList.remove("dragging");
  });
  $(".drop-zone").addEventListener("drop", (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("dragging");
    importOutlineFromFile(event.dataTransfer?.files?.[0]);
  });
  $("#risk-filter").addEventListener("change", (event) => renderCharacters(event.target.value));
  $("#reset-filter").addEventListener("click", () => {
    $("#risk-filter").value = "all";
    renderCharacters();
  });

  $("#chapter-list").addEventListener("click", (event) => {
    const button = event.target.closest(".chapter-item");
    if (!button) return;
    selectChapter(Number(button.dataset.chapter));
  });
  $("#chapter-tabs").addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    setChapterFilter(button.dataset.filter);
  });

  $("#manuscript").addEventListener("input", () => syncCurrentManuscript());
  $("#chapter-detail-outline").addEventListener("input", () => markDetailOutlineDirty(true));
  $("#save-detail-outline").addEventListener("click", () => saveCurrentDetailOutline());
  $("#style-sample").addEventListener("input", () => syncStyleSampleFromDom());
  $("#style-file").addEventListener("change", (event) => {
    importStyleSamples(event.target.files || []);
    event.target.value = "";
  });
  $("#train-style").addEventListener("click", () => trainStyle());
  $("#style-tag-editor").addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-style-tag-add]");
    if (addButton) {
      addStyleTag(addButton.dataset.styleTagAdd);
      return;
    }
    const removeButton = event.target.closest("[data-style-tag-remove]");
    if (removeButton) removeStyleTag(removeButton.dataset.styleTagRemove);
  });
  $("#style-tag-editor").addEventListener("submit", (event) => {
    const form = event.target.closest("[data-style-tag-form]");
    if (!form) return;
    event.preventDefault();
    const input = $("[data-style-tag-input]", form);
    if (addStyleTag(input?.value || "")) {
      input.value = "";
      window.setTimeout(() => input.focus(), 0);
    }
  });
  $("#style-fusion-editor").addEventListener("input", () => syncStyleBlendProfilesFromDom());
  $("#style-fusion-editor").addEventListener("change", () => syncStyleBlendProfilesFromDom());
  $("#style-fusion-editor").addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-style-blend-remove]");
    if (removeButton) {
      removeStyleBlendProfile(removeButton.dataset.styleBlendRemove);
      return;
    }
    if (event.target.closest("#add-style-blend")) addStyleBlendProfile();
  });
  $("#import-skill").addEventListener("click", () => {
    saveStateSoon("import-skill");
    showToast("Skill 导入原型：可接入题材模板、文风规则和评分标准。");
  });
  $("#save-models").addEventListener("click", () => saveModelSettings());
  $("#provider-grid").addEventListener("input", () => syncModelSettingsFromDom());
  $("#model-route-table").addEventListener("input", () => syncModelSettingsFromDom());
  $("#provider-grid").addEventListener("click", (event) => {
    const modelButton = event.target.closest("[data-provider-model]");
    if (modelButton) {
      applyProviderModel(modelButton.dataset.providerModel, modelButton.dataset.model);
      return;
    }
    const button = event.target.closest(".provider-test");
    if (!button) return;
    testProviderConnection(button.dataset.provider);
  });
  $("#provider-grid").addEventListener("change", (event) => {
    if (!event.target.matches("[data-provider]")) return;
    const provider = state.providers.find((item) => item.id === event.target.dataset.provider);
    syncModelSettingsFromDom({ persist: false });
    provider.enabled = event.target.checked;
    provider.status = event.target.checked ? "待验证" : "停用";
    renderModels();
    refreshIcons();
    saveStateSoon("provider-toggle");
  });
  $("#add-route").addEventListener("click", () => {
    state.routes.push({ task: "新任务", provider: "GPT / OpenAI", model: "gpt-5.2", temperature: "0.5", usage: "自定义任务路由" });
    renderModels();
    saveStateSoon("add-route");
    showToast("已新增一条模型路由。");
  });
  $("#run-audit").addEventListener("click", () => {
    renderAudit();
    saveStateSoon("run-audit");
    showToast("已完成一致性与文风偏移审查。");
  });
}

async function boot() {
  bindEvents();
  const loaded = await loadPersistentState();
  persistenceReady = true;
  renderAll();
  if (loaded) showToast("已从本地数据库恢复工作台。");
  saveStateSoon("boot");
}

window.addEventListener("pagehide", () => flushStateOnUnload("pagehide"));
window.addEventListener("beforeunload", () => flushStateOnUnload("beforeunload"));
document.addEventListener("DOMContentLoaded", boot);
