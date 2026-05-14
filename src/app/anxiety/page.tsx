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
        description="BabyMap 不否認育兒壓力，而是把社群敘事拆成預算、照護、分工與可用資源。"
      />
      <AnxietyBreakerSection />
      <Section title="Ask BabyMap mock input" description="這是前端 demo，不串接真實 AI。">
        <div className="rounded-3xl border border-border bg-white p-5 shadow-sm">
          <label className="text-sm font-medium">
            輸入你看到的焦慮說法
            <input
              className="mt-3 w-full rounded-2xl border border-border px-4 py-3"
              defaultValue="社群都說生小孩會失去自由，是真的嗎？"
            />
          </label>
          <p className="mt-4 rounded-2xl bg-muted p-4 text-sm leading-6 text-muted-foreground">
            Demo 回應：自由會被重新安排，但可以透過伴侶分工、托育資源與臨時支援降低單一照顧者的壓力。
          </p>
        </div>
      </Section>
      <RelatedLinks links={relatedFeatureLinks.anxiety} />
    </main>
  );
}
