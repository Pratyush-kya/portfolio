import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { InteractiveShowcaseCarousel } from "@/components/InteractiveShowcaseCarousel";
import { FlagshipProjects } from "@/components/FlagshipProjects";
import { InteractiveTelemetryLab } from "@/components/InteractiveTelemetryLab";
import { TechnicalArticle } from "@/components/TechnicalArticle";
import { SecondaryProjects } from "@/components/SecondaryProjects";
import { SkillsGrid } from "@/components/SkillsGrid";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { AmbientCyberRain } from "@/components/AmbientCyberRain";

export default function Home() {
  return (
    <>
      <AmbientCyberRain />
      <Nav />
      <main id="main-content" className="relative z-10">
        <Hero />
        <InteractiveShowcaseCarousel />
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
