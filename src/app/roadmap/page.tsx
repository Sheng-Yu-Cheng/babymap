import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { relatedFeatureLinks } from "@/data/babymap";

export default function RoadmapPage() {
  return (
    <main>
      <PageHero
        eyebrow="生育時間軸導航"
        title="從備孕到 6 歲，一步一步知道該做什麼"
        description="把健康檢查、補助申請、產假安排、出生登記與托育選擇整理成階段任務。"
      />
      <TimelineSection />
      <RelatedLinks links={relatedFeatureLinks.roadmap} />
    </main>
  );
}
