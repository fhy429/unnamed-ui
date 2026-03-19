export interface FeatureToggles {
  advancedTools: boolean;
  resources: boolean;
}

/**
 * 解析功能开关。
 * 通过环境变量 `MCP_FEATURE_FLAGS` 控制，示例：
 * - `all`（默认）
 * - `advanced,resources`
 * - `advanced`
 * - `resources`
 */
export function resolveFeatureToggles(
  rawFeatureFlags: string | undefined = process.env.MCP_FEATURE_FLAGS,
): FeatureToggles {
  if (!rawFeatureFlags || rawFeatureFlags.trim() === "") {
    return { advancedTools: true, resources: true };
  }

  const flags = new Set(
    rawFeatureFlags
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean),
  );

  const allEnabled = flags.has("all");
  return {
    advancedTools: allEnabled || flags.has("advanced"),
    resources: allEnabled || flags.has("resources"),
  };
}
