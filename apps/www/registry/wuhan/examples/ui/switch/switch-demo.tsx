"use client";

import { Label } from "@/registry/wuhan/ui/label";
import { Switch } from "@/registry/wuhan/ui/switch";

export default function SwitchDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="notifications" defaultChecked />
        <Label htmlFor="notifications">Enable notifications</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled" disabled />
        <Label htmlFor="disabled">Disabled switch</Label>
      </div>
    </div>
  );
}
