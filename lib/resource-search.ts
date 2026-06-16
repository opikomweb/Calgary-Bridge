import { calgaryResources } from "./calgary-resources";
import type { Resource, ResourceCategory } from "./types";

// Maps free-text query words to resource categories so a question like
// "I lost my job and can't pay rent" boosts BOTH jobs and housing resources.
const KEYWORD_TO_CATEGORY: Record<string, ResourceCategory[]> = {
  housing: ["housing"], rent: ["housing"], apartment: ["housing"], home: ["housing"],
  shelter: ["housing", "emergency"], homeless: ["housing", "emergency"], evict: ["housing", "legal"],
  job: ["jobs"], work: ["jobs"], employment: ["jobs"], career: ["jobs"], resume: ["jobs"],
  hire: ["jobs"], hiring: ["jobs"], training: ["jobs", "education"], apprentice: ["jobs", "education"],
  health: ["healthcare"], doctor: ["healthcare"], medical: ["healthcare"], clinic: ["healthcare"],
  hospital: ["healthcare"], dentist: ["healthcare"], insurance: ["healthcare"],
  mental: ["mental-health"], anxiety: ["mental-health"], depression: ["mental-health"],
  counseling: ["mental-health"], counselling: ["mental-health"], therapy: ["mental-health"],
  stress: ["mental-health"], crisis: ["mental-health", "emergency"], suicide: ["mental-health", "emergency"],
  food: ["food"], hungry: ["food"], grocery: ["food"], meal: ["food"], bank: ["food"],
  newcomer: ["newcomer"], immigrant: ["newcomer"], refugee: ["newcomer"], settlement: ["newcomer"],
  esl: ["newcomer", "education"], english: ["newcomer", "education"], visa: ["newcomer"],
  legal: ["legal"], lawyer: ["legal"], law: ["legal"], tenant: ["legal", "housing"], rights: ["legal"],
  court: ["legal"], transit: ["transit"], bus: ["transit"], train: ["transit"], ctrain: ["transit"],
  pass: ["transit"], education: ["education"], school: ["education"], class: ["education"],
  course: ["education"], college: ["education"], university: ["education"], tuition: ["education"],
  senior: ["senior"], elderly: ["senior"], retirement: ["senior"],
  family: ["family"], child: ["family"], childcare: ["family"], kids: ["family"], daycare: ["family"],
  disability: ["disability"], accessible: ["disability"], aish: ["disability"],
  youth: ["youth"], teen: ["youth"], lgbtq: ["lgbtq"], queer: ["lgbtq"], indigenous: ["indigenous"],
  business: ["business"], startup: ["business"], entrepreneur: ["business"],
  volunteer: ["volunteering"], donate: ["volunteering"], community: ["community"],
  emergency: ["emergency"], "911": ["emergency"], "211": ["community"],
  visit: ["tourism"], tourist: ["tourism"], tour: ["tourism"], sightsee: ["tourism"],
  hotel: ["tourism"], restaurant: ["tourism"], attraction: ["tourism"], banff: ["tourism"],
  rockies: ["tourism"], tax: ["community"], arts: ["arts"], art: ["arts"],
};

const STOPWORDS = new Set([
  "the","a","an","and","or","but","to","of","in","on","at","for","with","my","i","is","are",
  "do","how","what","where","can","need","find","get","help","me","you","please","want","im",
  "i'm","about","near","some","any","this","that","there","here","looking","new","be","have",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

/**
 * Scores EVERY resource in the catalog against the query and returns the best
 * candidates. This is what lets the AI guide pull from all site content rather
 * than a handful of hardcoded answers.
 */
export function findCandidateResources(query: string, limit = 28): Resource[] {
  const words = tokenize(query);

  // Categories implied by the query keywords.
  const impliedCategories = new Set<ResourceCategory>();
  for (const w of words) {
    const cats = KEYWORD_TO_CATEGORY[w];
    if (cats) cats.forEach((c) => impliedCategories.add(c));
  }

  const scored = calgaryResources.map((r) => {
    let score = 0;
    const title = r.title.en.toLowerCase();
    const desc = (r.description.en + " " + (r.summary?.en ?? "")).toLowerCase();
    const services = (r.servicesOffered ?? []).join(" ").toLowerCase();
    const source = (r.source ?? "").toLowerCase();

    for (const w of words) {
      if (title.includes(w)) score += 6;
      if (services.includes(w)) score += 3;
      if (desc.includes(w)) score += 2;
      if (source.includes(w)) score += 1;
    }
    for (const c of r.category) {
      if (impliedCategories.has(c)) score += 5;
    }
    if (score > 0) {
      if (r.featured) score += 1.5;
      if (typeof r.priority === "number") score += r.priority * 0.4;
    }
    return { r, score };
  });

  const matches = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.r);

  // Always give the model something to work with.
  if (matches.length === 0) {
    return calgaryResources.filter((r) => r.featured).slice(0, 6);
  }
  return matches;
}

/** Compact, token-efficient view of a resource for the model prompt. */
export function serializeForPrompt(resources: Resource[]): string {
  return resources
    .map((r) => {
      const parts = [
        `id: ${r.id}`,
        `name: ${r.title.en}`,
        `categories: ${r.category.join(", ")}`,
        r.cost ? `cost: ${r.cost}` : "",
        r.phone ? `phone: ${r.phone}` : "",
        r.website ? `website: ${r.website}` : "",
        r.address ? `address: ${r.address}` : "",
        `about: ${r.description.en.slice(0, 220)}`,
      ].filter(Boolean);
      return "- " + parts.join(" | ");
    })
    .join("\n");
}

export const ALL_CATEGORIES: ResourceCategory[] = [
  "housing","jobs","food","mental-health","healthcare","newcomer","family","senior",
  "disability","transit","education","legal","business","volunteering","emergency",
  "community","lgbtq","indigenous","youth","arts","tourism","essentials",
];
