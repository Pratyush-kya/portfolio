import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { FlagshipProjects } from "@/components/FlagshipProjects";
import { InteractiveTelemetryLab } from "@/components/InteractiveTelemetryLab";
import { TechnicalArticle } from "@/components/TechnicalArticle";
import { SecondaryProjects } from "@/components/SecondaryProjects";
import { SkillsGrid } from "@/components/SkillsGrid";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <FlagshipProjects />
        <InteractiveTelemetryLab />
        <TechnicalArticle />
        <SecondaryProjects />
        <SkillsGrid />
        <About />
        <Education />
      </main>
      <Footer />
    </>
  );
}
