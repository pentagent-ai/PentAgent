// Builds public/docs/search-index.json from the docs pages, so search works offline
// with no external service. Runs before `dev` and `build` (see package.json).
//
// It reads app/docs/**/page.tsx with the TypeScript parser and splits each page into
// sections at every <H2 id> / <H3 id>. Each section keeps its heading, anchor and text.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = path.join(root, "app", "docs");
const outFile = path.join(root, "public", "docs", "search-index.json");

// Load the nav config (TypeScript) to get page titles and groups.
const ENTITIES = { rsquo: "\u2019", lsquo: "\u2018", rdquo: "\u201d", ldquo: "\u201c", apos: "'", quot: '"', amp: "&", lt: "<", gt: ">", nbsp: " ", mdash: "\u2014", ndash: "\u2013", hellip: "\u2026", rsaquo: "\u203a" };
function decodeEntities(t) {
  return t.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") return String.fromCodePoint(e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

function loadNav() {
  const src = fs.readFileSync(path.join(root, "lib", "docs", "nav.ts"), "utf8");
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const mod = { exports: {} };
  new Function("module", "exports", js)(mod, mod.exports);
  return mod.exports.publishedNav();
}

function walkPages(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkPages(full));
    else if (entry.name === "page.tsx") out.push(full);
  }
  return out;
}

const SKIP_ATTRS = new Set(["className", "href", "src", "id", "width", "height", "maxWidth", "kind", "lang", "key", "style", "target", "rel", "keys"]);
const TEXT_ATTRS = new Set(["title", "caption", "alt", "code"]);
const SKIP_PROPS = new Set(["href", "src", "id", "className", "kind", "lang", "anchor"]);

function tagName(node) {
  const open = ts.isJsxElement(node) ? node.openingElement : node;
  return open.tagName.getText();
}

function attr(node, name) {
  const open = ts.isJsxElement(node) ? node.openingElement : node;
  for (const p of open.attributes.properties) {
    if (ts.isJsxAttribute(p) && p.name.getText() === name && p.initializer && ts.isStringLiteral(p.initializer)) {
      return p.initializer.text;
    }
  }
  return null;
}

function collectText(node, push) {
  if (ts.isJsxText(node)) {
    const t = decodeEntities(node.getText()).replace(/\s+/g, " ");
    if (t.trim()) push(t);
    return;
  }
  if (ts.isJsxAttribute(node)) {
    const name = node.name.getText();
    if (SKIP_ATTRS.has(name)) return;
    if (TEXT_ATTRS.has(name) && node.initializer && ts.isStringLiteral(node.initializer)) {
      push(` ${node.initializer.text} `);
      return;
    }
  }
  if (ts.isPropertyAssignment(node) && SKIP_PROPS.has(node.name.getText())) return;
  if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && insideJsxOrData(node)) {
    push(` ${node.text} `);
    return;
  }
  ts.forEachChild(node, (c) => collectText(c, push));
}

function insideJsxOrData(node) {
  let p = node.parent;
  while (p) {
    if (ts.isJsxExpression(p)) return true;
    if (ts.isImportDeclaration(p) || ts.isExportAssignment(p)) return false;
    if (ts.isVariableDeclaration(p) && p.name.getText() === "metadata") return false;
    p = p.parent;
  }
  return false;
}

function indexPage(file, meta) {
  const src = fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const sections = [{ heading: meta.heading, anchor: "", parts: [meta.description ?? ""] }];

  function visit(node) {
    if ((ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) && /^(H2|H3|h2|h3)$/.test(tagName(node))) {
      const id = attr(node, "id");
      if (id) {
        const parts = [];
        collectText(node, (t) => parts.push(t));
        sections.push({ heading: parts.join("").replace(/\s+/g, " ").trim(), anchor: id, parts: [] });
        return;
      }
    }
    if (ts.isJsxText(node) || ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isJsxAttribute(node) || ts.isPropertyAssignment(node)) {
      collectText(node, (t) => sections[sections.length - 1].parts.push(t));
      return;
    }
    ts.forEachChild(node, visit);
  }
  // Only the default-export component body (skip imports and metadata).
  sf.statements.forEach((s) => {
    if (ts.isImportDeclaration(s)) return;
    if (ts.isVariableStatement(s) && s.declarationList.declarations.some((d) => d.name.getText() === "metadata")) return;
    visit(s);
  });

  return sections.map((s) => ({
    href: meta.href,
    anchor: s.anchor,
    page: meta.page,
    group: meta.group,
    heading: s.heading,
    text: s.parts.join("").replace(/\s+/g, " ").replace(/\s([.,;:!?)])/g, "$1").trim().slice(0, 2000),
  }));
}

const nav = loadNav();
const byHref = new Map();
for (const g of nav) for (const item of g.items) byHref.set(item.href, { ...item, group: g.title });

const entries = [];
for (const file of walkPages(docsDir)) {
  const rel = path.relative(docsDir, path.dirname(file)).split(path.sep).join("/");
  const href = rel ? `/docs/${rel}` : "/docs";
  const item = byHref.get(href);
  const page = href === "/docs" ? "Introduction" : item ? (item.title === "Overview" ? item.group : item.title) : null;
  if (!page) continue; // not published in the nav: keep it out of search
  entries.push(
    ...indexPage(file, {
      href,
      page,
      group: href === "/docs" ? "Docs" : item.group,
      heading: page,
      description: item?.description,
    }),
  );
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(entries));
console.log(`docs search index: ${entries.length} sections -> ${path.relative(root, outFile)}`);
