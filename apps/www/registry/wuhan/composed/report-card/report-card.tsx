"use client";

import * as React from "react";
import { Button } from "@/registry/wuhan/ui/button";
import { cn } from "@/lib/utils";
import * as Popover from "@radix-ui/react-popover";
import {
  ReportCardHeaderPrimitive,
  ReportCardContainerPrimitive,
  ReportCardDefaultIcon,
} from "@/registry/wuhan/blocks/report-card/report-card-01";
import { MoreHorizontal, Trash2, Pencil, Copy } from "lucide-react";

// ==================== 类型定义 ====================

/** 报告详情数据（用于预览） */
export interface ReportCardReportData {
  /** 论文分析（markdown） */
  analysis?: string;
  /** 场景分析（markdown） */
  scenario_analysis?: string;
}

/**
 * Report Card Item 类型
 * @public
 */
export interface ReportCardItem {
  /** 唯一标识符 */
  id: string;
  /** 卡片标题（论文标题） */
  title: string;
  /** 描述文本（作者 · 时间） */
  description?: string;
  /** 作者 */
  authors?: string;
  /** 日期（published 格式化） */
  date?: string;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 是否选中 */
  selected?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 报告详情（预览用） */
  reportData?: ReportCardReportData;
  /** Agent id（1-4：音频、PPT、博客、报告），用于区分类型和展示对应图标 */
  agentId?: string;
  /** Agent 标题，用于展示类型标签 */
  agentTitle?: string;
  /** 颜色索引，对应 CARD_STYLES，用于区分类型背景色 */
  colorIndex?: number;
}

/**
 * ReportCard 组件属性
 * @public
 */
export interface ReportCardProps {
  /** 唯一标识（用于列表中的识别和事件回调） */
  id?: string;
  /** 标题 */
  title?: string;
  /** 描述文本（有 authors/date 时优先用） */
  description?: React.ReactNode;
  /** 作者（超出省略号） */
  authors?: string;
  /** 日期（完整显示） */
  date?: string;
  /** 图标 */
  icon?: React.ReactNode;
  /** 宽度 */
  width?: string | number;
  /** 是否显示复选框 */
  showCheckbox?: boolean;
  /** 选中状态 */
  selected?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 选中状态变化回调 */
  onSelectChange?: (selected: boolean, id?: string) => void;
  /** 编辑回调 */
  onEdit?: () => void;
  /** 删除回调 */
  onDelete?: () => void;
  /** 复制回调 */
  onDuplicate?: () => void;
  /** 点击卡片回调（预览） */
  onClick?: () => void;
  /** 自定义右侧操作区域（完全自定义） */
  action?: React.ReactNode;
  /** 是否显示默认操作按钮（仅 action 未提供时生效） */
  showAction?: boolean;
  /** 自定义类名 */
  className?: string;
}

/**
 * ReportCardList 组件属性
 * @public
 */
export interface ReportCardListProps {
  /** 标题 */
  title?: string;
  /** 卡片列表数据 */
  cards?: ReportCardItem[];
  /** 是否显示复选框 */
  showCheckbox?: boolean;
  /** 选中状态变化回调 */
  onSelectChange?: (selected: boolean, id: string) => void;
  /** 编辑回调 */
  onEdit?: (id: string) => void;
  /** 删除回调 */
  onDelete?: (id: string) => void;
  /** 复制回调 */
  onDuplicate?: (id: string) => void;
  /** 点击卡片回调（预览） */
  onCardClick?: (card: ReportCardItem) => void;
  /** 自定义单个卡片右侧操作区域 */
  cardAction?: (item: ReportCardItem) => React.ReactNode;
  /** 是否显示默认操作按钮 */
  showCardAction?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 列表容器自定义类名 */
  listClassName?: string;
  /** 卡片宽度 */
  cardWidth?: string | number;
  /** 根据卡片获取自定义容器类名（如类型背景色） */
  getCardClassName?: (card: ReportCardItem) => string | undefined;
  /** 根据卡片获取自定义图标（如类型图标） */
  getCardIcon?: (card: ReportCardItem) => React.ReactNode | undefined;
}

