# UI 组件示例和文档创建计划

## 当前状态
- **总组件数**: 54 个 UI 组件
- **已有示例**: 54 个 ✅
- **待创建**: 0 个组件的示例和文档 ✅

## 示例文件结构
每个组件需要：
1. **示例文件**: `examples/ui/{component-name}/{component-name}-demo.tsx`
2. **注册条目**: 在 `_registry.ts` 中添加示例注册
3. **文档**: 可选，可以创建 README 或单独的文档文件

## 分批计划

### 第一批：核心基础组件（优先级：高）
**目标**: 最常用、最基础的组件，无复杂依赖
**预计时间**: 1-2 天
**组件列表** (15个):

1. ✅ **button** - 已有示例
2. ✅ **textarea** - 已有示例
3. ✅ **input** - 输入框，基础表单组件
4. ✅ **label** - 标签，表单必需
5. ✅ **badge** - 徽章，常用展示组件
6. ✅ **avatar** - 头像，用户展示
7. ✅ **separator** - 分隔线，布局常用
8. ✅ **skeleton** - 骨架屏，加载状态
9. ✅ **spinner** - 加载动画
10. ✅ **kbd** - 键盘快捷键显示
11. ✅ **empty** - 空状态展示
12. ✅ **alert** - 警告提示
13. ✅ **card** - 卡片容器
14. ✅ **tabs** - 标签页
15. ✅ **tooltip** - 工具提示

### 第二批：表单和交互组件（优先级：高）
**目标**: 表单相关和常用交互组件
**预计时间**: 2-3 天
**组件列表** (15个):

16. ⬜ **checkbox** - 复选框
17. ⬜ **radio-group** - 单选组
18. ⬜ **switch** - 开关
19. ⬜ **select** - 选择器
20. ⬜ **native-select** - 原生选择器
21. ⬜ **input-group** - 输入组（依赖 input, button, textarea）
22. ⬜ **input-otp** - OTP 输入
23. ⬜ **field** - 表单字段（依赖 label, separator）
24. ⬜ **slider** - 滑块
25. ⬜ **progress** - 进度条
26. ⬜ **toggle** - 切换按钮
27. ⬜ **toggle-group** - 切换组（依赖 toggle）
28. ⬜ **button-group** - 按钮组（依赖 separator）
29. ⬜ **form** - 表单（可能需要特殊处理）
30. ⬜ **collapsible** - 可折叠内容

### 第三批：弹窗和导航组件（优先级：中）
**目标**: 弹窗、菜单、导航相关组件
**预计时间**: 2-3 天
**组件列表** (15个):

31. ⬜ **dialog** - 对话框（依赖 button）
32. ⬜ **alert-dialog** - 警告对话框（依赖 button）
33. ⬜ **sheet** - 侧边栏面板（依赖 button）
34. ⬜ **drawer** - 抽屉（依赖 vaul）
35. ⬜ **popover** - 弹出框
36. ⬜ **hover-card** - 悬停卡片
37. ⬜ **dropdown-menu** - 下拉菜单
38. ⬜ **context-menu** - 上下文菜单
39. ⬜ **menubar** - 菜单栏
40. ⬜ **navigation-menu** - 导航菜单
41. ⬜ **command** - 命令面板（依赖 dialog, input-group）
42. ⬜ **combobox** - 组合框（依赖 button, input-group）
43. ⬜ **breadcrumb** - 面包屑导航
44. ⬜ **pagination** - 分页（依赖 button）
45. ⬜ **sidebar** - 侧边栏（依赖多个组件，复杂）

### 第四批：展示和特殊组件（优先级：中低）
**目标**: 展示类组件和特殊用途组件
**预计时间**: 2-3 天
**组件列表** (17个):

46. ⬜ **accordion** - 手风琴
47. ⬜ **table** - 表格
48. ⬜ **carousel** - 轮播图（依赖 button, embla-carousel-react）
49. ⬜ **chart** - 图表（依赖 recharts）
50. ⬜ **calendar** - 日历（依赖 react-day-picker, date-fns, button）
51. ⬜ **aspect-ratio** - 宽高比
52. ⬜ **scroll-area** - 滚动区域
53. ⬜ **resizable** - 可调整大小（依赖 react-resizable-panels）
54. ⬜ **sonner** - Toast 通知（依赖 sonner, next-themes）
55. ⬜ **item** - 列表项（依赖 separator）

### 第五批：复杂和特殊组件（优先级：低）
**目标**: 复杂组件或需要特殊处理的组件
**预计时间**: 1-2 天
**组件列表** (5个):

