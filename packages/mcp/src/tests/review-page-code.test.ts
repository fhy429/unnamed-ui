import test from "node:test";
import assert from "node:assert/strict";

import { reviewPageCode } from "../page-review.js";
import { resolveSceneRecipe } from "../scene-recipes.js";

test("reviewPageCode should detect obvious issues", () => {
  const result = reviewPageCode(`
    import { Button } from "@mui/material";
    export function Page() {
      return <div className="text-gray-500 bg-[#ff0000]">hello</div>;
    }
  `);

  assert.ok(result.score < 100);
  assert.ok(result.issues.length > 0);
});

test("reviewPageCode should validate scene required components", () => {
  const recipe = resolveSceneRecipe("chat");
  const result = reviewPageCode(
    `
    import { PageHeader } from "@/components/wuhan/composed/page-header";
    export function Page() {
      const isLoading = false;
      const hasError = false;
      return <div>{isLoading ? "loading" : hasError ? "error" : "ok"}</div>;
    }`,
    recipe,
  );

  assert.ok(result.issues.some((item) => item.includes("缺少必选组件")));
});
