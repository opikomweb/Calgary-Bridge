import type { Resource, ResourceCategory, Language } from "./types";

// Keyword synonyms map common everyday language to resource categories/services.
const keywordMappings: Record<string, string[]> = {
  childcare: ["family", "children", "daycare", "child care", "kids"],
  "child care": ["family", "children", "daycare", "childcare"],
  daycare: ["childcare", "family", "children"],
  kids: ["family", "children", "youth"],
  family: ["children", "kids", "parenting", "youth"],
  activities: ["recreation", "things to do", "attraction", "tour", "youth", "family"],
  recreation: ["activities", "youth", "tourism", "park"],
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
  business: ["small business", "entrepreneur", "startup", "register business", "incorporation"],
  register: ["business", "incorporation", "registry", "ownr"],
  incorporate: ["business", "incorporation", "registry"],
  ownr: ["business", "incorporation", "registry"],
  nuans: ["business", "incorporation", "name search"],
  shipping: ["logistics", "courier", "parcel", "freight", "delivery"],
  ship: ["logistics", "courier", "parcel", "shipping"],
  courier: ["logistics", "shipping", "parcel", "delivery"],
  parcel: ["logistics", "shipping", "courier"],
  freight: ["logistics", "shipping", "cargo", "import", "export"],
  "import export": ["logistics", "customs", "freight", "shipping"],
  import: ["logistics", "customs", "freight", "shipping"],
  export: ["logistics", "customs", "freight", "shipping"],
  customs: ["logistics", "import", "export"],
  volunteer: ["volunteering", "community"],
  tourist: ["tourism", "visit", "attraction", "sightseeing"],
  tourism: ["visit", "attraction", "sightseeing", "tour"],
  visit: ["tourism", "attraction", "sightseeing"],
  tour: ["tourism", "tours", "guide", "sightseeing"],
  sightseeing: ["tourism", "attraction", "tour"],
  attraction: ["tourism", "sightseeing"],
  hotel: ["tourism", "hotels", "lodging", "stay"],
  restaurant: ["tourism", "dining", "restaurants"],
  dining: ["tourism", "restaurant", "food"],
  // Sports & recreation
  sport: ["sports", "recreation", "fitness", "league"],
  sports: ["recreation", "fitness", "league", "social"],
  soccer: ["sports", "recreation", "community"],
  volleyball: ["sports", "recreation", "community"],
  pickleball: ["sports", "recreation", "senior", "community"],
  curling: ["sports", "recreation", "community", "cultural"],
  triathlon: ["sports", "recreation", "fitness"],
  "sport social": ["community", "recreation", "sports"],
  // Performing arts & culture
  jazz: ["arts", "music", "community"],
  concert: ["arts", "music", "community"],
  theatre: ["arts", "performing", "community"],
  theater: ["arts", "performing", "community"],
  orchestra: ["arts", "music", "community"],
  film: ["arts", "cinema", "community"],
  cinema: ["arts", "film", "community"],
  beakerhead: ["arts", "community", "science"],
  steam: ["arts", "education", "community"],
  // Community & giving
  "united way": ["community", "emergency", "social"],
  foundation: ["community", "grants", "charity"],
  rotary: ["community", "business", "volunteer"],
  donate: ["community", "volunteering"],
  charity: ["community", "emergency", "food"],
  // Tech & startup
  startup: ["business", "technology", "community"],
  cdl: ["business", "startup", "tech"],
  accelerator: ["business", "startup", "tech"],
  incubator: ["business", "startup", "tech"],
  "tech meetup": ["business", "community", "tech"],
  investor: ["business", "startup"],
  // Senior-specific
  "meals on wheels": ["senior", "food"],
  lodge: ["senior", "housing"],
  agecare: ["senior", "healthcare"],
  "home care": ["senior", "healthcare", "disability"],
  // Fitness
  gym: ["community", "healthcare", "recreation"],
  fitness: ["community", "healthcare", "recreation"],
  swimming: ["community", "recreation", "healthcare"],
  pool: ["community", "recreation", "healthcare"],
  climbing: ["community", "recreation", "sports"],
  // Moving & home services
  movers: ["essentials", "moving"],
  moving: ["essentials", "newcomer"],
  plumber: ["essentials", "home"],
  plumbing: ["essentials", "home"],
  electrician: ["essentials", "home"],
  electrical: ["essentials", "home"],
  locksmith: ["essentials", "home", "emergency"],
  lockout: ["essentials", "emergency"],
  restoration: ["essentials", "emergency"],
  "water damage": ["essentials", "emergency"],
  "fire damage": ["essentials", "emergency"],
  mould: ["essentials", "healthcare"],
  // Markets
  millarville: ["farmers-market", "food", "tourism"],
  bearspaw: ["farmers-market", "food"],
  kingsland: ["farmers-market", "food"],
  triwood: ["farmers-market", "food"],
  gourmet: ["food", "ethnic-market"],
  artisan: ["ethnic-market", "farmers-market"],
  deli: ["ethnic-market", "food"],
  butcher: ["ethnic-market", "food"],
  // Networking
  "business networking": ["business", "community"],
  "women networking": ["business", "community"],
  networking: ["community", "business"],
  ceo: ["business", "community"],
  entrepreneur: ["business", "community"],
  "project management": ["business", "community"],
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
  child: ["family", "youth"],
  parenting: ["family"],
  parent: ["family"],
  parents: ["family"],
  family: ["family"],
  families: ["family"],
  toddler: ["family"],
  toddlers: ["family"],
  // "activities / things to do" — recreation for families, youth and visitors.
  activities: ["tourism", "youth", "family"],
  activity: ["tourism", "youth", "family"],
  recreation: ["tourism", "youth", "family"],
  recreational: ["tourism", "youth", "family"],
  playground: ["family", "tourism"],
  playgroup: ["family"],
  fun: ["tourism", "youth", "family"],
  park: ["tourism", "family"],
  parks: ["tourism", "family"],
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
  register: ["business"],
  incorporate: ["business"],
  incorporation: ["business"],
  ownr: ["business"],
  nuans: ["business"],
  "register business": ["business"],
  shipping: ["logistics"],
  ship: ["logistics"],
  courier: ["logistics"],
  parcel: ["logistics"],
  freight: ["logistics"],
  cargo: ["logistics"],
  import: ["logistics"],
  export: ["logistics"],
  "import export": ["logistics"],
  customs: ["logistics"],
  logistics: ["logistics"],
  volunteer: ["volunteering"],
  volunteering: ["volunteering"],
  tourist: ["tourism"],
  tourism: ["tourism"],
  visit: ["tourism"],
  visiting: ["tourism"],
  tour: ["tourism"],
  tours: ["tourism"],
  sightseeing: ["tourism"],
  attraction: ["tourism"],
  attractions: ["tourism"],
  hotel: ["tourism"],
  hotels: ["tourism"],
  restaurant: ["tourism"],
  restaurants: ["tourism"],
  dining: ["tourism"],
  "things to do": ["tourism"],
  sightsee: ["tourism"],
  // ===== Previously-unmapped categories (these used to fall through to the
  // loose text-match path, pulling in unrelated resources) =====
  emergency: ["emergency"],
  urgent: ["emergency"],
  crisis: ["emergency", "mental-health"],
  distress: ["emergency", "mental-health"],
  community: ["community"],
  neighbourhood: ["community"],
  neighborhood: ["community"],
  meetup: ["community"],
  lgbtq: ["lgbtq"],
  lgbt: ["lgbtq"],
  gay: ["lgbtq"],
  lesbian: ["lgbtq"],
  queer: ["lgbtq"],
  transgender: ["lgbtq"],
  trans: ["lgbtq"],
  pride: ["lgbtq"],
  bisexual: ["lgbtq"],
  indigenous: ["indigenous"],
  "first nations": ["indigenous"],
  metis: ["indigenous"],
  inuit: ["indigenous"],
  aboriginal: ["indigenous"],
  native: ["indigenous"],
  art: ["arts"],
  arts: ["arts"],
  music: ["arts"],
  theatre: ["arts"],
  theater: ["arts"],
  gallery: ["arts"],
  museum: ["arts", "tourism"],
  culture: ["arts", "community"],
  cultural: ["arts", "community"],
  dance: ["arts"],
  creative: ["arts"],
  youth: ["youth"],
  teen: ["youth"],
  teenager: ["youth"],
  workspace: ["workspace"],
  coworking: ["workspace"],
  "co-working": ["workspace"],
  office: ["workspace"],
  desk: ["workspace"],
  studio: ["workspace", "arts"],
  storage: ["storage"],
  locker: ["storage"],
  warehouse: ["storage", "logistics"],
  "self storage": ["storage"],
  market: ["farmers-market", "ethnic-market"],
  "farmers market": ["farmers-market"],
  farmer: ["farmers-market"],
  farmers: ["farmers-market"],
  produce: ["farmers-market", "food"],
  halal: ["ethnic-market"],
  ethnic: ["ethnic-market"],
  "ethnic market": ["ethnic-market"],
  international: ["ethnic-market"],
  grocery: ["ethnic-market", "essentials", "food"],
  essentials: ["essentials"],
  household: ["essentials"],
  basics: ["essentials"],
  // Sports & recreation
  soccer: ["community"],
  volleyball: ["community"],
  pickleball: ["community", "senior"],
  curling: ["community"],
  triathlon: ["community"],
  "sport social": ["community"],
  // Performing arts & culture
  jazz: ["community"],
  concert: ["community"],
  orchestra: ["community"],
  film: ["community", "tourism"],
  cinema: ["community"],
  beakerhead: ["community", "tourism"],
  steam: ["community", "education"],
  // Community & giving
  "united way": ["community", "emergency"],
  foundation: ["community"],
  rotary: ["community", "business"],
  donate: ["community"],
  charity: ["community", "emergency"],
  // Tech & startup
  accelerator: ["business"],
  incubator: ["business"],
  "tech meetup": ["business", "community"],
  investor: ["business"],
  // Senior-specific
  "meals on wheels": ["senior", "food"],
  lodge: ["senior", "housing"],
  "home care": ["senior", "healthcare"],
  // Fitness
  gym: ["community", "healthcare"],
  fitness: ["community", "healthcare"],
  swimming: ["community"],
  pool: ["community"],
  climbing: ["community"],
  // Moving & home services
  movers: ["essentials"],
  moving: ["essentials", "newcomer"],
  plumber: ["essentials"],
  plumbing: ["essentials"],
  electrician: ["essentials"],
  electrical: ["essentials"],
  locksmith: ["essentials"],
  lockout: ["essentials", "emergency"],
  restoration: ["essentials", "emergency"],
  "water damage": ["essentials", "emergency"],
  "fire damage": ["essentials", "emergency"],
  mould: ["essentials"],
  // Markets
  millarville: ["farmers-market", "tourism"],
  bearspaw: ["farmers-market"],
  kingsland: ["farmers-market"],
  triwood: ["farmers-market"],
  gourmet: ["ethnic-market", "food"],
  artisan: ["ethnic-market", "farmers-market"],
  deli: ["ethnic-market"],
  butcher: ["ethnic-market"],
  // Networking
  "business networking": ["business", "community"],
  "women networking": ["business", "community"],
  networking: ["community", "business"],
  ceo: ["business"],
  "project management": ["business"],
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

    // Primary-category providers (the MAIN services for this category) must
    // always rank above resources that only list it as a secondary/related
    // category. A large fixed gap guarantees this regardless of priority.
    const isPrimary = matchIndex === 0;
    score += isPrimary ? 500 : 60;
    if (r.category.length === 1 && isPrimary) score += 25; // single-purpose focus

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
    // above social-media classifieds. Priority orders resources WITHIN a tier;
    // it is dampened for secondary matches so a high-priority "related" org
    // can never jump ahead of the category's main providers.
    if (r.priority) score += isPrimary ? r.priority : r.priority * 0.2;
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

  // Query present + "All" categories → straightforward ranked search.
  if (category === "all") return searchResources(list, rawQuery, activeLanguage);

  // Query present + a specific category selected. First honour BOTH:
  // search only within the chosen category.
  const scoped = searchResources(byCategory, rawQuery, activeLanguage);
  if (scoped.length > 0) return scoped;

  // CONFLICT FALLBACK: the words the user typed don't match the category they
  // picked (e.g. typing "I need childcare" while the Healthcare filter is on).
  // Rather than dead-ending on "0 results", honour what they actually typed and
  // search across every category so they still get relevant answers.
  return searchResources(list, rawQuery, activeLanguage);
}

