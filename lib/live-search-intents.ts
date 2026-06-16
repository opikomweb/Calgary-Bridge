import type { ResourceCategory } from "./types";

/**
 * Defines how each category should be searched live on Google Maps.
 *
 * - `query`: the text query sent to the Places API (Calgary-scoped server-side).
 * - `includedType`: optional Places primaryType to hard-restrict results
 *   (keeps e.g. childcare to actual child_care_agency listings).
 * - `allowTypes`: primaryTypes considered on-topic during post-filtering.
 * - `mustMatch`: at least one of these keywords must appear in the name OR
 *   primaryType. Prevents random/unrelated orgs from leaking in.
 * - `exclude`: if any of these appear in the name, the result is dropped
 *   (filters out unrelated charities/NGOs/businesses).
 */
export interface LiveSearchIntent {
  query: string;
  includedType?: string;
  allowTypes: string[];
  mustMatch: string[];
  exclude?: string[];
  label: string;
}

export const LIVE_SEARCH_INTENTS: Record<ResourceCategory, LiveSearchIntent> = {
  family: {
    label: "Childcare & family centres",
    query: "licensed daycare childcare and child care centre",
    includedType: "child_care_agency",
    allowTypes: ["child_care_agency", "preschool", "school"],
    mustMatch: [
      "daycare",
      "child care",
      "childcare",
      "child development",
      "early learning",
      "preschool",
      "montessori",
      "kids",
      "children",
      "learning centre",
      "learning center",
      "child_care",
    ],
    exclude: ["adult", "dog", "pet", "veterinary", "auto"],
  },
  healthcare: {
    label: "Clinics & medical care",
    query: "walk-in medical clinic and family doctor",
    includedType: "doctor",
    allowTypes: ["doctor", "hospital", "medical_lab", "pharmacy", "dental_clinic"],
    mustMatch: ["clinic", "medical", "health", "doctor", "physician", "care", "walk-in", "walk in"],
    exclude: ["pet", "animal", "veterinary", "dog", "cat"],
  },
  "mental-health": {
    label: "Counselling & mental health",
    query: "mental health counselling and therapy services",
    includedType: "psychologist",
    allowTypes: ["psychologist", "doctor", "health"],
    mustMatch: ["counsel", "therapy", "psycholog", "mental", "wellness", "psychotherap"],
    exclude: ["physiotherapy", "massage", "physio", "spa"],
  },
  housing: {
    label: "Housing & rental help",
    query: "affordable housing and rental assistance office",
    allowTypes: ["real_estate_agency", "local_government_office", "point_of_interest"],
    mustMatch: ["housing", "rental", "rent", "apartment", "homes", "residences", "shelter", "accommodation"],
    exclude: ["luxury", "vacation", "hotel", "motel"],
  },
  food: {
    label: "Food banks & meal programs",
    query: "food bank and community meal program",
    allowTypes: ["point_of_interest", "establishment", "store"],
    mustMatch: ["food bank", "food", "meal", "pantry", "soup kitchen", "groceries", "nourish"],
    exclude: ["restaurant", "fast food", "cafe", "grocery store", "supermarket"],
  },
  jobs: {
    label: "Employment & job centres",
    query: "employment services and job search centre",
    allowTypes: ["point_of_interest", "establishment", "local_government_office"],
    mustMatch: ["employ", "job", "career", "work", "training", "staffing", "recruit"],
    exclude: [],
  },
  newcomer: {
    label: "Newcomer & settlement services",
    query: "immigrant and newcomer settlement services agency",
    allowTypes: ["point_of_interest", "establishment", "local_government_office"],
    // Strictly newcomer-focused. Random charities are dropped unless they
    // clearly relate to immigrants/newcomers/settlement.
    mustMatch: [
      "immigrant",
      "immigration",
      "newcomer",
      "settlement",
      "refugee",
      "migrant",
      "multicultural",
      "intercultural",
      "ethno-cultural",
      "ethnocultural",
    ],
    exclude: [],
  },
  senior: {
    label: "Senior services & centres",
    query: "senior services and seniors centre",
    allowTypes: ["point_of_interest", "establishment"],
    mustMatch: ["senior", "elder", "aging", "55+", "older adult"],
    exclude: [],
  },
  disability: {
    label: "Disability support services",
    query: "disability support services and accessibility centre",
    allowTypes: ["point_of_interest", "establishment"],
    mustMatch: ["disabilit", "accessib", "inclusion", "special needs", "rehabilitation", "assistive"],
    exclude: [],
  },
  legal: {
    label: "Legal aid & clinics",
    query: "legal aid clinic and free legal services",
    includedType: "lawyer",
    allowTypes: ["lawyer", "local_government_office", "point_of_interest"],
    mustMatch: ["legal", "law", "lawyer", "justice", "rights", "advocacy", "aid"],
    exclude: [],
  },
  education: {
    label: "Education & language classes",
    query: "adult education and English language classes",
    allowTypes: ["school", "university", "point_of_interest"],
    mustMatch: ["education", "language", "english", "esl", "lessons", "classes", "learning", "literacy", "school", "college"],
    exclude: [],
  },
  transit: {
    label: "Transit & transportation",
    query: "public transit station and transportation services",
    allowTypes: ["transit_station", "train_station", "bus_station", "subway_station"],
    mustMatch: ["transit", "station", "ctrain", "lrt", "bus", "transportation"],
    exclude: [],
  },
  emergency: {
    label: "Emergency & crisis services",
    query: "emergency crisis support and shelter services",
    allowTypes: ["point_of_interest", "establishment", "hospital", "police"],
    mustMatch: ["emergency", "crisis", "shelter", "distress", "helpline", "safe", "urgent"],
    exclude: [],
  },
  business: {
    label: "Business & entrepreneur support",
    query: "small business support and entrepreneur resources",
    allowTypes: ["point_of_interest", "establishment", "local_government_office"],
    mustMatch: ["business", "entrepreneur", "startup", "incubator", "commerce", "enterprise"],
    exclude: [],
  },
  volunteering: {
    label: "Volunteering opportunities",
    query: "volunteer centre and community volunteering opportunities",
    allowTypes: ["point_of_interest", "establishment"],
    mustMatch: ["volunteer", "community service", "giving"],
    exclude: [],
  },
  community: {
    label: "Community centres",
    query: "community centre and neighbourhood association",
    allowTypes: ["community_center", "point_of_interest", "establishment", "local_government_office"],
    mustMatch: ["community", "neighbourhood", "neighborhood", "association", "centre", "center", "hub"],
    exclude: [],
  },
  youth: {
    label: "Youth programs & services",
    query: "youth services and programs for teens",
    allowTypes: ["point_of_interest", "establishment"],
    mustMatch: ["youth", "teen", "young", "boys", "girls", "club"],
    exclude: [],
  },
  lgbtq: {
    label: "2SLGBTQ+ support",
    query: "2SLGBTQ community support and resource centre",
    allowTypes: ["point_of_interest", "establishment"],
    mustMatch: ["lgbtq", "lgbtq2", "2slgbtq", "pride", "queer", "gender", "rainbow"],
    exclude: [],
  },
  indigenous: {
    label: "Indigenous services",
    query: "Indigenous friendship centre and support services",
    allowTypes: ["point_of_interest", "establishment"],
    mustMatch: ["indigenous", "first nation", "métis", "metis", "inuit", "aboriginal", "native", "friendship centre"],
    exclude: [],
  },
  arts: {
    label: "Arts & culture",
    query: "community arts and culture centre",
    allowTypes: ["art_gallery", "performing_arts_theater", "point_of_interest", "establishment"],
    mustMatch: ["art", "culture", "gallery", "studio", "theatre", "theater", "music", "creative"],
    exclude: [],
  },
  logistics: {
    label: "Shipping & courier services",
    query: "shipping courier and parcel service",
    allowTypes: ["courier_service", "post_office", "moving_company", "storage", "establishment"],
    mustMatch: ["ship", "courier", "parcel", "cargo", "freight", "logistics", "post", "mail", "delivery"],
    exclude: ["restaurant", "food delivery", "pizza"],
  },
};

/**
 * Builds a live-search intent from a free-text query when no category
 * intent fits. We still keep it tightly on-topic by requiring the result
 * name/type to relate to the query terms.
 */
export function buildQueryIntent(rawQuery: string): LiveSearchIntent {
  const q = rawQuery.trim();
  const terms = q
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 2);
  return {
    label: `Results for "${q}"`,
    query: `${q} in Calgary`,
    allowTypes: [],
    mustMatch: terms.length ? terms : [q.toLowerCase()],
    exclude: [],
  };
}
