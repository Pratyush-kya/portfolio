import { PORTFOLIO_DATA } from "./content";

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PORTFOLIO_DATA.personal.name,
    jobTitle: PORTFOLIO_DATA.personal.role,
    description: PORTFOLIO_DATA.personal.headline,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: PORTFOLIO_DATA.personal.university,
    },
    sameAs: [
      PORTFOLIO_DATA.personal.github,
      PORTFOLIO_DATA.personal.linkedin,
    ],
    knowsAbout: [
      "PyTorch",
      "LLM Inference Telemetry",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Python",
      "PostgreSQL",
      "n8n Workflow Automation",
    ],
  };
}
