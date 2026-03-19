import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export interface ComponentMeta {
  name: string;
  title: string;
  description: string;
  layer: "ui" | "blocks" | "composed";
  type: string;
  dependencies: string[];
  registryDependencies: string[];
  files: string[];
}

/**
 * 从 registry 对象块中提取字符串字段。
 * 支持：
 * - `field: "value"`
 * - `field:\n  "value"`
 * - 简单拼接，如 `"a" + "b"`
 */
function extractStringField(block: string, field: string): string {
  const re = new RegExp(
    `${field}:\\s*\\n?\\s*"([^"]*)"(?:\\s*\\+\\s*"([^"]*)")?`,
  );
  const m = block.match(re);
  if (!m) return "";
  return (m[1] || "") + (m[2] || "");
}

/**
 * 提取字符串数组字段，如 `dependencies: ["a", "b"]`。
 */
function extractArrayField(block: string, field: string): string[] {
  const re = new RegExp(`${field}:\\s*\\[([^\\]]*?)\\]`, "s");
  const m = block.match(re);
  if (!m) return [];
  const items: string[] = [];
  const strRe = /"([^"]+)"/g;
  let sm: RegExpExecArray | null;
  while ((sm = strRe.exec(m[1])) !== null) {
    items.push(sm[1]);
  }
  return items;
}

/**
 * 从 registry 条目的 `files` 数组中提取文件路径。
 */
function extractFilePaths(block: string): string[] {
  const filesMatch = block.match(/files:\s*\[([\s\S]*?)\]/);
  if (!filesMatch) return [];
  const paths: string[] = [];
  const pathRe = /path:\s*"([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = pathRe.exec(filesMatch[1])) !== null) {
    paths.push(m[1]);
  }
  return paths;
}

/**
 * 解析 `_registry.ts`，抽取组件元信息。
 */
function parseRegistryFile(
  content: string,
  layer: "ui" | "blocks" | "composed",
): ComponentMeta[] {
  const components: ComponentMeta[] = [];
  const nameRegex = /name:\s*"([^"]+)"/g;
  let nameMatch: RegExpExecArray | null;

  while ((nameMatch = nameRegex.exec(content)) !== null) {
    // 回溯到对象字面量起点，并通过大括号配对拿到完整块。
    const startIdx = content.lastIndexOf("{", nameMatch.index);
    if (startIdx === -1) continue;

    let depth = 1;
    let endIdx = startIdx + 1;
    while (depth > 0 && endIdx < content.length) {
      if (content[endIdx] === "{") depth++;
      if (content[endIdx] === "}") depth--;
      endIdx++;
    }
    const block = content.substring(startIdx, endIdx);

    components.push({
      name: nameMatch[1],
      title: extractStringField(block, "title") || nameMatch[1],
      description: extractStringField(block, "description"),
      layer,
      type: extractStringField(block, "type") || `registry:${layer}`,
      dependencies: extractArrayField(block, "dependencies"),
      registryDependencies: extractArrayField(block, "registryDependencies"),
      files: extractFilePaths(block),
    });
  }

  return components;
}

/**
 * 从全部层级构建组件元信息索引。
 */
export function buildComponentIndex(componentRoot: string): ComponentMeta[] {
  const layers: Array<{ dir: string; layer: "ui" | "blocks" | "composed" }> = [
    { dir: "ui", layer: "ui" },
    { dir: "blocks", layer: "blocks" },
    { dir: "composed", layer: "composed" },
  ];

  const allComponents: ComponentMeta[] = [];

  for (const { dir, layer } of layers) {
    const registryPath = join(componentRoot, dir, "_registry.ts");
    if (!existsSync(registryPath)) continue;

    const content = readFileSync(registryPath, "utf-8");
    const components = parseRegistryFile(content, layer);
    allComponents.push(...components);
  }

  return allComponents;
}

/**
 * 按关键词搜索组件（匹配 name/title/description）。
 */
export function searchComponents(
  components: ComponentMeta[],
  query: string,
): ComponentMeta[] {
  const lower = query.toLowerCase();
  const terms = lower.split(/\s+/).filter(Boolean);

  // 轻量词法打分，适配 MCP 场景下的模糊检索。
  return components
    .map((c) => {
      const searchText =
        `${c.name} ${c.title} ${c.description} ${c.layer}`.toLowerCase();
      const score = terms.reduce(
        (acc, term) => acc + (searchText.includes(term) ? 1 : 0),
        0,
      );
      return { component: c, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ component }) => component);
}

/**
 * 读取组件关联文件的源代码。
 */
export function getComponentSource(
  componentRoot: string,
  component: ComponentMeta,
): Array<{ path: string; content: string }> {
  const sources: Array<{ path: string; content: string }> = [];

  for (const filePath of component.files) {
    const fullPath = join(componentRoot, filePath);
    if (existsSync(fullPath)) {
      sources.push({
        path: filePath,
        content: readFileSync(fullPath, "utf-8"),
      });
    }
  }

  return sources;
}

