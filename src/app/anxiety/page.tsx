import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Section } from "@/components/Section";
import { AnxietyBreakerSection } from "@/components/sections/AnxietyBreakerSection";
import { relatedFeatureLinks } from "@/data/babymap";

export default function AnxietyPage() {
  return (
    <main>
      <PageHero
        eyebrow="社群焦慮破解 / Ask BabyMap"
        title="把焦慮轉成可以處理的問題"
        description="BabyMap 不否認育兒壓力，也不催促任何人做決定；它把社群敘事拆成預算、照護、分工與可用資源。"
      />
      <AnxietyBreakerSection />
      <Section
        title="為什麼需要焦慮破解？"
        description="社群內容常把極端經驗推到眼前，讓原本可以討論的問題變成一團模糊恐懼。"
      >
        <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-sm">
          <p className="max-w-3xl text-lg leading-8 text-foreground">
            數位媒體可能放大焦慮，但數位工具也可以成為支持系統。BabyMap 的重點不是說服你生，而是把「我好害怕」拆成「我需要查補助、找托育、討論分工，或準備臨時支援」。
          </p>
        </div>
      </Section>
      <RelatedLinks links={relatedFeatureLinks.anxiety} />
    </main>
  );
}
