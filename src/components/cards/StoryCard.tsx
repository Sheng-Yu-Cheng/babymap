import type { parentingStories } from "@/data/babymap";

type ParentingStory = (typeof parentingStories)[number];

export function StoryCard({ story }: { story: ParentingStory }) {
  return (
    <article className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{story.title}</h3>
      <dl className="mt-4 space-y-3 text-sm leading-6">
        <div>
          <dt className="font-medium text-foreground">困難</dt>
          <dd className="text-muted-foreground">{story.challenge}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">使用資源</dt>
          <dd className="text-muted-foreground">{story.support}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">結果</dt>
          <dd className="text-muted-foreground">{story.outcome}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        {story.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