56. ⬜ **form** - 表单（如果之前未完成，可能需要特殊处理）
57. ⬜ **sidebar** - 侧边栏（如果第三批未完成，这个比较复杂）
58. ⬜ **chart** - 图表（如果第四批未完成）
59. ⬜ **calendar** - 日历（如果第四批未完成）
60. ⬜ **command** - 命令面板（如果第三批未完成）

## 示例文件模板

### 基础示例模板
```tsx
"use client";

import { ComponentName } from "@/registry/wuhan/ui/component-name";

export default function ComponentNameDemo() {
  return (
    <div className="flex flex-col gap-4">
      {/* 基础用法 */}
      <ComponentName>Content</ComponentName>
    </div>
  );
}
```

### 多示例变体模板
对于复杂组件，可以创建多个示例文件：
- `{component}-demo.tsx` - 主示例
- `{component}-basic.tsx` - 基础用法
- `{component}-variants.tsx` - 变体示例
- `{component}-advanced.tsx` - 高级用法

## 文档结构建议

每个组件可以包含：
1. **组件描述** - 用途和场景
2. **基础用法** - 最简单的使用示例
3. **API 文档** - Props 说明
4. **变体示例** - 不同配置的示例
5. **最佳实践** - 使用建议

## 实施建议

1. **按批次进行**：每完成一批，测试和验证
2. **统一格式**：保持示例代码风格一致
3. **依赖管理**：注意组件间的依赖关系
4. **文档同步**：创建示例时同步更新文档
5. **测试验证**：每个示例都要确保可以正常运行

## 优先级说明

- **高优先级**: 最常用的组件，应该优先完成
- **中优先级**: 常用但稍复杂，或依赖较多
- **低优先级**: 特殊用途或非常复杂的组件

## 注意事项

1. 某些组件有外部依赖（如 `vaul`, `recharts`, `embla-carousel-react`），需要确保依赖已安装
2. `form` 组件可能需要特殊处理，因为它可能是一个复合组件
3. `sidebar` 组件依赖很多其他组件，需要最后处理
4. 某些组件（如 `chart`, `calendar`）可能需要多个示例来展示不同用法

## 进度跟踪

### 第一批：核心基础组件 ✅ 完成
- [x] button
- [x] textarea
- [x] input
- [x] label
- [x] badge
- [x] avatar
- [x] separator
- [x] skeleton
- [x] spinner
- [x] kbd
- [x] empty
- [x] alert
- [x] card
- [x] tabs
- [x] tooltip

### 第二批：表单和交互组件 ✅ 完成
- [x] checkbox
- [x] radio-group
- [x] switch
- [x] select
- [x] native-select
- [x] input-group
- [x] input-otp
- [x] field
- [x] slider
- [x] progress
- [x] toggle
- [x] toggle-group
- [x] button-group
- [x] collapsible
- [ ] form (可能需要特殊处理，暂缓)

### 第三批：弹窗和导航组件 ✅ 完成（14个）
- [x] dialog
- [x] alert-dialog
- [x] sheet
- [x] drawer
- [x] popover
- [x] hover-card
- [x] dropdown-menu
- [x] context-menu
- [x] menubar
- [x] navigation-menu
- [x] command
- [x] combobox
- [x] breadcrumb
- [x] pagination
- [ ] sidebar (复杂组件，暂缓)

### 第四批：展示和特殊组件 ✅ 完成（10个）
- [x] accordion
- [x] table
- [x] carousel
- [x] chart
- [x] calendar
- [x] aspect-ratio
- [x] scroll-area
- [x] resizable
- [x] sonner
- [x] item

### 第五批：剩余组件 ✅ 完成（1个）
- [x] sidebar

**已完成**: 54/54 个组件 (100%) ✅
**待完成**: 0 个组件

## 总结

所有 UI 组件的示例和文档已全部完成！

- ✅ 54 个组件的示例文件已创建
- ✅ 54 个组件的文档文件已创建
- ✅ 所有示例已在 `_registry.ts` 中注册
- ✅ 所有文件已通过 lint 检查

### 组件分类统计

- **基础组件**: 15 个 ✅
- **表单和交互组件**: 14 个 ✅
- **弹窗和导航组件**: 14 个 ✅
- **展示和特殊组件**: 10 个 ✅
- **剩余组件**: 1 个 ✅

**注意**: form 组件不存在于 UI 组件库中，可能是一个复合组件或使用 react-hook-form 等库实现。

