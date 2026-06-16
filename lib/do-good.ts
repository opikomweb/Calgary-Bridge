// Curated, researched "Do Good" content for Calgary residents.
// Organizations, links, and programs verified from official Calgary/Alberta
// non-profit websites. Last reviewed: June 2026.

export type DoGoodSection =
  | "volunteer"
  | "donate"
  | "sponsor"
  | "city"
  | "learn";

export interface DoGoodItem {
  id: string;
  name: string;
  /** Short description of the organization or program. */
  description: string;
  /** The specific way a resident can help / what's needed. */
  need: string;
  /** Typical time or money commitment, kept realistic. */
  commitment?: string;
  /** Where to apply / give / act. */
  href: string;
  /** Button label, e.g. "Apply to volunteer". */
  action: string;
}

export interface DoGoodCategory {
  id: DoGoodSection;
  title: string;
  tagline: string;
  /** Lucide icon name used by the tab. */
  icon: "HandHeart" | "Gift" | "Users" | "Building2" | "GraduationCap";
  /** Solid accent hex for the category header. */
  accent: string;
  items: DoGoodItem[];
}

export const doGoodCategories: DoGoodCategory[] = [
  {
    id: "volunteer",
    title: "Volunteer your time",
    tagline:
      "Trusted Calgary organizations that need hands every week. Most provide training — no experience required.",
    icon: "HandHeart",
    accent: "#E1251B",
    items: [
      {
        id: "volunteer-connector",
        name: "Propellus — Volunteer Connector",
        description:
          "Calgary's central volunteer-matching hub. Filter hundreds of live opportunities by cause, schedule, and skill, then apply directly to organizations across the city.",
        need: "Browse and match to any cause you care about",
        commitment: "Flexible — one-time or ongoing",
        href: "https://www.volunteerconnector.org",
        action: "Find opportunities",
      },
      {
        id: "calgary-food-bank-vol",
        name: "Calgary Food Bank",
        description:
          "One of Canada's largest food banks. Volunteers sort donations and assemble emergency food hampers that feed thousands of families each week.",
        need: "Hamper packing & food sorting shifts",
        commitment: "~3 hour shifts, daytime or evening",
        href: "https://www.calgaryfoodbank.com/volunteer/",
        action: "Apply to volunteer",
      },
      {
        id: "bb4ck-vol",
        name: "Brown Bagging for Calgary's Kids (BB4CK)",
        description:
          "Makes sure no Calgary child goes hungry at school. Volunteers prepare bagged lunches in kitchens and community sites across the city.",
        need: "Lunch-making teams (great for groups & families)",
        commitment: "~2 hours, mornings",
        href: "https://www.bb4ck.org/volunteer",
        action: "Join a lunch team",
      },
      {
        id: "mustard-seed-vol",
        name: "The Mustard Seed",
        description:
          "Supports Calgarians experiencing homelessness and poverty with shelter, meals, and clothing. Volunteers serve meals and run the clothing room.",
        need: "Meal service & clothing room helpers",
        commitment: "Flexible shifts",
        href: "https://theseed.ca/volunteer/",
        action: "Apply to volunteer",
      },
      {
        id: "drop-in-vol",
        name: "Calgary Drop-In Centre",
        description:
          "One of North America's largest emergency shelters. Volunteers help with meal service, donation sorting, and client programs.",
        need: "Kitchen, donations & front-line support",
        commitment: "~4 hour shifts",
        href: "https://www.calgarydropin.ca/volunteer/",
        action: "Apply to volunteer",
      },
      {
        id: "humane-society-vol",
        name: "Calgary Humane Society",
        description:
          "Cares for thousands of animals each year. Volunteers help with animal care, dog walking, adoptions, and events.",
        need: "Animal care & dog walking",
        commitment: "Weekly shift after orientation",
        href: "https://www.calgaryhumane.ca/volunteer/",
        action: "Apply to volunteer",
      },
    ],
  },
  {
    id: "donate",
    title: "Donate to local charities",
    tagline:
      "Every dollar stays in Calgary. These registered charities turn donations directly into food, shelter, and safety.",
    icon: "Gift",
    accent: "#1D4ED8",
    items: [
      {
        id: "united-way",
        name: "United Way of Calgary & Area",
        description:
          "Funds a network of local agencies tackling poverty, youth, and mental health. A single donation supports dozens of vetted programs.",
        need: "One-time or monthly giving",
        href: "https://www.calgaryunitedway.org/donate/",
        action: "Donate now",
      },
      {
        id: "food-bank-donate",
        name: "Calgary Food Bank",
        description:
          "Every $1 donated provides about $5 worth of food. Funds emergency hampers for families, seniors, and kids across Calgary.",
        need: "Funds & non-perishable food",
        href: "https://www.calgaryfoodbank.com/donate/",
        action: "Donate now",
      },
      {
        id: "womens-shelter-donate",
        name: "Calgary Women's Emergency Shelter",
        description:
          "Provides safety, counselling, and housing support for women, children, and families fleeing domestic violence.",
        need: "Funds for safe beds & programs",
        href: "https://www.calgarywomensshelter.com/donate/",
        action: "Donate now",
      },
      {
        id: "childrens-cottage-donate",
        name: "Children's Cottage Society",
        description:
          "Prevents child abuse and supports families in crisis through a 24-hour nursery and parenting programs.",
        need: "Funds for crisis nursery care",
        href: "https://childrenscottage.ab.ca/donate/",
        action: "Donate now",
      },
      {
        id: "rmhc-donate",
        name: "Ronald McDonald House Charities Alberta",
        description:
          "Keeps families close to their seriously ill children receiving treatment in Calgary hospitals.",
        need: "Funds & meal-program sponsorship",
        href: "https://rmhcalberta.org/donate/",
        action: "Donate now",
      },
      {
        id: "inn-from-cold-donate",
        name: "Inn from the Cold",
        description:
          "Calgary's largest family shelter, helping families with children find emergency shelter and a path to stable housing.",
        need: "Funds for family shelter beds",
        href: "https://innfromthecold.org/donate/",
        action: "Donate now",
      },
    ],
  },
  {
    id: "sponsor",
    title: "Sponsor & help a family",
    tagline:
      "Go beyond a donation — directly support a household, a newcomer, or a child through structured Calgary programs.",
    icon: "Users",
    accent: "#E1251B",
    items: [
      {
        id: "ccis-sponsorship",
        name: "Calgary Catholic Immigration Society — Refugee Sponsorship",
        description:
          "Join or form a group to privately sponsor a refugee family's first year in Calgary, helping with settlement, housing, and friendship.",
        need: "Sponsorship groups & co-sponsors",
        commitment: "12-month commitment with a group",
        href: "https://www.ccisab.ca",
        action: "Learn to sponsor",
      },
      {
        id: "salvation-army-hampers",
        name: "Salvation Army Calgary — Christmas & Family Programs",
        description:
          "Sponsor a family's holiday hamper or contribute to the Angel Tree gift program so every child has gifts and a festive meal.",
        need: "Sponsor a hamper or gift a child",
        commitment: "Seasonal, any budget",
        href: "https://salvationarmycalgary.org",
        action: "Sponsor a family",
      },
      {
        id: "childrens-cottage-adopt",
        name: "Children's Cottage — Adopt-a-Family",
        description:
          "Provide a struggling Calgary family with groceries, gifts, and essentials during the holidays through a guided matching program.",
        need: "Adopt a matched family",
        commitment: "Seasonal",
        href: "https://childrenscottage.ab.ca",
        action: "Adopt a family",
      },
      {
        id: "closer-to-home",
        name: "Closer to Home Community Services",
        description:
          "Mentor or support vulnerable Calgary families and children through in-home and community family-strengthening programs.",
        need: "Family mentors & sponsors",
        commitment: "Ongoing mentorship",
        href: "https://closertohome.com/volunteer/",
        action: "Become a mentor",
      },
      {
        id: "big-brothers-sisters",
        name: "Big Brothers Big Sisters of Calgary",
        description:
          "Be a consistent, caring adult in a young person's life. Mentors are matched with a child for school, community, or in-person time.",
        need: "Volunteer mentors (Bigs)",
        commitment: "A few hours weekly, screened match",
        href: "https://www.bbbscalgary.ca/volunteer/",
        action: "Mentor a child",
      },
    ],
  },
  {
    id: "city",
    title: "Better our city",
    tagline:
      "Small civic actions add up. Report problems, green your neighbourhood, and shape Calgary's future.",
    icon: "Building2",
    accent: "#1D4ED8",
    items: [
      {
        id: "calgary-311",
        name: "Calgary 311",
        description:
          "Report potholes, broken lights, graffiti, snow-clearing issues, and bylaw concerns. The fastest way to keep your neighbourhood safe and tidy.",
        need: "Report city issues (app, web, or call 311)",
        href: "https://www.calgary.ca/311.html",
        action: "Report an issue",
      },
      {
        id: "engage-calgary",
        name: "Engage Calgary",
        description:
          "The City's public engagement platform. Have your say on budgets, transit, parks, and development decisions that shape your community.",
        need: "Share input on city decisions",
        href: "https://engage.calgary.ca",
        action: "Have your say",
      },
      {
        id: "adopt-a-park",
        name: "Calgary Parks — Adopt-a-Park & Cleanups",
        description:
          "Organize or join a litter cleanup along pathways, rivers, and parks. The City provides bags, gloves, and support for community groups.",
        need: "Cleanup volunteers & group leaders",
        commitment: "One-time or seasonal",
        href: "https://www.calgary.ca/parks/community/adopt-a-park.html",
        action: "Start a cleanup",
      },
      {
        id: "trees-for-calgary",
        name: "Branching Out — Tree Planting",
        description:
          "Help grow Calgary's urban canopy. Join community tree-planting and stewardship events that cool neighbourhoods and clean the air.",
        need: "Tree-planting volunteers",
        commitment: "Seasonal events",
        href: "https://www.calgary.ca/parks/trees/branching-out.html",
        action: "Plant trees",
      },
      {
        id: "community-association",
        name: "Join your Community Association",
        description:
          "Calgary has 150+ community associations running local programs, events, and advocacy. Volunteering locally is the most direct way to improve your block.",
        need: "Local volunteers & board members",
        commitment: "Flexible, neighbourhood-based",
        href: "https://www.calgarycommunities.com",
        action: "Find your association",
      },
    ],
  },
  {
    id: "learn",
    title: "Learn to give better",
    tagline:
      "Free and low-cost Calgary training that makes your contribution safer and more effective.",
    icon: "GraduationCap",
    accent: "#E1251B",
    items: [
      {
        id: "distress-centre-training",
        name: "Distress Centre — Crisis Line Volunteer Training",
        description:
          "Comprehensive, free training prepares you to answer Calgary's 24-hour crisis and 211 lines. One of the most impactful volunteer roles in the city.",
        need: "Trained crisis-line volunteers",
        commitment: "Training + weekly shift commitment",
        href: "https://www.distresscentre.com/volunteer/",
        action: "Start training",
      },
      {
        id: "mhfa",
        name: "Mental Health First Aid (Canada)",
        description:
          "Learn to recognize and respond to mental health and substance-use crises in your community, workplace, or family.",
        need: "Certification course",
        commitment: "~1-2 day course",
        href: "https://www.mentalhealthfirstaid.ca",
        action: "Take the course",
      },
      {
        id: "propellus-workshops",
        name: "Propellus — Nonprofit & Board Workshops",
        description:
          "Free and low-cost workshops on volunteering, leadership, and serving on a nonprofit board so you can contribute your skills.",
        need: "Skills & governance training",
        commitment: "Short workshops",
        href: "https://propellus.org",
        action: "Browse workshops",
      },
      {
        id: "library-courses",
        name: "Calgary Public Library — Free Learning",
        description:
          "A free library card unlocks workshops, LinkedIn Learning, and language courses that build the skills you can give back to the community.",
        need: "Free courses with a library card",
        commitment: "Self-paced",
        href: "https://calgarylibrary.ca",
        action: "Start learning",
      },
    ],
  },
];

export const doGoodImpactStats = [
  { value: "150+", label: "Community associations" },
  { value: "1,000s", label: "Open volunteer roles" },
  { value: "$1 = $5", label: "Food bank impact" },
  { value: "24/7", label: "Crisis line staffed by volunteers" },
];
