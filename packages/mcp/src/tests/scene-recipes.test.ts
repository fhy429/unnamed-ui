import test from "node:test";
import assert from "node:assert/strict";

import { resolveSceneRecipe } from "../scene-recipes.js";

test("resolveSceneRecipe should match chinese scene alias", () => {
  const recipe = resolveSceneRecipe("做一个AI工作台页面");
  assert.ok(recipe);
  assert.equal(recipe?.id, "chat-workstation");
});

test("resolveSceneRecipe should match english scene alias", () => {
  const recipe = resolveSceneRecipe("dashboard with report cards");
  assert.ok(recipe);
  assert.equal(recipe?.id, "dashboard-report");
});
