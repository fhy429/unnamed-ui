"use client";

import { AspectRatio } from "@/registry/wuhan/ui/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-sm">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
        <div className="flex items-center justify-center h-full">
          <span className="text-2xl font-semibold">16:9</span>
        </div>
      </AspectRatio>
    </div>
  );
}
