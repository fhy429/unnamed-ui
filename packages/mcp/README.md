# @unnamed-ui/mcp

`@unnamed-ui/mcp` 是面向武汉组件库的 MCP Server，目标是让 AI/Agent 能通过标准化工具快速完成：

- 组件检索与选型
- 组件 API / 源码查看
- Design Token 查询
- 场景化页面蓝图生成
- 页面规范审查（轻量规则）

服务通过 `stdio` 方式运行，通常由 Cursor/Claude Desktop 等 MCP Client 启动。

## 目录结构

- `src/index.ts`：MCP Server 入口（功能开关解析、注册装配、服务启动）
- `src/config/features.ts`：功能开关解析（`MCP_FEATURE_FLAGS`）
- `src/config/component-root.ts`：组件根目录解析（`COMPONENT_ROOT`）
- `src/app/create-server.ts`：Server 装配入口（创建 server 并注册能力）
- `src/register/core-tools.ts`：核心 tools 注册
- `src/register/advanced-tools.ts`：扩展 tools 注册
- `src/register/resources.ts`：resources 注册
- `src/services/blueprint.ts`：页面蓝图服务（布局推断 + 蓝图文本生成）
- `src/services/component-index.ts`：组件索引缓存读取器
- `src/registry.ts`：组件索引构建、检索、源码/API 抽取
- `src/tokens.ts`：`globals.css` token 解析与分类
- `src/scene-recipes.ts`：页面场景配方（布局、必选组件、状态清单）
- `src/best-practices.ts`：组件高价值使用规则（可用于生成与审查提示）
- `src/page-review.ts`：页面代码规范审查（启发式规则）
- `src/tests/*.test.ts`：核心能力单测

## 工具（Tools）

- `list_components`：列出组件，可按层级筛选（ui / blocks / composed）
- `search_component`：按关键词检索组件
- `get_component_api`：获取组件的 TS 类型/API 片段
- `get_component_source`：获取组件源码
- `get_design_tokens`：按类别查询 design tokens
- `suggest_components`：按需求描述推荐组件
- `get_component_best_practices`：查询组件使用规则
- `get_scene_recipe`：查询场景配方
- `generate_page_blueprint`：输出页面落地蓝图
- `review_page_code`：对页面代码做规范审查并评分

## 资源（Resources）

- `wuhan://components/list`：组件总表
- `wuhan://tokens/colors`：颜色 token
- `wuhan://tokens/spacing`：间距相关 token
- `wuhan://tokens/all`：全部 token
- `wuhan://rules/components`：组件规则索引
- `wuhan://recipes/scenes`：场景配方索引

## 环境变量

- `COMPONENT_ROOT`：组件库根目录（可选）
  - 默认值：`apps/www/registry/wuhan`
  - 建议在 MCP Client 中显式配置，避免不同运行目录导致路径歧义
- `MCP_FEATURE_FLAGS`：功能开关（可选，逗号分隔）
  - 默认值：`all`
  - 可选值：`all` / `advanced` / `resources` / `advanced,resources`
  - 说明：
    - `advanced`：启用扩展工具（场景配方、最佳实践、蓝图生成、页面审查）
    - `resources`：启用 MCP resources（`wuhan://...`）
    - 若仅配置 `advanced`，则只保留核心 tools + 扩展 tools，不注册 resources

## 运行与测试

在 `packages/mcp` 下执行：

- `npm run build`：编译
- `npm run start`：启动 MCP Server
- `npm test`：运行测试（先 build 后执行 dist 测试）

## 设计与维护原则

- **轻依赖**：仅依赖 `@modelcontextprotocol/sdk` 与 `zod`
- **可解释**：推荐/审查逻辑尽量可读可追踪，不引入黑盒模型
- **优先复用**：推荐时对 `composed` 层给予更高权重
- **token 优先**：输出与审查都优先引导使用 design token，而非硬编码样式

## 本次工程梳理后的精简说明

为降低入口维护成本，已将原先内嵌在 `index.ts` 的大段“页面生成指南”文本移除，改为本 README 统一承载文档信息。这样可以避免：

- 代码与文档双处维护造成漂移
- 入口文件体积过大，影响可读性
- 资源注册中混入大量静态说明文本

如果后续确实需要在 MCP 内暴露“指南资源”，建议改为从独立 markdown 文件读取，再注册为 resource（保持单一信息源）。

## 第二轮改造（可裁剪注册）

`src/index.ts` 已完成“核心能力与扩展能力分层”：

- 核心 tools：默认始终注册（组件检索、源码/API、tokens、推荐）
- 扩展 tools：由 `MCP_FEATURE_FLAGS` 控制（`advanced`）
- resources：由 `MCP_FEATURE_FLAGS` 控制（`resources`）

这样可以在不同使用场景下进行轻量化启动，减少低频能力带来的上下文噪音与维护负担。

## 第三轮改造（入口装配器化）

`src/index.ts` 进一步将注册逻辑拆分为（现已迁至 `src/register/`）：

- `registerCoreTools()`：核心工具（始终注册）
- `registerAdvancedTools()`：扩展工具（由 `advanced` 控制）
- `registerResources()`：资源注册（由 `resources` 控制）

入口层只保留“解析配置 + 组装注册 + 启动服务”，便于后续继续拆分到独立模块。

## 第五轮改造（蓝图服务下沉）

页面蓝图逻辑已从 `src/index.ts` 下沉到 `src/services/blueprint.ts`，包括：

- 布局推断（原 `inferLayoutFromDescription`）
- 蓝图文本生成（原 `generatePageBlueprint`）

现在 `index.ts` 仅通过依赖注入方式把上下文传给蓝图服务，进一步减少入口文件复杂度。

## 第六轮改造（配置解析下沉）

功能开关解析逻辑已从 `src/index.ts` 下沉到 `src/config/features.ts`：

- 导出 `resolveFeatureToggles`
- 支持注入原始 feature flags（默认读取 `process.env.MCP_FEATURE_FLAGS`）

这一步让 `index.ts` 更接近纯 wiring 层：只做依赖装配和服务启动。

## 收口改造（入口最小化 + 基础单测补齐）

在后续整合中，进一步完成了以下收口：

- `src/index.ts` 仅保留进程入口与 transport 连接
- 新增 `src/app/create-server.ts` 负责 server 创建与注册装配
- 新增配置/状态能力：
  - `resolveComponentRoot`
  - `createComponentIndexGetter`
- 补充测试：
  - `src/tests/features.test.ts`
  - `src/tests/component-root.test.ts`
  - `src/tests/component-index.test.ts`

当前结构已经比较稳定，后续新增能力建议优先在 `register/*` 或 `services/*` 扩展，避免回流到 `index.ts`。
