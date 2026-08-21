// Central content file. Edit this to update the portfolio.
export const PROFILE = {
  firstName: "Varish",
  lastName: "Valleti",
  role: "Backend Engineer, Insurance Platforms",
  availability: "Open to work",
  tagline:
    "2+ years at Monocept, building Axis Max Life's policy platforms. Policy searches went from 15 seconds to under 3.",
  location: "Hyderabad, India",
  email: "varishvalleti52@gmail.com",
  phone: "+91 8919504427",
  links: {
    github: "https://github.com/valletivarish",
    linkedin: "https://linkedin.com/in/valletivarish",
    leetcode: "https://leetcode.com/u/varishvalleti52",
  },
};

export const ACHIEVEMENTS = [
  {
    stat: "80%",
    dir: "faster",
    label: "policy searches went from 15 seconds to under 3 seconds",
  },
  {
    stat: "3000+",
    dir: "policies saved",
    label: "every affected record restored after a production data incident",
  },
  {
    stat: "50%",
    dir: "fewer errors",
    label: "production issues halved through a quality initiative",
  },
  {
    stat: "600+",
    dir: "issues fixed",
    label: "code-quality issues cleared across the codebase",
  },
];

export const EXPERIENCE = [
  {
    company: "Monocept",
    role: "Software Engineer",
    meta: "Client: Axis Max Life Insurance",
    period: "May 2024 - Present",
    summary:
      "Two client platforms, owned in production end to end: builds, hotfixes, CI/CD and monitoring. The work itself is below.",
    points: [
      "Integrating policy-reinstatement processing into 8 Spring Boot microservices, propagating new case parameters through 15 downstream callback APIs with backward-compatible validation.",
      "Building reinstatement persistence and retrieval in DynamoDB across ingestion, asynchronous SQS processing and encrypted downstream callbacks, with JUnit and Mockito coverage.",
      "Implementing a configurable rule-engine exemption that skips document checks already cleared at original issuance, eliminating redundant re-verification.",
      "Engineered configuration-driven onboarding spanning 12 retail products and group insurance, converting Excel-based business rules into JSON configuration and eliminating 3-4 database calls per policy.",
      "Developed rate-limited partner APIs exposing premium and benefit calculations and generating benefit-illustration PDFs for fintech and aggregator platforms.",
      "Designed secure policy retrieval with Redis-based OTP authentication, prefilling 90% of a 6-stage customer journey.",
    ],
  },
];

export interface WorkItem {
  name: string;
  kind: string;
  desc: string;
  stack: string[];
  year: string;
  seed: number;
  tint: string;
  liveRepo?: string;
  caseStudy: {
    overview?: string;
    problem?: string;
    approach?: string;
    outcome?: string;
    points?: string[];
  };
  link?: string;
}

export const slugOf = (n: string) =>
  n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Client work at Monocept (rendered under Experience).
export const CLIENT_WORK: WorkItem[] = [
  {
    name: "MPro",
    kind: "Insurance onboarding platform · Axis Max Life",
    desc: "The platform Axis Max Life uses to launch and issue insurance policies. 12 products run on it; I made launches config-driven and cut policy searches from 15 seconds to under 3.",
    stack: ["Spring Boot", "Coherent Spark", "AWS S3", "CloudFront", "Redis"],
    year: "2025",
    seed: 47,
    tint: "205, 230, 75",
    caseStudy: {
      overview:
        "MPro is Axis Max Life's policy issuance platform. I work across product onboarding, policy retrieval and partner integrations, with end-to-end production ownership.",
      problem:
        "Product rules lived in code and the database: plan-code assignment alone cost 3-4 database calls per policy, every product launch needed a release, and worst-case policy retrieval ran full-collection scans that took up to 15 seconds.",
      approach:
        "Converted Excel-based business rules into JSON configuration served from S3 behind CloudFront, rebuilt onboarding config-first across retail and group insurance, replaced full-collection scans with MongoDB nested-document indexing, ran external API calls concurrently, and put policy retrieval behind Redis-backed OTP verification.",
      outcome:
        "All 12 products are onboarded through configuration with no code changes, every policy costs 3-4 fewer database calls, worst-case retrieval latency is down 80% from 15s to under 3s, and the modernization program nearly halved new-product delivery timelines.",
      points: [
        "Rate-limited partner APIs exposing premium and benefit calculations and generating benefit-illustration PDFs for fintech and aggregator platforms.",
        "Production ownership end to end: hotfixes, CI/CD and monitoring across GitLab, Jenkins, Kibana and CloudWatch.",
        "Resolved a production data mapping incident affecting 3000+ policies, restoring end-to-end data integrity.",
      ],
    },
  },
  {
    name: "Dolphin",
    kind: "Policy reinstatement · Axis Max Life",
    desc: "An event-driven platform of 26 microservices at Axis Max Life. I'm integrating policy reinstatement across 8 of them, with changes flowing through 15 downstream APIs without breaking existing consumers.",
    stack: ["Java", "Spring Boot", "DynamoDB", "SQS", "Microservices"],
    year: "2026",
    seed: 521,
    tint: "127, 224, 195",
    caseStudy: {
      problem:
        "Reinstating a lapsed policy touches far more than one service: new case parameters must reach 15 downstream callback APIs across an event-driven platform of 26 microservices, without breaking any existing consumer.",
      approach:
        "I'm integrating reinstatement processing into 8 Spring Boot microservices: DynamoDB persistence across ingestion, asynchronous SQS processing and encrypted downstream callbacks, backward-compatible validation on every touched API, a configurable rule-engine exemption for document checks already cleared at original issuance, and JUnit/Mockito coverage throughout.",
      outcome:
        "In progress, shipping service by service. The rule-engine exemption eliminates redundant document re-verification for every reinstatement case already cleared at issuance.",
    },
  },
];

