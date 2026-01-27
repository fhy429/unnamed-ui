"use client"

import * as React from "react"
import { SquareIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"

type IconLibraryName = "lucide" | "tabler" | "hugeicons" | "phosphor" | "remixicon"

export function IconPlaceholder({
  lucide,
  tabler,
  hugeicons,
  phosphor,
  remixicon,
  ...props
}: {
  [K in IconLibraryName]?: string
} & React.ComponentProps<"svg">) {
  // Default to lucide icons since that's what's available in this project
  const iconName = lucide || tabler || hugeicons || phosphor || remixicon

  if (!iconName) {
    return <SquareIcon {...props} />
  }

  // Try to get the icon from lucide-react
  // Remove common prefixes/suffixes to match lucide naming
  const normalizedName = iconName
    .replace(/^Icon/, "")
    .replace(/Icon$/, "")
    .replace(/^Ri/, "")
    .replace(/Line$/, "")

  // Try to find the icon in lucide-react
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<any>>)[
    normalizedName
  ] || (LucideIcons as Record<string, React.ComponentType<any>>)[iconName]

  if (IconComponent) {
    return <IconComponent {...props} />
  }

  // Fallback to X icon for close buttons, or SquareIcon otherwise
  if (iconName.toLowerCase().includes("close") || iconName.toLowerCase().includes("x")) {
    const XIcon = (LucideIcons as Record<string, React.ComponentType<any>>)["X"]
    if (XIcon) {
      return <XIcon {...props} />
    }
  }

  return <SquareIcon {...props} />
}