// Maps each category to adjacent categories that often help with the same
// underlying need. Used to offer "similar categories" when a search is gated
// to a specific intent so users can broaden without starting over.
const relatedCategories: Record<ResourceCategory, ResourceCategory[]> = {
  housing: ["legal", "emergency", "newcomer", "essentials"],
  jobs: ["education", "business", "newcomer"],
  food: ["emergency", "farmers-market", "ethnic-market", "essentials", "community"],
  "mental-health": ["healthcare", "community", "youth", "emergency"],
  healthcare: ["mental-health", "senior", "disability", "emergency"],
  newcomer: ["education", "jobs", "community", "legal", "ethnic-market"],
  family: ["youth", "education", "community", "arts", "tourism"],
  senior: ["healthcare", "disability", "community", "transit"],
  disability: ["healthcare", "senior", "transit", "community"],
  transit: ["essentials", "community"],
  education: ["jobs", "newcomer", "youth", "family"],
  legal: ["housing", "newcomer", "emergency"],
  business: ["jobs", "workspace", "logistics", "storage"],
  volunteering: ["community", "arts", "youth"],
  emergency: ["housing", "food", "mental-health", "healthcare"],
  community: ["arts", "volunteering", "family", "youth", "indigenous", "lgbtq"],
  lgbtq: ["community", "mental-health", "youth", "healthcare"],
  indigenous: ["community", "arts", "healthcare", "education"],
  youth: ["family", "education", "arts", "community", "mental-health"],
  arts: ["community", "tourism", "youth", "family"],
  logistics: ["business", "storage", "workspace"],
  tourism: ["arts", "family", "community", "farmers-market"],
  workspace: ["business", "storage", "logistics"],
  storage: ["logistics", "business", "workspace"],
  "ethnic-market": ["farmers-market", "food", "essentials", "newcomer"],
  "farmers-market": ["ethnic-market", "food", "essentials", "tourism"],
  essentials: ["food", "farmers-market", "ethnic-market", "transit"],
};

