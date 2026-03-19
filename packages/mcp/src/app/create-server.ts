import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import {
  buildComponentIndex,
  searchComponents,
  getComponentSource,
  extractComponentAPI,
  suggestComponents,
  formatComponentList,
} from "../registry.js";
import {
  getTokensByCategory,
  formatTokensAsText,
} from "../tokens.js";
import {
  getComponentBestPractice,
  findBestPracticesByScene,
  listBestPracticeNames,
} from "../best-practices.js";
import {
  listSceneRecipes,
  resolveSceneRecipe,
} from "../scene-recipes.js";
import { reviewPageCode } from "../page-review.js";
import { registerCoreTools } from "../register/core-tools.js";
import { registerAdvancedTools } from "../register/advanced-tools.js";
import { registerResources } from "../register/resources.js";
import { generatePageBlueprint } from "../services/blueprint.js";
import { resolveFeatureToggles } from "../config/features.js";
import { resolveComponentRoot } from "../config/component-root.js";
import { createComponentIndexGetter } from "../services/component-index.js";

interface CreateWuhanServerOptions {
  componentRoot?: string;
  featureFlags?: string;
}

/**
 * 创建并完成注册的 MCP Server 实例。
 */
export function createWuhanServer(options: CreateWuhanServerOptions = {}): McpServer {
  const componentRoot = options.componentRoot ?? resolveComponentRoot();
  const features = resolveFeatureToggles(options.featureFlags);
  const getIndex = createComponentIndexGetter(componentRoot, buildComponentIndex);

  const server = new McpServer({
    name: "wuhan-components",
    version: "0.1.0",
  });

  const generatePageBlueprintText = (description: string): string =>
    generatePageBlueprint(description, {
      componentRoot,
      getIndex,
      suggestComponents,
      resolveSceneRecipe,
      findBestPracticesByScene,
      getComponentBestPractice,
      getTokensByCategory,
    });

  registerCoreTools(server, {
    componentRoot,
    getIndex,
    formatComponentList,
    searchComponents,
    extractComponentAPI,
    getComponentSource,
    getTokensByCategory,
    formatTokensAsText,
    suggestComponents,
    getComponentBestPractice,
  });

  if (features.advancedTools) {
    registerAdvancedTools(server, {
      getComponentBestPractice,
      listBestPracticeNames,
      listSceneRecipes,
      resolveSceneRecipe,
      reviewPageCode,
      generatePageBlueprint: generatePageBlueprintText,
    });
  }

  if (features.resources) {
    registerResources(server, {
      componentRoot,
      getIndex,
      formatComponentList,
      getTokensByCategory,
      formatTokensAsText,
      listBestPracticeNames,
      listSceneRecipes,
    });
  }

  return server;
}
