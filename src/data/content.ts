// Central content file. Edit this to update the portfolio.
export const PROFILE = {
  firstName: "Varish",
  lastName: "Valleti",
  role: "Backend Engineer, Insurance Platforms",
  availability: "Open to work",
  tagline:
    "I build the backend systems that power insurance platforms. Spring Boot, AWS, and an obsession with latency.",
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
    label: "code-quality problems cleaned up across the platform",
  },
];

export const EXPERIENCE = [
  {
    company: "Monocept",
    role: "Software Engineer",
    meta: "Client: Axis Max Life Insurance · Project: MPro",
    period: "Nov 2024 - Present",
    summary:
      "I build and run the product onboarding and policy search systems on Axis Max Life's issuance platform: new products launch without code changes, searches finish in under 3 seconds instead of 15, and I own it all in production.",
    points: [
      "Built configuration-driven onboarding for 12 insurance products with Spring Boot, Coherent Spark and AWS S3/CloudFront, eliminating 3-4 database calls per policy.",
      "Migrated group insurance (superannuation) workflows to a configuration-driven model, enabling product setup without code changes.",
      "Designed secure policy retrieval APIs with Redis-based OTP authentication, prefilling 90% of a 6-stage customer journey.",
      "Extended wrapper APIs with Benefit Illustration support for fintech and aggregator integrations.",
      "Owned production support, hotfix deployments, CI/CD and monitoring across GitLab, Jenkins, Kibana and CloudWatch.",
    ],
  },
  {
    company: "Monocept",
    role: "Software Intern",
    meta: "Full-stack insurance modules",
    period: "May 2024 - Nov 2024",
    summary:
      "Built policy, claims and payment features across the full stack with Spring Boot, React, MySQL and Redis.",
    points: [
      "Developed policy, customer, claims and payment workflows with Spring Boot, React, MySQL and Redis.",
      "Implemented JWT authentication, Spring Security and indexed MySQL queries to speed up reporting.",
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
  caseStudy: {
    overview?: string;
    problem?: string;
    approach?: string;
    outcome?: string;
    points?: string[];
  };
  link?: string;
}

export const WORK: WorkItem[] = [
  {
    name: "Meridian",
    kind: "Insurance backend · in active development",
    desc: "The policy issuance and payments backend of a fictional insurer, built in public: idempotent premium payments, a double-entry ledger and settlement reconciliation.",
    stack: ["Java 21", "Spring Boot 3", "Spring Modulith", "PostgreSQL", "Redis"],
    year: "2026",
    seed: 318,
    tint: "179, 156, 230",
    caseStudy: {
      overview:
        "Meridian demonstrates, on a fictional insurer, the engineering patterns I build professionally under NDA. Development happens in public, commit by commit.",
      problem:
        "My strongest production work lives behind a client NDA, so there is no public code that shows how I design payment-grade backend systems.",
      approach:
        "A Spring Modulith backend for a fictional insurer with enforced module boundaries: a policy state machine, premium payments with Stripe-style idempotency keys on Redis, a double-entry ledger, a transactional outbox with an idempotent consumer, and a Spring Batch reconciliation job that catches deliberately seeded settlement discrepancies.",
      outcome:
        "One command starts a seeded demo. The roadmap ships module by module, with architecture decision records and Testcontainers-backed tests, including a parallel-duplicate-payment test asserting exactly one charge.",
    },
    link: "https://github.com/valletivarish/meridian",
  },
  {
    name: "MPro",
    kind: "Insurance onboarding platform · Axis Max Life",
    desc: "The platform Axis Max Life uses to launch and issue insurance policies. 12 products run on it; I made launches config-driven and policy searches near-instant.",
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
        "Moved plan-code assignment into configuration on S3 behind CloudFront, rebuilt onboarding config-first with Coherent Spark, migrated superannuation workflows the same way, replaced full-collection scans with nested-document indexing, parallelized external API calls, and put policy retrieval behind Redis-backed OTP verification.",
      outcome:
        "All 12 products are onboarded through configuration with no code changes, every policy costs 3-4 fewer database calls, worst-case retrieval latency is down 80% from 15s to under 3s, and the lookup flow prefills 90% of a 6-stage customer journey.",
      points: [
        "Benefit Illustration support in wrapper APIs for fintech and aggregator integrations.",
        "Production ownership end to end: hotfixes, CI/CD and monitoring across GitLab, Jenkins, Kibana and CloudWatch.",
        "Resolved a production data mapping incident affecting 3000+ policies, restoring end-to-end data integrity.",
      ],
    },
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

export const STACK_LINE =
  "Java / Spring Boot / AWS / Redis / MySQL / MongoDB / Docker / Jenkins";

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
  "Excellence Award FY25-26 from Axis Max Life Insurance, for outstanding performance on MPro.";
