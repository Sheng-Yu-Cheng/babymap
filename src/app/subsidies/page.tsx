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
        description="用簡化試算先看見每月支出、可申請補助與補助後負擔，正式金額仍需以官方資訊為準。"
      />
      <BudgetSection />
      <RelatedLinks links={relatedFeatureLinks.subsidies} />
    </main>
  );
}
