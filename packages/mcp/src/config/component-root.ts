import { resolve } from "node:path";

/**
 * 解析组件库根目录。
 * 优先级：环境变量 > 默认 monorepo 路径。
 */
export function resolveComponentRoot(
  envRoot: string | undefined = process.env.COMPONENT_ROOT,
  importMetaUrl: string = import.meta.url,
): string {
  if (envRoot) {
    return resolve(envRoot);
  }
  return new URL(
    "../../../apps/www/registry/wuhan",
    importMetaUrl,
  ).pathname;
}
