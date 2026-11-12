// Accessibility check: runs axe-core (WCAG 2.0/2.1 A and AA rules) on every built page in _site/.
// Usage: npm run build && npm run check:a11y
//
// - Violations fail the check (exit code 1).
// - "Needs review" items are listed but don't fail: axe can't decide them automatically,
//   e.g. text contrast over a patterned or gradient background. Check those by eye.
//
// Uses an installed Chrome; set CHROME_PATH if it is somewhere unusual.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const SITE = process.env.SITE_DIR || "_site";
const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const executablePath = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean).find((p) => existsSync(p));
if (!executablePath) {
    console.error("No Chrome found. Install Chrome or set CHROME_PATH.");
    process.exit(2);
}

function htmlFiles(dir) {
    return readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) return htmlFiles(path);
        return name.endsWith(".html") ? [path] : [];
    });
}

const browser = await puppeteer.launch({ executablePath, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });

let violations = 0;
let needsReview = 0;
for (const file of htmlFiles(SITE).sort()) {
    await page.goto(pathToFileURL(file).href, { waitUntil: "load" });
    await page.addScriptTag({ content: axeSource });
    const result = await page.evaluate(() =>
        window.axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
            // Embedded third-party maps are outside our control
            exclude: [["iframe"]],
        })
    );
    const count = (list) => list.reduce((n, rule) => n + rule.nodes.length, 0);
    const v = count(result.violations);
    violations += v;
    needsReview += count(result.incomplete);

    const name = relative(SITE, file).replaceAll("\\", "/");
    console.log(`${v ? "✗" : "✓"} ${name}${v ? ` (${v} violation${v > 1 ? "s" : ""})` : ""}`);
    for (const rule of result.violations) {
        for (const node of rule.nodes) {
            console.log(`    ${rule.id}: ${rule.help}\n      ${node.target.join(" ")}\n      ${node.failureSummary.replace(/\s+/g, " ").slice(0, 200)}`);
        }
    }
}
await browser.close();

console.log(`\n${violations} violation(s). ${needsReview} item(s) need a manual look (axe could not decide, e.g. text over a background image).`);
process.exit(violations ? 1 : 0);
