"use client";

import { Button } from "@/registry/wuhan/ui/button";
import { toast } from "sonner";

export default function SonnerDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
      <Button variant="outline" onClick={() => toast.success("Success!")}>
        Success Toast
      </Button>
      <Button variant="outline" onClick={() => toast.error("Error occurred")}>
        Error Toast
      </Button>
    </div>
  );
}
