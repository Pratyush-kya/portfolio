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
import { MobileAppDock } from "@/components/MobileAppDock";
import { CommandPalette } from "@/components/CommandPalette";
import { SystemsTerminal } from "@/components/SystemsTerminal";
import { ScrollDynamicsObserver } from "@/components/ScrollDynamicsObserver";
import { ScrollReveal, ScrollProgressBar } from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <ScrollDynamicsObserver />
      <CommandPalette />
      <SystemsTerminal />
      <Nav />
      <main id="main-content" className="relative z-10 pb-20 md:pb-0">
        <ScrollReveal direction="down" delay={0.05}>
          <Hero />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <InteractiveShowcaseCarousel />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <FlagshipProjects />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <InteractiveTelemetryLab />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <TechnicalArticle />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <SecondaryProjects />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <SkillsGrid />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <About />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Education />
        </ScrollReveal>
      </main>
      <Footer />
      <MobileAppDock />
    </>
  );
}
