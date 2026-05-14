import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Section } from "@/components/Section";
import { ResourceMapSection } from "@/components/sections/ResourceMapSection";
import { relatedFeatureLinks } from "@/data/babymap";

const resourceTypes = ["公托", "準公托", "親子館", "哺乳室", "小兒科診所", "兒童急診"];

export default function ResourcesPage() {
  return (
    <main>
      <PageHero
        eyebrow="托育資源地圖"
        title="找到附近可用的育兒支持"
        description="把托育、親子空間、照護設備與醫療資源放到同一個視角裡，讓社會支持變得可見。"
      />
      <ResourceMapSection />
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
