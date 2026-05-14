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
        title="臨時需要照護時，快速找到合格保母"
        description="BabyCare Now 用 demo 呈現地點、時段、需求、保母清單與安全提示，讓臨時托育不再只能靠運氣。"
      />
      <BabysitterSection />
      <SafetySection />
      <RelatedLinks links={relatedFeatureLinks.booking} />
    </main>
  );
}
