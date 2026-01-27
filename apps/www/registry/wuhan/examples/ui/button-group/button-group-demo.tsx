"use client";

import { Button } from "@/registry/wuhan/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/registry/wuhan/ui/button-group";

export default function ButtonGroupDemo() {
  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>One</Button>
        <ButtonGroupSeparator />
        <Button>Two</Button>
        <ButtonGroupSeparator />
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </div>
  );
}
