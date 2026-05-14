import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Section } from "@/components/Section";
import { DadModeSection } from "@/components/sections/DadModeSection";
import { relatedFeatureLinks } from "@/data/babymap";

const partnerChecklist = ["夜間照顧", "接送安排", "醫療陪同", "家務分工", "臨時保母需求"];

export default function DadModePage() {
  return (
    <main>
      <PageHero
        eyebrow="父職專區"
        title="育兒不是只對媽媽說話"
        description="Dad Mode 把父職、伴侶分工與產後支持放進同一個準備流程。"
      />
      <DadModeSection />
      <Section title="伴侶分工 preview" description="先列出需要提前討論的任務，後續可擴充成模擬器。">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {partnerChecklist.map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-white p-4 text-sm font-medium shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </Section>
      <RelatedLinks links={relatedFeatureLinks.dadMode} />
    </main>
  );
}
