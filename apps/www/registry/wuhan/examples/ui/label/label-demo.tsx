"use client";

import { Label } from "@/registry/wuhan/ui/label";

export default function LabelDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          type="email"
          placeholder="name@example.com"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
}
