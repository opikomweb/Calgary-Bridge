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

/**
 * Rich, language-aware search across all meaningful resource fields,
 * including category names, services, eligibility, user types, and
 * everyday-language keyword synonyms.
 */
export function searchResources(
  list: Resource[],
  rawQuery: string,
  activeLanguage: Language
): Resource[] {
  const query = rawQuery.toLowerCase().trim();
  if (!query) return [];

  return list.filter((r) => {
    const titleMatch =
      r.title[activeLanguage]?.toLowerCase().includes(query) ||
      r.title.en?.toLowerCase().includes(query);

    const descMatch =
      r.description[activeLanguage]?.toLowerCase().includes(query) ||
      r.description.en?.toLowerCase().includes(query);

    const summaryMatch =
      r.summary?.[activeLanguage]?.toLowerCase().includes(query) ||
      r.summary?.en?.toLowerCase().includes(query);

    const categoryMatch = r.category.some(
      (cat) => cat.toLowerCase().includes(query) || query.includes(cat.toLowerCase())
    );

    const servicesMatch = r.servicesOffered?.some((service) =>
      service.toLowerCase().includes(query)
    );

    const eligibilityMatch =
      r.eligibility?.[activeLanguage]?.toLowerCase().includes(query) ||
      r.eligibility?.en?.toLowerCase().includes(query);

    const userTypeMatch = r.userTypes?.some(
      (type) => type.toLowerCase().includes(query) || query.includes(type.toLowerCase())
    );

    // Keyword synonym matching
    let keywordMatch = false;
    for (const [keyword, synonyms] of Object.entries(keywordMappings)) {
      if (query.includes(keyword)) {
        keywordMatch =
          r.category.some((cat) =>
            synonyms.some(
              (syn) => cat.toLowerCase().includes(syn) || syn.includes(cat.toLowerCase())
            )
          ) ||
          r.servicesOffered?.some((service) =>
            synonyms.some((syn) => service.toLowerCase().includes(syn))
          ) ||
          synonyms.some(
            (syn) =>
              r.title.en?.toLowerCase().includes(syn) ||
              r.description.en?.toLowerCase().includes(syn)
          );
        if (keywordMatch) break;
      }
    }

    return (
      titleMatch ||
      descMatch ||
      summaryMatch ||
      categoryMatch ||
      servicesMatch ||
      eligibilityMatch ||
      userTypeMatch ||
      keywordMatch
    );
  });
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

  if (!rawQuery.trim()) return byCategory;

  return searchResources(byCategory, rawQuery, activeLanguage);
}
