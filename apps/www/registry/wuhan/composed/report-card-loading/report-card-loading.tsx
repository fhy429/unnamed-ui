"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import "./report-card-loading.css";

// ==================== 类型定义 ====================

export interface ReportCardLoadingProps {
  /** Agent 标题（显示「正在生成 xxx...」） */
  agentTitle: string;
  /** 背景色（如 #E2F8EC） */
  bgColor: string;
  /** 图标/强调色（如 #059669） */
  iconColor: string;
  /** 宽度 */
  width?: string | number;
  /** 自定义类名 */
  className?: string;
}

// ==================== 主组件 ====================

/**
 * ReportCard 加载态
 * 闪烁渐变背景 + 旋转 loading 图标，颜色与对应 AgentCard 一致
 */
export const ReportCardLoading = React.forwardRef<
  HTMLDivElement,
  ReportCardLoadingProps
>(({ agentTitle, bgColor, iconColor, width = "100%", className }, ref) => {
  return (
    <div
      ref={ref}
      role="status"
      aria-label={`正在生成 ${agentTitle}`}
      className={cn(
        "w-full flex flex-row items-center justify-between gap-[var(--Gap-gap-lg)]",
        "p-[var(--Padding-padding-com-lg)]",
        "rounded-[var(--radius-xl)]",
        "border border-[var(--Border-border-neutral)]",
        "relative overflow-hidden",
        className,
      )}
      style={{
        width,
        backgroundColor: bgColor,
      }}
    >
      {/* 渐变闪烁遮罩 */}
      <div className="report-card-loading-shimmer absolute inset-0 pointer-events-none rounded-[var(--radius-xl)]" />
      {/* 内容区 */}
      <div className="flex flex-row items-center gap-[var(--Gap-gap-md)] min-w-0 flex-1 relative z-10">
        <Loader2
          className="size-5 flex-shrink-0 animate-spin"
          style={{ color: iconColor }}
        />
        <div className="flex flex-col gap-[var(--Gap-gap-xs)] min-w-0">
          <span
            className={cn(
              "font-[var(--font-family-CN)] font-[var(--font-weight-400)] font-size-2",
              "leading-[var(--line-height-2)] truncate",
            )}
            style={{ color: iconColor }}
          >
            正在生成 {agentTitle}...
          </span>
          <span
            className={cn(
              "font-[var(--font-family-CN)] font-[var(--font-weight-400)] font-size-1",
              "leading-[var(--line-height-1)] text-[var(--Text-text-tertiary)]",
            )}
          >
            请稍候
          </span>
        </div>
      </div>
    </div>
  );
});
ReportCardLoading.displayName = "ReportCardLoading";
