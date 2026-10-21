import { execFileSync } from "node:child_process";
let diff;
try { diff = execFileSync("git", ["diff", "--cached", "--no-ext-diff", "--unified=0"], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 }); }
catch { console.error("Unable to scan staged changes."); process.exit(1); }
const added = diff.split("\n").filter(line => line.startsWith("+") && !line.startsWith("+++"));
const patterns = [/AKIA[0-9A-Z]{16}/, /(?:ghp_|github_pat_|sk_live_)[A-Za-z0-9_]{20,}/, /-----BEGIN (?:[A-Z]+ )?PRIVATE KEY-----/, /[a-z]+:\/\/[^\s/:]+:[^\s/@]+@/i];
if (added.some(line => patterns.some(pattern => pattern.test(line)))) {
  console.error("Potential secret in staged changes; remove it before committing.");
  process.exit(1);
}
console.log("Staged secret scan passed.");
