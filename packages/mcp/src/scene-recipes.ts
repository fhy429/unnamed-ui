export interface SceneRecipe {
  id: string;
  title: string;
  aliases: string[];
  layout: string;
  requiredComponents: string[];
  optionalComponents: string[];
  stateChecklist: string[];
  implementationFlow: string[];
}

// 蓝图生成与页面审查共用的场景模板。
const SCENE_RECIPES: SceneRecipe[] = [
  {
    id: "chat-workstation",
    title: "AI 对话工作台",
    aliases: ["chat", "对话", "工作台", "agent", "conversation"],
    layout: "页头 + 多栏（左侧上下文/历史 + 中央消息区 + 右侧辅助面板）",
    requiredComponents: ["page-header", "message-list", "sender"],
    optionalComponents: [
      "triple-split-pane",
      "sidebar",
      "responsive-sender",
      "suggestion",
      "prompt",
      "quick-action",
    ],
    stateChecklist: ["normal", "generating/loading", "empty", "error/failed"],
    implementationFlow: [
      "先搭页面和滚动骨架",
      "再接入消息列表和输入发送区",
      "补齐思考/执行结果等增强区",
      "最后校验边界态和空态引导",
    ],
  },
  {
    id: "form-settings",
    title: "设置/表单页",
    aliases: ["form", "表单", "设置", "配置"],
    layout: "页头 + 单列内容区（可分组卡片）",
    requiredComponents: ["page-header", "dynamic-form"],
    optionalComponents: [
      "block-input",
      "block-select",
      "checkbox",
      "radio",
      "block-button",
    ],
    stateChecklist: ["normal", "loading", "validation error", "submit success"],
    implementationFlow: [
      "拆表单分组和字段类型",
      "定义校验规则和默认值",
      "实现提交与反馈状态",
      "检查禁用态与错误提示一致性",
    ],
  },
  {
    id: "dashboard-report",
    title: "仪表盘/报告页",
    aliases: ["dashboard", "report", "仪表盘", "报告", "看板"],
    layout: "页头 + 指标卡片区 + 明细区",
    requiredComponents: ["page-header", "report-card", "status-tag"],
    optionalComponents: [
      "progress",
      "tag",
      "tooltip",
      "goal-card",
      "task-list",
    ],
    stateChecklist: ["normal", "loading", "empty", "error"],
    implementationFlow: [
      "确定指标层级和分组",
      "优先完成首屏关键指标",
      "再补充趋势和详细卡片",
      "校验状态语义和颜色一致性",
    ],
  },
  {
    id: "resource-management",
    title: "资源/文档管理页",
    aliases: ["upload", "文件", "文档", "资源", "source"],
    layout: "侧栏 + 列表区 + 详情/操作区",
    requiredComponents: ["sidebar", "file-card"],
    optionalComponents: [
      "document-card",
      "upload",
      "attachment-list",
      "history-item",
      "confirm-panel",
    ],
    stateChecklist: ["normal", "uploading/loading", "empty", "error"],
    implementationFlow: [
      "先做资源列表和筛选",
      "接入上传与删除流程",
      "补充详情和预览区",
      "统一空态、失败态和重试行为",
    ],
  },
];

/**
 * 归一化用户输入，便于场景匹配。
 */
function normalize(text: string): string {
  return text.toLowerCase();
}

/**
 * 返回当前全部场景配方。
 */
export function listSceneRecipes(): SceneRecipe[] {
  return SCENE_RECIPES;
}

/**
 * 先按精确 id 匹配，再按别名包含关系匹配。
 */
export function resolveSceneRecipe(input: string): SceneRecipe | null {
  const target = normalize(input);

  const byId = SCENE_RECIPES.find((recipe) => recipe.id === target);
  if (byId) return byId;

  return (
    SCENE_RECIPES.find((recipe) =>
      recipe.aliases.some((alias) => target.includes(normalize(alias))),
    ) || null
  );
}
