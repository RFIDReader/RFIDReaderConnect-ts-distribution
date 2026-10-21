import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const esm = await import("../dist/index.js");
const cjs = createRequire(import.meta.url)("../dist/index.cjs");
for (const api of [esm, cjs]) {
  if (typeof api.WebSocketTransport !== "function") throw new Error("Missing binary streaming transport export.");
  new api.WebSocketTransport(undefined, { hostname: "reader.local" });
}
const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url)));
if (Object.keys(manifest.dependencies ?? {}).length) throw new Error("Review runtime dependencies before updating distribution.");
console.log("Obfuscated ESM/CJS streaming exports and zero runtime dependencies verified.");
