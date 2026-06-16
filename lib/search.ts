import type { Resource, ResourceCategory, Language } from "./types";

// Keyword synonyms map common everyday language to resource categories/services.
const keywordMappings: Record<string, string[]> = {
  childcare: ["family", "children", "daycare", "child care", "kids"],
  "child care": ["family", "children", "daycare", "childcare"],
  daycare: ["childcare", "family", "children"],
  kids: ["family", "children", "youth"],
  rent: ["housing", "rental", "tenant", "landlord"],
  rental: ["housing", "rent", "tenant"],
  apartment: ["housing", "rental"],
  eviction: ["housing", "tenant", "legal", "rent"],
  landlord: ["housing", "tenant", "legal"],
  homeless: ["housing", "shelter", "emergency"],
  shelter: ["housing", "emergency", "homeless"],
  doctor: ["healthcare", "medical", "clinic", "health"],
  hospital: ["healthcare", "medical", "emergency"],
  clinic: ["healthcare", "medical", "health"],
  health: ["healthcare", "medical", "clinic"],
  work: ["jobs", "employment", "career"],
  job: ["jobs", "employment", "career", "work"],
  jobs: ["employment", "career", "work", "hiring"],
  hiring: ["jobs", "employment", "career"],
  resume: ["jobs", "employment", "career"],
  immigrant: ["newcomer", "settlement", "immigration"],
  immigration: ["newcomer", "settlement"],
  refugee: ["newcomer", "settlement", "immigration"],
  newcomer: ["settlement", "immigration"],
  senior: ["elderly", "aging", "retirement"],
  elderly: ["senior", "aging"],
  "mental health": ["counseling", "therapy", "crisis", "mental-health"],
  counseling: ["mental-health", "therapy", "crisis"],
  therapy: ["mental-health", "counseling"],
  stress: ["mental-health", "counseling", "therapy"],
  food: ["food bank", "meals", "grocery", "nutrition"],
  "food bank": ["food", "meals", "grocery"],
  meal: ["food", "meals", "grocery"],
  hungry: ["food", "meals", "food bank"],
  legal: ["lawyer", "law", "court", "rights"],
  lawyer: ["legal", "law", "court"],
  rights: ["legal", "law"],
  bus: ["transit", "transportation", "ctrain"],
  train: ["transit", "transportation", "ctrain"],
  transit: ["transportation", "ctrain", "bus"],
  transportation: ["transit", "bus", "ctrain"],
  school: ["education", "learning", "classes"],
  classes: ["education", "learning", "language"],
  language: ["education", "newcomer", "esl"],
  disability: ["disabilities", "accessibility", "support"],
  business: ["small business", "entrepreneur", "startup"],
  volunteer: ["volunteering", "community"],
};

// Maps everyday search terms to the resource categories they should prioritize.
// This lets us rank dedicated providers (e.g. childcare centres) above
// organizations that merely mention the topic as a side service.
const categoryIntent: Record<string, ResourceCategory[]> = {
  childcare: ["family"],
  "child care": ["family"],
  daycare: ["family"],
  "day care": ["family"],
  kids: ["family", "youth"],
  children: ["family", "youth"],
  parenting: ["family"],
  rent: ["housing"],
  rental: ["housing"],
  apartment: ["housing"],
  eviction: ["housing", "legal"],
  landlord: ["housing", "legal"],
  homeless: ["housing", "emergency"],
  shelter: ["housing", "emergency"],
  doctor: ["healthcare"],
  hospital: ["healthcare", "emergency"],
  clinic: ["healthcare"],
  health: ["healthcare"],
  dentist: ["healthcare"],
  work: ["jobs"],
  job: ["jobs"],
  jobs: ["jobs"],
  hiring: ["jobs"],
  resume: ["jobs"],
  employment: ["jobs"],
  immigrant: ["newcomer"],
  immigration: ["newcomer"],
  refugee: ["newcomer"],
  newcomer: ["newcomer"],
  settlement: ["newcomer"],
  senior: ["senior"],
  elderly: ["senior"],
  "mental health": ["mental-health"],
  counseling: ["mental-health"],
  counselling: ["mental-health"],
  therapy: ["mental-health"],
  stress: ["mental-health"],
  food: ["food"],
  "food bank": ["food"],
  meal: ["food"],
  hungry: ["food"],
  groceries: ["food"],
  legal: ["legal"],
  lawyer: ["legal"],
  rights: ["legal"],
  bus: ["transit"],
  train: ["transit"],
  ctrain: ["transit"],
  transit: ["transit"],
  transportation: ["transit"],
  school: ["education"],
  classes: ["education"],
  language: ["education", "newcomer"],
  esl: ["education", "newcomer"],
  disability: ["disability"],
  disabilities: ["disability"],
  accessibility: ["disability"],
  business: ["business"],
  entrepreneur: ["business"],
  startup: ["business"],
  volunteer: ["volunteering"],
  volunteering: ["volunteering"],
};

