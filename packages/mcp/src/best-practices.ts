export interface ComponentBestPractice {
  name: string;
  summary: string;
  usageRules: string[];
  requiredProps?: string[];
  recommendedPatterns?: string[];
  avoidPatterns?: string[];
  sceneTags?: string[];
  relatedComponents?: string[];
}

// 高频组件的高价值使用规则集合。
const BEST_PRACTICES: ComponentBestPractice[] = [
  {
    name: "avatar",
    summary: "头像渲染优先级：src > icon > children，尺寸优先用组件 size。",
    usageRules: [
      "显示实体头像时优先传 src；无图时再退化到 icon 或 children。",
      "尺寸统一使用 size（sm/md/lg），避免页面层硬编码宽高。",
      "头像组场景使用 AvatarGroup，并通过 maxCount 控制折叠。",
    ],
    recommendedPatterns: [
      "用户列表、消息列表中与名字信息配对展示。",
      "和 AvatarHeader 组合展示来源、角色、时间等元信息。",
    ],
    avoidPatterns: [
      "用纯 div 模拟头像容器和圆角。",
      "同页混用多套头像尺寸标准。",
    ],
    sceneTags: ["chat", "workstation", "list"],
    relatedComponents: ["avatar-header", "message"],
  },
  {
    name: "tag",
    summary: "Tag 适合轻状态和可选项，强调变体和主题一致性。",
    usageRules: [
      "优先通过 variant/theme 传达语义，不要页面层覆盖文字与背景色。",
      "分类和状态展示场景建议固定同一主题组（brand/success/warning 等）。",
      "可选模式和多选模式需保证点击态和禁用态可区分。",
    ],
    avoidPatterns: [
      "在 Tag 外层额外包一层自定义彩色背景。",
      "同组标签混用无语义的随机颜色。",
    ],
    sceneTags: ["dashboard", "form", "list"],
  },
  {
    name: "status-tag",
    summary: "状态标签优先使用内置语义状态，保证前后端状态映射一致。",
    usageRules: [
      "优先使用内置 status（pending/confirmed/success/error/warning/info）。",
      "如需覆盖文案或颜色，需保证语义不冲突。",
      "状态颜色与图标应与列表/卡片其他状态展示一致。",
    ],
    recommendedPatterns: ["配合 task-card/task-list/report-card 做状态概览。"],
    avoidPatterns: ["用普通 Tag 承担核心流程状态而不定义状态枚举。"],
    sceneTags: ["task", "report", "workstation"],
    relatedComponents: ["task-card", "task-list", "report-card"],
  },
  {
    name: "progress",
    summary: "进度组件区分线形和环形，percent 范围应在 0-100。",
    usageRules: [
      "线形用于流程进度，环形用于汇总占比。",
      "percent 保持 0-100 范围并和状态文案同步。",
      "100% 终态建议同步状态为 success 或完成态文案。",
    ],
    avoidPatterns: ["传入越界 percent 或仅改视觉不改状态。"],
    sceneTags: ["dashboard", "task", "report"],
    relatedComponents: ["status-tag", "goal-card"],
  },
  {
    name: "tooltip",
    summary: "Tooltip 用于补充解释，触发目标建议使用 asChild 保持语义一致。",
    usageRules: [
      "content 必填且文案简洁，避免塞长段落。",
      "触发元素建议支持 asChild，避免多余嵌套导致样式错乱。",
      "side 方向需结合容器边界，避免被裁切。",
    ],
    avoidPatterns: [
      "把 Tooltip 当主要信息承载层。",
      "移动端关键操作只放 Tooltip 文案不做可见替代。",
    ],
    sceneTags: ["dashboard", "table", "form"],
  },
  {
    name: "custom-sources",
    summary: "引用和来源信息应绑定可追踪数据，并与侧栏联动。",
    usageRules: [
      "children 传引用序号或标识；sources 传来源列表数据。",
      "使用 onOpenSidebar 联动来源侧栏，避免跳转中断阅读流。",
      "来源卡片需包含标题、摘要、可定位信息。",
    ],
    avoidPatterns: ["来源仅展示静态文本，无法回溯具体条目。"],
    sceneTags: ["chat", "report", "analysis"],
    relatedComponents: ["sources-sidebar", "markdown"],
  },
  {
    name: "icon-button",
    summary: "图标按钮用于高频轻操作，需保证可点击目标和可访问名称。",
    usageRules: [
      "优先用于次级操作（收藏、复制、展开）而非主要提交动作。",
      "传递 aria-label 或等价可访问名称。",
      "loading 态需要禁用重复点击。",
    ],
    avoidPatterns: ["主路径提交只用图标无文字说明。"],
    sceneTags: ["workstation", "list", "header"],
    relatedComponents: ["tooltip", "block-button"],
  },
  {
    name: "quick-action",
    summary: "QuickAction 适合空状态或欢迎区，建议 3-6 个明确动作。",
    usageRules: [
      "动作数量控制在 3-6，超过需分组或折叠。",
      "每个动作应是可立即执行的任务，不是说明文案。",
      "文案优先动词开头（创建/分析/总结）。",
    ],
    avoidPatterns: ["塞入过多低价值入口导致选择负担。"],
    sceneTags: ["welcome", "chat", "workstation"],
    relatedComponents: ["welcome", "prompt", "suggestion"],
  },
  {
    name: "prompt",
    summary: "Prompt 用于输入前引导，horizontal/vertical 布局需与容器匹配。",
    usageRules: [
      "紧凑区域用 horizontal，卡片区域用 vertical。",
      "icon 布局优先在 vertical 模式使用，避免横向拥挤。",
      "与输入框距离保持一致节奏，避免断层。",
    ],
    avoidPatterns: ["Prompt 内容与下方输入能力不一致。"],
    sceneTags: ["welcome", "chat", "workstation"],
    relatedComponents: ["quick-action", "sender", "responsive-sender"],
  },
  {
    name: "suggestion",
    summary: "Suggestion 作为下一步建议入口，需有稳定 id 和可追踪点击。",
    usageRules: [
      "每个 SuggestionItem 提供唯一 id。",
      "标题、描述、图标层级清晰，避免同权重堆叠。",
      "网格布局需在窄宽度下自动换行。",
    ],
    avoidPatterns: ["建议项只写抽象标题，点击后无明确动作。"],
    sceneTags: ["welcome", "assistant", "workflow"],
    relatedComponents: ["quick-action", "prompt"],
  },
  {
    name: "block-button",
    summary: "业务按钮统一使用 variant/color/size，主次按钮层级明确。",
    usageRules: [
      "主按钮使用品牌色或默认主样式，次级操作用 text/outline。",
      "同一区域按钮尺寸保持一致（sm/md/lg/xl）。",
      "危险操作统一 danger/error 色系并配确认流程。",
    ],
    avoidPatterns: ["主区出现多个同权重主按钮。"],
    sceneTags: ["form", "dialog", "workstation"],
    relatedComponents: ["confirm-panel", "toggle-button"],
  },
  {
    name: "toggle-button",
    summary: "切换按钮用于模式切换，不用于一次性提交动作。",
    usageRules: [
      "选中态和未选中态差异要明显。",
      "切换后应立即影响内容或参数，避免无反馈。",
      "多切换项建议成组展示并保证互斥逻辑清晰。",
    ],
    avoidPatterns: ["把 toggle 当普通按钮点击后无状态保持。"],
    sceneTags: ["workstation", "filter", "setting"],
    relatedComponents: ["block-button", "prompt"],
  },
];

