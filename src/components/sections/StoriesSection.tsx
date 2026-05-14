import { StoryCard } from "@/components/cards/StoryCard";
import { Section } from "@/components/Section";
import { parentingStories } from "@/data/babymap";

export function StoriesSection() {
  return (
    <Section
      id="stories"
      eyebrow="真實案例牆"
      title="正向但不洗腦的育兒支持案例"
      description="案例重點是讓使用者看見資源組合，而不是把育兒包裝成沒有壓力的選擇。"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {parentingStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
      <div className="mt-8 rounded-3xl border border-border bg-foreground p-6 text-primary-foreground shadow-soft">
        <p className="text-sm font-medium text-accent">MVP 結尾訊息</p>
        <h2 className="mt-3 text-2xl font-bold">生育不是一個人完成的事。</h2>
        <p className="mt-3 max-w-3xl leading-7 text-white/78">
          BabyMap 的 demo 先展示資訊整合、照護支援、預算試算與焦慮破解如何形成一個可規劃的支持系統。
        </p>
      </div>
    </Section>
  );
}
