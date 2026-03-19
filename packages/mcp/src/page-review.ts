import type { SceneRecipe } from "./scene-recipes.js";

export interface ReviewResult {
  score: number;
  issues: string[];
}

/**
 * 返回去重后的正则匹配结果。
 */
function uniqueMatches(input: string, pattern: RegExp): string[] {
  const matches = input.match(pattern) || [];
  return Array.from(new Set(matches));
}

/**
 * 基于规则的页面代码审查（面向武汉组件库约定）。
 * 该实现保持轻量，依赖文本规则，适合在 MCP 内快速执行。
 */
export function reviewPageCode(
  code: string,
  sceneRecipe?: SceneRecipe | null,
): ReviewResult {
  const issues: string[] = [];

  // 统计去重后的 composed 导入数量，作为复用质量的近似指标。
  const composedImports = uniqueMatches(
    code,
    /@\/components\/wuhan\/composed\/[a-z0-9-]+/g,
  );

  // 每条规则失败都等权扣分，便于解释评分来源。
  const checks: Array<{ pass: boolean; failMsg: string }> = [
    {
      pass: composedImports.length > 0,
      failMsg: "未检测到 composed 组件导入，可能没有优先使用高层组件。",
    },
    {
      pass: composedImports.length >= 3,
      failMsg: "检测到 composed 组件少于 3 个，页面结构可能过于原子化。",
    },
    {
      pass: !/from\s+["'](@mui\/|antd|chakra-ui|semantic-ui|element-plus)/.test(code),
      failMsg: "检测到外部 UI 库导入（MUI/Antd/Chakra 等），与组件体系约束冲突。",
    },
    {
      pass: !/(#[0-9a-fA-F]{3,8}|rgb\(|rgba\(|hsl\(|hsla\()/.test(code),
      failMsg: "检测到硬编码色值（hex/rgb/hsl），建议改为设计 token 或 shadcn 语义类。",
    },
    {
      pass: !/text-(gray|slate|zinc|neutral|stone)-\d{2,3}|bg-(gray|slate|zinc|neutral|stone)-\d{2,3}/.test(
        code,
      ),
      failMsg: "检测到 Tailwind 原始灰阶色，建议改为语义 token（如 --Text-* / --Container-*）。",
    },
    {
      pass: !/\bany\b/.test(code),
      failMsg: "检测到 any 类型，建议补充精确 TypeScript 类型。",
    },
    {
      pass: /loading|isLoading|generating|status\s*=\s*["']generating["']/i.test(
        code,
      ),
      failMsg: "未识别到 loading/generating 状态处理。",
    },
    {
      pass: /empty|暂无|no data|error|失败|status\s*=\s*["']failed["']/i.test(code),
      failMsg: "未识别到 empty 或 error 状态处理。",
    },
  ];

  for (const check of checks) {
    if (!check.pass) issues.push(check.failMsg);
  }

  if (sceneRecipe) {
    const normalizedCode = code.toLowerCase();
    // 场景配方定义了该场景下的最低必选组件集合。
    for (const name of sceneRecipe.requiredComponents) {
      const imported = normalizedCode.includes(
        `@/components/wuhan/composed/${name}`.toLowerCase(),
      );
      if (!imported) {
        issues.push(`场景「${sceneRecipe.title}」缺少必选组件：${name}`);
      }
    }
  }

  // 评分保持简单可解释：每个问题扣 10 分。
  const score = Math.max(0, 100 - issues.length * 10);
  return { score, issues };
}
