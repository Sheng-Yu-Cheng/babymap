import { ShieldCheck, Star } from "lucide-react";

import type { babysitters } from "@/data/babymap";

type Babysitter = (typeof babysitters)[number];

export function BabysitterCard({ babysitter }: { babysitter: Babysitter }) {
  return (
    <article className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{babysitter.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {babysitter.experience} · {babysitter.distance}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
          <Star className="h-4 w-4 fill-current" aria-hidden="true" />
          {babysitter.rating}
        </span>
      </div>
      <p className="mt-4 text-sm font-medium text-foreground">{babysitter.availableTime}</p>
      <p className="mt-1 text-sm text-muted-foreground">{babysitter.price}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {babysitter.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-secondary-foreground">
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        {babysitter.safety.join(" · ")}
      </div>
    </article>
  );
}
