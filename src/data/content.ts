// Central content file. Edit this to update the portfolio.
export const PROFILE = {
  firstName: "Varish",
  lastName: "Valleti",
  role: "Java Backend Developer",
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
  { stat: "80%", label: "worst-case API latency cut, 15s down to under 3s" },
  { stat: "3000+", label: "policies restored after a production data incident" },
  { stat: "50%", label: "fewer production exceptions under a Kaizen initiative" },
  { stat: "600+", label: "SonarQube issues cleared across the codebase" },
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
  image: string;
  link?: string;
}

export const WORK: WorkItem[] = [
  {
    name: "MPro",
    kind: "Insurance onboarding platform · Axis Max Life",
    desc: "Configuration-driven onboarding for 12 products, with OTP-secured policy retrieval that prefills 90% of a 6-stage customer journey.",
    stack: ["Spring Boot", "Coherent Spark", "AWS S3", "CloudFront", "Redis"],
    year: "2025",
    image: "https://picsum.photos/id/180/1200/900",
  },
  {
    name: "Guardian Life Assurance",
    kind: "Full-stack insurance system",
    desc: "Role-based access control, automated policy workflows and dashboards for policy analytics and claim tracking.",
    stack: ["Spring Boot", "React", "MySQL", "Spring Security"],
    year: "2024",
    image: "https://picsum.photos/id/60/1200/900",
    link: "https://github.com/valletivarish/guardian_life_assurance",
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