// Personal projects (rendered in the Projects section).
export const PROJECTS: WorkItem[] = [
  {
    name: "Hazri",
    kind: "Workforce platform · in active development",
    desc: "My strongest production work is under NDA, so Hazri rebuilds those patterns in public: leave and approvals as real state machines, idempotent attendance ingestion, and a payroll run designed to never double-pay.",
    stack: ["Java 21", "Spring Boot 3", "Spring Modulith", "PostgreSQL", "Redis"],
    year: "2026",
    seed: 318,
    tint: "179, 156, 230",
    liveRepo: "valletivarish/hazri",
    caseStudy: {
      overview:
        "Hazri demonstrates, on a fictional company, the engineering patterns I build professionally under NDA. Development happens in public, commit by commit.",
      problem:
        "My strongest production work lives behind a client NDA, so there is no public code that shows how I design workflow-heavy backend systems.",
      approach:
        "A Spring Modulith backend for a fictional workforce platform with enforced module boundaries: effective-dated employee records that never rewrite history, leave accrual and approval state machines with config-driven multi-level chains, idempotent attendance event ingestion for retrying devices, a re-runnable Spring Batch payroll run that joins attendance and leave into a register, and a transactional outbox with an idempotent consumer.",
      outcome:
        "In progress, in public. The roadmap ships module by module toward a one-command seeded demo, with architecture decision records and Testcontainers-backed tests along the way, including a duplicate-punch test asserting one attendance record and a payroll rerun test asserting zero double payments. The commit history is the status report.",
    },
    link: "https://github.com/valletivarish/hazri",
  },
  {
    name: "Guardian Life Assurance",
    kind: "Full-stack insurance system",
    desc: "A complete insurance system built end to end: policies, claims, payments and analytics dashboards, with access controlled by role.",
    stack: ["Spring Boot", "React", "MySQL", "Spring Security"],
    year: "2024",
    seed: 172,
    tint: "127, 180, 230",
    caseStudy: {
      problem:
        "Insurance operations usually span disconnected tools: one system for policies, another for claims, spreadsheets for reporting, and no consistent access control across them.",
      approach:
        "Built one full-stack system on Spring Boot, React and MySQL: role-based access with Spring Security and JWT, automated policy lifecycle workflows from proposal onward, and indexed queries backing the reporting layer.",
      outcome:
        "A working end-to-end product covering policies, customers, claims and payments, with analytics dashboards and reports that stay fast as data grows.",
    },
    link: "https://github.com/valletivarish/guardian_life_assurance",
  },
  {
    name: "Buyzaar Product MS",
    kind: "E-commerce microservice",
    desc: "A product catalog service for an online store, built to deploy and scale on its own behind an API gateway.",
    stack: ["Java", "Spring Boot", "Microservices"],
    year: "2026",
    seed: 233,
    tint: "230, 179, 102",
    caseStudy: {
      problem:
        "When catalog logic is tangled into a monolith, it cannot scale or ship independently of the rest of the store.",
      approach:
        "Extracted the product domain into its own Spring Boot service: REST APIs for catalog operations, configuration externalized to a config server, designed to sit behind an API gateway.",
      outcome:
        "An independently deployable catalog service that slots into a gateway-fronted setup alongside cart and order services.",
    },
    link: "https://github.com/valletivarish/buyzaar-product-ms",
  },
];

export const ALL_CASES: WorkItem[] = [...CLIENT_WORK, ...PROJECTS];

export const STACK_LINE =
  "Java / Spring Boot / Microservices / AWS / MongoDB / DynamoDB / Redis / Kafka / MySQL / Docker / Jenkins";

export const RESUME_FILE = "Varish_Valleti_Resume.pdf";

export const SKILLS = [
  { group: "Languages", items: ["Java", "JavaScript", "SQL", "HTML", "CSS"] },
  {
    group: "Backend",
    items: ["Spring Boot", "Spring Security", "Microservices", "REST APIs", "Spring Data JPA", "Hibernate", "JWT"],
  },
  { group: "Data", items: ["MySQL", "MongoDB", "Redis"] },
  { group: "Cloud & AWS", items: ["EC2", "S3", "RDS", "CloudFront", "CloudWatch", "IAM", "Parameter Store"] },
  {
    group: "Tooling",
    items: ["Docker", "Jenkins", "GitLab", "Maven", "JUnit", "Mockito", "Kibana", "Dynatrace", "SonarQube"],
  },
];

export const EDUCATION = {
  school: "Anurag University",
  degree: "B.Tech in Artificial Intelligence",
  period: "2020 - 2024",
  note: "CGPA 7.9 · Hyderabad, India",
};

export const AWARD =
  "Excellence Award FY25-26 from Axis Max Life Insurance, with senior-leadership recognition for a 12-product modernization program that nearly halved new-product delivery timelines.";
