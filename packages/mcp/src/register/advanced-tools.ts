import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import type { ComponentBestPractice } from "../best-practices.js";
import type { ReviewResult } from "../page-review.js";
import type { SceneRecipe } from "../scene-recipes.js";

interface AdvancedToolsContext {
  getComponentBestPractice: (name: string) => ComponentBestPractice | null;
  listBestPracticeNames: () => string[];
  listSceneRecipes: () => SceneRecipe[];
  resolveSceneRecipe: (input: string) => SceneRecipe | null;
  reviewPageCode: (code: string, sceneRecipe?: SceneRecipe | null) => ReviewResult;
  generatePageBlueprint: (description: string) => string;
}

/**
 * 注册扩展工具：最佳实践、场景配方、页面蓝图、页面审查。
 */
export function registerAdvancedTools(
  server: McpServer,
  ctx: AdvancedToolsContext,
): void {
  server.tool(
    "get_component_best_practices",
    "获取组件的关键使用规则、推荐模式和禁用模式",
    {
      name: z.string().describe("组件名称，如 'avatar'、'status-tag'、'quick-action'"),
    },
    async ({ name }) => {
      const best = ctx.getComponentBestPractice(name);
      if (!best) {
        return {
          content: [
            {
              type: "text",
              text: `未找到组件 "${name}" 的关键规则。可用组件规则：${ctx.listBestPracticeNames().join(", ")}`,
            },
          ],
        };
      }

      const lines = [
        `# ${best.name} 使用规则`,
        `- Summary: ${best.summary}`,
        "",
        "## Rules",
        ...best.usageRules.map((rule, idx) => `${idx + 1}. ${rule}`),
        "",
        "## Recommended Patterns",
        ...(best.recommendedPatterns && best.recommendedPatterns.length > 0
          ? best.recommendedPatterns.map((rule, idx) => `${idx + 1}. ${rule}`)
          : ["1. 无特定推荐模式"]),
        "",
        "## Avoid",
        ...(best.avoidPatterns && best.avoidPatterns.length > 0
          ? best.avoidPatterns.map((rule, idx) => `${idx + 1}. ${rule}`)
          : ["1. 无特定禁用模式"]),
      ];

      return { content: [{ type: "text", text: lines.join("\n") }] };
    },
  );

  server.tool(
    "get_scene_recipe",
    "获取页面场景配方（布局、必选组件、状态清单、实现步骤）",
    {
      scene: z
        .string()
        .describe("场景名，如 'chat'、'工作台'、'form'、'dashboard'、'上传文档'"),
    },
    async ({ scene }) => {
      const recipe = ctx.resolveSceneRecipe(scene);
      if (!recipe) {
        const available = ctx.listSceneRecipes().map((item) => item.id).join(", ");
        return {
          content: [
            {
              type: "text",
              text: `未匹配到场景 "${scene}"。可用场景：${available}`,
            },
          ],
        };
      }

      const lines = [
        `# ${recipe.title}`,
        `- id: ${recipe.id}`,
        `- layout: ${recipe.layout}`,
        "",
        "## Required Components",
        ...recipe.requiredComponents.map((name, idx) => `${idx + 1}. ${name}`),
        "",
        "## Optional Components",
        ...recipe.optionalComponents.map((name, idx) => `${idx + 1}. ${name}`),
        "",
        "## State Checklist",
        ...recipe.stateChecklist.map((name, idx) => `${idx + 1}. ${name}`),
        "",
        "## Implementation Flow",
        ...recipe.implementationFlow.map((step, idx) => `${idx + 1}. ${step}`),
      ];

      return { content: [{ type: "text", text: lines.join("\n") }] };
    },
  );

  server.tool(
    "generate_page_blueprint",
    "根据需求生成页面实现蓝图（布局、组件选型、token 提示、实施顺序）",
    {
      description: z
        .string()
        .describe("页面需求描述，如 '做一个 AI 工作台，左侧历史，中间对话，右侧分析面板'"),
    },
    async ({ description }) => {
      return {
        content: [{ type: "text", text: ctx.generatePageBlueprint(description) }],
      };
    },
  );

  server.tool(
    "review_page_code",
    "审查页面代码是否符合组件库与设计 token 规范，并输出评分与问题列表",
    {
      code: z
        .string()
        .describe("待审查的 TSX/CSS 代码内容"),
      scene: z
        .string()
        .optional()
        .describe("可选。页面场景，如 chat/workstation/form/dashboard，用于检查必选组件"),
    },
    async ({ code, scene }) => {
      const recipe = scene ? ctx.resolveSceneRecipe(scene) : null;
      const result = ctx.reviewPageCode(code, recipe);
      const lines = [
        `## 页面规范审查得分: ${result.score}/100`,
        recipe ? `- 场景检查: ${recipe.title}` : "- 场景检查: 通用",
        "",
        result.issues.length === 0 ? "✅ 未发现明显规范问题。" : "### 问题",
        ...result.issues.map((item, idx) => `${idx + 1}. ${item}`),
        "",
        "### 建议",
        "- 生成前先使用 generate_page_blueprint",
        "- 生成后再用 review_page_code 做一次回归检查",
      ];
      return {
        content: [{ type: "text", text: lines.join("\n") }],
      };
    },
  );
}
