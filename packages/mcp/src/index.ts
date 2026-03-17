#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  buildComponentIndex,
  searchComponents,
  getComponentSource,
  extractComponentAPI,
  suggestComponents,
  formatComponentList,
  type ComponentMeta,
} from "./registry.js";

import {
  getTokensByCategory,
  formatTokensAsText,
} from "./tokens.js";

import { resolve } from "node:path";

function resolveComponentRoot(): string {
  const envRoot = process.env.COMPONENT_ROOT;
  if (envRoot) {
    return resolve(envRoot);
  }
  return new URL(
    "../../../apps/www/registry/wuhan",
    import.meta.url,
  ).pathname;
}

const COMPONENT_ROOT = resolveComponentRoot();

let componentIndex: ComponentMeta[] | null = null;

function getIndex(): ComponentMeta[] {
  if (!componentIndex) {
    componentIndex = buildComponentIndex(COMPONENT_ROOT);
  }
  return componentIndex;
}

const server = new McpServer({
  name: "wuhan-components",
  version: "0.1.0",
});

// ──────────────────────────────────────────────
// Tools
// ──────────────────────────────────────────────

server.tool(
  "list_components",
  "列出组件库中的所有组件，可按层级过滤（ui / blocks / composed）",
  {
    layer: z
      .enum(["ui", "blocks", "composed"])
      .optional()
      .describe("组件层级：ui=基础原语, blocks=原语组件, composed=组合组件"),
  },
  async ({ layer }) => {
    let components = getIndex();
    if (layer) {
      components = components.filter((c) => c.layer === layer);
    }
    return {
      content: [
        {
          type: "text",
          text: formatComponentList(components),
        },
      ],
    };
  },
);

server.tool(
  "search_component",
  "按关键词搜索组件（匹配名称、标题、描述）",
  {
    query: z.string().describe("搜索关键词，如 'message', 'button', 'form'"),
  },
  async ({ query }) => {
    const results = searchComponents(getIndex(), query);
    if (results.length === 0) {
      return {
        content: [{ type: "text", text: `未找到匹配 "${query}" 的组件` }],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `找到 ${results.length} 个匹配组件：\n${formatComponentList(results)}`,
        },
      ],
    };
  },
);

server.tool(
  "get_component_api",
  "获取组件的完整 API（TypeScript 接口定义、Props、类型）",
  {
    name: z.string().describe("组件名称，如 'message', 'sender', 'block-button'"),
  },
  async ({ name }) => {
    const comp = getIndex().find((c) => c.name === name);
    if (!comp) {
      const similar = searchComponents(getIndex(), name).slice(0, 5);
      return {
        content: [
          {
            type: "text",
            text: `未找到组件 "${name}"。${
              similar.length > 0
                ? `相似组件：${similar.map((c) => c.name).join(", ")}`
                : ""
            }`,
          },
        ],
      };
    }

    const api = extractComponentAPI(COMPONENT_ROOT, comp);
    const meta = [
      `# ${comp.name} (${comp.title})`,
      `> ${comp.description}`,
      `- Layer: ${comp.layer}`,
      `- Files: ${comp.files.join(", ")}`,
      comp.dependencies.length > 0
        ? `- Dependencies: ${comp.dependencies.join(", ")}`
        : null,
      comp.registryDependencies.length > 0
        ? `- Registry dependencies: ${comp.registryDependencies.join(", ")}`
        : null,
      "",
      "## TypeScript API",
      "",
      "```typescript",
      api,
      "```",
    ]
      .filter(Boolean)
      .join("\n");

    return { content: [{ type: "text", text: meta }] };
  },
);

server.tool(
  "get_component_source",
  "获取组件的完整源代码",
  {
    name: z.string().describe("组件名称"),
    layer: z
      .enum(["ui", "blocks", "composed"])
      .optional()
      .describe("指定层级（同名组件在不同层级时需指定）"),
  },
  async ({ name, layer }) => {
    let candidates = getIndex().filter((c) => c.name === name);
    if (layer) {
      candidates = candidates.filter((c) => c.layer === layer);
    }
    const comp = candidates[0];
    if (!comp) {
      return {
        content: [{ type: "text", text: `未找到组件 "${name}"` }],
      };
    }

    const sources = getComponentSource(COMPONENT_ROOT, comp);
    if (sources.length === 0) {
      return {
        content: [
          { type: "text", text: `组件 "${name}" 没有可读取的源文件` },
        ],
      };
    }

    const text = sources
      .map(
        (s) =>
          `// ========== ${s.path} ==========\n\n${s.content}`,
      )
      .join("\n\n");

    return { content: [{ type: "text", text }] };
  },
);

server.tool(
  "get_design_tokens",
  "获取设计 Token（CSS 变量），可按类别过滤",
  {
    category: z
      .string()
      .optional()
      .describe(
        "Token 类别过滤，如 'color', 'spacing', 'font', 'radius', 'shadow', 'text', 'container', 'border', 'ai'",
      ),
  },
  async ({ category }) => {
    const categories = getTokensByCategory(COMPONENT_ROOT, category);
    if (categories.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: category
              ? `未找到匹配 "${category}" 的 token 类别`
              : "未找到任何 token",
          },
        ],
      };
    }
    return {
      content: [{ type: "text", text: formatTokensAsText(categories) }],
    };
  },
);

