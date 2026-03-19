import type { ComponentMeta } from "../registry.js";

/**
 * 创建组件索引的延迟读取器。
 * 索引仅构建一次，后续读取走内存缓存。
 */
export function createComponentIndexGetter(
  componentRoot: string,
  buildComponentIndex: (root: string) => ComponentMeta[],
): () => ComponentMeta[] {
  let componentIndex: ComponentMeta[] | null = null;

  return function getIndex(): ComponentMeta[] {
    if (!componentIndex) {
      componentIndex = buildComponentIndex(componentRoot);
    }
    return componentIndex;
  };
}
