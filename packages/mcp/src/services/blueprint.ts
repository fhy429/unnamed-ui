import type { ComponentBestPractice } from "../best-practices.js";
import type { ComponentMeta } from "../registry.js";
import type { SceneRecipe } from "../scene-recipes.js";
import type { TokenCategory } from "../tokens.js";

interface SuggestedComponent {
  component: ComponentMeta;
  reason: string;
}

interface BlueprintServiceContext {
  componentRoot: string;
  getIndex: () => ComponentMeta[];
  suggestComponents: (
    components: ComponentMeta[],
    description: string,
  ) => SuggestedComponent[];
  resolveSceneRecipe: (input: string) => SceneRecipe | null;
  findBestPracticesByScene: (scene: string) => ComponentBestPractice[];
  getComponentBestPractice: (name: string) => ComponentBestPractice | null;
  getTokensByCategory: (componentRoot: string, category?: string) => TokenCategory[];
}

/**
 * 从自然语言需求中推断页面布局策略。
 */
function inferLayoutFromDescription(
  description: string,
  resolveSceneRecipe: (input: string) => SceneRecipe | null,
): string {
  const recipe = resolveSceneRecipe(description);
  if (recipe) return recipe.layout;

  const text = description.toLowerCase();
  if (text.includes("三栏") || text.includes("triple") || text.includes("split")) {
    return "三栏布局（侧栏 + 主内容 + 辅助面板）";
  }
  if (text.includes("双栏") || text.includes("two-column")) {
    return "双栏布局（导航/筛选 + 主内容）";
  }
  if (
    text.includes("对话") ||
    text.includes("chat") ||
    text.includes("agent") ||
    text.includes("工作台")
  ) {
    return "工作台布局（页头 + 左侧上下文 + 中间主内容）";
  }
  if (text.includes("表单") || text.includes("form") || text.includes("设置")) {
    return "表单布局（页头 + 单列内容区）";
  }
  return "通用单页布局（页头 + 内容区）";
}

/**
 * 生成页面落地蓝图，包含：
 * - 布局建议
 * - 组件分层
 * - 关键规则与 token 提示
 * - 实施顺序
 */
export function generatePageBlueprint(
  description: string,
  ctx: BlueprintServiceContext,
): string {
  const suggestions = ctx.suggestComponents(ctx.getIndex(), description);
  const top = suggestions.slice(0, 8);
  const layout = inferLayoutFromDescription(description, ctx.resolveSceneRecipe);
  const sceneRecipe = ctx.resolveSceneRecipe(description);
  const sceneBestPractices = sceneRecipe
    ? ctx.findBestPracticesByScene(sceneRecipe.id)
    : [];

  // 将候选组件拆分为“骨架组件”和“内容组件”。
  const layoutComponents = top.filter((s) =>
    ["page-header", "triple-split-pane", "sidebar", "divider"].includes(
      s.component.name,
    ),
  );
  const contentComponents = top.filter(
    (s) => !["page-header", "triple-split-pane", "sidebar", "divider"].includes(s.component.name),
  );

  // 提供少量高价值 token 类别，方便快速落地。
  const tokenHints = ctx.getTokensByCategory(ctx.componentRoot, "text")
    .concat(ctx.getTokensByCategory(ctx.componentRoot, "container"))
    .concat(ctx.getTokensByCategory(ctx.componentRoot, "border"))
    .slice(0, 4)
    .map((cat) => `${cat.name}: ${cat.tokens.slice(0, 3).map((t) => t.name).join(", ")}`);

  const lines: string[] = [];
  lines.push("## 页面蓝图");
  lines.push(`- 需求摘要: ${description}`);
  lines.push(`- 推荐布局: ${layout}`);
  lines.push(`- 匹配场景: ${sceneRecipe ? sceneRecipe.title : "未匹配，按通用页面策略处理"}`);
  lines.push("");
  lines.push("## 组件分层建议（优先 composed）");
  lines.push("");
  lines.push("### 1) 骨架组件");
  if (layoutComponents.length === 0) {
    lines.push("- page-header (composed)");
  } else {
    for (const item of layoutComponents) {
      lines.push(`- ${item.component.name} (${item.component.layer}) — ${item.reason}`);
    }
  }
  lines.push("");
  lines.push("### 2) 内容与交互组件");
  for (const item of contentComponents) {
    lines.push(`- ${item.component.name} (${item.component.layer}) — ${item.reason}`);
  }
  lines.push("");
  if (sceneRecipe) {
    lines.push("## 场景必选组件");
    for (const name of sceneRecipe.requiredComponents) {
      lines.push(`- ${name}`);
    }
    lines.push("");
    lines.push("## 场景状态清单");
    for (const state of sceneRecipe.stateChecklist) {
      lines.push(`- ${state}`);
    }
    lines.push("");
  }

  lines.push("## 关键使用规则（节选）");
  for (const item of contentComponents.slice(0, 4)) {
    const best = ctx.getComponentBestPractice(item.component.name);
    if (best) {
      lines.push(`- ${item.component.name}: ${best.summary}`);
    }
  }
  if (sceneBestPractices.length > 0) {
    for (const best of sceneBestPractices.slice(0, 3)) {
      lines.push(`- ${best.name}: ${best.summary}`);
    }
  }
  lines.push("");

  lines.push("## 设计 Token 提示");
  for (const hint of tokenHints) {
    lines.push(`- ${hint}`);
  }
  lines.push("");
  lines.push("## 实施顺序");
  lines.push("1. 先搭页面骨架（PageHeader/Sidebar/SplitPane）");
  lines.push("2. 再放业务组件（MessageList、Sender、Card、Form 等）");
  lines.push("3. 最后补状态（empty/loading/error）和交互事件");
  lines.push("4. 全量检查：禁止硬编码颜色，禁止跳过组件库直接手写基础控件");

  return lines.join("\n");
}
