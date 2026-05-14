import { PageHero } from "@/components/PageHero";
import { RelatedLinks } from "@/components/RelatedLinks";
import { BudgetSection } from "@/components/sections/BudgetSection";
import { relatedFeatureLinks } from "@/data/babymap";

export default function SubsidiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="補助與預算試算"
        title="把育兒成本變成可以規劃的數字"
        description="輸入居住縣市、家庭收入、胎次與托育方式，先用 demo 估算看見每月支出、可申請補助與補助後負擔。"
      />
      <BudgetSection />
      <RelatedLinks links={relatedFeatureLinks.subsidies} />
    </main>
  );
}
