// One-time codemod: removes baked-in static translations for tl, es, ar, zh
// from lib/calgary-resources.ts.
//
// WHY: These 4 languages had hand-written (low-quality, often incomplete)
// translations hardcoded directly in the LocalizedString objects for
// title/description/eligibility. Because `resolveField()` in
// components/resource-card.tsx does `record[lang] ?? record.en`, having ANY
// entry for a language — even a bad one — permanently blocks that field from
// ever reaching the good, contextual Gemini translation pipeline
// (translateDynamic -> /api/translate), which only runs when the static
// lookup falls through to English. The other 7 languages (pa, uk, ru, am,
// ar... wait so, sw, zh-CN) never had static entries, so they already get
// the good dynamic pipeline — this script brings tl/es/ar/zh in line with them.
//
// Only removes keys on `title`, `description`, `eligibility`, and `summary`
// object literals — never touches `en`, and never touches unrelated object
// literals elsewhere in the file (e.g. servicesOffered arrays).
//
// Usage: node scripts/strip-static-resource-translations.mjs [--dry-run]

import { Project, SyntaxKind } from "ts-morph";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGET_FILE = path.join(__dirname, "..", "lib", "calgary-resources.ts");
const STRIP_LANGS = new Set(["tl", "es", "ar", "zh"]);
const LOCALIZED_PROPS = new Set(["title", "description", "eligibility", "summary"]);

const dryRun = process.argv.includes("--dry-run");

const project = new Project({
  tsConfigFilePath: path.join(__dirname, "..", "tsconfig.json"),
  skipAddingFilesFromTsConfig: true,
});
const sourceFile = project.addSourceFileAtPath(TARGET_FILE);

let removedCount = 0;
const removedByLang = { tl: 0, es: 0, ar: 0, zh: 0 };
const sampleRemovals = [];

// Walk every PropertyAssignment in the file (e.g. `title: { en: "...", tl: "..." }`)
sourceFile.forEachDescendant((node) => {
  if (!node.asKind(SyntaxKind.PropertyAssignment)) return;
  const prop = node.asKind(SyntaxKind.PropertyAssignment);
  const propName = prop.getName();
  if (!LOCALIZED_PROPS.has(propName)) return;

  const initializer = prop.getInitializer();
  if (!initializer || initializer.getKind() !== SyntaxKind.ObjectLiteralExpression) return;
  const objLit = initializer.asKind(SyntaxKind.ObjectLiteralExpression);

  // Iterate in reverse so removing a property doesn't shift indices of
  // properties we haven't visited yet.
  const props = objLit.getProperties();
  for (let i = props.length - 1; i >= 0; i--) {
    const p = props[i];
    const pa = p.asKind(SyntaxKind.PropertyAssignment);
    if (!pa) continue;
    const key = pa.getName().replace(/^["']|["']$/g, "");
    if (STRIP_LANGS.has(key)) {
      if (sampleRemovals.length < 8) {
        sampleRemovals.push(`${propName}.${key} = ${pa.getInitializer()?.getText().slice(0, 60)}...`);
      }
      removedByLang[key] = (removedByLang[key] ?? 0) + 1;
      removedCount++;
      if (!dryRun) pa.remove();
    }
  }
});

console.log(`${dryRun ? "[dry-run] Would remove" : "Removed"} ${removedCount} static translation entries:`);
console.log(removedByLang);
console.log("\nSample removals:");
sampleRemovals.forEach((s) => console.log(`  - ${s}`));

if (!dryRun) {
  sourceFile.saveSync();
  console.log(`\nSaved ${TARGET_FILE}`);
} else {
  console.log("\nDry run only — no changes written. Re-run without --dry-run to apply.");
}
