import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface TokenEntry {
  name: string;
  value: string;
  category: string;
}

export interface TokenCategory {
  name: string;
  description: string;
  tokens: TokenEntry[];
}

const CATEGORY_MAP: Record<string, { pattern: RegExp; description: string }> = {
  "Color Primitives - Light": {
    pattern: /^--Light-/,
    description: "Figma 浅色原语色（Neutral / Brand / Success / Warning / Error）",
  },
  "Color Primitives - Dark": {
    pattern: /^--Dark-/,
    description: "Figma 深色原语色（Neutral / Brand / Success / Warning / Error）",
  },
  "Color Primitives - Alpha": {
    pattern: /^--(White-alpha|Black-alpha)-/,
    description: "带透明度的黑白色",
  },
  Page: {
    pattern: /^--Page-/,
    description: "页面级背景色",
  },
  Container: {
    pattern: /^--Container-/,
    description: "容器背景色（neutral / brand / success / warning / error 及其状态变体）",
  },
  Text: {
    pattern: /^--Text-/,
    description: "文字颜色（primary / secondary / tertiary / brand / success / warning / error）",
  },
  Border: {
    pattern: /^--Border-/,
    description: "边框和分割线颜色",
  },
  "Focus Ring": {
    pattern: /^--Focusring-/,
    description: "聚焦环颜色",
  },
  "Font Family": {
    pattern: /^--font-family-/,
    description: "字体族：中文、英文、代码",
  },
  "Font Size": {
    pattern: /^--font-size-/,
    description: "字号梯度：12px ~ 64px",
  },
  "Line Height": {
    pattern: /^--line-height-/,
    description: "行高梯度",
  },
  Space: {
    pattern: /^--Space-space-/,
    description: "间距基础梯度：2px ~ 64px",
  },
  Margin: {
    pattern: /^--Margin-/,
    description: "组件外边距语义 token",
  },
  Padding: {
    pattern: /^--Padding-/,
    description: "组件内边距语义 token",
  },
  Gap: {
    pattern: /^--Gap-/,
    description: "间隙语义 token",
  },
  Size: {
    pattern: /^--Size-/,
    description: "组件尺寸 token",
  },
  Radius: {
    pattern: /^--radius/,
    description: "圆角：sm / md / lg / xl / 2xl / circle",
  },
  Shadow: {
    pattern: /^--shadow-/,
    description: "阴影：basic / medium / high / focus",
  },
  AI: {
    pattern: /^--ai-/,
    description: "AI 渐变背景色",
  },
  "shadcn Aliases": {
    pattern: /^--(background|foreground|card|popover|primary|secondary|muted|accent|destructive|border|input|ring|surface|code|selection)/,
    description: "shadcn / Tailwind 兼容别名",
  },
};

function categorize(name: string): string {
  for (const [category, { pattern }] of Object.entries(CATEGORY_MAP)) {
    if (pattern.test(name)) return category;
  }
  return "Other";
}

export function parseTokens(componentRoot: string): TokenCategory[] {
  const cssPath = join(componentRoot, "style", "globals.css");
  const content = readFileSync(cssPath, "utf-8");

  const tokenMap = new Map<string, TokenEntry[]>();
  const varRegex = /^\s*(--[\w-]+)\s*:\s*(.+?)\s*;/gm;

  let match: RegExpExecArray | null;
  while ((match = varRegex.exec(content)) !== null) {
    const name = match[1];
    const value = match[2];
    const category = categorize(name);

    if (!tokenMap.has(category)) {
      tokenMap.set(category, []);
    }
    tokenMap.get(category)!.push({ name, value, category });
  }

  const categories: TokenCategory[] = [];
  for (const [catName, meta] of Object.entries(CATEGORY_MAP)) {
    const tokens = tokenMap.get(catName);
    if (tokens && tokens.length > 0) {
      categories.push({
        name: catName,
        description: meta.description,
        tokens,
      });
    }
  }

  const otherTokens = tokenMap.get("Other");
  if (otherTokens && otherTokens.length > 0) {
    categories.push({
      name: "Other",
      description: "其他未分类 token",
      tokens: otherTokens,
    });
  }

  return categories;
}

export function getTokensByCategory(
  componentRoot: string,
  category?: string,
): TokenCategory[] {
  const all = parseTokens(componentRoot);
  if (!category) return all;

  const lower = category.toLowerCase();
  return all.filter(
    (c) =>
      c.name.toLowerCase().includes(lower) ||
      c.description.toLowerCase().includes(lower),
  );
}

export function formatTokensAsText(categories: TokenCategory[]): string {
  const lines: string[] = [];
  for (const cat of categories) {
    lines.push(`## ${cat.name}`);
    lines.push(`> ${cat.description}\n`);
    for (const t of cat.tokens) {
      lines.push(`  ${t.name}: ${t.value}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}