server.tool(
  "suggest_components",
  "根据需求描述推荐合适的组件",
  {
    description: z
      .string()
      .describe("需求描述，如 '我需要构建一个聊天界面' 或 'I need a form with validation'"),
  },
  async ({ description }) => {
    const suggestions = suggestComponents(getIndex(), description);
    if (suggestions.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `未找到匹配描述的组件。请尝试更具体的描述，或使用 list_components 浏览所有组件。`,
          },
        ],
      };
    }

    const lines = [
      `## 推荐组件（共 ${suggestions.length} 个）\n`,
    ];

    for (const { component: c, reason } of suggestions) {
      lines.push(`### ${c.name} (${c.title}) [${c.layer}]`);
      lines.push(`${c.description}`);
      lines.push(`_${reason}_`);
      if (c.registryDependencies.length > 0) {
        lines.push(
          `Registry dependencies: ${c.registryDependencies.join(", ")}`,
        );
      }
      lines.push("");
    }

    return { content: [{ type: "text", text: lines.join("\n") }] };
  },
);

// ──────────────────────────────────────────────
// Resources
// ──────────────────────────────────────────────

server.resource(
  "components-list",
  "wuhan://components/list",
  {
    description: "全部组件清单（按层级分类）",
    mimeType: "text/plain",
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: formatComponentList(getIndex()),
        mimeType: "text/plain",
      },
    ],
  }),
);

server.resource(
  "tokens-colors",
  "wuhan://tokens/colors",
  {
    description: "颜色相关 Token（Page / Container / Text / Border / Brand 等）",
    mimeType: "text/plain",
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: formatTokensAsText(getTokensByCategory(COMPONENT_ROOT, "color")),
        mimeType: "text/plain",
      },
    ],
  }),
);

server.resource(
  "tokens-spacing",
  "wuhan://tokens/spacing",
  {
    description: "间距 Token（Space / Margin / Padding / Gap）",
    mimeType: "text/plain",
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: formatTokensAsText([
          ...getTokensByCategory(COMPONENT_ROOT, "space"),
          ...getTokensByCategory(COMPONENT_ROOT, "margin"),
          ...getTokensByCategory(COMPONENT_ROOT, "padding"),
          ...getTokensByCategory(COMPONENT_ROOT, "gap"),
        ]),
        mimeType: "text/plain",
      },
    ],
  }),
);

server.resource(
  "tokens-all",
  "wuhan://tokens/all",
  {
    description: "全部设计 Token",
    mimeType: "text/plain",
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: formatTokensAsText(getTokensByCategory(COMPONENT_ROOT)),
        mimeType: "text/plain",
      },
    ],
  }),
);

server.resource(
  "guide-page-generation",
  "wuhan://guide/page-generation",
  {
    description: "页面生成指南",
    mimeType: "text/plain",
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: PAGE_GENERATION_GUIDE,
        mimeType: "text/plain",
      },
    ],
  }),
);

// ──────────────────────────────────────────────
// Page generation guide (embedded)
// ──────────────────────────────────────────────

const PAGE_GENERATION_GUIDE = `# unnamed-ui 页面生成指南

## 组件层级

| 层级 | 描述 | 导入路径 |
|------|------|----------|
| ui | Radix 基础组件（Button、Textarea 等） | @/components/ui/{name} |
| blocks | 原语组件（纯样式，无业务逻辑） | @/components/wuhan/blocks/{name}-01 |
| composed | 组合组件（包含业务逻辑，组合原语） | @/components/wuhan/composed/{name} |

## 样式规范

### 必须使用 CSS 变量，禁止硬编码颜色

- 颜色：\`var(--Text-text-primary)\`, \`var(--Container-bg-container)\`, \`var(--Border-border-neutral)\`
- 字号：\`var(--font-size-1)\` ~ \`var(--font-size-10)\`
- 间距：\`var(--Space-space-1)\` ~ \`var(--Space-space-12)\`
- 圆角：\`var(--radius)\`, \`var(--radius-sm)\`, \`var(--radius-lg)\`
- 阴影：\`var(--shadow-basic)\`, \`var(--shadow-medium)\`, \`var(--shadow-high)\`

### shadcn 兼容 Tailwind 类

可以使用 shadcn 语义类：\`bg-background\`, \`text-foreground\`, \`bg-primary\`, \`text-muted-foreground\` 等

## 工作流

1. **解析需求** — 理解页面功能和布局
2. **选择组件** — 使用 \`suggest_components\` 或 \`search_component\` 找到合适组件
3. **查看 API** — 使用 \`get_component_api\` 了解组件接口
4. **编写代码** — 组合组件，使用设计 Token
5. **校验** — 确保样式使用 CSS 变量，导入路径正确

## 常见场景组件推荐

| 场景 | 推荐组件 |
|------|----------|
| 聊天界面 | message-list, sender / responsive-sender, sidebar |
| 欢迎页 | welcome, prompt, quick-action, suggestion |
| 表单 | dynamic-form, block-input, block-select, checkbox, radio |
| 内容展示 | markdown, deep-thinking, thinking-process, execution-result |
| 任务管理 | task-list, task-card, status-tag, confirm-panel |
| 文件/文档 | file-card, document-card, attachment-list, upload |
| 卡片 | select-card, report-card, goal-card, agent-card |
| 导航 | page-header, sidebar, history-item |
| 反馈 | feedback, confirm-panel |
| 布局 | triple-split-pane, divider |
`;

// ──────────────────────────────────────────────
// Start server
// ──────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("MCP server failed to start:", err);
  process.exit(1);
});
