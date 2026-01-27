"use client";

import { Input } from "@/registry/wuhan/ui/input";

export default function InputDemo() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <Input placeholder="Enter your email" type="email" />
      <Input placeholder="Enter your password" type="password" />
      <Input placeholder="Disabled input" disabled />
    </div>
  );
}
