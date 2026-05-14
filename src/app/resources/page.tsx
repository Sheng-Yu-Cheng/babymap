import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Section } from "@/components/Section";
import { ResourceMapSection } from "@/components/sections/ResourceMapSection";
import { relatedFeatureLinks } from "@/data/babymap";
import { getTaipeiChildcareResources } from "@/lib/data/taipeiResources";

const resourceTypes = ["托嬰中心", "親子館", "哺集乳室"];

export default async function ResourcesPage() {
  const { resources, usingFallback } = await getTaipeiChildcareResources();

  return (
    <main>
      <PageHero
        eyebrow="托育資源地圖"
        title="找到附近可用的育兒支持"
        description="把托育、親子空間、照護設備與小兒科資源放到同一個入口，讓育兒支持不只查得到，也用得到。"
      />
      <ResourceMapSection resources={resources} usingFallback={usingFallback} />
      <Section title="資源類型" description="正式版本可以擴充成篩選器與地圖圖層。">
        <div className="flex flex-wrap gap-3">
          {resourceTypes.map((type) => (
            <span key={type} className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm">
              {type}
            </span>
          ))}
        </div>
      </Section>
      <RelatedLinks links={relatedFeatureLinks.resources} />
    </main>
  );
}
