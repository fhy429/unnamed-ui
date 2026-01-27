"use client";

import { Toggle } from "@/registry/wuhan/ui/toggle";
import { BookmarkIcon } from "lucide-react";

export default function ToggleDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
        <BookmarkIcon className="group-data-[state=on]/toggle:fill-foreground" />
        Bookmark
      </Toggle>
      <Toggle aria-label="Toggle bold" variant="default">
        Bold
      </Toggle>
      <Toggle aria-label="Toggle italic" variant="outline" disabled>
        Italic
      </Toggle>
    </div>
  );
}
