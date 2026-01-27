"use client";

import {
  UserMessage,
  AIMessage,
} from "@/registry/wuhan/blocks/message/message-01";
import {
  AttachmentCard,
  AttachmentCardContent,
  AttachmentCardLeading,
  AttachmentCardMeta,
  AttachmentCardTitle,
} from "@/registry/wuhan/blocks/attachment-list/attachment-list-01";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MessageWithAttachment() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* AI 消息：带附件的消息 */}
      <div className="flex justify-start w-full">
        <div className="w-fit max-w-full flex flex-col gap-2">
          <AIMessage>这是 AI 消息</AIMessage>
        </div>
      </div>

      {/* 用户消息：带附件的消息 */}
      <div className="flex justify-end w-full">
        <div className="w-fit max-w-full flex flex-col gap-2">
          <AttachmentCard
            variant="outline"
            size="sm"
            className={cn(
              "h-14",
              "flex items-center",
              "max-w-[200px] px-[var(--padding-com-md)] gap-[var(--gap-sm)]",
            )}
            onClick={() => {}}
          >
            <AttachmentCardLeading className="rounded-lg bg-[var(--bg-container)] w-10 h-10">
              <FileText className="size-4" />
            </AttachmentCardLeading>
            <AttachmentCardContent>
              <AttachmentCardTitle title="文件名称.pdf">
                文件名称.pdf
              </AttachmentCardTitle>
              <AttachmentCardMeta>PDF·14kb</AttachmentCardMeta>
            </AttachmentCardContent>
          </AttachmentCard>
          <UserMessage>这是用户消息，上方有附件</UserMessage>
        </div>
      </div>
    </div>
  );
}
