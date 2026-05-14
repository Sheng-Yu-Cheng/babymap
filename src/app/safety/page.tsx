import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { SafetySection } from "@/components/sections/SafetySection";
import { relatedFeatureLinks } from "@/data/babymap";

export default function SafetyPage() {
  return (
    <main>
      <PageHero
        eyebrow="安全與認證機制"
        title="即時托育必須建立在信任之上"
        description="BabyMap 的即時保母 demo 必須搭配資格審查、服務紀錄、緊急聯絡與雙向評價。"
      />
      <SafetySection />
      <RelatedLinks links={relatedFeatureLinks.safety} />
    </main>
  );
}
