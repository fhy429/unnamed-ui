"use client";

import { ChevronDown, CheckCircle2 } from "lucide-react";
import {
  ExecutionResultContainerPrimitive,
  ExecutionResultTitlePrimitive,
  ExecutionResultContentPrimitive,
  ExecutionResultItemPrimitive,
  ExecutionResultItemHeaderPrimitive,
  ExecutionResultItemIconPrimitive,
  ExecutionResultItemTitlePrimitive,
  ExecutionResultItemImagePrimitive,
  ExecutionResultItemToolNamePrimitive,
  ExecutionResultItemContentPrimitive,
  ExecutionResultSectionPrimitive,
  ExecutionResultArrowPrimitive,
} from "@/registry/wuhan/blocks/execution-result/execution-result-01";

export default function ExecutionResultDemo() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4 w-full h-full max-w-2xl">
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
                调用
              </ExecutionResultItemTitlePrimitive>
              <ExecutionResultItemImagePrimitive
                src="https://picsum.photos/16/16"
                alt="Tool icon"
              />
              <ExecutionResultItemToolNamePrimitive>
                search_api
              </ExecutionResultItemToolNamePrimitive>
            </ExecutionResultItemHeaderPrimitive>
            <ExecutionResultItemContentPrimitive>
              <ExecutionResultSectionPrimitive
                title="请求来自 xxx"
                onCopy={() => handleCopy("请求内容内容内容")}
              >
                请求内容内容内容
              </ExecutionResultSectionPrimitive>
              <ExecutionResultSectionPrimitive
                title="响应来自 xxx"
                onCopy={() => handleCopy("响应内容内容内容")}
              >
                响应内容内容内容
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
                调用
              </ExecutionResultItemTitlePrimitive>
              <ExecutionResultItemImagePrimitive
                src="https://picsum.photos/16/16"
                alt="Tool icon"
              />
              <ExecutionResultItemToolNamePrimitive>
                search_api
              </ExecutionResultItemToolNamePrimitive>
            </ExecutionResultItemHeaderPrimitive>
            <ExecutionResultItemContentPrimitive>
              <ExecutionResultSectionPrimitive
                title="请求来自 xxx"
                onCopy={() => handleCopy("请求内容内容内容")}
              >
                请求内容内容内容
              </ExecutionResultSectionPrimitive>
              <ExecutionResultSectionPrimitive
                title="响应来自 xxx"
                onCopy={() => handleCopy("响应内容内容内容")}
              >
                响应内容内容内容
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
                调用
              </ExecutionResultItemTitlePrimitive>
              <ExecutionResultItemImagePrimitive
                src="https://picsum.photos/16/16"
                alt="Tool icon"
              />
              <ExecutionResultItemToolNamePrimitive>
                search_api
              </ExecutionResultItemToolNamePrimitive>
            </ExecutionResultItemHeaderPrimitive>
            <ExecutionResultItemContentPrimitive>
              <ExecutionResultSectionPrimitive
                title="请求来自 xxx"
                onCopy={() => handleCopy("请求内容内容内容")}
              >
                请求内容内容内容
              </ExecutionResultSectionPrimitive>
              <ExecutionResultSectionPrimitive
                title="响应来自 xxx"
                onCopy={() => handleCopy("响应内容内容内容")}
              >
                响应内容内容内容
              </ExecutionResultSectionPrimitive>
            </ExecutionResultItemContentPrimitive>
          </ExecutionResultItemPrimitive>
        </ExecutionResultContentPrimitive>
      </ExecutionResultContainerPrimitive>
    </div>
  );
}
