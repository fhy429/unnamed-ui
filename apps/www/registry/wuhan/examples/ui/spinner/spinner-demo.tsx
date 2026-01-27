"use client";

import { Spinner } from "@/registry/wuhan/ui/spinner";

export default function SpinnerDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4">
        <Spinner className="size-4" />
        <span className="text-sm">Loading...</span>
      </div>
      <div className="flex items-center gap-4">
        <Spinner className="size-6" />
        <span className="text-sm">Processing</span>
      </div>
      <div className="flex items-center gap-4">
        <Spinner className="size-8" />
        <span className="text-sm">Please wait</span>
      </div>
    </div>
  );
}
