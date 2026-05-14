import { Header } from "@/components/Header";
import { AnxietyBreakerSection } from "@/components/sections/AnxietyBreakerSection";
import { BabysitterSection } from "@/components/sections/BabysitterSection";
import { BudgetSection } from "@/components/sections/BudgetSection";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ResourceMapSection } from "@/components/sections/ResourceMapSection";
import { StoriesSection } from "@/components/sections/StoriesSection";
import { TimelineSection } from "@/components/sections/TimelineSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeatureSection />
        <BabysitterSection />
        <BudgetSection />
        <ResourceMapSection />
        <TimelineSection />
        <AnxietyBreakerSection />
        <StoriesSection />
      </main>
    </>
  );
}
