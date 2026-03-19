import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import type { ComponentMeta } from "../registry.js";
import type { SceneRecipe } from "../scene-recipes.js";
import type { TokenCategory } from "../tokens.js";

interface ResourcesContext {
  componentRoot: string;
  getIndex: () => ComponentMeta[];
  formatComponentList: (components: ComponentMeta[]) => string;
  getTokensByCategory: (componentRoot: string, category?: string) => TokenCategory[];
  formatTokensAsText: (categories: TokenCategory[]) => string;
  listBestPracticeNames: () => string[];
  listSceneRecipes: () => SceneRecipe[];
}

/**
 * 注册 MCP 资源（wuhan://...）。
 */
export function registerResources(server: McpServer, ctx: ResourcesContext): void {
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
          text: ctx.formatComponentList(ctx.getIndex()),
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
          text: ctx.formatTokensAsText(ctx.getTokensByCategory(ctx.componentRoot, "color")),
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
          text: ctx.formatTokensAsText([
            ...ctx.getTokensByCategory(ctx.componentRoot, "space"),
            ...ctx.getTokensByCategory(ctx.componentRoot, "margin"),
            ...ctx.getTokensByCategory(ctx.componentRoot, "padding"),
            ...ctx.getTokensByCategory(ctx.componentRoot, "gap"),
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
          text: ctx.formatTokensAsText(ctx.getTokensByCategory(ctx.componentRoot)),
          mimeType: "text/plain",
        },
      ],
    }),
  );

  server.resource(
    "best-practices-list",
    "wuhan://rules/components",
    {
      description: "组件关键使用规则索引",
      mimeType: "text/plain",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          text: ctx.listBestPracticeNames().join("\n"),
          mimeType: "text/plain",
        },
      ],
    }),
  );

  server.resource(
    "scene-recipes",
    "wuhan://recipes/scenes",
    {
      description: "页面场景配方索引",
      mimeType: "text/plain",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          text: ctx.listSceneRecipes()
            .map((item) => `${item.id}: ${item.title}`)
            .join("\n"),
          mimeType: "text/plain",
        },
      ],
    }),
  );
}
