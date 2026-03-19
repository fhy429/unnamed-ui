import test from "node:test";
import assert from "node:assert/strict";
import { resolve } from "node:path";

import { resolveComponentRoot } from "../config/component-root.js";

test("resolveComponentRoot should prefer env value", () => {
  const result = resolveComponentRoot("./apps/www/registry/wuhan");
  assert.equal(result, resolve("./apps/www/registry/wuhan"));
});

test("resolveComponentRoot should use default relative path", () => {
  const result = resolveComponentRoot(
    undefined,
    "file:///workspace/packages/mcp/src/index.ts",
  );
  assert.equal(result, "/workspace/apps/www/registry/wuhan");
});
