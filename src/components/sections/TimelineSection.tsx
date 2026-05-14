import { CheckCircle2 } from "lucide-react";

import { Section } from "@/components/Section";
import { roadmapStages } from "@/data/babymap";

export function TimelineSection() {
  return (
    <Section
      id="timeline"
      eyebrow="生育時間軸"
      title="把未知流程整理成階段任務"
      description="先用靜態階段卡片呈現任務輪廓，後續可擴充成可勾選的個人化清單。"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {roadmapStages.map((stage) => (
          <article key={stage.stage} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{stage.stage}</h3>
              <span className="text-sm font-medium text-primary">{stage.progress}%</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${stage.progress}%` }}
              />
            </div>
            <ul className="mt-5 space-y-3">
              {stage.tasks.map((task) => (
                <li key={task} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary-foreground" aria-hidden="true" />
                  {task}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
