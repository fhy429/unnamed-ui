"use client";

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/registry/wuhan/ui/native-select";

export default function NativeSelectDemo() {
  return (
    <NativeSelect className="w-full max-w-48">
      <NativeSelectOption value="">Select a fruit</NativeSelectOption>
      <NativeSelectOptGroup label="Fruits">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
        <NativeSelectOption value="grapes">Grapes</NativeSelectOption>
        <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  );
}
