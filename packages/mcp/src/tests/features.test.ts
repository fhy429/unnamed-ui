import test from "node:test";
import assert from "node:assert/strict";

import { resolveFeatureToggles } from "../config/features.js";

test("resolveFeatureToggles should enable all by default", () => {
  const result = resolveFeatureToggles(undefined);
  assert.equal(result.advancedTools, true);
  assert.equal(result.resources, true);
});

test("resolveFeatureToggles should parse advanced only", () => {
  const result = resolveFeatureToggles("advanced");
  assert.equal(result.advancedTools, true);
  assert.equal(result.resources, false);
});

test("resolveFeatureToggles should parse resources only", () => {
  const result = resolveFeatureToggles("resources");
  assert.equal(result.advancedTools, false);
  assert.equal(result.resources, true);
});

test("resolveFeatureToggles should parse all", () => {
  const result = resolveFeatureToggles("all");
  assert.equal(result.advancedTools, true);
  assert.equal(result.resources, true);
});
