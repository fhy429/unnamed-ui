#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createWuhanServer } from "./app/create-server.js";

// ──────────────────────────────────────────────
// 启动服务
// ──────────────────────────────────────────────

/**
 * 使用 stdio transport 启动 MCP 服务。
 */
async function main() {
  const server = createWuhanServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("MCP server failed to start:", err);
  process.exit(1);
});
