import { InfoCard } from "@/components/cards/InfoCard";
import { Section } from "@/components/Section";
import { featureCards } from "@/data/babymap";

export function FeatureSection() {
  return (
    <Section
      id="features"
      eyebrow="功能骨架"
      title="把模糊焦慮拆成可以使用的支持"
      description="MVP 先建立清楚的產品區塊與資料結構，後續再逐步補上更完整的互動與視覺細節。"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((feature) => (
          <InfoCard key={feature.title} {...feature} />
        ))}
      </div>
    </Section>
  );
}
