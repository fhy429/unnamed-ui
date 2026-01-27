"use client";

import { Checkbox } from "@/registry/wuhan/ui/checkbox";
import { Label } from "@/registry/wuhan/ui/label";

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex items-center gap-3">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="terms-2" defaultChecked />
        <Label htmlFor="terms-2">Accept terms and conditions (checked)</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="terms-3" disabled />
        <Label htmlFor="terms-3">Disabled checkbox</Label>
      </div>
    </div>
  );
}