function lc(s?: string) {
  return s?.toLowerCase() ?? "";
}

// Filler words that should never drive a match (so "I need childcare"
// matches on "childcare", not on "i" / "need").
const STOPWORDS = new Set([
  "i", "a", "an", "the", "to", "of", "for", "and", "or", "in", "on", "at", "is",
  "are", "am", "my", "me", "we", "us", "you", "need", "needs", "want", "wants",
  "looking", "look", "find", "finding", "help", "helps", "please", "some", "any",
  "near", "with", "how", "do", "does", "can", "get", "getting", "where", "what",
  "there", "here", "service", "services", "resource", "resources",
]);

function tokenize(query: string): string[] {
  return query
    .split(/[^a-z0-9]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Whole-word index of `needle` inside `haystack`, or -1.
function wordIndex(haystack: string, needle: string): number {
  const m = haystack.match(new RegExp(`\\b${escapeRe(needle)}\\b`));
  return m && m.index !== undefined ? m.index : -1;
}

/**
 * Detects which resource categories a free-text query is really asking for.
 * Scans for intent keywords ANYWHERE in the phrase (longest phrase first),
 * so "I need childcare" → ["family"] and "mental health support" →
 * ["mental-health"] without the word "health" also dragging in clinics.
 */
function detectIntents(query: string): ResourceCategory[] {
  const found = new Set<ResourceCategory>();
  const consumed: Array<[number, number]> = [];
  const keys = Object.keys(categoryIntent).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    const idx = wordIndex(query, key);
    if (idx === -1) continue;
    const end = idx + key.length;
    // Skip a shorter keyword fully contained in an already-matched longer one
    // (e.g. "health" inside "mental health").
    if (consumed.some(([s, e]) => idx >= s && end <= e)) continue;
    consumed.push([idx, end]);
    for (const c of categoryIntent[key]) found.add(c);
  }
  return [...found];
}

/**
 * Scores how relevant a resource is to a query. Higher = more relevant.
 * Returns 0 when the resource should be EXCLUDED.
 */
function scoreResource(
  r: Resource,
  query: string,
  tokens: string[],
  intents: ResourceCategory[],
  lang: Language
): number {
  const titleEn = lc(r.title.en);
  const titleLocal = lc(r.title[lang]);
  const descEn = lc(r.description.en);
  const descLocal = lc(r.description[lang]);
  const summary = lc(r.summary?.en) + " " + lc(r.summary?.[lang]);
  const services = (r.servicesOffered ?? []).map(lc);
  const haystack = `${titleEn} ${titleLocal} ${summary} ${descEn} ${descLocal} ${services.join(" ")}`;

  const titleHasQuery = titleEn.includes(query) || titleLocal.includes(query);
  const exactTitle = titleEn === query || titleLocal === query;

  let score = 0;
  if (exactTitle) score += 120;
  else if (titleEn.startsWith(query) || titleLocal.startsWith(query)) score += 80;
  else if (titleHasQuery) score += 60;

  // ===== Intent-gated path: the query clearly names a category =====
  if (intents.length > 0) {
    const matchIndex = r.category.findIndex((c) => intents.includes(c));

    if (matchIndex === -1) {
      // Resource does NOT belong to any requested category. Only keep it if the
      // user literally searched its name; otherwise exclude it entirely so
      // unrelated orgs (mental health, jobs, etc.) never leak into the results.
      return titleHasQuery ? score : 0;
    }

    // Primary-category providers are the most relevant; secondary far less.
    score += matchIndex === 0 ? 90 : 28;
    if (r.category.length === 1 && matchIndex === 0) score += 25; // single-purpose focus

    // Refine ranking by how directly the resource matches the meaningful
    // query tokens (e.g. a daycare whose services list "childcare").
    for (const t of tokens) {
      if (services.some((s) => s.includes(t))) score += 12;
      else if (titleEn.includes(t) || titleLocal.includes(t)) score += 14;
      else if (summary.includes(t) || descEn.includes(t) || descLocal.includes(t)) score += 5;
    }

    if (r.featured) score += 5;
    if (r.cost === "free") score += 2;
    // Trust ranking: vetted platforms (RentFaster, liv.rent, Boardwalk…) rank
    // above social-media classifieds (Kijiji, Facebook Marketplace).
    if (r.priority) score += r.priority;
    return score;
  }

  // ===== Generic text path: no category intent (e.g. searching a name) =====
  if (r.category.some((c) => c.toLowerCase() === query)) score += 30;

  for (const t of tokens) {
    if (titleEn.includes(t) || titleLocal.includes(t)) score += 18;
    else if (services.some((s) => s.includes(t))) score += 12;
    else if (summary.includes(t)) score += 6;
    else if (descEn.includes(t) || descLocal.includes(t)) score += 5;
  }

  // Synonym expansion fallback for everyday phrasing, only if nothing matched.
  if (score === 0) {
    for (const [keyword, synonyms] of Object.entries(keywordMappings)) {
      if (wordIndex(query, keyword) === -1) continue;
      const synHit =
        r.category.some((cat) =>
          synonyms.some((syn) => cat.toLowerCase().includes(syn) || syn.includes(cat.toLowerCase()))
        ) || synonyms.some((syn) => haystack.includes(syn));
      if (synHit) {
        score += 12;
        break;
      }
    }
  }

  if (score > 0) {
    if (r.featured) score += 5;
    if (r.cost === "free") score += 2;
    if (r.priority) score += r.priority;
  }
  return score;
}

/**
 * Rich, language-aware, relevance-RANKED search across all meaningful
 * resource fields. Results are sorted most-relevant first so dedicated
 * providers outrank organizations that only mention a topic in passing,
 * and off-topic resources are excluded when the query names a category.
 */
export function searchResources(
  list: Resource[],
  rawQuery: string,
  activeLanguage: Language
): Resource[] {
  const query = rawQuery.toLowerCase().trim();
  if (!query) return [];

  const tokens = tokenize(query);
  const intents = detectIntents(query);

  return list
    .map((r) => ({ r, score: scoreResource(r, query, tokens, intents, activeLanguage) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.r);
}

/** Filter a category + query combination, used by the Explore tab. */
export function filterResources(
  list: Resource[],
  category: ResourceCategory | "all",
  rawQuery: string,
  activeLanguage: Language
): Resource[] {
  const byCategory =
    category === "all"
      ? list
      : list.filter((r) => r.category.includes(category as ResourceCategory));

  if (!rawQuery.trim()) {
    // No query: rank so resources that LEAD with this category (and are
    // single-purpose / featured) appear before tangential matches.
    if (category === "all") return byCategory;
    return [...byCategory].sort((a, b) => categoryRank(b, category) - categoryRank(a, category));
  }

  return searchResources(byCategory, rawQuery, activeLanguage);
}

/** Ranks a resource's relevance to a selected category filter. */
function categoryRank(r: Resource, category: ResourceCategory): number {
  let score = 0;
  const idx = r.category.indexOf(category);
  if (idx === 0) score += 40; // primary focus
  else if (idx > 0) score += 12; // secondary focus
  if (r.category.length === 1 && idx === 0) score += 20; // single-purpose provider
  if (r.featured) score += 6;
  if (r.cost === "free") score += 2;
  if (r.priority) score += r.priority;
  return score;
}
