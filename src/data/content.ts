// Central content file. Edit this to update the portfolio.
export const PROFILE = {
  firstName: "Varish",
  lastName: "Valleti",
  role: "Backend Engineer, Insurance Platforms",
  availability: "Open to work",
  tagline:
    "2+ years at Monocept, building Axis Max Life's policy platforms. I reduced the slowest policy searches from 15 seconds to under 3.",
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
    label: "The slowest policy searches dropped from 15 seconds to under 3.",
  },
  {
    stat: "3000+",
    dir: "records restored",
    label: "I resolved a live data-mapping incident and restored data integrity.",
  },
  {
    stat: "50%",
    dir: "fewer errors",
    label: "A team initiative I contributed to halved production exceptions.",
  },
  {
    stat: "600+",
    dir: "findings resolved",
    label: "I resolved 600+ code-quality findings across the codebase.",
  },
];

export const EXPERIENCE = [
  {
    company: "Monocept",
    role: "Software Engineer",
    meta: "Client: Axis Max Life Insurance · Dolphin and MPro",
    period: "May 2024 - Present",
    summary:
      "I built the product onboarding and policy search systems on MPro, and I am now integrating policy reinstatement across eight services on Dolphin. New products launch without a code release, the slowest searches answer in under 3 seconds instead of 15, and I own my systems in production.",
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

export const WORK: WorkItem[] = [
  {
    name: "MPro",
    kind: "Insurance onboarding platform · Axis Max Life",
    desc: "Axis Max Life launches and issues insurance policies on this platform. I converted its product rules into configuration, removed 3 to 4 database calls from every policy, and reduced the slowest searches from 15 seconds to under 3.",
    stack: ["Spring Boot", "Coherent Spark", "AWS S3", "CloudFront", "Redis"],
    year: "2025",
    seed: 47,
    tint: "205, 230, 75",
    caseStudy: {
      overview:
        "MPro is Axis Max Life's policy issuance platform. I work across product onboarding, policy retrieval and partner integrations, with end-to-end production ownership.",
      problem:
        "Product rules lived in code and the database, so every new insurance product needed a release, and each policy spent 3 to 4 database calls on plan assignment alone. The slowest policy searches scanned entire collections and took up to 15 seconds.",
      approach:
        "Converted Excel-based business rules into JSON configuration served from S3 behind CloudFront, rebuilt onboarding config-first across retail and group insurance, replaced full-collection scans with MongoDB nested-document indexing, ran external API calls concurrently, and put policy retrieval behind Redis-backed OTP verification.",
      outcome:
        "All 12 products now launch through configuration without a code release, every policy requires 3 to 4 fewer database calls, and the slowest searches answer in under 3 seconds instead of 15. The modernization program these migrations belonged to nearly halved new-product delivery timelines.",
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
    desc: "Axis Max Life restores lapsed policies through this event-driven platform. I am integrating reinstatement across 8 services and delivering changes through 15 downstream APIs while every existing integration keeps working.",
    stack: ["Java", "Spring Boot", "DynamoDB", "SQS", "Microservices"],
    year: "2026",
    seed: 521,
    tint: "127, 224, 195",
    caseStudy: {
      problem:
        "Restoring a lapsed policy touches far more than one service. The new case information must reach 8 backend services and 15 downstream callback APIs, and none of them can break for the integrations that already depend on them.",
      approach:
        "I'm integrating reinstatement processing into 8 Spring Boot microservices: DynamoDB persistence across ingestion, asynchronous SQS processing and encrypted downstream callbacks, backward-compatible validation on every touched API, a configurable rule-engine exemption for document checks already cleared at original issuance, and JUnit/Mockito coverage throughout.",
      outcome:
        "In progress, shipping service by service. The rule-engine exemption eliminates redundant document re-verification for every reinstatement case already cleared at issuance.",
    },
  },
  {
    name: "Madad",
    kind: "AI help desk · Personal project · Planned",
    desc: "I am learning generative AI development with Spring AI, and Madad is the project I will build with it: an AI help desk that answers from real source material. The build begins in about a month, once I finish the course, and the code will be public from the first commit.",
    stack: ["Spring AI", "Java", "Spring Boot"],
    year: "2026",
    seed: 318,
    tint: "179, 156, 230",
    caseStudy: {
      problem:
        "Help desks answer the same questions again and again, and the answers usually already exist in a company's own documents. Generative AI fits that problem well when it is built carefully.",
      approach:
        "Right now I am learning: I am working through a generative AI course focused on Spring AI. Madad is the project I will build to put that learning into practice, in Java, on the stack I already work in.",
      outcome:
        "Nothing is built yet, and I would rather say that plainly than pretend otherwise. I expect to start in about a month. This card will link to the repository once there is code to see.",
    },
  },
  {
    name: "Guardian Life Assurance",
    kind: "Personal project · Full-stack insurance system",
    desc: "I engineered a complete insurance management system: policies move through automated workflows, dashboards report analytics, and every role receives exactly the access it needs.",
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
        "A working end-to-end product covering policies, customers and analytics dashboards, with reports that stay fast as the data grows.",
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
