// Appends a permanent /page -> /page/ redirect for every page in the sitemap
// (which lists pages without the slash) to build/_redirects. The site's URLs end in a slash; Cloudflare's own
// trailing-slash handling redirects with a 307 (temporary), and these keep
// the permanent 308 search engines had from Vercel. Runs after the build.
import fs from "node:fs"

const sitemap = fs.readFileSync("build/sitemap.xml", "utf8")
const pages = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)]
  .map((m) => m[1].replace(/\/$/, ""))
  .filter((p) => p.length > 0)

const lines = pages.map((p) => `${p} ${p}/ 308`)
fs.appendFileSync(
  "build/_redirects",
  `\n# Trailing slash for every page (scripts/gen-redirects.mjs)\n${lines.join("\n")}\n`
)
console.log(`gen-redirects: ${lines.length} trailing-slash redirects`)