export interface SimilarGroup {
  category: ResourceCategory;
  resources: Resource[];
}

/**
 * Returns resources from categories ADJACENT to a query's detected intent —
 * i.e. not an exact match but related/overlapping. Only runs when the query
 * clearly names a category, so we never surface random "similar" noise.
 * Excludes anything already shown in the main results.
 */
export function getSimilarResources(
  list: Resource[],
  rawQuery: string,
  activeLanguage: Language,
  excludeIds: Set<string>,
  maxGroups = 4,
  maxPerGroup = 3
): SimilarGroup[] {
  const query = rawQuery.toLowerCase().trim();
  if (!query) return [];

  const intents = detectIntents(query);
  if (intents.length === 0) return [];

  // Collect related categories (excluding the directly-matched intents).
  const relatedSet = new Set<ResourceCategory>();
  for (const intent of intents) {
    for (const rel of relatedCategories[intent] ?? []) {
      if (!intents.includes(rel)) relatedSet.add(rel);
    }
  }
  if (relatedSet.size === 0) return [];

  const groups: SimilarGroup[] = [];
  for (const cat of relatedSet) {
    const matches = list
      .filter((r) => !excludeIds.has(r.id) && r.category.includes(cat))
      .sort((a, b) => categoryRank(b, cat) - categoryRank(a, cat))
      .slice(0, maxPerGroup);
    if (matches.length > 0) groups.push({ category: cat, resources: matches });
  }

  // Show the richest groups first and cap how many we display.
  return groups
    .sort((a, b) => b.resources.length - a.resources.length)
    .slice(0, maxGroups);
}

/** Ranks a resource's relevance to a selected category filter. */
function categoryRank(r: Resource, category: ResourceCategory): number {
  let score = 0;
  const idx = r.category.indexOf(category);
  // Main providers (this is their PRIMARY category) always come before
  // resources that only list it as a secondary/related category. The large
  // gap guarantees ordering regardless of an individual resource's priority.
  const isPrimary = idx === 0;
  if (isPrimary) score += 500; // primary focus — main key providers first
  else if (idx > 0) score += 60; // secondary / related
  if (r.category.length === 1 && isPrimary) score += 20; // single-purpose provider
  if (r.featured) score += 6;
  if (r.cost === "free") score += 2;
  // Priority orders WITHIN a tier; dampened for secondary so related orgs
  // never leapfrog the category's primary providers.
  if (r.priority) score += isPrimary ? r.priority : r.priority * 0.2;
  return score;
}
