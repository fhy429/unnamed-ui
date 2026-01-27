"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertAction,
} from "@/registry/wuhan/ui/alert";
import { CheckCircle2Icon, InfoIcon, AlertCircleIcon } from "lucide-react";
import { Button } from "@/registry/wuhan/ui/button";

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <Alert>
        <CheckCircle2Icon className="size-4" />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed. A receipt has been sent to
          your email address.
        </AlertDescription>
      </Alert>
      <Alert>
        <InfoIcon className="size-4" />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          We&apos;ve added dark mode support. You can enable it in your account
          settings.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again to continue.
        </AlertDescription>
        <AlertAction>
          <Button variant="outline" size="sm">
            Login
          </Button>
        </AlertAction>
      </Alert>
    </div>
  );
}