/**
 * 从组件源码中提取 TypeScript 的 interface/type。
 * 返回包含 JSDoc 的原始声明片段。
 */
export function extractComponentAPI(
  componentRoot: string,
  component: ComponentMeta,
): string {
  const sources = getComponentSource(componentRoot, component);
  const apiBlocks: string[] = [];

  for (const { path, content } of sources) {
    const declarations = extractTypeDeclarations(content);
    if (declarations.length > 0) {
      apiBlocks.push(`// --- ${path} ---`);
      apiBlocks.push(...declarations);
      apiBlocks.push("");
    }
  }

  if (apiBlocks.length === 0) {
    return `No exported interfaces/types found for ${component.name}`;
  }

  return apiBlocks.join("\n");
}

/**
 * 从 TypeScript 源码中提取 interface/type 声明（含 JSDoc）。
 * 会跳过 import type 语句和内联 import type 片段。
 */
function extractTypeDeclarations(source: string): string[] {
  const declarations: string[] = [];
  const lines = source.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    // 跳过 import 语句及相关内联 type 片段。
    if (trimmed.startsWith("import ") || trimmed.startsWith("type ") && lines[Math.max(0, i - 1)]?.trim().startsWith("import")) {
      continue;
    }

    const isInterface = /^(?:export\s+)?interface\s+\w+/.test(trimmed);
    const isType = /^(?:export\s+)?type\s+\w+\s*[=<]/.test(trimmed);

    if (!isInterface && !isType) continue;

    // 向上回溯，尽量包含最近的 JSDoc 或相邻注释。
    let jsdocStart = i;
    for (let j = i - 1; j >= 0; j--) {
      const prev = lines[j].trim();
      if (prev.startsWith("/**")) {
        jsdocStart = j;
        break;
      }
      if (prev === "" || prev.startsWith("*") || prev.startsWith("//")) {
        jsdocStart = j;
      } else {
        break;
      }
    }
    // 避免提取片段出现多余前导空行。
    if (jsdocStart < i && lines[jsdocStart].trim() === "") {
      jsdocStart++;
    }

    // 处理不带对象体的紧凑 type 别名。
    if (isType && !lines[i].includes("{")) {
      // 查找分号结束位置。
      let end = i;
      while (end < lines.length && !lines[end].includes(";")) {
        end++;
      }
      declarations.push(lines.slice(jsdocStart, end + 1).join("\n"));
      continue;
    }

    // 处理带大括号的声明，通过括号深度配对结束位置。
    let depth = 0;
    let end = i;
    for (let k = i; k < lines.length; k++) {
      for (const ch of lines[k]) {
        if (ch === "{") depth++;
        if (ch === "}") depth--;
      }
      if (depth <= 0) {
        end = k;
        break;
      }
    }

    declarations.push(lines.slice(jsdocStart, end + 1).join("\n"));
  }

  return declarations;
}

/**
 * 根据自然语言描述推荐组件。
 * 结合关键词映射与文本匹配进行排序。
 */
