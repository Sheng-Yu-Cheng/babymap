import { CheckCircle2 } from "lucide-react";

import { Section } from "@/components/Section";
import { dadModeItems } from "@/data/babymap";

export function DadModeSection() {
  return (
    <Section
      eyebrow="Dad Mode"
      title="育兒不是只對媽媽說話"
      description="父職專區先用 checklist 呈現準爸爸可以提前理解與參與的任務。"
      className="bg-white/48"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {dadModeItems.map((item) => (
          <article key={item} className="flex gap-3 rounded-2xl border border-border bg-white p-5 shadow-sm">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary-foreground" aria-hidden="true" />
            <div>
              <h3 className="font-semibold">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                先把責任說清楚，讓照護不再默默集中在某一個人身上。
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
