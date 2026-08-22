import type { Resource, CategoryGuide } from "./types";

// Comprehensive Calgary Resources Database
// Sources: City of Calgary, 211 Alberta, Alberta Health Services, Government websites
// Last updated: May 2026

export const calgaryResources: Resource[] = [
  // ============================================
  // HOUSING & RENT
  // ============================================
  {
    id: "calgary-housing-company",
    category: ["housing"],
    userTypes: ["newcomer", "family", "senior"],
    title: {
      en: "Calgary Housing Company"
    },
    description: {
      en: "Manages subsidized and affordable housing programs in Calgary. Offers rent-geared-to-income community housing, rent supplements, and near-market housing. Applications done through online portal. Eligibility requires income below specific thresholds and household assets under $25,000."
    },
    servicesOffered: [
      "Rent-geared-to-income housing",
      "Rent supplements",
      "Near-market housing",
      "Housing applications",
      "Tenant services"
    ],
    eligibility: {
      en: "Income below specific thresholds, household assets under $25,000, Calgary residency"
    },
    phone: "403-221-6430",
    address: "800 Macleod Trail SE, Calgary, AB",
    website: "https://www.calgaryhousing.ca",
    cost: "sliding-scale",
    featured: true,
    lastUpdated: "2026-05",
    source: "Calgary Housing Company",
    coordinates: { lat: 51.0393, lng: -114.0579 },
  },
  {
    id: "homeward-trust",
    category: ["housing", "emergency"],
    userTypes: ["newcomer", "family", "senior"],
    title: {
      en: "Homeward Trust Calgary"
    },
    description: {
      en: "Coordinates Calgary's homeless-serving system. Provides housing-first programs, emergency shelter coordination, prevention services, and the Find Housing Digital Service for those seeking housing support."
    },
    servicesOffered: [
      "Housing First programs",
      "Emergency shelter coordination",
      "Prevention services",
      "Find Housing Digital Service",
      "Coordinated access"
    ],
    phone: "403-718-8533",
    address: "1010 Centre Street NE, Calgary, AB",
    website: "https://www.homewardtrust.ca",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Homeward Trust Calgary",
  },
  {
    id: "alpha-house",
    category: ["housing", "emergency", "mental-health"],
    userTypes: ["newcomer", "family", "senior"],
    title: {
      en: "Alpha House Calgary"
    },
    description: {
      en: "Provides shelter, detox, and outreach services for individuals affected by alcohol and drug dependencies. Operates DOAP (Downtown Outreach Addictions Partnership) Team that helps people on the streets."
    },
    servicesOffered: [
      "Emergency shelter",
      "Detox services",
      "DOAP Team outreach",
      "Housing support",
      "Addiction support"
    ],
    phone: "403-234-7388",
    address: "203 15 Avenue SE, Calgary, AB",
    website: "https://alphahousecalgary.com",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Alpha House Calgary",
  },
  {
    id: "mustard-seed",
    category: ["housing", "food", "emergency"],
    userTypes: ["newcomer", "family", "senior"],
    title: {
      en: "The Mustard Seed Calgary"
    },
    description: {
      en: "Christian charity providing emergency shelter, meals, housing support, job training, and wellness programs for those experiencing homelessness or poverty. Multiple locations in Calgary."
    },
    servicesOffered: [
      "Emergency shelter",
      "Daily meals",
      "Housing programs",
      "Job training",
      "Wellness services"
    ],
    phone: "403-269-1319",
    address: "102 11 Avenue SE, Calgary, AB",
    website: "https://theseed.ca",
    cost: "free",
    lastUpdated: "2026-05",
    source: "The Mustard Seed",
  },
  {
    id: "rental-scam-tips",
    category: ["housing", "legal"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Rental Scam Prevention Guide"
    },
    description: {
      en: "Essential tips to avoid rental scams in Calgary: Never send money before viewing the property, verify landlord identity, beware of prices too good to be true, use secure payment methods, and get everything in writing."
    },
    hiddenGem: true,
    website: "https://www.servicealberta.ca/housing",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Service Alberta",
  },

  // ============================================
  // JOBS & EMPLOYMENT - MAINSTREAM FIRST
  // ============================================
  // Layer 1: Mainstream Calgary Hiring
  {
    id: "job-bank-canada",
    category: ["jobs"],
    userTypes: ["student", "creator", "family", "senior"],
    title: {
      en: "Job Bank Canada"
    },
    description: {
      en: "Official Government of Canada job search database with thousands of active job listings in Calgary across all industries. Free to use, no account required. Search by job title, location, skills, and salary. Includes apprenticeships and training programs."
    },
    servicesOffered: ["Job search", "Apprenticeships", "Training programs", "Career insights"],
    website: "https://www.jobbank.gc.ca/jobsearch/jobsearch?searchstring=calgary",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Government of Canada",
  },
  {
    id: "indeed-calgary",
    category: ["jobs"],
    userTypes: ["student", "creator", "family", "senior"],
    title: {
      en: "Indeed Calgary Jobs"
    },
    description: {
      en: "Largest job search engine with thousands of active listings in Calgary. Post your resume, set up job alerts by salary and industry, apply directly to employers. Free profile. Search entry-level to executive roles across all sectors."
    },
    servicesOffered: ["Job search", "Resume posting", "Job alerts", "Employer reviews"],
    website: "https://www.indeed.com/jobs?q=&l=Calgary%2C+AB",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Indeed",
  },
  {
    id: "linkedin-calgary-jobs",
    category: ["jobs"],
    userTypes: ["student", "creator", "family"],
    title: {
      en: "LinkedIn Calgary Jobs"
    },
    description: {
      en: "Professional network with 10,000+ active job listings in Calgary. Build a professional profile, connect with recruiters, get job alerts, and apply directly. Many employers actively recruit here. Learn skill recommendations based on jobs you're interested in."
    },
    servicesOffered: ["Job search", "Profile building", "Recruiter connections", "Skill recommendations"],
    website: "https://www.linkedin.com/jobs/search/?keywords=&location=Calgary%2C%20AB",
    cost: "free",
    lastUpdated: "2026-05",
    source: "LinkedIn",
  },
  {
    id: "calgary-economic-development",
    category: ["jobs", "business"],
    userTypes: ["creator", "business", "student"],
    title: {
      en: "Calgary Economic Development - Careers"
    },
    description: {
      en: "Official Calgary business development organization providing job market insights, hiring trends, major employers, and sector information. Lists companies actively hiring in Calgary with growth projections for major industries (energy, tech, healthcare, construction)."
    },
    servicesOffered: ["Employer directory", "Hiring trends", "Sector insights", "Career guidance"],
    website: "https://www.calgaryeconomicdevelopment.com",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Calgary Economic Development",
  },
  {
    id: "calgary-jobs-fair",
    category: ["jobs"],
    userTypes: ["student", "creator", "family"],
    title: {
      en: "Calgary Job Fairs & Recruitment Events"
    },
    description: {
      en: "Monthly job fairs in Calgary where hundreds of employers meet with job seekers directly. Network with hiring managers, submit applications on-site, and attend workshops. Usually free to attend. Check EventBrite, employer websites, and Calgary Community Resources for dates."
    },
    servicesOffered: ["Employer meetings", "Direct applications", "Workshops", "Networking"],
    website: "https://www.eventbrite.ca/d/calgary-ab/job-fair/",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Various",
  },
  {
    id: "staffing-agencies-calgary",
    category: ["jobs"],
    userTypes: ["student", "creator", "family"],
    title: {
      en: "Calgary Staffing & Recruitment Agencies"
    },
    description: {
      en: "Top Calgary staffing agencies specializing in permanent and temporary positions. Agencies include: Kelly Services, Manpower, Randstad, Iqvia, Robert Half, Hudson Global. Register with multiple agencies to access exclusive job listings. Many specialize in healthcare, trades, IT, finance, or administrative roles."
    },
    servicesOffered: ["Temp jobs", "Permanent placement", "Career counseling", "Specialized recruitment"],
    website: "https://www.kellyservices.ca",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Various Agencies",
  },
  {
    id: "calgary-trades-apprenticeships",
    category: ["jobs", "education"],
    userTypes: ["student", "student", "creator"],
    title: {
      en: "Calgary Trades & Apprenticeships"
    },
    description: {
      en: "Alberta offers high-demand apprenticeships in trades: electrician, plumbing, carpentry, welding, HVAC, and more. Average apprentice earning $60,000-$90,000. Register through Alberta Apprenticeship, connect with local employers, earn while you learn. Opportunities in construction, energy, and maintenance sectors.",
      tl: "Alberta ay nag-aalok ng high-demand apprenticeships sa trades.",
      es: "Alberta ofrece aprendizajes muy demandados en oficios.",
      ar: "تقدم ألبرتا تدريبات عملية عالي������ الطلب في الحرف.",
      zh: "艾伯塔提供贸易高需求学徒。",
    },
    servicesOffered: ["Apprenticeships", "Trade training", "Earn while learning", "Career pathways"],
    website: "https://www.alberta.ca/apprenticeship-industry-training",
    cost: "low-cost",
    lastUpdated: "2026-05",
    source: "Alberta Government",
  },
  {
    id: "city-of-calgary-careers",
    category: ["jobs"],
    userTypes: ["creator", "family"],
    title: {
      en: "City of Calgary Careers"
    },
    description: {
      en: "Stable employment with City of Calgary in dozens of departments: police, fire, transit, parks, planning, engineering, administration. Competitive salaries, benefits, pension, and job security. Apply online to posted positions. Recruitment events held regularly."
    },
    servicesOffered: ["Government jobs", "Competitive salaries", "Benefits", "Pension"],
    phone: "311",
    website: "https://careers.calgary.ca",
    cost: "free",
    lastUpdated: "2026-05",
    source: "City of Calgary",
  },
  {
    id: "workopolis-calgary",
    category: ["jobs"],
    userTypes: ["student", "creator", "family"],
    title: {
      en: "Workopolis Calgary"
    },
    description: {
      en: "Canadian job search site with 8,000+ active listings in Calgary. Browse by job title, company, location. Post resume for free. Get job recommendations based on your profile. Many exclusive listings not found on other sites."
    },
    servicesOffered: ["Job search", "Resume posting", "Job recommendations"],
    website: "https://www.workopolis.com/jobsearch/job-listing/?l=calgary",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Workopolis",
  },

  // Layer 2: Specialized Employment Supports (Newcomer-focused)
  {
    id: "centre-for-newcomers-employment",
    category: ["newcomer", "jobs"],
    userTypes: ["newcomer"],
    title: {
      en: "Centre for Newcomers - Employment Services"
    },
    description: {
      en: "Comprehensive employment services for newcomers including job search assistance, resume writing, interview preparation, career counseling, and connections to employers. Free for eligible newcomers."
    },
    servicesOffered: [
      "Job search assistance",
      "Resume writing",
      "Interview preparation",
      "Career counseling",
      "Employer connections",
      "Job fairs"
    ],
    phone: "403-569-3325",
    address: "125-2nd Avenue SE, Calgary, AB",
    website: "https://www.centrefornewcomers.ca",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Centre for Newcomers",
    coordinates: { lat: 51.0461, lng: -114.0570 },
  },
  {
    id: "ccis-employment",
    category: ["newcomer", "jobs"],
    userTypes: ["newcomer"],
    title: {
      en: "CCIS Employment Services"
    },
    description: {
      en: "Calgary Catholic Immigration Society offers employment programs including job readiness workshops, occupation-specific training, mentorship programs, and direct employer connections for immigrants and refugees."
    },
    servicesOffered: [
      "Job readiness workshops",
      "Occupation-specific training",
      "Mentorship programs",
      "Employer connections",
      "Career bridging"
    ],
    phone: "403-262-2006",
    address: "120 17th Avenue SW, Calgary, AB",
    website: "https://www.ccisab.ca",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Calgary Catholic Immigration Society",
  },
  {
    id: "criec",
    category: ["newcomer", "jobs"],
    userTypes: ["newcomer"],
    title: {
      en: "Calgary Region Immigrant Employment Council (CRIEC)"
    },
    description: {
      en: "Mentorship and career bridging programs for internationally trained professionals. Connects newcomers with established professionals in their field for guidance and networking."
    },
    servicesOffered: [
      "Professional mentorship",
      "Career bridging",
      "Networking events",
      "Industry connections",
      "Credential guidance"
    ],
    phone: "403-262-8700",
    website: "https://www.criec.ca",
    cost: "free",
    hiddenGem: true,
    lastUpdated: "2026-05",
    source: "CRIEC",
  },
  {
    id: "ciwa-employment",
    category: ["newcomer", "family", "jobs"],
    userTypes: ["newcomer", "family"],
    title: {
      en: "CIWA - Employment Programs for Women"
    },
    description: {
      en: "Calgary Immigrant Women's Association provides industry-specific training and bridge-to-work programs specifically for immigrant and refugee women. Includes childcare support during training."
    },
    servicesOffered: [
      "Industry-specific training",
      "Bridge-to-work programs",
      "Childcare support",
      "Job placement",
      "Skills upgrading"
    ],
    phone: "403-263-4414",
    address: "200-138 4th Avenue SE, Calgary, AB",
    website: "https://www.ciwa-online.com",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Calgary Immigrant Women's Association",
  },
  {
    id: "alberta-supports",
    category: ["jobs", "emergency"],
    userTypes: ["newcomer", "family", "senior"],
    title: {
      en: "Alberta Supports"
    },
    description: {
      en: "Government-funded employment and income support services. Provides job search assistance, training funding, income support, health benefits, and child care subsidies for eligible Albertans."
    },
    servicesOffered: [
      "Job search assistance",
      "Training funding",
      "Income support",
      "Health benefits",
      "Child care subsidies"
    ],
    phone: "1-877-644-9992",
    website: "https://www.alberta.ca/alberta-supports",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Government of Alberta",
  },
  {
    id: "bow-valley-career",
    category: ["jobs", "education"],
    userTypes: ["newcomer", "student", "family"],
    title: {
      en: "Bow Valley College Career Services"
    },
    description: {
      en: "Free career counseling, resume writing workshops, interview preparation, and job search support for all Calgarians - not just students. Includes access to job postings and employer events."
    },
    servicesOffered: [
      "Career counseling",
      "Resume writing",
      "Interview preparation",
      "Job postings",
      "Employer events"
    ],
    phone: "403-410-1400",
    address: "345 6th Avenue SE, Calgary, AB",
    website: "https://bowvalleycollege.ca/student-resources/career-services",
    cost: "free",
    hiddenGem: true,
    lastUpdated: "2026-05",
    source: "Bow Valley College",
  },
  {
    id: "cpl-job-resources",
    category: ["jobs", "education"],
    userTypes: ["newcomer", "student", "family", "senior"],
    title: {
      en: "Calgary Public Library - Job Resources"
    },
    description: {
      en: "Free access to resume templates, job search databases, career exploration tools, interview practice software, and one-on-one help from library staff. Available at all library locations."
    },
    servicesOffered: [
      "Resume templates",
      "Job search databases",
      "Career exploration tools",
      "Interview practice software",
      "One-on-one help"
    ],
    phone: "403-260-2600",
    address: "800 3rd Street SE, Calgary, AB (Central Library)",
    website: "https://calgarylibrary.ca/read-learn-and-explore/career-and-job-searching/",
    cost: "free",
    hiddenGem: true,
    lastUpdated: "2026-05",
    source: "Calgary Public Library",
  },
  {
    id: "ties-employment",
    category: ["newcomer", "jobs"],
    userTypes: ["newcomer"],
    title: {
      en: "TIES - Employment Programs"
    },
    description: {
      en: "Specialized job readiness and English-for-employment programs for newcomers. Provides crisis support, financial literacy training, and community navigation services."
    },
    servicesOffered: [
      "Job readiness training",
      "English for employment",
      "Financial literacy",
      "Crisis support",
      "Community navigation"
    ],
    phone: "403-301-8333",
    website: "https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/new-life-canada/improve-english-french.html",
    cost: "free",
    lastUpdated: "2026-05",
    source: "TIES Canada",
  },

  // ============================================
  // MENTAL HEALTH & CRISIS SUPPORT
  // ============================================
  {
    id: "distress-centre",
    category: ["mental-health", "emergency"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "Distress Centre Calgary"
    },
    description: {
      en: "24/7 crisis support line providing confidential support for anyone in distress. Services include crisis intervention, suicide prevention, short-term counselling (1-6 sessions), and 211 information referral. 89% of clients report improved coping after service."
    },
    servicesOffered: [
      "24/7 crisis line",
      "Suicide prevention",
      "Short-term counselling",
      "211 referral service",
      "Online chat support"
    ],
    phone: "403-266-HELP (4357)",
    address: "340, 1300-8 Street SW, Calgary, AB",
    website: "https://www.distresscentre.com",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Distress Centre Calgary",
  },
  {
    id: "ahs-mental-health",
    category: ["mental-health", "healthcare"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "AHS Mental Health Help Line"
    },
    description: {
      en: "24/7 mental health crisis line operated by Alberta Health Services. Free, confidential support for anxiety, depression, addiction, and other mental health concerns. No Alberta Health Card required."
    },
    servicesOffered: [
      "24/7 crisis support",
      "Mental health assessment",
      "Referral to services",
      "Addiction support",
      "Family support"
    ],
    phone: "1-877-303-2642",
    website: "https://www.albertahealthservices.ca/findhealth/service.aspx?id=6810",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Alberta Health Services",
  },
  {
    id: "access-mental-health",
    category: ["mental-health"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "Access Mental Health Calgary"
    },
    description: {
      en: "Single point of entry for publicly funded mental health services in Calgary. Provides assessment, connects to appropriate level of care, and offers same-day urgent appointments when needed."
    },
    servicesOffered: [
      "Mental health assessment",
      "Care navigation",
      "Urgent appointments",
      "Service connections",
      "Follow-up support"
    ],
    phone: "403-943-1500",
    website: "https://www.albertahealthservices.ca/amh",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Alberta Health Services",
  },
  {
    id: "counselling-centre-ucalgary",
    category: ["mental-health", "education"],
    userTypes: ["student"],
    title: {
      en: "UCalgary Counselling Centre"
    },
    description: {
      en: "Free counselling for UCalgary students. Also offers low-cost counselling to public through practicum students supervised by licensed psychologists."
    },
    servicesOffered: [
      "Individual counselling",
      "Group therapy",
      "Crisis support",
      "Low-cost public services"
    ],
    phone: "403-220-5893",
    address: "MacEwan Student Centre, University of Calgary",
    website: "https://www.ucalgary.ca/counselling",
    cost: "free",
    hiddenGem: true,
    lastUpdated: "2026-05",
    source: "University of Calgary",
  },

  // ============================================
  // FOOD SUPPORT
  // ============================================
  {
    id: "calgary-food-bank",
    category: ["food", "emergency"],
    userTypes: ["newcomer", "family", "senior"],
    title: {
      en: "Calgary Food Bank"
    },
    description: {
      en: "Calgary's main emergency food bank providing food hampers to individuals and families in need. Screening and appointments required. Also operates satellite distribution points across the city."
    },
    servicesOffered: [
      "Emergency food hampers",
      "Satellite distribution",
      "Nutrition programs",
      "Community partnerships"
    ],
    phone: "403-253-2055",
    address: "5000 11th Street SE, Calgary, AB",
    website: "https://www.calgaryfoodbank.com",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Calgary Food Bank",
    coordinates: { lat: 50.9988, lng: -114.0237 },
  },
  {
    id: "community-pantries",
    category: ["food"],
    userTypes: ["newcomer", "family", "senior"],
    title: {
      en: "Community Food Pantries"
    },
    description: {
      en: "Free community pantries across Calgary operating on mutual aid principles - take what you need, donate what you can. Includes Acadia Pantry, Dalhousie Community Pantry, Brentwood Community Pantry, and Ranchlands Food Pantry."
    },
    servicesOffered: [
      "Non-perishable food",
      "Fresh produce (when available)",
      "Personal care items",
      "No registration required"
    ],
    website: "https://www.calgaryfoodbank.com/find-food",
    cost: "free",
    hiddenGem: true,
    lastUpdated: "2026-05",
    source: "Various community associations",
  },
  {
    id: "seniors-meal-programs",
    category: ["food", "senior"],
    userTypes: ["senior"],
    title: {
      en: "Seniors Meal Programs"
    },
    description: {
      en: "Various meal programs for seniors including Kerby Centre Lunch Program, Meals on Wheels Calgary, and community center lunch programs. Provides nutritious meals and social connection."
    },
    servicesOffered: [
      "Hot meals",
      "Meal delivery",
      "Congregate dining",
      "Social programs"
    ],
    phone: "403-243-2834",
    website: "https://mealsonwheelscalgary.ca",
    cost: "low-cost",
    lastUpdated: "2026-05",
    source: "Meals on Wheels Calgary",
  },

  // ============================================
  // HEALTHCARE
  // ============================================
  {
    id: "health-link",
    category: ["healthcare", "emergency"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "Health Link 811"
    },
    description: {
      en: "24/7 health advice line staffed by registered nurses. Get health advice, find healthcare services, and determine if you need to see a doctor or go to emergency. Free, confidential service."
    },
    servicesOffered: [
      "Health advice",
      "Symptom assessment",
      "Healthcare navigation",
      "Poison control",
      "Mental health support"
    ],
    phone: "811",
    website: "https://www.albertahealthservices.ca/info/page12630.aspx",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Alberta Health Services",
  },
  {
    id: "ahcip-registration",
    category: ["healthcare", "newcomer"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Alberta Health Care Insurance Plan (AHCIP)"
    },
    description: {
      en: "Register for Alberta Health Care coverage to access publicly funded healthcare services. Essential for newcomers - apply within 3 months of arrival. Coverage begins after 3-month waiting period for some newcomers."
    },
    servicesOffered: [
      "Health card registration",
      "Coverage information",
      "Eligibility assessment"
    ],
    phone: "310-0000",
    website: "https://www.alberta.ca/ahcip",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Government of Alberta",
  },
  {
    id: "find-a-doctor",
    category: ["healthcare"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "Find a Family Doctor"
    },
    description: {
      en: "Use Alberta Health Services' physician finder to locate family doctors accepting new patients. Many clinics in Calgary currently accepting patients including Aurora Clinic, Now Medical, Calgary Medical Centre, and OptimaCare."
    },
    servicesOffered: [
      "Doctor search tool",
      "Clinic listings",
      "Appointment booking"
    ],
    website: "https://www.albertafindadoctor.ca",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Alberta Health Services",
  },
  {
    id: "urgent-care-centres",
    category: ["healthcare", "emergency"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "Urgent Care Centres"
    },
    description: {
      en: "For non-life-threatening urgent care needs. Shorter wait times than emergency rooms. Locations include Sheldon M. Chumir Health Centre (downtown), South Health Campus, and Peter Lougheed Centre."
    },
    servicesOffered: [
      "Urgent care",
      "X-rays",
      "Lab work",
      "Minor injuries",
      "Illness assessment"
    ],
    phone: "811",
    website: "https://www.albertahealthservices.ca/waittimes/waittimes.aspx",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Alberta Health Services",
  },

  // ============================================
  // NEWCOMER SERVICES
  // ============================================
  {
    id: "ccis",
    category: ["newcomer", "jobs", "housing", "education"],
    userTypes: ["newcomer"],
    title: {
      en: "Calgary Catholic Immigration Society (CCIS)"
    },
    description: {
      en: "Calgary's largest settlement agency serving newcomers since 1981. Comprehensive services including housing support, employment programs, language training, family services, youth programs, and refugee resettlement."
    },
    servicesOffered: [
      "Settlement services",
      "Housing support",
      "Employment programs",
      "Language training (LINC)",
      "Family services",
      "Youth programs",
      "Refugee resettlement"
    ],
    phone: "403-262-2006",
    address: "120 17th Avenue SW, Calgary, AB",
    website: "https://www.ccisab.ca",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Calgary Catholic Immigration Society",
    coordinates: { lat: 51.0394, lng: -114.0719 },
  },
  {
    id: "centre-for-newcomers",
    category: ["newcomer", "jobs", "education", "family"],
    userTypes: ["newcomer"],
    title: {
      en: "Centre for Newcomers"
    },
    description: {
      en: "Full-service settlement agency with multiple Calgary locations. Services include LINC language classes, daycare, job search support, newcomer orientation, family programs, and community connections."
    },
    servicesOffered: [
      "LINC language classes",
      "Licensed daycare",
      "Employment services",
      "Newcomer orientation",
      "Family programs",
      "Youth services"
    ],
    phone: "403-569-3325",
    address: "125 2nd Avenue SE, Calgary, AB",
    website: "https://www.centrefornewcomers.ca",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Centre for Newcomers",
  },
  {
    id: "immigrant-services-calgary",
    category: ["newcomer"],
    userTypes: ["newcomer"],
    title: {
      en: "Immigrant Services Calgary"
    },
    description: {
      en: "Provides newcomer planning services, language testing (CELPIP, IELTS preparation), settlement assistance, and community integration programs for immigrants and refugees.",
      tl: "Newcomer planning services at language testing para sa immigrants.",
      es: "Servicios de planificación para recién llegados y pruebas de idioma.",
      ar: "خدمات تخطيط للقادمين الجدد واختبارات اللغة للمها��ري��.",
      zh: "为��民提供新移民规划服务和语言测试。",
    },
    servicesOffered: [
      "Newcomer planning",
      "Language testing",
      "Settlement assistance",
      "Community integration"
    ],
    phone: "403-265-1120",
    address: "1200 910 7th Avenue SW, Calgary, AB",
    website: "https://www.immigrantservicescalgary.ca",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Immigrant Services Calgary",
  },

  // ============================================
  // SENIOR SERVICES
  // ============================================
  {
    id: "unison-kerby",
    category: ["senior", "community"],
    userTypes: ["senior"],
    title: {
      en: "Unison at Kerby Centre"
    },
    description: {
      en: "Comprehensive services for Calgary seniors 55+. Services include housing assistance, benefits navigation, free tax filing, transportation (Veiner Vintage Transport), wellness programs, food security, and monthly housing information sessions.",
      tl: "Komprehensibong serbisyo para sa Calgary seniors 55+.",
      es: "Servicios integrales para mayores de Calgary de 55+.",
      ar: "خدمات شاملة لكبار السن في ��الجاري 55+.",
      zh: "为55岁以上卡尔加里老年人提供全面服务。",
    },
    servicesOffered: [
      "Housing assistance",
      "Benefits navigation",
      "Free tax filing",
      "Transportation",
      "Wellness programs",
      "Food security",
      "Social programs"
    ],
    phone: "403-265-0661",
    address: "1133 7th Avenue SW, Calgary, AB",
    website: "https://www.unisonalberta.com",
    cost: "free",
    featured: true,
    priority: 95,
    lastUpdated: "2026-05",
    source: "Unison Alberta",
    coordinates: { lat: 51.0448, lng: -114.0827 },
  },
  {
    id: "seniors-free-tax",
    category: ["senior"],
    userTypes: ["senior"],
    title: {
      en: "Free Tax Clinic for Seniors"
    },
    description: {
      en: "Free tax preparation for seniors with modest income. Available at Kerby Centre and various locations during tax season. Volunteers help file simple returns and apply for benefits."
    },
    servicesOffered: [
      "Tax return filing",
      "Benefits applications",
      "Document organization"
    ],
    phone: "403-265-0661",
    website: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/community-volunteer-income-tax-program.html",
    cost: "free",
    hiddenGem: true,
    priority: 80,
    lastUpdated: "2026-05",
    source: "Canada Revenue Agency / Kerby Centre",
  },
  {
    id: "unison-elder-abuse-shelter",
    category: ["senior", "emergency", "healthcare"],
    userTypes: ["senior", "family"],
    title: {
      en: "Unison Elder Abuse Shelter & Resource Line"
    },
    description: {
      en: "Canada's first elder abuse shelter, run by Unison Alberta. Provides 24/7 emergency refuge, safety planning, trauma recovery, case management, and outreach for adults 55+ experiencing physical, emotional, financial, or other abuse. The 24/7 Elder Abuse Resource Line offers confidential help and reporting — you do not need to be in a shelter to call."
    },
    servicesOffered: [
      "24/7 emergency shelter",
      "Confidential resource & reporting line",
      "Safety planning",
      "Case management & counselling",
      "Outreach support",
    ],
    phone: "403-705-3250",
    website: "https://unisonalberta.com/programs/elder-abuse/",
    cost: "free",
    priority: 97,
    featured: true,
    lastUpdated: "2026-06",
    source: "Unison Alberta",
  },
  {
    id: "calgary-seniors-resource-society",
    category: ["senior", "community"],
    userTypes: ["senior", "family"],
    title: {
      en: "Calgary Seniors' Resource Society"
    },
    description: {
      en: "Non-profit offering free social work, friendly visiting, and volunteer-based support so older adults can age with dignity at home. The Way In Network connects seniors to benefits, housing, and community programs; SeniorConnect provides urgent crisis support through the Distress Centre (403-266-4357)."
    },
    servicesOffered: [
      "Social work support",
      "Way In Network navigation",
      "Friendly visiting",
      "SeniorConnect crisis support",
      "Benefits & housing help",
    ],
    phone: "403-266-6200",
    website: "https://www.calgaryseniors.org",
    cost: "free",
    priority: 90,
    featured: true,
    lastUpdated: "2026-06",
    source: "Calgary Seniors' Resource Society",
  },
  {
    id: "city-calgary-seniors-services",
    category: ["senior", "community"],
    userTypes: ["senior", "family"],
    title: {
      en: "City of Calgary — Seniors & Age-Friendly Calgary"
    },
    description: {
      en: "The City's hub for seniors: low-income transit passes, recreation fee subsidies, property tax assistance, age-friendly programs, and connections to community supports. Call 311 for City services or 211 to be connected to senior programs across Calgary."
    },
    servicesOffered: [
      "Low-income transit pass",
      "Recreation fee subsidy",
      "Property tax assistance",
      "Age-friendly programs",
      "Service navigation (311 / 211)",
    ],
    phone: "311",
    website: "https://www.calgary.ca/communities/seniors.html",
    cost: "free",
    priority: 88,
    lastUpdated: "2026-06",
    source: "City of Calgary",
  },
  {
    id: "alberta-seniors-financial-assistance",
    category: ["senior"],
    userTypes: ["senior", "family"],
    title: {
      en: "Alberta Seniors Benefit & Financial Assistance"
    },
    description: {
      en: "Government of Alberta programs for low- to moderate-income seniors 65+: the Alberta Seniors Benefit (monthly income support), Special Needs Assistance, Dental and Optical Assistance, and the Seniors Property Tax Deferral program. One application covers several benefits."
    },
    servicesOffered: [
      "Monthly income support",
      "Special needs assistance",
      "Dental & optical assistance",
      "Property tax deferral",
    ],
    phone: "1-877-644-9992",
    website: "https://www.alberta.ca/alberta-seniors-benefit",
    cost: "free",
    priority: 86,
    lastUpdated: "2026-06",
    source: "Government of Alberta",
  },
  {
    id: "silvera-for-seniors",
    category: ["senior", "housing"],
    userTypes: ["senior", "family"],
    title: {
      en: "Silvera for Seniors (Seniors Housing)"
    },
    description: {
      en: "Long-standing non-profit providing affordable independent and supportive living communities for Calgary seniors, including subsidized options, meals, wellness programs, and on-site social activities across multiple communities."
    },
    servicesOffered: [
      "Affordable independent living",
      "Supportive living",
      "Subsidized housing options",
      "Meals & wellness programs",
    ],
    phone: "403-567-5301",
    website: "https://www.silvera.ca",
    cost: "sliding-scale",
    priority: 84,
    lastUpdated: "2026-06",
    source: "Silvera for Seniors",
  },
  {
    id: "unison-news",
    category: ["senior", "community"],
    userTypes: ["senior", "family"],
    title: {
      en: "Unison News (Seniors Publication)"
    },
    description: {
      en: "A free monthly publication from Unison Alberta for adults 50+ in Southern Alberta. Covers senior programs, benefits changes, community stories, events, and trusted resources. Available in print at senior centres and online — a great way to stay informed and connected."
    },
    servicesOffered: [
      "Monthly senior news",
      "Benefits & policy updates",
      "Community events listings",
      "Resource directory",
    ],
    website: "https://unisonalberta.com/unison-news/",
    cost: "free",
    priority: 78,
    hiddenGem: true,
    lastUpdated: "2026-06",
    source: "Unison Alberta",
  },

  // ============================================
  // LEGAL HELP
  // ============================================
  {
    id: "calgary-legal-guidance",
    category: ["legal"],
    userTypes: ["newcomer", "family", "senior"],
    title: {
      en: "Calgary Legal Guidance"
    },
    description: {
      en: "Free legal advice clinic for low-income Calgarians. Covers tenant rights, family law, immigration, employment, and more. Appointments required - call to schedule."
    },
    servicesOffered: [
      "Tenant rights advice",
      "Family law",
      "Immigration",
      "Employment law",
      "General legal advice"
    ],
    phone: "403-234-9266",
    address: "100, 840 7th Avenue SW, Calgary, AB",
    website: "https://www.clg.ab.ca",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Calgary Legal Guidance",
  },
  {
    id: "student-legal-assistance",
    category: ["legal"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Student Legal Assistance (SLA)"
    },
    description: {
      en: "Pro-bono legal clinic staffed by law students under lawyer supervision. Handles rental disputes, security deposit issues, tenancy agreement breaches, and other civil matters."
    },
    servicesOffered: [
      "Rental disputes",
      "Security deposits",
      "Tenancy agreements",
      "Small claims",
      "Legal information"
    ],
    phone: "403-220-6637",
    address: "University of Calgary, Faculty of Law",
    website: "https://law.ucalgary.ca/student-legal-assistance",
    cost: "free",
    hiddenGem: true,
    lastUpdated: "2026-05",
    source: "University of Calgary Faculty of Law",
  },
  {
    id: "rtdrs",
    category: ["legal", "housing"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "Residential Tenancy Dispute Resolution Service (RTDRS)"
    },
    description: {
      en: "Alberta government tribunal for resolving landlord-tenant disputes. Handles rent issues, damage deposits, repairs, and evictions. Faster and less formal than court. Filing fee applies but may be waived for low income."
    },
    servicesOffered: [
      "Dispute resolution",
      "Rent issues",
      "Damage deposits",
      "Repair disputes",
      "Eviction hearings"
    ],
    phone: "310-0000",
    website: "https://www.alberta.ca/residential-tenancy-dispute-resolution-service",
    cost: "low-cost",
    lastUpdated: "2026-05",
    source: "Government of Alberta",
  },

  // ============================================
  // BUSINESS & ENTREPRENEURSHIP
  // ============================================
  {
    id: "business-link",
    category: ["business"],
    userTypes: ["business", "newcomer"],
    title: {
      en: "Business Link Alberta"
    },
    description: {
      en: "Free one-on-one business advice for entrepreneurs starting or growing a business in Alberta. Services include business planning, financing guidance, regulatory navigation, and webinars."
    },
    servicesOffered: [
      "Business planning",
      "Financing guidance",
      "Regulatory navigation",
      "Webinars",
      "One-on-one advising"
    ],
    phone: "1-800-272-9675",
    website: "https://businesslink.ca",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Business Link Alberta",
  },
  {
    id: "platform-calgary",
    category: ["business"],
    userTypes: ["business"],
    title: {
      en: "Platform Calgary"
    },
    description: {
      en: "Calgary's innovation hub for tech-enabled startups. Offers pre-accelerator and incubator programs, mentorship, coworking space, and resources for raising capital."
    },
    servicesOffered: [
      "Pre-accelerator programs",
      "Incubator programs",
      "Mentorship",
      "Coworking space",
      "Capital raising support"
    ],
    phone: "403-265-9670",
    address: "611 Meredith Road NE, Calgary, AB",
    website: "https://www.platformcalgary.com",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Platform Calgary",
  },
  {
    id: "calgary-chamber",
    category: ["business"],
    userTypes: ["business"],
    title: {
      en: "Calgary Chamber of Commerce"
    },
    description: {
      en: "Membership organization supporting Calgary businesses. Offers networking events, advocacy, business resources, and member discounts."
    },
    servicesOffered: [
      "Networking events",
      "Business advocacy",
      "Resources",
      "Member discounts"
    ],
    phone: "403-750-0400",
    address: "600 238 11th Avenue SE, Calgary, AB",
    website: "https://www.calgarychamber.com",
    cost: "paid",
    lastUpdated: "2026-05",
    source: "Calgary Chamber of Commerce",
  },
  {
    id: "calgary-advertising-channels",
    category: ["business"],
    userTypes: ["business"],
    title: {
      en: "Promote My Calgary Business - Local Advertising Channels"
    },
    description: {
      en: "Comprehensive guide to local advertising options for Calgary businesses: Print media (Unison News, Calgary Herald), digital channels (Facebook, Instagram, Google Local), community partnerships (libraries, community centres, faith communities), radio, and transit ads. Choose the best channels for your budget and target audience."
    },
    servicesOffered: [
      "Print media guidance (Unison News, Calgary Herald, community newsletters)",
      "Digital advertising (Facebook, Instagram, Google Local Business)",
      "Community partnerships (libraries, community centres, faith communities)",
      "Radio and local media advertising",
      "Transit ads and outdoor advertising",
      "Event sponsorship opportunities"
    ],
    hiddenGem: true,
    website: "https://www.calgary.ca/business",
    cost: "paid",
    lastUpdated: "2026-05",
    source: "Calgary Business Resources",
  },
  {
    id: "calgary-local-media",
    category: ["business"],
    userTypes: ["business"],
    title: {
      en: "Calgary Local Media & Broadcasting",
      tl: "Calgary Local Media & Broadcasting",
      es: "Medios locales y radiodifusión de Calgary",
      ar: "وسائل الإعلام المحلية والبث في كالجاري",
      zh: "卡尔加��当地媒体和广播",
    },
    description: {
      en: "Contact information and advertising rates for local Calgary news, radio, and television stations. Includes CKFM, CJAY, Q100, AM660, CTV Calgary, Citytv, Global Calgary, and Calgary Herald. Choose media partners based on your target audience and marketing budget."
    },
    servicesOffered: [
      "Radio advertising (CKFM, CJAY, Q100, AM660, AC 920)",
      "Television advertising (CTV Calgary, Citytv, Global Calgary)",
      "Local news sponsorships",
      "Print media (Calgary Herald, Calgary Sun)",
      "Digital media advertising",
      "Event promotion"
    ],
    hiddenGem: true,
    website: "https://www.calgaryherald.com/advertise",
    cost: "paid",
    lastUpdated: "2026-05",
    source: "Calgary Media",
  },

  // ============================================
  // EMERGENCY & WINTER SAFETY
  // ============================================
  {
    id: "211-alberta",
    category: ["emergency", "community"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "211 Alberta"
    },
    description: {
      en: "Free information and referral service connecting Calgarians to community and social services 24/7. Dial 2-1-1 or visit website to find help with food, housing, employment, health, and more."
    },
    servicesOffered: [
      "Information and referral",
      "Service navigation",
      "Crisis support",
      "Community resources"
    ],
    phone: "211",
    website: "https://ab.211.ca",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "211 Alberta",
  },
  {
    id: "help-team",
    category: ["emergency", "housing"],
    userTypes: ["newcomer", "family", "senior"],
    title: {
      en: "HELP Team (Formerly DOAP Team)"
    },
    description: {
      en: "Mobile outreach team helping vulnerable people on Calgary streets. Provides wellness checks, transportation to shelters, harm reduction supplies, and connections to services. Call if you see someone in distress."
    },
    servicesOffered: [
      "Wellness checks",
      "Shelter transportation",
      "Harm reduction supplies",
      "Service connections"
    ],
    phone: "403-998-7388",
    website: "https://alphahousecalgary.com",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Alpha House Calgary",
  },
  {
    id: "extreme-weather-response",
    category: ["emergency"],
    userTypes: ["newcomer", "family", "senior"],
    title: {
      en: "Extreme Weather Response"
    },
    description: {
      en: "Calgary's coordinated response during extreme cold or heat. Includes warming centres, daytime drop-in spaces, and emergency shelter shuttle (10:30 PM - 4:00 AM daily)."
    },
    servicesOffered: [
      "Warming centres",
      "Cooling centres",
      "Daytime drop-in spaces",
      "Emergency shelter shuttle"
    ],
    website: "https://calgaryhomeless.com/ewr",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Calgary Homeless Foundation",
  },

  // ============================================
  // EDUCATION & LANGUAGE
  // ============================================
  {
    id: "linc-classes",
    category: ["education", "newcomer"],
    userTypes: ["newcomer"],
    title: {
      en: "LINC Language Classes"
    },
    description: {
      en: "Free English language classes for permanent residents and refugees. Multiple levels from beginner to advanced. Offered at CCIS, Centre for Newcomers, Bow Valley College, and other locations. Free childcare available at some sites."
    },
    servicesOffered: [
      "English language instruction",
      "Multiple levels",
      "Free childcare (some locations)",
      "Flexible schedules"
    ],
    phone: "403-262-2006",
    website: "https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/new-life-canada/improve-english-french.html",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Immigration, Refugees and Citizenship Canada",
  },
  {
    id: "cpl-language",
    category: ["education", "newcomer"],
    userTypes: ["newcomer", "family"],
    title: {
      en: "Calgary Public Library - Language Learning"
    },
    description: {
      en: "Free language learning resources including conversation circles, language software (Mango Languages, Rosetta Stone), and newcomer conversation programs. No library card needed for in-library use."
    },
    servicesOffered: [
      "Conversation circles",
      "Language software",
      "Newcomer programs",
      "ESL resources"
    ],
    phone: "403-260-2600",
    address: "800 3rd Street SE, Calgary, AB (Central Library)",
    website: "https://calgarylibrary.ca/read-learn-and-explore/learn-a-language/",
    cost: "free",
    hiddenGem: true,
    lastUpdated: "2026-05",
    source: "Calgary Public Library",
  },

  // ============================================
  // TRANSIT
  // ============================================
  {
    id: "calgary-transit",
    category: ["transit"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "Calgary Transit"
    },
    description: {
      en: "Public transportation including buses and CTrain light rail. Low-income transit passes available through Fair Entry program. Plan trips using Google Maps or Calgary Transit app."
    },
    servicesOffered: [
      "Bus service",
      "CTrain light rail",
      "Low-income passes",
      "Trip planning",
      "Accessibility services"
    ],
    phone: "403-262-1000",
    website: "https://www.calgarytransit.com",
    cost: "paid",
    featured: true,
    lastUpdated: "2026-05",
    source: "City of Calgary",
  },
  {
    id: "fair-entry",
    category: ["transit", "community"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "Fair Entry - Low Income Programs"
    },
    description: {
      en: "City of Calgary program providing discounted transit passes, recreation, and other services for low-income residents. Apply online or at any Calgary Recreation facility."
    },
    servicesOffered: [
      "Discounted transit passes",
      "Recreation discounts",
      "Utility rebates",
      "Various city programs"
    ],
    phone: "403-268-FAIR (3247)",
    website: "https://www.calgary.ca/fairentry",
    cost: "free",
    hiddenGem: true,
    lastUpdated: "2026-05",
    source: "City of Calgary",
  },
  
  // ============================================
  // FAMILY & CHILDREN - MAINSTREAM FIRST
  // ============================================
  {
    id: "calgary-public-library-family",
    category: ["family", "education", "community"],
    userTypes: ["family", "student"],
    title: {
      en: "Calgary Public Library - Family Programs"
    },
    description: {
      en: "Free library programs for families: storytimes for ages 0-5, youth programs for ages 6-18, movies, activities, summer reading programs, homework help. 20+ locations across Calgary. No membership fee."
    },
    servicesOffered: [
      "Storytimes (ages 0-5)",
      "Youth programs (ages 6-18)",
      "Summer reading",
      "Free movies",
      "Activities & events",
      "Homework help"
    ],
    phone: "403-260-2600",
    website: "https://www.calgarylibrary.ca/kids",
    cost: "free",
    featured: true,
    lastUpdated: "2026-05",
    source: "Calgary Public Library",
  },
  {
    id: "calgary-zoo",
    category: ["family", "community"],
    userTypes: ["family"],
    title: {
      en: "Calgary Zoo"
    },
    description: {
      en: "World-class zoo with 4,000+ animals, interactive exhibits, and seasonal activities. Discounted rates for low-income families. Outdoor activities year-round. Perfect for ages 2-12."
    },
    servicesOffered: [
      "Animal exhibits",
      "Interactive experiences",
      "Educational programs",
      "Seasonal activities",
      "Discounted family passes"
    ],
    phone: "403-232-9300",
    address: "1300 Zoo Road NE, Calgary, AB",
    website: "https://www.calgaryzoo.com",
    cost: "paid",
    lastUpdated: "2026-05",
    source: "Calgary Zoo",
  },
  {
    id: "telus-spark",
    category: ["family", "education"],
    userTypes: ["family"],
    title: {
      en: "TELUS SPARK - Science & Innovation"
    },
    description: {
      en: "Interactive science centre with hands-on exhibits for kids ages 2+. Topics include robotics, coding, space exploration, energy, health. Drop-in programs and birthday parties. Discounted admission available."
    },
    servicesOffered: [
      "Hands-on science exhibits",
      "Coding & robotics",
      "Drop-in programs",
      "Birthday parties",
      "Workshops"
    ],
    phone: "403-817-7827",
    address: "220 11 Avenue SE, Calgary, AB",
    website: "https://www.telusspark.com",
    cost: "paid",
    lastUpdated: "2026-05",
    source: "TELUS SPARK",
  },
  {
    id: "calgary-indoor-parks",
    category: ["family", "community"],
    userTypes: ["family"],
    title: {
      en: "Calgary Indoor Play Centres"
    },
    description: {
      en: "Year-round indoor play spaces perfect for rainy/winter days. Options include: soft play areas (ages 0-5), trampoline parks, climbing gyms, activity centres. Many offer birthday party packages. Drop-in rates or memberships available."
    },
    servicesOffered: [
      "Soft play areas",
      "Trampoline parks",
      "Climbing gyms",
      "Birthday parties",
      "Drop-in rates"
    ],
    website: "https://www.calgary.ca/recreation",
    cost: "paid",
    lastUpdated: "2026-05",
    source: "Various Locations",
  },
  {
    id: "calgary-parks-playgrounds",
    category: ["family", "community"],
    userTypes: ["family"],
    title: {
      en: "Calgary Parks & Playgrounds"
    },
    description: {
      en: "500+ parks with playgrounds, splash pads (summer), picnic areas, and walking trails. Popular family parks: Eau Claire, Bow Habitat Station, Fish Creek Park, Bridgeland. Free access, perfect for all ages and budgets."
    },
    servicesOffered: [
      "Playgrounds",
      "Splash pads",
      "Picnic areas",
      "Walking trails",
      "Outdoor recreation"
    ],
    phone: "403-268-3800",
    website: "https://www.calgary.ca/parks",
    cost: "free",
    lastUpdated: "2026-05",
    source: "City of Calgary",
  },
  {
    id: "calgary-family-events-calendar",
    category: ["family", "community"],
    userTypes: ["family"],
    title: {
      en: "Calgary Family Events Calendar"
    },
    description: {
      en: "Seasonal family events throughout Calgary: festivals, markets, holiday events, outdoor movies, concerts. Check calgary.ca/events, library events, and community centre schedules. Many free or low-cost options."
    },
    servicesOffered: [
      "Festivals",
      "Markets",
      "Outdoor movies",
      "Holiday events",
      "Community events"
    ],
    website: "https://www.calgary.ca/events",
    cost: "paid",
    lastUpdated: "2026-05",
    source: "City of Calgary",
  },
  {
    id: "ymca-calgary-family",
    category: ["family", "community"],
    userTypes: ["family"],
    title: {
      en: "YMCA of Calgary - Family Programs"
    },
    description: {
      en: "Fitness, swimming lessons, youth programs, camps, family programs. Financial assistance available for low-income families. Multiple locations in Calgary."
    },
    servicesOffered: [
      "Swimming lessons",
      "Youth programs",
      "Family fitness",
      "Camps",
      "Financial aid"
    ],
    phone: "403-777-9622",
    website: "https://www.ymcacalgary.org",
    cost: "paid",
    lastUpdated: "2026-05",
    source: "YMCA of Calgary",
  },
  {
    id: "alberta-licensed-childcare-lookup",
    category: ["family"],
    userTypes: ["family", "newcomer"],
    title: {
      en: "Find Licensed Child Care & Daycare (Alberta)"
    },
    description: {
      en: "Official Government of Alberta tool to search and compare licensed daycare centres, out-of-school care, preschools, and approved family day homes near you. Every listing is government-licensed and inspected, with monitoring reports you can review before choosing."
    },
    summary: {
      en: "Search government-licensed daycares, preschools, and family day homes near you."
    },
    servicesOffered: [
      "Licensed daycare centres",
      "Approved family day homes",
      "Out-of-school care",
      "Preschool programs",
      "Inspection & monitoring reports",
    ],
    eligibility: {
      en: "Open to all Calgary families. Subsidy may be available for eligible low-income families."
    },
    phone: "1-844-644-5165",
    website: "https://www.alberta.ca/childcare",
    cost: "free",
    featured: true,
    languages: ["English", "French"],
    lastUpdated: "2026-05",
    source: "Government of Alberta",
  },
  {
    id: "calgary-childcare-connection",
    category: ["family"],
    userTypes: ["family", "newcomer"],
    title: {
      en: "Calgary Child Care Resource & Referral",
      tl: "Calgary Child Care Resource at Referral",
      es: "Recursos y referencias de cuidado infantil de Calgary",
      ar: "موارد وإحالات رعاية الأطفال في كالجاري",
      zh: "��尔���里托儿资源和��介",
    },
    description: {
      en: "Free help connecting Calgary families with quality, licensed child care that fits their needs and budget. Get personalized referrals to daycares, dayhomes, and preschools, plus guidance on subsidies, choosing a provider, and what to look for in a safe centre."
    },
    summary: {
      en: "Free, personalized referrals to vetted daycares, dayhomes, and preschools."
    },
    servicesOffered: [
      "Child care referrals",
      "Provider matching",
      "Subsidy guidance",
      "Choosing-a-provider support",
      "Newcomer family support",
    ],
    phone: "403-265-5377",
    website: "https://www.calgary.ca/residents/family/childcare.html",
    cost: "free",
    languages: ["English", "Multiple languages"],
    lastUpdated: "2026-05",
    source: "Alberta Child Care Resource & Referral",
  },
  {
    id: "calgary-childcare-subsidy",
    category: ["family"],
    userTypes: ["family"],
    title: {
      en: "Calgary Child Care Subsidy Program"
    },
    description: {
      en: "Government subsidy program for low-income families to access affordable child care. Eligible families can receive up to $1,700/month subsidy. Apply through Government of Alberta."
    },
    servicesOffered: [
      "Child care subsidies",
      "Eligible program applications",
      "Financial assistance",
      "Provider connections"
    ],
    phone: "1-844-755-1161",
    website: "https://www.alberta.ca/child-care-subsidy",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Government of Alberta",
  },

  {
    id: "volunteer-calgary",
    category: ["volunteering", "community"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "Volunteer Calgary"
    },
    description: {
      en: "Connect with volunteer opportunities across Calgary. Great way to build Canadian experience, practice English, make community connections, and contribute to causes you care about."
    },
    servicesOffered: [
      "Volunteer matching",
      "Skills-based volunteering",
      "Board placement",
      "Corporate volunteering"
    ],
    phone: "403-265-5633",
    website: "https://ab.211.ca",
    cost: "free",
    lastUpdated: "2026-05",
    source: "Volunteer Calgary",
  },
  {
    id: "calgary-recreation",
    category: ["community", "family"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "Calgary Recreation"
    },
    description: {
      en: "City-operated recreation centres, pools, fitness facilities, and programs across Calgary. Discounted access through Fair Entry program for low-income residents."
    },
    servicesOffered: [
      "Fitness centres",
      "Swimming pools",
      "Sports programs",
      "Youth programs",
      "Senior programs"
    ],
    phone: "403-268-3800",
    website: "https://www.calgary.ca/recreation",
    cost: "paid",
    lastUpdated: "2026-05",
    source: "City of Calgary",
  },
  {
    id: "community-associations",
    category: ["community"],
    userTypes: ["newcomer", "family", "senior"],
    title: {
      en: "Community Associations"
    },
    description: {
      en: "Calgary has over 150 community associations offering local programs, events, sports leagues, and neighbourhood connections. Find yours to discover hidden programs and discounts."
    },
    servicesOffered: [
      "Local programs",
      "Community events",
      "Sports leagues",
      "Neighbourhood connections"
    ],
    website: "https://www.calgarycommunities.com",
    cost: "low-cost",
    hiddenGem: true,
    lastUpdated: "2026-05",
    source: "Federation of Calgary Communities",
  },

  // ============================================
  // TRUSTED RENTAL PLATFORMS (most-used by Calgarians)
  // ============================================
  {
    id: "rentfaster-ca",
    category: ["housing"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "RentFaster.ca"
    },
    description: {
      en: "Calgary-founded and the most-used rental listing site in the city. Thousands of verified apartments, condos, basements, and houses for rent with photos, maps, prices, and direct landlord contact. Free to search and apply, with filters for pets, utilities included, and price range."
    },
    servicesOffered: [
      "Apartment rentals",
      "Condo rentals",
      "Basement suites",
      "House rentals",
      "Room rentals",
      "Map and price search",
    ],
    website: "https://www.rentfaster.ca/ab/calgary/rentals/",
    priority: 50,
    cost: "free",
    featured: true,
    lastUpdated: "2026-06",
    source: "RentFaster.ca",
  },
  {
    id: "liv-rent",
    category: ["housing"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "liv.rent"
    },
    description: {
      en: "Safety-first rental platform with pre-screened landlords and ID-verified listings to protect you from scams. Apply, sign digital contracts, and message landlords securely in one place — ideal for newcomers renting sight-unseen."
    },
    servicesOffered: [
      "ID-verified listings",
      "Pre-screened landlords",
      "Digital applications",
      "Secure digital contracts",
      "In-app messaging",
    ],
    website: "https://liv.rent/calgary",
    priority: 45,
    cost: "free",
    featured: true,
    lastUpdated: "2026-06",
    source: "liv.rent",
  },
  {
    id: "boardwalk-calgary",
    category: ["housing"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "Boardwalk"
    },
    description: {
      en: "One of Calgary's largest and most trusted residential landlords, offering professionally managed, well-maintained apartment communities across the city. Rent directly from the owner with transparent pricing, on-site staff, and reliable maintenance."
    },
    servicesOffered: [
      "Professionally managed apartments",
      "Direct-from-owner rentals",
      "On-site staff",
      "Reliable maintenance",
      "Transparent pricing",
    ],
    website: "https://www.boardwalkrental.com/en-CA/apartments-for-rent/ab/calgary",
    priority: 42,
    cost: "free",
    featured: true,
    lastUpdated: "2026-06",
    source: "Boardwalk",
  },
  {
    id: "rentals-ca",
    category: ["housing"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Rentals.ca"
    },
    description: {
      en: "National rental marketplace with a strong Calgary inventory of apartments and condos. Publishes the monthly Canada Rent Report so you can compare average Calgary rents before signing. Free search with verified listings and neighbourhood filters."
    },
    servicesOffered: [
      "Apartment rentals",
      "Condo rentals",
      "Average rent reports",
      "Neighbourhood search",
    ],
    website: "https://rentals.ca/calgary",
    priority: 38,
    cost: "free",
    lastUpdated: "2026-06",
    source: "Rentals.ca",
  },
  {
    id: "apartments-com-calgary",
    category: ["housing"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Apartments.com Calgary"
    },
    description: {
      en: "Large rental network with detailed Calgary apartment and condo listings, high-quality photos, 3D tours, floor plans, and verified pricing. Strong search filters and map view make it easy to compare professionally managed buildings."
    },
    servicesOffered: [
      "Apartment rentals",
      "Condo rentals",
      "3D tours and floor plans",
      "Verified pricing",
      "Map search and filters",
    ],
    website: "https://www.apartments.com/calgary-ab/",
    priority: 30,
    cost: "free",
    lastUpdated: "2026-06",
    source: "Apartments.com",
  },
  {
    id: "padmapper-calgary",
    category: ["housing"],
    userTypes: ["newcomer", "student", "family"],
    title: {
      en: "PadMapper Calgary"
    },
    description: {
      en: "Map-based rental search that aggregates listings from many sources onto one Calgary map. Great for comparing prices by neighbourhood and commute. Set custom alerts for new rentals that match your budget and bedrooms."
    },
    servicesOffered: [
      "Map-based rental search",
      "Price comparison",
      "Custom rental alerts",
      "Commute filtering",
    ],
    website: "https://www.padmapper.com/apartments/calgary-ab",
    priority: 22,
    cost: "free",
    lastUpdated: "2026-06",
    source: "PadMapper",
  },
  {
    id: "kijiji-calgary-rentals",
    category: ["housing"],
    userTypes: ["newcomer", "student", "family"],
    title: {
      en: "Kijiji Calgary Rentals"
    },
    description: {
      en: "One of Canada's busiest classifieds, widely used for Calgary rentals, rooms, and shared accommodation — often with budget-friendly and private-landlord options. Always view in person and never send a deposit before signing a lease (see RentShield for scam checks)."
    },
    servicesOffered: [
      "Apartment rentals",
      "Room rentals",
      "Shared accommodation",
      "Private landlord listings",
    ],
    website: "https://www.kijiji.ca/b-for-rent/calgary/c30349001l1700199",
    priority: 3,
    cost: "free",
    lastUpdated: "2026-06",
    source: "Kijiji",
  },
  {
    id: "facebook-marketplace-housing",
    category: ["housing"],
    userTypes: ["newcomer", "student", "family"],
    title: {
      en: "Facebook Marketplace — Calgary Rentals"
    },
    description: {
      en: "Hugely popular for Calgary rentals and roommate searches, with many listings posted directly by landlords and current tenants. Free to browse. Rental scams are common here — verify the unit in person, meet the landlord, and use RentShield before paying anything."
    },
    servicesOffered: [
      "Apartment rentals",
      "Roommate search",
      "Direct landlord listings",
    ],
    website: "https://www.facebook.com/marketplace/calgary/propertyrentals",
    priority: 2,
    cost: "free",
    lastUpdated: "2026-06",
    source: "Facebook Marketplace",
  },
  {
    id: "zumper-calgary",
    category: ["housing"],
    userTypes: ["newcomer", "student", "family"],
    title: {
      en: "Zumper Calgary"
    },
    description: {
      en: "Modern rental platform with verified Calgary apartment and condo listings, instant alerts, and the ability to apply online. Useful for newcomers who want a streamlined, photo-rich search with transparent pricing."
    },
    servicesOffered: [
      "Apartment rentals",
      "Condo rentals",
      "Online applications",
      "Instant alerts",
    ],
    website: "https://www.zumper.com/apartments-for-rent/calgary-ab",
    priority: 20,
    cost: "free",
    lastUpdated: "2026-06",
    source: "Zumper",
  },
  {
    id: "places4students",
    category: ["housing", "education"],
    userTypes: ["student", "newcomer"],
    title: {
      en: "Places4Students"
    },
    description: {
      en: "Official off-campus housing service partnered with the University of Calgary, SAIT, and Mount Royal University. Lists student-friendly rentals near campuses and helps match roommates. Free for students to use."
    },
    servicesOffered: [
      "Student rentals",
      "Roommate matching",
      "Near-campus housing",
      "Sublet listings",
    ],
    website: "https://www.places4students.com",
    priority: 16,
    cost: "free",
    lastUpdated: "2026-06",
    source: "Places4Students",
  },

  // ============================================
  // TRUSTED LEGAL DIRECTORIES
  // ============================================
  {
    id: "legal-aid-alberta",
    category: ["legal"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "Legal Aid Alberta"
    },
    description: {
      en: "Province-wide legal help for low-income Albertans covering family, immigration, tenancy, and criminal matters. Free legal advice by phone and representation if you qualify financially. Calgary office and a toll-free intake line."
    },
    servicesOffered: [
      "Free legal advice",
      "Family law help",
      "Immigration matters",
      "Tenancy disputes",
      "Legal representation",
    ],
    phone: "1-866-845-3425",
    website: "https://www.legalaid.ab.ca",
    cost: "free",
    featured: true,
    lastUpdated: "2026-06",
    source: "Legal Aid Alberta",
  },
  {
    id: "cplea-lawcentral",
    category: ["legal"],
    userTypes: ["newcomer", "family", "senior", "student"],
    title: {
      en: "CPLEA / LawCentral Alberta"
    },
    description: {
      en: "The Centre for Public Legal Education Alberta provides free, plain-language guides on tenant rights, employment, family law, and more through LawCentral Alberta. The trusted first stop to understand your rights before you act."
    },
    servicesOffered: [
      "Tenant rights guides",
      "Employment law info",
      "Family law resources",
      "Plain-language legal education",
    ],
    website: "https://www.cplea.ca",
    cost: "free",
    hiddenGem: true,
    lastUpdated: "2026-06",
    source: "Centre for Public Legal Education Alberta",
  },

  // ============================================
  // BUSINESS REGISTRATION & LICENSING (Calgary / Alberta)
  // ============================================
  {
    id: "alberta-corporate-registry",
    category: ["business"],
    userTypes: ["business", "newcomer"],
    title: {
      en: "Alberta Corporate Registry"
    },
    description: {
      en: "The mandatory provincial body where all Alberta corporations, trade names, and partnerships are filed. Start here to register your business structure on the official Alberta 'Starting a Business' portal before applying for a city licence."
    },
    servicesOffered: [
      "Incorporation filing",
      "Trade name / sole proprietorship registration",
      "Partnership registration",
      "Business structure guidance",
    ],
    website: "https://www.servicealberta.ca/register-a-business.cfm",
    priority: 50,
    cost: "paid",
    featured: true,
    lastUpdated: "2026-06",
    source: "Government of Alberta",
  },
  {
    id: "calgary-business-licence-myid",
    category: ["business"],
    userTypes: ["business", "newcomer"],
    title: {
      en: "City of Calgary Business Licence (myID)"
    },
    description: {
      en: "Once your provincial registration is complete, you must secure a local municipal business licence. Apply digitally using a personal or corporate myID account through the City of Calgary's online portal."
    },
    servicesOffered: [
      "Municipal business licence application",
      "Home-based business licence",
      "Licence renewal",
      "myID account setup",
    ],
    website: "https://www.calgary.ca/business-licences",
    priority: 45,
    cost: "paid",
    featured: true,
    lastUpdated: "2026-06",
    source: "City of Calgary",
  },
  {
    id: "business-link-alberta",
    category: ["business", "newcomer"],
    userTypes: ["business", "newcomer"],
    title: {
      en: "Business Link Alberta"
    },
    description: {
      en: "Government-funded non-profit offering FREE, structured guidance to help entrepreneurs navigate legal structures, registration, and provincial compliance. Specialized advisors support newcomers, women, and Indigenous entrepreneurs starting a business in Alberta."
    },
    servicesOffered: [
      "Free business advice",
      "Registration guidance",
      "Newcomer entrepreneur support",
      "Business plan help",
      "Compliance navigation",
    ],
    phone: "1-800-272-9675",
    website: "https://businesslink.ca",
    priority: 40,
    cost: "free",
    hiddenGem: true,
    lastUpdated: "2026-06",
    source: "Business Link Alberta",
  },
  {
    id: "ownr-business-registration",
    category: ["business"],
    userTypes: ["business", "newcomer"],
    title: {
      en: "Ownr — Online Business Registration"
    },
    description: {
      en: "Popular online platform that lets you register a sole proprietorship/trade name or incorporate in Alberta in minutes, with guided forms, name (NUANS) search, legal documents, and minute books. RBC business-account holders often get registration rebates."
    },
    servicesOffered: [
      "Online incorporation",
      "Sole proprietorship registration",
      "NUANS name search",
      "Legal documents & minute book",
    ],
    website: "https://www.ownr.co",
    priority: 35,
    cost: "paid",
    lastUpdated: "2026-06",
    source: "Ownr",
  },
  {
    id: "ama-registry-business",
    category: ["business"],
    userTypes: ["business", "newcomer"],
    title: {
      en: "AMA Registry — Business Services"
    },
    description: {
      en: "The Alberta Motor Association is a highly reputable authorized registry agent providing complete corporate registry services through trained specialists. Book an appointment to file incorporations, trade names, and NUANS reports securely in person."
    },
    servicesOffered: [
      "Corporate registry services",
      "Incorporation filing",
      "Trade name registration",
      "NUANS reports",
      "In-person appointments",
    ],
    website: "https://www.ama.ab.ca",
    priority: 30,
    cost: "paid",
    lastUpdated: "2026-06",
    source: "Alberta Motor Association",
  },
  {
    id: "nuans-name-report",
    category: ["business"],
    userTypes: ["business", "newcomer"],
    title: {
      en: "NUANS Alberta Business Name Report"
    },
    description: {
      en: "An official Alberta Business Name Report (NUANS) proves your chosen business name does not conflict with existing companies or trademarks — a required step before incorporating. Order through an authorized registry agent or online platform."
    },
    servicesOffered: [
      "Business name search",
      "Trademark conflict check",
      "Pre-incorporation name reservation",
    ],
    website: "https://www.nuans.com",
    priority: 20,
    cost: "paid",
    lastUpdated: "2026-06",
    source: "NUANS / ISED Canada",
  },

  // ============================================
  // SHIPPING & LOGISTICS (affordable, less-known Calgary providers)
  // ============================================
  {
    id: "chit-chats-shipping",
    category: ["logistics", "business"],
    userTypes: ["business", "newcomer", "family"],
    title: {
      en: "Chit Chats"
    },
    description: {
      en: "One of the cheapest all-round parcel shippers for everyday Calgarians and small online sellers. Ships within Canada, to the United States, and to over 200 countries worldwide at deeply discounted rates versus the big carriers."
    },
    servicesOffered: [
      "Domestic Canada shipping",
      "US shipping",
      "International shipping (200+ countries)",
      "Discounted carrier rates",
    ],
    phone: "1-844-842-4428",
    website: "https://chitchats.com",
    priority: 45,
    cost: "low-cost",
    featured: true,
    lastUpdated: "2026-06",
    source: "Chit Chats",
  },
  {
    id: "stallion-express-shipping",
    category: ["logistics", "business"],
    userTypes: ["business", "newcomer", "family"],
    title: {
      en: "Stallion Express"
    },
    description: {
      en: "Budget-friendly shipping built for Canadian online sellers and individuals. Ships within Canada, to the United States, and internationally with discounted postage, easy label printing, and drop-off/pickup options."
    },
    servicesOffered: [
      "Domestic Canada shipping",
      "US shipping",
      "International shipping",
      "Discounted postage & labels",
    ],
    phone: "1-877-370-1770",
    website: "https://stallionexpress.ca",
    priority: 40,
    cost: "low-cost",
    lastUpdated: "2026-06",
    source: "Stallion Express",
  },
  {
    id: "netparcel-shipping",
    category: ["logistics", "business"],
    userTypes: ["business", "newcomer", "family"],
    title: {
      en: "netParcel"
    },
    description: {
      en: "Free comparison platform that unlocks commercial discount rates on UPS, Purolator, and other name-brand carriers for individuals and small businesses — no subscription or volume commitment needed. Great when you want a premier courier's tracking and reliability without paying their full retail counter price. Also compares against Canada Post and the discount consolidators so you can pick the cheapest option for your exact box size and destination."
    },
    servicesOffered: [
      "Compare rates across carriers",
      "Discounted UPS & Purolator rates",
      "No subscription required",
      "US & international shipping",
      "Small business + individual accounts",
    ],
    website: "https://netparcel.com",
    priority: 38,
    cost: "low-cost",
    lastUpdated: "2026-08",
    source: "netParcel",
  },
  {
    id: "meest-canada-shipping",
    category: ["logistics", "newcomer"],
    userTypes: ["newcomer", "family", "business"],
    title: {
      en: "Meest Canada"
    },
    description: {
      en: "Specialist in parcels and barrels to Ukraine, Poland, Moldova, the Baltic States, Central Asia, and Eastern Europe. A trusted choice for Calgary's Eastern-European communities sending gifts and care packages home."
    },
    servicesOffered: [
      "Shipping to Ukraine & Poland",
      "Eastern Europe parcels",
      "Central Asia delivery",
      "Barrel & box shipping",
    ],
    phone: "587-887-1515",
    website: "https://www.meest.com",
    priority: 30,
    cost: "low-cost",
    lastUpdated: "2026-06",
    source: "Meest Canada",
  },
  {
    id: "polonez-parcel-service",
    category: ["logistics", "newcomer"],
    userTypes: ["newcomer", "family"],
    title: {
      en: "Polonez Parcel Service"
    },
    description: {
      en: "Long-established parcel service to Poland, Ukraine, and over 100 European and global destinations. Popular for affordable food parcels and gift boxes sent by Calgary's Polish and Ukrainian families."
    },
    servicesOffered: [
      "Shipping to Poland & Ukraine",
      "European destinations (100+)",
      "Food parcels & gift boxes",
    ],
    phone: "1-413-732-2212",
    website: "https://www.polonez.com",
    priority: 22,
    cost: "low-cost",
    lastUpdated: "2026-06",
    source: "Polonez Parcel Service",
  },
  {
    id: "sf-international-express",
    category: ["logistics", "newcomer"],
    userTypes: ["newcomer", "family", "business"],
    title: {
      en: "SF International (SF Express)"
    },
    description: {
      en: "Reliable express shipping to Hong Kong, Thailand, Mainland China, and Southeast Asia. A trusted option for Calgary's Asian communities sending documents, gifts, and goods quickly to family overseas."
    },
    servicesOffered: [
      "Shipping to Hong Kong & China",
      "Thailand & Southeast Asia",
      "Express documents & parcels",
    ],
    phone: "1-289-203-2630",
    website: "https://www.sf-international.com",
    priority: 22,
    cost: "low-cost",
    lastUpdated: "2026-06",
    source: "SF International",
  },
  {
    id: "alin-cargo-express",
    category: ["logistics", "newcomer"],
    userTypes: ["newcomer", "family"],
    title: {
      en: "ALiN Cargo Express"
    },
    description: {
      en: "Calgary-based cargo service shipping to the Philippines, Thailand, and Southeast Asian ports using affordable flat-rate balikbayan boxes. A community favourite for Filipino families sending goods home."
    },
    servicesOffered: [
      "Balikbayan boxes",
      "Shipping to Philippines",
      "Southeast Asia flat-rate boxes",
    ],
    phone: "403-300-2646",
    website: "https://www.alincargo.com",
    priority: 22,
    cost: "low-cost",
    hiddenGem: true,
    lastUpdated: "2026-06",
    source: "ALiN Cargo Express",
  },
  {
    id: "packaging-depot-calgary",
    category: ["logistics", "newcomer"],
    userTypes: ["newcomer", "family", "business"],
    title: {
      en: "Packaging Depot Calgary"
    },
    description: {
      en: "Independent consolidation service shipping to Africa, India, the Middle East, and worldwide. Handles larger and special shipments at competitive rates for Calgary families and small importers/exporters."
    },
    servicesOffered: [
      "Shipping to Africa & India",
      "Middle East delivery",
      "Consolidated worldwide shipping",
      "Large & special shipments",
    ],
    phone: "403-401-6945",
    website: "https://www.instagram.com/packagingdepot",
    priority: 20,
    cost: "low-cost",
    hiddenGem: true,
    lastUpdated: "2026-06",
    source: "Packaging Depot Calgary",
  },
  {
    id: "pikkol-alberta-shipping",
    category: ["logistics", "newcomer", "education"],
    userTypes: ["newcomer", "student", "family"],
    title: {
      en: "Pikkol Alberta"
    },
    description: {
      en: "Shipping to India, South Asia, and international student/family routes. Useful for newcomers and students moving belongings or sending parcels between Calgary and South Asia affordably."
    },
    servicesOffered: [
      "Shipping to India & South Asia",
      "Student moving / belongings",
      "International parcels",
    ],
    website: "https://www.pikkol.com",
    priority: 18,
    cost: "low-cost",
    lastUpdated: "2026-06",
    source: "Pikkol Alberta",
  },
  {
    id: "cbsa-import-export",
    category: ["logistics", "business"],
    userTypes: ["business", "newcomer"],
    title: {
      en: "CBSA — Importing & Exporting"
    },
    description: {
      en: "The Canada Border Services Agency is the official authority for importing and exporting goods. Register for a business import/export (RM) account, learn duty/tariff rules, and check what's restricted — essential before shipping commercial goods, food, liquids, or batteries."
    },
    servicesOffered: [
      "Import/export (RM) account registration",
      "Duty & tariff information",
      "Restricted/prohibited goods rules",
      "Commercial shipping guidance",
    ],
    phone: "1-800-461-9999",
    website: "https://www.cbsa-asfc.gc.ca/import/menu-eng.html",
    priority: 28,
    cost: "free",
    lastUpdated: "2026-06",
    source: "Canada Border Services Agency",
  },
  {
    id: "cfia-food-import-export",
    category: ["logistics", "business"],
    userTypes: ["business"],
    title: {
      en: "CFIA — Food Import/Export Licensing"
    },
    description: {
      en: "The Canadian Food Inspection Agency licenses and inspects food being imported or exported. If you plan to ship or sell food, get a Safe Food for Canadians (SFC) licence and check inspection and labelling requirements here first."
    },
    servicesOffered: [
      "Safe Food for Canadians (SFC) licence",
      "Food inspection requirements",
      "Labelling compliance",
      "Import/export certification",
    ],
    phone: "1-800-442-2342",
    website: "https://inspection.canada.ca/food-licences",
    priority: 24,
    cost: "free",
    lastUpdated: "2026-06",
    source: "Canadian Food Inspection Agency",
  },

  // ============================================
  // YEAR-ROUND IN-DEMAND JOBS (how to qualify)
  // ============================================
  {
    id: "skilled-trades-welding-pipeline",
    category: ["jobs", "education"],
    userTypes: ["newcomer", "student", "family"],
    title: {
      en: "Welding & Pipeline Trades — Always Hiring"
    },
    description: {
      en: "Alberta's energy, pipeline, and construction sectors need welders, pipefitters, and B-pressure welders year-round, especially for upcoming pipeline and plant projects. To qualify: complete a welding program (e.g. SAIT or Columbia College), register as an apprentice with Alberta Apprenticeship, and earn your journeyperson and B-pressure tickets for the highest pay."
    },
    servicesOffered: [
      "Welding & pipefitting careers",
      "Apprenticeship pathway",
      "B-pressure ticket guidance",
      "Journeyperson certification",
    ],
    website: "https://tradesecrets.alberta.ca",
    priority: 30,
    cost: "free",
    featured: true,
    lastUpdated: "2026-06",
    source: "Alberta Apprenticeship & Industry Training",
  },
  {
    id: "security-guard-licence-calgary",
    category: ["jobs", "newcomer"],
    userTypes: ["newcomer", "student", "family"],
    title: {
      en: "Security Guard — Steady Year-Round Work"
    },
    description: {
      en: "Security is one of the easiest year-round fields to enter in Calgary, with constant demand. To qualify: take the Alberta Basic Security Training (ABST) course (offered by Columbia College and others), pass the provincial exam, then apply for your Alberta Security Services licence. Entry-level friendly for newcomers."
    },
    servicesOffered: [
      "Alberta Basic Security Training (ABST)",
      "Provincial exam prep",
      "Security licence application",
      "Newcomer-friendly entry",
    ],
    website: "https://www.servicealberta.ca/security-services-licensing.cfm",
    priority: 26,
    cost: "low-cost",
    lastUpdated: "2026-06",
    source: "Government of Alberta — Security Licensing",
  },
  {
    id: "columbia-college-training",
    category: ["education", "jobs"],
    userTypes: ["newcomer", "student", "family"],
    title: {
      en: "Columbia College — Career Training"
    },
    description: {
      en: "Long-running Calgary non-profit college offering affordable, practical training that leads to in-demand jobs — including security (ABST), health-care aide, education assistant, and trades upgrading. Flexible schedules and newcomer support make it a strong first step into the workforce."
    },
    servicesOffered: [
      "Security training (ABST)",
      "Health-care aide program",
      "Education assistant program",
      "Trades upgrading",
      "Newcomer support",
    ],
    phone: "403-235-9300",
    website: "https://www.columbia.ab.ca/programs/",
    priority: 24,
    cost: "low-cost",
    hiddenGem: true,
    lastUpdated: "2026-06",
    source: "Columbia College Calgary",
  },
  {
    id: "healthcare-aide-demand",
    category: ["jobs", "education", "healthcare"],
    userTypes: ["newcomer", "student", "family"],
    title: {
      en: "Health-Care Aide — High Year-Round Demand"
    },
    description: {
      en: "Calgary's aging population keeps health-care aides in constant demand at care homes and home-care agencies. To qualify: complete a provincially recognized Health Care Aide certificate (offered by Bow Valley College, Columbia College, and others), often in under a year, with funding sometimes available for newcomers."
    },
    servicesOffered: [
      "Health Care Aide certificate",
      "Care home & home-care jobs",
      "Under 1-year programs",
      "Newcomer funding options",
    ],
    website: "https://bowvalleycollege.ca/programs-and-courses/health-care-aide",
    priority: 22,
    cost: "low-cost",
    lastUpdated: "2026-06",
    source: "Bow Valley College",
  },
  {
    id: "truck-driver-class1-demand",
    category: ["jobs", "logistics", "education"],
    userTypes: ["newcomer", "family"],
    title: {
      en: "Class 1 Truck Driver — Constant Demand"
    },
    description: {
      en: "Trucking and logistics keep Calgary's economy moving and need Class 1 drivers year-round. To qualify: complete Mandatory Entry-Level Training (MELT) at an Alberta-approved driving school, pass your Class 1 road test, and many carriers offer paid mentorship for new drivers."
    },
    servicesOffered: [
      "MELT Class 1 training",
      "Road test preparation",
      "Carrier mentorship programs",
      "Long-haul & local routes",
    ],
    website: "https://www.servicealberta.ca/mandatory-entry-level-training.cfm",
    priority: 20,
    cost: "low-cost",
    lastUpdated: "2026-06",
    source: "Government of Alberta — Commercial Licensing",
  },

  // ============================================
  // TOURISTS & VISITORS — places to visit, hotels, restaurants,
  // sightseeing and trusted local tour guides
  // ============================================
  {
    id: "tourism-calgary",
    category: ["tourism"],
    userTypes: ["family", "student", "newcomer"],
    title: {
      en: "Tourism Calgary — Official Visitor Guide"
    },
    description: {
      en: "The official destination guide for Calgary. Plan your trip with curated lists of top attractions, neighbourhoods, events, festivals, hotels and restaurants — plus seasonal itineraries and a visitor information centre."
    },
    summary: {
      en: "Official guide to attractions, hotels, dining and events in Calgary."
    },
    servicesOffered: ["Trip planning", "Attractions & itineraries", "Events calendar", "Visitor information centre"],
    website: "https://www.visitcalgary.com",
    featured: true,
    priority: 100,
    cost: "free",
    lastUpdated: "2026-06",
    source: "Tourism Calgary",
  },
  {
    id: "calgary-tower",
    category: ["tourism"],
    userTypes: ["family", "student"],
    title: {
      en: "Calgary Tower — Observation Deck"
    },
    description: {
      en: "Calgary's most recognizable landmark. Take in 360-degree views of the city, the Bow River and the Rocky Mountains from the observation deck and glass floor, then dine at the revolving Sky 360 restaurant.",
      tl: "Ang pinakatanyag na palatandaan ng Calgary na may 360-degree na tanawin.",
      es: "El monumento más emblemático de Calgary con vistas de 360 grados.",
      ar: "أشهر معالم كالج��ري بإطلالة 360 درجة و��رضي�� زجاجية.",
      zh: "卡尔加里最具标志性的��标，可俯瞰360度景观。",
    },
    address: "101 9 Ave SW, Calgary, AB",
    website: "https://www.calgarytower.com",
    priority: 90,
    cost: "paid",
    lastUpdated: "2026-06",
    source: "Calgary Tower",
    coordinates: { lat: 51.0447, lng: -114.0631 },
  },
  {
    id: "heritage-park",
    category: ["tourism"],
    userTypes: ["family", "student"],
    title: {
      en: "Heritage Park Historical Village"
    },
    description: {
      en: "Canada's largest living-history museum. Experience Calgary's pioneer past with costumed interpreters, a steam train, antique midway and the immersive White Hat Experience for culinary, spirit and heritage journeys."
    },
    address: "1900 Heritage Dr SW, Calgary, AB",
    website: "https://www.heritagepark.ca",
    priority: 85,
    cost: "paid",
    lastUpdated: "2026-06",
    source: "Heritage Park",
    coordinates: { lat: 50.9889, lng: -114.1003 },
  },
  {
    id: "studio-bell",
    category: ["tourism", "arts"],
    userTypes: ["family", "student"],
    title: {
      en: "Studio Bell — National Music Centre"
    },
    description: {
      en: "A striking architectural landmark in the East Village celebrating music in Canada. Explore interactive exhibits, rare instruments and the Canadian Music Hall of Fame."
    },
    address: "850 4 St SE, Calgary, AB",
    website: "https://www.studiobell.ca",
    priority: 75,
    cost: "paid",
    lastUpdated: "2026-06",
    source: "National Music Centre",
    coordinates: { lat: 51.0445, lng: -114.0533 },
  },
  {
    id: "toonie-tours",
    category: ["tourism"],
    userTypes: ["family", "student", "newcomer"],
    title: {
      en: "Toonie Tours — Walking & Bike Tours"
    },
    description: {
      en: "Highly rated, gratuity-based (free) walking tours and 3-hour bike tours covering Stephen Avenue, Prince's Island Park and the Bow River. A friendly, local introduction to downtown Calgary."
    },
    servicesOffered: ["Free walking tours", "3-hour bike tours", "Downtown highlights"],
    website: "https://www.toonietours.com",
    priority: 70,
    cost: "free",
    lastUpdated: "2026-06",
    source: "Toonie Tours",
  },
  {
    id: "history-wrangler",
    category: ["tourism"],
    userTypes: ["family", "student"],
    title: {
      en: "The History Wrangler (Rob Lennard)"
    },
    description: {
      en: "Award-winning local author and guide Rob Lennard brings Calgary's sandstone architecture and vibrant pioneer history to life through engaging, story-rich tours."
    },
    servicesOffered: ["History walking tours", "Sandstone architecture tours", "Storytelling"],
    website: "https://www.thehistorywrangler.com",
    priority: 60,
    cost: "paid",
    lastUpdated: "2026-06",
    source: "The History Wrangler",
  },
  {
    id: "calgary-walks-bus-tours",
    category: ["tourism"],
    userTypes: ["family", "senior", "student"],
    title: {
      en: "CalgaryWalks & Bus Tours"
    },
    description: {
      en: "Recommended for exploring historical landmarks like the Eau Claire district and Inglewood at a comfortable pace, with both walking and bus tour options."
    },
    servicesOffered: ["Walking tours", "Bus tours", "Eau Claire & Inglewood"],
    website: "https://www.calgarywalks.com",
    priority: 55,
    cost: "paid",
    lastUpdated: "2026-06",
    source: "CalgaryWalks",
  },
  {
    id: "alberta-blue-sky-tours",
    category: ["tourism"],
    userTypes: ["family", "student"],
    title: {
      en: "Alberta Blue Sky Tours — Rockies Day Trips"
    },
    description: {
      en: "Founded by Rockies guide Martin Flanagan (guiding since 1995). Widely trusted for small-group trips connecting Calgary to Banff, Jasper and Yoho national parks."
    },
    servicesOffered: ["Banff day trips", "Jasper & Yoho tours", "Small-group Rockies tours"],
    website: "https://www.albertabluesky.com",
    priority: 65,
    cost: "paid",
    lastUpdated: "2026-06",
    source: "Alberta Blue Sky Tours",
  },
  {
    id: "calgary-tours-rockies",
    category: ["tourism"],
    userTypes: ["family", "student"],
    title: {
      en: "Calgary Tours — Sightseeing & Rockies",
      tl: "Calgary Tours — Sightseeing at Rockies",
      es: "Calgary Tours — Turismo y Rocosas",
      ar: "Calgary Tours — جولات سياحية وال��وكيز",
      zh: "Calgary Tours ���� 观光��落基山",
    },
    description: {
      en: "A large, reliable local operator handling inbound and outbound sightseeing and transit, especially trips to the Canadian Rockies and Drumheller's dinosaur country."
    },
    servicesOffered: ["Rockies sightseeing", "Drumheller tours", "City sightseeing"],
    website: "https://www.calgary-tours.com",
    priority: 50,
    cost: "paid",
    lastUpdated: "2026-06",
    source: "Calgary Tours",
  },
  {
    id: "toursbylocals-calgary",
    category: ["tourism"],
    userTypes: ["family", "student"],
    title: {
      en: "ToursByLocals Calgary — Book Verified Guides"
    },
    description: {
      en: "For more personalized attention, filter and book specific, verified local guides for private and custom tours of Calgary and the surrounding region."
    },
    servicesOffered: ["Private guides", "Custom itineraries", "Verified local experts"],
    website: "https://www.toursbylocals.com/calgary-tours",
    priority: 45,
    cost: "paid",
    lastUpdated: "2026-06",
    source: "ToursByLocals",
  },
  {
    id: "stephen-avenue-dining",
    category: ["tourism"],
    userTypes: ["family", "student"],
    title: {
      en: "Stephen Avenue & 17th Ave — Dining Districts"
    },
    description: {
      en: "Calgary's best-rated restaurant strips. Stephen Avenue (downtown) and the 17th Avenue 'Red Mile', plus Inglewood, are packed with top-rated restaurants, cafes, patios and nightlife."
    },
    servicesOffered: ["Top-rated restaurants", "Cafes & patios", "Nightlife"],
    website: "https://www.visitcalgary.com/things-to-do/food-drink",
    priority: 40,
    cost: "paid",
    lastUpdated: "2026-06",
    source: "Tourism Calgary",
  },
  {
    id: "downtown-calgary-hotels",
    category: ["tourism"],
    userTypes: ["family", "student", "business"],
    title: {
      en: "Where to Stay — Downtown Calgary Hotels"
    },
    description: {
      en: "Best-rated places to stay are clustered downtown near Stephen Avenue — within walking distance of dining, the CTrain (free downtown) and major attractions. Browse and compare highly-rated hotels for your dates."
    },
    servicesOffered: ["Downtown hotels", "Walkable to attractions", "Near free CTrain zone"],
    website: "https://www.visitcalgary.com/places-to-stay",
    priority: 80,
    cost: "paid",
    lastUpdated: "2026-06",
    source: "Tourism Calgary",
  },

  // ============================================
  // FLEXIBLE WORKSPACES
  // ============================================
  {
    id: "work-nicer-coworking",
    category: ["workspace", "business"],
    userTypes: ["business", "creator", "student"],
    title: {
      en: "Work Nicer Coworking (Roxboro Lofts / Beaver House)"
    },
    description: {
      en: "Flexible, community-driven shared desks and meeting rooms with 24/7 access. Offers hot desks, dedicated desks, private offices, high-speed Wi-Fi, and bottomless coffee."
    },
    summary: {
      en: "Flexible, community-driven coworking with hot desks, private offices, and 24/7 access."
    },
    servicesOffered: ["Hot desks", "Dedicated desks", "Private offices", "High-speed Wi-Fi", "Meeting rooms", "Bottomless coffee"],
    phone: "403-800-3233",
    website: "https://worknicer.com",
    cost: "paid",
    priority: 80,
    lastUpdated: "2026-06",
    source: "Work Nicer",
  },
  {
    id: "calgary-public-library-workspace",
    category: ["workspace", "education", "community"],
    userTypes: ["newcomer", "student", "family", "senior"],
    title: {
      en: "Calgary Public Library (Central Library & Branches)"
    },
    description: {
      en: "Absolutely free, high-quality study desks, bookable meeting rooms, and digital studios. Includes free Wi-Fi, quiet study spaces, group rooms, and specialized dual-screen workstations."
    },
    summary: {
      en: "100% free study desks, bookable meeting rooms, Wi-Fi, and digital studios across the city."
    },
    servicesOffered: ["Free Wi-Fi", "Quiet study spaces", "Bookable group rooms", "Dual-screen workstations", "Digital studios"],
    phone: "403-260-2600",
    website: "https://calgarylibrary.ca",
    cost: "free",
    priority: 90,
    featured: true,
    lastUpdated: "2026-06",
    source: "Calgary Public Library",
  },

  // ============================================
  // ON-BUDGET STORAGE FACILITIES
  // ============================================
  {
    id: "bluebird-self-storage",
    category: ["storage"],
    userTypes: ["newcomer", "family", "business", "student"],
    title: {
      en: "Bluebird Self Storage"
    },
    description: {
      en: "Affordable, pristine climate-controlled storage units with competitive move-in promotions. Offers varying locker dimensions, indoor heated units, and 24/7 monitored security access."
    },
    summary: {
      en: "Affordable climate-controlled storage with 24/7 monitored security and move-in promotions."
    },
    servicesOffered: ["Climate-controlled units", "Indoor heated storage", "24/7 monitored security", "Varying locker sizes"],
    phone: "587-317-5750",
    website: "https://bluebirdstorage.ca",
    cost: "paid",
    priority: 80,
    lastUpdated: "2026-06",
    source: "Bluebird Self Storage",
  },
  {
    id: "sentinel-storage",
    category: ["storage"],
    userTypes: ["newcomer", "family", "business", "student"],
    title: {
      en: "Sentinel Storage"
    },
    description: {
      en: "Low-cost baseline storage rates across multiple easily accessible city quadrants. Offers drive-up access units, roll-up locker entry, and packing and moving supplies."
    },
    summary: {
      en: "Low-cost storage with drive-up access across multiple Calgary quadrants."
    },
    servicesOffered: ["Drive-up access units", "Roll-up locker entry", "Packing & moving supplies", "Multiple locations"],
    phone: "403-243-5585",
    website: "https://sentinel.ca",
    cost: "low-cost",
    priority: 70,
    lastUpdated: "2026-06",
    source: "Sentinel Storage",
  },

  // ============================================
  // CULTURAL & ETHNIC STORES / GROCERS
  // ============================================
  {
    id: "a-mart-korean-grocer",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "A-Mart (Korean & Asian Grocer)"
    },
    description: {
      en: "Authentic Korean staples, imported global goods, marinated meats, and pocket-friendly snacks. Carries fresh produce, bulk rice brands, specialty sauces, and traditional housewares."
    },
    summary: {
      en: "Authentic Korean & Asian groceries — fresh produce, marinated meats, and specialty sauces."
    },
    servicesOffered: ["Fresh produce", "Bulk rice brands", "Marinated meats", "Specialty sauces", "Traditional housewares"],
    phone: "403-255-7484",
    website: "https://amartcalgary.com",
    cost: "low-cost",
    priority: 70,
    lastUpdated: "2026-06",
    source: "A-Mart",
  },
  {
    id: "unimarket-latin-grocer",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Unimarket (Latin American Food & Importers)"
    },
    description: {
      en: "High-quality, hard-to-find authentic South & Central American culinary products. Carries fresh corn tortillas, specialty cheeses, imported spices, and hot-food deli counters."
    },
    summary: {
      en: "Authentic Latin American groceries — fresh tortillas, specialty cheeses, and a hot-food deli."
    },
    servicesOffered: ["Fresh corn tortillas", "Specialty cheeses", "Imported spices", "Hot-food deli counter"],
    phone: "403-255-4479",
    website: "https://unimarket.ca",
    cost: "low-cost",
    priority: 65,
    lastUpdated: "2026-06",
    source: "Unimarket",
  },
  {
    id: "sanaza-fine-foods",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Sanaza Fine Foods (South Asian & Halal Grocer)"
    },
    description: {
      en: "Premium bulk South Asian spices, basmati rice varieties, and verified fresh halal meat. Carries spices, lentils, halal goat, chicken and beef cuts, and frozen convenience meals."
    },
    summary: {
      en: "South Asian & Halal grocer — bulk spices, basmati rice, and verified fresh halal meat."
    },
    servicesOffered: ["Bulk spices", "Lentils", "Basmati rice", "Halal goat, chicken & beef", "Frozen meals"],
    phone: "403-273-9797",
    website: "https://sanazafinefoods.com",
    cost: "low-cost",
    priority: 65,
    lastUpdated: "2026-06",
    source: "Sanaza Fine Foods",
  },

  // ---- Indigenous & Multicultural Boutiques ----
  {
    id: "moonstone-creation-gallery",
    category: ["ethnic-market", "arts", "indigenous"],
    userTypes: ["newcomer", "family"],
    title: {
      en: "Moonstone Creation (Indigenous Art & Boutique)"
    },
    description: {
      en: "An authentic, Indigenous-owned gallery and boutique in Inglewood showcasing traditional handmade art, clothing, and beadwork from over 60 native artists across Turtle Island. One of Calgary's most respected Indigenous cultural destinations."
    },
    summary: {
      en: "Indigenous-owned Inglewood gallery — handmade art, clothing, and beadwork from 60+ Turtle Island artists."
    },
    address: "1219 10 Ave SE, Calgary",
    servicesOffered: ["Indigenous art", "Traditional clothing", "Beadwork", "Handmade crafts", "Gift shopping"],
    website: "https://moonstonecreation.ca",
    cost: "low-cost",
    priority: 75,
    hiddenGem: true,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },
  {
    id: "manana-imports-gifts",
    category: ["ethnic-market", "community"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Mañana Imports & Gifts (Multicultural Boutique)"
    },
    description: {
      en: "A long-standing family business in Kensington carrying multicultural items: handmade clothing, blankets, incense, and altar deities sourced directly from Nepal, Tibet, and Latin America. A beloved neighbourhood fixture for over two decades."
    },
    summary: {
      en: "Kensington multicultural boutique — handmade goods from Nepal, Tibet, and Latin America."
    },
    address: "Hillhurst / Kensington, Calgary",
    servicesOffered: ["Handmade clothing", "Blankets", "Incense", "Altar deities", "Imported cultural goods"],
    cost: "low-cost",
    priority: 65,
    hiddenGem: true,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },
  {
    id: "moonlight-books-gifts-chinatown",
    category: ["ethnic-market", "arts", "community"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Moonlight Books & Gifts (Chinatown)"
    },
    description: {
      en: "Tucked inside Chinatown's Dragon City Mall, this highly curated shop carries stationery, pins, and accessories crafted by local creators alongside works by Asian-Canadian authors. A perfect stop for unique gifts that celebrate Asian culture."
    },
    summary: {
      en: "Chinatown's Dragon City Mall gem — curated stationery, pins, and Asian-Canadian authors' books."
    },
    address: "328 Centre St S #122, Calgary (Dragon City Mall)",
    servicesOffered: ["Asian-Canadian literature", "Stationery", "Handmade accessories", "Local creator goods"],
    cost: "low-cost",
    priority: 60,
    hiddenGem: true,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },
  {
    id: "tigerstedt-friends-gift-shop",
    category: ["ethnic-market", "arts"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Tigerstedt & Friends Gift Shop"
    },
    description: {
      en: "A dynamic pop-up retail space in Crescent Heights hosting local makers and specializing in Japanese imports, unique stationery, skincare, and vintage items. A rotating selection of curated finds from Calgary's indie creator community.",
      tl: "Dynamic na pop-up retail space sa Crescent Heights na may Japanese imports, stationery, skincare, at vintage items.",
      es: "Espacio pop-up en Crescent Heights con importaciones japonesas, papelería única, cosméticos y artículos vintage.",
      ar: "متجر منبثق في Crescent Heights مع واردات يابانية وقرطاسية فريدة ومستحضرات تجميل وقطع ��تيقة.",
      zh: "新月高地动态��闪零售店�����营日本进口品、文具、护肤品和复古物品。",
    },
    summary: {
      en: "Crescent Heights pop-up — Japanese imports, unique stationery, skincare, and vintage curated finds."
    },
    address: "Crescent Heights, Calgary",
    servicesOffered: ["Japanese imports", "Stationery", "Skincare", "Vintage items", "Local maker goods"],
    cost: "low-cost",
    priority: 58,
    hiddenGem: true,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },

  // ---- Latin American Markets (expanded) ----
  {
    id: "unimarket-edmonton-trail",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "UniMarket Latin Food — Edmonton Trail NE (Food Hall)"
    },
    description: {
      en: "A hybrid cultural destination at 2405 Edmonton Trail NE housing an extensive imported Latin American grocery, a fresh bakery, and an in-house food hall serving authentic Colombian and Mexican dishes. Rated one of Calgary's best Latin food experiences."
    },
    summary: {
      en: "Edmonton Trail NE Latin cultural hub — imported grocery, fresh bakery, and Colombian/Mexican food hall."
    },
    address: "2405 Edmonton Trail NE, Calgary",
    servicesOffered: ["Imported Latin groceries", "Fresh bakery", "Colombian dishes", "Mexican cuisine", "Food hall"],
    website: "https://unimarket.ca",
    cost: "low-cost",
    priority: 72,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },
  {
    id: "latino-food-market",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Latino Food Market"
    },
    description: {
      en: "A premium hub for Latin American ingredients at 4803 Centre St N, highly rated for specialty taco elements including fresh corn tortillas, Oaxaca cheese, and whole dried guajillo peppers. Exceptional for home cooks seeking authentic Mexican and Central American staples."
    },
    summary: {
      en: "Premium Latin ingredients — fresh corn tortillas, Oaxaca cheese, and authentic Mexican staples."
    },
    address: "4803 Centre St N Suite 101, Calgary",
    servicesOffered: ["Fresh corn tortillas", "Oaxaca cheese", "Dried chiles", "Mexican staples", "Central American ingredients"],
    cost: "low-cost",
    priority: 68,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },
  {
    id: "salsita-mexican-grocery",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Salsita & The Real Mexican Food Inc."
    },
    description: {
      en: "Known for high-quality Mexican groceries, premium hot sauces, and freshly made tortillas alongside takeout food options. Located at 777 Northmount Dr NW, it serves Calgary's northwest with hard-to-find authentic Mexican products."
    },
    summary: {
      en: "NW Calgary Mexican grocery — premium hot sauces, fresh tortillas, and takeout options."
    },
    address: "777 Northmount Dr NW, Calgary",
    servicesOffered: ["Mexican groceries", "Hot sauces", "Fresh tortillas", "Takeout food"],
    cost: "low-cost",
    priority: 63,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },

  // ---- East & Southeast Asian Supermarkets ----
  {
    id: "hong-kong-food-market-intl-ave",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Hong Kong Food Market (International Avenue)"
    },
    description: {
      en: "A sprawling independent staple on International Avenue at 3215 17 Ave SE. Features massive aisles of noodles, sauces, frozen seafood, and on-premise counters including Filipino BBQ. One of Calgary's most comprehensive Asian grocery destinations."
    },
    summary: {
      en: "Massive International Ave Asian grocery — noodles, frozen seafood, and Filipino BBQ counter."
    },
    address: "3215 17 Ave SE, Calgary",
    servicesOffered: ["Asian noodles & sauces", "Frozen seafood", "Filipino BBQ counter", "Asian produce", "Specialty imports"],
    cost: "low-cost",
    priority: 78,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },
  {
    id: "tt-supermarket-deerfoot",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "T&T Supermarket — Deerfoot (Asian Chain)"
    },
    description: {
      en: "Canada's largest Asian grocery chain with a full Deerfoot location offering an extensive range of East Asian, Southeast Asian, and South Asian products, a full fresh bakery, and a prepared foods hot bar. Ideal for families wanting one-stop Asian shopping."
    },
    summary: {
      en: "Canada's top Asian grocery chain — full fresh bakery, hot food bar, and East/SE Asian products."
    },
    address: "Deerfoot Meadows, Calgary",
    servicesOffered: ["East Asian groceries", "Southeast Asian products", "Fresh bakery", "Prepared hot foods", "South Asian staples"],
    website: "https://tntsupermarket.com",
    cost: "low-cost",
    priority: 82,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },
  {
    id: "tt-supermarket-north-hill",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "T&T Supermarket — North Hill Centre"
    },
    description: {
      en: "A central-north Calgary location of Canada's largest Asian grocery chain inside North Hill Centre mall, making it highly accessible for residents across the inner north. Carries the full T&T range: fresh dim sum, live seafood tanks, Asian produce, and a full bakery."
    },
    summary: {
      en: "T&T North Hill — fresh dim sum, live seafood tanks, and full Asian grocery range."
    },
    address: "1632 14 Ave NW, Calgary (North Hill Centre)",
    servicesOffered: ["Fresh dim sum", "Live seafood", "Asian produce", "Full bakery", "East/SE Asian groceries"],
    website: "https://tntsupermarket.com",
    cost: "low-cost",
    priority: 80,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },
  {
    id: "osaka-supermarket",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Osaka Supermarket (Japanese & Asian Grocer)"
    },
    description: {
      en: "Calgary's go-to destination for Japanese specialty groceries: fresh sashimi-grade fish, Japanese snacks, specialty sauces, sake, miso varieties, and hard-to-find Japanese pantry staples. A trusted staple for the Japanese and broader Asian community in Calgary."
    },
    summary: {
      en: "Calgary's Japanese grocery hub — sashimi-grade fish, Japanese snacks, sake, and miso."
    },
    servicesOffered: ["Sashimi-grade fish", "Japanese snacks", "Specialty sauces", "Sake", "Miso varieties", "Ramen staples"],
    cost: "low-cost",
    priority: 72,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },
  {
    id: "arirang-korean-supermarket",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: {
      en: "Arirang Korean Supermarket"
    },
    description: {
      en: "A dedicated Korean supermarket carrying a full range of Korean groceries: gochujang, doenjang, kimchi varieties, Korean ramen, tteok (rice cakes), fresh tofu, marinated bulgogi meats, and Korean beauty pantry items. Serves Calgary's growing Korean community."
    },
    summary: {
      en: "Full Korean supermarket — kimchi, gochujang, ramen, tteok, and marinated bulgogi meats."
    },
    servicesOffered: ["Kimchi varieties", "Gochujang & doenjang", "Korean ramen", "Tteok (rice cakes)", "Marinated bulgogi", "Korean pantry staples"],
    cost: "low-cost",
    priority: 70,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },
  {
    id: "continental-spice-importers",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family"],
    title: {
      en: "Continental Spice & Grocery (South Asian & World Foods)"
    },
    description: {
      en: "Specializes in a wide selection of South Asian, Middle Eastern, and African grocery staples including bulk spices, lentils, flours, rice varieties, halal meats, and international pantry essentials. A favourite for newcomers from South Asia and East Africa."
    },
    summary: {
      en: "South Asian, Middle Eastern & African groceries — bulk spices, lentils, flours, and halal meats.",
      tl: "South Asian, Middle Eastern, at African groceries — spices, lentils, at halal meats.",
      es: "Comestibles sudasiáticos, de Oriente Medio y africanos — especias, lentejas y halal.",
      ar: "بقالة جنوب آسيوية وشرق أوسطية وأفريقية — بهارات ��عدس ولحوم حلال.",
      zh: "南亚、中东及���洲食品 — 散���香料、扁豆及清真肉类。",
    },
    servicesOffered: ["Bulk spices", "Lentils & legumes", "Specialty flours", "Rice varieties", "Halal meats", "International pantry"],
    cost: "low-cost",
    priority: 68,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },
  {
    id: "sunrise-african-caribbean-market",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family"],
    title: {
      en: "Sunrise African & Caribbean Market"
    },
    description: {
      en: "One of Calgary's best-stocked African and Caribbean grocery stores. Carries plantains, yams, cassava flour, suya spices, jerk seasonings, palm oil, dried fish, Scotch bonnet peppers, and specialty drinks from West Africa, East Africa, and the Caribbean."
    },
    summary: {
      en: "African & Caribbean grocery — plantains, cassava flour, suya spices, jerk seasonings, and palm oil."
    },
    servicesOffered: ["Plantains & yams", "Cassava flour", "Suya spices", "Jerk seasonings", "Palm oil", "Dried fish", "Scotch bonnet peppers"],
    cost: "low-cost",
    priority: 70,
    hiddenGem: true,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },
  {
    id: "halal-meat-middle-east-grocer",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family"],
    title: {
      en: "Al Noor Halal Meat & Middle Eastern Groceries"
    },
    description: {
      en: "A trusted halal butcher and Middle Eastern grocer serving Calgary's Muslim and Arab communities. Carries fresh-cut halal lamb, goat, beef, and chicken alongside specialty items: feta, labneh, za'atar, dried fruits, nuts, and imported olive oils."
    },
    summary: {
      en: "Halal butcher & Middle Eastern grocer — fresh halal meats, labneh, za'atar, and imported olive oils."
    },
    servicesOffered: ["Fresh halal lamb & goat", "Halal beef & chicken", "Feta & labneh", "Za'atar & spices", "Dried fruits & nuts", "Imported olive oils"],
    cost: "low-cost",
    priority: 72,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },
  {
    id: "filipino-store-calgary",
    category: ["ethnic-market", "essentials"],
    userTypes: ["newcomer", "family"],
    title: {
      en: "Philam Foods — Filipino Grocery & Deli"
    },
    description: {
      en: "Calgary's best-known Filipino grocery and deli, stocking a comprehensive range of Filipino pantry staples: bagoong, patis, vinegar varieties, longganisa sausages, frozen tocino, ube products, and ready-to-eat sinagang and adobo packs. A vital resource for Calgary's large Filipino community."
    },
    summary: {
      en: "Calgary's top Filipino grocery — bagoong, longganisa, ube products, and ready-to-eat Filipino meals."
    },
    servicesOffered: ["Filipino pantry staples", "Bagoong & patis", "Longganisa sausages", "Frozen tocino", "Ube products", "Ready-to-eat meals"],
    cost: "low-cost",
    priority: 72,
    lastUpdated: "2026-06",
    source: "Google Maps / Gemini",
  },

  // ============================================
  // FARMERS MARKETS & LOCAL FARM PRODUCE
  // ============================================
  {
    id: "calgary-farmers-market",
    category: ["farmers-market", "essentials"],
    userTypes: ["family", "newcomer", "senior", "student"],
    title: {
      en: "Calgary Farmers' Market (West & South Locations)"
    },
    description: {
      en: "Direct farm-to-table access with fresh provincial produce, locally raised poultry, and craft preserves. Offers organic seasonal vegetables, pasture-raised poultry, BC orchard fruits, and artisanal meats.",
      tl: "Direct farm-to-table na fresh na produce at poultry.",
      es: "Acceso directo de la granja a la mesa con productos frescos.",
      ar: "وصول مباشر من المزرعة إلى المائدة بمنتجات طازجة.",
      zh: "农场直达���桌的新鲜本地农产品。",
    },
    summary: {
      en: "Farm-to-table fresh produce, pasture-raised poultry, and artisanal meats year-round."
    },
    servicesOffered: ["Organic seasonal vegetables", "Pasture-raised poultry", "BC orchard fruits", "Artisanal meats", "Craft preserves"],
    phone: "403-243-7440",
    website: "https://calgaryfarmersmarket.ca",
    cost: "low-cost",
    priority: 85,
    featured: true,
    lastUpdated: "2026-06",
    source: "Calgary Farmers' Market",
  },
  {
    id: "crossroads-market",
    category: ["farmers-market", "essentials"],
    userTypes: ["family", "newcomer", "senior", "student"],
    title: {
      en: "Crossroads Market"
    },
    description: {
      en: "Budget-conscious family farm shopping with historical indoor/outdoor stalls operating year-round. Offers local root vegetables, butcher-cut free-range meats, artisanal baking, and orchard goods."
    },
    summary: {
      en: "Year-round budget-friendly market — local produce, free-range meats, and artisanal baking."
    },
    servicesOffered: ["Local root vegetables", "Free-range meats", "Artisanal baking", "Orchard goods"],
    phone: "403-269-1922",
    website: "https://crossroadsmarket.ca",
    cost: "low-cost",
    priority: 75,
    lastUpdated: "2026-06",
    source: "Crossroads Market",
  },
  {
    id: "tk-ranch-farm-delivery",
    category: ["farmers-market", "essentials"],
    userTypes: ["family", "newcomer", "senior"],
    title: {
      en: "TK Ranch (Online Farm Delivery to Calgary)"
    },
    description: {
      en: "100% grass-fed, grass-finished heirloom beef, heritage pork, and wild pasture poultry. Offers bulk meat packs, grass-fed beef cuts, soy-free poultry, and direct-to-door temperature-controlled delivery."
    },
    summary: {
      en: "Grass-fed beef, heritage pork, and pasture poultry delivered to your door."
    },
    servicesOffered: ["Bulk meat packs", "Grass-fed beef cuts", "Soy-free poultry", "Temperature-controlled delivery"],
    phone: "403-854-3300",
    website: "https://tkranch.com",
    cost: "paid",
    priority: 70,
    lastUpdated: "2026-06",
    source: "TK Ranch",
  },

  // ============================================
  // LOCAL ESSENTIALS (TAILORS & HANDYMEN)
  // ============================================
  {
    id: "the-stitch-room-tailoring",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior", "student", "business"],
    title: {
      en: "The Stitch Room (Local Custom Tailoring)"
    },
    description: {
      en: "Flawless, budget-friendly garment alterations, clothing repairs, and custom textile tailoring. Offers suit adjustments, zipper replacements, dress alterations, and heavy denim hemming."
    },
    summary: {
      en: "Budget-friendly alterations, repairs, and custom tailoring — suits, dresses, and denim."
    },
    servicesOffered: ["Suit adjustments", "Zipper replacements", "Dress alterations", "Heavy denim hemming"],
    phone: "403-242-2334",
    website: "https://thestitchroom.ca",
    cost: "low-cost",
    priority: 70,
    lastUpdated: "2026-06",
    source: "The Stitch Room",
  },
  {
    id: "calgary-affordable-handyman",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior", "business"],
    title: {
      en: "Calgary Affordable Handyman Services"
    },
    description: {
      en: "Transparently priced, prompt home maintenance, appliance set-ups, and technical quick fixes. Offers drywall repairs, flat-pack furniture assembly, hanging tasks, and minor plumbing work."
    },
    summary: {
      en: "Transparently priced home maintenance — drywall, furniture assembly, and minor plumbing."
    },
    servicesOffered: ["Drywall repairs", "Flat-pack furniture assembly", "Hanging tasks", "Minor plumbing work", "Appliance set-ups"],
    phone: "403-903-8845",
    website: "https://calgaryhandymanservice.info",
    cost: "low-cost",
    priority: 70,
    lastUpdated: "2026-06",
    source: "Calgary Affordable Handyman Services",
  },

  // ============================================
  // EDUCATION — COLLEGES, UNIVERSITIES & CONTINUING / SHORT COURSES
  // ============================================
  {
    id: "bow-valley-college-main",
    category: ["education", "newcomer"],
    userTypes: ["newcomer", "student", "family", "senior"],
    title: {
      en: "Bow Valley College"
    },
    description: {
      en: "Calgary's largest public community college, downtown. Offers career diplomas and certificates, academic upgrading and high-school equivalency, English Language Learning (ELL), government-funded LINC classes for newcomers, and continuing-education short courses. Intakes run throughout the year and many programs include work-integrated learning."
    },
    summary: {
      en: "Diplomas, academic upgrading, English Language Learning, LINC, and year-round short courses."
    },
    servicesOffered: ["Career diplomas & certificates", "Academic upgrading", "High-school equivalency", "English Language Learning (ELL)", "Government-funded LINC", "Continuing-education short courses"],
    address: "345 6 Ave SE, Calgary",
    phone: "403-410-1400",
    website: "https://bowvalleycollege.ca",
    cost: "paid",
    priority: 90,
    featured: true,
    lastUpdated: "2026-06",
    source: "Bow Valley College",
  },
  {
    id: "sait-continuing-education",
    category: ["education"],
    userTypes: ["student", "newcomer", "business"],
    title: {
      en: "SAIT — Continuing Education & Professional Studies"
    },
    description: {
      en: "Southern Alberta Institute of Technology offers hands-on, job-ready training. Beyond full-time diplomas, its Continuing Education & Professional Studies stream runs part-time evening/weekend short courses and professional certificates year-round — in project management, data, IT, trades, business, and health — designed for working adults and career changers."
    },
    summary: {
      en: "Part-time, year-round professional short courses and certificates for working adults."
    },
    servicesOffered: ["Professional certificates", "Evening & weekend short courses", "Project management", "Data & IT", "Trades & business upgrading"],
    address: "1301 16 Ave NW, Calgary",
    phone: "403-284-7248",
    website: "https://sait.ca/programs-and-courses/continuing-education",
    cost: "paid",
    priority: 82,
    lastUpdated: "2026-06",
    source: "SAIT",
  },
  {
    id: "ucalgary-continuing-education",
    category: ["education", "business"],
    userTypes: ["student", "business", "newcomer"],
    title: {
      en: "University of Calgary — Continuing Education"
    },
    description: {
      en: "Flexible, part-time certificates and open-enrolment short courses for adults — most require no prior degree to start. Year-round offerings include business analytics, project management, professional writing, languages, leadership, and personal-interest classes, available in-person and online."
    },
    summary: {
      en: "Part-time certificates and open short courses — most need no prior degree, in-person or online."
    },
    servicesOffered: ["Open-enrolment certificates", "Business analytics", "Project management", "Professional writing", "Languages & leadership", "Online & in-person"],
    phone: "403-220-2866",
    website: "https://conted.ucalgary.ca",
    cost: "paid",
    priority: 80,
    lastUpdated: "2026-06",
    source: "University of Calgary Continuing Education",
  },
  {
    id: "mru-continuing-education",
    category: ["education", "business"],
    userTypes: ["student", "business", "senior"],
    title: {
      en: "Mount Royal University — Continuing Education"
    },
    description: {
      en: "Extension certificates and short courses with flexible day, evening, weekend, and online scheduling. Popular areas include business analysis, human resources, interior styling, languages, music, and personal enrichment — built for adults balancing work and study."
    },
    summary: {
      en: "Flexible extension certificates and short courses — day, evening, weekend, and online."
    },
    servicesOffered: ["Extension certificates", "Business analysis", "Human resources", "Languages & music", "Evening, weekend & online classes"],
    address: "4825 Mount Royal Gate SW, Calgary",
    phone: "403-440-3833",
    website: "https://www.mtroyal.ca/ProgramsCourses/ContinuingEducation",
    cost: "paid",
    priority: 78,
    lastUpdated: "2026-06",
    source: "Mount Royal University",
  },

  /* ===== EDUCATION: DAYCARE, PRIMARY & SECONDARY (search near your home) ===== */
  {
    id: "daycare-childcare-finder",
    category: ["education", "family"],
    userTypes: ["family", "newcomer"],
    title: {
      en: "Daycare & Childcare — Find One Near You"
    },
    description: {
      en: "What parents must know: 1) Confirm the provider holds an active Alberta Child Care Licensing status. 2) Check if it takes part in the $15-a-day affordability grant to lower your fees. 3) Prefer registered Montessori or play-based programs for balanced early development. Tip: Open Google Maps, search 'licensed daycare near me' in your own neighbourhood, and choose places with the most positive recent reviews before you book a tour."
    },
    summary: {
      en: "Licensed infant, toddler & preschool care — search your neighbourhood and pick top-reviewed spots."
    },
    servicesOffered: ["Infant care", "Toddler rooms", "Preschool spaces", "Out-of-school care"],
    website: "https://www.alberta.ca/childcare",
    mapUrl: "https://www.google.com/maps/search/licensed+daycare+near+me",
    cost: "sliding-scale",
    priority: 92,
    featured: true,
    lastUpdated: "2026-06",
    source: "Government of Alberta — Child Care Lookup",
  },
  {
    id: "primary-school-finder",
    category: ["education", "family"],
    userTypes: ["family", "newcomer"],
    title: {
      en: "Primary / Elementary Schools (K–6)"
    },
    description: {
      en: "What parents must know: 1) Your home address sets your designated public (CBE) or Catholic (CCSD) school. 2) Registration is free; bring proof of address, your child's ID and immunization records. 3) Ask about before/after-school care and language support if needed. Tip: Open Google Maps, search 'elementary school near me' from your residence, and compare schools with strong recent parent reviews."
    },
    summary: {
      en: "Find your designated K–6 public or Catholic school by neighbourhood.",
      tl: "Hanapin ang designated K–6 school ayon sa lugar.",
      es: "Encuentre su escuela primaria designada por barrio.",
      ar: "اعثر على مدرستك ا��ابتدائية المخصصة حس�� الحي.",
      zh: "按社区查找指定的小学。",
    },
    servicesOffered: ["Kindergarten", "Grades 1–6", "Before/after-school care", "Language support"],
    phone: "403-817-4000",
    website: "https://www.cbe.ab.ca/registration/Pages/find-your-designated-school.aspx",
    mapUrl: "https://www.google.com/maps/search/elementary+school+near+me",
    cost: "free",
    priority: 90,
    lastUpdated: "2026-06",
    source: "Calgary Board of Education / Calgary Catholic",
  },
  {
    id: "secondary-school-finder",
    category: ["education", "family"],
    userTypes: ["family", "newcomer"],
    title: {
      en: "Secondary Schools — Junior & Senior High (7–12)"
    },
    description: {
      en: "What parents must know: 1) Junior high (7–9) and senior high (10–12) may differ from your elementary designation, so confirm the catchment. 2) Compare programs — IB, AP, sports, arts, trades and bilingual streams vary by school. 3) Senior high diploma requirements and course selection matter for college/university. Tip: Open Google Maps, search 'high school near me' from home, and shortlist schools with the highest recent reviews and the programs your teen needs."
    },
    summary: {
      en: "Find junior & senior high schools by catchment and compare programs near you."
    },
    servicesOffered: ["Grades 7–9 (junior high)", "Grades 10–12 (senior high)", "IB / AP streams", "Trades & arts programs", "Diploma prep"],
    phone: "403-817-4000",
    website: "https://www.cbe.ab.ca/registration/Pages/find-your-designated-school.aspx",
    mapUrl: "https://www.google.com/maps/search/high+school+near+me",
    cost: "free",
    priority: 88,
    lastUpdated: "2026-06",
    source: "Calgary Board of Education / Calgary Catholic",
  },

  /* ===== EDUCATION: TERTIARY — TOP-RATED CALGARY CAMPUSES ===== */
  {
    id: "university-of-calgary-main",
    category: ["education"],
    userTypes: ["student", "newcomer"],
    title: {
      en: "University of Calgary (UCalgary)"
    },
    description: {
      en: "Top-tier global research university — strong in engineering, business (Haskayne), veterinary medicine, health sciences and the humanities. What students must know: confirm your program is a Designated Learning Institution (DLI) for study-permit and post-graduation work eligibility, and note the main campus sits on the CTrain Red Line for easy transit. Tip: open Google Maps to view the campus footprint and plan your commute."
    },
    summary: {
      en: "Global research university — engineering, business, veterinary medicine, health & more."
    },
    servicesOffered: ["Undergraduate degrees", "Master's programs", "PhD research", "Continuing education", "Designated Learning Institution"],
    address: "2500 University Dr NW, Calgary",
    phone: "403-220-5110",
    website: "https://www.ucalgary.ca/",
    mapUrl: "https://www.google.com/maps/search/University+of+Calgary",
    cost: "paid",
    priority: 96,
    featured: true,
    lastUpdated: "2026-06",
    source: "University of Calgary",
  },
  {
    id: "sait-main",
    category: ["education"],
    userTypes: ["student", "newcomer"],
    title: {
      en: "Southern Alberta Institute of Technology (SAIT)"
    },
    description: {
      en: "Industry-trusted polytechnic known for hands-on, job-ready training — trades, technology, culinary arts, business and health. What students must know: many programs are Designated Learning Institution (DLI) eligible, apprenticeships ladder into journeyperson tickets, and the main Calgary campus is steps from the SAIT/AUArts/Jubilee CTrain station. Tip: open Google Maps to scope the campus and transit."
    },
    summary: {
      en: "Hands-on polytechnic — trades, technology, culinary arts, business & health."
    },
    servicesOffered: ["Apprenticeships", "Diplomas", "Applied degrees", "Certificates", "Corporate training"],
    address: "1301 16 Ave NW, Calgary",
    phone: "403-284-7248",
    website: "https://sait.ca",
    mapUrl: "https://www.google.com/maps/search/SAIT+Calgary",
    cost: "paid",
    priority: 94,
    featured: true,
    lastUpdated: "2026-06",
    source: "SAIT",
  },
  {
    id: "mount-royal-university-main",
    category: ["education"],
    userTypes: ["student", "newcomer"],
    title: {
      en: "Mount Royal University (MRU)"
    },
    description: {
      en: "Undergraduate-focused university praised for small class sizes and strong teaching — nursing, aviation, communications, business and education. What students must know: degree programs are Designated Learning Institution (DLI) eligible, and the SW campus is served by frequent BRT/MAX bus routes. Tip: open Google Maps to view the campus and plan your transit before applying."
    },
    summary: {
      en: "Undergraduate university — nursing, aviation, communications, business & education."
    },
    servicesOffered: ["Bachelor's degrees", "Credit certificates", "Specialized diplomas", "Aviation program", "Nursing program"],
    address: "4825 Mount Royal Gate SW, Calgary",
    phone: "403-440-6111",
    website: "https://mtroyal.ca",
    mapUrl: "https://www.google.com/maps/search/Mount+Royal+University+Calgary",
    cost: "paid",
    priority: 92,
    featured: true,
    lastUpdated: "2026-06",
    source: "Mount Royal University",
  },
  {
    id: "chinook-learning-services",
    category: ["education", "newcomer"],
    userTypes: ["newcomer", "student", "family"],
    title: {
      en: "Chinook Learning Services (CBE Adult Learning)"
    },
    description: {
      en: "The Calgary Board of Education's adult-education arm. Offers high-school upgrading and diploma-credit courses, post-secondary prep, and English as an Additional Language (EAL). A practical path for adults completing their diploma or preparing for the Canadian Adult Education Credential (CAEC) — which has replaced the GED across Canada."
    },
    summary: {
      en: "Adult high-school upgrading, post-secondary prep, EAL, and CAEC (replaces GED) preparation."
    },
    servicesOffered: ["High-school upgrading", "Diploma-credit courses", "Post-secondary preparation", "English as an Additional Language (EAL)", "CAEC preparation"],
    phone: "403-817-7777",
    website: "https://www.chinooklearningservices.com",
    cost: "low-cost",
    priority: 80,
    lastUpdated: "2026-06",
    source: "Chinook Learning Services (Calgary Board of Education)",
  },

  // ============================================
  // HOUSING — Layer 1 Top Rated (Master Data Pack)
  // ============================================
  {
    id: "the-metropolitan-apartments",
    category: ["housing"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "The Metropolitan Apartments" },
    description: { en: "Professionally managed apartment community at 1235 11 Ave SW with top-rated amenities, community events, and responsive 24/7 maintenance. Rated 4.7★ with verified reviews praising management quality." },
    servicesOffered: ["Long-term rentals", "Community amenities", "24/7 maintenance", "Professional management"],
    phone: "(403) 228-6380",
    address: "1235 11 Ave SW, Calgary, AB",
    website: "https://liveatthemet.ca",
    cost: "paid",
    priority: 87,
    hiddenGem: true,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "versus-living",
    category: ["housing"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "VERSUS Living" },
    description: { en: "Modern pet-friendly apartment community in NW Calgary rated 4.6★. Features contemporary finishes, in-suite laundry, and a welcoming community atmosphere. Great option for young professionals and families new to Calgary." },
    servicesOffered: ["Modern apartment rentals", "Pet-friendly units", "In-suite laundry", "NW Calgary location"],
    website: "https://versusliving.ca",
    cost: "paid",
    priority: 86,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "mainstreet-equity-corp",
    category: ["housing"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "Mainstreet Equity Corp" },
    description: { en: "One of Alberta's largest affordable rental portfolios with properties across Calgary. Budget-friendly units in multiple neighbourhoods. Good option for newcomers seeking affordable market-rate housing with professional property management." },
    servicesOffered: ["Affordable rentals", "Multiple Calgary locations", "Online applications", "Professional management"],
    website: "https://mainst.ca",
    cost: "paid",
    priority: 83,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "rtdrs-tenant-rights",
    category: ["housing", "legal"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "RTDRS — Residential Tenancy Dispute Resolution" },
    description: { en: "Alberta's free dispute resolution service for landlord-tenant conflicts. Handles unpaid rent, security deposits, eviction notices, repairs, and lease violations. Faster and cheaper than going to court. Rated one of the most effective tenant protection tools in Canada." },
    servicesOffered: ["Dispute resolution hearings", "Eviction disputes", "Deposit disputes", "Repair order enforcement", "Free for tenants"],
    phone: "403-297-2500",
    website: "https://rtdrs.alberta.ca",
    cost: "free",
    featured: true,
    priority: 90,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // JOBS & CAREER — Layer 1 Top Staffing Agencies
  // ============================================
  {
    id: "equation-staffing",
    category: ["jobs"],
    userTypes: ["newcomer", "student", "family"],
    title: { en: "Equation Staffing Solutions" },
    description: { en: "Calgary's top-rated staffing agency (4.9★) specializing in permanent, temporary, and contract placements across all sectors. Local team with deep Calgary employer network. Known for fast placements and honest communication with candidates." },
    servicesOffered: ["Permanent placement", "Temporary staffing", "Contract roles", "Resume support", "Interview prep"],
    phone: "403-237-9808",
    website: "https://eqstaffingsolutions.com",
    cost: "free",
    featured: true,
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "about-staffing",
    category: ["jobs"],
    userTypes: ["newcomer", "student", "family"],
    title: { en: "About Staffing" },
    description: { en: "BBB Accredited staffing agency rated 4.8★ and recognized on Forbes' Top 80 list. Serves all sectors across Calgary with a strong reputation for integrity and candidate care. Free service for job seekers." },
    servicesOffered: ["All-sector placements", "Temporary and permanent roles", "BBB accredited", "Free for job seekers"],
    phone: "403-508-1000",
    website: "https://aboutstaffing.com",
    cost: "free",
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "bowen-group",
    category: ["jobs"],
    userTypes: ["newcomer", "student"],
    title: { en: "BOWEN Group" },
    description: { en: "Calgary-based staffing firm rated 4.7★ specializing in energy, technology, and professional services sectors. Particularly strong network in Alberta's oil & gas industry. Good first call for trades and technical professionals." },
    servicesOffered: ["Energy sector placements", "Technology roles", "Professional services", "Contract staffing"],
    phone: "403-265-4466",
    website: "https://bowengroup.ca",
    cost: "free",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "david-aplin-group",
    category: ["jobs"],
    userTypes: ["newcomer", "student"],
    title: { en: "David Aplin Group" },
    description: { en: "Executive and professional placement firm rated 4.7★. Specializes in senior-level and mid-management roles across finance, HR, engineering, and legal. Strong Calgary presence for 40+ years." },
    servicesOffered: ["Executive search", "Professional placement", "Finance and accounting", "HR and legal roles"],
    phone: "403-269-4400",
    website: "https://aplin.com",
    cost: "free",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "express-employment-calgary",
    category: ["jobs"],
    userTypes: ["newcomer", "student", "family"],
    title: { en: "Express Employment Professionals Calgary South" },
    description: { en: "Rated 5.0★ — Calgary's top-rated staffing agency for skilled trades, administrative, and industrial roles. Part of North America's largest franchise staffing network. Free for job seekers. Specializes in getting newcomers into the workforce quickly." },
    servicesOffered: ["Skilled trades placement", "Industrial workers", "Administrative roles", "Fast placement", "Free for job seekers"],
    phone: "403-255-3350",
    website: "https://expresspros.ca",
    cost: "free",
    featured: true,
    priority: 100,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "randstad-calgary",
    category: ["jobs"],
    userTypes: ["newcomer", "student"],
    title: { en: "Randstad Calgary" },
    description: { en: "Global staffing leader with a strong Calgary office rated 4.5★. Strong in engineering, finance, and IT roles. Large employer network with direct access to major Calgary corporations." },
    servicesOffered: ["Engineering placements", "Finance roles", "IT and technology", "Large employer network"],
    phone: "403-269-4301",
    website: "https://randstad.ca",
    cost: "free",
    priority: 95,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // HEALTHCARE — Layer 1 Walk-In Clinics
  // ============================================
  {
    id: "now-medical-walkin",
    category: ["healthcare"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Now Medical Walk-In Clinic" },
    description: { en: "Calgary's top-rated walk-in clinic (4.8★) open 7:30AM–11PM seven days a week including holidays. Located at 2520 23 St NE. Known for fast service, professional staff, and extended hours that serve shift workers and families." },
    servicesOffered: ["Walk-in medical care", "Extended hours 7:30AM–11PM", "Open holidays", "Prescription renewals", "Minor injury treatment"],
    phone: "587-391-8188",
    address: "2520 23 St NE #19, Calgary, AB",
    website: "https://nowmedical.ca",
    cost: "free",
    featured: true,
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "sheldon-chumir-urgent-care",
    category: ["healthcare", "mental-health", "emergency"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Sheldon M. Chumir Health Centre" },
    description: { en: "Calgary's only 24/7 urgent care walk-in clinic downtown, plus a mental health walk-in. Rated 4.6★. Located at 1213 4 St SW. Handles urgent (non-life-threatening) conditions and mental health crises without an appointment. Essential resource for downtown Calgary residents." },
    servicesOffered: ["24/7 urgent care", "Mental health walk-in", "No appointment needed", "Downtown location", "X-ray and lab on site"],
    phone: "403-955-6200",
    address: "1213 4 St SW, Calgary, AB",
    cost: "free",
    featured: true,
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "medicentres-calgary",
    category: ["healthcare"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Medicentres Family Care Clinics" },
    description: { en: "9 walk-in clinic locations across Calgary rated 4.5★. Extended evening and weekend hours. Accepts walk-ins for minor illnesses, prescription renewals, occupational health, and travel medicine. Direct billing to Alberta Health Care." },
    servicesOffered: ["Walk-in care", "9 Calgary locations", "Extended hours", "Direct billing", "Travel medicine", "Occupational health"],
    phone: "403-287-0700",
    website: "https://medicentres.com",
    cost: "free",
    priority: 95,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "smartclinics-calgary",
    category: ["healthcare"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "SmartClinics Calgary" },
    description: { en: "Modern multi-location walk-in clinics rated 4.5★ offering both virtual and in-person appointments. Known for minimal wait times and streamlined online check-in. Good option for tech-comfortable patients who want efficient care." },
    servicesOffered: ["In-person walk-in", "Virtual care", "Online check-in", "Multiple locations", "Fast service"],
    website: "https://smartclinics.ca",
    cost: "free",
    priority: 95,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // FAMILY & CHILDCARE — Layer 1 Top Providers
  // ============================================
  {
    id: "columbia-childcare-centre",
    category: ["family"],
    userTypes: ["newcomer", "family"],
    title: { en: "Columbia Childcare Centre" },
    description: { en: "Top-rated downtown childcare centre (5.0★) eligible for Alberta's $10/day childcare program. Exceptional curriculum, experienced educators, and bilingual options. Associated with Columbia College. Apply early — waitlist is competitive." },
    servicesOffered: ["$10/day program eligible", "Full-day childcare", "Bilingual options", "Downtown location", "Excellence curriculum"],
    phone: "403-235-9300",
    website: "https://columbiachildcare.ca/",
    cost: "low-cost",
    featured: true,
    priority: 100,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "alphabeez-childcare",
    category: ["family"],
    userTypes: ["newcomer", "family"],
    title: { en: "AlphaBeeZ Childcare Centre" },
    description: { en: "Downtown Calgary childcare rated 4.9★. Enrolled in Alberta's $10/day program with bilingual options and a nurturing environment. Strong reputation among newcomer families for inclusive and supportive approach to early childhood education." },
    servicesOffered: ["$10/day program eligible", "Bilingual options", "Full-day care", "Infant to school-age", "Newcomer-friendly"],
    phone: "403-264-5437",
    website: "https://alphabeez.ca",
    cost: "low-cost",
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "brightpath-kids",
    category: ["family"],
    userTypes: ["newcomer", "family"],
    title: { en: "Brightpath Kids Childcare" },
    description: { en: "6 Calgary locations rated 4.6★, all enrolled in Alberta's $10/day childcare program. Structured learning environment, STEM-focus activities, and flexible scheduling. Popular choice for working parents across Calgary." },
    servicesOffered: ["$10/day program", "6 Calgary locations", "Ages 6 weeks to 12 years", "STEM activities", "Before and after school care"],
    website: "https://brightpath.ca",
    cost: "low-cost",
    priority: 96,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // FOOD SUPPORT — Layer 1 Most Trusted Programs
  // ============================================
  {
    id: "the-alex-food-centre",
    category: ["food", "healthcare", "mental-health", "legal"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "The Alex Community Food Centre" },
    description: { en: "Calgary's most holistic community support hub rated 4.8★. Combines food access with legal help, mental health services, and healthcare under one roof at 1318 Centre St NE. No-judgment environment. A true hidden gem for comprehensive community support." },
    servicesOffered: ["Fresh food access", "Free legal clinic", "Mental health support", "Healthcare navigation", "Community meals", "No ID required"],
    phone: "403-455-5792",
    address: "1318 Centre St NE, Calgary, AB",
    website: "https://thealex.ca",
    cost: "free",
    featured: true,
    hiddenGem: true,
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "cups-calgary",
    category: ["food", "housing", "healthcare"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "CUPS Calgary" },
    description: { en: "Rated 4.7★. Integrates food support, housing assistance, and healthcare in one central location at 128 7 Ave SE. Serves Calgary's most vulnerable residents with dignity and wraparound support." },
    servicesOffered: ["Food hampers", "Housing support", "Healthcare access", "Wraparound services", "Downtown location"],
    phone: "403-221-8780",
    address: "128 7 Ave SE, Calgary, AB",
    cost: "free",
    featured: true,
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "fresh-routes-mobile-market",
    category: ["food"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Fresh Routes Mobile Market" },
    description: { en: "Rated 4.8★. Brings affordable fresh produce directly to underserved neighbourhoods across Calgary. Pay-what-you-can pricing model. Check freshroutes.ca for current schedule — markets rotate weekly to different community locations." },
    servicesOffered: ["Affordable fresh produce", "Mobile market model", "Neighbourhood delivery", "Pay-what-you-can pricing"],
    website: "https://freshroutes.ca",
    cost: "low-cost",
    hiddenGem: true,
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "good-food-box",
    category: ["food"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "The Good Food Box" },
    description: { en: "Rated 4.7★. Fresh produce boxes for $25–$35, available to any Calgarian. Community Kitchen Program of Calgary (CKPYYC) runs this program to increase access to fresh vegetables and fruit in all income brackets." },
    servicesOffered: ["Fresh produce boxes $25–$35", "Weekly pickup locations", "No income requirement", "Local sourcing"],
    phone: "403-538-3780",
    cost: "low-cost",
    hiddenGem: true,
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "neighbourlink-calgary",
    category: ["food", "emergency"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "NeighbourLink Calgary" },
    description: { en: "Rated 4.7★. Delivers emergency food hampers at no cost to Calgarians in crisis. No complex intake — just call and they'll coordinate delivery or pickup. Fills the gap for people who can't physically access a food bank." },
    servicesOffered: ["Emergency hamper delivery", "No-cost service", "Crisis support", "Home delivery available"],
    phone: "403-209-1930",
    website: "https://neighbourlink.ca",
    cost: "free",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "dashmesh-food-bank",
    category: ["food"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Dashmesh Culture Centre Food Bank" },
    description: { en: "Rated 4.6★. NE Calgary's largest community-run food bank at 135 Martindale Blvd NE. Offers online ordering and free delivery. Run by the Sikh community and open to everyone regardless of faith. Hidden gem for NE Calgary residents." },
    servicesOffered: ["Online ordering", "Free delivery", "No income verification", "Open to all faiths", "NE Calgary focus"],
    phone: "403-590-0970",
    address: "135 Martindale Blvd NE, Calgary, AB",
    website: "https://dashmesh.ca",
    cost: "free",
    hiddenGem: true,
    priority: 96,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "inn-from-the-cold",
    category: ["food", "housing", "emergency", "family"],
    userTypes: ["newcomer", "family"],
    title: { en: "Inn from the Cold — Family Shelter & Meals" },
    description: { en: "Rated 4.6★. Calgary's only dedicated family homeless shelter and community meals program at 106 110 11 Ave SE. Serves families in crisis with warm meals, safe shelter, and connections to long-term housing. No family turned away." },
    servicesOffered: ["Family shelter", "Warm meals daily", "Housing connections", "Family crisis support", "No family turned away"],
    phone: "403-263-8384",
    address: "106 110 11 Ave SE, Calgary, AB",
    cost: "free",
    featured: true,
    priority: 96,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // MENTAL HEALTH — Layer 1 Top Counselling Providers
  // ============================================
  {
    id: "grit-psychology",
    category: ["mental-health"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: { en: "Grit Psychology & Counselling" },
    description: { en: "Rated 4.9★ — Calgary's top-rated private psychology practice. Specializes in anxiety, trauma, and CBT. Sliding scale fees make it accessible. Warm, trauma-informed clinicians with experience supporting newcomers and diverse communities." },
    servicesOffered: ["Individual therapy", "CBT", "Trauma counselling", "Anxiety treatment", "Sliding scale fees"],
    website: "https://gritpsychology.ca",
    cost: "sliding-scale",
    featured: true,
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "living-well-counselling",
    category: ["mental-health"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: { en: "Living Well Counselling Calgary" },
    description: { en: "Rated 4.9★. Known for their policy of 'no one turned away due to finances.' Accessible pricing with a commitment to removing financial barriers to mental health care. Strong team of registered therapists across multiple specialties." },
    servicesOffered: ["Individual counselling", "Couples therapy", "No-one-turned-away policy", "Accessible pricing", "Registered therapists"],
    website: "https://livingwellcounselling.ca",
    cost: "sliding-scale",
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "cmha-calgary",
    category: ["mental-health"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: { en: "CMHA Calgary Region" },
    description: { en: "Canadian Mental Health Association — Calgary Region, rated 4.7★. Offers free workshops through Recovery College (no referral needed), peer support groups, and crisis connections. Best free starting point if you're unsure where to begin with mental health." },
    servicesOffered: ["Free Recovery College workshops", "Peer support groups", "Crisis connections", "Virtual and in-person", "No referral required"],
    phone: "403-297-1700",
    website: "https://cmhacalgary.ca",
    cost: "free",
    featured: true,
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "virtuous-circle-counselling",
    category: ["mental-health"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "Virtuous Circle Counselling" },
    description: { en: "Rated 4.8★. Trauma-informed, inclusive practice welcoming all genders and backgrounds. Known for culturally sensitive counselling that particularly supports newcomers navigating identity, relationships, and settlement stress." },
    servicesOffered: ["Trauma therapy", "All genders welcome", "Culturally sensitive", "Individual and couples", "Newcomer support"],
    website: "https://virtuouscircle.ca",
    cost: "sliding-scale",
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "vue-psychology",
    category: ["mental-health"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: { en: "Vue Psychology" },
    description: { en: "Rated 4.8★. Large multi-specialty psychology practice with registered psychologists covering anxiety, depression, ADHD, relationships, and trauma. Multiple Calgary locations and virtual options available." },
    servicesOffered: ["Registered psychologists", "Anxiety and depression", "ADHD assessment", "Relationship counselling", "Virtual sessions"],
    website: "https://vuepsychology.ca",
    cost: "paid",
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // DISABILITY SUPPORT — Layer 1 Top Providers
  // ============================================
  {
    id: "cass-calgary",
    category: ["disability"],
    userTypes: ["family", "senior"],
    title: { en: "CASS — Calgary Alternative Support Services" },
    description: { en: "Rated 4.8★. Leading provider of community living support for adults with disabilities in Calgary. Person-centered services including home support, respite, and community participation. Highly rated by families for individual care planning." },
    servicesOffered: ["Community living support", "Home support", "Respite care", "Community participation", "Adults with disabilities"],
    phone: "403-283-0611",
    website: "https://c-a-s-s.org",
    cost: "sliding-scale",
    featured: true,
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "vecova-centre",
    category: ["disability", "jobs"],
    userTypes: ["family", "senior"],
    title: { en: "VECOVA Centre for Disability Services and Research" },
    description: { en: "Rated 4.7★ at 3304 33 St NW. Provides employment support, community programs, and disability research. One of Calgary's most respected disability organizations, combining service delivery with advocacy and research that improves outcomes across Alberta." },
    servicesOffered: ["Employment programs", "Community services", "Disability research", "Advocacy", "Day programs"],
    phone: "403-284-1121",
    address: "3304 33 St NW, Calgary, AB",
    website: "https://vecova.ca",
    cost: "free",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "prospect-human-services",
    category: ["disability", "jobs"],
    userTypes: ["family", "senior"],
    title: { en: "Prospect Human Services" },
    description: { en: "Rated 4.7★. FREE employment support specifically for people with disabilities. Helps with job searching, resume writing, interview coaching, and workplace accommodations. Strong employer partnerships ensure real job opportunities for clients." },
    servicesOffered: ["Free employment support", "Resume and interview coaching", "Workplace accommodation advice", "Employer partnerships", "For people with disabilities"],
    website: "https://prospecthuman.ca",
    cost: "free",
    featured: true,
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "springboard-centre",
    category: ["disability", "jobs"],
    userTypes: ["family", "senior"],
    title: { en: "Springboard Centre for Adults with Disabilities" },
    description: { en: "Rated 4.6★ at 2115 27 Ave NE. Employment programs, day programs, and life skills training for adults with developmental disabilities. Highly regarded for its community integration approach and employment success rates." },
    servicesOffered: ["Employment programs", "Day programs", "Life skills training", "Community integration", "Adults with developmental disabilities"],
    phone: "403-248-7071",
    address: "2115 27 Ave NE, Calgary, AB",
    cost: "sliding-scale",
    priority: 96,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // SENIOR SERVICES — Layer 1 Top Providers
  // ============================================
  {
    id: "home-care-assistance-calgary",
    category: ["senior", "healthcare"],
    userTypes: ["senior", "family"],
    title: { en: "Home Care Assistance Calgary" },
    description: { en: "Rated 4.9★ — Calgary's top-rated in-home senior care agency. Dementia specialists, 24/7 personal care, and companionship services. Allows seniors to remain at home longer with professional support. Free in-home assessment." },
    servicesOffered: ["In-home personal care", "Dementia care", "Companionship", "24/7 availability", "Free assessment"],
    phone: "403-301-1188",
    website: "https://homecareassistance.com",
    cost: "paid",
    featured: true,
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "amica-britannia-senior-living",
    category: ["senior"],
    userTypes: ["senior", "family"],
    title: { en: "Amica Britannia Senior Living" },
    description: { en: "Rated 4.8★ at 750 49 Ave SW. Premium senior living community with exceptional dining, wellness programs, and memory care. One of Calgary's most loved retirement residences with a vibrant social calendar." },
    servicesOffered: ["Independent living", "Assisted living", "Memory care", "Dining programs", "Wellness activities"],
    phone: "403-476-8992",
    address: "750 49 Ave SW, Calgary, AB",
    website: "https://amica.ca",
    cost: "paid",
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "trinity-lodge-retirement",
    category: ["senior"],
    userTypes: ["senior", "family"],
    title: { en: "Trinity Lodge Retirement Community" },
    description: { en: "Rated 4.7★. Affordable retirement community in SW Calgary at 1111 Glenmore Tr SW. Full service with dining, activities, and support. Popular for value-for-money and friendly community atmosphere." },
    servicesOffered: ["Retirement living", "Meals included", "Activity programs", "SW Calgary location", "Affordable rates"],
    phone: "403-253-7576",
    address: "1111 Glenmore Tr SW, Calgary, AB",
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // BUSINESS & LICENSING — New Key Resources
  // ============================================
  {
    id: "bdc-calgary",
    category: ["business"],
    userTypes: ["business"],
    title: { en: "Business Development Bank of Canada (BDC) Calgary" },
    description: { en: "Rated 4.6★. Government-backed small business lender offering loans, advisory services, and growth capital. Best first call for Calgary entrepreneurs needing startup or expansion financing. BDC specializes in businesses that traditional banks may not serve." },
    servicesOffered: ["Small business loans", "Business advisory", "Growth capital", "Entrepreneur support", "Government-backed"],
    phone: "1-888-463-6232",
    website: "https://bdc.ca",
    cost: "paid",
    priority: 96,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "futurpreneur-canada",
    category: ["business"],
    userTypes: ["business", "student"],
    title: { en: "Futurpreneur Canada" },
    description: { en: "Rated 4.7★. Provides startup financing ($20,000 in loans), mentorship, and resources for entrepreneurs ages 18–39. Partners with BDC for co-lending. Ideal for young Calgarians starting their first business." },
    servicesOffered: ["Startup loans up to $20,000", "Business mentorship", "Resources for ages 18-39", "Co-lending with BDC"],
    phone: "1-800-464-2923",
    website: "https://futurpreneur.ca",
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // WORKSPACES — Layer 1 Top Coworking Spaces
  // ============================================
  {
    id: "tradespace-coworking",
    category: ["workspace", "business"],
    userTypes: ["business", "student"],
    title: { en: "TradeSpace Coworking" },
    description: { en: "Rated 4.9★ — Calgary's best-rated coworking space. Known for its exceptional community, frequent networking events, and welcoming environment for entrepreneurs. Day rates from CA$35. Top recommendation for freelancers and startup founders." },
    servicesOffered: ["Hot desks from $35/day", "Dedicated desks", "Community events", "Meeting rooms", "Best community in Calgary"],
    website: "https://tradespace.co",
    cost: "paid",
    hiddenGem: true,
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "fuse33-makerspace",
    category: ["workspace", "business", "arts"],
    userTypes: ["business", "student"],
    title: { en: "Fuse33 Makerspace" },
    description: { en: "Rated 4.8★ at 1720 Radisson Dr SE. Calgary's only full fabrication lab with 3D printing, laser cutting, woodworking, and electronics. Monthly memberships from $50. Essential for anyone building physical products or creative projects." },
    servicesOffered: ["3D printing", "Laser cutting", "Woodworking shop", "Electronics lab", "Memberships from $50/month"],
    phone: "587-818-6253",
    address: "1720 Radisson Dr SE, Calgary, AB",
    website: "https://fuse33.com",
    cost: "paid",
    hiddenGem: true,
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "assembly-coworking",
    category: ["workspace", "business"],
    userTypes: ["business", "student"],
    title: { en: "Assembly Coworking" },
    description: { en: "Rated 4.5★ at Suite 400, 119 14 St NW. NW Calgary's premier coworking space with community events, quiet work zones, and professional facilities. CA$40/day. Good for NW Calgary professionals who want a community-focused workspace." },
    servicesOffered: ["Hot desks $40/day", "Private offices", "Community events", "NW Calgary location", "Meeting rooms"],
    phone: "403-351-2591",
    address: "Suite 400, 119 14 St NW, Calgary, AB",
    website: "https://assemblycs.com",
    cost: "paid",
    priority: 95,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // NETWORKING & COMMUNITY
  // ============================================
  {
    id: "blueprint-collective-mixer",
    category: ["community", "business"],
    userTypes: ["business", "student"],
    title: { en: "Blueprint Collective — Monthly Business Mixer" },
    description: { en: "Calgary's top monthly networking event for entrepreneurs and professionals. Held monthly on Thursdays at 550 6 Ave SW. Mix of startup founders, established business owners, and professionals. Check Eventbrite for upcoming dates." },
    servicesOffered: ["Monthly networking events", "Entrepreneur community", "Downtown Calgary", "Professional connections"],
    address: "550 6 Ave SW, Calgary, AB",
    website: "https://eventbrite.ca",
    cost: "low-cost",
    hiddenGem: true,
    priority: 90,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "ranchmens-club",
    category: ["community", "business"],
    userTypes: ["business"],
    title: { en: "The Ranchmen's Club" },
    description: { en: "Calgary's oldest and most prestigious private club, founded 1891. Alberta's only Platinum-ranked private club. Membership by invitation for senior executives and established business leaders. Premier venue for C-suite networking and deal-making in Calgary." },
    servicesOffered: ["Private member club", "Networking events", "Fine dining", "Business meetings", "Exclusive membership"],
    website: "https://ranchmensclub.com",
    cost: "paid",
    priority: 85,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "linked-club-yyc",
    category: ["community", "business"],
    userTypes: ["business", "student"],
    title: { en: "LinkedClub YYC — Flagship Speed Networking" },
    description: { en: "Calgary's best professional speed networking event — 2nd Wednesday of every month, 12–1pm. Connects founders, energy executives, and business leaders in a structured format. First event free for new guests. Hidden gem for ambitious professionals." },
    servicesOffered: ["Speed networking", "Monthly Wednesday lunches", "Founders and executives", "Free first visit"],
    website: "https://nas.io/linked.club",
    cost: "low-cost",
    hiddenGem: true,
    priority: 92,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "startup-calgary",
    category: ["community", "business"],
    userTypes: ["business", "student"],
    title: { en: "Startup Calgary" },
    description: { en: "Rated 4.7★. Calgary's startup ecosystem hub for events, mentorship, and community. Connects founders with resources, investors, and talent. Regular programming for all stages from idea to growth." },
    servicesOffered: ["Startup events", "Mentorship connections", "Ecosystem resources", "Investor introductions", "Founder community"],
    website: "https://startupcalgary.ca",
    cost: "free",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // FARMERS MARKETS — Layer 1
  // ============================================
  {
    id: "calgary-farmers-market-south",
    category: ["farmers-market", "food"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Calgary Farmers' Market South" },
    description: { en: "Rated 4.9★ — Calgary's largest and most popular farmers market. Open Thursday to Sunday 9AM–5PM at 510 77 Ave SE. 80+ vendors with local produce, meat, baked goods, artisan products, and prepared foods. Free parking. Year-round indoor market." },
    servicesOffered: ["80+ vendors", "Fresh local produce", "Meats and dairy", "Artisan goods", "Thu-Sun 9AM-5PM", "Year-round"],
    address: "510 77 Ave SE, Calgary, AB",
    website: "https://calgaryfarmersmarket.ca",
    cost: "free",
    featured: true,
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "calgary-farmers-market-west",
    category: ["farmers-market", "food"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Calgary Farmers' Market West" },
    description: { en: "Rated 4.8★. NW Calgary's beloved farmers market at 25 Greenbriar Dr NW. Open Wednesday–Saturday 9AM–7PM and Sunday 9AM–5PM. Fresh produce, local meats, specialty foods, and artisan products in a modern facility." },
    servicesOffered: ["Fresh produce", "Local meats", "Artisan goods", "Wed-Sun schedule", "NW Calgary"],
    phone: "403-240-9113",
    address: "25 Greenbriar Dr NW, Calgary, AB",
    cost: "free",
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "crossroads-market-calgary",
    category: ["farmers-market", "food", "ethnic-market", "tourism"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Crossroads Market Calgary" },
    description: { en: "Rated 4.7★. Calgary's best-kept secret — a weekend market combining ethnic groceries, artisan food, vintage goods, and local art all under one roof. Located at Ogden Rd & Blackfoot Trail SE. Open weekends. A true hidden gem with unbeatable variety." },
    servicesOffered: ["Ethnic groceries", "Artisan food", "Vintage goods", "Local art", "Weekend market", "Diverse cultural foods"],
    address: "Ogden Rd & Blackfoot Trail SE, Calgary, AB",
    cost: "free",
    hiddenGem: true,
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "inglewood-night-market",
    category: ["farmers-market", "food", "arts", "community"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "Inglewood Night Market (Summer)" },
    description: { en: "Rated 4.8★. Calgary's most vibrant summer night market every Thursday June–September on 9 Ave SE in Inglewood. Local artisans, street food, live music, and community. Free admission. One of Calgary's best warm-weather community events." },
    servicesOffered: ["Summer Thursdays June-Sept", "Local artisans", "Street food", "Live music", "Free admission"],
    address: "9 Ave SE, Inglewood, Calgary, AB",
    cost: "free",
    hiddenGem: true,
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // LOCAL ESSENTIALS — Home Services Layer 1
  // ============================================
  {
    id: "the-gentlemen-pros",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "The Gentlemen Pros — Plumbing, HVAC & Electrical" },
    description: { en: "Rated 4.9★ with 4,696+ reviews — one of Calgary's most trusted home service companies. Handles plumbing, HVAC, and electrical under one roof. Upfront pricing, background-checked technicians, and fast dispatch. Best for newcomers who want reliable, no-surprise service." },
    servicesOffered: ["Plumbing", "HVAC heating and cooling", "Electrical", "24/7 emergency service", "Upfront pricing", "Background-checked techs"],
    phone: "403-879-1708",
    website: "https://gentlemenpros.com",
    cost: "paid",
    featured: true,
    hiddenGem: false,
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "calgary-air-heating-cooling",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Calgary Air Heating & Cooling" },
    description: { en: "Rated 5.0★ with 906+ reviews — highest-rated HVAC company in Calgary. Same-day service, upfront pricing, and honest diagnosis. Essential contact for Calgary winters when furnaces fail. Run by a local Calgary family." },
    servicesOffered: ["Furnace repair and installation", "AC service", "Same-day service", "Upfront pricing", "Local family business"],
    phone: "403-452-9991",
    website: "https://calgaryair.com",
    cost: "paid",
    featured: true,
    priority: 100,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "plumbing-paramedics",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Plumbing & Heating Paramedics" },
    description: { en: "Rated 4.8★ with 1,100+ reviews. Calgary's go-to emergency plumber available 24/7. Known for fast response times and honest, experienced plumbers. Best option for burst pipes, leaks, and heating emergencies at any hour." },
    servicesOffered: ["Emergency plumbing 24/7", "Drain cleaning", "Water heater service", "Heating repairs", "1,100+ verified reviews"],
    phone: "403-452-2911",
    website: "https://plumbingparamedics.ca",
    cost: "paid",
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "jpas-auto-service",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "JPAS Auto Service" },
    description: { en: "Rated 4.9★ and CommunityVotes Platinum 2025 winner. Calgary's most trusted independent auto mechanic. Known for honest diagnosis, fair pricing, and transparent communication — a huge relief for newcomers unfamiliar with Canadian vehicle standards." },
    servicesOffered: ["Auto repair", "Vehicle inspection", "Honest diagnosis", "Fair pricing", "CommunityVotes Platinum 2025"],
    website: "https://jpasauto.com",
    cost: "paid",
    hiddenGem: true,
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // CULTURAL & ETHNIC STORES — Top Picks
  // ============================================
  {
    id: "all-nations-foods",
    category: ["ethnic-market", "food"],
    userTypes: ["newcomer", "family"],
    title: { en: "All Nations Foods" },
    description: { en: "Rated 4.9★ — Calgary's best multi-cultural grocery store at 3360 27 St NE. Carries African, Caribbean, Middle Eastern, and Indian products in-store and online. One stop for newcomers from dozens of countries to find familiar ingredients." },
    servicesOffered: ["African groceries", "Caribbean products", "Middle Eastern foods", "Indian ingredients", "Online ordering"],
    phone: "403-707-3080",
    address: "3360 27 St NE #3, Calgary, AB",
    website: "https://allnationsfoods.com",
    cost: "paid",
    hiddenGem: true,
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "silk-road-spice-merchant",
    category: ["ethnic-market", "food"],
    userTypes: ["newcomer", "family"],
    title: { en: "Silk Road Spice Merchant" },
    description: { en: "Rated 4.9★ — Calgary's most beloved artisan spice shop. Globally sourced, freshly ground spices from over 60 countries. A dream for newcomers recreating home cuisine or anyone cooking internationally. Check silkroadspices.ca for locations." },
    servicesOffered: ["Artisan spices", "60+ country origins", "Freshly ground", "Global sourcing", "Online orders"],
    website: "https://silkroadspices.ca",
    cost: "paid",
    hiddenGem: true,
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "tt-supermarket-calgary",
    category: ["ethnic-market", "food"],
    userTypes: ["newcomer", "family"],
    title: { en: "T&T Supermarket Calgary" },
    description: { en: "Rated 4.7★ — Canada's largest Asian supermarket chain with a major NE Calgary location at 3255 32 St NE. Pan-Asian groceries, fresh seafood, prepared foods, and bakery. Essential for Chinese, Korean, Japanese, Vietnamese, and South Asian families." },
    servicesOffered: ["Pan-Asian groceries", "Fresh seafood", "Prepared foods", "Asian bakery", "NE Calgary location"],
    phone: "403-293-1688",
    address: "3255 32 St NE, Calgary, AB",
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // TOURISM — Top Experiences
  // ============================================
  {
    id: "calgary-stampede",
    category: ["tourism", "community", "arts"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: { en: "Calgary Stampede" },
    description: { en: "Rated 5.0★ — The Greatest Outdoor Show on Earth. Annual July festival (July 4–13, 2026) with world-class rodeo, chuckwagon races, concerts, midway rides, and Indigenous cultural programming. One of the world's top 10 festivals. A must-experience Calgary event." },
    servicesOffered: ["World-class rodeo", "Chuckwagon races", "Concerts and entertainment", "Indigenous cultural events", "Midway rides", "Annual July festival"],
    website: "https://calgarystampede.com",
    cost: "paid",
    featured: true,
    priority: 100,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "princes-island-park",
    category: ["tourism", "community"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: { en: "Prince's Island Park" },
    description: { en: "Rated 4.9★ — Calgary's most beloved downtown park and green space. Free, beautiful, accessible, and host to major events including Calgary Folk Music Festival. Perfect introduction for newcomers to Calgary's outdoor culture. Located along the Bow River." },
    servicesOffered: ["Free outdoor space", "Bow River pathways", "Major events venue", "Folk Music Festival", "Picnic areas", "Dog-friendly"],
    address: "4 Prince's Island Park, Calgary, AB",
    cost: "free",
    featured: true,
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "nose-hill-park",
    category: ["tourism", "community"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: { en: "Nose Hill Park" },
    description: { en: "Rated 4.8★. One of North America's largest urban parks, offering vast natural prairie landscapes within Calgary city limits. Free access with 100+ km of trails, wildlife, and panoramic city views. Best place to experience the real Alberta landscape." },
    servicesOffered: ["Free access", "100+ km trails", "Wildlife viewing", "Panoramic city views", "Off-leash dog areas"],
    cost: "free",
    hiddenGem: true,
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // NEWCOMER SERVICES — Additional Layer 1
  // ============================================
  {
    id: "calgary-immigrant-womens-association",
    category: ["newcomer", "family", "legal"],
    userTypes: ["newcomer", "family"],
    title: { en: "Calgary Immigrant Women's Association (CIWA)" },
    description: { en: "Rated 4.8★. Empowers immigrant and refugee women and their families through settlement services, employment support, language training, and legal clinics. Multilingual staff. Safe, women-centered environment. One of Calgary's most trusted newcomer organizations." },
    servicesOffered: ["Settlement services", "Employment support", "Language training", "Legal clinic", "Women-centered", "Multilingual staff"],
    phone: "403-263-4414",
    website: "https://ciwa-online.com",
    cost: "free",
    featured: true,
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "action-dignity-calgary",
    category: ["newcomer", "legal", "community"],
    userTypes: ["newcomer", "family"],
    title: { en: "Action Dignity (formerly ECCA)" },
    description: { en: "Rated 4.7★. Provides support for victims of hate crimes, discrimination, and anti-racism advocacy in Calgary. Offers legal help referrals and community safety programs. Essential resource for newcomers and racialized communities facing discrimination." },
    servicesOffered: ["Hate crime support", "Anti-racism advocacy", "Legal referrals", "Community safety", "Discrimination support"],
    phone: "403-640-1429",
    website: "https://actiondignity.org",
    cost: "free",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // LEGAL — Additional Layer 1
  // ============================================
  {
    id: "womens-centre-calgary-legal",
    category: ["legal", "newcomer", "family"],
    userTypes: ["newcomer", "family"],
    title: { en: "Women's Centre of Calgary — Free Legal Clinics" },
    description: { en: "Rated 4.8★. Provides free legal clinics specifically for women in a safe, supportive environment. Covers family law, immigration, employment, and tenant rights. Run by volunteer lawyers and law students with supervision. Open to all women in Calgary." },
    servicesOffered: ["Free legal clinics", "Family law", "Immigration advice", "Employment law", "Tenant rights", "Safe women-centered space"],
    phone: "403-264-1155",
    website: "https://womenscentrecalgary.org",
    cost: "free",
    featured: true,
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // EDUCATION — Additional Layer 1
  // ============================================
  {
    id: "ace-it-tutoring",
    category: ["education"],
    userTypes: ["student", "family"],
    title: { en: "Ace It Tutoring Centre" },
    description: { en: "Rated 4.8★. Walk-in tutoring for Grades 9–12 — no appointment needed. Specializes in math and science. Students can drop in after school for immediate help. Very affordable and results-focused." },
    servicesOffered: ["Walk-in tutoring", "Grade 9-12 math and science", "No appointment needed", "After-school hours", "Affordable rates"],
    website: "https://aceittutoring.ca",
    cost: "low-cost",
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "sait-calgary",
    category: ["education", "jobs"],
    userTypes: ["newcomer", "student", "family"],
    title: { en: "SAIT — Southern Alberta Institute of Technology" },
    description: { en: "Rated 4.7★. Alberta's premier polytechnic institution offering applied technology, trades, culinary arts, and business programs. Highest graduate employment rate in Alberta. Essential pathway for newcomers seeking credentials in high-demand trades and technology fields." },
    servicesOffered: ["Trades programs", "Technology diplomas", "Culinary arts", "Business programs", "Post-secondary credentials", "High employment rate"],
    phone: "403-284-7248",
    website: "https://sait.ca",
    cost: "paid",
    featured: true,
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // SHIPPING & LOGISTICS — Layer 1 Top Services
  // ============================================
  {
    id: "mc-dispatch-alberta",
    category: ["logistics"],
    userTypes: ["business", "newcomer"],
    title: { en: "MC Dispatch — Alberta Courier & Warehousing" },
    description: { en: "Rated 4.9★ — Alberta's top local courier and logistics company. Handles same-day local delivery, Alberta-wide freight, and warehousing solutions for businesses and individuals. Best choice for reliable local business logistics." },
    servicesOffered: ["Same-day delivery", "Alberta-wide freight", "Warehousing", "Business logistics", "Reliable tracking"],
    website: "https://mcdispatch.com",
    cost: "paid",
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "citywide-courier-calgary",
    category: ["logistics"],
    userTypes: ["business", "newcomer"],
    title: { en: "Citywide Courier" },
    description: { en: "Rated 4.8★ — Calgary's trusted same-day courier service based in SW Calgary. Fast, reliable, and locally owned. Best for businesses needing reliable same-day document and parcel delivery within Calgary." },
    servicesOffered: ["Same-day courier", "SW Calgary base", "Document delivery", "Parcel service", "Business accounts"],
    phone: "403-246-8349",
    website: "https://citywidecourier.ca",
    cost: "paid",
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // HOUSING — Remaining Layer 1 (Master Data Pack 2026)
  // ============================================
  {
    id: "the-underwood-apartments",
    category: ["housing"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "The Underwood Apartments" },
    description: { en: "Rated 4.5★. Boutique inner-city apartment building with quality finishes and a walkable location. Ideal for professionals and students who want a polished, well-maintained residence in the heart of Calgary." },
    servicesOffered: ["Boutique inner-city units", "Quality finishes", "Walkable location", "Professional management"],
    website: "https://theunderwood.ca",
    cost: "paid",
    priority: 85,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "1215-rental-apartments",
    category: ["housing"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "1215 Rental Apartments" },
    description: { en: "Rated 4.6★. Mid-range, well-managed apartment community with a great location. Popular with newcomers for transparent management and accessible pricing. Consistently positive reviews for maintenance responsiveness." },
    servicesOffered: ["Mid-range rentals", "Well-managed units", "Responsive maintenance", "Good transit access"],
    website: "https://1215rentals.ca",
    cost: "paid",
    priority: 86,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // HEALTHCARE — Remaining Layer 1
  // ============================================
  {
    id: "creekside-medical-clinic",
    category: ["healthcare"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Creekside Medical Clinic" },
    description: { en: "Rated 4.7★ — NW Calgary's top-rated walk-in clinic known for the lowest wait times in the northwest. Open daily with a welcoming and efficient team. Best choice for NW Calgary residents who want quick, quality care." },
    servicesOffered: ["Walk-in care", "Lowest NW wait times", "Daily hours", "Prescription renewals", "Minor injuries"],
    website: "https://creeksidemedical.ca",
    cost: "free",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "crowfoot-village-family-medicine",
    category: ["healthcare"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Crowfoot Village Family Medicine" },
    description: { en: "Rated 4.5★ in NW Calgary's Crowfoot area. Walk-ins accepted alongside registered patients, with a family-friendly approach. Great option for Tuscany, Royal Oak, and Sherwood residents." },
    servicesOffered: ["Walk-in and registered patients", "Family medicine", "NW Calgary", "Direct billing"],
    phone: "403-547-0900",
    cost: "free",
    priority: 85,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "southcentre-medical-clinic",
    category: ["healthcare"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Southcentre Medical Clinic" },
    description: { en: "Rated 4.4★. Conveniently located in SE Calgary's Southcentre area. Open weekends, accepts walk-ins. Good option for SE Calgary residents needing after-hours or weekend medical care." },
    servicesOffered: ["Walk-in care", "Weekend hours", "SE Calgary", "Direct billing", "Minor emergencies"],
    phone: "403-278-9797",
    cost: "free",
    priority: 84,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // FAMILY & CHILDCARE — Remaining Layer 1
  // ============================================
  {
    id: "bm-royal-montessori",
    category: ["family", "education"],
    userTypes: ["newcomer", "family"],
    title: { en: "BM Royal Montessori" },
    description: { en: "Rated 4.8★. NE Calgary's beloved bilingual Montessori childcare centre. Deeply newcomer-friendly with multilingual staff. Exceptional early childhood education blending Montessori methods with cultural sensitivity." },
    servicesOffered: ["Montessori education", "Bilingual options", "NE Calgary", "Newcomer-friendly", "Multilingual staff"],
    phone: "403-293-0800",
    cost: "paid",
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "ymca-childcare-calgary",
    category: ["family"],
    userTypes: ["newcomer", "family"],
    title: { en: "YMCA Child Care Calgary" },
    description: { en: "Rated 4.7★. Non-profit childcare enrolled in Alberta's $10/day program. Subsidy accepted, inclusive programming, multiple Calgary locations. The YMCA's subsidized model makes quality childcare accessible to low and moderate income families." },
    servicesOffered: ["$10/day program", "Subsidy accepted", "Non-profit model", "Multiple locations", "Inclusive programming"],
    phone: "403-269-6701",
    website: "https://ymcacalgary.org",
    cost: "low-cost",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // FOOD SUPPORT — Remaining Layer 1
  // ============================================
  {
    id: "salvation-army-food-hampers",
    category: ["food", "emergency"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Salvation Army Food Hampers — Centre of Hope" },
    description: { en: "Rated 4.5★. Weekly food hampers at 420 9 Ave SE. One of Calgary's largest emergency food programs serving hundreds of families weekly with no-questions-asked hampers. Part of a 24/7 emergency shelter and meals complex downtown." },
    servicesOffered: ["Weekly food hampers", "No questions asked", "Emergency meals", "24/7 shelter on site", "420 9 Ave SE"],
    phone: "403-410-1111",
    address: "420 9 Ave SE, Calgary, AB",
    cost: "free",
    priority: 95,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "abundant-life-bread-basket",
    category: ["food"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Abundant Life Bread Basket" },
    description: { en: "Rated 4.5★. SW Calgary community pantry at 3343 49 St SW. No-questions-asked policy with a welcoming, dignified approach. Serves SW communities with regular distribution of dry goods, canned food, and fresh items." },
    servicesOffered: ["Community pantry", "SW Calgary", "No ID required", "No-questions-asked", "Regular distribution"],
    phone: "403-246-1804",
    address: "3343 49 St SW, Calgary, AB",
    cost: "free",
    priority: 85,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "meals-on-wheels-calgary",
    category: ["food", "senior"],
    userTypes: ["senior", "family"],
    title: { en: "Meals on Wheels Calgary" },
    description: { en: "Delivers hot, nutritious meals to homebound seniors and adults with disabilities across Calgary. Affordable subsidized rates available. Drivers also provide regular wellness checks for isolated seniors — more than just food delivery." },
    servicesOffered: ["Hot meal delivery", "Homebound seniors", "Subsidized rates", "Wellness checks", "City-wide delivery"],
    website: "https://mealsonwheelscalgary.ca",
    cost: "low-cost",
    priority: 95,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // MENTAL HEALTH — Remaining Layer 1
  // ============================================
  {
    id: "stride-psychology",
    category: ["mental-health"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: { en: "Stride Psychology" },
    description: { en: "Rated 4.8★. Evidence-based psychological services for individuals and couples. Strong reputation for CBT, ACT, and EMDR trauma therapies. Warm, professional team with a structured, research-backed approach to mental health." },
    servicesOffered: ["Individual therapy", "Couples counselling", "CBT and ACT", "EMDR trauma therapy", "Evidence-based"],
    website: "https://stridepsychology.ca",
    cost: "paid",
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "counsellingyyc",
    category: ["mental-health"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: { en: "CounsellingYYC" },
    description: { en: "Rated 4.7★. Couples and individual therapy by Ken Beaton and team. Known for relational work, communication skills, and rebuilding relationships after conflict. Strong community reputation for accessible, practical therapy." },
    servicesOffered: ["Couples therapy", "Individual counselling", "Relationship issues", "Communication skills", "Practical approach"],
    website: "https://counsellingyyc.ca",
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "newvista-psychology",
    category: ["mental-health"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: { en: "NewVista Psychology" },
    description: { en: "Rated 4.7★. Large Calgary counselling team covering anxiety, depression, trauma, ADHD, and relationships. Multiple registered therapists and psychologists across downtown and south Calgary." },
    servicesOffered: ["Large team of therapists", "Anxiety and depression", "Trauma and PTSD", "ADHD assessment", "Downtown and south Calgary"],
    website: "https://newvistapsychology.ca",
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "ymca-tutoring-youth-mental-health",
    category: ["mental-health", "education"],
    userTypes: ["student", "family"],
    title: { en: "YMCA Tutoring Table — Free Youth Mental Health & Tutoring" },
    description: { en: "Rated 4.7★. FREE mental health support and academic tutoring for youth aged 14–21 at the YMCA Calgary. Combines tutoring with mental health check-ins in a safe, non-clinical environment. One of Calgary's best-kept free youth resources." },
    servicesOffered: ["Free for ages 14-21", "Mental health support", "Academic tutoring", "Non-clinical environment", "Safe space"],
    phone: "403-269-6701",
    website: "https://ymcacalgary.org",
    cost: "free",
    hiddenGem: true,
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // SENIOR SERVICES — Remaining Layer 1
  // ============================================
  {
    id: "home-instead-senior-care-north",
    category: ["senior", "healthcare"],
    userTypes: ["senior", "family"],
    title: { en: "Home Instead Senior Care (Calgary North)" },
    description: { en: "Rated 4.7★. In-home senior care specializing in companionship, personal care, and medical support in NE Calgary. Part of North America's largest home care network with matched caregiver placement for the right personality fit." },
    servicesOffered: ["Companionship care", "Personal care", "Medical support", "Caregiver matching", "NE Calgary"],
    phone: "403-910-5860",
    website: "https://homeinstead.ca",
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "agecare-senior-living",
    category: ["senior"],
    userTypes: ["senior", "family"],
    title: { en: "AgeCare Senior Living" },
    description: { en: "Rated 4.5★. Multiple Calgary lodge and care facilities offering assisted living, long-term care, and supportive housing. Well-established provincial operator with consistent care standards across all locations." },
    servicesOffered: ["Lodge care", "Long-term care", "Assisted living", "Multiple Calgary locations", "Provincial operator"],
    website: "https://agecare.ca",
    cost: "paid",
    priority: 85,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // DISABILITY SUPPORT — Remaining Layer 1
  // ============================================
  {
    id: "ddrc-calgary",
    category: ["disability"],
    userTypes: ["family", "senior"],
    title: { en: "Developmental Disabilities Resource Centre (DDRC)" },
    description: { en: "Rated 4.7★ at 4631 Richardson Way SW. Community support, employment programs, and day services for people with developmental disabilities. Highly respected SW Calgary organization with decades of trusted service." },
    servicesOffered: ["Community support", "Employment programs", "Day services", "SW Calgary", "Developmental disabilities"],
    phone: "403-240-3111",
    address: "4631 Richardson Way SW, Calgary, AB",
    cost: "free",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "vision-loss-rehab-calgary",
    category: ["disability", "healthcare"],
    userTypes: ["family", "senior"],
    title: { en: "Vision Loss Rehabilitation Canada — Calgary" },
    description: { en: "Rated 4.6★ at 10 11A St NE. Orientation, mobility training, and adaptive technology for Calgarians with vision impairment. Free CNIB Card available for transit fare reductions. National organization with a strong local presence." },
    servicesOffered: ["Orientation and mobility training", "Adaptive technology", "CNIB Card for transit", "Vision rehabilitation", "10 11A St NE"],
    phone: "1-844-887-8572",
    address: "10 11A St NE, Calgary, AB",
    website: "https://visionlossrehab.ca",
    cost: "free",
    priority: 96,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "calgary-scope-society",
    category: ["disability"],
    userTypes: ["family", "senior"],
    title: { en: "Calgary Scope Society" },
    description: { en: "Rated 4.5★. Day programs, community inclusion, and life skills support for people with physical disabilities. Scope's community-centred model focuses on personal choice and integration into Calgary community life." },
    servicesOffered: ["Day programs", "Community inclusion", "Life skills", "Physical disabilities", "Personal choice model"],
    website: "https://scopeab.ca",
    cost: "free",
    priority: 85,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // WORKSPACES — Remaining Layer 1
  // ============================================
  {
    id: "workhaus-core-coworking",
    category: ["workspace", "business"],
    userTypes: ["business", "student"],
    title: { en: "Workhaus Core — Downtown Coworking" },
    description: { en: "Rated 4.7★. Premium downtown Calgary coworking in the heart of the business district at CA$40/day. Professional atmosphere, private offices, boardrooms, and great connectivity. Best for professionals who need a polished downtown address." },
    servicesOffered: ["CA$40/day hot desk", "Downtown business district", "Private offices", "Boardrooms", "Professional atmosphere"],
    website: "https://workhaus.ca",
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "resourceyyc-coworking",
    category: ["workspace", "business"],
    userTypes: ["business", "student"],
    title: { en: "ReSourceYYC Coworking" },
    description: { en: "Rated 4.7★. Flexible coworking for freelancers and corporates at CA$30/day — excellent value with a professional environment. Good choice for cost-conscious professionals who need flexible access without a long commitment." },
    servicesOffered: ["CA$30/day best value", "Flexible access", "Freelancer and corporate mix", "Professional environment"],
    website: "https://resourceyyc.com",
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "shedpoint-coworking",
    category: ["workspace", "business"],
    userTypes: ["business", "student"],
    title: { en: "ShedPoint Coworking" },
    description: { en: "Rated 4.6★ at 1206 20 Ave SE in Ramsay/Inglewood. Calgary's most affordable coworking at CA$25/day. Popular with creatives and early-stage founders who need a desk without a high daily rate." },
    servicesOffered: ["CA$25/day most affordable", "Ramsay/Inglewood", "Creative community", "Budget-friendly", "Inner-city location"],
    address: "1206 20 Ave SE, Calgary, AB",
    cost: "paid",
    hiddenGem: true,
    priority: 96,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // CULTURAL & ETHNIC STORES — Remaining Layer 1
  // ============================================
  {
    id: "african-variety-store-calgary",
    category: ["ethnic-market", "food"],
    userTypes: ["newcomer", "family"],
    title: { en: "African Variety Store" },
    description: { en: "Rated 4.8★ at 3315 17 Ave SE. Calgary's go-to store for Ethiopian and African ingredients including teff flour, berbere spice, injera supplies, and frozen African meats. An essential stop for the East African community in Calgary." },
    servicesOffered: ["Ethiopian ingredients", "African spices and grains", "Frozen meats", "Teff and injera supplies", "17 Ave SE"],
    address: "3315 17 Ave SE, Calgary, AB",
    cost: "paid",
    hiddenGem: true,
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "sunterra-market-calgary",
    category: ["ethnic-market", "food", "farmers-market"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Sunterra Market" },
    description: { en: "Rated 4.8★. Calgary's premier local and international gourmet grocery with multiple locations including downtown. Premium local Alberta products alongside international specialty items, prepared meals, artisan cheese, and fresh bread." },
    servicesOffered: ["Local Alberta products", "International specialty items", "Prepared meals", "Artisan cheese and bread", "Multiple Calgary locations"],
    website: "https://sunterra.ca",
    cost: "paid",
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "thalassa-mediterranean-market",
    category: ["ethnic-market", "food"],
    userTypes: ["newcomer", "family"],
    title: { en: "Thalassa Mediterranean Market" },
    description: { en: "Rated 4.8★. Calgary's finest Greek and Mediterranean specialty store. Authentic Greek cheeses, olives, specialty pastas, fresh deli meats, and pantry staples unavailable at mainstream grocers. A hidden gem for Mediterranean families and food lovers." },
    servicesOffered: ["Greek cheeses and olives", "Mediterranean specialty items", "Fresh deli", "Specialty pastas", "Authentic imports"],
    cost: "paid",
    hiddenGem: true,
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "primal-cuts-butcher",
    category: ["ethnic-market", "food"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Primal Cuts Meat Shop" },
    description: { en: "Rated 4.8★. Calgary's top artisan butcher specializing in locally sourced Alberta beef. Dry-aged cuts, heritage breeds, and custom butchering available. Best-quality beef in the city for home cooks who value provenance." },
    servicesOffered: ["Locally sourced Alberta beef", "Dry-aged cuts", "Heritage breeds", "Custom butchering", "Artisan butcher"],
    cost: "paid",
    hiddenGem: true,
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "lucky-supermarket-chinatown-calgary",
    category: ["ethnic-market", "food"],
    userTypes: ["newcomer", "family"],
    title: { en: "Lucky Supermarket — Chinatown" },
    description: { en: "Rated 4.5★ at 128 2 Ave SE in Calgary's Chinatown. Authentic Chinese, Vietnamese, and Korean grocery staples. Fresh produce, live seafood, and specialty Asian sauces at budget-friendly prices." },
    servicesOffered: ["Chinese groceries", "Vietnamese ingredients", "Korean staples", "Live seafood", "Chinatown location"],
    address: "128 2 Ave SE, Calgary, AB",
    cost: "paid",
    priority: 85,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "sharaf-international-foods",
    category: ["ethnic-market", "food"],
    userTypes: ["newcomer", "family"],
    title: { en: "Sharaf International Foods" },
    description: { en: "Rated 4.6★. NE Calgary's trusted Middle Eastern and Halal grocery. Full range of Halal meats, Middle Eastern spices, specialty imports, and everyday groceries. Essential for Arab, Somali, and South Asian communities in NE Calgary." },
    servicesOffered: ["Halal meats", "Middle Eastern spices", "Specialty imports", "NE Calgary", "Arab and Somali staples"],
    cost: "paid",
    priority: 96,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // FARMERS MARKETS — Remaining Layer 1
  // ============================================
  {
    id: "bearspaw-lions-market",
    category: ["farmers-market", "food"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Bearspaw Lions Farmers Market" },
    description: { en: "Rated 4.7★. Beloved Sunday market (spring and summer, 9AM–2PM) northwest of Calgary. Community-run with local vendors, fresh produce, and homemade goods. Popular with NW Calgary families for its relaxed, community atmosphere." },
    servicesOffered: ["Sunday 9AM–2PM", "Spring and summer season", "NW Calgary area", "Local produce", "Community-run"],
    cost: "free",
    priority: 87,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "triwood-community-market",
    category: ["farmers-market", "food"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Triwood Community Market" },
    description: { en: "Rated 4.6★. Tuesday afternoon market (3–7PM) at 2244 Chicoutimi Dr NW in Brentwood/Triwood. Inner NW Calgary's favourite weekly market with local vendors, fresh produce, and artisan goods." },
    servicesOffered: ["Tuesday 3–7PM", "Inner NW Calgary", "Local vendors", "Fresh produce", "Artisan goods"],
    phone: "403-282-2677",
    address: "2244 Chicoutimi Dr NW, Calgary, AB",
    cost: "free",
    priority: 86,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "kingsland-farmers-market",
    category: ["farmers-market", "food"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Kingsland Farmers Market" },
    description: { en: "Rated 4.6★. Saturday market at 7711 Macleod Trail SW. One of Calgary's most consistent inner-south farmers markets with fresh produce, local meats, preserves, artisan foods, and free parking." },
    servicesOffered: ["Saturday market", "Macleod Trail SW", "Fresh produce", "Local meats", "Free parking"],
    address: "7711 Macleod Tr SW, Calgary, AB",
    cost: "free",
    priority: 86,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "millarville-racing-market",
    category: ["farmers-market", "food", "tourism"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Millarville Racing & Agricultural Fair Market" },
    description: { en: "Rated 4.7★. Saturdays May–October on Highway 22, Millarville — 45 min SW of Calgary. One of Alberta's most scenic outdoor markets with fresh farm produce, artisan crafts, and incredible Rocky Mountain views. Worth the drive." },
    servicesOffered: ["Saturdays May–October", "45 min SW of Calgary", "Fresh farm produce", "Artisan crafts", "Rocky Mountain views"],
    address: "Highway 22, Millarville, AB",
    cost: "free",
    hiddenGem: true,
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // LOCAL ESSENTIALS — Remaining Layer 1
  // ============================================
  {
    id: "pete-the-plumber-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Pete the Plumber" },
    description: { en: "Rated 4.5★ with 1,300+ reviews. A Calgary institution since 1992. Known for honest, reliable service and upfront pricing. One of the most recognized local plumbing brands in the city with a loyal customer base built over 30 years." },
    servicesOffered: ["Plumbing repair", "Drain cleaning", "Water heater service", "1,300+ reviews", "Since 1992"],
    phone: "403-257-1766",
    website: "https://petetheplumber.ca",
    cost: "paid",
    priority: 85,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "baker-plumbing-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Baker Plumbing, Heating & Air Conditioning" },
    description: { en: "Rated 4.7★. Family-owned Calgary plumbing and HVAC company since 1965. Three generations of the Baker family serving Calgary with honest, experienced work. Outstanding reputation for integrity, quality, and fair pricing." },
    servicesOffered: ["Plumbing", "Heating and HVAC", "Air conditioning", "Family-owned since 1965", "Honest pricing"],
    phone: "403-276-6696",
    website: "https://bakerplumbing.ca",
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "mr-electric-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Mr. Electric Calgary" },
    description: { en: "Rated 4.7★. Licensed electricians available 24/7 for emergency and planned electrical work across Calgary. Part of a trusted national franchise. Known for on-time arrival, transparent quoting, and EV charger installation." },
    servicesOffered: ["Licensed electricians", "24/7 emergency electrical", "Panel upgrades", "EV charger installation", "Transparent quoting"],
    website: "https://mrelectric.ca",
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "pop-a-lock-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Pop-A-Lock Calgary" },
    description: { en: "Rated 4.6★. Calgary's top-rated 24/7 locksmith. Fast response times and fair pricing. Handles home lockouts, car lockouts, lock rekeying, and security upgrades. Part of North America's largest locksmith network." },
    servicesOffered: ["24/7 locksmith", "Home lockouts", "Car lockouts", "Lock rekeying", "Security upgrades"],
    phone: "403-253-7625",
    website: "https://pop-a-lock.com",
    cost: "paid",
    priority: 96,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "servpro-calgary-ne",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "SERVPRO Calgary NE — Water & Fire Restoration" },
    description: { en: "Rated 4.6★. Emergency water damage, fire damage, and mould remediation with 24/7 response. Works directly with insurance companies. When disaster strikes, SERVPRO is the professional call covered by most Calgary home insurance policies." },
    servicesOffered: ["Water damage restoration", "Fire damage cleanup", "Mould remediation", "24/7 emergency response", "Insurance coordination"],
    phone: "403-285-0900",
    website: "https://servpro.ca",
    cost: "paid",
    priority: 96,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "two-men-and-a-truck-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Two Men and a Truck Calgary" },
    description: { en: "Rated 4.7★. Calgary's most trusted moving company known for careful handling, punctual crews, and transparent pricing. Part of North America's largest franchise mover. Ideal for newcomers moving into their first Calgary home or apartment." },
    servicesOffered: ["Local moving", "Long-distance moving", "Packing services", "Careful handling", "Punctual crews"],
    phone: "403-243-6683",
    website: "https://twomencalgary.ca",
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // LOCAL ESSENTIALS — Budget Car Repair
  // ============================================
  {
    id: "a-j-auto-repair",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "A & J Auto Repair" },
    description: { en: "Rated 4.8★ with 412+ reviews. Reviewers repeatedly cite honest, reasonably priced service with a tire and brake focus — a good first call for newcomers who want a budget-friendly shop with fair estimates." },
    servicesOffered: ["Tire service", "Brake repair", "Honest estimates", "Budget friendly"],
    website: "https://reviews.birdeye.com/a-j-auto-repair-155230331363347",
    mapUrl: "https://maps.google.com/?q=A+%26+J+Auto+Repair+Calgary",
    cost: "paid",
    priority: 88,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "country-hills-mechanic-shop",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "Country Hills Mechanic Shop" },
    description: { en: "Rated 4.6★ with 588+ reviews. A high-volume NE Calgary shop known for cheap, quick fixes and affordable oil changes — a solid budget option when you need routine maintenance done fast." },
    servicesOffered: ["Oil changes", "Quick fixes", "Budget friendly", "High-volume NE shop"],
    website: "https://reviews.birdeye.com/country-hills-mechanic-shop-167721125288291",
    mapUrl: "https://maps.google.com/?q=Country+Hills+Mechanic+Shop+Calgary",
    cost: "paid",
    priority: 85,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "knibbe-automotive-repair",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Knibbe Automotive Repair Services" },
    description: { en: "A full-service NW Calgary shop operating since 2003. States repairs are done at affordable prices, and every job is reviewed with you before work starts — good for newcomers who want no surprise charges." },
    servicesOffered: ["Full-service repair", "Affordable pricing", "Reviewed before work starts", "Serving Calgary since 2003"],
    phone: "403-547-7771",
    website: "https://www.knibbeautomotive.com/",
    mapUrl: "https://maps.google.com/?q=Knibbe+Automotive+Calgary",
    cost: "paid",
    priority: 84,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "allmakes-auto-repairs",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Allmakes Auto Repairs" },
    description: { en: "Rated 3.9★ with 10 reviews. An independent Subaru specialist with a documented case of a $443 final bill versus a roughly $1,000 dealer quote for the same 48,000 km inspection — worth a second opinion before paying dealer prices." },
    servicesOffered: ["Subaru specialist", "Second-opinion inspections", "Budget friendly vs. dealer pricing"],
    website: "https://www.yelp.com/biz/allmakes-auto-repairs-calgary",
    cost: "paid",
    priority: 78,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "affordable-auto-repairs-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Affordable Auto Repairs" },
    description: { en: "Markets itself directly as \"Quality Auto Repairs. Affordable Prices.\" Covers general mechanical and collision work, and will install parts you supply yourself to save money." },
    servicesOffered: ["General mechanical repair", "Collision repair", "Installs customer-supplied parts", "Budget friendly"],
    phone: "403-258-2808",
    website: "https://affordableautorepairs.ca/",
    cost: "paid",
    priority: 77,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "mechanics-for-less-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "Mechanics for Less" },
    description: { en: "Semi-retired technicians offering lower-overhead repairs Calgary-wide as an explicit dealership alternative — good if you want experienced hands without dealer-level labour rates." },
    servicesOffered: ["Lower-overhead repairs", "Dealership alternative", "Calgary-wide", "Experienced/semi-retired technicians"],
    website: "https://mechanicsforless.com/",
    cost: "paid",
    priority: 74,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "leader-auto-service-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Leader Auto Service" },
    description: { en: "Claims 100+ Google reviews with testimonials citing \"very reasonable pricing\" and \"fair prices.\" Offers repair, maintenance, and inspections." },
    servicesOffered: ["Repair", "Maintenance", "Inspections", "Reasonable pricing (per reviews)"],
    website: "https://www.leaderautoservice.com/",
    cost: "paid",
    priority: 73,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "zack-auto-trucks-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Zack Auto & Trucks" },
    description: { en: "Claims 450+ 5-star reviews. Offers affordable pre-purchase inspections and out-of-province inspections — useful when buying a used car or bringing a vehicle in from another province. Also runs a fleet program." },
    servicesOffered: ["Pre-purchase inspections", "Out-of-province inspections", "Fleet program"],
    website: "https://www.zackautotrucks.com/",
    cost: "paid",
    priority: 72,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "free-subsidized-car-repair-help",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Free or Subsidized Car Repair: What Actually Exists (Rare)" },
    description: { en: "No City of Calgary or Government of Alberta program pays directly for private vehicle repairs — the closest municipal help, City of Calgary Fair Entry, only subsidizes low-income transit, recreation, telecom, and property tax, not car repair. Two narrow charitable options do exist: CARS Ministry, a Calgary-linked Christian non-profit doing free vehicle repairs/maintenance for needy households (single mothers named as a priority group; volunteer-run; contact by email only), and RockPointe Church's Car Ministry, which donates repaired vehicles (not repair subsidies) to pre-approved recipients 18+ with a valid licence who can insure/register the car. Confirm an active Calgary garage before referring to either." },
    eligibility: { en: "CARS Ministry: needy households, single mothers prioritized; email office@carsministry.ca to inquire. RockPointe: pre-approved applicants 18+ with a valid driver's licence and the ability to insure/register a donated vehicle. Fair Entry: low-income Calgary residents (does not cover car repair, only transit/recreation/telecom/property tax subsidies)." },
    servicesOffered: ["No government program pays for private vehicle repairs", "CARS Ministry: free repairs, email-only contact", "RockPointe: donates vehicles (not repair subsidies)", "Fair Entry: transit/recreation/telecom/tax subsidies only, not car repair"],
    website: "https://carsministry.ca/about/",
    cost: "free",
    priority: 65,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },

  // ============================================
  // LOCAL ESSENTIALS — Tires & Winter Tire Deals
  // ============================================
  {
    id: "prince-tires-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "Prince Tires" },
    description: { en: "Rated 4.9★ with 562+ reviews. Flat tire repair is $50/tire, including dismount, patch, remount, and rebalance — no shop fee. Top-rated for transparent pricing on tire repair and winter tire installation." },
    servicesOffered: ["Flat repair $50/tire", "No shop fee", "Winter tire installation", "Top rated"],
    phone: "403-452-4283",
    website: "https://princetires.ca/pages/tire-repair-calgary",
    mapUrl: "https://maps.google.com/?q=Prince+Tires+Calgary",
    cost: "paid",
    priority: 90,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "zee-tire-services",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Zee Tire Services" },
    description: { en: "Publishes a clear price list: patch $25, valve stem fix $25 — among the lowest published tire-repair prices in the Calgary area. Also serves Okotoks and Airdrie." },
    servicesOffered: ["Patch $25", "Valve stem fix $25", "Also serves Okotoks and Airdrie"],
    phone: "403-903-5467",
    website: "https://www.zeetire.com/tire-services",
    cost: "paid",
    priority: 82,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "kal-tire-macleod",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Kal Tire (Macleod Trail)" },
    description: { en: "Rated 4.3★ with 260+ reviews. Free flat repairs and free balancing for tires bought there under the Customer Care Plan. Offers Tire Lodge seasonal storage — useful for swapping summer and winter tires without keeping the spare set at home." },
    servicesOffered: ["Free flat repair plan", "Free balancing on tires bought there", "Seasonal tire storage (Tire Lodge)", "National chain"],
    website: "https://www.kaltire.com/en/locations/?store=622-calgary-store",
    mapUrl: "https://maps.google.com/?q=Kal+Tire+Macleod+Trail+Calgary",
    cost: "paid",
    priority: 86,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "turning-mobile-tires",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Turning Mobile Tires" },
    description: { en: "A mobile tire service that comes to your home or office — useful if you don't have a way to get a flat vehicle to a shop. On-site flat repair costs $94. Also offers seasonal changeover from $99 (on rims) or $179 (off rims) at your home, and storage from $139/6 months." },
    servicesOffered: ["Mobile service — comes to you", "On-site flat repair $94", "Changeover from $99 on rims, $179 off rims", "Storage from $139/6 months"],
    website: "https://turningmobiletires.ca/pricing/",
    cost: "paid",
    priority: 76,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "tiremaxx-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "Tiremaxx Calgary" },
    description: { en: "Publishes some of the lowest tire-repair prices found: plug $25, patch $45 (run-flat tires +$5). Mobile options are also available if you can't drive the vehicle in." },
    servicesOffered: ["Plug $25", "Patch $45", "Run-flat +$5", "Mobile options available"],
    website: "https://www.tiremaxx.ca/services/flat-tire-repair",
    cost: "paid",
    priority: 80,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "good-tire-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "Good Tire" },
    description: { en: "Claims 1,105+ reviews. Open 7 days a week, 9am-7pm, no appointment needed for patch-plug repairs on punctures under 6mm — a solid walk-in option if you're stuck with a flat outside business hours." },
    servicesOffered: ["Open 7 days, 9am-7pm", "No appointment needed", "Patch-plug repairs for punctures under 6mm"],
    phone: "403-453-2008",
    website: "https://goodtirecalgary.ca/tire-repairs-calgary/",
    cost: "paid",
    priority: 79,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "fountain-tire-sunridge",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Fountain Tire — Sunridge" },
    description: { en: "Rated 4.3★ with 230+ reviews. National chain offering tires, alignments, tire storage, and a shuttle service — useful if you need a ride while your car is in the shop." },
    servicesOffered: ["Tires", "Alignments", "Tire storage", "Shuttle service", "National chain"],
    website: "https://www.fountaintire.com/stores/calgary-northland-ab",
    cost: "paid",
    priority: 78,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "tire-pirates-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Tire Pirates (Chinook & Foothills)" },
    description: { en: "Advertised tire prices include installation and balance already built in — helpful for comparing quotes apples-to-apples instead of getting hit with add-on fees at checkout." },
    servicesOffered: ["Advertised prices include install + balance", "Two Calgary locations"],
    phone: "Chinook 403-640-0500 · Foothills 403-279-5559",
    website: "https://www.tirepirates.ca/shop/tires/snow-winter/",
    cost: "paid",
    priority: 75,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "costco-tire-centre-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Costco Tire Centre (NW Calgary)" },
    description: { en: "Members get free installation with purchase plus seasonal manufacturer rebates on winter tires. Deals rotate and expire — recent Michelin/BFGoodrich promos ran Nov 24-Dec 14, so check the promo page fresh every November rather than relying on last year's dates." },
    servicesOffered: ["Free installation with purchase (members)", "Seasonal manufacturer rebates", "Recheck promo dates every November"],
    website: "https://tires.costco.ca/Home?whs=543&lang=en-CA",
    cost: "paid",
    priority: 77,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "winter-tire-changeover-cost-guide",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Winter Tire Changeover: What It Should Actually Cost" },
    description: { en: "Typical Calgary changeover runs $60-$120 for four tires already on rims, or $80-$160 for mount-and-balance if they aren't on rims. A quote near $40-for-four is usually missing something — TPMS reset, valve stems, balancing, or disposal fees. Zee Tire Services publishes the clearest public menu found: swap $10-$25/tire, winter studding $40/tire. Swap season peaks mid-March to late April in spring, and demand climbs fast each fall once temperatures drop below 7°C, so book early." },
    servicesOffered: ["$60-$120 for 4 tires on rims", "$80-$160 mount-and-balance if not on rims", "Watch for suspiciously low quotes missing fees", "Book early — fall demand spikes below 7°C"],
    website: "https://princetires.ca/blogs/news/how-much-does-a-tire-swap-cost-in-calgary-honest-price-guide",
    cost: "paid",
    priority: 81,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "alberta-winter-tire-law-facts",
    category: ["essentials", "legal"],
    userTypes: ["newcomer", "family"],
    title: { en: "Winter Tires in Alberta: There Is No Legal Requirement" },
    description: { en: "Alberta Transportation states plainly there is no mandatory winter-tire law in Alberta, unlike Quebec and BC on designated highways — it only recommends four winter or all-weather tires for severe conditions. That said, they are strongly recommended: Calgary winters bring ice and snow from roughly October to April, and winter tires (marked with the 3-peak mountain snowflake symbol) grip far better below 7°C than all-season tires. A practical rule of thumb from retailers: switch when temperatures consistently drop below 7°C in fall, and switch back above 7°C in spring. Some insurers offer a small premium discount for having them installed — ask your provider." },
    eligibility: { en: "Applies to all Calgary drivers. No permit, application, or legal filing is needed — this is purely a safety and insurance-discount consideration, not a legal obligation." },
    servicesOffered: ["No Alberta law requires winter tires (per Alberta Transportation)", "No Calgary bylaw requires winter tires", "Strongly recommended for safety Oct-April", "Switch below/above 7°C as a rule of thumb", "Ask your insurer about a winter tire discount"],
    website: "https://www.transportation.alberta.ca/Content/docType34/Production/Information%20About%20Winter%20Tires.pdf",
    cost: "free",
    priority: 74,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },

  // ============================================
  // LOCAL ESSENTIALS — Lawn Care
  // ============================================
  {
    id: "property-werks-lawn",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Property Werks — Lawn Care & Snow Removal" },
    description: { en: "Rated 4.7★ with 41+ reviews. Weekly mowing starts at $34/visit, bi-weekly from $44 — no contract required. Also offers snow removal, so one provider can cover your yard year-round." },
    servicesOffered: ["Weekly mowing from $34/visit", "Bi-weekly from $44", "No contract required", "Also does snow removal"],
    website: "https://www.propertywerks.ca/lawn-care",
    cost: "paid",
    priority: 84,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "calgary-lawn-and-garden",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Calgary Lawn & Garden" },
    description: { en: "Publishes the clearest posted pricing found for Calgary lawn care: weekly economy mowing from $38, mow-and-trim from $44, bi-weekly service from $46-$54 — easy to compare before you call." },
    servicesOffered: ["Weekly economy from $38", "Mow and trim from $44", "Bi-weekly from $46-$54", "Transparent pricing"],
    website: "https://calgarylawnandgarden.ca/lawn-mowing-calgary.html",
    cost: "paid",
    priority: 83,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "lawn-lovers-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Lawn Lovers" },
    description: { en: "Rated 4.9★ with 85+ reviews — Calgary's top-rated lawn care provider. Offers mowing, aeration, power-raking, hedge trimming, and snow removal, so it can be a year-round single provider." },
    servicesOffered: ["Mowing", "Aeration", "Power-raking", "Hedge trimming", "Snow removal", "Top rated"],
    website: "https://lawnlovers.ca/",
    cost: "paid",
    priority: 86,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "mowmates-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "MowMates" },
    description: { en: "Serves South Calgary. Weekly mowing from $40 per visit, bi-weekly from $60 per two weeks, one-time cuts from $80 — a straightforward option for south-of-the-city addresses." },
    servicesOffered: ["Weekly mowing from $40", "Bi-weekly from $60/2 weeks", "One-time from $80", "South Calgary"],
    website: "https://mowmates.ca/services/",
    cost: "paid",
    priority: 76,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "clover-landscaping-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Clover Landscaping" },
    description: { en: "Rated 4.5★ across 406+ customers. Offers free estimates, which makes it easy to compare against other quotes before committing." },
    servicesOffered: ["Free estimates", "Lawn care", "Established customer base"],
    phone: "403-612-4262",
    website: "https://www.cloverlandscaping.ca/lawn-care-calgary/",
    cost: "paid",
    priority: 78,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "yard-dawgs-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Yard Dawgs" },
    description: { en: "Claims 1,000+ 5-star reviews. Offers unlimited weed control with free re-sprays if a treatment doesn't take within 48 hours, plus core aeration." },
    servicesOffered: ["Unlimited weed control", "Free re-spray within 48 hrs", "Core aeration"],
    phone: "587-254-2337",
    website: "https://www.yarddawgslawncare.ca/calgary",
    cost: "paid",
    priority: 77,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "three-north-clean-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "Three North Clean" },
    description: { en: "Publishes the most detailed size-based pricing found: a standard lot runs $75-$95 for a one-time cut, or $51-$65/visit on a weekly plan — easy to budget against before booking." },
    servicesOffered: ["One-time cut $75-$95 (standard lot)", "Weekly plan $51-$65/visit", "Transparent, size-based pricing"],
    phone: "587-225-2077",
    website: "https://threenorthclean.com/blog/lawn-cutting-cost-calgary/",
    cost: "paid",
    priority: 79,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "grounds-guys-calgary-east",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "The Grounds Guys of Calgary East" },
    description: { en: "A national franchise covering mowing, landscaping, snow plowing, and seasonal cleanups — a one-stop option if you'd rather have a single provider handle your yard in every season." },
    servicesOffered: ["Mowing", "Landscaping", "Snow plowing", "Seasonal cleanups", "National franchise"],
    website: "https://www.groundsguys.ca/calgary/",
    cost: "paid",
    priority: 76,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },

  // ============================================
  // LOCAL ESSENTIALS — Snow Removal
  // ============================================
  {
    id: "golden-angel-snow-removal",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Golden Angel — Residential Snow Removal" },
    description: { en: "Rated 4.7★ with 92+ reviews. Charges a monthly flat rate with unlimited visits and ice melt included. On the Standard tier, your property is cleared within 24 hours of snowfall. Available 24/7." },
    servicesOffered: ["Monthly flat rate, unlimited visits", "Ice melt included", "Cleared within 24 hours (Standard tier)", "Open 24/7"],
    phone: "403-383-8228",
    website: "https://goldenangel.co/residential-snow-removal/",
    cost: "paid",
    priority: 87,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "calgary-lawn-and-snow-services",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Calgary Lawn and Snow Services" },
    description: { en: "Monthly shovelling packages start at $125/month, covering your city sidewalk, steps, and path to your door — no contract required. Good option to stay compliant with the City's sidewalk-clearing bylaw without doing it yourself." },
    servicesOffered: ["Monthly shovelling from $125", "Covers sidewalk, steps, and path", "No contract", "Helps meet city bylaw"],
    website: "https://www.calgarylawnandsnowservices.ca/bylaw-for-snow-and-ice/snow-clearing-calgary",
    cost: "paid",
    priority: 85,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "the-snow-retrievers",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "The Snow Retrievers" },
    description: { en: "Serves SW Calgary with custom plans starting at $99/month, and emails you a completion report after every visit — useful if you want proof the job was done, especially for landlords or seniors living alone." },
    servicesOffered: ["Custom plans from $99/month", "Emailed completion report per visit", "SW Calgary"],
    website: "https://www.thesnowretrievers.ca/",
    cost: "paid",
    priority: 76,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "rebel-outdoor-snow",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Rebel Outdoor — Snow Removal" },
    description: { en: "Prioritizes South Calgary. Offers unlimited clearing during active snowfalls at a flat monthly rate, cleared within 24 hours of snowfall." },
    servicesOffered: ["Unlimited clearing during snowfalls", "Flat monthly rate", "Cleared within 24 hours", "South Calgary priority"],
    phone: "403-969-2777",
    website: "https://www.rebeloutdoor.com/snow-removal/",
    cost: "paid",
    priority: 75,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "scoop-cut-n-shovel-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Scoop, Cut N' Shovel Property Maintenance" },
    description: { en: "Rated 4.9★ with 47+ reviews. Serves NW Calgary, 7am-7pm, 7 days a week — good coverage if you need early-morning clearing before work." },
    servicesOffered: ["NW Calgary", "7am-7pm, 7 days a week", "Top rated"],
    website: "https://reviews.birdeye.com/scoop-cut-n-shovel-property-maintenance-166891291771088",
    cost: "paid",
    priority: 78,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "men-in-kilts-calgary-snow",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Men In Kilts Calgary — Snow Removal" },
    description: { en: "Handles driveways, sidewalks, and select vehicle clearing, and will re-clean for free if you report a missed spot within 48 hours." },
    servicesOffered: ["Driveways", "Sidewalks", "Select vehicle clearing", "Free re-clean within 48 hrs"],
    phone: "403-917-0426",
    website: "https://www.meninkilts.com/calgary/residential/snow-removal/",
    cost: "paid",
    priority: 76,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "rainfall-landscapes-calgary-snow",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Rainfall Landscapes — Snow & Ice" },
    description: { en: "Rated 4.8★ average. Clears pathways and applies traction-control products to reduce slip risk on walkways — a good pick if icy sidewalks are your bigger concern than deep snow." },
    servicesOffered: ["Pathway snow/ice clearing", "Traction-control products applied"],
    website: "https://rflandscapes.ca/featured-in-top-8-snow-removal-companies-in-calgary/",
    cost: "paid",
    priority: 74,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "remove-snow-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Remove Snow" },
    description: { en: "Site-stated 5★ rating. Covers residential, commercial, and emergency snow removal Calgary-wide — useful if you need same-day help after an unexpected dump." },
    servicesOffered: ["Residential", "Commercial", "Emergency service", "Calgary-wide"],
    website: "https://removesnow.ca/",
    cost: "paid",
    priority: 73,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "snow-removal-prepay-caution",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Before You Prepay a Seasonal Snow Contract, Check Recent Reviews" },
    description: { en: "A HomeStars reviewer alleges Go Lawn and Snow Removal kept a $200 payment with no return visit. Seasonal snow contracts are typically paid upfront for the whole winter, so a bad-faith provider can leave you without service and out the money — check recent (not just overall) reviews before prepaying any company, including ones listed here." },
    servicesOffered: ["Check recent reviews, not just overall rating", "Be cautious with full-season upfront payment", "Documented complaint: Go Lawn and Snow Removal"],
    website: "https://www.homestars.com/profile/2811736-go-lawn-and-snow-removal/reviews",
    cost: "free",
    priority: 70,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "calgary-snow-ice-bylaw-facts",
    category: ["essentials", "legal"],
    userTypes: ["newcomer", "family", "senior"],
    title: { en: "Calgary's Snow and Ice Bylaw: What You're Required to Do" },
    description: { en: "The City of Calgary's Street Bylaw (section 67) requires you to clear the public sidewalk bordering your property down to bare surface within 24 hours of a snowfall ending, keeping a minimum 1.5 m pathway width clear — this applies to rental property owners too, even if they live elsewhere. Pile snow from your own property onto your own property (e.g. your front lawn), not onto public space, and don't block roads, crosswalks, storm drains, or a neighbour's yard. Fines are $250 for a first offence, $500 for a second, and $750 for a third and beyond within 12 months. If you don't clear it, the City will and will invoice you a minimum $150 + GST and fees. The City also provides free sand-salt for sidewalks bordering private property, first come first served — bring your own container under 25 kg." },
    eligibility: { en: "Applies to all Calgary residential and commercial property owners/occupants with a public sidewalk adjacent to their property, including landlords who live elsewhere. There is no exemption based on age, but seniors and people with disabilities can get help through subsidized programs (see the Home Services for Seniors transition notice)." },
    servicesOffered: ["Clear sidewalks within 24 hours, 1.5m minimum width", "Fines: $250 / $500 / $750 for 1st/2nd/3rd+ offence in 12 months", "City clears and bills you a minimum $150 + GST if you don't", "Free sand-salt available, bring your own container under 25kg", "Report violations to 311 — anonymous complaints not accepted"],
    phone: "311",
    website: "https://www.calgary.ca/bylaws/snow-ice.html",
    cost: "free",
    priority: 73,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "seniors-snow-removal-transition-2026",
    category: ["senior", "essentials"],
    userTypes: ["senior", "family"],
    title: { en: "DEADLINE Sept 30, 2026: Seniors' Subsidized Snow Removal Is Changing" },
    description: { en: "The City of Calgary coordinates the Home Services for Seniors subsidized snow removal program only until September 30, 2026. After that date, eligible seniors move to Alberta's Special Needs Assistance program and must arrange their own provider directly rather than through the City. If you or a family member currently relies on this program, contact Alberta Supports now to confirm your eligibility and avoid a gap in service this winter." },
    eligibility: { en: "Calgary seniors currently enrolled in or eligible for the City's Home Services for Seniors program. After Sept 30, 2026, eligibility shifts to Alberta Supports' Special Needs Assistance criteria — contact them directly to confirm you still qualify and to arrange a new provider before winter." },
    servicesOffered: ["Act before Sept 30, 2026", "Check eligibility with Alberta Supports", "Arrange a private provider (see Snow Removal listings above) if the transition affects you"],
    phone: "1-877-644-9992",
    website: "https://www.calgary.ca/social-services/seniors/home-services.html",
    cost: "low-cost",
    featured: true,
    priority: 95,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },

  // ============================================
  // LOCAL ESSENTIALS — Moving Companies
  // ============================================
  {
    id: "calgary-movers-market-snapshot",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Calgary Movers: What a Fair Rate Actually Looks Like" },
    description: { en: "As of a February 2026 market snapshot, there are roughly 225 active Calgary moving companies. The legitimate rate band is $89-$179/hour, with a median of $125/hour for a 2-person crew plus truck, and an average 4.68★ across nearly 34,000 verified Google reviews. A quoted rate at or below $87.50/hour is flagged as a likely outlier or scam — get it in writing and check reviews before you pay a deposit." },
    servicesOffered: ["Fair rate band: $89-$179/hr", "Median: $125/hr for 2-person crew + truck", "Rates at/below $87.50/hr are a red flag", "~225 active Calgary movers, 4.68★ average"],
    website: "https://boxly.ca/ab/calgary",
    cost: "free",
    priority: 82,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "super-powers-movers",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Super Powers Inc. — Movers" },
    description: { en: "Calgary's most awarded moving company: BBB A+ rating, HomeStars Best-Of 2017-2020, and a 2020 Consumer Choice Award, with 24+ years in business. Handles houses, apartments, offices, and commercial moves — a full-service option for those who want an established, heavily vetted mover." },
    servicesOffered: ["Full-service moving", "BBB A+ rated", "HomeStars Best-Of 2017-2020", "Consumer Choice Award 2020", "24+ years in business"],
    phone: "403-200-4024",
    website: "https://www.superpowers.ca/calgary-movers/",
    cost: "paid",
    featured: true,
    priority: 89,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "minimove-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "student", "family"],
    title: { en: "MiniMove" },
    description: { en: "Budget pick for movers — rates start from $89/hr, billed by the minute with no minimum time and no deposit required. Family-run since 1982, good for smaller moves like a studio or one-bedroom apartment." },
    servicesOffered: ["From $89/hr, billed by the minute", "No minimum time", "No deposit", "Family-run since 1982", "Budget pick"],
    website: "https://minimove.ca/calgary_movers",
    cost: "low-cost",
    priority: 82,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "amazing-grace-movers",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Amazing Grace Movers" },
    description: { en: "Publishes fully transparent hourly rates: $140/hr for 2 movers, $170/hr for 3, $200/hr for 4 — no surprise fees, so you know the cost before you book." },
    servicesOffered: ["$140/hr for 2 movers", "$170/hr for 3 movers", "$200/hr for 4 movers", "No surprise fees"],
    website: "https://www.amazinggracemovers.ca/",
    cost: "paid",
    priority: 80,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "cactus-moving-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Cactus Moving" },
    description: { en: "24/7 crews with no travel-time charge within city limits and no deposit required for Calgary-area bookings — helpful if you're moving on short notice or off-hours. Also runs Canada-US cross-border routes." },
    servicesOffered: ["24/7 availability", "No travel-time charge within city limits", "No deposit for Calgary-area bookings", "Canada-US cross-border routes"],
    phone: "403-805-5855",
    website: "https://www.cactusmoving.ca/",
    cost: "paid",
    priority: 81,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "born-to-move-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "student", "family"],
    title: { en: "Born To Move" },
    description: { en: "Site-stated 5-star rating. Prices small moves at $139-$159/hr, with no travel-time, fuel, or mileage charges within Calgary — good for a studio or one-bedroom move without surprise add-ons." },
    servicesOffered: ["Small moves $139-$159/hr", "No travel-time, fuel, or mileage charges in-city"],
    website: "https://www.born2move.ca/",
    cost: "paid",
    priority: 79,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "mover-macks-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Mover Macks" },
    description: { en: "Positions itself as affordable and full-service: packing, loading, unpacking, and furniture assembly, with same-day availability for last-minute moves." },
    servicesOffered: ["Packing", "Loading", "Unpacking", "Furniture assembly", "Same-day availability"],
    website: "https://movermacks.com/",
    cost: "paid",
    priority: 77,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "paramount-moving-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Paramount Moving" },
    description: { en: "Markets itself as \"low-cost movers\" with full-service packing plans, reusable moving bins, and full insurance coverage — a middle-ground option between a pure budget mover and a premium full-service one." },
    servicesOffered: ["Low-cost positioning", "Full-service packing plans", "Reusable moving bins", "Fully insured"],
    website: "https://paramountmoving.ca/cheap-movers/",
    cost: "paid",
    priority: 76,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "easy-move-junkgone-calgary",
    category: ["essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "Easy Move & JunkGone" },
    description: { en: "Rated 5/5 across 21+ HomeStars reviews. Locally owned, focused on short-distance moves within 50 km, and also handles junk removal — convenient if you need to declutter and move in one booking." },
    servicesOffered: ["Short-distance moves within 50km", "Junk removal", "Locally owned"],
    website: "https://www.homestars.com/moving/moving-company-pros/calgary-alberta",
    cost: "paid",
    priority: 75,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },

  // ============================================
  // INCOME SUPPORT AFTER JOB LOSS (new top-level topic)
  // ============================================
  {
    id: "ei-regular-benefits-explainer",
    category: ["jobs", "essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "Employment Insurance (EI) Regular Benefits: How to Apply" },
    description: { en: "EI is a federal, contribution-based benefit funded by payroll deductions you and your employer already paid — it is not needs-based and does not check your savings. It pays 55% of your average insurable weekly earnings, up to a maximum of $729/week for claims starting on or after Dec 28, 2025 (based on 2026's $68,900 maximum insurable earnings), for roughly 14-45 weeks depending on your region's unemployment rate and hours worked. Apply as soon as you stop working — do not wait for your Record of Employment. Note: EI's dollar maximum resets every January, so recheck the current figure each year." },
    eligibility: { en: "Step-by-step: 1) Confirm you lost your job through no fault of your own (layoff, shortage of work, etc. — not voluntary quit or termination for misconduct, with some exceptions), and have been without work and pay for 7+ consecutive days in the last 52 weeks. 2) Confirm you worked the required insurable hours in your qualifying period (typically the last 52 weeks or since your last claim) — this ranges from 420 to 700 hours depending on your region's unemployment rate. 3) Be ready, willing, and capable of working each day, and keep a written job-search contact log. 4) Apply online at Canada.ca within 4 weeks of your last day of work — even before your Record of Employment (ROE) is issued, since most employers submit ROEs electronically and delays can cost you benefits if you wait. 5) Create or sign in to a My Service Canada Account (MSCA). 6) Provide your SIN, banking info for direct deposit, and your employment history for the last 52 weeks. 7) Expect a mandatory 1-week unpaid waiting period before payments start; Service Canada targets a decision within 28 days. 8) File an EI report every 2 weeks online or by phone (1-800-531-7555), declaring any work or income, even small or occasional earnings — missing a report can mean losing benefits. 9) Respond promptly if Service Canada requests an interview or documents. 10) If denied, you can request a reconsideration within 30 days, then appeal to the Social Security Tribunal if still denied." },
    servicesOffered: ["Federal, contribution-based (not needs-tested)", "55% of avg. insurable earnings, max $729/week (claims from Dec 28, 2025)", "~14-45 weeks of benefits depending on region/hours", "Apply within 4 weeks of job loss; decision targeted within 28 days", "Report every 2 weeks — 1-800-531-7555"],
    phone: "1-800-206-7218",
    website: "https://www.canada.ca/en/services/benefits/ei/ei-regular-benefit.html",
    cost: "free",
    featured: true,
    priority: 91,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "alberta-income-support-explainer",
    category: ["jobs", "essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Alberta Income Support: How to Apply" },
    description: { en: "Alberta Income Support is a provincial, needs-based last resort for people who can't pay for basic needs — shelter, food, clothing, transportation, utilities — plus health benefits and employment services. It's meant for those who don't qualify for EI, whose EI has run out, or who have little or no work history. Alberta explicitly requires you to apply for EI and any other program you may qualify for first. Processing typically takes up to 2 weeks; a 24-hour Emergency Income Support line can help with shelter/food/clothing/transportation in as little as 2 days if you can't wait. Alberta's current pages don't publish exact Core Essential/Shelter dollar amounts online — the only rate table found is an archived, out-of-date 2016 figure, so call 1-877-644-9992 for your current amount rather than relying on a published number." },
    eligibility: { en: "All must apply: live in Alberta, be 18+, and be a citizen, permanent resident, refugee, or refugee claimant; be unable to pay for basic needs; have RRSPs under $5,000 per adult, vehicle equity under $10,000, and cash/savings under the liquid asset limit (roughly 3x your core benefit amount); be willing to apply for EI and any other program you may qualify for first; and be looking for work, under-earning, temporarily unable to work, or need training access. How to apply, step by step: 1) Create an Alberta.ca Account (a basic account is enough to start). 2) Gather documents: ID for you, your spouse/partner, and dependents; 60 days of bank statements for every household account; a Direct Deposit Registration form; a doctor's letter if unable to work for medical reasons. 3) Apply online, verifying your account with an Alberta driver's licence or ID card. 4) Can't apply online? Contact your local Alberta Supports Centre for an in-person appointment — help is available in 100+ languages. 5) In an emergency, call the 24-hour Emergency Income Support line for help addressable in as little as 2 days. 6) After applying, expect contact within 7-10 days (2 business days for emergencies), an Employment Readiness Assessment, and an Action Plan with your worker." },
    servicesOffered: ["Provincial, needs-based — must try EI first", "RRSPs under $5,000/adult, vehicle equity under $10,000", "Monthly core + shelter payment, plus health benefits", "Processing ~2 weeks; emergency help in as little as 2 days", "Emergency Income Support line: 1-866-644-5135 (24hr)", "Call 1-877-644-9992 for your current benefit amount — not published online"],
    phone: "1-877-644-9992",
    website: "https://www.alberta.ca/income-support",
    cost: "free",
    priority: 89,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "ei-vs-income-support-comparison",
    category: ["jobs", "essentials"],
    userTypes: ["newcomer", "family"],
    title: { en: "Lost Your Job? Apply for EI First, Then Alberta Income Support If Needed" },
    description: { en: "The right order to apply in: apply for EI immediately after job loss — it's funded by payroll deductions you already paid, not needs-tested, and pays more (55% of earnings up to $729/week vs. Income Support's smaller flat core+shelter amount). Only apply for Alberta Income Support if you don't qualify for EI, your EI has run out, or your EI payment isn't enough to cover basic needs. You can get both, but sequentially, not automatically stacked: apply for EI first — if your EI payment is lower than the Income Support core benefit you'd qualify for, a top-up may be assessed case by case (call 1-877-644-9992). If EI is denied or runs out, Income Support is the needs-based fallback. While waiting on either decision, the 24-hour Emergency Income Support line (1-866-644-5135) can help with food/shelter money in as little as 2 days." },
    eligibility: { en: "Anyone who has recently lost a job in Calgary. Start with EI if you have recent insurable work history; go straight to Alberta Income Support if you have little/no recent work history or have exhausted EI. Quick EI checklist: job loss not your fault; 7+ consecutive days without work/pay in the last 52 weeks; 420-700 insurable hours in the last 52 weeks; ready/willing/able to work with a job-search log; applying within 4 weeks of your last day. Quick Income Support checklist: Alberta resident, 18+, citizen/PR/refugee/refugee claimant; cannot pay for basic needs; RRSPs under $5,000/adult, vehicle equity under $10,000; have applied or will apply for EI first; can provide ID, 60 days of bank statements, and a direct deposit form." },
    servicesOffered: ["Apply for EI first if you have insurable hours", "Apply for Income Support if EI doesn't apply or has run out", "Both can be combined — case-by-case top-up assessment", "Emergency Income Support (24hr): 1-866-644-5135", "Alberta Supports: 1-877-644-9992", "Service Canada (EI): 1-800-206-7218"],
    phone: "1-877-644-9992",
    website: "https://www.alberta.ca/income-support-eligibility",
    cost: "free",
    priority: 84,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },
  {
    id: "calgary-free-job-search-help",
    category: ["jobs", "essentials"],
    userTypes: ["newcomer", "family", "student"],
    title: { en: "Free Job-Search Help in Calgary" },
    description: { en: "Several free, in-person job-search resources are available in Calgary while you're between jobs. Alberta Supports Centres (Calgary East, North, and South) offer in-person help with Income Support and employment services. Bow Valley College runs drop-in career-coach meetings open to the public on the 3rd floor of Central Library, first-come first-served, about 20 minutes each. The Calgary Public Library's Job Desk offers free 25-minute drop-in sessions on résumé writing and interview skills at Central Library, plus a free Cypress Resume builder and Learning Tools courses with a library card. Alberta also funds free retraining and re-employment programs (Transition to Employment, Integrated Training, Self-Employment, Workplace Training, Immigrant Bridging) for unemployed, under-employed, or EI-receiving Albertans, delivered through contracted agencies." },
    eligibility: { en: "Open to Calgary residents, including newcomers, students, and anyone currently unemployed or under-employed. No cost to access any of these services." },
    servicesOffered: ["Alberta Supports Centres: Calgary East (2752 Sunridge Way NE), North (1816 Crowchild Trail NW), South (8500 Macleod Trail SE) — 1-844-297-1907, 8:15am-4:30pm Mon-Fri", "Bow Valley College drop-in career coaching, 3rd floor Central Library — 403-410-1400", "Calgary Public Library Job Desk — free résumé/interview drop-ins + Cypress Resume builder", "Alberta training programs — free retraining for unemployed/under-employed/EI-receiving Albertans"],
    phone: "1-844-297-1907",
    website: "https://www.alberta.ca/find-an-alberta-supports-centre",
    cost: "free",
    priority: 82,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Essentials Module 2026",
  },

  // ============================================
  // TOURISM — Remaining Layer 1
  // ============================================
  {
    id: "glenbow-museum-calgary",
    category: ["tourism", "community"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: { en: "Glenbow Museum" },
    description: { en: "Rated 4.7★. One of Canada's largest museums with over 1 million objects covering Western Canadian history, Indigenous art, and international culture. Located downtown, recently renovated with new permanent Indigenous collections." },
    servicesOffered: ["Western Canada history", "Indigenous art", "1 million+ objects", "International culture", "Downtown Calgary"],
    phone: "403-268-4100",
    address: "1 Stephen Ave Walk, Calgary, AB",
    website: "https://glenbow.org",
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "winsport-canada-olympic-park",
    category: ["tourism", "community"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: { en: "WinSport — Canada Olympic Park" },
    description: { en: "Rated 4.7★. Year-round adventure at Calgary's 1988 Olympic legacy facility. Ski and snowboard in winter, mountain biking, zipline, and bobsled in summer. Olympic Museum on-site. Best multi-season outdoor attraction in Calgary." },
    servicesOffered: ["Skiing and snowboarding", "Mountain biking", "Zipline", "Bobsled experience", "Olympic Museum", "Year-round"],
    phone: "403-247-5452",
    website: "https://winsport.ca",
    cost: "paid",
    featured: true,
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // SHIPPING — Remaining Layer 1
  // ============================================
  {
    id: "stampede-messenger-express",
    category: ["logistics"],
    userTypes: ["business", "newcomer"],
    title: { en: "Stampede Messenger & Express Courier" },
    description: { en: "Rated 4.7★. Calgary's longest-running courier service, established 1975. Full-range pickup and delivery across Calgary and Alberta. Trusted by Calgary businesses for over 50 years with reliable service and competitive rates." },
    servicesOffered: ["Calgary courier", "Alberta-wide delivery", "Since 1975", "Business accounts", "Full-range pickup/delivery"],
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "fedex-calgary",
    category: ["logistics"],
    userTypes: ["business", "newcomer"],
    title: { en: "FedEx Calgary" },
    description: { en: "Rated 4.5★. Global shipping with multiple Calgary locations. International and local delivery, reliable tracking, and business accounts. Best for international parcels and time-sensitive shipments anywhere in the world." },
    servicesOffered: ["International shipping", "Local delivery", "Reliable tracking", "Business accounts", "Multiple Calgary locations"],
    phone: "1-800-463-3339",
    website: "https://fedex.com",
    cost: "paid",
    priority: 85,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "purolator-calgary",
    category: ["logistics"],
    userTypes: ["business", "newcomer"],
    title: { en: "Purolator Calgary" },
    description: { en: "Rated 4.4★. Canadian-owned national courier with the most comprehensive domestic network. Best choice for coast-to-coast Canadian shipping. Drop-off locations across Calgary with guaranteed delivery options." },
    servicesOffered: ["Canadian-owned", "Coast-to-coast delivery", "Multiple Calgary locations", "Guaranteed delivery", "Parcel tracking"],
    phone: "1-888-744-7123",
    website: "https://purolator.com",
    cost: "paid",
    priority: 84,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "canada-post-calgary",
    category: ["logistics"],
    userTypes: ["business", "newcomer", "family", "senior"],
    title: { en: "Canada Post — Calgary Outlets" },
    description: { en: "Rated 4.3★. Most accessible postal and parcel service with dozens of Calgary outlets. Most affordable option for small parcels. Newcomers can also use Canada Post for money orders and registered mail. Outlets inside pharmacies across the city." },
    servicesOffered: ["Parcel shipping", "Registered mail", "Money orders", "Most accessible locations", "Most affordable small parcels"],
    phone: "1-800-267-1177",
    website: "https://canadapost.ca",
    cost: "paid",
    priority: 83,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "canpar-transport-calgary",
    category: ["logistics"],
    userTypes: ["business"],
    title: { en: "Canpar Transport Calgary" },
    description: { en: "Rated 4.5★. Canadian business freight specialist with strong Calgary presence. Reliable business-to-business parcel and freight services across Canada. Best for regular business shippers needing an established Canadian freight network." },
    servicesOffered: ["Business freight", "B2B parcel service", "Cross-Canada network", "Business accounts", "Freight tracking"],
    website: "https://canpar.com",
    cost: "paid",
    priority: 85,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // COMMUNITY — Remaining Layer 1
  // ============================================
  {
    id: "calgary-foundation",
    category: ["community"],
    userTypes: ["newcomer", "family", "student", "senior", "business"],
    title: { en: "Calgary Foundation" },
    description: { en: "Rated 4.9★. Calgary's community foundation connecting donors to causes since 1955. Distributes millions in grants annually to local charities. Also publishes the Vital Signs report — the most comprehensive annual assessment of Calgary's quality of life." },
    servicesOffered: ["Community grants", "Charitable giving", "Vital Signs report", "Civic leadership", "Impact investing"],
    phone: "403-802-7700",
    website: "https://calgaryfoundation.org",
    cost: "free",
    priority: 99,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "united-way-calgary",
    category: ["community", "emergency"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: { en: "United Way of Calgary and Area" },
    description: { en: "Rated 4.8★. Funds 100+ local agencies tackling poverty, youth development, and social isolation. Runs the 211 Alberta helpline. Connects individuals and businesses to Calgary's most impactful community programs." },
    servicesOffered: ["Community grants", "211 Alberta helpline funder", "Poverty reduction", "Youth programs", "Social isolation support"],
    phone: "403-231-6265",
    website: "https://calgaryunitedway.org",
    cost: "free",
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "rotary-club-calgary",
    category: ["community", "business"],
    userTypes: ["business", "senior"],
    title: { en: "Rotary Club of Calgary" },
    description: { en: "Rated 4.6★. Calgary's most established service organization for professionals and business leaders. Weekly meetings, global impact projects, and a strong local professional network. Multiple Calgary chapters across different business sectors." },
    servicesOffered: ["Service projects", "Professional networking", "Global impact", "Weekly meetings", "Multiple chapters"],
    website: "https://rotarycalgary.org",
    cost: "paid",
    priority: 96,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "junior-league-of-calgary",
    category: ["community"],
    userTypes: ["family"],
    title: { en: "Junior League of Calgary" },
    description: { en: "Rated 4.6★. Women's civic leadership organization focused on community impact and volunteerism. Annual fundraiser and community programs. One of Calgary's most respected women's volunteer organizations with a 70+ year history." },
    servicesOffered: ["Women civic leadership", "Community programs", "Volunteerism", "Annual fundraiser", "70+ year history"],
    website: "https://jlcalgary.com",
    cost: "paid",
    priority: 86,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // NETWORKING EVENTS & CLUBS — Cat. 23 & 24
  // ============================================
  {
    id: "calgary-tech-mixer",
    category: ["community", "business"],
    userTypes: ["business", "student"],
    title: { en: "Calgary Tech Mixer — Monthly Networking" },
    description: { en: "Monthly Friday networking event for Calgary's tech, AI, data, and IT professionals. Held at Bear & Kilt Freehouse downtown. One of the best recurring events for connecting with Calgary's growing tech ecosystem. Check Eventbrite for dates." },
    servicesOffered: ["Monthly Friday evenings", "Tech and AI community", "Bear & Kilt downtown", "Data and IT professionals", "Eventbrite listings"],
    website: "https://eventbrite.ca",
    cost: "low-cost",
    priority: 90,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "win-yyc-women-networking",
    category: ["community", "business"],
    userTypes: ["business", "family"],
    title: { en: "WIN YYC — Women in Networking Calgary" },
    description: { en: "Monthly professional networking event for women in business across all industries. Rotating Calgary venue each month. Safe, supportive environment for women to grow their professional networks and find mentors and collaborators." },
    servicesOffered: ["Monthly women's networking", "All industries", "Rotating venues", "Mentor connections", "Collaborative community"],
    cost: "low-cost",
    priority: 90,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "club-corr-calgary",
    category: ["community", "business"],
    userTypes: ["business"],
    title: { en: "Club Corr — Premium Entrepreneur Network" },
    description: { en: "Calgary's premium closed-membership entrepreneur network. Investment clubs, corporate excursions, and weekly speaker events. Access to a curated network of serious Calgary business owners and investors. Membership by application." },
    servicesOffered: ["Investment club", "Corporate excursions", "Weekly speaker events", "Curated entrepreneur network", "Application-based"],
    website: "https://clubcorr.com",
    cost: "paid",
    priority: 90,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "ypo-calgary",
    category: ["community", "business"],
    userTypes: ["business"],
    title: { en: "YPO Calgary — Young Presidents Organization" },
    description: { en: "Invite-only global peer network for CEOs and business leaders under 45. Requires $10M+ revenue or 50+ employees. Monthly forums, international chapters, and family programs. The world's most influential CEO network with a strong Calgary chapter." },
    servicesOffered: ["CEO peer forums", "Global network", "Family programs", "International chapters", "Invite-only"],
    website: "https://ypo.org/chapter/calgary",
    cost: "paid",
    priority: 88,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "eo-calgary",
    category: ["community", "business"],
    userTypes: ["business"],
    title: { en: "EO Calgary — Entrepreneurs Organization" },
    description: { en: "Invite-only peer network for entrepreneurs with $1M+ annual revenue. Monthly forums, international events, and mentorship. Global community of 16,000+ entrepreneurs across 60+ countries with a thriving Calgary chapter." },
    servicesOffered: ["Entrepreneur peer forums", "Invite-only", "$1M+ revenue requirement", "Global network", "Monthly forums"],
    website: "https://eonetwork.org/calgary",
    cost: "paid",
    priority: 88,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "pmi-sac-calgary",
    category: ["community", "business"],
    userTypes: ["business", "student"],
    title: { en: "PMI Southern Alberta Chapter (PMI-SAC)" },
    description: { en: "Monthly events for project management professionals at the Sandman Signature Hotel. PDU-earning sessions, networking, and professional development. The largest PM professional community in Southern Alberta." },
    servicesOffered: ["Monthly PM events", "PDU earning", "Professional development", "PM networking", "Sandman Signature Hotel"],
    website: "https://pmi-sac.org",
    cost: "low-cost",
    priority: 87,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // TECH & STARTUP COMMUNITY — Cat. 25
  // ============================================
  {
    id: "cdl-calgary",
    category: ["business", "community"],
    userTypes: ["business", "student"],
    title: { en: "Creative Destruction Lab (CDL) Calgary" },
    description: { en: "Rated 4.8★. World-leading deep tech and AI startup program with a Calgary stream at UCalgary. Connects science-based startups with top mentors and investors. CDL graduates have created over $20 billion in equity value globally." },
    servicesOffered: ["Deep tech program", "AI startups", "Mentor network", "Investor connections", "UCalgary partnership"],
    website: "https://creativedestructionlab.com",
    cost: "free",
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "innovate-calgary",
    category: ["business", "education"],
    userTypes: ["business", "student"],
    title: { en: "Innovate Calgary (UCalgary)" },
    description: { en: "Rated 4.7★. University of Calgary's technology transfer and commercialization office. Helps researchers and entrepreneurs protect IP, spin out companies, and commercialize innovations. Best first call for UCalgary researchers starting a company." },
    servicesOffered: ["Technology transfer", "IP protection", "Company spin-offs", "Commercialization support", "UCalgary research"],
    phone: "403-210-9191",
    website: "https://innovatecalgary.com",
    cost: "free",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "alberta-women-entrepreneurs",
    category: ["business", "community"],
    userTypes: ["business", "family"],
    title: { en: "Alberta Women Entrepreneurs (AWE)" },
    description: { en: "Rated 4.7★. Provides funding (loans up to $150,000), mentorship, and business development specifically for women entrepreneurs in Alberta. Free workshops and a supportive network. One of Canada's top women's business programs." },
    servicesOffered: ["Loans up to $150,000", "Business mentorship", "Free workshops", "Women entrepreneurs only", "Alberta-wide program"],
    phone: "780-422-7784",
    website: "https://awebusiness.com",
    cost: "free",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "calgary-ai-meetup",
    category: ["business", "community"],
    userTypes: ["business", "student"],
    title: { en: "Calgary AI Meetup" },
    description: { en: "Monthly gathering of Calgary's artificial intelligence and machine learning practitioners. Demos, talks, and networking for AI engineers, researchers, and product managers. Best recurring event for Calgary's fast-growing AI community." },
    servicesOffered: ["Monthly AI events", "Machine learning community", "Technical demos", "Researcher and engineer network", "Free to attend"],
    website: "https://meetup.com/Calgary-AI",
    cost: "free",
    hiddenGem: true,
    priority: 90,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "rainforest-alberta",
    category: ["business", "community"],
    userTypes: ["business", "student"],
    title: { en: "Rainforest Alberta" },
    description: { en: "Rated 4.6★. Alberta's technology and innovation ecosystem builder connecting entrepreneurs, investors, and researchers across diverse tech sectors. Events, community programs, and a growing network of Alberta innovators." },
    servicesOffered: ["Ecosystem building", "Entrepreneur connections", "Investor network", "Innovation programs", "Diverse tech sectors"],
    website: "https://rainforestab.ca",
    cost: "free",
    priority: 96,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // SPORTS & RECREATION — Cat. 26
  // ============================================
  {
    id: "calgary-sport-social-club",
    category: ["community"],
    userTypes: ["newcomer", "student", "family"],
    title: { en: "Calgary Sport & Social Club" },
    description: { en: "Calgary's largest adult recreational sports league operator — soccer, volleyball, flag football, dodgeball, and more. Perfect for newcomers who want to meet people and stay active. Leagues for all skill levels, no experience needed." },
    servicesOffered: ["Adult recreational leagues", "Soccer, volleyball, dodgeball", "All skill levels welcome", "Great for newcomers", "Social events"],
    phone: "403-243-8111",
    website: "https://calgarysportandsocial.com",
    cost: "paid",
    featured: true,
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "repsol-sport-centre-calgary",
    category: ["community", "healthcare"],
    userTypes: ["newcomer", "student", "family", "senior"],
    title: { en: "Repsol Sport Centre (Talisman Centre)" },
    description: { en: "Rated 4.7★ at 2225 Macleod Trail SE. Calgary's premier multi-sport facility. Olympic-size pools, fitness centre, climbing wall, racquetball, and ice. One membership covers everything — best all-in-one sport and fitness facility in Calgary." },
    servicesOffered: ["Olympic pools", "Fitness centre", "Climbing wall", "Ice arenas", "Racquetball", "All-in-one membership"],
    phone: "403-233-8393",
    address: "2225 Macleod Tr SE, Calgary, AB",
    website: "https://repsolsport.ca",
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "calgary-curling-club",
    category: ["community"],
    userTypes: ["newcomer", "student", "family", "senior"],
    title: { en: "Calgary Curling Club" },
    description: { en: "Rated 4.8★. Learn-to-curl programs, recreational leagues, and competitive play. Beginner-welcoming and social. Curling is Canada's quintessential winter sport — the Calgary Curling Club is the perfect way to embrace Canadian culture and meet locals." },
    servicesOffered: ["Learn-to-curl programs", "Recreational leagues", "Competitive play", "Beginner-welcome", "Canadian cultural experience"],
    phone: "403-282-3816",
    website: "https://calgarycurling.ca",
    cost: "paid",
    hiddenGem: true,
    priority: 96,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "prairie-pickleball-association",
    category: ["community", "senior"],
    userTypes: ["newcomer", "student", "family", "senior"],
    title: { en: "Prairie Pickleball Association" },
    description: { en: "Fastest-growing recreational sport in Calgary. Courts across the city with regular drop-in sessions, clinics, and leagues for all ages and skill levels. Perfect social sport for newcomers and seniors looking to stay active and meet people." },
    servicesOffered: ["Pickleball courts city-wide", "Drop-in sessions", "Beginner clinics", "All ages and skill levels", "Social leagues"],
    website: "https://prairiepickleball.ca",
    cost: "low-cost",
    priority: 95,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "calgary-triathlon-club",
    category: ["community"],
    userTypes: ["newcomer", "student", "family"],
    title: { en: "Calgary Triathlon Club" },
    description: { en: "All-levels triathlon club for swim/bike/run enthusiasts. Group training sessions, coached workouts, and a welcoming community. From beginner sprint triathlons to Ironman preparation — one of Canada's most active triathlon clubs." },
    servicesOffered: ["Group training", "Coached workouts", "All levels welcome", "Sprint to Ironman distance", "Social community"],
    website: "https://calgarytriathlon.com",
    cost: "paid",
    priority: 88,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================
  // ARTS, CULTURE & CREATIVE — Cat. 27
  // ============================================
  {
    id: "arts-commons-calgary",
    category: ["community", "tourism"],
    userTypes: ["newcomer", "student", "family", "senior"],
    title: { en: "Arts Commons Calgary" },
    description: { en: "Calgary's premier performing arts complex at 205 8 Ave SE — home to the Calgary Philharmonic Orchestra, Theatre Calgary, Alberta Theatre Projects, and more. Five performance spaces. Canada's third-largest performing arts complex." },
    servicesOffered: ["Live theatre", "Orchestra performances", "5 performance venues", "Arts education programs", "Downtown Calgary"],
    phone: "403-294-7455",
    address: "205 8 Ave SE, Calgary, AB",
    website: "https://artscommons.ca",
    cost: "paid",
    featured: true,
    priority: 98,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "calgary-international-film-festival",
    category: ["community", "tourism"],
    userTypes: ["newcomer", "student", "family", "senior"],
    title: { en: "Calgary International Film Festival" },
    description: { en: "Annual September film festival showcasing 150+ films from 40+ countries. One of Canada's top film festivals with world premieres, filmmakers in attendance, and industry panels. Single tickets and passes available." },
    servicesOffered: ["150+ films screened", "40+ countries represented", "Annual September event", "World premieres", "Industry panels"],
    website: "https://calgaryfilm.com",
    cost: "paid",
    priority: 97,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "calgary-jazz-association",
    category: ["community"],
    userTypes: ["newcomer", "student", "family", "senior"],
    title: { en: "Calgary Jazz Association" },
    description: { en: "Produces Calgary's vibrant jazz scene including the annual Jazz Festival and year-round concert series. Community jam sessions welcome newcomers to experience Canadian jazz culture. Free and low-cost events make jazz accessible to all Calgarians." },
    servicesOffered: ["Annual Jazz Festival", "Year-round concerts", "Community jam sessions", "Free and low-cost events", "Accessible to all"],
    website: "https://calgaryjazz.com",
    cost: "free",
    hiddenGem: true,
    priority: 95,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },
  {
    id: "beakerhead-calgary",
    category: ["community", "tourism"],
    userTypes: ["newcomer", "student", "family"],
    title: { en: "Beakerhead — STEAM Festival Calgary" },
    description: { en: "Annual September festival merging science, engineering, art, and technology. Free and low-cost events across Calgary including large outdoor spectacles, workshops, and exhibitions. One of the world's only STEAM festivals — a uniquely Calgary experience." },
    servicesOffered: ["Annual September festival", "Free outdoor events", "Science and art fusion", "Workshops and exhibitions", "Uniquely Calgary"],
    website: "https://beakerhead.com",
    cost: "free",
    hiddenGem: true,
    priority: 96,
    lastUpdated: "2026-06",
    source: "Master Data Pack 2026",
  },

  // ============================================================
  // EDUCATION FINANCE: NEWCOMER & CREDENTIAL LOANS
  // ============================================================
  {
    id: "windmill-microlending",
    category: ["education", "newcomer", "business"],
    userTypes: ["newcomer", "student", "business"],
    title: { en: "Windmill Microlending" },
    description: { en: "Calgary's #1 stop for foreign-credential financing — loans up to $15,000 (most borrowers take ~$11,000) at a fixed 5.95% interest rate (4.45% for the Healthcare Reaccreditation Loan), no fees, for licensing exams, credential assessments (WES/ICAS/IQAS/MIFI), bridging programs, tools, or relocation for a job. This is a personal loan, not a student loan — no T4 is issued and interest is not tax-deductible — and it cannot cover immigration application fees or the cost of sponsoring a family member." },
    eligibility: { en: "Open to newcomers (permanent residents, protected persons, and some work-permit holders) who need financing to have their foreign credentials recognized or to complete a licensing/bridging program. No cosigner or Canadian credit history required." },
    servicesOffered: ["Loans up to $15,000 (avg. ~$11,000)", "Fixed 5.95% interest (4.45% healthcare)", "No fees", "Covers WES/ICAS/IQAS/MIFI assessments", "Covers licensing exams, bridging programs, tools, and relocation", "Free mentorship included", "Note: rebranded from Immigrant Access Fund Canada in 2018"],
    phone: "1-855-423-2262",
    website: "https://www.windmillmicrolending.org/our-loans",
    mapUrl: "https://maps.google.com/?q=Windmill+Microlending+Calgary",
    cost: "low-cost",
    featured: true,
    priority: 90,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },
  {
    id: "atb-new-to-canada-line-of-credit",
    category: ["education", "newcomer", "business"],
    userTypes: ["newcomer", "student"],
    title: { en: "ATB Financial — New to Canada Line of Credit" },
    description: { en: "A revolving line of credit up to $10,000 at Prime + 7% (Prime + 6% with loan protection), designed for newcomers who have been in Canada under 5 years and have no Canadian credit history yet. Can be used flexibly for credential financing, moving costs, or settling-in expenses. No setup or annual fee." },
    eligibility: { en: "Newcomers to Canada within the last 5 years, including those with no established Canadian credit history. Visit a branch with your permanent resident or work permit documentation." },
    servicesOffered: ["Up to $10,000 revolving credit", "Prime + 7% rate (Prime + 6% with loan protection)", "No Canadian credit history needed", "No setup fee", "No annual fee"],
    phone: "1-800-332-8383",
    website: "https://www.atb.com/personal/borrowing/lines-of-credit/new-to-canada-line-of-credit/",
    mapUrl: "https://maps.google.com/?q=ATB+Financial+Calgary",
    cost: "low-cost",
    priority: 86,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },
  {
    id: "futurpreneur-newcomer-startup",
    category: ["business", "education", "newcomer"],
    userTypes: ["newcomer", "business"],
    title: { en: "Futurpreneur — Newcomer Startup Program" },
    description: { en: "Startup financing of up to $25,000 ($12,500 from Futurpreneur + $12,500 from BDC, 1% loan management fee, 5-year term) plus two years of free one-on-one mentorship for newcomers aged 18-39 who have been in Canada under 60 months and want to start a business." },
    eligibility: { en: "Ages 18-39, in Canada under 60 months (5 years), with a viable business idea and business plan." },
    servicesOffered: ["Up to $25,000 startup financing ($12,500 + $12,500 BDC)", "1% loan management fee, 5-year term", "2 years of mentorship included", "Business plan support"],
    website: "https://futurpreneur.ca/en/offering/newcomers/",
    cost: "low-cost",
    priority: 82,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },
  {
    id: "windmill-empp-settlement-loan",
    category: ["newcomer", "education"],
    userTypes: ["newcomer"],
    title: { en: "Windmill Microlending — EMPP Settlement Loan" },
    description: { en: "A settlement loan of $1,000-$15,000 at a fixed 5.95% interest rate specifically for Economic Mobility Pathways Pilot (EMPP) refugee candidates who have a confirmed Canadian job offer. Covers rent, furniture, and other early living costs after landing in Calgary." },
    eligibility: { en: "Refugee candidates approved under the Economic Mobility Pathways Pilot (EMPP) with a confirmed Canadian job offer." },
    servicesOffered: ["$1,000-$15,000 loan", "Fixed 5.95% interest", "Covers rent, furniture, and early settlement costs"],
    phone: "1-855-423-2262",
    website: "https://www.windmillmicrolending.org/empp",
    cost: "low-cost",
    priority: 78,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },
  {
    id: "ircc-immigration-loans-program",
    category: ["newcomer", "education"],
    userTypes: ["newcomer"],
    title: { en: "IRCC Immigration Loans Program" },
    description: { en: "A federal loan for resettled refugees to cover transportation to Canada and initial settlement costs. Repayment starts 12 months after arrival, with terms of 36-96 months depending on the amount owed. IRCC does not publish an interest rate for this program." },
    eligibility: { en: "Resettled refugees (Government-Assisted Refugees and some privately sponsored refugees) who need help covering travel and settlement costs upon arrival in Canada." },
    servicesOffered: ["Covers transportation to Canada", "Covers initial settlement costs", "Repayment starts 12 months after arrival", "36-96 month repayment terms"],
    phone: "1-800-667-7301",
    website: "https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees/help-within-canada/financial.html",
    cost: "low-cost",
    priority: 70,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },
  {
    id: "resettlement-assistance-program",
    category: ["newcomer"],
    userTypes: ["newcomer"],
    title: { en: "Resettlement Assistance Program (RAP)" },
    description: { en: "A grant, not a loan — covers reception, temporary housing, and income support for up to one year for Government-Assisted Refugees arriving in Alberta. No repayment required." },
    eligibility: { en: "Government-Assisted Refugees (GARs) arriving in Alberta, including Calgary." },
    servicesOffered: ["Reception services", "Temporary housing", "Income support for up to 1 year", "No repayment — it's a grant"],
    website: "https://www.rstp.ca/wp-content/uploads/2025/12/Alberta-January-2026.pdf",
    cost: "free",
    priority: 72,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },
  {
    id: "newcomer-loan-myths-debunked",
    category: ["newcomer", "education"],
    userTypes: ["newcomer"],
    title: { en: "Newcomer Loan Myths: What CCIS, Centre for Newcomers, and Servus Actually Offer" },
    description: { en: "Common myths, debunked: CCIS, Centre for Newcomers, and Bow Valley College do NOT offer loans — CCIS provides settlement and employment services only, and Centre for Newcomers offers free financial coaching, RESP/Canada Learning Bond sign-up help, and a matched-savings program (no loan). \"Immigrant Access Fund Canada\" no longer exists as a separate lender — it rebranded to Windmill Microlending in 2018. Servus Credit Union's \"New to Canada\" product is a banking package with fee waivers, not a loan." },
    eligibility: { en: "Informational — helps newcomers avoid wasted applications and scam \"sponsorship loan\" offers by clarifying what each organization actually provides." },
    servicesOffered: ["CCIS = settlement/employment services, no loans", "Centre for Newcomers = free coaching + RESP sign-up + matched savings, no loans", "Immigrant Access Fund Canada = rebranded to Windmill Microlending (2018)", "Servus \"New to Canada\" = fee-waiver banking package, not a loan"],
    website: "https://www.centrefornewcomers.ca/empower",
    cost: "free",
    priority: 68,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },

  // ============================================================
  // EDUCATION FINANCE: STUDENT LOANS & GRANTS (ALL ALBERTANS)
  // ============================================================
  {
    id: "alberta-student-aid",
    category: ["education"],
    userTypes: ["student", "newcomer", "family"],
    title: { en: "Alberta Student Aid" },
    description: { en: "One application assesses you for both Alberta and federal student loans and grants automatically — no need to apply twice. Annual loan amounts range from $8,500-$42,500 depending on program (lifetime limits $51,000-$200,000). Covers full-time (60%+ course load, or 40%+ with a documented disability) and part-time students at designated post-secondary institutions." },
    eligibility: { en: "Eligibility checklist: 1) You are a Canadian citizen, permanent resident, or protected person (incl. Convention refugee) with a valid Canadian SIN. 2) A study permit or work permit alone does NOT qualify. 3) Protected persons need a 900-series SIN plus an IRB Notice of Decision or IRCC Verification of Status valid at the start of your study period. 4) You are enrolled at a designated post-secondary institution in Alberta. 5) You are taking at least 60% of a full course load (40% with a documented disability) to count as full-time. 6) You have financial need. 7) You are in good standing on any prior student loans.\n\nHow to apply: 1) Confirm your status qualifies. 2) Create and verify your Alberta.ca Account, then your Student Aid account (an Alberta driver's licence or ID card is needed; verification can take up to 10 business days). 3) Confirm your school/program is designated. 4) Ask your school whether you're full-time or part-time. 5) Gather your SIN, Student Number, last year's income (Line 15000), program dates, and (if applicable) parents'/spouse's income or disability documentation. 6) Apply at least 60 days before classes start — one application covers both Alberta and federal aid. 7) After approval, complete your Alberta Student Aid Agreement (banking info) and the federal MSFAA via My Service Canada Account. 8) Your school must confirm your registration before funds release. 9) Funds disburse 100% at term start (1-semester award) or 50/50 at start and midpoint (multi-semester). 10) If denied or underfunded, you can appeal: Request for Reconsideration (30 days before your study period ends) → Executive Review (60 days) → Ministerial Review (90 days). 11) Reapply every academic year — funding does not automatically renew. 12) Stack free money on top — apply for the Rutherford Scholarship and institution bursaries alongside your loan application." },
    servicesOffered: ["Covers Alberta + federal loans and grants in one application", "$8,500-$42,500/year depending on program", "Apply 60+ days before classes start", "Grants do not need to be repaid", "3-level appeal process if denied/underfunded", "Repayment Assistance Plan caps payments at 10% of household income"],
    phone: "1-855-606-2096",
    website: "https://studentaid.alberta.ca/apply/how-to-apply/",
    cost: "free",
    featured: true,
    priority: 92,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },
  {
    id: "canada-student-financial-assistance",
    category: ["education"],
    userTypes: ["student"],
    title: { en: "Canada Student Financial Assistance Program" },
    description: { en: "Federal student loans and grants, assessed automatically from your single Alberta Student Aid application — no separate federal application needed. Loans are capped based on 340-520 weeks of study. Federal student loan interest was permanently eliminated as of April 1, 2023, even on loans already in repayment — a 6-month non-repayment period applies after study, then 0% interest forever." },
    eligibility: { en: "Assessed automatically when you apply through Alberta Student Aid. Full-time and part-time students at designated institutions may qualify; grant amounts depend on income and family size." },
    servicesOffered: ["0% interest on federal loans (since April 2023)", "Grants up to $525/month ($4,200/year) for eligible students", "No separate application required", "6-month non-repayment period after study"],
    phone: "1-888-815-4514",
    website: "https://www.canada.ca/en/services/benefits/education/student-aid/grants-loans/full-time.html",
    cost: "free",
    priority: 88,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },
  {
    id: "alberta-student-grant-fulltime",
    category: ["education"],
    userTypes: ["student"],
    title: { en: "Alberta Student Grant for Full-time Students (ASG-FT)" },
    description: { en: "A non-repayable grant (not a loan) of $425/month, up to $5,100/year, assessed as part of your Alberta Student Aid application based on financial need." },
    eligibility: { en: "Assessed automatically as part of the Alberta Student Aid application for full-time students with demonstrated financial need." },
    servicesOffered: ["$425/month, up to $5,100/year", "Non-repayable — it's a grant", "Assessed automatically with Alberta Student Aid application"],
    phone: "1-855-606-2096",
    website: "https://studentaid.alberta.ca/policy/student-aid-policy-manual/eligibility-for-student-loans-and-grants/alberta-student-grants/",
    cost: "free",
    priority: 79,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },

  // ============================================================
  // EDUCATION FINANCE: SCHOLARSHIPS & GRANTS
  // ============================================================
  {
    id: "alexander-rutherford-scholarship",
    category: ["education"],
    userTypes: ["student"],
    title: { en: "Alexander Rutherford Scholarship" },
    description: { en: "Worth up to $2,500, awarded once per lifetime to Alberta high school graduates who enroll full-time in a designated post-secondary program. No separate application fee." },
    eligibility: { en: "Alberta residents who graduated high school with the required grade average and are enrolling full-time in a designated program. Automatically assessed for most applicants via high school transcripts." },
    servicesOffered: ["Up to $2,500", "No application fee", "Alberta residents only", "Min. 12-month Alberta residency required"],
    website: "https://studentaid.alberta.ca/scholarships-and-awards/alexander-rutherford-scholarship/",
    cost: "free",
    priority: 80,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },
  {
    id: "rutherford-scholar-award",
    category: ["education"],
    userTypes: ["student"],
    title: { en: "Rutherford Scholar Award" },
    description: { en: "An additional $2,500 award for the top-10 scorers on Alberta Diploma Exams, automatically selected from Rutherford Scholarship applicants — no separate application needed." },
    eligibility: { en: "Automatically selected from Alexander Rutherford Scholarship applicants who score in the top 10 on a Diploma Exam." },
    servicesOffered: ["$2,500 award", "No separate application — auto-selected from Rutherford applicants"],
    website: "https://studentaid.alberta.ca/scholarships/rutherford-scholar-award/",
    cost: "free",
    priority: 73,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },
  {
    id: "canada-learning-bond-resp",
    category: ["education", "family"],
    userTypes: ["family", "newcomer"],
    title: { en: "Canada Learning Bond (RESP)" },
    description: { en: "Up to $2,000 per child in free government money deposited into a Registered Education Savings Plan (RESP) for children from low-income families — no personal RESP contribution is required to receive it. Free sign-up help is available at Centre for Newcomers." },
    eligibility: { en: "Children from lower-income families born in 2004 or later, with a valid Social Insurance Number and an open RESP. No contribution to the RESP is required to qualify for the bond itself." },
    servicesOffered: ["Up to $2,000 per child", "No contribution needed", "Free sign-up help at Centre for Newcomers", "Note: the old Alberta Centennial Education Savings (ACES) Plan closed in 2015 — do not confuse it with this"],
    website: "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
    cost: "free",
    priority: 76,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },
  {
    id: "canada-education-savings-grant",
    category: ["education", "family"],
    userTypes: ["family", "newcomer"],
    title: { en: "Canada Education Savings Grant (CESG)" },
    description: { en: "The federal government matches 20-40% of what you contribute to a child's RESP, up to a lifetime maximum of $7,200 per child. Unlike the Canada Learning Bond, this grant requires you to actually contribute to the RESP." },
    eligibility: { en: "Any child resident in Canada with an open RESP qualifies for the matching grant on contributions made to that RESP." },
    servicesOffered: ["20-40% match on RESP contributions", "Lifetime max $7,200 per child", "Requires personal RESP contributions (unlike the Canada Learning Bond)"],
    website: "https://www.canada.ca/en/services/benefits/education/education-savings/estimating-amounts.html",
    cost: "free",
    priority: 71,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },
  {
    id: "postsecondary-institution-bursaries-calgary",
    category: ["education"],
    userTypes: ["student"],
    title: { en: "University of Calgary, SAIT & Bow Valley College Awards" },
    description: { en: "Institution-specific bursaries and awards: University of Calgary offers need-based bursaries (amount varies) for full-time students with demonstrated financial need; SAIT offers 6,500+ student awards (amounts vary) for full-time students and apprentices, domestic and international; Bow Valley College offers $1,000-$16,924 in awards and bursaries, most domestic and financial-need based." },
    eligibility: { en: "Varies by institution and award — generally requires full-time enrolment at the respective institution; most awards prioritize demonstrated financial need." },
    servicesOffered: ["UCalgary: need-based bursaries", "SAIT: 6,500+ awards, domestic + international eligible", "Bow Valley College: $1,000-$16,924 per award"],
    website: "https://www.ucalgary.ca/registrar/finances/awards-scholarships-and-bursaries/bursaries",
    cost: "free",
    priority: 69,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },
  {
    id: "calgary-foundation-student-awards",
    category: ["education"],
    userTypes: ["student"],
    title: { en: "Calgary Foundation Student Awards" },
    description: { en: "48 distinct scholarship and bursary awards ranging from $1,000 to $7,500 for post-secondary students at CRA-recognized institutions. Applications open mid-February each year for the following academic cycle — set a reminder." },
    eligibility: { en: "Varies by award — most require enrolment at a CRA-recognized post-secondary institution, and most awards are for citizens/permanent residents. Check individual award criteria on the Calgary Foundation website." },
    servicesOffered: ["48 awards available", "$1,000-$7,500 per award", "Applications open mid-February"],
    phone: "403-802-7700",
    website: "https://calgaryfoundation.org/awards/scholarships-awards-bursaries/",
    cost: "free",
    priority: 74,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },

  // ============================================================
  // EDUCATION FINANCE: FAMILY SPONSORSHIP — MYTH-BUSTER
  // ============================================================
  {
    id: "family-sponsorship-finance-facts",
    category: ["education", "newcomer", "family", "legal"],
    userTypes: ["newcomer", "family"],
    title: { en: "Family Sponsorship Finances: There Is No \"Alberta Sponsorship Loan\"" },
    description: { en: "Searching for an \"Alberta sponsorship loan\" or a \"settlement loan\" to sponsor family? These do not exist — no Alberta or Calgary government loan program funds family sponsorship (Alberta funds settlement agencies, not individual loans). Sponsoring a spouse, partner, or dependent child usually has no income requirement at all — it's an income test only in narrow cases, like sponsoring a dependent child who has their own dependent children. Sponsoring parents or grandparents requires proving your income meets a government Minimum Necessary Income threshold over 3 consecutive tax years (a spouse can co-sign to combine income) — this is an income test and a legal Undertaking of financial support, not money that is loaned to you. You can even become ineligible to sponsor if you fall behind on payments for an existing immigration loan." },
    eligibility: { en: "Spouse/partner/dependent child sponsorship: generally no minimum income requirement (some exceptions apply if you're receiving social assistance for reasons other than disability). Parent/grandparent sponsorship: your income over the last 3 consecutive tax years must meet or exceed the Minimum Necessary Income (MNI) table published by IRCC — for the 2025 intake, a 2-person household needs $47,549, plus about $10,291 per additional person — and you sign a legally binding Undertaking to support them financially. Real loans that DO exist for arriving newcomers are narrow: the IRCC Immigration Loans Program (resettled refugees only) and Windmill's EMPP Settlement Loan (EMPP refugee candidates with a confirmed job offer only) — neither can be used to sponsor someone else." },
    servicesOffered: ["No income test for most spouse/partner/child sponsorships", "Parent/grandparent sponsorship uses a 3-year MNI income test, not a loan", "No Alberta or Calgary 'sponsorship loan' program exists", "Legal Undertaking, not a debt", "Falling behind on an existing immigration loan can make you ineligible to sponsor"],
    website: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/spouse-partner-children/eligibility.html",
    cost: "free",
    priority: 84,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Education Finance Module 2026",
  },

  // ============================================================
  // FAMILY OUTINGS & ATTRACTIONS — Community Module 2026
  // ============================================================
  {
    id: "fish-creek-provincial-park",
    category: ["tourism", "family", "community"],
    userTypes: ["family", "newcomer", "senior", "student"],
    title: {
      en: "Fish Creek Provincial Park",
      tl: "Fish Creek Provincial Park",
      es: "Parque Provincial Fish Creek",
      ar: "متنزه فيش كريك الإقليمي",
      zh: "费雪河省立公园",
    },
    description: {
      en: "One of the largest urban parks in North America, stretching 19km along the south end of Calgary. Free walking, cycling, and cross-country ski trails, picnic areas, playgrounds, and the Bow Valley Ranche Visitor Centre. A favourite year-round family destination with wildlife spotting (deer, coyotes, birds) minutes from residential neighbourhoods.",
      tl: "Isa sa pinakamalaking urban parks sa North America, may libreng mga trail para sa paglalakad at pag-bike.",
      es: "Uno de los parques urbanos más grandes de América del Norte, con senderos gratuitos para caminar y andar en bicicleta.",
      ar: "أحد أكبر المتنزهات الحضرية في أمريكا الشمالية، بمسارات مجانية للمشي وركوب الدراجات.",
      zh: "北美最大的城市公园之一，提供免费的步行和骑行道。",
    },
    servicesOffered: [
      "19km of free trails",
      "Picnic areas & playgrounds",
      "Wildlife viewing",
      "Bow Valley Ranche Visitor Centre",
      "Cross-country skiing in winter",
    ],
    address: "15979 Bow Bottom Trail SE, Calgary, AB",
    website: "https://www.albertaparks.ca/parks/kananaskis/fish-creek-pp/",
    cost: "free",
    priority: 88,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "bowness-park",
    category: ["tourism", "family", "community"],
    userTypes: ["family", "newcomer", "senior", "student"],
    title: {
      en: "Bowness Park",
      tl: "Bowness Park",
      es: "Parque Bowness",
      ar: "متنزه بونيس",
      zh: "宝尼斯公园",
    },
    description: {
      en: "A century-old riverside park with a calm lagoon for canoeing, paddle-boating, and — in winter — one of Calgary's most popular outdoor skating rinks with rental skates on-site. Picnic areas, a seasonal café, and mature trees make it a relaxed, low-cost family outing any time of year.",
      tl: "Isang matandang riverside park na may lagoon para sa pagsakay ng bangka at, sa taglamig, pampublikong skating rink.",
      es: "Un parque ribereño centenario con una laguna para canotaje y, en invierno, una popular pista de patinaje al aire libre.",
      ar: "متنزه على ضفة النهر يعود لقرن مضى، به بحيرة صغيرة للتجديف وفي الشتاء حلبة تزلج شهيرة في الهواء الطلق.",
      zh: "拥有百年历史的河畔公园，设有可划船的泻湖，冬季还有卡尔加里最受欢迎的户外滑冰场之一。",
    },
    servicesOffered: [
      "Canoe & paddle-boat rentals (summer)",
      "Outdoor skating rink & skate rentals (winter)",
      "Picnic areas & pathways",
      "Seasonal café",
    ],
    address: "8900 48 Ave NW, Calgary, AB",
    website: "https://www.calgary.ca/parks/locations/bowness-park.html",
    cost: "low-cost",
    priority: 84,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "spruce-meadows",
    category: ["tourism", "family", "sports"],
    userTypes: ["family", "newcomer", "senior", "student"],
    title: {
      en: "Spruce Meadows",
      tl: "Spruce Meadows",
      es: "Spruce Meadows",
      ar: "سبروس ميدوز",
      zh: "云杉草地",
    },
    description: {
      en: "World-renowned equestrian show-jumping venue on Calgary's south edge. Major summer tournaments (the 'National', 'Continental', 'Masters') offer free general-admission grounds passes on many days, with food trucks, shopping, and horse-viewing for the whole family — a genuinely free-to-low-cost world-class event.",
      tl: "Sikat na equestrian venue sa timog ng Calgary na may libreng general-admission sa maraming tournament days.",
      es: "Reconocido recinto ecuestre en el sur de Calgary, con entrada general gratuita en muchos días de torneo.",
      ar: "ساحة فروسية عالمية الشهرة في جنوب كالجاري، مع دخول عام مجاني في كثير من أيام البطولات.",
      zh: "位于卡尔加里南部的世界知名马术场地，许多比赛日提供免费的普通入场。",
    },
    servicesOffered: [
      "Free general-admission on many tournament days",
      "International show-jumping competitions",
      "Food trucks & shopping village",
      "Horse stable tours",
    ],
    address: "18011 Spruce Meadows Way SW, Calgary, AB",
    website: "https://www.sprucemeadows.com",
    cost: "free",
    priority: 82,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "inglewood-bird-sanctuary",
    category: ["tourism", "family", "community"],
    userTypes: ["family", "newcomer", "senior", "student"],
    title: {
      en: "Inglewood Bird Sanctuary",
      tl: "Inglewood Bird Sanctuary",
      es: "Santuario de Aves de Inglewood",
      ar: "محمية طيور إنجليوود",
      zh: "英格尔伍德鸟类保护区",
    },
    description: {
      en: "A free, quiet nature sanctuary along the Bow River with wetlands, forest trails, and a visitor centre — home to over 270 recorded bird species. A calm, no-cost way to spend an afternoon outdoors with kids, especially popular for beginner birdwatching and nature walks.",
      tl: "Libreng nature sanctuary sa tabi ng Bow River na may wetlands at forest trails.",
      es: "Santuario natural gratuito junto al río Bow, con humedales y senderos forestales.",
      ar: "محمية طبيعية مجانية وهادئة على طول نهر بو، تضم أراضٍ رطبة ومسارات غابات.",
      zh: "免费的宁静自然保护区，沿弓河设有湿地和森林步道。",
    },
    servicesOffered: [
      "270+ recorded bird species",
      "Wetland & forest trails",
      "Visitor centre",
      "Free admission",
    ],
    address: "2425 9 Ave SE, Calgary, AB",
    website: "https://www.calgary.ca/parks/locations/inglewood-bird-sanctuary.html",
    cost: "free",
    priority: 78,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "the-military-museums-calgary",
    category: ["tourism", "family", "community"],
    userTypes: ["family", "newcomer", "senior", "student"],
    title: {
      en: "The Military Museums",
      tl: "The Military Museums",
      es: "Los Museos Militares",
      ar: "المتاحف العسكرية",
      zh: "军事博物馆",
    },
    description: {
      en: "Canada's second-largest military museum complex, covering the Army, Navy, and Air Force with interactive exhibits, vehicles, aircraft, and veteran stories. A meaningful, affordable outing for families and newcomers interested in Canadian history.",
      tl: "Pangalawang pinakamalaking military museum complex sa Canada na sumasaklaw sa Army, Navy, at Air Force.",
      es: "El segundo complejo de museos militares más grande de Canadá, que cubre el Ejército, la Marina y la Fuerza Aérea.",
      ar: "ثاني أكبر مجمع متاحف عسكرية في كندا، يغطي الجيش والبحرية والقوات الجوية.",
      zh: "加拿大第二大军事博物馆群，涵盖陆军、海军和空军。",
    },
    servicesOffered: [
      "Army, Navy & Air Force galleries",
      "Historic vehicles & aircraft",
      "Veteran & Indigenous soldier stories",
      "School group tours",
    ],
    phone: "403-974-2850",
    address: "4520 Crowchild Trail SW, Calgary, AB",
    website: "https://www.themilitarymuseums.ca",
    cost: "low-cost",
    priority: 76,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "calaway-park",
    category: ["tourism", "family"],
    userTypes: ["family", "student"],
    title: {
      en: "Calaway Park",
      tl: "Calaway Park",
      es: "Parque Calaway",
      ar: "متنزه كالاواي",
      zh: "卡拉威乐园",
    },
    description: {
      en: "Western Canada's largest outdoor family amusement park, just west of Calgary. Over 30 rides and attractions for all ages, plus a campground on-site. Open seasonally (May-September) — a classic full-day family outing.",
      tl: "Pinakamalaking outdoor family amusement park sa Western Canada, may 30+ rides.",
      es: "El parque de diversiones familiar al aire libre más grande del oeste de Canadá, con más de 30 atracciones.",
      ar: "أكبر متنزه ترفيهي عائلي في الهواء الطلق في غرب كندا، يضم أكثر من 30 لعبة.",
      zh: "加拿大西部最大的户外家庭游乐园，拥有30多个游乐设施。",
    },
    servicesOffered: [
      "30+ rides & attractions",
      "On-site campground",
      "Seasonal (May-September)",
      "Group & birthday packages",
    ],
    phone: "403-240-3822",
    address: "245033 Range Road 33, Calgary, AB",
    website: "https://calawaypark.com",
    cost: "paid",
    priority: 80,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "devonian-gardens",
    category: ["tourism", "family", "community"],
    userTypes: ["family", "newcomer", "senior", "student"],
    title: {
      en: "Devonian Gardens",
      tl: "Devonian Gardens",
      es: "Jardines Devonian",
      ar: "حدائق ديفونيان",
      zh: "德文尼安花园",
    },
    description: {
      en: "A free, indoor 2.5-acre botanical garden on the 4th floor of The CORE downtown shopping centre — lush greenery, ponds, and a playground, all climate-controlled year-round. An easy, free, weather-proof outing for a Calgary winter day with kids.",
      tl: "Libre at indoor botanical garden sa The CORE downtown shopping centre, bukas buong taon.",
      es: "Un jardín botánico interior gratuito de 2.5 acres en el centro comercial The CORE, abierto todo el año.",
      ar: "حديقة نباتية داخلية مجانية بمساحة 2.5 فدان في مركز The CORE للتسوق وسط المدينة، مفتوحة طوال العام.",
      zh: "位于市中心The CORE购物中心四楼的免费室内植物园，全年恒温开放。",
    },
    servicesOffered: [
      "Free admission",
      "Indoor climate-controlled garden",
      "Children's playground",
      "Open year-round, all weather",
    ],
    address: "324 8 Ave SW, Calgary, AB (4th floor, The CORE)",
    website: "https://www.calgary.ca/parks/locations/devonian-gardens.html",
    cost: "free",
    priority: 79,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },

  // ============================================================
  // VOLUNTEERING — Additional Organizations, Community Module 2026
  // ============================================================
  {
    id: "habitat-for-humanity-calgary",
    category: ["volunteering", "community"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: {
      en: "Habitat for Humanity Calgary",
      tl: "Habitat for Humanity Calgary",
      es: "Habitat for Humanity Calgary",
      ar: "هابيتات فور هيومانيتي كالجاري",
      zh: "卡尔加里仁人家园",
    },
    description: {
      en: "Volunteer on home-building sites, or at the ReStore donation-and-resale outlets, to help low-income Calgary families build affordable, decent housing. No construction experience needed — training is provided on-site. A hands-on way to build Canadian work experience while giving back.",
      tl: "Mag-volunteer sa home-building sites o sa ReStore donation outlets para tumulong sa mga low-income families.",
      es: "Sea voluntario en obras de construcción de viviendas o en las tiendas ReStore para ayudar a familias de bajos ingresos.",
      ar: "تطوع في مواقع بناء المنازل أو في متاجر ReStore لمساعدة الأسر ذات الدخل المحدود على بناء سكن لائق.",
      zh: "在建房工地或ReStore捐赠转售商店做志愿者，帮助低收入家庭建造经济适用房，无需建筑经验。",
    },
    servicesOffered: [
      "Home-build site volunteering (no experience needed)",
      "ReStore donation & resale outlets",
      "Group & corporate volunteer days",
      "Training provided on-site",
    ],
    phone: "403-243-8687",
    website: "https://www.habitat.ab.ca",
    cost: "free",
    priority: 87,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "calgary-reads",
    category: ["volunteering", "community", "education", "family"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: {
      en: "Calgary Reads",
      tl: "Calgary Reads",
      es: "Calgary Reads",
      ar: "كالجاري ريدز",
      zh: "卡尔加里阅读会",
    },
    description: {
      en: "Volunteer as a one-on-one reading buddy for young children who need extra literacy support, or help sort books at the Calgary Reads Book Bank, which distributes free books to Calgary kids. A flexible, low-commitment way to support childhood literacy.",
      tl: "Mag-volunteer bilang reading buddy para sa mga batang nangangailangan ng literacy support.",
      es: "Sea voluntario como compañero de lectura para niños que necesitan apoyo adicional en lectoescritura.",
      ar: "تطوع كصديق قراءة فردي للأطفال الذين يحتاجون إلى دعم إضافي في القراءة والكتابة.",
      zh: "作为一对一阅读伙伴志愿者，为需要额外识字支持的儿童提供帮助，或在图书银行整理图书。",
    },
    servicesOffered: [
      "One-on-one reading buddy volunteering",
      "Book Bank sorting & distribution",
      "Free books for Calgary children",
      "Flexible scheduling",
    ],
    website: "https://calgaryreads.com",
    cost: "free",
    priority: 79,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "kids-up-front-calgary",
    category: ["volunteering", "community", "family"],
    userTypes: ["family", "newcomer"],
    title: {
      en: "Kids Up Front Calgary",
      tl: "Kids Up Front Calgary",
      es: "Kids Up Front Calgary",
      ar: "كيدز أب فرونت كالجاري",
      zh: "卡尔加里儿童优先基金会",
    },
    description: {
      en: "A foundation that redistributes donated event, sports, and arts tickets to children and families facing barriers to access, so they can attend Flames, Stampeders, Wranglers, and cultural events they otherwise couldn't afford. Volunteers help coordinate ticket distribution and outreach with partner agencies.",
      tl: "Isang foundation na naghahatid ng mga donated na tickets sa mga batang walang access sa mga kaganapan.",
      es: "Una fundación que redistribuye entradas donadas a niños y familias con barreras de acceso a eventos.",
      ar: "مؤسسة تعيد توزيع تذاكر الفعاليات المتبرع بها على الأطفال والأسر التي تواجه عوائق في الوصول إليها.",
      zh: "该基金会将捐赠的活动门票重新分配给面临参与障碍的儿童和家庭，让他们能观看火焰队、种马队等赛事和文化活动。",
    },
    servicesOffered: [
      "Redistributes donated sports & event tickets",
      "Ticket coordination volunteering",
      "Partner-agency outreach",
      "Serves children & families facing access barriers",
    ],
    phone: "403-218-6142",
    website: "https://kidsupfront.com",
    cost: "free",
    priority: 75,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },

  // ============================================================
  // SPORTS & RECREATION — Flames Community, Community Module 2026
  // ============================================================
  {
    id: "calgary-flames",
    category: ["sports", "tourism", "community"],
    userTypes: ["family", "newcomer", "student", "senior"],
    title: {
      en: "Calgary Flames (NHL)",
      tl: "Calgary Flames (NHL)",
      es: "Calgary Flames (NHL)",
      ar: "كالجاري فليمز (NHL)",
      zh: "卡尔加里火焰队 (NHL)",
    },
    description: {
      en: "Calgary's NHL hockey team, playing home games at the Scotiabank Saddledome. Single-game tickets and Rally House team-store merchandise make for an easy first taste of Canadian hockey culture — a great way for newcomer families to bond over a shared local passion.",
      tl: "Ang NHL hockey team ng Calgary, naglalaro ng home games sa Scotiabank Saddledome.",
      es: "El equipo de hockey de la NHL de Calgary, que juega sus partidos en casa en el Scotiabank Saddledome.",
      ar: "فريق هوكي كالجاري في دوري الهوكي الوطني، يلعب مبارياته على ملعب سكوتيابانك سادلدوم.",
      zh: "卡尔加里的NHL冰球队，主场比赛在丰业银行鞍形馆举行。",
    },
    servicesOffered: [
      "NHL home games at Scotiabank Saddledome",
      "Single-game & season tickets",
      "Team store & merchandise",
      "Kids & family game-day promotions",
    ],
    address: "555 Saddledome Rise SE, Calgary, AB",
    website: "https://www.nhl.com/flames",
    cost: "paid",
    priority: 90,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "calgary-stampeders",
    category: ["sports", "tourism", "community"],
    userTypes: ["family", "newcomer", "student", "senior"],
    title: {
      en: "Calgary Stampeders (CFL)",
      tl: "Calgary Stampeders (CFL)",
      es: "Calgary Stampeders (CFL)",
      ar: "كالجاري ستامبيدرز (CFL)",
      zh: "卡尔加里牛仔队 (CFL)",
    },
    description: {
      en: "Calgary's Canadian Football League team, playing home games at McMahon Stadium. A summer-and-fall tradition with a loyal fan base — tailgating, family game-day packages, and a lively, welcoming stadium atmosphere for newcomers curious about Canadian football.",
      tl: "Ang CFL football team ng Calgary, naglalaro sa McMahon Stadium.",
      es: "El equipo de fútbol canadiense de Calgary, que juega en el McMahon Stadium.",
      ar: "فريق كرة القدم الكندية في كالجاري، يلعب مبارياته في ملعب ماكماهون.",
      zh: "卡尔加里的加拿大足球联盟球队，主场比赛在麦克马洪体育场举行。",
    },
    servicesOffered: [
      "CFL home games at McMahon Stadium",
      "Family game-day packages",
      "Tailgating & fan events",
      "Season & single-game tickets",
    ],
    address: "1817 Crowchild Trail NW, Calgary, AB",
    website: "https://www.stampeders.com",
    cost: "paid",
    priority: 85,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "calgary-wranglers",
    category: ["sports", "tourism", "community"],
    userTypes: ["family", "newcomer", "student", "senior"],
    title: {
      en: "Calgary Wranglers (AHL)",
      tl: "Calgary Wranglers (AHL)",
      es: "Calgary Wranglers (AHL)",
      ar: "كالجاري رانجلرز (AHL)",
      zh: "卡尔加里牧马人队 (AHL)",
    },
    description: {
      en: "The Flames' American Hockey League affiliate, playing at the Scotiabank Saddledome. More affordable tickets than an NHL game with the same fast-paced hockey action — a budget-friendly way for families to catch a live game and watch future Flames prospects.",
      tl: "Ang AHL affiliate ng Flames, naglalaro sa Scotiabank Saddledome.",
      es: "El equipo afiliado de la AHL de los Flames, que juega en el Scotiabank Saddledome.",
      ar: "الفريق التابع لفليمز في الدوري الأمريكي للهوكي، يلعب في سكوتيابانك سادلدوم.",
      zh: "火焰队的美国冰球联盟附属球队，比赛在丰业银行鞍形馆举行，票价比NHL比赛更实惠。",
    },
    servicesOffered: [
      "AHL home games at Scotiabank Saddledome",
      "More affordable than NHL tickets",
      "Family-friendly promotions",
      "Watch future Flames prospects",
    ],
    address: "555 Saddledome Rise SE, Calgary, AB",
    website: "https://www.ahlwranglers.com",
    cost: "paid",
    priority: 78,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "calgary-roughnecks",
    category: ["sports", "tourism", "community"],
    userTypes: ["family", "newcomer", "student", "senior"],
    title: {
      en: "Calgary Roughnecks (NLL Lacrosse)",
      tl: "Calgary Roughnecks (NLL Lacrosse)",
      es: "Calgary Roughnecks (NLL Lacrosse)",
      ar: "كالجاري راف نيكس (دوري اللاكروس الوطني)",
      zh: "卡尔加里油田工队 (NLL 长曲棍球)",
    },
    description: {
      en: "Calgary's professional box-lacrosse team in the National Lacrosse League, playing indoor games at the Scotiabank Saddledome. Fast, high-scoring, and family-friendly — a fun, lesser-known Calgary sport worth discovering, especially in the winter/spring off-season for outdoor sports.",
      tl: "Ang propesyonal na box-lacrosse team ng Calgary sa National Lacrosse League.",
      es: "El equipo profesional de lacrosse en caja de Calgary en la Liga Nacional de Lacrosse.",
      ar: "فريق كالجاري المحترف للاكروس الصندوقي في الدوري الوطني للاكروس.",
      zh: "卡尔加里在国家长曲棍球联盟的职业箱式长曲棍球队，在丰业银行鞍形馆进行室内比赛。",
    },
    servicesOffered: [
      "NLL indoor lacrosse games",
      "Family-friendly, high-scoring games",
      "Affordable tickets",
      "Winter/spring season",
    ],
    address: "555 Saddledome Rise SE, Calgary, AB",
    website: "https://www.roughnecks.com",
    cost: "paid",
    priority: 68,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "flames-foundation-for-life",
    category: ["sports", "volunteering", "community"],
    userTypes: ["family", "newcomer", "student"],
    title: {
      en: "Flames Foundation for Life",
      tl: "Flames Foundation for Life",
      es: "Flames Foundation for Life",
      ar: "مؤسسة فليمز فور لايف",
      zh: "火焰队生命基金会",
    },
    description: {
      en: "The charitable arm of the Calgary Flames, funding youth hockey access, minor-hockey equipment grants, and community sport programs so cost is never a barrier to Calgary kids playing hockey. Also supports broader youth health and wellness initiatives across the city.",
      tl: "Ang charitable arm ng Calgary Flames na nagbibigay ng access sa youth hockey.",
      es: "El brazo caritativo de los Calgary Flames, que financia el acceso al hockey juvenil.",
      ar: "الجناح الخيري لفريق كالجاري فليمز، يمول وصول الشباب إلى الهوكي ومعدات الهوكي الصغرى.",
      zh: "卡尔加里火焰队的慈善机构，资助青少年冰球机会和社区体育项目。",
    },
    servicesOffered: [
      "Minor-hockey equipment grants",
      "Youth hockey access funding",
      "Community sport programs",
      "Youth health & wellness initiatives",
    ],
    website: "https://www.nhl.com/flames/community/flames-foundation",
    cost: "free",
    priority: 72,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "calgary-sport-and-social-club",
    category: ["sports", "community"],
    userTypes: ["newcomer", "student", "family"],
    title: {
      en: "Calgary Sport & Social Club",
      tl: "Calgary Sport & Social Club",
      es: "Club Deportivo y Social de Calgary",
      ar: "نادي كالجاري الرياضي والاجتماعي",
      zh: "卡尔加里体育社交俱乐部",
    },
    description: {
      en: "Adult recreational sports leagues — soccer, volleyball, dodgeball, softball, and more — no experience necessary, teams provided if you sign up solo. One of the easiest ways for newcomers and students to make friends and stay active through a shared weekly activity.",
      tl: "Adult recreational sports leagues — walang kinakailangang experience, may teams na provided.",
      es: "Ligas deportivas recreativas para adultos — no se necesita experiencia, se proporcionan equipos.",
      ar: "دوريات رياضية ترفيهية للبالغين — لا حاجة لخبرة سابقة، يتم توفير فرق لمن يسجل بشكل فردي.",
      zh: "成人休闲体育联赛——无需经验，单独报名也会为您安排队伍。",
    },
    servicesOffered: [
      "Adult recreational sports leagues",
      "Solo sign-up with team placement",
      "Soccer, volleyball, dodgeball, softball & more",
      "No experience necessary",
    ],
    website: "https://calgarysport.com",
    cost: "paid",
    priority: 74,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },

  // ============================================================
  // LGBTQ+ SUPPORT & COMMUNITY — Community Module 2026
  // ============================================================
  {
    id: "calgary-outlink",
    category: ["lgbtq", "community", "mental-health"],
    userTypes: ["newcomer", "family", "student", "senior"],
    title: {
      en: "Calgary Outlink — Centre for Gender & Sexual Diversity",
      tl: "Calgary Outlink — Centre for Gender & Sexual Diversity",
      es: "Calgary Outlink — Centro de Diversidad de Género y Sexual",
      ar: "كالجاري أوت لينك — مركز التنوع الجنسي والجندري",
      zh: "卡尔加里Outlink——性别与性向多元化中心",
    },
    description: {
      en: "Calgary's longest-running 2SLGBTQ+ community organization, offering peer support groups, counselling referrals, a resource library, and social programming for 2SLGBTQ+ people of all ages, plus their friends and family. A safe first point of contact for newcomers and residents navigating identity, coming out, or finding community.",
      tl: "Pinakamatagal na 2SLGBTQ+ community organization sa Calgary na may peer support groups.",
      es: "La organización comunitaria 2SLGBTQ+ más antigua de Calgary, con grupos de apoyo entre pares.",
      ar: "أقدم منظمة مجتمعية للمثليين ومزدوجي الميل في كالجاري، تقدم مجموعات دعم من الأقران.",
      zh: "卡尔加里历史最长的2SLGBTQ+社区组织，提供同伴支持小组、心理咨询转介和资源图书馆。",
    },
    servicesOffered: [
      "Peer support groups",
      "Counselling referrals",
      "Resource library",
      "Social programming for all ages",
      "Support for friends & family",
    ],
    phone: "403-234-8973",
    address: "223 12 Ave SW, Calgary, AB",
    website: "https://calgaryoutlink.ca",
    cost: "free",
    priority: 91,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "skipping-stone-foundation",
    category: ["lgbtq", "family", "youth", "mental-health"],
    userTypes: ["family", "student", "newcomer"],
    title: {
      en: "Skipping Stone Foundation",
      tl: "Skipping Stone Foundation",
      es: "Fundación Skipping Stone",
      ar: "مؤسسة سكيبينغ ستون",
      zh: "跳石基金会",
    },
    description: {
      en: "Calgary-based charity supporting transgender, non-binary, and gender-diverse individuals and their families through peer support groups, family navigation services, and education. Especially valuable for parents of trans or gender-diverse kids looking for guidance and community.",
      tl: "Charity na sumusuporta sa transgender, non-binary, at gender-diverse individuals at kanilang mga pamilya.",
      es: "Organización benéfica que apoya a personas transgénero, no binarias y de género diverso y a sus familias.",
      ar: "جمعية خيرية تدعم الأفراد المتحولين جنسياً وغير الثنائيين ومتنوعي الهوية الجندرية وأسرهم.",
      zh: "卡尔加里的慈善机构，通过同伴支持小组、家庭指导服务和教育支持跨性别、非二元及性别多元人士及其家庭。",
    },
    servicesOffered: [
      "Peer support groups",
      "Family navigation services",
      "Education & training",
      "Support for parents of trans/gender-diverse kids",
    ],
    website: "https://skippingstone.ca",
    cost: "free",
    priority: 86,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "calgary-pride",
    category: ["lgbtq", "community", "tourism"],
    userTypes: ["family", "newcomer", "student", "senior"],
    title: {
      en: "Calgary Pride",
      tl: "Calgary Pride",
      es: "Calgary Pride",
      ar: "كالجاري برايد",
      zh: "卡尔加里骄傲节",
    },
    description: {
      en: "Calgary's annual Pride festival and parade, held every summer (typically late August/early September) in the Beltline. Free to attend, family-friendly, and one of the largest Pride celebrations in Western Canada — a welcoming way to experience Calgary's 2SLGBTQ+ community and allies.",
      tl: "Ang taunang Pride festival at parade ng Calgary, gaganapin bawat tag-init sa Beltline.",
      es: "El festival y desfile anual del Orgullo de Calgary, que se celebra cada verano en el Beltline.",
      ar: "مهرجان وموكب الفخر السنوي في كالجاري، يقام كل صيف في منطقة بيلتلاين.",
      zh: "卡尔加里年度骄傲节和游行，每年夏季在Beltline区举行，免费参加，适合全家参与。",
    },
    servicesOffered: [
      "Annual Pride parade & festival",
      "Free to attend",
      "Family-friendly programming",
      "Held in the Beltline, late summer",
    ],
    website: "https://calgarypride.ca",
    cost: "free",
    priority: 84,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
  {
    id: "fairy-tales-film-festival",
    category: ["lgbtq", "arts", "tourism"],
    userTypes: ["newcomer", "student", "senior", "family"],
    title: {
      en: "Fairy Tales Presents Queer Film Festival",
      tl: "Fairy Tales Presents Queer Film Festival",
      es: "Fairy Tales Presents Queer Film Festival",
      ar: "مهرجان فيري تيلز للأفلام المثلية",
      zh: "童话呈现酷儿电影节",
    },
    description: {
      en: "Western Canada's longest-running 2SLGBTQ+ film festival, held annually in Calgary. Screens local, national, and international queer cinema across genres, with panels and community events. A cultural highlight for Calgary's 2SLGBTQ+ arts scene, welcoming to allies and newcomers alike.",
      tl: "Pinakamatagal na 2SLGBTQ+ film festival sa Western Canada, ginaganap bawat taon sa Calgary.",
      es: "El festival de cine 2SLGBTQ+ más antiguo del oeste de Canadá, celebrado anualmente en Calgary.",
      ar: "أطول مهرجان أفلام للمثليين في غرب كندا، يقام سنوياً في كالجاري.",
      zh: "加拿大西部历史最长的2SLGBTQ+电影节，每年在卡尔加里举行，展映本地及国际酷儿电影。",
    },
    servicesOffered: [
      "Local, national & international queer cinema",
      "Panels & community events",
      "Annual festival",
      "Welcoming to allies & newcomers",
    ],
    website: "https://fairytalesfilmfest.com",
    cost: "paid",
    priority: 73,
    lastUpdated: "2026-08",
    source: "CalgaryKonnect Community Module 2026",
  },
];

// Category Guides with first steps and AI prompts
export const categoryGuides: CategoryGuide[] = [
  {
    id: "housing",
    overview: {
      en: "Find affordable housing, emergency shelter, rent assistance, and tenant support in Calgary. Whether you're looking for long-term housing or facing an immediate crisis, help is available.",
      tl: "Maghanap ng affordable housing at rent assistance sa Calgary.",
      es: "Encuentre vivienda asequible y asistencia de alquiler en Calgary.",
      ar: "ابحث عن سكن بأسعار معقولة ومساعدة في الإيجار في كالجاري.",
      zh: "在卡尔加里寻找经济适用房和租房援助。",
    },
    firstSteps: {
      en: [
        "Assess your immediate needs - emergency shelter vs. long-term housing",
        "Check if you qualify for Calgary Housing Company programs",
        "Call 211 for personalized housing referrals",
        "Gather documents: ID, income proof, references",
        "Apply to multiple housing programs simultaneously"
      ],
      tl: ["Suriin ang iyong mga pangangailangan", "Tingnan kung kwalipikado ka", "Tumawag sa 211"],
      es: ["Evalúe sus necesidades", "Verifique su elegibilidad", "Llame al 211"],
      ar: ["قيّم احتياجاتك", "تحقق من أهليتك", "اتصل على 211"],
      zh: ["评估您的需求", "检查您的资格", "拨打211"],
    },
    eligibilityHints: {
      en: [
        "Calgary Housing Company: Income must be below specific thresholds",
        "Rent supplements: Usually require existing lease",
        "Emergency shelters: No ID required for immediate help",
        "Most programs prioritize families with children, seniors, and those with disabilities"
      ],
      tl: ["Ang kita ay dapat mas mababa sa threshold"],
      es: ["El ingreso debe estar por debajo de los umbrales"],
      ar: ["يجب أن يكون الدخل أقل من الحدود"],
      zh: ["收入必须低于门槛"],
    },
    aiPrompts: [
      "How do I apply for affordable housing in Calgary?",
      "What are my options if I'm facing eviction?",
      "How long is the waitlist for Calgary Housing?",
      "Where can I find emergency shelter tonight?",
      "What documents do I need for housing applications?"
    ],
    hiddenGems: [
      "Homeward Trust Find Housing digital service",
      "Community association housing resources",
      "Rental scam prevention tips",
      "Rent supplement programs through Alberta Seniors and Housing"
    ],
  },
  {
    id: "jobs",
    overview: {
      en: "Find employment services, job training, resume help, and career support in Calgary. Free services are available for newcomers, youth, seniors, and all job seekers.",
      tl: "Maghanap ng employment services at job training sa Calgary.",
      es: "Encuentre servicios de empleo y capacitación laboral en Calgary.",
      ar: "ابحث عن خدمات التوظيف والتدريب المهني في كالجاري.",
      zh: "在卡尔加里寻找就业服务和职业培训。",
    },
    firstSteps: {
      en: [
        "Get your resume reviewed for Canadian standards (free at library or settlement agencies)",
        "Register with Alberta Supports for job search assistance",
        "Connect with employment services at your local settlement agency",
        "Use Calgary Public Library's free job search databases",
        "Attend job fairs and networking events"
      ],
      tl: ["Ipareview ang iyong resume", "Mag-register sa Alberta Supports", "Kumonekta sa employment services"],
      es: ["Revise su currículum", "Regístrese en Alberta Supports", "Conéctese con servicios de empleo"],
      ar: ["راجع سيرتك الذاتية", "سج�� في Alberta Supports", "تواصل مع خدمات التوظيف"],
      zh: ["审核您的简历", "在Alberta Supports注册", "联系就业服务"],
    },
    eligibilityHints: {
      en: [
        "Most settlement agency services are free for permanent residents and refugees",
        "Calgary Public Library services are free for everyone",
        "Alberta Supports may provide training funding if unemployed",
        "CRIEC mentorship is for internationally trained professionals"
      ],
      tl: ["Ang mga serbisyo ay libre para sa permanent residents"],
      es: ["Los servicios son gratuitos para residentes permanentes"],
      ar: ["الخدمات مجانية للمقيمين الدائمين"],
      zh: ["服务对永久居民免费"],
    },
    aiPrompts: [
      "Where can I get free help with my resume in Calgary?",
      "How do I find a job as a newcomer to Canada?",
      "What programs help internationally trained professionals?",
      "Where are job fairs happening in Calgary?",
      "How do I get my credentials recognized in Alberta?"
    ],
    hiddenGems: [
      "Calgary Public Library job resources (free for all)",
      "Bow Valley College career services (open to non-students)",
      "CRIEC mentorship for professionals",
      "Library conversation circles for interview practice"
    ],
  },
  {
    id: "family",
    overview: {
      en: "Family-friendly activities, childcare support, programs for kids of all ages, and family events in Calgary. From toddlers to teens, there are affordable options for every budget.",
      tl: "Family-friendly activities at childcare support sa Calgary.",
      es: "Actividades familiares y apoyo a la guardería en Calgary.",
      ar: "أنشطة صديقة للعائلة ودعم رعاية الأطفال في كالجاري.",
      zh: "卡尔加里家庭友好活动和儿童保育支持。",
    },
    firstSteps: {
      en: [
        "Visit Calgary Public Library - free storytimes, programs, and activities for all ages",
        "Check Calgary Parks for playgrounds and splash pads (summer only)",
        "Explore indoor play centres for winter activities",
        "Look into Child Care Subsidy program if you need daycare assistance",
        "Visit calgary.ca/events for upcoming family events and festivals"
      ],
      tl: ["Bisitahin ang Calgary Public Library", "Suriin ang mga parks", "Tuklasin ang indoor play centres"],
      es: ["Visite la Biblioteca Pública de Calgary", "Verifique los parques", "Explore centros de juegos interiores"],
      ar: ["زيارة مكتبة كالجاري العامة", "التحقق من المتنزهات", "استكشاف مراكز الألعاب الداخلية"],
      zh: ["访问卡尔加里公共图书馆", "检查公园", "探索室内游乐场"],
    },
    eligibilityHints: {
      en: [
        "Calgary Public Library is free for everyone with library card",
        "Parks and playgrounds are free to access",
        "Many community programs offer subsidized rates for low-income families",
        "Child care subsidies available - apply through Government of Alberta",
        "YMCA and recreation centres offer financial aid"
      ],
      tl: ["Ang Calgary Public Library ay libre para sa lahat"],
      es: ["La Biblioteca Pública es gratuita para todos"],
      ar: ["المكتبة العامة مجانية للجميع"],
      zh: ["公共图书馆对所有人免费"],
    },
    aiPrompts: [
      "What are free activities for kids in Calgary?",
      "Where can I find rainy day activities for children?",
      "How do I get childcare subsidies in Calgary?",
      "What family events are happening this month?",
      "Best swimming lessons for kids in Calgary?"
    ],
    hiddenGems: [
      "Calgary Public Library's free family programs (best kept secret)",
      "Community association free programs",
      "Parks with splash pads in summer",
      "Library summer reading programs with free prizes",
      "YMCA financial aid for families"
    ],
  },
  {
    id: "mental-health",
    overview: {
      en: "Access mental health support, crisis services, and counselling in Calgary. Help is available 24/7 for anyone experiencing distress, anxiety, depression, or other mental health challenges.",
      tl: "I-access ang mental health support at crisis services sa Calgary.",
      es: "Acceda a apoyo de salud mental y servicios de crisis en Calgary.",
      ar: "احصل على دعم الصحة النفسية وخدمات الأزمات في كالجاري.",
      zh: "在卡尔加里获得心理健康支持和危机服务。",
    },
    firstSteps: {
      en: [
        "If in crisis, call Distress Centre (403-266-4357) or AHS Mental Health Line (1-877-303-2642)",
        "For non-urgent needs, contact Access Mental Health Calgary (403-943-1500)",
        "Your family doctor can refer you to mental health services",
        "Check if your employer has an Employee Assistance Program (EAP)",
        "Explore low-cost options like UCalgary Counselling Centre"
      ],
      tl: ["Sa crisis, tumawag sa Distress Centre", "Para sa non-urgent needs, kontakin ang Access Mental Health"],
      es: ["En crisis, llame al Centro de Angustia", "Para necesidades no urgentes, contacte Access Mental Health"],
      ar: ["في حالة الأزمة، اتصل بمركز الأزمات", "للاحتياجات غير العاجلة، اتصل بـ Access Mental Health"],
      zh: ["危机时，请拨打危机中心", "非紧急需求，请联系Access Mental Health"],
    },
    eligibilityHints: {
      en: [
        "Crisis lines are free and available to everyone",
        "AHS services are covered by Alberta Health Care",
        "No health card needed for crisis support",
        "Newcomers can access services regardless of immigration status"
      ],
      tl: ["Ang crisis lines ay libre para sa lahat"],
      es: ["Las líneas de crisis son gratuitas para todos"],
      ar: ["خطوط الأزمات مجانية للجميع"],
      zh: ["危机热线对所有人免费"],
    },
    aiPrompts: [
      "I'm feeling anxious - where can I get help?",
      "How do I find a counsellor in Calgary?",
      "What mental health services are free in Calgary?",
      "Is there help for newcomer mental health?",
      "Where can I get help for depression?"
    ],
    hiddenGems: [
      "UCalgary Counselling Centre (low-cost for public)",
      "AHS virtual mental health supports",
      "Distress Centre's 1-6 free counselling sessions",
      "Library wellness resources and programs"
    ],
  },
];

// Emergency contacts with enhanced information
export const emergencyContacts = [
  {
    name: "Emergency Services",
    number: "911",
    description: "Police, Fire, Ambulance - Life-threatening emergencies only",
    critical: true,
    available: "24/7",
  },
  {
    name: "Distress Centre",
    number: "403-266-4357",
    description: "24/7 Crisis Support, Suicide Prevention, Counselling",
    critical: true,
    available: "24/7",
  },
  {
    name: "AHS Mental Health Help Line",
    number: "1-877-303-2642",
    description: "24/7 Mental Health Crisis Support",
    critical: true,
    available: "24/7",
  },
  {
    name: "Health Link",
    number: "811",
    description: "Health Advice, Symptom Assessment, Service Navigation",
    critical: false,
    available: "24/7",
  },
  {
    name: "211 Alberta",
    number: "211",
    description: "Community & Social Services Information",
    critical: false,
    available: "24/7",
  },
  {
    name: "HELP Team (formerly DOAP)",
    number: "403-998-7388",
    description: "Help for vulnerable people on the street",
    critical: false,
    available: "24/7",
  },
  {
    name: "Kids Help Phone",
    number: "1-800-668-6868",
    description: "Youth Crisis Support (ages 5-20)",
    critical: false,
    available: "24/7",
  },
  {
    name: "Poison Control",
    number: "1-800-332-1414",
    description: "Poison Emergency Information",
    critical: true,
    available: "24/7",
  },
  {
    name: "Calgary Police Non-Emergency",
    number: "403-266-1234",
    description: "Non-urgent police matters, reports",
    critical: false,
    available: "24/7",
  },
  {
    name: "City of Calgary 311",
    number: "311",
    description: "City services, road conditions, bylaws",
    critical: false,
    available: "24/7",
  },
];

// Winter safety tips
export const winterSafetyTips = [
  {
    tip: "Dress in layers and cover all exposed skin in extreme cold",
    icon: "thermometer",
  },
  {
    tip: "Know the signs of frostbite: numbness, white/grayish skin, hard/waxy feeling",
    icon: "alert",
  },
  {
    tip: "Check road conditions before driving: 511 or Alberta511.ca",
    icon: "car",
  },
  {
    tip: "Find warming centres at Calgary.ca/emergency during extreme cold",
    icon: "home",
  },
  {
    tip: "Keep an emergency kit in your vehicle: blankets, food, water, phone charger",
    icon: "box",
  },
  {
    tip: "Check on elderly or vulnerable neighbours during cold snaps",
    icon: "users",
  },
  {
    tip: "Never leave vehicles running in enclosed spaces - carbon monoxide danger",
    icon: "alert-triangle",
  },
  {
    tip: "Call 403-998-7388 if you see someone in distress on the street",
    icon: "phone",
  },
];
