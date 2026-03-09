"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  CheckboxRootPrimitive,
  CheckboxIndicatorPrimitive,
} from "@/registry/wuhan/blocks/checkbox/checkbox-01";
import { Tooltip } from "@/registry/wuhan/composed/tooltip/tooltip";

// ==================== 类型定义 ====================

/**
 * Report Card 容器原语属性
 * @public
 */
interface ReportCardContainerPrimitiveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** 是否选中 */
  selected?: boolean;
  /** 是否禁用（禁用时不可交互） */
  disabled?: boolean;
}

/**
 * Report Card 头部原语属性
 * @public
 */
interface ReportCardHeaderPrimitiveProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 描述文本（作者 · 时间 时使用 authors 和 date 更佳） */
  description?: React.ReactNode;
  /** 作者（超出省略号） */
  authors?: string;
  /** 日期（完整显示） */
  date?: string;
  /** 是否显示复选框 */
  showCheckbox?: boolean;
  /** 选中状态 */
  selected?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 选中状态变化回调 */
  onSelectChange?: (selected: boolean) => void;
}

/**
 * Report Card 完整原语属性
 * @public
 */
interface ReportCardPrimitiveProps {
  /** 唯一标识（必填，用于列表中的识别和事件回调） */
  id?: string;
  /** 标题 */
  title?: React.ReactNode;
  /** 描述文本 */
  description?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 选中状态 */
  selected?: boolean;
  /** 是否禁用（禁用时不可交互） */
  disabled?: boolean;
  /** 选中状态变化回调 */
  onSelectChange?: (selected: boolean, id?: string) => void;
  /** 容器点击回调 */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== 原语组件 ====================

/**
 * Report Card 容器原语
 * @public
 */
export const ReportCardContainerPrimitive = React.forwardRef<
  HTMLDivElement,
  ReportCardContainerPrimitiveProps
>(({ children, selected, disabled = false, className, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 禁用状态下不触发点击
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    props.onClick?.(e);
  };

  return (
    <div
      ref={ref}
      role="listitem"
      aria-selected={selected}
      aria-disabled={disabled}
      className={cn(
        "w-full min-w-0",
        "flex flex-row",
        "items-center",
        "justify-between",
        "gap-[var(--Gap-gap-lg)]",
        "overflow-hidden",
        "p-[var(--Padding-padding-com-lg)]",
        "rounded-[var(--radius-xl)]",
        "bg-[var(--Container-bg-container)]",
        "border border-[var(--Border-border-neutral)]",
        "transition-all",
        "duration-200",
        // 交互状态
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        // hover 状态（非禁用）
        !disabled && "hover:bg-[var(--Container-bg-neutral-light)]",
        // 焦点状态（非禁用）
        !disabled &&
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
        // 分组，用于子元素 hover 状态
        "group",
        className,
      )}
      onClick={handleClick}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.currentTarget.click();
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
});
ReportCardContainerPrimitive.displayName = "ReportCardContainerPrimitive";

/**
 * Report Card 头部原语
 * @public
 */
export const ReportCardHeaderPrimitive = React.forwardRef<
  HTMLDivElement,
  ReportCardHeaderPrimitiveProps
>(
  (
    {
      title,
      icon,
      description,
      authors,
      date,
      showCheckbox,
      selected = false,
      disabled = false,
      onSelectChange,
      className,
      ...props
    },
    ref,
  ) => {
    const handleCheckboxChange = React.useCallback(
      (checked: boolean) => {
        if (disabled) return;
        onSelectChange?.(checked === true);
      },
      [disabled, onSelectChange],
    );

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row items-center gap-[var(--Gap-gap-md)] min-w-0 flex-1",
          className,
        )}
        {...props}
      >
        {/* 复选框 */}
        {showCheckbox && (
          <div
            role="checkbox"
            aria-checked={selected}
            aria-disabled={disabled}
            className={cn(
              "flex-shrink-0",
              disabled && "cursor-not-allowed opacity-50",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <CheckboxRootPrimitive
              checked={selected}
              disabled={disabled}
              onCheckedChange={handleCheckboxChange}
            >
              <CheckboxIndicatorPrimitive />
            </CheckboxRootPrimitive>
          </div>
        )}

        <div className="flex flex-col gap-[var(--Gap-gap-xs)] min-w-0 overflow-hidden">
          {/* 图标 + 标题（水平排列） */}
          <div className="flex items-center gap-[var(--Gap-gap-md)] min-w-0 overflow-hidden">
            {/* 图标 */}
            {icon && (
              <span className="flex-shrink-0 [&_svg]:size-4">
                {React.isValidElement(icon)
                  ? React.cloneElement(
                      icon as React.ReactElement<{ size?: number }>,
                      { size: 16 },
                    )
                  : icon}
              </span>
            )}
            {/* 标题区 */}
            <div className="flex flex-col gap-[var(--Gap-gap-xs)] min-w-0 overflow-hidden">
              {title && (
                <Tooltip
                  content={title}
                  side="top"
                  align="start"
                  contentClassName="text-left"
                >
                  <span
                    className={cn(
                      "font-[var(--font-family-EN)]",
                      "font-[var(--font-weight-400)]",
                      "font-size-2",
                      "leading-[var(--line-height-2)]",
                      "text-[var(--Text-text-primary)]",
                      "truncate min-w-0",
                      "[overflow-wrap:anywhere]",
                    )}
                  >
                    {title}
                  </span>
                </Tooltip>
              )}
            </div>
          </div>

          {/* 描述：作者（省略号）+ 日期（完整）或纯 description */}
          {authors != null || date != null ? (
            <div className="flex items-center gap-1 min-w-0 overflow-hidden">
              {authors != null && (
                <Tooltip
                  content={authors}
                  side="top"
                  align="start"
                  contentClassName="text-left"
                >
                  <span
                    className={cn(
                      "font-[var(--font-family-CN)]",
                      "font-[var(--font-weight-400)]",
                      "font-size-1",
                      "leading-[var(--line-height-1)]",
                      "text-[var(--Text-text-tertiary)]",
                      "truncate min-w-0",
                      "[overflow-wrap:anywhere]",
                    )}
                  >
                    {authors}
                  </span>
                </Tooltip>
              )}
              {date != null && (
                <span
                  className={cn(
                    "font-[var(--font-family-CN)]",
                    "font-[var(--font-weight-400)]",
                    "font-size-1",
                    "leading-[var(--line-height-1)]",
                    "text-[var(--Text-text-tertiary)]",
                    "flex-shrink-0",
                  )}
                >
                  {authors != null ? ` · ${date}` : date}
                </span>
              )}
            </div>
          ) : description ? (
            <Tooltip
              content={description}
              side="top"
              align="start"
              contentClassName="text-left"
            >
              <span
                className={cn(
                  "font-[var(--font-family-CN)]",
                  "font-[var(--font-weight-400)]",
                  "font-size-1",
                  "leading-[var(--line-height-1)]",
                  "text-[var(--Text-text-tertiary)]",
                  "truncate",
                )}
              >
                {description}
              </span>
            </Tooltip>
          ) : null}
        </div>
      </div>
    );
  },
);
ReportCardHeaderPrimitive.displayName = "ReportCardHeaderPrimitive";

// ==================== 默认图标 ====================

/**
 * 默认报告图标
 * @public
 */
export const ReportCardDefaultIcon = ({
  className,
  size = 16,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>
);

// ==================== 完整 ReportCard 原语 ====================

/**
 * Report Card 完整原语
 * @public
 */
export const ReportCardPrimitive = React.forwardRef<
  HTMLDivElement,
  ReportCardPrimitiveProps
>(
  (
    {
      id,
      title,
      description,
      icon,
      selected = false,
      disabled = false,
      onSelectChange,
      className,
      style,
      onClick,
      ...props
    },
    ref,
  ) => {
    const handleCheckboxChange = React.useCallback(
      (checked: boolean) => {
        if (disabled) return;
        onSelectChange?.(checked === true, id);
      },
      [disabled, id, onSelectChange],
    );

    const handleContainerClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        onClick?.(e);
      },
      [disabled, onClick],
    );

    return (
      <ReportCardContainerPrimitive
        ref={ref}
        selected={selected}
        disabled={disabled}
        className={cn("group/report-card", className)}
        style={style}
        onClick={handleContainerClick}
        {...props}
      >
        {/* 左侧：复选框 + 图标 + 标题 + 描述 */}
        <ReportCardHeaderPrimitive
          icon={icon ?? <ReportCardDefaultIcon />}
          title={title}
          description={description}
          showCheckbox={true}
          selected={selected}
          disabled={disabled}
          onSelectChange={handleCheckboxChange}
        />
      </ReportCardContainerPrimitive>
    );
  },
);
ReportCardPrimitive.displayName = "ReportCardPrimitive";

// ==================== 类型导出 ====================

export type {
  ReportCardContainerPrimitiveProps,
  ReportCardHeaderPrimitiveProps,
  ReportCardPrimitiveProps,
};
