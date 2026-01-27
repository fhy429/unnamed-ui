"use client";

import { ChevronDown, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import {
  ExecutionResultContainerPrimitive,
  ExecutionResultTitlePrimitive,
  ExecutionResultContentPrimitive,
  ExecutionResultItemPrimitive,
  ExecutionResultItemHeaderPrimitive,
  ExecutionResultItemIconPrimitive,
  ExecutionResultItemTitlePrimitive,
  ExecutionResultItemContentPrimitive,
  ExecutionResultSectionPrimitive,
  ExecutionResultArrowPrimitive,
} from "@/registry/wuhan/blocks/execution-result/execution-result-01";

export default function ExecutionResultDefault() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4 w-full h-full max-w-2xl">
      {/* 成功状态 */}
      <ExecutionResultContainerPrimitive defaultOpen>
        <ExecutionResultTitlePrimitive
          arrow={
            <ExecutionResultArrowPrimitive>
              <ChevronDown className="size-4" />
            </ExecutionResultArrowPrimitive>
          }
        >
          已执行完成，调用3个组件
        </ExecutionResultTitlePrimitive>

        <ExecutionResultContentPrimitive>
          <ExecutionResultItemPrimitive>
            <ExecutionResultItemHeaderPrimitive
              arrow={
                <ExecutionResultArrowPrimitive>
                  <ChevronDown className="size-4" />
                </ExecutionResultArrowPrimitive>
              }
            >
              <ExecutionResultItemIconPrimitive>
                <CheckCircle2 className="size-4 text-[var(--text-success)]" />
              </ExecutionResultItemIconPrimitive>
              <ExecutionResultItemTitlePrimitive>
                思考完成
              </ExecutionResultItemTitlePrimitive>
            </ExecutionResultItemHeaderPrimitive>
            <ExecutionResultItemContentPrimitive>
              <ExecutionResultSectionPrimitive showCopyIcon={false}>
                用户想要了解AI发展的趋势，这是一个比较开放的问题，需要从多个维度来概括当前的主要方向。考虑到用户可能不是专业人士，应该用清晰的结构和易懂的语言来组织信息。
              </ExecutionResultSectionPrimitive>
            </ExecutionResultItemContentPrimitive>
          </ExecutionResultItemPrimitive>
          <ExecutionResultItemPrimitive defaultOpen>
            <ExecutionResultItemHeaderPrimitive
              arrow={
                <ExecutionResultArrowPrimitive>
                  <ChevronDown className="size-4" />
                </ExecutionResultArrowPrimitive>
              }
            >
              <ExecutionResultItemIconPrimitive>
                <CheckCircle2 className="size-4 text-[var(--text-success)]" />
              </ExecutionResultItemIconPrimitive>
              <ExecutionResultItemTitlePrimitive>
                调用成功 search_api
              </ExecutionResultItemTitlePrimitive>
            </ExecutionResultItemHeaderPrimitive>
            <ExecutionResultItemContentPrimitive>
              <ExecutionResultSectionPrimitive
                title="请求来自 user"
                onCopy={() =>
                  handleCopy(
                    JSON.stringify({ query: "搜索关键词", limit: 10 }, null, 2),
                  )
                }
              >
                {JSON.stringify({ query: "搜索关键词", limit: 10 }, null, 2)}
              </ExecutionResultSectionPrimitive>
              <ExecutionResultSectionPrimitive
                title="响应来自 search_api"
                onCopy={() =>
                  handleCopy(
                    JSON.stringify(
                      { results: ["结果1", "结果2", "结果3"] },
                      null,
                      2,
                    ),
                  )
                }
              >
                {JSON.stringify(
                  { results: ["结果1", "结果2", "结果3"] },
                  null,
                  2,
                )}
              </ExecutionResultSectionPrimitive>
            </ExecutionResultItemContentPrimitive>
          </ExecutionResultItemPrimitive>

          <ExecutionResultItemPrimitive>
            <ExecutionResultItemHeaderPrimitive
              arrow={
                <ExecutionResultArrowPrimitive>
                  <ChevronDown className="size-4" />
                </ExecutionResultArrowPrimitive>
              }
            >
              <ExecutionResultItemIconPrimitive>
                <CheckCircle2 className="size-4 text-[var(--text-success)]" />
              </ExecutionResultItemIconPrimitive>
              <ExecutionResultItemTitlePrimitive>
                调用成功 image_generator
              </ExecutionResultItemTitlePrimitive>
            </ExecutionResultItemHeaderPrimitive>
            <ExecutionResultItemContentPrimitive>
              <ExecutionResultSectionPrimitive
                title="请求来自 user"
                onCopy={() =>
                  handleCopy(
                    JSON.stringify(
                      { prompt: "生成一张图片", style: "realistic" },
                      null,
                      2,
                    ),
                  )
                }
              >
                {JSON.stringify(
                  { prompt: "生成一张图片", style: "realistic" },
                  null,
                  2,
                )}
              </ExecutionResultSectionPrimitive>
              <ExecutionResultSectionPrimitive
                title="响应来自 image_generator"
                onCopy={() =>
                  handleCopy(
                    JSON.stringify(
                      { image_url: "https://example.com/image.png" },
                      null,
                      2,
                    ),
                  )
                }
              >
                {JSON.stringify(
                  { image_url: "https://example.com/image.png" },
                  null,
                  2,
                )}
              </ExecutionResultSectionPrimitive>
            </ExecutionResultItemContentPrimitive>
          </ExecutionResultItemPrimitive>
        </ExecutionResultContentPrimitive>
      </ExecutionResultContainerPrimitive>

      {/* 失败状态 */}
      <ExecutionResultContainerPrimitive defaultOpen>
        <ExecutionResultTitlePrimitive
          arrow={
            <ExecutionResultArrowPrimitive>
              <ChevronDown className="size-4" />
            </ExecutionResultArrowPrimitive>
          }
        >
          执行失败，调用2个组件
        </ExecutionResultTitlePrimitive>

        <ExecutionResultContentPrimitive>
          <ExecutionResultItemPrimitive>
            <ExecutionResultItemHeaderPrimitive
              arrow={
                <ExecutionResultArrowPrimitive>
                  <ChevronDown className="size-4" />
                </ExecutionResultArrowPrimitive>
              }
            >
              <ExecutionResultItemIconPrimitive>
                <XCircle className="size-4 text-[var(--text-error)]" />
              </ExecutionResultItemIconPrimitive>
              <ExecutionResultItemTitlePrimitive>
                调用失败 api_error
              </ExecutionResultItemTitlePrimitive>
            </ExecutionResultItemHeaderPrimitive>
            <ExecutionResultItemContentPrimitive>
              <ExecutionResultSectionPrimitive
                title="请求来自 user"
                onCopy={() =>
                  handleCopy(JSON.stringify({ action: "fetch_data" }, null, 2))
                }
              >
                {JSON.stringify({ action: "fetch_data" }, null, 2)}
              </ExecutionResultSectionPrimitive>
              <ExecutionResultSectionPrimitive
                title="错误信息"
                onCopy={() => handleCopy("API 请求超时")}
              >
                API 请求超时
              </ExecutionResultSectionPrimitive>
            </ExecutionResultItemContentPrimitive>
          </ExecutionResultItemPrimitive>
        </ExecutionResultContentPrimitive>
      </ExecutionResultContainerPrimitive>

      {/* 进行中状态 */}
      <ExecutionResultContainerPrimitive defaultOpen>
        <ExecutionResultTitlePrimitive
          arrow={
            <ExecutionResultArrowPrimitive>
              <ChevronDown className="size-4" />
            </ExecutionResultArrowPrimitive>
          }
        >
          执行中，调用2个组件
        </ExecutionResultTitlePrimitive>

        <ExecutionResultContentPrimitive>
          <ExecutionResultItemPrimitive>
            <ExecutionResultItemHeaderPrimitive
              arrow={
                <ExecutionResultArrowPrimitive>
                  <ChevronDown className="size-4" />
                </ExecutionResultArrowPrimitive>
              }
            >
              <ExecutionResultItemIconPrimitive>
                <Loader2 className="size-4 text-[var(--text-brand)] animate-spin" />
              </ExecutionResultItemIconPrimitive>
              <ExecutionResultItemTitlePrimitive>
                调用中 process_data
              </ExecutionResultItemTitlePrimitive>
            </ExecutionResultItemHeaderPrimitive>
            <ExecutionResultItemContentPrimitive>
              <ExecutionResultSectionPrimitive
                title="请求来自 user"
                onCopy={() =>
                  handleCopy(JSON.stringify({ data: "处理中..." }, null, 2))
                }
              >
                {JSON.stringify({ data: "处理中..." }, null, 2)}
              </ExecutionResultSectionPrimitive>
            </ExecutionResultItemContentPrimitive>
          </ExecutionResultItemPrimitive>
          <ExecutionResultItemPrimitive>
            <ExecutionResultItemHeaderPrimitive
              arrow={
                <ExecutionResultArrowPrimitive>
                  <ChevronDown className="size-4" />
                </ExecutionResultArrowPrimitive>
              }
            >
              <ExecutionResultItemIconPrimitive>
                <Loader2 className="size-4 text-[var(--text-brand)] animate-spin" />
              </ExecutionResultItemIconPrimitive>
              <ExecutionResultItemTitlePrimitive>
                思考中
              </ExecutionResultItemTitlePrimitive>
            </ExecutionResultItemHeaderPrimitive>
            <ExecutionResultItemContentPrimitive>
              <ExecutionResultSectionPrimitive showCopyIcon={false}>
                用户想要了解AI发展的趋势，这是一个比较开放的问题，需要从多个维度来概括当前的主要方向。考虑到用户可能不是专业人士，应该用清晰的结构和易懂的语言来组织信息。
              </ExecutionResultSectionPrimitive>
            </ExecutionResultItemContentPrimitive>
          </ExecutionResultItemPrimitive>
        </ExecutionResultContentPrimitive>
      </ExecutionResultContainerPrimitive>
    </div>
  );
}
