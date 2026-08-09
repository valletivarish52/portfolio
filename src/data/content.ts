// Central content file. Edit this to update the portfolio.
export const PROFILE = {
  firstName: "Varish",
  lastName: "Valleti",
  role: "Backend Engineer, Insurance Platforms",
  availability: "Open to work",
  tagline:
    "I build high-throughput backend systems for insurance platforms. Spring Boot, AWS, and an obsession with latency.",
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
      "Configuration-driven onboarding for 12 insurance products, OTP-secured policy retrieval, and end-to-end production ownership on a high-volume insurance platform.",
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
      "Full-stack policy, claims and payment workflows with Spring Boot, React, MySQL and Redis.",
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
    name: "MPro",
    kind: "Insurance onboarding platform · Axis Max Life",
    desc: "Configuration-driven onboarding for 12 products, with OTP-secured policy retrieval that prefills 90% of a 6-stage customer journey.",
    stack: ["Spring Boot", "Coherent Spark", "AWS S3", "CloudFront", "Redis"],
    year: "2025",
    seed: 47,
    tint: "205, 230, 75",
    caseStudy: {
      overview:
        "MPro is Axis Max Life's policy issuance platform. I work across onboarding, policy retrieval and integrations, with end-to-end production ownership.",
      problem:
        "Product rules lived in code and the database: plan-code assignment alone cost 3-4 database calls per policy, every product launch needed a release, and worst-case policy retrieval ran full-collection scans that took up to 15 seconds.",
      approach:
        "Moved plan-code assignment into configuration on S3 behind CloudFront, rebuilt onboarding config-first with Coherent Spark, migrated superannuation workflows the same way, replaced full-collection scans with nested-document indexing, parallelized external API calls, and put policy retrieval behind Redis-based OTP verification.",
      outcome:
        "12 products onboard through configuration with no code changes, 3-4 fewer database calls per policy, worst-case retrieval latency down 80% from 15s to under 3s, and a lookup flow that prefills 90% of a 6-stage customer journey.",
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
    desc: "Role-based access control, automated policy workflows and dashboards for policy analytics and claim tracking.",
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
    desc: "Product microservice for an e-commerce platform: catalog management, REST APIs and service-ready configuration.",
    stack: ["Java", "Spring Boot", "Microservices"],
    year: "2026",
    seed: 233,
    tint: "230, 179, 102",
    caseStudy: {
      problem:
        "Catalog logic tangled into a monolith cannot scale or deploy independently of the rest of the store.",
      approach:
        "Extracted the product domain into its own Spring Boot service: REST APIs for catalog operations, configuration externalized to a config server, designed to sit behind an API gateway.",
      outcome:
        "An independently deployable catalog service that slots into a gateway-fronted setup alongside cart and order services.",
    },
    link: "https://github.com/valletivarish/buyzaar-product-ms",
  },
  {
    name: "Java Design Patterns",
    kind: "Core Java reference",
    desc: "Working catalog of Java fundamentals and design patterns: creational, structural and behavioural implementations with practical examples.",
    stack: ["Java", "OOP", "Design Patterns"],
    year: "2025",
    seed: 318,
    tint: "179, 156, 230",
    caseStudy: {
      overview:
        "A working reference of core Java and design patterns, written as runnable examples rather than notes.",
      points: [
        "Creational, structural and behavioural pattern families implemented in idiomatic Java.",
        "Concurrency, collections and streams fundamentals alongside the patterns.",
        "Doubles as an interview prep and code review companion.",
      ],
    },
    link: "https://github.com/valletivarish/java-fundamentals-and-design-patterns",
  },
  {
    name: "Bank Application",
    kind: "Full-stack banking app",
    desc: "React banking application covering accounts, transactions and transfers with a clean component structure.",
    stack: ["React", "JavaScript"],
    year: "2024",
    seed: 521,
    tint: "127, 224, 195",
    caseStudy: {
      overview:
        "A React banking interface covering the daily flows of a retail account.",
      points: [
        "Accounts, transactions and transfer views with a reusable component structure.",
        "Client-side validation and state handling for form-heavy flows.",
        "REST-backed data layer kept behind a thin API module.",
      ],
    },
    link: "https://github.com/valletivarish/bank-application-react",
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
  "Excellence Award FY25-26, Axis Max Life Insurance, for outstanding performance on MPro.";
