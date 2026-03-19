import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import type { ComponentBestPractice } from "../best-practices.js";
import type { ComponentMeta } from "../registry.js";
import type { TokenCategory } from "../tokens.js";

interface CoreToolsContext {
  componentRoot: string;
  getIndex: () => ComponentMeta[];
  formatComponentList: (components: ComponentMeta[]) => string;
  searchComponents: (components: ComponentMeta[], query: string) => ComponentMeta[];
  extractComponentAPI: (componentRoot: string, component: ComponentMeta) => string;
  getComponentSource: (
    componentRoot: string,
    component: ComponentMeta,
  ) => Array<{ path: string; content: string }>;
  getTokensByCategory: (componentRoot: string, category?: string) => TokenCategory[];
  formatTokensAsText: (categories: TokenCategory[]) => string;
  suggestComponents: (
    components: ComponentMeta[],
    description: string,
  ) => Array<{ component: ComponentMeta; reason: string }>;
  getComponentBestPractice: (name: string) => ComponentBestPractice | null;
}

/**
 * 注册核心工具：组件检索、源码/API、token、推荐能力。
 */
export function registerCoreTools(server: McpServer, ctx: CoreToolsContext): void {
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
      let components = ctx.getIndex();
      if (layer) {
        components = components.filter((c) => c.layer === layer);
      }
      return {
        content: [
          {
            type: "text",
            text: ctx.formatComponentList(components),
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
      const results = ctx.searchComponents(ctx.getIndex(), query);
      if (results.length === 0) {
        return {
          content: [{ type: "text", text: `未找到匹配 "${query}" 的组件` }],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: `找到 ${results.length} 个匹配组件：\n${ctx.formatComponentList(results)}`,
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
      const comp = ctx.getIndex().find((c) => c.name === name);
      if (!comp) {
        const similar = ctx.searchComponents(ctx.getIndex(), name).slice(0, 5);
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

      const api = ctx.extractComponentAPI(ctx.componentRoot, comp);
      const bestPractice = ctx.getComponentBestPractice(comp.name);
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
        bestPractice ? "" : null,
        bestPractice ? "## Best Practices" : null,
        bestPractice ? `- Summary: ${bestPractice.summary}` : null,
        bestPractice && bestPractice.requiredProps && bestPractice.requiredProps.length > 0
          ? `- Required props: ${bestPractice.requiredProps.join(", ")}`
          : null,
        bestPractice && bestPractice.usageRules.length > 0
          ? `- Rules:\n${bestPractice.usageRules.map((rule) => `  - ${rule}`).join("\n")}`
          : null,
        bestPractice && bestPractice.avoidPatterns && bestPractice.avoidPatterns.length > 0
          ? `- Avoid:\n${bestPractice.avoidPatterns.map((rule) => `  - ${rule}`).join("\n")}`
          : null,
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
      let candidates = ctx.getIndex().filter((c) => c.name === name);
      if (layer) {
        candidates = candidates.filter((c) => c.layer === layer);
      }
      const comp = candidates[0];
      if (!comp) {
        return {
          content: [{ type: "text", text: `未找到组件 "${name}"` }],
        };
      }

      const sources = ctx.getComponentSource(ctx.componentRoot, comp);
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
      const categories = ctx.getTokensByCategory(ctx.componentRoot, category);
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
        content: [{ type: "text", text: ctx.formatTokensAsText(categories) }],
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
      const suggestions = ctx.suggestComponents(ctx.getIndex(), description);
      if (suggestions.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "未找到匹配描述的组件。请尝试更具体的描述，或使用 list_components 浏览所有组件。",
            },
          ],
        };
      }

      const lines = [`## 推荐组件（共 ${suggestions.length} 个）\n`];

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
}