export function suggestComponents(
  components: ComponentMeta[],
  description: string,
): Array<{ component: ComponentMeta; reason: string }> {
  const KEYWORD_MAP: Record<string, string[]> = {
    // 英文关键词
    chat: ["message", "message-list", "sender", "responsive-sender"],
    message: ["message", "message-list", "avatar-header"],
    input: ["sender", "responsive-sender", "block-input", "dynamic-form"],
    send: ["sender", "responsive-sender"],
    sidebar: ["sidebar", "history-item", "sources-sidebar"],
    history: ["history-item", "sidebar"],
    button: ["block-button", "icon-button", "toggle-button"],
    form: ["dynamic-form", "block-input", "block-select", "checkbox", "radio"],
    select: ["block-select", "select-card", "component-panel"],
    card: [
      "select-card",
      "report-card",
      "task-card",
      "goal-card",
      "agent-card",
      "document-card",
      "file-card",
    ],
    thinking: ["deep-thinking", "thinking-process", "thinking-step-item"],
    task: ["task-list", "task-card"],
    markdown: ["markdown"],
    feedback: ["feedback"],
    welcome: ["welcome", "prompt", "quick-action", "suggestion"],
    attachment: ["attachment-list"],
    upload: ["upload"],
    tag: ["tag", "status-tag"],
    tooltip: ["tooltip"],
    progress: ["progress", "goal-card"],
    confirm: ["confirm-panel"],
    divider: ["divider"],
    avatar: ["avatar", "avatar-header"],
    accordion: ["block-accordion"],
    header: ["page-header", "avatar-header"],
    navigation: ["page-header", "sidebar"],
    split: ["triple-split-pane"],
    panel: ["component-panel", "confirm-panel", "triple-split-pane"],
    source: ["custom-sources", "sources-sidebar"],
    execution: ["execution-result"],
    ai: [
      "message",
      "message-list",
      "deep-thinking",
      "thinking-process",
      "markdown",
    ],
    agent: ["agent-card"],
    document: ["document-card"],
    file: ["file-card", "attachment-list"],
    report: ["report-card"],
    goal: ["goal-card"],
    quote: ["quote-content"],
    // 中文关键词
    聊天: ["message", "message-list", "sender", "responsive-sender", "sidebar"],
    消息: ["message", "message-list", "avatar-header"],
    对话: ["message", "message-list", "sender", "responsive-sender"],
    输入: ["sender", "responsive-sender", "block-input", "dynamic-form"],
    发送: ["sender", "responsive-sender"],
    侧边栏: ["sidebar", "history-item", "sources-sidebar"],
    历史: ["history-item", "sidebar"],
    按钮: ["block-button", "icon-button", "toggle-button"],
    表单: ["dynamic-form", "block-input", "block-select", "checkbox", "radio"],
    选择: ["block-select", "select-card", "component-panel"],
    卡片: [
      "select-card",
      "report-card",
      "task-card",
      "goal-card",
      "agent-card",
      "document-card",
      "file-card",
    ],
    思考: ["deep-thinking", "thinking-process", "thinking-step-item"],
    任务: ["task-list", "task-card"],
    反馈: ["feedback"],
    欢迎: ["welcome", "prompt", "quick-action", "suggestion"],
    附件: ["attachment-list"],
    上传: ["upload"],
    标签: ["tag", "status-tag"],
    进度: ["progress", "goal-card"],
    确认: ["confirm-panel"],
    分割: ["divider"],
    头像: ["avatar", "avatar-header"],
    折叠: ["block-accordion"],
    导航: ["page-header", "sidebar"],
    面板: ["component-panel", "confirm-panel", "triple-split-pane"],
    来源: ["custom-sources", "sources-sidebar"],
    执行: ["execution-result"],
    智能: [
      "message",
      "message-list",
      "deep-thinking",
      "thinking-process",
      "markdown",
    ],
    文档: ["document-card"],
    文件: ["file-card", "attachment-list"],
    报告: ["report-card"],
    目标: ["goal-card"],
    引用: ["quote-content"],
    布局: ["triple-split-pane", "divider", "page-header"],
    页面: ["page-header", "welcome"],
  };

  const lower = description.toLowerCase();
  const reasons = new Map<string, string[]>();
  const scores = new Map<string, number>();

  // 统一积分类入口，便于维护排序策略。
  const addScore = (name: string, delta: number, reason: string) => {
    scores.set(name, (scores.get(name) ?? 0) + delta);
    if (!reasons.has(name)) reasons.set(name, []);
    reasons.get(name)!.push(reason);
  };

  for (const [keyword, names] of Object.entries(KEYWORD_MAP)) {
    if (lower.includes(keyword)) {
      for (const name of names) {
        addScore(name, 3, keyword);
      }
    }
  }

  // 融合关键词匹配与文本检索，提高召回率。
  const textResults = searchComponents(components, description);
  for (const [idx, c] of textResults.slice(0, 8).entries()) {
    addScore(c.name, Math.max(1, 6 - idx), "description match");
  }

  const componentMap = new Map(components.map((c) => [c.name, c]));
  const suggestions: Array<{
    component: ComponentMeta;
    reason: string;
    score: number;
  }> = [];

  for (const [name, baseScore] of scores.entries()) {
    const comp = componentMap.get(name);
    if (!comp) continue;

    // 页面组装场景下，优先提升高层组件权重。
    const layerBoost = comp.layer === "composed" ? 4 : comp.layer === "blocks" ? 2 : 0;
    const reasonList = Array.from(new Set(reasons.get(name) || []));

    suggestions.push({
      component: comp,
      reason: `Matched by: ${reasonList.join(", ")}`,
      score: baseScore + layerBoost,
    });
  }

  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(({ component, reason }) => ({ component, reason }));
}

/**
 * 将组件元信息格式化为可读文本。
 */
export function formatComponentList(components: ComponentMeta[]): string {
  const grouped: Record<string, ComponentMeta[]> = {};
  for (const c of components) {
    if (!grouped[c.layer]) grouped[c.layer] = [];
    grouped[c.layer].push(c);
  }

  const lines: string[] = [];

  for (const [layer, comps] of Object.entries(grouped)) {
    lines.push(`\n## ${layer.toUpperCase()} (${comps.length} components)\n`);
    for (const c of comps) {
      lines.push(`- **${c.name}** (${c.title}): ${c.description}`);
      if (c.dependencies.length > 0) {
        lines.push(`  Dependencies: ${c.dependencies.join(", ")}`);
      }
      if (c.registryDependencies.length > 0) {
        lines.push(
          `  Registry dependencies: ${c.registryDependencies.join(", ")}`,
        );
      }
    }
  }

  return lines.join("\n");
}
