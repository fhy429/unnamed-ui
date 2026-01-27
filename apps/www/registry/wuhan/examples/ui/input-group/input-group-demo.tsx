"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/wuhan/ui/input-group";
import { Search } from "lucide-react";

export default function InputGroupDemo() {
  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <Search className="size-4" />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
    </div>
  );
}
