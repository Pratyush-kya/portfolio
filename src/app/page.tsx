import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { FlagshipProjects } from "@/components/FlagshipProjects";
import { SecondaryProjects } from "@/components/SecondaryProjects";
import { TechnicalArticle } from "@/components/TechnicalArticle";
import { SkillsGrid } from "@/components/SkillsGrid";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <FlagshipProjects />
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
