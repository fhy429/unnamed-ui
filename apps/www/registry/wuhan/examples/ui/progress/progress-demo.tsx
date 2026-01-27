"use client";

import * as React from "react";
import { Progress } from "@/registry/wuhan/ui/progress";

export default function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <Progress value={progress} />
      <Progress value={33} />
      <Progress value={100} />
    </div>
  );
}
