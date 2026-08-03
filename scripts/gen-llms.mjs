#!/usr/bin/env node
/**
 * Prototype: first-party llms.txt + per-page raw-markdown generation.
 *
 * Reads the SOURCE markdown under docs/ (already clean .md/.mdx, the canonical
 * content) and emits, into the build output:
 *   - build/<route>.md        a plain-markdown copy of each page, so an agent
 *                             can fetch e.g. /integrate/swap.md and get the full
 *                             page with no JS / no HTML chrome.
 *   - build/llms.txt          an index of every page + its .md URL (the emerging
 *                             convention agents look for at /llms.txt).
 *
 * Why source-based, not HTML-scraped: our built HTML is a Docusaurus SSG shell;
 * scraping it (what docusaurus-plugin-copy-page-button's generateMarkdownRoutes
 * does) produced zero output on our config. The source .md is the reliable input.
 *
 * Run AFTER `yarn build`:  node scripts/gen-llms.mjs
 *
 * This is a prototype to compare against PR #342, not yet wired into the build.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, relative, resolve, sep, posix } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_DIR = join(REPO, "docs");
const BUILD_DIR = join(REPO, "build");
const SITE = "https://docs.osmosis.zone";

// Content routes that exist on the site but are NOT sourced from docs/ (React
// pages, the OpenAPI reference). We add explicit llms.txt entries for the ones
// with real content and deliberately skip utility routes.
const EXTRA_PAGES = [
  { title: "Osmosis Documentation (home)", route: "/", note: "Documentation home page." },
  { title: "API Reference", route: "/api", note: "OpenAPI reference for the LCD/REST, RPC, and Numia data APIs (interactive, not available as markdown)." },
];
// Utility routes intentionally excluded from the markdown corpus and index.
const EXCLUDED_ROUTES = new Set(["/search", "/api/v2", "/category/key-management"]);

// route base path is '/', so docs/integrate/swap.md -> /integrate/swap
function routeFor(absPath) {
  let r = relative(DOCS_DIR, absPath).split(sep).join("/");
  r = r.replace(/\.(md|mdx)$/, "");
  r = r.replace(/\/(index|README)$/i, ""); // index pages -> their directory
  return "/" + r;
}

// The .md URL served for a docs route, so links between generated pages keep an
// agent inside the markdown corpus (never bouncing back to the HTML shell).
// Mirrors the output path: /integrate/swap -> /integrate/swap.md, / -> /index.md.
function mdUrlFor(route) {
  return (route === "/" ? "/index" : route) + ".md";
}

// Map every built image asset by basename -> its hashed /assets/... URL, so a
// source-relative image (./img/eq-10.png, broken at the shallower route depth)
// can be rewritten to the path Docusaurus actually emits and serves.
function buildAssetMap() {
  const map = new Map();
  const dir = join(BUILD_DIR, "assets", "images");
  if (!existsSync(dir)) return map;
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) { stack.push(p); continue; }
      // hashed name: name-<hash>.ext  ->  original basename name.ext
      const orig = e.name.replace(/-[a-f0-9]{8,}(\.[a-z0-9]+)$/i, "$1");
      const url = "/" + relative(BUILD_DIR, p).split(sep).join("/");
      if (!map.has(orig)) map.set(orig, url);
    }
  }
  return map;
}

// Rewrite relative markdown links/images so they resolve from the generated
// .md (whose URL depth differs from the source file). Links are re-expressed as
// absolute site paths via the source->route map; images point at the built
// hashed asset. Anchors, external URLs, and already-absolute paths pass through.
function rewriteUrls(body, sourceAbs, routeByFile, assetMap) {
  const srcDir = dirname(sourceAbs);
  const replaceOne = (isImg, url) => {
    if (/^(https?:|mailto:|tel:|data:|#|\/)/i.test(url)) return null; // leave as-is
    const hashIdx = url.indexOf("#");
    const path = hashIdx >= 0 ? url.slice(0, hashIdx) : url;
    const anchor = hashIdx >= 0 ? url.slice(hashIdx) : "";
    if (!path) return null;

    if (isImg || /\.(png|jpe?g|svg|gif|webp)$/i.test(path)) {
      const base = path.split("/").pop();
      const hashed = assetMap.get(base);
      return hashed ? hashed + anchor : null;
    }

    // A link to another doc: resolve against the source dir, match to a route,
    // and point at that route's .md so the agent stays in the markdown corpus.
    const absTarget = resolve(srcDir, path);
    const key = normalizeKey(absTarget);
    const route = routeByFile.get(key);
    if (route) return mdUrlFor(route) + anchor;
    return null; // unknown target: leave unchanged rather than guess
  };

  // ![alt](url) and [txt](url) — skip inside code handled by caller (deMdx runs first,
  // but code spans/fences remain; guard by not matching inside backticks is hard,
  // so we only rewrite when the whole match is a real md link, which backticked
  // code like `[a](b)` will also match — acceptable, those are rare in prose and
  // rewriting a same-target link is idempotent). Operate line-wise, skip fences.
  const lines = body.split("\n");
  let inFence = false, marker = "";
  for (let i = 0; i < lines.length; i++) {
    const f = lines[i].match(/^\s*(```+|~~~+)/);
    if (f) { if (!inFence) { inFence = true; marker = f[1][0]; } else if (lines[i].trimStart().startsWith(marker)) inFence = false; continue; }
    if (inFence) continue;
    lines[i] = lines[i].replace(/(!?)\[([^\]]*)\]\(([^)\s]+)\)/g, (whole, bang, txt, url) => {
      const nu = replaceOne(bang === "!", url);
      return nu === null ? whole : `${bang}[${txt}](${nu})`;
    });
  }
  return lines.join("\n");
}

// Canonicalize a source path (with or without extension / index) to the same key
// used when indexing every source file, so link targets can be matched to routes.
function normalizeKey(absNoExt) {
  const p = absNoExt.split(sep).join("/").replace(/\/(index|README)(\.mdx?)?$/i, "").replace(/\.mdx?$/i, "");
  return p.replace(/\/+$/, "").toLowerCase();
}

function normalize(src) {
  return src.replace(/^﻿/, "").replace(/\r\n/g, "\n");
}

function stripFrontmatter(src) {
  const m = normalize(src).match(/^---\n[\s\S]*?\n---\n?/);
  return m ? normalize(src).slice(m[0].length) : normalize(src);
}

// Strip MDX/JSX chrome so the output is clean markdown for an LLM, WITHOUT
// touching anything inside fenced or inline code (placeholder tokens like
// `<HASH>` / `<SNAPSHOT_URL>` and code such as `import { osmosis } from 'osmojs'`
// must survive verbatim). We process line by line, tracking fenced-code state,
// and skip any line that is inside a code fence.
function deMdx(body) {
  const lines = body.split("\n");
  const out = [];
  let inFence = false;
  let fenceMarker = "";

  for (const line of lines) {
    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      if (!inFence) {
        inFence = true;
        fenceMarker = fence[1][0];
      } else if (line.trimStart().startsWith(fenceMarker)) {
        inFence = false;
      }
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    let l = line;

    // Drop MDX component imports/exports (theme/site components), but not code
    // (those live in fences, handled above).
    if (/^\s*import\s+.*\s+from\s+['"](@theme|@site|@docusaurus)\/.+['"];?\s*$/.test(l)) continue;
    if (/^\s*export\s+(default\s+)?(function|const)\s/.test(l)) continue;

    // <DocCardList .../> — leave a sentinel; expandDocCardList() turns it into a
    // real markdown list of child pages (its navigation has value to an agent).
    if (/^\s*<DocCardList\b[^>]*\/?>\s*$/.test(l)) { out.push("__DOCCARDLIST__"); continue; }

    // <Tabs> / </Tabs> wrappers: drop. <TabItem ... label="X"> -> a small heading.
    if (/^\s*<\/?Tabs>\s*$/.test(l)) continue;
    const tab = l.match(/^\s*<TabItem\b[^>]*\blabel="([^"]*)"[^>]*>\s*$/);
    if (tab) { out.push(`**${tab[1]}**`); continue; }
    if (/^\s*<\/TabItem>\s*$/.test(l)) continue;

    // <p align="center"> ... </p> image wrappers: unwrap. Handle the common
    // multi-line form by dropping the <p>/</p> and converting the inner <img>.
    if (/^\s*<\/?p\b[^>]*>\s*$/.test(l)) continue;
    const imgTag = l.match(/<img\s+[^>]*\/?>/);
    if (imgTag) {
      const src = imgTag[0].match(/\bsrc="([^"]*)"/);
      const alt = imgTag[0].match(/\balt="([^"]*)"/);
      if (src) { out.push(`![${alt ? alt[1] : ""}](${src[1]})`); continue; }
    }

    // Admonition fences ::: -> blockquote label; keep the body as-is.
    const adm = l.match(/^:::(\w+)(?:\s+(.*))?$/);
    if (adm) { out.push(`> **${(adm[2] || adm[1]).trim()}**`); continue; }
    if (/^:::\s*$/.test(l)) { out.push(""); continue; }

    out.push(l);
  }

  // Collapse 3+ blank lines that the removals may have introduced.
  return out.join("\n").replace(/\n{3,}/g, "\n\n");
}

function titleOf(src, route) {
  const fm = normalize(src).match(/^---\n([\s\S]*?)\n---/);
  if (fm) {
    const t = fm[1].match(/^title:\s*(.+)$/m);
    if (t) return t[1].trim().replace(/^["']|["']$/g, "");
  }
  const h1 = stripFrontmatter(src).match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim();
  return route.split("/").pop() || route;
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    // Skip Docusaurus partials/config (names starting with "_", e.g. _category_,
    // _partial.md); these are not standalone pages and must not become .md routes.
    if (e.name.startsWith("_")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(md|mdx)$/.test(e.name)) out.push(p);
  }
  return out;
}

if (!existsSync(BUILD_DIR)) {
  console.error("build/ not found — run `yarn build` first.");
  process.exit(1);
}

const files = walk(DOCS_DIR).sort();
const assetMap = buildAssetMap();

// Pass 1: gather metadata for every source page (route, title, description, and
// the normalized key used to match link targets). Needed before writing bodies
// so DocCardList expansion and link rewriting can see the whole route set.
const pages = files.map((abs) => {
  const src = readFileSync(abs, "utf8");
  const route = routeFor(abs);
  const fm = normalize(src).match(/^---\n([\s\S]*?)\n---/);
  const desc = fm && fm[1].match(/^description:\s*(.+)$/m);
  return {
    abs,
    src,
    route,
    title: titleOf(src, route),
    description: desc ? desc[1].trim().replace(/^["']|["']$/g, "") : "",
    key: normalizeKey(abs),
  };
});
const routeByFile = new Map(pages.map((p) => [p.key, p.route]));

// Immediate children of a section index (what DocCardList renders): pages whose
// route is exactly one path segment deeper than the index route.
function childrenOf(route) {
  const depth = route === "/" ? 0 : route.split("/").length - 1;
  return pages
    .filter((p) => p.route !== route && (route === "/" ? true : p.route.startsWith(route + "/")))
    .filter((p) => p.route.split("/").length - 1 === depth + 1)
    .sort((a, b) => a.route.localeCompare(b.route));
}

// Replace a <DocCardList/> line with a real markdown list of child pages, so the
// navigation the component renders is preserved in the corpus.
function expandDocCardList(body, route) {
  if (!/<DocCardList\b/.test(body) && !/__DOCCARDLIST__/.test(body)) return body;
  const kids = childrenOf(route);
  const list = kids.length
    ? kids.map((k) => `- [${k.title}](${mdUrlFor(k.route)})${k.description ? ": " + k.description : ""}`).join("\n")
    : "";
  return body.replace(/^.*__DOCCARDLIST__.*$/m, list).replace(/^\s*<DocCardList\b[^>]*\/?>\s*$/m, list);
}

const index = [];

for (const p of pages) {
  const { abs, src, route, title } = p;

  const outRel = (route === "/" ? "/index" : route) + ".md";
  const outPath = join(BUILD_DIR, outRel.split("/").join(sep));
  mkdirSync(dirname(outPath), { recursive: true });

  // Strip frontmatter, clean MDX chrome, expand DocCardList, rewrite URLs, then
  // ensure exactly one leading H1.
  let body = deMdx(stripFrontmatter(src));
  body = expandDocCardList(body, route);
  body = rewriteUrls(body, abs, routeByFile, assetMap).trim();
  const firstLine = body.split("\n")[0] || "";
  if (!/^#\s/.test(firstLine)) {
    body = `# ${title}\n\n${body}`;
  }
  writeFileSync(outPath, body + "\n");

  index.push({ title, route, md: outRel });
}

// llms.txt: a simple, grouped index (the convention: H1 + section bullets).
const bySection = {};
for (const e of index) {
  const top = e.route.split("/")[1] || "root";
  (bySection[top] ||= []).push(e);
}
const order = ["learn", "integrate", "build", "validate", "community"];
const sections = Object.keys(bySection).sort(
  (a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99)
);

let llms = `# Osmosis Documentation\n\n`;
llms += `> Developer and user documentation for Osmosis, the cross-chain DEX and liquidity hub. `;
llms += `Each documentation page is available as plain markdown at its URL + ".md".\n\n`;

// Non-docs content (home, API reference) has no markdown copy; link the route.
if (EXTRA_PAGES.length) {
  llms += `## Overview\n`;
  for (const e of EXTRA_PAGES) {
    llms += `- [${e.title}](${SITE}${e.route}): ${e.note}\n`;
  }
  llms += `\n`;
}

for (const s of sections) {
  llms += `## ${s.charAt(0).toUpperCase() + s.slice(1)}\n`;
  for (const e of bySection[s].sort((a, b) => a.route.localeCompare(b.route))) {
    llms += `- [${e.title}](${SITE}${e.md}): ${e.route}\n`;
  }
  llms += `\n`;
}
writeFileSync(join(BUILD_DIR, "llms.txt"), llms);

// Coverage report against the built sitemap. Distinguish three states so the
// number is honest: routes with a real .md copy, routes only indexed as HTML
// (EXTRA_PAGES like the home page and /api, which have no markdown source), and
// genuinely uncovered routes that are not an intentional exclusion.
let coverage = "";
const sitemapPath = join(BUILD_DIR, "sitemap.xml");
if (existsSync(sitemapPath)) {
  const routes = [...readFileSync(sitemapPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(SITE, "").replace(/\/$/, "") || "/");
  const mdRoutes = new Set(index.map((e) => e.route));       // have a .md copy
  const htmlOnly = new Set(EXTRA_PAGES.map((e) => e.route));  // indexed, no .md
  const missing = routes.filter(
    (r) => !mdRoutes.has(r) && !htmlOnly.has(r) && !EXCLUDED_ROUTES.has(r)
  );
  const mdCount = routes.filter((r) => mdRoutes.has(r)).length;
  coverage =
    ` (${routes.length} sitemap routes: ${mdCount} with markdown, ` +
    `${htmlOnly.size} indexed HTML-only, ${EXCLUDED_ROUTES.size} excluded, ` +
    `${missing.length} uncovered${missing.length ? ": " + missing.join(", ") : ""})`;
}

console.log(`✔ wrote ${index.length} per-page .md files + llms.txt to build/${coverage}`);
