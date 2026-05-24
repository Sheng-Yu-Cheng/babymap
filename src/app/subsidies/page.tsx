import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { BudgetSection } from "@/components/sections/BudgetSection";
import { relatedFeatureLinks } from "@/data/babymap";

export default function SubsidiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="補助與預算試算"
        title="用官方來源整理補助，把育兒成本變成可以規劃的數字"
        description="BabyMap 以官方來源 curated data 呈現生育獎勵、托育補助與育兒津貼；計算為 demo，實際資格與金額仍依主管機關公告與審核為準。"
      />
      <BudgetSection />
      <RelatedLinks links={relatedFeatureLinks.subsidies} />
    </main>
  );
}
