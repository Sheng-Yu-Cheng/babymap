import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { BabysitterSection } from "@/components/sections/BabysitterSection";
import { SafetySection } from "@/components/sections/SafetySection";
import { relatedFeatureLinks } from "@/data/babymap";

export default function BookingPage() {
  return (
    <main>
      <PageHero
        eyebrow="即時保姆預約"
        title="即時保姆預約"
        description="當父母突然加班、原本照顧者臨時取消，或家中出現緊急照護需求時，BabyCare Now 示範如何快速找到附近合格保母。此頁為前端 demo，不會送出真實預約。"
      />
      <BabysitterSection />
      <SafetySection />
      <RelatedLinks links={relatedFeatureLinks.booking} />
    </main>
  );
}
