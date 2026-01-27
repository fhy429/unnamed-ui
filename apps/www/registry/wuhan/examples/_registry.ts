import { type Registry } from "shadcn/schema";

export const examples: Registry["items"] = [
  // welcome examples
  {
    name: "welcome-demo",
    type: "registry:example",
    registryDependencies: ["welcome-01"],
    files: [
      {
        path: "examples/blocks/welcome/welcome-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/welcome-demo.tsx",
      },
    ],
  },
  // message examples
  {
    name: "message-demo",
    type: "registry:example",
    registryDependencies: ["message-01"],
    files: [
      {
        path: "examples/blocks/message/message-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-demo.tsx",
      },
    ],
  },
  {
    name: "message-default",
    type: "registry:example",
    registryDependencies: ["message-01"],
    files: [
      {
        path: "examples/blocks/message/message-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-default.tsx",
      },
    ],
  },
  {
    name: "message-composed-demo",
    type: "registry:example",
    registryDependencies: ["message-01", "button"],
    files: [
      {
        path: "examples/blocks/message/message-composed-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-composed-demo.tsx",
      },
    ],
  },
  {
    name: "message-with-status",
    type: "registry:example",
    registryDependencies: ["message-01", "button"],
    files: [
      {
        path: "examples/blocks/message/message-with-status.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-with-status.tsx",
      },
    ],
  },
  {
    name: "message-with-attachment",
    type: "registry:example",
    registryDependencies: ["message-01", "attachment-list-01"],
    files: [
      {
        path: "examples/blocks/message/message-with-attachment.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-with-attachment.tsx",
      },
    ],
  },
  {
    name: "message-with-feedback",
    type: "registry:example",
    registryDependencies: ["message-01", "button"],
    files: [
      {
        path: "examples/blocks/message/message-with-feedback.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-with-feedback.tsx",
      },
    ],
  },
  {
    name: "message-with-avatar-header",
    type: "registry:example",
    registryDependencies: ["message-01", "avatar-header-01"],
    files: [
      {
        path: "examples/blocks/message/message-with-avatar-header.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/message-with-avatar-header.tsx",
      },
    ],
  },
  // attachment-list examples
  {
    name: "attachment-list-demo",
    type: "registry:example",
    registryDependencies: ["attachment-list-01"],
    files: [
      {
        path: "examples/blocks/attachment-list/attachment-list-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/attachment-list-demo.tsx",
      },
    ],
  },
  // quote-content examples
  {
    name: "quote-content-demo",
    type: "registry:example",
    registryDependencies: ["quote-content-01"],
    files: [
      {
        path: "examples/blocks/quote-content/quote-content-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quote-content-demo.tsx",
      },
    ],
  },
  // avatar-header examples
  {
    name: "avatar-header-demo",
    type: "registry:example",
    registryDependencies: ["avatar-header-01"],
    files: [
      {
        path: "examples/blocks/avatar-header/avatar-header-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/avatar-header-demo.tsx",
      },
    ],
  },
  // history-item examples
  {
    name: "history-item-demo",
    type: "registry:example",
    registryDependencies: ["history-item-01", "tooltip"],
    files: [
      {
        path: "examples/blocks/history-item/history-item-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/history-item-demo.tsx",
      },
    ],
  },
  // sender examples
  {
    name: "sender-demo",
    type: "registry:example",
    registryDependencies: ["sender-01"],
    files: [
      {
        path: "examples/blocks/sender/sender-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-demo.tsx",
      },
    ],
  },
  {
    name: "sender-default",
    type: "registry:example",
    registryDependencies: ["sender-01"],
    files: [
      {
        path: "examples/blocks/sender/sender-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-default.tsx",
      },
    ],
  },
  {
    name: "sender-active",
    type: "registry:example",
    registryDependencies: ["sender-01"],
    files: [
      {
        path: "examples/blocks/sender/sender-active.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-active.tsx",
      },
    ],
  },
  {
    name: "sender-disabled",
    type: "registry:example",
    registryDependencies: ["sender-01"],
    files: [
      {
        path: "examples/blocks/sender/sender-disabled.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-disabled.tsx",
      },
    ],
  },
  {
    name: "sender-composed-demo",
    type: "registry:example",
    registryDependencies: ["sender-01", "attachment-list-01"],
    files: [
      {
        path: "examples/blocks/sender/sender-composed-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sender-composed-demo.tsx",
      },
    ],
  },
  // textarea example
  {
    name: "textarea-demo",
    type: "registry:example",
    registryDependencies: ["textarea"],
    files: [
      {
        path: "examples/ui/textarea/textarea-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/textarea-demo.tsx",
      },
    ],
  },
  // button examples
  {
    name: "button-demo",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/ui/button/button-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/button-demo.tsx",
      },
    ],
  },
  // input examples
  {
    name: "input-demo",
    type: "registry:example",
    registryDependencies: ["input"],
    files: [
      {
        path: "examples/ui/input/input-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/input-demo.tsx",
      },
    ],
  },
  // label examples
  {
    name: "label-demo",
    type: "registry:example",
    registryDependencies: ["label"],
    files: [
      {
        path: "examples/ui/label/label-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/label-demo.tsx",
      },
    ],
  },
  // badge examples
  {
    name: "badge-demo",
    type: "registry:example",
    registryDependencies: ["badge"],
    files: [
      {
        path: "examples/ui/badge/badge-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/badge-demo.tsx",
      },
    ],
  },
  // avatar examples
  {
    name: "avatar-demo",
    type: "registry:example",
    registryDependencies: ["avatar"],
    files: [
      {
        path: "examples/ui/avatar/avatar-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/avatar-demo.tsx",
      },
    ],
  },
  // separator examples
  {
    name: "separator-demo",
    type: "registry:example",
    registryDependencies: ["separator"],
    files: [
      {
        path: "examples/ui/separator/separator-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/separator-demo.tsx",
      },
    ],
  },
  // skeleton examples
  {
    name: "skeleton-demo",
    type: "registry:example",
    registryDependencies: ["skeleton"],
    files: [
      {
        path: "examples/ui/skeleton/skeleton-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/skeleton-demo.tsx",
      },
    ],
  },
  // spinner examples
  {
    name: "spinner-demo",
    type: "registry:example",
    registryDependencies: ["spinner"],
    files: [
      {
        path: "examples/ui/spinner/spinner-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/spinner-demo.tsx",
      },
    ],
  },
  // kbd examples
  {
    name: "kbd-demo",
    type: "registry:example",
    registryDependencies: ["kbd"],
    files: [
      {
        path: "examples/ui/kbd/kbd-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/kbd-demo.tsx",
      },
    ],
  },
  // empty examples
  {
    name: "empty-demo",
    type: "registry:example",
    registryDependencies: ["empty", "button"],
    files: [
      {
        path: "examples/ui/empty/empty-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/empty-demo.tsx",
      },
    ],
  },
  // alert examples
  {
    name: "alert-demo",
    type: "registry:example",
    registryDependencies: ["alert", "button"],
    files: [
      {
        path: "examples/ui/alert/alert-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/alert-demo.tsx",
      },
    ],
  },
  // card examples
  {
    name: "card-demo",
    type: "registry:example",
    registryDependencies: ["card", "button", "input", "label"],
    files: [
      {
        path: "examples/ui/card/card-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/card-demo.tsx",
      },
    ],
  },
  // tabs examples
  {
    name: "tabs-demo",
    type: "registry:example",
    registryDependencies: ["tabs", "card"],
    files: [
      {
        path: "examples/ui/tabs/tabs-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/tabs-demo.tsx",
      },
    ],
  },
  // tooltip examples
  {
    name: "tooltip-demo",
    type: "registry:example",
    registryDependencies: ["tooltip", "button"],
    files: [
      {
        path: "examples/ui/tooltip/tooltip-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/tooltip-demo.tsx",
      },
    ],
  },
  // checkbox examples
  {
    name: "checkbox-demo",
    type: "registry:example",
    registryDependencies: ["checkbox", "label"],
    files: [
      {
        path: "examples/ui/checkbox/checkbox-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/checkbox-demo.tsx",
      },
    ],
  },
  // radio-group examples
  {
    name: "radio-group-demo",
    type: "registry:example",
    registryDependencies: ["radio-group", "label"],
    files: [
      {
        path: "examples/ui/radio-group/radio-group-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/radio-group-demo.tsx",
      },
    ],
  },
  // switch examples
  {
    name: "switch-demo",
    type: "registry:example",
    registryDependencies: ["switch", "label"],
    files: [
      {
        path: "examples/ui/switch/switch-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/switch-demo.tsx",
      },
    ],
  },
  // select examples
  {
    name: "select-demo",
    type: "registry:example",
    registryDependencies: ["select"],
    files: [
      {
        path: "examples/ui/select/select-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/select-demo.tsx",
      },
    ],
  },
  // native-select examples
  {
    name: "native-select-demo",
    type: "registry:example",
    registryDependencies: ["native-select"],
    files: [
      {
        path: "examples/ui/native-select/native-select-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/native-select-demo.tsx",
      },
    ],
  },
  // input-group examples
  {
    name: "input-group-demo",
    type: "registry:example",
    registryDependencies: ["input-group", "input"],
    files: [
      {
        path: "examples/ui/input-group/input-group-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/input-group-demo.tsx",
      },
    ],
  },
  // input-otp examples
  {
    name: "input-otp-demo",
    type: "registry:example",
    registryDependencies: ["input-otp"],
    files: [
      {
        path: "examples/ui/input-otp/input-otp-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/input-otp-demo.tsx",
      },
    ],
  },
  // field examples
  {
    name: "field-demo",
    type: "registry:example",
    registryDependencies: ["field", "input", "button", "label"],
    files: [
      {
        path: "examples/ui/field/field-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/field-demo.tsx",
      },
    ],
  },
  // slider examples
  {
    name: "slider-demo",
    type: "registry:example",
    registryDependencies: ["slider"],
    files: [
      {
        path: "examples/ui/slider/slider-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/slider-demo.tsx",
      },
    ],
  },
  // progress examples
  {
    name: "progress-demo",
    type: "registry:example",
    registryDependencies: ["progress"],
    files: [
      {
        path: "examples/ui/progress/progress-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/progress-demo.tsx",
      },
    ],
  },
  // toggle examples
  {
    name: "toggle-demo",
    type: "registry:example",
    registryDependencies: ["toggle"],
    files: [
      {
        path: "examples/ui/toggle/toggle-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/toggle-demo.tsx",
      },
    ],
  },
  // toggle-group examples
  {
    name: "toggle-group-demo",
    type: "registry:example",
    registryDependencies: ["toggle-group"],
    files: [
      {
        path: "examples/ui/toggle-group/toggle-group-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/toggle-group-demo.tsx",
      },
    ],
  },
  // button-group examples
  {
    name: "button-group-demo",
    type: "registry:example",
    registryDependencies: ["button-group", "button", "separator"],
    files: [
      {
        path: "examples/ui/button-group/button-group-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/button-group-demo.tsx",
      },
    ],
  },
  // collapsible examples
  {
    name: "collapsible-demo",
    type: "registry:example",
    registryDependencies: ["collapsible", "button"],
    files: [
      {
        path: "examples/ui/collapsible/collapsible-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/collapsible-demo.tsx",
      },
    ],
  },
  // dialog examples
  {
    name: "dialog-demo",
    type: "registry:example",
    registryDependencies: ["dialog", "button", "input", "label"],
    files: [
      {
        path: "examples/ui/dialog/dialog-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/dialog-demo.tsx",
      },
    ],
  },
  // alert-dialog examples
  {
    name: "alert-dialog-demo",
    type: "registry:example",
    registryDependencies: ["alert-dialog", "button"],
    files: [
      {
        path: "examples/ui/alert-dialog/alert-dialog-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/alert-dialog-demo.tsx",
      },
    ],
  },
  // sheet examples
  {
    name: "sheet-demo",
    type: "registry:example",
    registryDependencies: ["sheet", "button", "input", "label"],
    files: [
      {
        path: "examples/ui/sheet/sheet-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sheet-demo.tsx",
      },
    ],
  },
  // drawer examples
  {
    name: "drawer-demo",
    type: "registry:example",
    registryDependencies: ["drawer", "button", "input", "label"],
    files: [
      {
        path: "examples/ui/drawer/drawer-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/drawer-demo.tsx",
      },
    ],
  },
  // popover examples
  {
    name: "popover-demo",
    type: "registry:example",
    registryDependencies: ["popover", "button", "input", "label"],
    files: [
      {
        path: "examples/ui/popover/popover-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/popover-demo.tsx",
      },
    ],
  },
  // hover-card examples
  {
    name: "hover-card-demo",
    type: "registry:example",
    registryDependencies: ["hover-card", "button"],
    files: [
      {
        path: "examples/ui/hover-card/hover-card-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/hover-card-demo.tsx",
      },
    ],
  },
  // dropdown-menu examples
  {
    name: "dropdown-menu-demo",
    type: "registry:example",
    registryDependencies: ["dropdown-menu", "button"],
    files: [
      {
        path: "examples/ui/dropdown-menu/dropdown-menu-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/dropdown-menu-demo.tsx",
      },
    ],
  },
  // context-menu examples
  {
    name: "context-menu-demo",
    type: "registry:example",
    registryDependencies: ["context-menu"],
    files: [
      {
        path: "examples/ui/context-menu/context-menu-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/context-menu-demo.tsx",
      },
    ],
  },
  // menubar examples
  {
    name: "menubar-demo",
    type: "registry:example",
    registryDependencies: ["menubar"],
    files: [
      {
        path: "examples/ui/menubar/menubar-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/menubar-demo.tsx",
      },
    ],
  },
  // navigation-menu examples
  {
    name: "navigation-menu-demo",
    type: "registry:example",
    registryDependencies: ["navigation-menu"],
    files: [
      {
        path: "examples/ui/navigation-menu/navigation-menu-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/navigation-menu-demo.tsx",
      },
    ],
  },
  // command examples
  {
    name: "command-demo",
    type: "registry:example",
    registryDependencies: ["command"],
    files: [
      {
        path: "examples/ui/command/command-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/command-demo.tsx",
      },
    ],
  },
  // combobox examples
  {
    name: "combobox-demo",
    type: "registry:example",
    registryDependencies: ["combobox"],
    files: [
      {
        path: "examples/ui/combobox/combobox-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/combobox-demo.tsx",
      },
    ],
  },
  // breadcrumb examples
  {
    name: "breadcrumb-demo",
    type: "registry:example",
    registryDependencies: ["breadcrumb"],
    files: [
      {
        path: "examples/ui/breadcrumb/breadcrumb-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/breadcrumb-demo.tsx",
      },
    ],
  },
  // pagination examples
  {
    name: "pagination-demo",
    type: "registry:example",
    registryDependencies: ["pagination", "button"],
    files: [
      {
        path: "examples/ui/pagination/pagination-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/pagination-demo.tsx",
      },
    ],
  },
  // accordion examples
  {
    name: "accordion-demo",
    type: "registry:example",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "examples/ui/accordion/accordion-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/accordion-demo.tsx",
      },
    ],
  },
  // table examples
  {
    name: "table-demo",
    type: "registry:example",
    registryDependencies: ["table"],
    files: [
      {
        path: "examples/ui/table/table-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/table-demo.tsx",
      },
    ],
  },
  // carousel examples
  {
    name: "carousel-demo",
    type: "registry:example",
    registryDependencies: ["carousel", "button", "card"],
    files: [
      {
        path: "examples/ui/carousel/carousel-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/carousel-demo.tsx",
      },
    ],
  },
  // chart examples
  {
    name: "chart-demo",
    type: "registry:example",
    registryDependencies: ["chart", "card"],
    files: [
      {
        path: "examples/ui/chart/chart-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/chart-demo.tsx",
      },
    ],
  },
  // calendar examples
  {
    name: "calendar-demo",
    type: "registry:example",
    registryDependencies: ["calendar", "button"],
    files: [
      {
        path: "examples/ui/calendar/calendar-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/calendar-demo.tsx",
      },
    ],
  },
  // aspect-ratio examples
  {
    name: "aspect-ratio-demo",
    type: "registry:example",
    registryDependencies: ["aspect-ratio"],
    files: [
      {
        path: "examples/ui/aspect-ratio/aspect-ratio-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/aspect-ratio-demo.tsx",
      },
    ],
  },
  // scroll-area examples
  {
    name: "scroll-area-demo",
    type: "registry:example",
    registryDependencies: ["scroll-area", "separator"],
    files: [
      {
        path: "examples/ui/scroll-area/scroll-area-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/scroll-area-demo.tsx",
      },
    ],
  },
  // resizable examples
  {
    name: "resizable-demo",
    type: "registry:example",
    registryDependencies: ["resizable"],
    files: [
      {
        path: "examples/ui/resizable/resizable-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/resizable-demo.tsx",
      },
    ],
  },
  // sonner examples
  {
    name: "sonner-demo",
    type: "registry:example",
    registryDependencies: ["sonner", "button"],
    files: [
      {
        path: "examples/ui/sonner/sonner-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sonner-demo.tsx",
      },
    ],
  },
  // item examples
  {
    name: "item-demo",
    type: "registry:example",
    registryDependencies: ["item", "button", "separator"],
    files: [
      {
        path: "examples/ui/item/item-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/item-demo.tsx",
      },
    ],
  },
  // sidebar examples
  {
    name: "sidebar-demo",
    type: "registry:example",
    registryDependencies: ["sidebar", "button"],
    files: [
      {
        path: "examples/ui/sidebar/sidebar-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sidebar-demo.tsx",
      },
    ],
  },
  // prompt examples
  {
    name: "prompt-demo",
    type: "registry:example",
    registryDependencies: ["prompt-01", "prompt-02"],
    files: [
      {
        path: "examples/blocks/prompt/prompt-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/prompt-demo.tsx",
      },
    ],
  },
  {
    name: "prompt-horizontal",
    type: "registry:example",
    registryDependencies: ["prompt-01"],
    files: [
      {
        path: "examples/blocks/prompt/prompt-horizontal.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/prompt-horizontal.tsx",
      },
    ],
  },
  {
    name: "prompt-vertical",
    type: "registry:example",
    registryDependencies: ["prompt-02"],
    files: [
      {
        path: "examples/blocks/prompt/prompt-vertical.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/prompt-vertical.tsx",
      },
    ],
  },
  // suggestion examples
  {
    name: "suggestion-demo",
    type: "registry:example",
    registryDependencies: ["suggestion-01"],
    files: [
      {
        path: "examples/blocks/suggestion/suggestion-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/suggestion-demo.tsx",
      },
    ],
  },
  {
    name: "suggestion-default",
    type: "registry:example",
    registryDependencies: ["suggestion-01"],
    files: [
      {
        path: "examples/blocks/suggestion/suggestion-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/suggestion-default.tsx",
      },
    ],
  },
  {
    name: "suggestion-custom-icon",
    type: "registry:example",
    registryDependencies: ["suggestion-01"],
    files: [
      {
        path: "examples/blocks/suggestion/suggestion-custom-icon.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/suggestion-custom-icon.tsx",
      },
    ],
  },
  // quick-action examples
  {
    name: "quick-action-demo",
    type: "registry:example",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "examples/blocks/quick-action/quick-action-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-demo.tsx",
      },
    ],
  },
  {
    name: "quick-action-default",
    type: "registry:example",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "examples/blocks/quick-action/quick-action-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-default.tsx",
      },
    ],
  },
  {
    name: "quick-action-with-icons",
    type: "registry:example",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "examples/blocks/quick-action/quick-action-with-icons.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-with-icons.tsx",
      },
    ],
  },
  {
    name: "quick-action-single",
    type: "registry:example",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "examples/blocks/quick-action/quick-action-single.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-single.tsx",
      },
    ],
  },
  {
    name: "quick-action-interactive",
    type: "registry:example",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "examples/blocks/quick-action/quick-action-interactive.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-interactive.tsx",
      },
    ],
  },
  {
    name: "quick-action-disabled",
    type: "registry:example",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "examples/blocks/quick-action/quick-action-disabled.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-disabled.tsx",
      },
    ],
  },
  {
    name: "quick-action-flexible-layout",
    type: "registry:example",
    registryDependencies: ["quick-action-01"],
    files: [
      {
        path: "examples/blocks/quick-action/quick-action-flexible-layout.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/quick-action-flexible-layout.tsx",
      },
    ],
  },
  // sidebar examples
  {
    name: "sidebar-demo",
    type: "registry:example",
    registryDependencies: [
      "sidebar-01",
      "history-item-01",
      "avatar-header-01",
      "button",
    ],
    files: [
      {
        path: "examples/blocks/sidebar/sidebar-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/sidebar-demo.tsx",
      },
    ],
  },
  // feedback examples
  {
    name: "feedback-demo",
    type: "registry:example",
    registryDependencies: ["feedback-01"],
    files: [
      {
        path: "examples/blocks/feedback/feedback-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/feedback-demo.tsx",
      },
    ],
  },
  // toggle-button examples
  {
    name: "toggle-button-demo",
    type: "registry:example",
    registryDependencies: ["toggle-button-01"],
    files: [
      {
        path: "examples/blocks/toggle-button/toggle-button-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/toggle-button-demo.tsx",
      },
    ],
  },
  // deep-thinking examples
  {
    name: "deep-thinking-demo",
    type: "registry:example",
    registryDependencies: ["deep-thinking-01"],
    files: [
      {
        path: "examples/blocks/deep-thinking/deep-thinking-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/deep-thinking-demo.tsx",
      },
    ],
  },
  {
    name: "deep-thinking-default",
    type: "registry:example",
    registryDependencies: ["deep-thinking-01"],
    files: [
      {
        path: "examples/blocks/deep-thinking/deep-thinking-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/deep-thinking-default.tsx",
      },
    ],
  },
  {
    name: "deep-thinking-with-status",
    type: "registry:example",
    registryDependencies: ["deep-thinking-01"],
    files: [
      {
        path: "examples/blocks/deep-thinking/deep-thinking-with-status.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/deep-thinking-with-status.tsx",
      },
    ],
  },
  {
    name: "deep-thinking-custom",
    type: "registry:example",
    registryDependencies: ["deep-thinking-01"],
    files: [
      {
        path: "examples/blocks/deep-thinking/deep-thinking-custom.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/deep-thinking-custom.tsx",
      },
    ],
  },
  // component-panel examples
  {
    name: "component-panel-default",
    type: "registry:example",
    registryDependencies: ["component-panel-01"],
    files: [
      {
        path: "examples/blocks/component-panel/component-panel-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/component-panel-default.tsx",
      },
    ],
  },
  // tooltip examples
  {
    name: "tooltip-demo",
    type: "registry:example",
    registryDependencies: ["tooltip-01", "button"],
    files: [
      {
        path: "examples/blocks/tooltip/tooltip-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/tooltip-demo.tsx",
      },
    ],
  },
  // execution-result examples
  {
    name: "execution-result-demo",
    type: "registry:example",
    registryDependencies: ["execution-result-01"],
    files: [
      {
        path: "examples/blocks/execution-result/execution-result-demo.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/execution-result-demo.tsx",
      },
    ],
  },
  {
    name: "execution-result-default",
    type: "registry:example",
    registryDependencies: ["execution-result-01"],
    files: [
      {
        path: "examples/blocks/execution-result/execution-result-default.tsx",
        type: "registry:example",
        target: "components/wuhan/examples/execution-result-default.tsx",
      },
    ],
  },
];
