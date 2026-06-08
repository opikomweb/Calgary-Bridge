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

/**
 * Scores how relevant a resource is to a query. Higher = more relevant.
 * Returns 0 when there is no match at all (the resource is excluded).
 */
function scoreResource(r: Resource, query: string, lang: Language): number {
  const titleEn = lc(r.title.en);
  const titleLocal = lc(r.title[lang]);
  const descEn = lc(r.description.en);
  const descLocal = lc(r.description[lang]);
  const summary = lc(r.summary?.en) + " " + lc(r.summary?.[lang]);
  const services = (r.servicesOffered ?? []).map(lc);

  let score = 0;

  // --- Title matches (strongest signal) ---
  if (titleEn === query || titleLocal === query) score += 120;
  else if (titleEn.startsWith(query) || titleLocal.startsWith(query)) score += 80;
  else if (titleEn.includes(query) || titleLocal.includes(query)) score += 60;

  // --- Category intent: does the query point to a category this resource leads with? ---
  const intendedCategories = categoryIntent[query] ?? [];
  if (intendedCategories.length > 0) {
    const matchIndex = r.category.findIndex((c) => intendedCategories.includes(c));
    if (matchIndex === 0) {
      // Resource's PRIMARY category matches the intent — most relevant.
      score += 70;
    } else if (matchIndex > 0) {
      // Matches, but it's a secondary focus (e.g. CIWA's "family" tag) — lower.
      score += 22;
    }
    // Single-purpose providers (only the intended category) get a focus bonus.
    if (r.category.length === 1 && matchIndex === 0) score += 25;
  }

  // --- Direct category name match ---
  if (r.category.some((c) => c.toLowerCase().includes(query) || query.includes(c.toLowerCase()))) {
    score += 18;
  }

  // --- Services offered ---
  if (services.some((s) => s === query)) score += 30;
  else if (services.some((s) => s.includes(query))) score += 16;

  // --- Summary / description (weakest, often incidental mentions) ---
  if (summary.includes(query)) score += 8;
  if (descEn.includes(query) || descLocal.includes(query)) score += 6;

  // --- Eligibility & user types ---
  if (lc(r.eligibility?.en).includes(query) || lc(r.eligibility?.[lang]).includes(query)) score += 4;
  if (r.userTypes?.some((t) => t.toLowerCase().includes(query) || query.includes(t.toLowerCase())))
    score += 4;

  // --- Keyword synonym fallback (only if nothing stronger matched) ---
  if (score === 0) {
    for (const [keyword, synonyms] of Object.entries(keywordMappings)) {
      if (!query.includes(keyword)) continue;
      const synHit =
        r.category.some((cat) =>
          synonyms.some((syn) => cat.toLowerCase().includes(syn) || syn.includes(cat.toLowerCase()))
        ) ||
        services.some((service) => synonyms.some((syn) => service.includes(syn))) ||
        synonyms.some((syn) => titleEn.includes(syn) || descEn.includes(syn));
      if (synHit) {
        score += 12;
        break;
      }
    }
  }

  // --- Small quality boosts so verified/featured resources lead ties ---
  if (score > 0) {
    if (r.featured) score += 5;
    if (r.cost === "free") score += 2;
  }

  return score;
}

/**
 * Rich, language-aware, relevance-RANKED search across all meaningful
 * resource fields. Results are sorted most-relevant first so dedicated
 * providers outrank organizations that only mention a topic in passing.
 */
export function searchResources(
  list: Resource[],
  rawQuery: string,
  activeLanguage: Language
): Resource[] {
  const query = rawQuery.toLowerCase().trim();
  if (!query) return [];

  return list
    .map((r) => ({ r, score: scoreResource(r, query, activeLanguage) }))
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
  return score;
}