// ==================== 操作菜单内容 ====================

const CardActionsMenu = ({
  onEdit,
  onDelete,
  onDuplicate,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}) => {
  return (
    <div
      className={cn(
        "min-w-[120px]",
        "rounded-[var(--radius-xl)]",
        "border border-[var(--Border-border-neutral)]",
        "bg-[var(--Container-bg-container)]",
        "shadow-[var(--shadow-basic)]",
        "p-[var(--Padding-padding-com-xs)]",
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col">
        {onEdit && (
          <Button
            variant="unstyled"
            size="unstyled"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            className={cn(
              "flex items-center justify-start gap-[var(--Gap-gap-md)]",
              "w-full",
              "py-[var(--Gap-gap-xs)] px-[var(--Padding-padding-com-md)]",
              "rounded-[var(--radius-lg)]",
              "cursor-pointer",
              "outline-none",
              "text-[var(--Text-text-primary)]",
              "hover:bg-[var(--Container-bg-neutral-light)]",
            )}
          >
            <Pencil className="size-4 text-[var(--Text-text-secondary)]" />
            <span className="font-size-2 leading-[var(--line-height-2)]">
              编辑
            </span>
          </Button>
        )}
        {onDuplicate && (
          <Button
            variant="unstyled"
            size="unstyled"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate?.();
            }}
            className={cn(
              "flex items-center justify-start gap-[var(--Gap-gap-md)]",
              "w-full",
              "py-[var(--Gap-gap-xs)] px-[var(--Padding-padding-com-md)]",
              "rounded-[var(--radius-lg)]",
              "cursor-pointer",
              "outline-none",
              "text-[var(--Text-text-primary)]",
              "hover:bg-[var(--Container-bg-neutral-light)]",
            )}
          >
            <Copy className="size-4 text-[var(--Text-text-secondary)]" />
            <span className="font-size-2 leading-[var(--line-height-2)]">
              复制
            </span>
          </Button>
        )}
        {onDelete && (
          <Button
            variant="unstyled"
            size="unstyled"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            className={cn(
              "flex items-center justify-start gap-[var(--Gap-gap-md)]",
              "w-full",
              "py-[var(--Gap-gap-xs)] px-[var(--Padding-padding-com-md)]",
              "rounded-[var(--radius-lg)]",
              "cursor-pointer",
              "outline-none",
              "text-[var(--Text-text-error)]",
              "hover:bg-[var(--Container-bg-error-light)]",
            )}
          >
            <Trash2 className="size-4 text-[var(--Text-text-error)]" />
            <span className="font-size-2 leading-[var(--line-height-2)]">
              删除
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

// ==================== 主组件：ReportCard ====================

/**
 * ReportCard 组合组件
 * 提供完整的报告卡片功能，包含 hover 操作菜单
 *
 * @example
 * ```tsx
 * <ReportCard
 *   title="候选人评估报告"
 *   description="更新时间：08-04 13:56"
 *   onEdit={() => {...}}
 *   onDelete={() => {...}}
 * />
 * ```
 *
 * @public
 */
export const ReportCard = React.forwardRef<HTMLDivElement, ReportCardProps>(
  (props, ref) => {
    const {
      id,
      title,
      description,
      authors,
      date,
      icon,
      width = "280px",
      showCheckbox = false,
      selected = false,
      disabled = false,
      onSelectChange,
      onEdit,
      onDelete,
      onDuplicate,
      onClick,
      action,
      showAction = true,
      className,
    } = props;
    const [open, setOpen] = React.useState(false);

    // 处理 checkbox 变化
    const handleSelectChange = React.useCallback(
      (checked: boolean) => {
        if (disabled) return;
        onSelectChange?.(checked === true, id);
      },
      [disabled, id, onSelectChange],
    );

    // 判断是否显示默认操作按钮
    const showDefaultAction =
      showAction && !action && (onEdit || onDelete || onDuplicate);

    return (
      <ReportCardContainerPrimitive
        ref={ref}
        selected={selected}
        disabled={disabled}
        className={cn("group/report-card", className)}
        style={{ width }}
        onClick={onClick}
      >
        {/* 左侧：复选框 + 图标 + 标题 + 描述 */}
        <ReportCardHeaderPrimitive
          icon={icon ?? <ReportCardDefaultIcon />}
          title={title}
          description={description}
          authors={authors}
          date={date}
          showCheckbox={showCheckbox}
          selected={selected}
          disabled={disabled}
          onSelectChange={handleSelectChange}
        />

        {/* 右侧：自定义操作区域 或 默认操作按钮 */}
        {action ? (
          <div onClick={(e) => e.stopPropagation()}>{action}</div>
        ) : showDefaultAction ? (
          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <div
                role="button"
                onClick={(e) => e.stopPropagation()}
                tabIndex={disabled ? -1 : 0}
                aria-label="更多操作"
                aria-disabled={disabled}
                className={cn(
                  "w-6 h-6",
                  "flex items-center justify-center",
                  "rounded-[var(--radius-md)]",
                  "p-[var(--Gap-gap-xs)]",
                  "transition-all duration-200",
                  "flex-shrink-0",
                  "opacity-0",
                  "group-hover/report-card:opacity-100",
                  open && "opacity-100",
                  open && "bg-[var(--Container-bg-neutral-light-hover)]",
                  "hover:bg-[var(--Container-bg-neutral-light-hover)]",
                  disabled && "cursor-not-allowed opacity-50",
                  !disabled &&
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                  "cursor-pointer",
                )}
                onKeyDown={(e) => {
                  if (disabled) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen((prev) => !prev);
                  }
                }}
              >
                <MoreHorizontal className="size-4 text-[var(--Text-text-secondary)]" />
              </div>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                side="bottom"
                align="end"
                sideOffset={8}
                className={cn("z-50")}
              >
                <CardActionsMenu
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onDuplicate={onDuplicate}
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        ) : null}
      </ReportCardContainerPrimitive>
    );
  },
);
ReportCard.displayName = "ReportCard";

// ==================== ReportCardList 组件 ====================

/**
 * ReportCardList 组件
 * 展示多个报告卡片列表
 *
 * @public
 */
export const ReportCardList = React.forwardRef<
  HTMLDivElement,
  ReportCardListProps
>((props, ref) => {
  const {
    cards = [],
    showCheckbox = false,
    onSelectChange,
    onEdit,
    onDelete,
    onDuplicate,
    onCardClick,
    cardAction,
    showCardAction,
    getCardClassName,
    getCardIcon,
    className,
    listClassName,
    cardWidth,
  } = props;

  const handleSelectChange = React.useCallback(
    (selected: boolean, id?: string) => {
      onSelectChange?.(selected, id ?? "");
    },
    [onSelectChange],
  );

  return (
    <div ref={ref} className={className}>
      <div
        className={cn("flex flex-col gap-[var(--Gap-gap-md)]", listClassName)}
      >
        {cards.map((card) => (
          <ReportCard
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            authors={card.authors}
            date={card.date}
            icon={getCardIcon?.(card) ?? card.icon}
            showCheckbox={showCheckbox}
            selected={card.selected}
            disabled={card.disabled}
            action={cardAction?.(card)}
            showAction={showCardAction}
            onClick={onCardClick ? () => onCardClick(card) : undefined}
            onSelectChange={handleSelectChange}
            onEdit={onEdit ? () => onEdit(card.id) : undefined}
            onDelete={onDelete ? () => onDelete(card.id) : undefined}
            onDuplicate={onDuplicate ? () => onDuplicate(card.id) : undefined}
            width={cardWidth}
            className={cn(getCardClassName?.(card))}
          />
        ))}
      </div>
    </div>
  );
});
ReportCardList.displayName = "ReportCardList";