// 将历史命名或驼峰命名归一到标准组件 id。
const ALIASES: Record<string, string> = {
  avatarheader: "avatar",
  avatargroup: "avatar",
  statustag: "status-tag",
  quickaction: "quick-action",
  iconbutton: "icon-button",
  blockbutton: "block-button",
  togglebutton: "toggle-button",
  customsources: "custom-sources",
};

/**
 * 将 "StatusTag" / "status_tag" 等形式转换为可比较 id。
 */
function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9-]/g, "");
}

/**
 * 列出所有已维护最佳实践的组件名。
 */
export function listBestPracticeNames(): string[] {
  return BEST_PRACTICES.map((item) => item.name);
}

/**
 * 按组件名或别名查找最佳实践条目。
 */
export function getComponentBestPractice(
  name: string,
): ComponentBestPractice | null {
  const normalized = normalizeName(name);
  const canonical = ALIASES[normalized] || normalized;

  return (
    BEST_PRACTICES.find((item) => normalizeName(item.name) === canonical) || null
  );
}

/**
 * 按场景关键词筛选相关最佳实践。
 */
export function findBestPracticesByScene(scene: string): ComponentBestPractice[] {
  const target = scene.toLowerCase();
  return BEST_PRACTICES.filter((item) =>
    (item.sceneTags || []).some((tag) => target.includes(tag)),
  );
}
