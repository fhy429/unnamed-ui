import test from "node:test";
import assert from "node:assert/strict";

import { suggestComponents, type ComponentMeta } from "../registry.js";

const MOCK_COMPONENTS: ComponentMeta[] = [
  {
    name: "message-list",
    title: "Message List",
    description: "Chat message list",
    layer: "composed",
    type: "registry:composed",
    dependencies: [],
    registryDependencies: [],
    files: [],
  },
  {
    name: "sender",
    title: "Sender",
    description: "Message input",
    layer: "composed",
    type: "registry:composed",
    dependencies: [],
    registryDependencies: [],
    files: [],
  },
  {
    name: "block-button",
    title: "Block Button",
    description: "Action button",
    layer: "blocks",
    type: "registry:blocks",
    dependencies: [],
    registryDependencies: [],
    files: [],
  },
  {
    name: "button",
    title: "Button",
    description: "Basic button",
    layer: "ui",
    type: "registry:ui",
    dependencies: [],
    registryDependencies: [],
    files: [],
  },
];

test("suggestComponents should prefer composed for chat description", () => {
  const results = suggestComponents(MOCK_COMPONENTS, "chat message send");
  assert.ok(results.length > 0);
  assert.equal(results[0].component.layer, "composed");
});
