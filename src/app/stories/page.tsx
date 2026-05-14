import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { StoriesSection } from "@/components/sections/StoriesSection";
import { relatedFeatureLinks } from "@/data/babymap";

export default function StoriesPage() {
  return (
    <main>
      <PageHero
        eyebrow="真實育兒案例"
        title="不是假正能量，而是看見可安排的育兒路徑"
        description="案例牆呈現不同家庭如何組合補助、托育、伴侶分工與親友支援。"
      />
      <StoriesSection />
      <RelatedLinks links={relatedFeatureLinks.stories} />
    </main>
  );
}
