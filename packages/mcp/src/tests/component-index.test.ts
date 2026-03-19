import test from "node:test";
import assert from "node:assert/strict";

import { createComponentIndexGetter } from "../services/component-index.js";
import type { ComponentMeta } from "../registry.js";

test("createComponentIndexGetter should build once and cache result", () => {
  let buildCount = 0;
  const mockedIndex: ComponentMeta[] = [
    {
      name: "mock",
      title: "Mock",
      description: "Mock component",
      layer: "ui",
      type: "registry:ui",
      dependencies: [],
      registryDependencies: [],
      files: [],
    },
  ];

  const getIndex = createComponentIndexGetter("/tmp/mock", () => {
    buildCount += 1;
    return mockedIndex;
  });

  const first = getIndex();
  const second = getIndex();

  assert.equal(buildCount, 1);
  assert.equal(first, mockedIndex);
  assert.equal(second, mockedIndex);
});
